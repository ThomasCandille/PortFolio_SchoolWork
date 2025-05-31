#!/bin/bash

# API Test Suite - Students Endpoints
# Tests all student-related endpoints

set -e

# Load utilities and authentication
source ./tests/_utils.sh
load_auth_tokens

echo -e "${BLUE}🎓 Testing Students API Endpoints${NC}"

# Test 1: GET /api/students (Public)
echo -e "${BLUE}📋 Test 1: List Students (Public)${NC}"
make_request "GET" "/api/students" "" "false" "Fetching students without authentication"

# Test 2: POST /api/students (Create - Admin only)
echo -e "${BLUE}📝 Test 2: Create Student (Admin)${NC}"
if [ -n "$AUTH_TOKEN" ]; then
    student_data='{
        "name": "John Doe API Test",
        "email": "john.doe.api@test.com",
        "year": "2024",
        "bio": "A test student created via API"
    }'

    make_request "POST" "/api/students" "$student_data" "true" "Creating a new student"
    create_status=$?

    if is_success $create_status; then
        echo -e "${GREEN}✅ Student created successfully${NC}"
        STUDENT_ID=$(extract_id "$body")
        echo -e "${BLUE}📌 Created student ID: $STUDENT_ID${NC}"
    else
        echo -e "${RED}❌ Failed to create student${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  Skipping create test - no auth token${NC}"
fi

# Test 3: GET /api/students/{id} (Get specific student)
if [ -n "$STUDENT_ID" ]; then
    echo -e "${BLUE}🔍 Test 3: Get Specific Student${NC}"
    make_request "GET" "/api/students/$STUDENT_ID" "" "false" "Fetching student $STUDENT_ID"
fi

# Test 4: PUT /api/students/{id} (Update - Admin only)
if [ -n "$STUDENT_ID" ] && [ -n "$AUTH_TOKEN" ]; then
    echo -e "${BLUE}✏️  Test 4: Update Student (Admin)${NC}"
    update_data='{
        "name": "John Doe Updated",
        "bio": "Updated bio via API"
    }'

    make_request "PUT" "/api/students/$STUDENT_ID" "$update_data" "true" "Updating student $STUDENT_ID"

    if is_success $?; then
        echo -e "${GREEN}✅ Student updated successfully${NC}"
    else
        echo -e "${RED}❌ Failed to update student${NC}"
    fi
fi

# Test 5: POST /api/students (Unauthorized)
echo -e "${BLUE}🚫 Test 5: Create Student (Unauthorized)${NC}"
unauthorized_data='{"name": "Unauthorized Student", "email": "unauthorized@test.com", "year": "2024"}'
make_request "POST" "/api/students" "$unauthorized_data" "false" "Attempting to create student without auth"
verify_unauthorized $?

# Test 6: DELETE /api/students/{id} (Delete - Admin only)
if [ -n "$STUDENT_ID" ] && [ -n "$AUTH_TOKEN" ]; then
    echo -e "${BLUE}🗑️  Test 6: Delete Student (Admin)${NC}"
    make_request "DELETE" "/api/students/$STUDENT_ID" "" "true" "Deleting student $STUDENT_ID"

    if [ $? -eq 204 ]; then
        echo -e "${GREEN}✅ Student deleted successfully${NC}"
    else
        echo -e "${RED}❌ Failed to delete student${NC}"
    fi
fi

echo -e "${GREEN}🎉 Students API testing complete!${NC}"