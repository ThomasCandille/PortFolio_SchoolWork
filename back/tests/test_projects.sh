#!/bin/bash

# API Test Suite - Projects Endpoints
# Tests all project-related endpoints

# Load utilities and authentication
source ./tests/_utils.sh
load_auth_tokens

echo -e "${BLUE}🚀 Testing Projects API Endpoints${NC}"

# Track test results
test_passed=0
test_failed=0

# Test 1: GET /api/projects (Public - should work without auth)
echo -e "${BLUE}📋 Test 1: List Projects (Public)${NC}"
make_request "GET" "/api/projects" "" "false" "Fetching projects without authentication"
if is_success $?; then
    echo -e "${GREEN}✅ Test 1 passed${NC}"
    ((test_passed++))
else
    echo -e "${RED}❌ Test 1 failed${NC}"
    ((test_failed++))
fi

# Test 2: GET /api/projects (Admin - should show more data)
echo -e "${BLUE}📋 Test 2: List Projects (Admin)${NC}"
if [ -n "$AUTH_TOKEN" ]; then
    make_request "GET" "/api/projects" "" "true" "Fetching projects with admin authentication"
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

# Test 3: POST /api/projects (Create - Admin only)
echo -e "${BLUE}📝 Test 3: Create Project (Admin)${NC}"
if [ -n "$AUTH_TOKEN" ]; then
    project_data='{
        "title": "Test Project API",
        "description": "A test project created via API",
        "shortDescription": "API test project",
        "yearOfStudy": "1",
        "status": "draft",
        "liveUrl": "https://example.com",
        "githubUrl": "https://github.com/test/project"
    }'

    make_request "POST" "/api/projects" "$project_data" "true" "Creating a new project"
    create_status=$?

    if is_success $create_status; then
        echo -e "${GREEN}✅ Project created successfully${NC}"
        # Extract project ID for further tests
        PROJECT_ID=$(extract_id "$body")
        echo -e "${BLUE}📌 Created project ID: $PROJECT_ID${NC}"
        echo -e "${GREEN}✅ Test 3 passed${NC}"
        ((test_passed++))
    else
        echo -e "${RED}❌ Failed to create project${NC}"
        echo -e "${RED}❌ Test 3 failed${NC}"
        ((test_failed++))
    fi
else
    echo -e "${YELLOW}⚠️  Skipping create test - no auth token${NC}"
fi

# Test 4: GET /api/projects/{id} (Get specific project)
if [ -n "$PROJECT_ID" ]; then
    echo -e "${BLUE}🔍 Test 4: Get Specific Project${NC}"
    make_request "GET" "/api/projects/$PROJECT_ID" "" "false" "Fetching project $PROJECT_ID (public)"

    if is_success $?; then
        echo -e "${GREEN}✅ Test 4 passed${NC}"
        ((test_passed++))
    else
        echo -e "${RED}❌ Test 4 failed${NC}"
        ((test_failed++))
    fi

    if [ -n "$AUTH_TOKEN" ]; then
        make_request "GET" "/api/projects/$PROJECT_ID" "" "true" "Fetching project $PROJECT_ID (admin)"
        if is_success $?; then
            echo -e "${GREEN}✅ Test 4b (admin) passed${NC}"
            ((test_passed++))
        else
            echo -e "${RED}❌ Test 4b (admin) failed${NC}"
            ((test_failed++))
        fi
    fi
fi

# Test 5: PUT /api/projects/{id} (Update - Admin only)
if [ -n "$PROJECT_ID" ] && [ -n "$AUTH_TOKEN" ]; then
    echo -e "${BLUE}✏️  Test 5: Update Project (Admin)${NC}"
    update_data='{
        "title": "Updated Test Project API",
        "description": "Updated description via API",
        "yearOfStudy": "1",
        "status": "published"
    }'

    make_request "PUT" "/api/projects/$PROJECT_ID" "$update_data" "true" "Updating project $PROJECT_ID"

    if is_success $?; then
        echo -e "${GREEN}✅ Project updated successfully${NC}"
        echo -e "${GREEN}✅ Test 5 passed${NC}"
        ((test_passed++))
    else
        echo -e "${RED}❌ Failed to update project${NC}"
        echo -e "${RED}❌ Test 5 failed${NC}"
        ((test_failed++))
    fi
fi

# Test 6: POST /api/projects (Unauthorized - should fail)
echo -e "${BLUE}🚫 Test 6: Create Project (Unauthorized)${NC}"
unauthorized_data='{"title": "Unauthorized Project"}'
make_request "POST" "/api/projects" "$unauthorized_data" "false" "Attempting to create project without auth"
if verify_unauthorized; then
    echo -e "${GREEN}✅ Test 6 passed${NC}"
    ((test_passed++))
else
    echo -e "${RED}❌ Test 6 failed${NC}"
    ((test_failed++))
fi

# Test 7: DELETE /api/projects/{id} (Delete - Admin only)
if [ -n "$PROJECT_ID" ] && [ -n "$AUTH_TOKEN" ]; then
    echo -e "${BLUE}🗑️  Test 7: Delete Project (Admin)${NC}"
    make_request "DELETE" "/api/projects/$PROJECT_ID" "" "true" "Deleting project $PROJECT_ID"

    if [ $? -eq 204 ]; then
        echo -e "${GREEN}✅ Project deleted successfully${NC}"
        echo -e "${GREEN}✅ Test 7 passed${NC}"
        ((test_passed++))
    else
        echo -e "${RED}❌ Failed to delete project${NC}"
        echo -e "${RED}❌ Test 7 failed${NC}"
        ((test_failed++))
    fi
fi

echo -e "${GREEN}🎉 Projects API testing complete!${NC}"
echo -e "${BLUE}📊 Results: $test_passed passed, $test_failed failed${NC}"

# Return proper exit code
if [ $test_failed -eq 0 ]; then
    exit 0
else
    exit 1
fi