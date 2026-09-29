# Toolbox Image 图片工具站项目报告

**项目路径：** `C:\Users\dell\ZCodeProject\image-tools`
**本地访问：** http://127.0.0.1:4321/
**目标域名：** img.toolbox168.xyz（子域名部署）
**报告日期：** 2026-09-20

---

## 一、项目概述

Toolbox Image 是参考 blurimageonline.com 的产品结构独立实现的浏览器本地图片工具站，基于 Astro 4 + TypeScript 静态生成，图片处理全部使用 Canvas API 在浏览器内完成，图片默认不上传服务器。

本次迭代的核心目标是解决上一版“所有工具页共用同一个编辑器、只有标题不同”的问题，将各工具拆分为真正不同的交互工作台。

---

## 二、本次完成的差异化改造

### 页面与工作台映射

| 路由 | 工作台组件 | 交互形态 |
|---|---|---|
| `/blur-image` | FullBlurTool | 原图/结果双栏对比 + 整图强度滑块，无画笔选区 |
| `/blur-license-plate` `/blur-face` `/blur-text` | RegionBlurTool | 涂抹/矩形/套索 + 画笔大小 + 撤销重做，只处理选中区域 |
| `/compress-image` | CompressTool | 原始大小/预计大小对比 + 质量滑块 + 格式选择 |
| `/resize-image` | ResizeTool | 宽高输入 + 比例锁 + 预设尺寸（640/1080/1920） |
| `/crop-rotate-image` | CropRotateTool | 旋转/翻转按钮 + 比例预设 + 导出 |
| `/privacy-blur` | PrivacyDetectTool | 扫描进度 + 候选区域确认 + 手动兜底入口 |
| `/media/*`（GIF/视频/帧提取） | MediaComingSoon | 真实的“专用工作台准备中”状态，不再伪装成图片编辑器 |

### 关键改进

1. **全图与局部模糊分离**：按截图所示，`/blur-image` 是整图模糊（对比预览、单一强度滑块），车牌/人脸/文字页面是涂抹式局部处理，两者不再是同一界面。
2. **工具不再互相污染**：压缩页没有模糊画笔，尺寸页没有隐私工具，裁剪页只有变换控件。
3. **诚实的产品状态**：未实现的 GIF/视频处理明确显示“准备中”并说明所需技术（逐帧编码、关键帧跟踪），自动检测明确标注“候选框演示，需用户确认”，不夸大能力。
4. **删除冗余**：移除了 `privacy-scenarios.astro`、`media-tool.astro` 等重复路由和残留引用。

---

## 三、验证结果

### 构建

```
npm run build
21 page(s) built — Build complete（无 CSS 警告）
```

### 浏览器逐页验证（本地 dev 服务器）

| 页面 | 状态 | 差异化信号确认 |
|---|---|---|
| /blur-image | 200 | ✓ 整图模糊工作台，无选区工具 |
| /blur-license-plate | 200 | ✓ 涂抹/套索局部工具 |
| /compress-image | 200 | ✓ 大小对比+质量滑块，无模糊工具 |
| /resize-image | 200 | ✓ 尺寸控件，无隐私工具 |
| /crop-rotate-image | 200 | ✓ 仅旋转/翻转/比例 |
| /privacy-blur | 200 | ✓ 扫描+候选区域状态 |
| /media/blur-gif-online | 200 | ✓ 专用准备中状态页 |

验证方式：DOM 快照 + fetch 页面源码关键词交叉检查，并截屏确认渲染。文件上传交互受测试运行时文件选择器限制，未伪造上传成功；各工具上传逻辑与上一版已验证的 FileReader/Canvas 流程一致。

---

## 四、当前技术架构

```
image-tools/
├── astro.config.mjs          # site: img.toolbox168.xyz + sitemap
├── src/
│   ├── layouts/Base.astro    # SEO/canonical/OG + 导航页脚
│   ├── styles/global.css     # 全站样式（含各工作台样式）
│   ├── components/
│   │   ├── ImageEditor.astro     # 首页通用编辑器（本地Canvas算法）
│   │   ├── FullBlurTool.astro    # 全图模糊
│   │   ├── RegionBlurTool.astro  # 局部涂抹
│   │   ├── CompressTool.astro    # 压缩
│   │   ├── ResizeTool.astro      # 尺寸
│   │   ├── CropRotateTool.astro  # 裁剪旋转
│   │   ├── PrivacyDetectTool.astro # 检测框架
│   │   └── MediaComingSoon.astro # 媒体状态页
│   └── pages/                # 21 个静态路由 + 动态场景页
```

技术约束：当前环境 Node 18.19.1，因此锁定 Astro 4.16.18；升级 Node ≥22 后可升级 Astro 7。

---

## 五、与参考站（blurimageonline.com）的差距

| 能力 | 参考站 | 当前项目 |
|---|---|---|
| 工具矩阵差异化 | ✓ | ✓（本次完成） |
| 22 种多语言 hreflang | ✓ | ✗ 仅有中文 |
| 博客内容集群 | ✓ 数十篇带标签 | △ 6 篇静态指南 |
| 批量处理 + Plus 登录付费 | ✓ Paddle/Supabase | △ 仅定价页，无支付集成 |
| GIF/视频真实处理 | ✓ | ✗ 准备中状态页 |
| 自动隐私检测模型 | △（去模糊用AI） | △ 框架就绪，模型未接入 |
| 广告/统计 | ✓ AdSense/GA/Clarity | ✗ 未接入 |

---

## 六、下一步建议（按优先级）

1. **接入真实批量队列**：多图上传、逐张应用统一设置、集中下载——这是 Plus 付费的核心价值。
2. **GIF 模糊实现**：用 gif.js 或 libgif 逐帧应用 RegionBlur 的模糊函数后重编码。
3. **自动检测接入**：人脸用 MediaPipe Face Detection（浏览器端），车牌/文字用 ONNX Runtime Web + 开源 YOLO/DB 模型，结果进入现有候选框确认流程。
4. **多语言**：复用 Astro i18n，优先英文 + 中文，工具页 × 语言批量生成。
5. **部署**：`npm run build` 产物为纯静态，可直接部署 Cloudflare Pages，DNS 将 img.toolbox168.xyz CNAME 指向部署平台。

---

## 七、遗留说明

- `tool-placeholder.astro` 仍存在但未被导航引用，可在下次清理时删除。
- 首页仍使用通用 ImageEditor 作为快速入口，属有意设计（首页即工具），如需与工具页完全一致可切换为 RegionBlurTool。
- 全部图片处理为浏览器本地，隐私政策页面已声明；正式上线前建议补充 Cookie 同意横幅（若接入统计/广告）。
