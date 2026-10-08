---
title: "为 GDPR 合规模糊图片：分享前隐藏个人数据"
description: "如何为 GDPR 合规而模糊图片：在分享前遮住人脸、车牌、姓名和截图中的个人数据。一份面向可能含个人数据照片的实用清单。"
date: 2026-10-02
tags:
  - gdpr
  - privacy
  - compliance
  - redaction
---

<img src="/blog/img/blur-image-for-gdpr.webp" alt="为 GDPR 模糊图片" width="1536" height="1024" loading="lazy" decoding="async" />

## GDPR 与图片有什么关系

照片里的人脸、车牌、姓名都属于**个人数据**。在欧洲语境下，未经处理的照片公开发布可能违反 GDPR。模糊处理是成本最低的合规动作。

## 分享前该遮什么

- 可识别的**人脸**
- **车牌**与车辆识别信息
- 姓名、地址等**书面个人数据**
- 截图里的**账号、邮件、聊天内容**

## 一份快速清单

1. 判断照片里有没有第三方个人数据。
2. 用 [/zh/privacy-blur](/zh/privacy-blur) 本地检测人脸并打码。
3. 文档类用 [/zh/blur-image](/zh/blur-image) 框选文字覆盖。
4. 导出时再用 [/zh/compress-image](/zh/compress-image) 控制体积。

## 常见问题

**公司内部共享也要遮吗？** 只要超出「必要知晓」范围，就应该处理。

**匿名化后能撤销吗？** 一旦模糊就不可逆，所以先留一份原始备份在本地。
