#!/bin/bash

git pull

# Build static site files
yarn
yarn build

git checkout gh-pages  || exit 1

# Delete everything except the `build` directory
mv build /tmp
rm -rf *
cp -r /tmp/build/* .

git config --global user.email "github.actions@github.com"
git config --global user.name "github-actions"

# Push to github
git add .
git commit -m "gh-pages build"
git push
