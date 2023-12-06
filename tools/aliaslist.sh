#!/bin/bash

# Print list of current active aliases
echo -e "\e[1;34mCurrent active aliases:\e[0m"
grep "^alias" ~/.zshrc | sed -E 's/alias (\w+)="(.+)"/\1/' | grep -v "boohoo" | sort -u