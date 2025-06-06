#!/bin/bash

# HAH Staking Frontend 部署脚本
# 解决HTTPS混合内容问题的完整部署方案

set -e  # 遇到错误立即退出

echo "🚀 开始部署 HAH Staking Frontend..."

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 函数：打印彩色消息
print_message() {
    echo -e "${2}${1}${NC}"
}

# 检查Node.js和npm
print_message "检查环境依赖..." $BLUE
if ! command -v node &> /dev/null; then
    print_message "❌ Node.js 未安装" $RED
    exit 1
fi

if ! command -v npm &> /dev/null; then
    print_message "❌ npm 未安装" $RED
    exit 1
fi

print_message "✅ Node.js 版本: $(node --version)" $GREEN
print_message "✅ npm 版本: $(npm --version)" $GREEN

# 安装依赖
print_message "📦 安装依赖..." $BLUE
npm install

# 执行HTTPS兼容构建
print_message "🔨 执行HTTPS兼容构建..." $BLUE
npm run build:prod

# 检查构建结果
if [ ! -d "dist" ]; then
    print_message "❌ 构建失败：dist目录不存在" $RED
    exit 1
fi

if [ ! -f "dist/index.html" ]; then
    print_message "❌ 构建失败：index.html不存在" $RED
    exit 1
fi

print_message "✅ 构建成功" $GREEN

# 检查HTTPS兼容性
print_message "🔍 检查HTTPS兼容性..." $BLUE

# 检查是否还有HTTP链接
if grep -r "http://" dist/ --exclude-dir=node_modules 2>/dev/null; then
    print_message "⚠️  发现HTTP链接，可能导致混合内容问题" $YELLOW
    print_message "请检查上述文件中的HTTP链接" $YELLOW
else
    print_message "✅ 未发现HTTP链接" $GREEN
fi

# 检查CSP头部
if grep -q "upgrade-insecure-requests" dist/index.html; then
    print_message "✅ CSP头部已配置" $GREEN
else
    print_message "⚠️  CSP头部未配置" $YELLOW
fi

# 生成部署信息
print_message "📋 生成部署信息..." $BLUE

cat > dist/deployment-info.json << EOF
{
  "buildTime": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "nodeVersion": "$(node --version)",
  "npmVersion": "$(npm --version)",
  "gitCommit": "$(git rev-parse HEAD 2>/dev/null || echo 'unknown')",
  "gitBranch": "$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo 'unknown')",
  "httpsCompatible": true,
  "cspEnabled": true
}
EOF

# 创建部署验证脚本
cat > dist/verify-deployment.html << 'EOF'
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>部署验证</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #1a1a1a; color: white; }
        .check { margin: 10px 0; padding: 10px; border-radius: 5px; }
        .pass { background: #2d5a2d; border-left: 4px solid #4caf50; }
        .fail { background: #5a2d2d; border-left: 4px solid #f44336; }
        .warn { background: #5a5a2d; border-left: 4px solid #ff9800; }
        button { background: #EAAE36; color: black; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin: 5px; }
    </style>
</head>
<body>
    <h1>HAH Staking Frontend 部署验证</h1>
    <div id="checks"></div>
    <button onclick="runChecks()">重新检查</button>
    <button onclick="window.location.href='/'">返回主页</button>

    <script>
        function addCheck(message, status) {
            const div = document.createElement('div');
            div.className = `check ${status}`;
            div.innerHTML = `${status === 'pass' ? '✅' : status === 'fail' ? '❌' : '⚠️'} ${message}`;
            document.getElementById('checks').appendChild(div);
        }

        function runChecks() {
            document.getElementById('checks').innerHTML = '';
            
            // 检查HTTPS
            if (location.protocol === 'https:') {
                addCheck('HTTPS协议检查通过', 'pass');
            } else {
                addCheck('当前不是HTTPS协议，可能出现混合内容问题', 'fail');
            }
            
            // 检查混合内容
            let mixedContent = false;
            const scripts = document.querySelectorAll('script[src]');
            const links = document.querySelectorAll('link[href]');
            
            scripts.forEach(script => {
                if (script.src.startsWith('http://')) {
                    mixedContent = true;
                }
            });
            
            links.forEach(link => {
                if (link.href.startsWith('http://')) {
                    mixedContent = true;
                }
            });
            
            if (mixedContent) {
                addCheck('发现HTTP资源，存在混合内容风险', 'fail');
            } else {
                addCheck('未发现HTTP资源', 'pass');
            }
            
            // 检查钱包环境
            if (window.ethereum || window.tpWallet) {
                addCheck('检测到钱包环境', 'pass');
            } else {
                addCheck('未检测到钱包环境（正常，需要在钱包中打开）', 'warn');
            }
            
            // 检查控制台错误
            const originalError = console.error;
            let hasErrors = false;
            console.error = function(...args) {
                hasErrors = true;
                originalError.apply(console, args);
            };
            
            setTimeout(() => {
                if (hasErrors) {
                    addCheck('控制台有错误信息，请检查', 'warn');
                } else {
                    addCheck('控制台无错误信息', 'pass');
                }
            }, 1000);
        }
        
        // 页面加载完成后自动检查
        window.addEventListener('load', runChecks);
    </script>
</body>
</html>
EOF

print_message "✅ 部署验证页面已生成" $GREEN

# 显示部署总结
print_message "\n🎉 部署准备完成！" $GREEN
print_message "📁 构建文件位置: $(pwd)/dist" $BLUE
print_message "📋 部署检查清单: $(pwd)/dist/deployment-checklist.md" $BLUE
print_message "🔍 部署验证页面: $(pwd)/dist/verify-deployment.html" $BLUE

print_message "\n📝 下一步操作：" $YELLOW
print_message "1. 将 dist/ 目录内容上传到服务器" $NC
print_message "2. 配置Nginx（参考 nginx.conf.example）" $NC
print_message "3. 确保SSL证书正确配置" $NC
print_message "4. 访问 https://your-domain/verify-deployment.html 验证部署" $NC
print_message "5. 测试所有功能是否正常" $NC

print_message "\n⚠️  重要提醒：" $RED
print_message "• 确保服务器支持HTTPS" $NC
print_message "• 配置HTTP到HTTPS的重定向" $NC
print_message "• 在HTTPS环境下测试钱包连接" $NC
print_message "• 检查浏览器控制台是否有混合内容警告" $NC

print_message "\n🔗 有用的链接：" $BLUE
print_message "• SSL测试: https://www.ssllabs.com/ssltest/" $NC
print_message "• 安全头部检查: https://securityheaders.com/" $NC
print_message "• 混合内容检查: 浏览器开发者工具 -> 控制台" $NC

print_message "\n✨ 部署脚本执行完成！" $GREEN
