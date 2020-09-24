#!/usr/bin/env sh
# This script add, commit, and push all changes to remote master 

# Add all except those in .gitignore
echo "*******************************************************"
echo " 1. Adding Files ..."
echo "*******************************************************"
git add *
git status 

echo "*******************************************************"
echo " 2. Commit & Push By Yourself ..."
echo "*******************************************************"
echo "Please excute the followings by yourself:"
echo ">> git commit -m 'YOUR COMMIT MESSAGE!'"
echo ">> git push origin master" 
