#!/bin/bash
set -e
npm run build
sudo cp -r ./dist/* /var/www/vote/
echo 'dist OK!'