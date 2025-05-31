#!/bin/bash

# API Test Suite - Initialization Script
# This script starts the server and ensures admin user exists

set -e  # Exit on any error

echo "🚀 Initializing Portfolio API Test Environment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
export API_BASE_URL="http://127.0.0.1:8000"
export ADMIN_EMAIL="admin@portfolio.com"
export ADMIN_PASSWORD="admin123"

echo -e "${BLUE}📍 Base URL: ${API_BASE_URL}${NC}"

# Check if we're in the right directory
if [ ! -f "composer.json" ]; then
    echo -e "${RED}❌ Error: Please run this script from the backend directory (back/)${NC}"
    exit 1
fi

# Start Symfony server
echo -e "${YELLOW}🔄 Starting Symfony server...${NC}"
symfony server:start -d

# Wait a moment for server to start
sleep 2

# Check if server is running
if curl -s "${API_BASE_URL}" > /dev/null; then
    echo -e "${GREEN}✅ Server is running at ${API_BASE_URL}${NC}"
else
    echo -e "${RED}❌ Failed to start server${NC}"
    exit 1
fi

# Create admin user (if doesn't exist)
echo -e "${YELLOW}👤 Creating admin user...${NC}"
if php bin/console app:create-admin-user "$ADMIN_EMAIL" "$ADMIN_PASSWORD" "Admin" "User" 2>/dev/null; then
    echo -e "${GREEN}✅ Admin user created: ${ADMIN_EMAIL}${NC}"
else
    echo -e "${YELLOW}ℹ️  Admin user already exists: ${ADMIN_EMAIL}${NC}"
fi

# Test basic server connectivity
echo -e "${YELLOW}🔗 Testing server connectivity...${NC}"
if curl -s -o /dev/null -w "%{http_code}" "${API_BASE_URL}" | grep -q "200\|404"; then
    echo -e "${GREEN}✅ Server is reachable${NC}"
else
    echo -e "${RED}❌ Server is not reachable${NC}"
    exit 1
fi

echo -e "${GREEN}🎉 Server initialization complete!${NC}"
echo -e "${BLUE}💡 Run './tests/_auth.sh' to authenticate and get tokens${NC}"