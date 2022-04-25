#!/usr/bin/env sh

# Call using npm build

cp node_modules/tinymce/tinymce.min.js public/res/scripts

cp -rf scss/button.css public/button.css
cp -rf scss/global.css public/global.css
cp -rf scss/stack.css public/stack.css
cp -rf html/index.html public/index.html
