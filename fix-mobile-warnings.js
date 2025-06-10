#!/usr/bin/env node

/**
 * 修复移动端相关警告
 * 包括过时的元标签和移动端优化
 */

const fs = require('fs');
const path = require('path');

console.log('📱 开始修复移动端警告...');

// 检查文件是否存在
function checkFile(filePath) {
    if (!fs.existsSync(filePath)) {
        console.log(`⚠️  文件不存在: ${filePath}`);
        return false;
    }
    return true;
}

// 修复HTML文件中的移动端元标签
function fixMobileMetaTags(filePath) {
    if (!checkFile(filePath)) return;

    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;

    console.log('🔧 修复移动端元标签...');

    // 1. 修复 apple-mobile-web-app-capable 警告
    if (content.includes('apple-mobile-web-app-capable') && !content.includes('mobile-web-app-capable')) {
        content = content.replace(
            '<meta name="apple-mobile-web-app-capable" content="yes">',
            '<meta name="mobile-web-app-capable" content="yes">\n  <meta name="apple-mobile-web-app-capable" content="yes">'
        );
        console.log('✅ 添加了 mobile-web-app-capable 元标签');
    }

    // 2. 确保有完整的移动端优化元标签
    const requiredMetaTags = [
        '<meta name="mobile-web-app-capable" content="yes">',
        '<meta name="apple-mobile-web-app-capable" content="yes">',
        '<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">',
        '<meta name="apple-mobile-web-app-title" content="HAH Staking">',
        '<meta name="application-name" content="HAH Staking">',
        '<meta name="msapplication-TileColor" content="#1F1F1F">',
        '<meta name="msapplication-config" content="browserconfig.xml">'
    ];

    // 检查并添加缺失的元标签
    requiredMetaTags.forEach(tag => {
        const tagName = tag.match(/name="([^"]+)"/)[1];
        if (!content.includes(`name="${tagName}"`)) {
            // 在 theme-color 之后添加
            if (content.includes('<meta name="theme-color"')) {
                content = content.replace(
                    '<meta name="theme-color" content="#1F1F1F">',
                    '<meta name="theme-color" content="#1F1F1F">\n  ' + tag
                );
                console.log(`✅ 添加了 ${tagName} 元标签`);
            }
        }
    });

    // 3. 添加 PWA 相关的 link 标签
    const pwaLinks = [
        '<link rel="manifest" href="manifest.json">',
        '<link rel="apple-touch-icon" sizes="180x180" href="static/icons/apple-touch-icon.png">',
        '<link rel="icon" type="image/png" sizes="32x32" href="static/icons/favicon-32x32.png">',
        '<link rel="icon" type="image/png" sizes="16x16" href="static/icons/favicon-16x16.png">',
        '<link rel="mask-icon" href="static/icons/safari-pinned-tab.svg" color="#EAAE36">'
    ];

    pwaLinks.forEach(link => {
        const rel = link.match(/rel="([^"]+)"/)[1];
        if (!content.includes(`rel="${rel}"`)) {
            // 在现有的 icon link 之后添加
            if (content.includes('<link rel="icon"')) {
                const iconLink = content.match(/<link rel="icon"[^>]*>/)[0];
                content = content.replace(iconLink, iconLink + '\n  ' + link);
                console.log(`✅ 添加了 ${rel} 链接`);
            } else {
                // 在 title 之后添加
                content = content.replace('</title>', '</title>\n  ' + link);
                console.log(`✅ 添加了 ${rel} 链接`);
            }
        }
    });

    // 4. 优化 viewport 元标签
    if (content.includes('viewport')) {
        const currentViewport = content.match(/<meta name="viewport"[^>]*>/)[0];
        const optimizedViewport = '<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no,viewport-fit=cover">';
        
        if (!currentViewport.includes('viewport-fit=cover')) {
            content = content.replace(currentViewport, optimizedViewport);
            console.log('✅ 优化了 viewport 元标签');
        }
    }

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content);
        console.log('✅ HTML 移动端优化完成');
    } else {
        console.log('ℹ️  HTML 文件无需修复');
    }
}

// 创建 PWA manifest 文件
function createManifest(distPath) {
    const manifestPath = path.join(distPath, 'manifest.json');
    
    if (fs.existsSync(manifestPath)) {
        console.log('ℹ️  manifest.json 已存在');
        return;
    }

    const manifest = {
        "name": "HAH Staking",
        "short_name": "HAH Staking",
        "description": "Hash Ahead Staking Platform",
        "start_url": "/",
        "display": "standalone",
        "background_color": "#1F1F1F",
        "theme_color": "#EAAE36",
        "orientation": "portrait-primary",
        "icons": [
            {
                "src": "static/icons/android-chrome-192x192.png",
                "sizes": "192x192",
                "type": "image/png"
            },
            {
                "src": "static/icons/android-chrome-512x512.png",
                "sizes": "512x512",
                "type": "image/png"
            }
        ],
        "categories": ["finance", "productivity"],
        "lang": "zh-CN",
        "dir": "ltr",
        "scope": "/",
        "prefer_related_applications": false
    };

    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    console.log('✅ 创建了 manifest.json');
}

// 创建 browserconfig.xml 文件
function createBrowserConfig(distPath) {
    const configPath = path.join(distPath, 'browserconfig.xml');
    
    if (fs.existsSync(configPath)) {
        console.log('ℹ️  browserconfig.xml 已存在');
        return;
    }

    const browserConfig = `<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
    <msapplication>
        <tile>
            <square150x150logo src="static/icons/mstile-150x150.png"/>
            <TileColor>#1F1F1F</TileColor>
        </tile>
    </msapplication>
</browserconfig>`;

    fs.writeFileSync(configPath, browserConfig);
    console.log('✅ 创建了 browserconfig.xml');
}

// 创建图标目录结构说明
function createIconsReadme(distPath) {
    const iconsDir = path.join(distPath, 'static', 'icons');
    
    if (!fs.existsSync(iconsDir)) {
        fs.mkdirSync(iconsDir, { recursive: true });
    }

    const readmePath = path.join(iconsDir, 'README.md');
    const readme = `# 图标文件说明

这个目录应该包含以下图标文件：

## 必需的图标文件：
- \`favicon.ico\` - 16x16, 32x32, 48x48 ICO 格式
- \`favicon-16x16.png\` - 16x16 PNG
- \`favicon-32x32.png\` - 32x32 PNG
- \`apple-touch-icon.png\` - 180x180 PNG (iOS)
- \`android-chrome-192x192.png\` - 192x192 PNG (Android)
- \`android-chrome-512x512.png\` - 512x512 PNG (Android)
- \`mstile-150x150.png\` - 150x150 PNG (Windows)
- \`safari-pinned-tab.svg\` - SVG 格式 (Safari)

## 生成图标的工具：
- https://realfavicongenerator.net/
- https://www.favicon-generator.org/

## 设计要求：
- 主色调：#EAAE36 (金色)
- 背景色：#1F1F1F (深色)
- 简洁的 HAH 或 H 字母设计
- 确保在小尺寸下清晰可见
`;

    fs.writeFileSync(readmePath, readme);
    console.log('✅ 创建了图标说明文件');
}

// 主执行函数
function main() {
    const distPath = path.join(__dirname, 'dist');
    const indexPath = path.join(distPath, 'index.html');

    console.log('📱 开始移动端优化...');

    // 1. 修复 HTML 元标签
    if (fs.existsSync(indexPath)) {
        fixMobileMetaTags(indexPath);
    } else {
        console.log('⚠️  index.html 不存在，请先执行构建');
        return;
    }

    // 2. 创建 PWA 相关文件
    createManifest(distPath);
    createBrowserConfig(distPath);
    createIconsReadme(distPath);

    console.log('\n🎉 移动端优化完成！');
    console.log('\n📋 完成的优化：');
    console.log('✅ 修复了 apple-mobile-web-app-capable 警告');
    console.log('✅ 添加了现代移动端元标签');
    console.log('✅ 创建了 PWA manifest 文件');
    console.log('✅ 创建了 browserconfig.xml');
    console.log('✅ 优化了 viewport 设置');

    console.log('\n📝 下一步：');
    console.log('1. 根据 static/icons/README.md 生成所需的图标文件');
    console.log('2. 重新部署网站');
    console.log('3. 测试移动端体验');

    console.log('\n⚠️  注意：');
    console.log('• 图标文件需要手动创建或使用在线工具生成');
    console.log('• 建议使用 https://realfavicongenerator.net/ 生成完整的图标集');
    console.log('• 确保图标设计符合 HAH 品牌形象');
}

// 执行主函数
main();
