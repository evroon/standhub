#!/bin/bash
git checkout gh-pages  || exit 1

# Build static site files
yarn
yarn build

# Delete everything except the `build` directory
mv build /tmp
rm -rf * .[!.]*
cp -r /tmp/build/* .

# Push to github
git commit -a -m "gh-pages build"
git push
