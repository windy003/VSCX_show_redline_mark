# Red Line Number Highlighter

一个 Cursor/VS Code 插件，将光标所在行或选中代码行的行号区域标记为红色，方便快速定位当前编辑位置。

## 功能特性

- 自动高亮显示光标所在行的行号区域
- 支持多选，所有选中行的行号都会被标记
- 红色标记包括：
  - 行号区域的红色指示条
  - 淡红色行背景
  - 左侧红色边框
  - 滚动条上的红色标记

## 安装方法

### 方法 1：打包安装（推荐）

1. 在插件目录中安装依赖并打包：
```bash
npm install
npm run package
```

2. 在 Cursor 中安装：
   - 打开扩展面板（`Ctrl+Shift+X` / `Cmd+Shift+X`）
   - 点击右上角的 `...` 菜单
   - 选择 "Install from VSIX..."
   - 选择生成的 `.vsix` 文件

### 方法 2：开发模式运行

1. 在 Cursor 中打开此插件文件夹
2. 按 `F5` 启动调试
3. 会打开一个新窗口，插件自动加载

### 方法 3：直接安装到扩展目录

将整个插件文件夹复制到：
- **Windows**: `%USERPROFILE%\.cursor\extensions\`
- **macOS/Linux**: `~/.cursor/extensions/`

然后重启 Cursor。

## 使用说明

安装后无需任何配置，插件会自动工作：

- 移动光标到任意行，该行的行号区域会显示红色标记
- 选中多行代码，所有选中行的行号都会显示红色标记
- 实时响应光标位置变化

## 技术说明

- 使用 VS Code Extension API
- 基于 TextEditorDecorationType 实现装饰效果
- 支持所有主题（明亮/暗色主题）

## 许可证

MIT
