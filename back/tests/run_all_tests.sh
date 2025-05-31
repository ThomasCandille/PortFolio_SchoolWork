#!/bin/bash

# API Test Suite - Master Test Runner
# Runs all API tests in sequence

set -e

# Load utilities
source ./tests/_utils.sh

echo -e "${BLUE}🚀 Portfolio API Test Suite${NC}"
echo -e "${BLUE}================================${NC}"

# Check dependencies first
echo -e "${YELLOW}🔍 Checking dependencies...${NC}"
if ! check_dependencies; then
    exit 1
fi

# Initialize and authenticate
echo -e "${YELLOW}🔄 Initializing test environment...${NC}"
./tests/_init.sh

echo -e "${YELLOW}🔑 Authenticating...${NC}"
./tests/_auth.sh

echo -e "${GREEN}✅ Test environment ready!${NC}"
echo ""

# Track test results
declare -a test_results
declare -a test_names

run_test_suite() {
    local test_file=$1
    local test_name=$2

    echo -e "${BLUE}🧪 Running ${test_name}...${NC}"
    echo -e "${BLUE}$(printf '=%.0s' {1..50})${NC}"

    if ./$test_file; then
        test_results+=("PASS")
        echo -e "${GREEN}✅ ${test_name} completed successfully${NC}"
    else
        test_results+=("FAIL")
        echo -e "${RED}❌ ${test_name} failed${NC}"
    fi

    test_names+=("$test_name")
    echo ""
}

# Run all test suites
run_test_suite "tests/test_projects.sh" "Projects API Tests"
run_test_suite "tests/test_students.sh" "Students API Tests"
run_test_suite "tests/test_technologies.sh" "Technologies API Tests"
run_test_suite "tests/test_contact.sh" "Contact Requests API Tests"

# Summary
echo -e "${BLUE}📊 Test Results Summary${NC}"
echo -e "${BLUE}================================${NC}"

passed=0
failed=0

for i in "${!test_names[@]}"; do
    test_name="${test_names[i]}"
    result="${test_results[i]}"

    if [ "$result" = "PASS" ]; then
        echo -e "${GREEN}✅ ${test_name}${NC}"
        ((passed++))
    else
        echo -e "${RED}❌ ${test_name}${NC}"
        ((failed++))
    fi
done

echo ""
echo -e "${BLUE}Total Tests: $((passed + failed))${NC}"
echo -e "${GREEN}Passed: ${passed}${NC}"

if [ $failed -gt 0 ]; then
    echo -e "${RED}Failed: ${failed}${NC}"
    echo -e "${RED}🚨 Some tests failed!${NC}"
    exit 1
else
    echo -e "${GREEN}Failed: 0${NC}"
    echo -e "${GREEN}🎉 All tests passed successfully!${NC}"
fi