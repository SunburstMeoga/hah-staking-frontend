# Cloudflare 重定向循环修复指南

## 🔍 问题诊断

您的域名使用了 Cloudflare CDN (IP: 104.21.16.1)，重定向循环很可能是由 Cloudflare 配置引起的。

## 🛠 修复步骤

### 1. 登录 Cloudflare 控制台
访问：https://dash.cloudflare.com
选择域名：vote.hashahead.org

### 2. 检查 SSL/TLS 设置

#### 路径：SSL/TLS → Overview
**当前可能的问题配置：**
- ❌ Flexible（会导致重定向循环）

**推荐配置：**
- ✅ **Full (strict)** - 如果源服务器有有效SSL证书
- ✅ **Full** - 如果源服务器有自签名证书

#### 为什么 Flexible 会导致问题：
```
用户 → HTTPS → Cloudflare → HTTP → 源服务器
源服务器重定向到HTTPS → Cloudflare → 用户
形成循环：HTTPS → HTTP → HTTPS → HTTP...
```

### 3. 检查 Always Use HTTPS 设置

#### 路径：SSL/TLS → Edge Certificates
- 如果开启了 "Always Use HTTPS"
- 同时源服务器也配置了 HTTP → HTTPS 重定向
- 就会形成双重重定向

**临时解决方案：**
1. 关闭 "Always Use HTTPS"
2. 或者移除源服务器的重定向配置

### 4. 检查页面规则

#### 路径：Rules → Page Rules
查看是否有类似规则：
```
URL: http://vote.hashahead.org/*
设置: Always Use HTTPS
```

**如果有此规则：**
- 暂时禁用
- 或者修改为更具体的规则

### 5. 检查重定向规则

#### 路径：Rules → Redirect Rules
查看是否有重定向规则冲突

## 🚀 推荐的 Cloudflare 配置

### SSL/TLS 设置
```
加密模式: Full (strict)
最低 TLS 版本: 1.2
TLS 1.3: 启用
自动 HTTPS 重写: 启用
```

### 安全设置
```
Always Use HTTPS: 启用（在源服务器重定向移除后）
HSTS: 启用
```

### 缓存设置
```
缓存级别: 标准
浏览器缓存 TTL: 4 小时
```

## 🔧 源服务器 Nginx 配置调整

由于使用了 Cloudflare，源服务器配置需要调整：

```nginx
# 简化的源服务器配置
server {
    listen 80;
    listen 443 ssl http2;
    server_name vote.hashahead.org;
    
    # SSL 配置（Cloudflare 到源服务器）
    ssl_certificate /path/to/your/certificate.crt;
    ssl_certificate_key /path/to/your/private.key;
    
    # 网站根目录
    root /var/www/hah-staking-frontend/dist;
    index index.html;
    
    # 不要在源服务器做 HTTP → HTTPS 重定向
    # Cloudflare 会处理这个
    
    # 静态文件
    location /static/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Vue Router 支持
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # 信任 Cloudflare IP
    set_real_ip_from 103.21.244.0/22;
    set_real_ip_from 103.22.200.0/22;
    set_real_ip_from 103.31.4.0/22;
    set_real_ip_from 104.16.0.0/13;
    set_real_ip_from 104.24.0.0/14;
    set_real_ip_from 108.162.192.0/18;
    set_real_ip_from 131.0.72.0/22;
    set_real_ip_from 141.101.64.0/18;
    set_real_ip_from 162.158.0.0/15;
    set_real_ip_from 172.64.0.0/13;
    set_real_ip_from 173.245.48.0/20;
    set_real_ip_from 188.114.96.0/20;
    set_real_ip_from 190.93.240.0/20;
    set_real_ip_from 197.234.240.0/22;
    set_real_ip_from 198.41.128.0/17;
    real_ip_header CF-Connecting-IP;
}
```

## 🧪 测试步骤

### 1. 修改 Cloudflare 配置后测试
```bash
# 等待 5-10 分钟让配置生效
curl -v http://vote.hashahead.org
curl -v https://vote.hashahead.org
```

### 2. 检查 Cloudflare 响应头
```bash
curl -I https://vote.hashahead.org
# 应该看到：
# cf-ray: xxxxx
# server: cloudflare
```

### 3. 测试静态资源
```bash
curl -I https://vote.hashahead.org/static/js/vendor.c6552a08a8acb14e157f.js
```

## ⚡ 快速修复方案

### 方案1：临时禁用 Cloudflare 代理
1. 在 Cloudflare DNS 设置中
2. 点击域名记录旁边的橙色云朵图标
3. 变成灰色云朵（DNS only）
4. 等待几分钟测试

### 方案2：调整 SSL 模式
1. SSL/TLS → Overview
2. 改为 "Full" 或 "Full (strict)"
3. 等待几分钟测试

## 📞 如果仍有问题

1. 检查 Cloudflare 的错误日志
2. 联系 Cloudflare 支持
3. 或者暂时绕过 Cloudflare 直接访问源服务器

## 🔍 调试命令

```bash
# 检查 DNS 解析
dig vote.hashahead.org

# 检查源服务器 IP（如果知道的话）
curl -v -H "Host: vote.hashahead.org" http://YOUR_ORIGIN_SERVER_IP

# 检查 Cloudflare 状态
curl -I https://vote.hashahead.org -H "CF-Connecting-IP: 1.1.1.1"
```
