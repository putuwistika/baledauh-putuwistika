#!/bin/bash
echo "🔄 Restarting development server..."
echo ""
echo "Step 1: Killing any running npm processes..."
pkill -f "vite" || echo "No vite process found"
pkill -f "npm run dev" || echo "No npm dev process found"
sleep 2
echo ""
echo "Step 2: Clearing node_modules cache..."
rm -rf node_modules/.vite
echo ""
echo "Step 3: Starting fresh dev server..."
npm run dev
