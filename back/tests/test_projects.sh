#!/bin/bash

# API Test Suite - Projects Endpoints
# Tests all project-related endpoints

set -e

# Load utilities and authentication
source ./tests/_utils.sh
load_auth_tokens

echo -e "${BLUE}🚀 Testing Projects API Endpoints${NC}"

# Test 1: GET /api/projects (Public - should work without auth)
echo -e "${BLUE}📋 Test 1: List Projects (Public)${NC}"
make_request "GET" "/api/projects" "" "false" "Fetching projects without authentication"

# Test 2: GET /api/projects (Admin - should show more data)
echo -e "${BLUE}📋 Test 2: List Projects (Admin)${NC}"
if [ -n "$AUTH_TOKEN" ]; then
    make_request "GET" "/api/projects" "" "true" "Fetching projects with admin authentication"
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
        "year": "2024",
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
    else
        echo -e "${RED}❌ Failed to create project${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  Skipping create test - no auth token${NC}"
fi

# Test 4: GET /api/projects/{id} (Get specific project)
if [ -n "$PROJECT_ID" ]; then
    echo -e "${BLUE}🔍 Test 4: Get Specific Project${NC}"
    make_request "GET" "/api/projects/$PROJECT_ID" "" "false" "Fetching project $PROJECT_ID (public)"

    if [ -n "$AUTH_TOKEN" ]; then
        make_request "GET" "/api/projects/$PROJECT_ID" "" "true" "Fetching project $PROJECT_ID (admin)"
    fi
fi

# Test 5: PUT /api/projects/{id} (Update - Admin only)
if [ -n "$PROJECT_ID" ] && [ -n "$AUTH_TOKEN" ]; then
    echo -e "${BLUE}✏️  Test 5: Update Project (Admin)${NC}"
    update_data='{
        "title": "Updated Test Project API",
        "description": "Updated description via API",
        "status": "published"
    }'

    make_request "PUT" "/api/projects/$PROJECT_ID" "$update_data" "true" "Updating project $PROJECT_ID"

    if is_success $?; then
        echo -e "${GREEN}✅ Project updated successfully${NC}"
    else
        echo -e "${RED}❌ Failed to update project${NC}"
    fi
fi

# Test 6: POST /api/projects (Unauthorized - should fail)
echo -e "${BLUE}🚫 Test 6: Create Project (Unauthorized)${NC}"
unauthorized_data='{"title": "Unauthorized Project"}'
make_request "POST" "/api/projects" "$unauthorized_data" "false" "Attempting to create project without auth"
verify_unauthorized $?

# Test 7: DELETE /api/projects/{id} (Delete - Admin only)
if [ -n "$PROJECT_ID" ] && [ -n "$AUTH_TOKEN" ]; then
    echo -e "${BLUE}🗑️  Test 7: Delete Project (Admin)${NC}"
    make_request "DELETE" "/api/projects/$PROJECT_ID" "" "true" "Deleting project $PROJECT_ID"

    if [ $? -eq 204 ]; then
        echo -e "${GREEN}✅ Project deleted successfully${NC}"
    else
        echo -e "${RED}❌ Failed to delete project${NC}"
    fi
fi

echo -e "${GREEN}🎉 Projects API testing complete!${NC}"