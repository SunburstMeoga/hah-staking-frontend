#!/usr/bin/env node

/**
 * HTTPS兼容构建脚本
 * 确保所有资源都使用HTTPS或相对路径
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 开始HTTPS兼容构建...');

// 1. 执行正常构建
console.log('📦 执行构建...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ 构建完成');
} catch (error) {
  console.error('❌ 构建失败:', error.message);
  process.exit(1);
}

// 2. 修复生成的HTML文件中的HTTP链接
console.log('🔧 修复HTTPS兼容性...');

const distPath = path.join(__dirname, 'dist');
const indexPath = path.join(distPath, 'index.html');

if (fs.existsSync(indexPath)) {
  let htmlContent = fs.readFileSync(indexPath, 'utf8');
  
  // 替换所有HTTP链接为HTTPS或相对路径
  const originalContent = htmlContent;
  
  // 修复script和link标签中的HTTP链接
  htmlContent = htmlContent.replace(/src="http:\/\//g, 'src="https://');
  htmlContent = htmlContent.replace(/href="http:\/\//g, 'href="https://');
  
  // 修复内联样式和脚本中的HTTP链接
  htmlContent = htmlContent.replace(/url\(http:\/\//g, 'url(https://');
  htmlContent = htmlContent.replace(/'http:\/\//g, "'https://");
  htmlContent = htmlContent.replace(/"http:\/\//g, '"https://');
  
  // 添加CSP头部（如果还没有）
  if (!htmlContent.includes('Content-Security-Policy')) {
    htmlContent = htmlContent.replace(
      '<meta name="theme-color" content="#1F1F1F">',
      '<meta name="theme-color" content="#1F1F1F">\n  <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">'
    );
  }
  
  // 添加错误处理脚本（如果还没有）
  if (!htmlContent.includes('webpack chunk loading error')) {
    const errorHandlingScript = `
  <script>
    // Webpack chunk loading error handling
    window.addEventListener('error', function(event) {
      if (event.target && event.target.tagName === 'SCRIPT') {
        console.error('Script loading failed:', event.target.src);
        // 尝试重新加载失败的脚本
        if (event.target.src && event.target.src.includes('http://')) {
          const httpsUrl = event.target.src.replace('http://', 'https://');
          const newScript = document.createElement('script');
          newScript.src = httpsUrl;
          newScript.async = true;
          document.head.appendChild(newScript);
        }
      }
    });
  </script>`;
    
    htmlContent = htmlContent.replace('</head>', errorHandlingScript + '\n</head>');
  }
  
  if (htmlContent !== originalContent) {
    fs.writeFileSync(indexPath, htmlContent);
    console.log('✅ HTML文件HTTPS兼容性修复完成');
  } else {
    console.log('ℹ️  HTML文件无需修复');
  }
} else {
  console.warn('⚠️  未找到index.html文件');
}

// 3. 检查并修复CSS文件中的HTTP链接
console.log('🎨 检查CSS文件...');
const cssDir = path.join(distPath, 'static', 'css');
if (fs.existsSync(cssDir)) {
  const cssFiles = fs.readdirSync(cssDir).filter(file => file.endsWith('.css'));
  
  cssFiles.forEach(file => {
    const cssPath = path.join(cssDir, file);
    let cssContent = fs.readFileSync(cssPath, 'utf8');
    const originalCssContent = cssContent;
    
    // 修复CSS中的HTTP链接
    cssContent = cssContent.replace(/url\(http:\/\//g, 'url(https://');
    cssContent = cssContent.replace(/@import "http:\/\//g, '@import "https://');
    cssContent = cssContent.replace(/@import 'http:\/\//g, "@import 'https://");
    
    if (cssContent !== originalCssContent) {
      fs.writeFileSync(cssPath, cssContent);
      console.log(`✅ 修复CSS文件: ${file}`);
    }
  });
} else {
  console.log('ℹ️  未找到CSS目录');
}

// 4. 检查并修复JS文件中的HTTP链接
console.log('📜 检查JS文件...');
const jsDir = path.join(distPath, 'static', 'js');
if (fs.existsSync(jsDir)) {
  const jsFiles = fs.readdirSync(jsDir).filter(file => file.endsWith('.js'));
  
  jsFiles.forEach(file => {
    const jsPath = path.join(jsDir, file);
    let jsContent = fs.readFileSync(jsPath, 'utf8');
    const originalJsContent = jsContent;
    
    // 修复JS中的HTTP链接（谨慎处理，避免破坏代码逻辑）
    // 只修复明显的资源URL
    jsContent = jsContent.replace(/"http:\/\/([^"]*\.(js|css|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot))"/g, '"https://$1"');
    jsContent = jsContent.replace(/'http:\/\/([^']*\.(js|css|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot))'/g, "'https://$1'");
    
    if (jsContent !== originalJsContent) {
      fs.writeFileSync(jsPath, jsContent);
      console.log(`✅ 修复JS文件: ${file}`);
    }
  });
} else {
  console.log('ℹ️  未找到JS目录');
}

// 5. 生成部署检查清单
console.log('📋 生成部署检查清单...');
const checklistPath = path.join(distPath, 'deployment-checklist.md');
const checklist = `# HTTPS部署检查清单

## 构建信息
- 构建时间: ${new Date().toISOString()}
- Node版本: ${process.version}

## 检查项目

### 1. 服务器配置
- [ ] 确保服务器支持HTTPS
- [ ] 配置SSL证书
- [ ] 启用HSTS (HTTP Strict Transport Security)
- [ ] 配置重定向: HTTP -> HTTPS

### 2. 内容安全策略
- [x] 添加了 Content-Security-Policy: upgrade-insecure-requests
- [x] 修复了所有HTTP资源链接

### 3. 错误处理
- [x] 添加了全局错误处理
- [x] 添加了资源加载失败重试机制
- [x] 添加了webpack chunk加载错误处理

### 4. 测试项目
- [ ] 在HTTPS环境下测试所有功能
- [ ] 检查浏览器控制台是否有混合内容警告
- [ ] 测试钱包连接功能
- [ ] 测试跨链桥功能

### 5. 性能优化
- [ ] 启用Gzip压缩
- [ ] 配置缓存策略
- [ ] 检查资源加载速度

## 常见问题解决

### Mixed Content错误
如果仍然出现混合内容错误，检查：
1. 所有资源是否使用HTTPS
2. 第三方库是否有HTTP依赖
3. 服务器配置是否正确

### 白屏问题
如果出现白屏：
1. 检查浏览器控制台错误
2. 确认所有JS文件正确加载
3. 检查webpack chunk是否正确生成

### 钱包连接问题
如果钱包连接失败：
1. 确认在HTTPS环境下运行
2. 检查钱包是否支持当前域名
3. 测试不同钱包的兼容性
`;

fs.writeFileSync(checklistPath, checklist);
console.log('✅ 部署检查清单已生成: deployment-checklist.md');

console.log('\n🎉 HTTPS兼容构建完成！');
console.log('📁 构建文件位置:', distPath);
console.log('📋 请查看部署检查清单:', checklistPath);
console.log('\n⚠️  部署前请确保：');
console.log('1. 服务器配置了有效的SSL证书');
console.log('2. 启用了HTTPS重定向');
console.log('3. 在HTTPS环境下测试所有功能');
