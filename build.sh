#!/bin/bash

git pull
npm run prod
pm2 log