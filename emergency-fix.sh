#!/bin/bash

# 紧急修复脚本 - 解决重定向循环问题

echo "🚨 开始紧急修复重定向问题..."

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_message() {
    echo -e "${2}${1}${NC}"
}

# 1. 检查当前问题
print_message "🔍 检查当前问题..." $BLUE

# 测试重定向
print_message "测试HTTP重定向..." $YELLOW
curl -I http://vote.hashahead.org 2>/dev/null | head -5

print_message "测试HTTPS响应..." $YELLOW
curl -I https://vote.hashahead.org 2>/dev/null | head -5

# 2. 备份当前Nginx配置
print_message "📋 备份Nginx配置..." $BLUE
if [ -f "/etc/nginx/sites-available/vote.hashahead.org" ]; then
    sudo cp /etc/nginx/sites-available/vote.hashahead.org /etc/nginx/sites-available/vote.hashahead.org.backup.$(date +%Y%m%d_%H%M%S)
    print_message "✅ 配置已备份" $GREEN
fi

# 3. 创建临时修复配置
print_message "🔧 创建临时修复配置..." $BLUE

cat > /tmp/nginx-fix.conf << 'EOF'
# 临时修复配置
server {
    listen 80;
    server_name vote.hashahead.org;
    return 301 https://vote.hashahead.org$request_uri;
}

server {
    listen 443 ssl http2;
    server_name vote.hashahead.org;
    
    # SSL证书路径（请根据实际情况修改）
    ssl_certificate /etc/ssl/certs/vote.hashahead.org.crt;
    ssl_certificate_key /etc/ssl/private/vote.hashahead.org.key;
    
    # 或者如果使用Let's Encrypt
    # ssl_certificate /etc/letsencrypt/live/vote.hashahead.org/fullchain.pem;
    # ssl_certificate_key /etc/letsencrypt/live/vote.hashahead.org/privkey.pem;
    
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    
    root /var/www/hah-staking-frontend/dist;
    index index.html;
    
    # 关键：确保静态文件正确处理
    location /static/ {
        expires 1y;
        add_header Cache-Control "public";
        try_files $uri =404;
    }
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # 错误日志
    error_log /var/log/nginx/vote-error.log debug;
    access_log /var/log/nginx/vote-access.log;
}
EOF

print_message "✅ 临时配置已创建" $GREEN

# 4. 检查dist目录
print_message "📁 检查构建文件..." $BLUE

if [ -d "dist" ]; then
    print_message "✅ dist目录存在" $GREEN
    
    # 检查关键文件
    if [ -f "dist/index.html" ]; then
        print_message "✅ index.html存在" $GREEN
    else
        print_message "❌ index.html不存在" $RED
    fi
    
    if [ -d "dist/static/js" ]; then
        print_message "✅ JS目录存在" $GREEN
        ls -la dist/static/js/ | head -5
    else
        print_message "❌ JS目录不存在" $RED
    fi
    
    # 检查vendor文件
    if ls dist/static/js/vendor.*.js 1> /dev/null 2>&1; then
        print_message "✅ vendor文件存在" $GREEN
        ls -la dist/static/js/vendor.*.js
    else
        print_message "❌ vendor文件不存在" $RED
    fi
else
    print_message "❌ dist目录不存在，需要重新构建" $RED
    print_message "执行: npm run build" $YELLOW
fi

# 5. 提供修复建议
print_message "\n🛠 修复建议：" $YELLOW

print_message "1. 立即修复Nginx配置：" $NC
print_message "   sudo cp /tmp/nginx-fix.conf /etc/nginx/sites-available/vote.hashahead.org" $NC
print_message "   sudo nginx -t" $NC
print_message "   sudo systemctl reload nginx" $NC

print_message "\n2. 如果dist目录有问题，重新构建：" $NC
print_message "   npm run build" $NC
print_message "   sudo cp -r dist/* /var/www/hah-staking-frontend/dist/" $NC

print_message "\n3. 检查SSL证书路径：" $NC
print_message "   sudo ls -la /etc/ssl/certs/ | grep vote" $NC
print_message "   sudo ls -la /etc/letsencrypt/live/ | grep vote" $NC

print_message "\n4. 查看错误日志：" $NC
print_message "   sudo tail -f /var/log/nginx/vote-error.log" $NC

print_message "\n5. 测试修复结果：" $NC
print_message "   curl -I https://vote.hashahead.org" $NC
print_message "   curl -I https://vote.hashahead.org/static/js/vendor.*.js" $NC

print_message "\n⚠️  注意事项：" $RED
print_message "• 确保SSL证书路径正确" $NC
print_message "• 确保网站根目录路径正确" $NC
print_message "• 检查文件权限" $NC
print_message "• 清除浏览器缓存后测试" $NC

print_message "\n🔍 如果问题仍然存在，请检查：" $BLUE
print_message "1. 是否有其他Nginx配置文件冲突" $NC
print_message "2. 是否有CDN或代理服务器配置" $NC
print_message "3. 是否有防火墙或安全组限制" $NC
print_message "4. SSL证书是否有效" $NC
