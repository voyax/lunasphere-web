# Domi Web - Claude Code 配置

## 项目概述
Domi 是一个基于深度学习的婴儿头型评估 Web 应用，使用 Next.js 16 + React 19 + TypeScript + Tailwind CSS + HeroUI。

## 自动应用 Skills 规则

### 代码提交时
当用户要求提交代码或说"提交"、"commit"时，自动使用 `/commit` skill 生成规范的 commit message。

### 创建组件时
当用户要求创建新组件时，自动使用 `/component-gen` skill 确保组件符合项目规范。

### 完成功能开发后
在完成一个功能或组件开发后，主动建议运行以下检查：
- `/responsive-check` - 检查响应式设计
- `/a11y-audit` - 检查无障碍性
- `/ui-consistency` - 检查 UI 一致性

### 修改样式时
当修改 Tailwind 样式时，主动使用 `/tailwind-helper` 提供优化建议。

### 添加动画时
当添加 Framer Motion 动画时，使用 `/motion-design` 确保动画符合最佳实践。

### 添加文本内容时
当添加用户可见的文本时，提醒使用 `/i18n-helper` 进行国际化处理。

### PR 审查时
当用户要求审查 PR 或说"review"时，自动使用 `/review-pr` skill。

## 代码规范

### 组件结构
- UI 组件: `/components/ui/`
- 功能组件: `/components/features/`
- 布局组件: `/components/layout/`

### 样式规范
- 使用 Tailwind CSS，遵循 mobile-first
- 使用 HeroUI 组件库
- 支持 dark mode（使用 `dark:` 前缀）

### 国际化
- 使用 next-intl
- 翻译文件在 `/messages/` 目录
- 医学术语保持中英文一致性

### 无障碍性
- 触控目标至少 44x44px
- 文本对比度符合 WCAG AA
- 所有交互元素可键盘访问
