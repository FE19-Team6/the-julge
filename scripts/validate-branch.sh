#!/usr/bin/env sh

branch=$(git symbolic-ref --short HEAD)

echo "$branch" | grep -Eq '^(feat|fix|docs|style|refactor|test|chore)/#?[0-9]+-'

if [ $? -ne 0 ]; then
  echo "❌ 브랜치명이 규칙을 따르지 않습니다."
  exit 1
fi
