#!/bin/bash

# API Test Suite - Utilities
# Common functions and utilities for all test scripts

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Configuration defaults
API_BASE_URL=${API_BASE_URL:-"http://127.0.0.1:8000"}

# Helper function to make HTTP requests
make_request() {
    local method=$1
    local endpoint=$2
    local data=$3
    local auth=$4
    local description=$5

    echo -e "${YELLOW}🔄 ${description}${NC}"

    if [ "$auth" = "true" ]; then
        if [ -z "$AUTH_TOKEN" ]; then
            echo -e "${RED}❌ No auth token available. Run _auth.sh first${NC}"
            return 1
        fi
        auth_header="-H \"Authorization: Bearer $AUTH_TOKEN\""
    else
        auth_header=""
    fi

    if [ -n "$data" ]; then
        data_param="-d '$data'"
        content_type="application/ld+json"
    else
        data_param=""
        content_type="application/json"
    fi

    # Build curl command
    cmd="curl -s -X $method \"$API_BASE_URL$endpoint\" \
        -H \"Content-Type: $content_type\" \
        $auth_header \
        $data_param \
        -w \"HTTPSTATUS:%{http_code}\""

    # Execute request
    response=$(eval $cmd)

    # Extract HTTP status and body
    http_code=$(echo "$response" | tr -d '\n' | sed -e 's/.*HTTPSTATUS://')
    body=$(echo "$response" | sed -e 's/HTTPSTATUS:.*//')

    # Export for other functions to use
    export LAST_HTTP_STATUS=$http_code

    echo -e "   Status: $http_code"

    # Pretty print JSON if possible
    if command -v jq > /dev/null && echo "$body" | jq . > /dev/null 2>&1; then
        echo -e "   Response:"
        echo "$body" | jq . | head -20
        if [ $(echo "$body" | jq . | wc -l) -gt 20 ]; then
            echo "   ... (truncated)"
        fi
    else
        echo -e "   Response: $body"
    fi

    echo ""
    return $http_code
}

# Helper function to extract ID from JSON response
extract_id() {
    local json_response="$1"
    echo "$json_response" | grep -o '"id":[0-9]*' | cut -d':' -f2 | head -1
}

# Helper function to check if status code indicates success
is_success() {
    local status_code=$1
    [ $status_code -ge 200 ] && [ $status_code -lt 300 ]
}

# Helper function to check if status code indicates client error
is_client_error() {
    local status_code=$1
    [ $status_code -ge 400 ] && [ $status_code -lt 500 ]
}

# Helper function to verify unauthorized access is properly blocked
verify_unauthorized() {
    local status_code=${1:-$LAST_HTTP_STATUS}
    if [ $status_code -eq 401 ] || [ $status_code -eq 403 ]; then
        echo -e "${GREEN}✅ Correctly blocked unauthorized access${NC}"
        return 0
    else
        echo -e "${RED}❌ Should have blocked unauthorized access (got $status_code)${NC}"
        return 1
    fi
}

# Helper function to load authentication tokens
load_auth_tokens() {
    if [ -f "./tests/.auth_tokens" ]; then
        source ./tests/.auth_tokens
        echo -e "${BLUE}🔑 Auth tokens loaded${NC}"
    else
        echo -e "${YELLOW}⚠️  No auth tokens found. Run _auth.sh first${NC}"
    fi
}

# Helper function to validate required dependencies
check_dependencies() {
    local missing_deps=()

    if ! command -v curl > /dev/null; then
        missing_deps+=("curl")
    fi

    if ! command -v jq > /dev/null; then
        echo -e "${YELLOW}⚠️  jq not found - JSON responses won't be pretty printed${NC}"
    fi

    if [ ${#missing_deps[@]} -gt 0 ]; then
        echo -e "${RED}❌ Missing required dependencies: ${missing_deps[*]}${NC}"
        echo -e "${BLUE}💡 Install with: brew install ${missing_deps[*]} (macOS) or apt-get install ${missing_deps[*]} (Ubuntu)${NC}"
        return 1
    fi

    return 0
}