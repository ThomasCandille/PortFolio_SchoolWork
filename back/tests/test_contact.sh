#!/bin/bash

# API Test Suite - Contact Requests Endpoints
# Tests all contact request-related endpoints

# Load utilities and authentication
source ./tests/_utils.sh
load_auth_tokens

echo -e "${BLUE}📧 Testing Contact Requests API Endpoints${NC}"

# Track test results
test_passed=0
test_failed=0

# Test 1: POST /api/contact/admissions (Public - anyone can submit)
echo -e "${BLUE}📝 Test 1: Submit Contact Request (Public)${NC}"
contact_data='{
    "firstName": "John",
    "lastName": "Test",
    "email": "john.test@example.com",
    "message": "This is a test contact request submitted via API"
}'

make_request "POST" "/api/contact/admissions" "$contact_data" "false" "Submitting contact request"
submit_status=$?

if is_success $submit_status; then
    echo -e "${GREEN}✅ Contact request submitted successfully${NC}"
    CONTACT_ID=$(extract_id "$body")
    echo -e "${BLUE}📌 Created contact request ID: $CONTACT_ID${NC}"
    echo -e "${GREEN}✅ Test 1 passed${NC}"
    ((test_passed++))
else
    echo -e "${RED}❌ Failed to submit contact request${NC}"
    echo -e "${RED}❌ Test 1 failed${NC}"
    ((test_failed++))
fi

# Test 2: GET /api/contact_requests (Admin only - list all contacts)
echo -e "${BLUE}📋 Test 2: List Contact Requests (Admin)${NC}"
if [ -n "$AUTH_TOKEN" ]; then
    make_request "GET" "/api/contact_requests" "" "true" "Fetching contact requests (admin only)"
    if is_success $?; then
        echo -e "${GREEN}✅ Test 2 passed${NC}"
        ((test_passed++))
    else
        echo -e "${RED}❌ Test 2 failed${NC}"
        ((test_failed++))
    fi
else
    echo -e "${YELLOW}⚠️  Skipping admin test - no auth token${NC}"
fi

# Test 3: GET /api/contact_requests (Unauthorized - should fail)
echo -e "${BLUE}🚫 Test 3: List Contact Requests (Unauthorized)${NC}"
make_request "GET" "/api/contact_requests" "" "false" "Attempting to fetch contact requests without auth"
if verify_unauthorized; then
    echo -e "${GREEN}✅ Test 3 passed${NC}"
    ((test_passed++))
else
    echo -e "${RED}❌ Test 3 failed${NC}"
    ((test_failed++))
fi

# Test 4: GET /api/contact_requests/{id} (Admin only)
if [ -n "$CONTACT_ID" ] && [ -n "$AUTH_TOKEN" ]; then
    echo -e "${BLUE}🔍 Test 4: Get Specific Contact Request (Admin)${NC}"
    make_request "GET" "/api/contact_requests/$CONTACT_ID" "" "true" "Fetching contact request $CONTACT_ID"
    if is_success $?; then
        echo -e "${GREEN}✅ Test 4 passed${NC}"
        ((test_passed++))
    else
        echo -e "${RED}❌ Test 4 failed${NC}"
        ((test_failed++))
    fi
fi

# Test 5: PUT /api/contact_requests/{id} (Admin only - mark as processed)
if [ -n "$CONTACT_ID" ] && [ -n "$AUTH_TOKEN" ]; then
    echo -e "${BLUE}✏️  Test 5: Update Contact Request (Admin)${NC}"
    update_data='{
        "firstName": "John",
        "lastName": "Test",
        "email": "john.test@example.com",
        "message": "This is a test contact request submitted via API",
        "status": "read",
        "adminNotes": "Test note added via API"
    }'

    make_request "PUT" "/api/contact_requests/$CONTACT_ID" "$update_data" "true" "Updating contact request $CONTACT_ID"

    if is_success $?; then
        echo -e "${GREEN}✅ Contact request updated successfully${NC}"
        echo -e "${GREEN}✅ Test 5 passed${NC}"
        ((test_passed++))
    else
        echo -e "${RED}❌ Failed to update contact request${NC}"
        echo -e "${RED}❌ Test 5 failed${NC}"
        ((test_failed++))
    fi
fi

# Test 6: DELETE /api/contact_requests/{id} (Admin only)
if [ -n "$CONTACT_ID" ] && [ -n "$AUTH_TOKEN" ]; then
    echo -e "${BLUE}🗑️  Test 6: Delete Contact Request (Admin)${NC}"
    make_request "DELETE" "/api/contact_requests/$CONTACT_ID" "" "true" "Deleting contact request $CONTACT_ID"

    if [ $? -eq 204 ]; then
        echo -e "${GREEN}✅ Contact request deleted successfully${NC}"
        echo -e "${GREEN}✅ Test 6 passed${NC}"
        ((test_passed++))
    else
        echo -e "${RED}❌ Failed to delete contact request${NC}"
        echo -e "${RED}❌ Test 6 failed${NC}"
        ((test_failed++))
    fi
fi

echo -e "${GREEN}🎉 Contact Requests API testing complete!${NC}"
echo -e "${BLUE}📊 Results: $test_passed passed, $test_failed failed${NC}"

# Return proper exit code
if [ $test_failed -eq 0 ]; then
    exit 0
else
    exit 1
fi