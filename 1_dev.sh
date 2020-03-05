#!/usr/bin/env sh
# Pull Remote Master Branch
git pull &&
# Start Locol Dev Server
vuepress dev docs
