#!/bin/bash

# API Test Suite - Students Endpoints
# Tests all student-related endpoints

# Load utilities and authentication
source ./tests/_utils.sh
load_auth_tokens

echo -e "${BLUE}🎓 Testing Students API Endpoints${NC}"

# Track test results
test_passed=0
test_failed=0

# Test 1: GET /api/students (Public)
echo -e "${BLUE}📋 Test 1: List Students (Public)${NC}"
make_request "GET" "/api/students" "" "false" "Fetching students without authentication"
if is_success $?; then
    echo -e "${GREEN}✅ Test 1 passed${NC}"
    ((test_passed++))
else
    echo -e "${RED}❌ Test 1 failed${NC}"
    ((test_failed++))
fi

# Test 2: POST /api/students (Create - Admin only)
echo -e "${BLUE}📝 Test 2: Create Student (Admin)${NC}"
if [ -n "$AUTH_TOKEN" ]; then
    student_data='{
        "name": "John Doe API Test",
        "email": "john.doe.api@test.com",
        "yearOfStudy": "1",
        "bio": "A test student created via API"
    }'

    make_request "POST" "/api/students" "$student_data" "true" "Creating a new student"
    create_status=$?

    if is_success $create_status; then
        echo -e "${GREEN}✅ Student created successfully${NC}"
        STUDENT_ID=$(extract_id "$body")
        echo -e "${BLUE}📌 Created student ID: $STUDENT_ID${NC}"
        echo -e "${GREEN}✅ Test 2 passed${NC}"
        ((test_passed++))
    else
        echo -e "${RED}❌ Failed to create student${NC}"
        echo -e "${RED}❌ Test 2 failed${NC}"
        ((test_failed++))
    fi
else
    echo -e "${YELLOW}⚠️  Skipping create test - no auth token${NC}"
fi

# Test 3: GET /api/students/{id} (Get specific student)
if [ -n "$STUDENT_ID" ]; then
    echo -e "${BLUE}🔍 Test 3: Get Specific Student${NC}"
    make_request "GET" "/api/students/$STUDENT_ID" "" "false" "Fetching student $STUDENT_ID"
    if is_success $?; then
        echo -e "${GREEN}✅ Test 3 passed${NC}"
        ((test_passed++))
    else
        echo -e "${RED}❌ Test 3 failed${NC}"
        ((test_failed++))
    fi
fi

# Test 4: PUT /api/students/{id} (Update - Admin only)
if [ -n "$STUDENT_ID" ] && [ -n "$AUTH_TOKEN" ]; then
    echo -e "${BLUE}✏️  Test 4: Update Student (Admin)${NC}"
    update_data='{
        "name": "John Doe Updated",
        "email": "john.doe.updated@test.com",
        "bio": "Updated bio via API"
    }'

    make_request "PUT" "/api/students/$STUDENT_ID" "$update_data" "true" "Updating student $STUDENT_ID"

    if is_success $?; then
        echo -e "${GREEN}✅ Student updated successfully${NC}"
        echo -e "${GREEN}✅ Test 4 passed${NC}"
        ((test_passed++))
    else
        echo -e "${RED}❌ Failed to update student${NC}"
        echo -e "${RED}❌ Test 4 failed${NC}"
        ((test_failed++))
    fi
fi

# Test 5: POST /api/students (Unauthorized)
echo -e "${BLUE}🚫 Test 5: Create Student (Unauthorized)${NC}"
unauthorized_data='{"name": "Unauthorized Student", "email": "unauthorized@test.com", "yearOfStudy": "1"}'
make_request "POST" "/api/students" "$unauthorized_data" "false" "Attempting to create student without auth"
if verify_unauthorized; then
    echo -e "${GREEN}✅ Test 5 passed${NC}"
    ((test_passed++))
else
    echo -e "${RED}❌ Test 5 failed${NC}"
    ((test_failed++))
fi

# Test 6: DELETE /api/students/{id} (Delete - Admin only)
if [ -n "$STUDENT_ID" ] && [ -n "$AUTH_TOKEN" ]; then
    echo -e "${BLUE}🗑️  Test 6: Delete Student (Admin)${NC}"
    make_request "DELETE" "/api/students/$STUDENT_ID" "" "true" "Deleting student $STUDENT_ID"

    if [ $? -eq 204 ]; then
        echo -e "${GREEN}✅ Student deleted successfully${NC}"
        echo -e "${GREEN}✅ Test 6 passed${NC}"
        ((test_passed++))
    else
        echo -e "${RED}❌ Failed to delete student${NC}"
        echo -e "${RED}❌ Test 6 failed${NC}"
        ((test_failed++))
    fi
fi

echo -e "${GREEN}🎉 Students API testing complete!${NC}"
echo -e "${BLUE}📊 Results: $test_passed passed, $test_failed failed${NC}"

# Return proper exit code
if [ $test_failed -eq 0 ]; then
    exit 0
else
    exit 1
fi