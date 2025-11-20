#!/bin/sh

branch=$(git symbolic-ref --short HEAD)

if echo "$branch" | grep -Eq '^(feat|fix|docs|style|refactor|test|chore)\/#?[0-9]+-'; then
  echo "✅ 브랜치명 규칙 통과: $branch"
else
  echo "❌ 브랜치명이 규칙을 따르지 않습니다."
  echo "형식 예: feat/#123-details"
  exit 1
fi
