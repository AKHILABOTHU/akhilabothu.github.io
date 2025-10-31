#!/bin/bash
# Verify that built files are correct
if grep -q "/src/main.js" dist/index.html; then
  echo "ERROR: dist/index.html still references source files!"
  exit 1
fi
if ! grep -q "/assets/index" dist/index.html; then
  echo "ERROR: dist/index.html doesn't reference built assets!"
  exit 1
fi
echo "✓ Build verification passed"
