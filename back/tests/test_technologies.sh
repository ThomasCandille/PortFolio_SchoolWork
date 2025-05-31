#!/bin/bash

# API Test Suite - Technologies Endpoints
# Tests all technology-related endpoints

set -e

# Load utilities and authentication
source ./tests/_utils.sh
load_auth_tokens

echo -e "${BLUE}🔧 Testing Technologies API Endpoints${NC}"

# Test 1: GET /api/technologies (Public)
echo -e "${BLUE}📋 Test 1: List Technologies (Public)${NC}"
make_request "GET" "/api/technologies" "" "false" "Fetching technologies without authentication"

# Test 2: POST /api/technologies (Create - Admin only)
echo -e "${BLUE}📝 Test 2: Create Technology (Admin)${NC}"
if [ -n "$AUTH_TOKEN" ]; then
    tech_data='{
        "name": "Test Framework API",
        "category": "framework",
        "color": "#FF6B6B",
        "icon": "test-icon"
    }'

    make_request "POST" "/api/technologies" "$tech_data" "true" "Creating a new technology"
    create_status=$?

    if is_success $create_status; then
        echo -e "${GREEN}✅ Technology created successfully${NC}"
        TECH_ID=$(extract_id "$body")
        echo -e "${BLUE}📌 Created technology ID: $TECH_ID${NC}"
    else
        echo -e "${RED}❌ Failed to create technology${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  Skipping create test - no auth token${NC}"
fi

# Test 3: GET /api/technologies/{id} (Get specific technology)
if [ -n "$TECH_ID" ]; then
    echo -e "${BLUE}🔍 Test 3: Get Specific Technology${NC}"
    make_request "GET" "/api/technologies/$TECH_ID" "" "false" "Fetching technology $TECH_ID"
fi

# Test 4: PUT /api/technologies/{id} (Update - Admin only)
if [ -n "$TECH_ID" ] && [ -n "$AUTH_TOKEN" ]; then
    echo -e "${BLUE}✏️  Test 4: Update Technology (Admin)${NC}"
    update_data='{
        "name": "Updated Test Framework API",
        "category": "library",
        "color": "#4ECDC4"
    }'

    make_request "PUT" "/api/technologies/$TECH_ID" "$update_data" "true" "Updating technology $TECH_ID"

    if is_success $?; then
        echo -e "${GREEN}✅ Technology updated successfully${NC}"
    else
        echo -e "${RED}❌ Failed to update technology${NC}"
    fi
fi

# Test 5: POST /api/technologies (Unauthorized)
echo -e "${BLUE}🚫 Test 5: Create Technology (Unauthorized)${NC}"
unauthorized_data='{"name": "Unauthorized Tech", "category": "framework"}'
make_request "POST" "/api/technologies" "$unauthorized_data" "false" "Attempting to create technology without auth"
verify_unauthorized $?

# Test 6: DELETE /api/technologies/{id} (Delete - Admin only)
if [ -n "$TECH_ID" ] && [ -n "$AUTH_TOKEN" ]; then
    echo -e "${BLUE}🗑️  Test 6: Delete Technology (Admin)${NC}"
    make_request "DELETE" "/api/technologies/$TECH_ID" "" "true" "Deleting technology $TECH_ID"

    if [ $? -eq 204 ]; then
        echo -e "${GREEN}✅ Technology deleted successfully${NC}"
    else
        echo -e "${RED}❌ Failed to delete technology${NC}"
    fi
fi

echo -e "${GREEN}🎉 Technologies API testing complete!${NC}"