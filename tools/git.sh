#!/bin/bash

# Ask for commit message
echo "Enter commit message:"
read commit_message

# Add changes to the Git repository
git add .

# Commit the changes
git commit -m "$commit_message"

# Push changes to master
git push origin master 