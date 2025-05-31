#!/bin/bash

# API Test Suite - Contact Requests Endpoints
# Tests all contact request-related endpoints

set -e

# Load utilities and authentication
source ./tests/_utils.sh
load_auth_tokens

echo -e "${BLUE}📧 Testing Contact Requests API Endpoints${NC}"

# Test 1: POST /api/contact_requests (Public - anyone can submit)
echo -e "${BLUE}📝 Test 1: Submit Contact Request (Public)${NC}"
contact_data='{
    "name": "John Test",
    "email": "john.test@example.com",
    "subject": "API Test Contact",
    "message": "This is a test contact request submitted via API"
}'

make_request "POST" "/api/contact_requests" "$contact_data" "false" "Submitting contact request"
submit_status=$?

if is_success $submit_status; then
    echo -e "${GREEN}✅ Contact request submitted successfully${NC}"
    CONTACT_ID=$(extract_id "$body")
    echo -e "${BLUE}📌 Created contact request ID: $CONTACT_ID${NC}"
else
    echo -e "${RED}❌ Failed to submit contact request${NC}"
fi

# Test 2: GET /api/contact_requests (Admin only - list all contacts)
echo -e "${BLUE}📋 Test 2: List Contact Requests (Admin)${NC}"
if [ -n "$AUTH_TOKEN" ]; then
    make_request "GET" "/api/contact_requests" "" "true" "Fetching contact requests (admin only)"
else
    echo -e "${YELLOW}⚠️  Skipping admin test - no auth token${NC}"
fi

# Test 3: GET /api/contact_requests (Unauthorized - should fail)
echo -e "${BLUE}🚫 Test 3: List Contact Requests (Unauthorized)${NC}"
make_request "GET" "/api/contact_requests" "" "false" "Attempting to fetch contact requests without auth"
verify_unauthorized $?

# Test 4: GET /api/contact_requests/{id} (Admin only)
if [ -n "$CONTACT_ID" ] && [ -n "$AUTH_TOKEN" ]; then
    echo -e "${BLUE}🔍 Test 4: Get Specific Contact Request (Admin)${NC}"
    make_request "GET" "/api/contact_requests/$CONTACT_ID" "" "true" "Fetching contact request $CONTACT_ID"
fi

# Test 5: PUT /api/contact_requests/{id} (Admin only - mark as processed)
if [ -n "$CONTACT_ID" ] && [ -n "$AUTH_TOKEN" ]; then
    echo -e "${BLUE}✏️  Test 5: Update Contact Request (Admin)${NC}"
    update_data='{
        "status": "processed",
        "adminNotes": "Test note added via API"
    }'

    make_request "PUT" "/api/contact_requests/$CONTACT_ID" "$update_data" "true" "Updating contact request $CONTACT_ID"

    if is_success $?; then
        echo -e "${GREEN}✅ Contact request updated successfully${NC}"
    else
        echo -e "${RED}❌ Failed to update contact request${NC}"
    fi
fi

# Test 6: DELETE /api/contact_requests/{id} (Admin only)
if [ -n "$CONTACT_ID" ] && [ -n "$AUTH_TOKEN" ]; then
    echo -e "${BLUE}🗑️  Test 6: Delete Contact Request (Admin)${NC}"
    make_request "DELETE" "/api/contact_requests/$CONTACT_ID" "" "true" "Deleting contact request $CONTACT_ID"

    if [ $? -eq 204 ]; then
        echo -e "${GREEN}✅ Contact request deleted successfully${NC}"
    else
        echo -e "${RED}❌ Failed to delete contact request${NC}"
    fi
fi

echo -e "${GREEN}🎉 Contact Requests API testing complete!${NC}"