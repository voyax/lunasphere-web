#!/bin/bash

echo "测试 Accept-Language 自动检测功能"
echo "=========================================="
echo ""

echo "1. 测试英文浏览器访问根路径 (Accept-Language: en-US)"
echo "预期: 重定向到 /en"
curl -s -I -H "Accept-Language: en-US,en;q=0.9" http://localhost:3000/ | grep -i location
echo ""

echo "2. 测试中文浏览器访问根路径 (Accept-Language: zh-CN)"
echo "预期: 不重定向或重定向到 / (因为中文是默认语言)"
curl -s -I -H "Accept-Language: zh-CN,zh;q=0.9" http://localhost:3000/ | grep -i location
echo ""

echo "3. 测试无 Accept-Language 头访问"
echo "预期: 使用默认语言 (中文)"
curl -s -I http://localhost:3000/ | grep -i location
echo ""

echo "4. 测试直接访问 /en 页面"
curl -s -I http://localhost:3000/en | head -n 1
echo ""

echo "5. 测试直接访问 /zh 页面"
curl -s -I http://localhost:3000/zh | head -n 1
echo ""
