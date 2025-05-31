#!/bin/bash

# API Test Suite - Technologies Endpoints
# Tests all technology-related endpoints

# Load utilities and authentication
source ./tests/_utils.sh
load_auth_tokens

echo -e "${BLUE}🔧 Testing Technologies API Endpoints${NC}"

# Track test results
test_passed=0
test_failed=0

# Test 1: GET /api/technologies (Public)
echo -e "${BLUE}📋 Test 1: List Technologies (Public)${NC}"
make_request "GET" "/api/technologies" "" "false" "Fetching technologies without authentication"
if is_success $?; then
    echo -e "${GREEN}✅ Test 1 passed${NC}"
    ((test_passed++))
else
    echo -e "${RED}❌ Test 1 failed${NC}"
    ((test_failed++))
fi

# Test 2: POST /api/technologies (Create - Admin only)
echo -e "${BLUE}📝 Test 2: Create Technology (Admin)${NC}"
if [ -n "$AUTH_TOKEN" ]; then
    tech_data='{
        "name": "Test Framework API",
        "category": "Frontend",
        "icon": "test-icon"
    }'

    make_request "POST" "/api/technologies" "$tech_data" "true" "Creating a new technology"
    create_status=$?

    if is_success $create_status; then
        echo -e "${GREEN}✅ Technology created successfully${NC}"
        TECH_ID=$(extract_id "$body")
        echo -e "${BLUE}📌 Created technology ID: $TECH_ID${NC}"
        echo -e "${GREEN}✅ Test 2 passed${NC}"
        ((test_passed++))
    else
        echo -e "${RED}❌ Failed to create technology${NC}"
        echo -e "${RED}❌ Test 2 failed${NC}"
        ((test_failed++))
    fi
else
    echo -e "${YELLOW}⚠️  Skipping create test - no auth token${NC}"
fi

# Test 3: GET /api/technologies/{id} (Get specific technology)
if [ -n "$TECH_ID" ]; then
    echo -e "${BLUE}🔍 Test 3: Get Specific Technology${NC}"
    make_request "GET" "/api/technologies/$TECH_ID" "" "false" "Fetching technology $TECH_ID"
    if is_success $?; then
        echo -e "${GREEN}✅ Test 3 passed${NC}"
        ((test_passed++))
    else
        echo -e "${RED}❌ Test 3 failed${NC}"
        ((test_failed++))
    fi
fi

# Test 4: PUT /api/technologies/{id} (Update - Admin only)
if [ -n "$TECH_ID" ] && [ -n "$AUTH_TOKEN" ]; then
    echo -e "${BLUE}✏️  Test 4: Update Technology (Admin)${NC}"
    update_data='{
        "name": "Updated Test Framework API",
        "category": "Backend"
    }'

    make_request "PUT" "/api/technologies/$TECH_ID" "$update_data" "true" "Updating technology $TECH_ID"

    if is_success $?; then
        echo -e "${GREEN}✅ Technology updated successfully${NC}"
        echo -e "${GREEN}✅ Test 4 passed${NC}"
        ((test_passed++))
    else
        echo -e "${RED}❌ Failed to update technology${NC}"
        echo -e "${RED}❌ Test 4 failed${NC}"
        ((test_failed++))
    fi
fi

# Test 5: POST /api/technologies (Unauthorized)
echo -e "${BLUE}🚫 Test 5: Create Technology (Unauthorized)${NC}"
unauthorized_data='{"name": "Unauthorized Tech", "category": "Frontend"}'
make_request "POST" "/api/technologies" "$unauthorized_data" "false" "Attempting to create technology without auth"
if verify_unauthorized; then
    echo -e "${GREEN}✅ Test 5 passed${NC}"
    ((test_passed++))
else
    echo -e "${RED}❌ Test 5 failed${NC}"
    ((test_failed++))
fi

# Test 6: DELETE /api/technologies/{id} (Delete - Admin only)
if [ -n "$TECH_ID" ] && [ -n "$AUTH_TOKEN" ]; then
    echo -e "${BLUE}🗑️  Test 6: Delete Technology (Admin)${NC}"
    make_request "DELETE" "/api/technologies/$TECH_ID" "" "true" "Deleting technology $TECH_ID"

    if [ $? -eq 204 ]; then
        echo -e "${GREEN}✅ Technology deleted successfully${NC}"
        echo -e "${GREEN}✅ Test 6 passed${NC}"
        ((test_passed++))
    else
        echo -e "${RED}❌ Failed to delete technology${NC}"
        echo -e "${RED}❌ Test 6 failed${NC}"
        ((test_failed++))
    fi
fi

echo -e "${GREEN}🎉 Technologies API testing complete!${NC}"
echo -e "${BLUE}📊 Results: $test_passed passed, $test_failed failed${NC}"

# Return proper exit code
if [ $test_failed -eq 0 ]; then
    exit 0
else
    exit 1
fi