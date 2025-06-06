#!/bin/bash

# 重定向问题诊断脚本

echo "🔍 诊断重定向问题..."

DOMAIN="vote.hashahead.org"
TEST_URL="https://$DOMAIN/static/js/vendor.c6552a08a8acb14e157f.js"

echo "📋 测试域名: $DOMAIN"
echo "📋 测试URL: $TEST_URL"

echo ""
echo "🌐 测试HTTP重定向..."
curl -I "http://$DOMAIN" 2>/dev/null | head -10

echo ""
echo "🔒 测试HTTPS响应..."
curl -I "https://$DOMAIN" 2>/dev/null | head -10

echo ""
echo "📦 测试静态资源..."
curl -I "$TEST_URL" 2>/dev/null | head -10

echo ""
echo "🔄 跟踪重定向链..."
curl -L -I "http://$DOMAIN" 2>/dev/null | grep -E "(HTTP|Location)"

echo ""
echo "📊 详细重定向分析..."
curl -v "http://$DOMAIN" 2>&1 | grep -E "(< HTTP|< Location|> Host)"

echo ""
echo "🔧 建议检查项目："
echo "1. Nginx配置中的重定向规则"
echo "2. 是否有多个重定向规则冲突"
echo "3. SSL证书是否正确配置"
echo "4. 静态文件路径是否正确"
