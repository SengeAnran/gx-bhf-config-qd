## 开发

```bash
# 克隆项目
git clone http://192.168.1.4:8090/813/bhf/gx-bhf-config-qd.git

# 进入项目目录
cd gx-bhf-config-qd

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npmmirror.com

# 启动服务
npm run dev
```

浏览器访问 http://localhost:81

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```
## 视频流处理flv.js
转换到目录 
```bash
cd E:\zsy\flv\flvjs_test-master
```

运行node后端websocket服务
```bash
node index.js
```