#!/bin/bash

# Introduction
echo -e "\e[94mLet's add a new alias to your zsh configuration. Ready?\e[0m"
echo -e "\e[1;33m(y/n)\e[0m"

# Read user input
read -p $'\e[31m###\e[32m>>>\e[0m ' answer

# Check user input
case $answer in
    [yY] | [yY][eE][sS] | [yY][aA] | [yY][eE][hH] | [oO][kK][aA][yY] | [sS][uU][rR][eE])
        # Prompt for alias name
        read -p "Enter the alias name: " alias_name

        # Prompt for alias path
        read -p "Enter the alias path: " alias_path

        # Remove existing alias if present
        sed -i "/^alias $alias_name=/d" ~/.zshrc

        # Append alias to .zshrc
        echo "alias $alias_name=\"$alias_path\"" >> ~/.zshrc
        echo "Alias added to .zshrc"

        # Source .zshrc
        echo "Sourcing .zshrc..."
        zsh -c "source ~/.zshrc"

        # Print list of current active aliases
        echo -e "\e[1;34mCurrent active aliases:\e[0m"
        grep "^alias" ~/.zshrc | sed -E 's/alias (\w+)="(.+)"/\1/' | grep -v "boohoo" | sort -u
        ;;
    [nN] | [nN][oO] | [nN][aA][hH] | [nN][oO][pP][eE] )
        echo "Alright, maybe next time!"
        exit 1
        ;;
    * )
        echo "Say what??"
        exit 1
        ;;
esac