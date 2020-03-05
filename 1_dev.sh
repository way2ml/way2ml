#!/usr/bin/env sh

echo 'Pulling Down From The Remote Master Branch ...'
# Pull Remote Master Branch
git pull &&
# Start Locol Dev Server
vuepress dev docs
