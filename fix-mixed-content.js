#!/usr/bin/env node

/**
 * 快速修复混合内容问题
 * 专门解决已部署网站的HTTPS兼容性问题
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 开始修复混合内容问题...');

// 检查dist目录是否存在
const distPath = path.join(__dirname, 'dist');
if (!fs.existsSync(distPath)) {
    console.error('❌ dist目录不存在，请先执行构建');
    process.exit(1);
}

// 修复HTML文件
function fixHtmlFile(filePath) {
    if (!fs.existsSync(filePath)) {
        console.log('⚠️  index.html不存在，跳过修复');
        return;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;

    // 修复所有HTTP链接
    content = content.replace(/src="http:\/\//g, 'src="https://');
    content = content.replace(/href="http:\/\//g, 'href="https://');
    content = content.replace(/url\(http:\/\//g, 'url(https://');
    content = content.replace(/'http:\/\//g, "'https://");
    content = content.replace(/"http:\/\//g, '"https://');

    // 添加CSP头部
    if (!content.includes('upgrade-insecure-requests')) {
        const cspMeta = '<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">';
        if (content.includes('<meta name="theme-color"')) {
            content = content.replace(
                '<meta name="theme-color" content="#1F1F1F">',
                '<meta name="theme-color" content="#1F1F1F">\n  ' + cspMeta
            );
        } else if (content.includes('</head>')) {
            content = content.replace('</head>', '  ' + cspMeta + '\n</head>');
        }
    }

    // 修复移动端元标签警告
    if (content.includes('apple-mobile-web-app-capable') && !content.includes('mobile-web-app-capable')) {
        content = content.replace(
            '<meta name="apple-mobile-web-app-capable" content="yes">',
            '<meta name="mobile-web-app-capable" content="yes">\n  <meta name="apple-mobile-web-app-capable" content="yes">'
        );
    }

    // 添加错误处理脚本
    if (!content.includes('Mixed content error handling')) {
        const errorScript = `
  <script>
    // Mixed content error handling
    window.addEventListener('error', function(event) {
      if (event.target && event.target.tagName === 'SCRIPT' && event.target.src) {
        if (event.target.src.startsWith('http://')) {
          console.log('Fixing HTTP script:', event.target.src);
          const httpsUrl = event.target.src.replace('http://', 'https://');
          const newScript = document.createElement('script');
          newScript.src = httpsUrl;
          newScript.async = true;
          document.head.appendChild(newScript);
          event.target.remove();
        }
      }
    });
    
    // Fix any remaining HTTP resources
    document.addEventListener('DOMContentLoaded', function() {
      const scripts = document.querySelectorAll('script[src^="http://"]');
      const links = document.querySelectorAll('link[href^="http://"]');
      
      scripts.forEach(script => {
        script.src = script.src.replace('http://', 'https://');
      });
      
      links.forEach(link => {
        link.href = link.href.replace('http://', 'https://');
      });
    });
  </script>`;

        content = content.replace('</head>', errorScript + '\n</head>');
    }

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content);
        console.log('✅ 修复了 index.html');
    } else {
        console.log('ℹ️  index.html 无需修复');
    }
}

// 修复CSS文件
function fixCssFiles(cssDir) {
    if (!fs.existsSync(cssDir)) {
        console.log('ℹ️  CSS目录不存在');
        return;
    }

    const cssFiles = fs.readdirSync(cssDir).filter(file => file.endsWith('.css'));
    
    cssFiles.forEach(file => {
        const filePath = path.join(cssDir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        const originalContent = content;

        // 修复CSS中的HTTP链接
        content = content.replace(/url\(http:\/\//g, 'url(https://');
        content = content.replace(/@import "http:\/\//g, '@import "https://');
        content = content.replace(/@import 'http:\/\//g, "@import 'https://");

        if (content !== originalContent) {
            fs.writeFileSync(filePath, content);
            console.log(`✅ 修复了 CSS: ${file}`);
        }
    });
}

// 修复JS文件
function fixJsFiles(jsDir) {
    if (!fs.existsSync(jsDir)) {
        console.log('ℹ️  JS目录不存在');
        return;
    }

    const jsFiles = fs.readdirSync(jsDir).filter(file => file.endsWith('.js'));
    
    jsFiles.forEach(file => {
        const filePath = path.join(jsDir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        const originalContent = content;

        // 谨慎修复JS中的HTTP链接，只修复明显的资源URL
        content = content.replace(/"http:\/\/([^"]*\.(js|css|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|ico))"/g, '"https://$1"');
        content = content.replace(/'http:\/\/([^']*\.(js|css|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|ico))'/g, "'https://$1'");

        if (content !== originalContent) {
            fs.writeFileSync(filePath, content);
            console.log(`✅ 修复了 JS: ${file}`);
        }
    });
}

// 创建.htaccess文件（Apache服务器）
function createHtaccess() {
    const htaccessPath = path.join(distPath, '.htaccess');
    const htaccessContent = `# HTTPS重定向和安全头部
RewriteEngine On

# 强制HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# 安全头部
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"
Header always set Content-Security-Policy "upgrade-insecure-requests; default-src 'self' https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: https:; connect-src 'self' https: wss:; font-src 'self' https:;"

# Vue Router支持
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# 缓存设置
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType font/woff "access plus 1 year"
    ExpiresByType font/woff2 "access plus 1 year"
</IfModule>`;

    fs.writeFileSync(htaccessPath, htaccessContent);
    console.log('✅ 创建了 .htaccess 文件');
}

// 执行修复
console.log('📁 处理 HTML 文件...');
fixHtmlFile(path.join(distPath, 'index.html'));

console.log('🎨 处理 CSS 文件...');
fixCssFiles(path.join(distPath, 'static', 'css'));

console.log('📜 处理 JS 文件...');
fixJsFiles(path.join(distPath, 'static', 'js'));

console.log('⚙️  创建服务器配置文件...');
createHtaccess();

// 创建验证脚本
const verifyScript = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>混合内容检查</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #1a1a1a; color: white; }
        .result { margin: 10px 0; padding: 10px; border-radius: 5px; }
        .pass { background: #2d5a2d; }
        .fail { background: #5a2d2d; }
    </style>
</head>
<body>
    <h1>混合内容检查</h1>
    <div id="results"></div>
    <script>
        function addResult(message, pass) {
            const div = document.createElement('div');
            div.className = 'result ' + (pass ? 'pass' : 'fail');
            div.textContent = (pass ? '✅ ' : '❌ ') + message;
            document.getElementById('results').appendChild(div);
        }
        
        // 检查协议
        addResult('当前协议: ' + location.protocol, location.protocol === 'https:');
        
        // 检查资源
        let httpResources = 0;
        document.querySelectorAll('script[src], link[href], img[src]').forEach(el => {
            const url = el.src || el.href;
            if (url && url.startsWith('http://')) {
                httpResources++;
            }
        });
        
        addResult('HTTP资源数量: ' + httpResources, httpResources === 0);
        
        // 检查CSP
        const csp = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
        addResult('CSP头部配置', !!csp);
        
        if (httpResources === 0 && location.protocol === 'https:' && csp) {
            addResult('所有检查通过！', true);
        }
    </script>
</body>
</html>`;

fs.writeFileSync(path.join(distPath, 'check-mixed-content.html'), verifyScript);
console.log('✅ 创建了混合内容检查页面');

console.log('\n🎉 混合内容修复完成！');
console.log('📋 修复内容：');
console.log('  • 将所有HTTP链接替换为HTTPS');
console.log('  • 添加了Content-Security-Policy头部');
console.log('  • 添加了错误处理脚本');
console.log('  • 创建了.htaccess配置文件');
console.log('  • 创建了混合内容检查页面');

console.log('\n🔍 验证步骤：');
console.log('1. 部署修复后的文件到服务器');
console.log('2. 访问 https://your-domain/check-mixed-content.html');
console.log('3. 检查浏览器控制台是否还有混合内容警告');
console.log('4. 测试网站所有功能');

console.log('\n⚠️  注意事项：');
console.log('• 确保服务器配置了有效的SSL证书');
console.log('• 如果使用Nginx，请参考 nginx.conf.example');
console.log('• 如果使用Apache，.htaccess文件会自动生效');
console.log('• 清除浏览器缓存后重新测试');
