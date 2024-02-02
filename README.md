# 蜜柑计划rss反代

## 本反代使用的前提，部署的服务器能直接访问到`https://mikanani.me/`，如果没有该服务器，本项目对你没用

运行
```bash
# 克隆项目
git clone https://github.com/MuXia-0326/mikanani-rss.git

# 进入项目目录
cd mikanani-rss

# 安装依赖
npm install -g pnpm
pnpm i

# 启动服务
pnpm start
```

在`nginx`中将`nginx/mikanani.conf`的内容配置好