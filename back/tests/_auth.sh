#!/bin/bash

# API Test Suite - Authentication Script
# This script authenticates and exports AUTH_TOKEN for other scripts

set -e  # Exit on any error

# Source configuration if available
if [ -f "./tests/_init.sh" ]; then
    source ./tests/_init.sh > /dev/null 2>&1 || true
fi

# Default configuration if not set
API_BASE_URL=${API_BASE_URL:-"http://127.0.0.1:8000"}
ADMIN_EMAIL=${ADMIN_EMAIL:-"admin@portfolio.com"}
ADMIN_PASSWORD=${ADMIN_PASSWORD:-"admin123"}

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🔐 Authenticating with Portfolio API...${NC}"

# Function to login and get token
get_auth_token() {
    local email=$1
    local password=$2

    echo -e "${YELLOW}🔄 Logging in ${email}...${NC}"

    # Make login request
    response=$(curl -s -X POST "${API_BASE_URL}/api/login_check" \
        -H "Content-Type: application/json" \
        -d "{\"username\":\"${email}\",\"password\":\"${password}\"}" \
        -w "HTTPSTATUS:%{http_code}")

    # Extract HTTP status
    http_code=$(echo "$response" | tr -d '\n' | sed -e 's/.*HTTPSTATUS://')
    body=$(echo "$response" | sed -e 's/HTTPSTATUS:.*//')

    if [ "$http_code" -eq 200 ]; then
        # Extract token from response
        token=$(echo "$body" | grep -o '"token":"[^"]*"' | cut -d'"' -f4)
        if [ -n "$token" ]; then
            echo -e "${GREEN}✅ Login successful${NC}"
            echo "$token"
        else
            echo -e "${RED}❌ Failed to extract token from response${NC}"
            echo "Response: $body"
            exit 1
        fi
    else
        echo -e "${RED}❌ Login failed (HTTP $http_code)${NC}"
        echo "Response: $body"
        exit 1
    fi
}

# Get admin token
ADMIN_TOKEN=$(get_auth_token "$ADMIN_EMAIL" "$ADMIN_PASSWORD")

# Export tokens for other scripts
export AUTH_TOKEN="$ADMIN_TOKEN"
export ADMIN_TOKEN="$ADMIN_TOKEN"

echo -e "${GREEN}🎉 Authentication successful!${NC}"
echo -e "${BLUE}📝 Tokens exported as environment variables:${NC}"
echo -e "   AUTH_TOKEN (generic)"
echo -e "   ADMIN_TOKEN (admin specific)"

# Save tokens to a file for scripts that can't inherit environment
echo "export AUTH_TOKEN=\"$AUTH_TOKEN\"" > ./tests/.auth_tokens
echo "export ADMIN_TOKEN=\"$ADMIN_TOKEN\"" >> ./tests/.auth_tokens
echo -e "${BLUE}💾 Tokens saved to ./tests/.auth_tokens${NC}"

# Test the token
echo -e "${YELLOW}🔄 Testing token validity...${NC}"
test_response=$(curl -s -X GET "${API_BASE_URL}/api/profile" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -H "Content-Type: application/json" \
    -w "HTTPSTATUS:%{http_code}")

test_http_code=$(echo "$test_response" | tr -d '\n' | sed -e 's/.*HTTPSTATUS://')

if [ "$test_http_code" -eq 200 ]; then
    echo -e "${GREEN}✅ Token is valid${NC}"
    echo -e "${BLUE}👤 Logged in as: ${ADMIN_EMAIL}${NC}"
else
    echo -e "${RED}❌ Token validation failed${NC}"
    exit 1
fi

echo -e "${GREEN}🔑 Ready to run authenticated API tests!${NC}"