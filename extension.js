const vscode = require('vscode');
const path = require('path');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log('Red Line Number Highlighter 已激活');

    // 获取图标路径
    const iconPath = context.asAbsolutePath('icon.svg');

    // 创建装饰类型 - 在行号区域显示红色标记
    const lineNumberHighlight = vscode.window.createTextEditorDecorationType({
        isWholeLine: true,
        // 在 gutter（行号区域）显示红色标记
        gutterIconPath: iconPath,
        gutterIconSize: 'contain',
        // 在滚动条区域也显示标记
        overviewRulerColor: 'rgba(255, 0, 0, 0.8)',
        overviewRulerLane: vscode.OverviewRulerLane.Left
    });

    let timeout = undefined;

    function updateDecorations() {
        const activeEditor = vscode.window.activeTextEditor;
        if (!activeEditor) {
            return;
        }

        const ranges = [];

        // 获取所有选择范围（包括光标位置）
        const selections = activeEditor.selections;

        for (const selection of selections) {
            const startLine = selection.start.line;
            const endLine = selection.end.line;

            // 将选择范围内的每一行都添加到装饰中
            for (let line = startLine; line <= endLine; line++) {
                const lineRange = activeEditor.document.lineAt(line).range;
                ranges.push(lineRange);
            }
        }

        // 应用装饰
        activeEditor.setDecorations(lineNumberHighlight, ranges);
    }

    function triggerUpdateDecorations(throttle = false) {
        if (timeout) {
            clearTimeout(timeout);
            timeout = undefined;
        }
        if (throttle) {
            timeout = setTimeout(updateDecorations, 100);
        } else {
            updateDecorations();
        }
    }

    // 初始化装饰
    if (vscode.window.activeTextEditor) {
        triggerUpdateDecorations();
    }

    // 监听编辑器切换
    context.subscriptions.push(
        vscode.window.onDidChangeActiveTextEditor(editor => {
            if (editor) {
                triggerUpdateDecorations();
            }
        })
    );

    // 监听光标位置变化
    context.subscriptions.push(
        vscode.window.onDidChangeTextEditorSelection(event => {
            if (event.textEditor === vscode.window.activeTextEditor) {
                triggerUpdateDecorations();
            }
        })
    );

    // 监听文档内容变化
    context.subscriptions.push(
        vscode.workspace.onDidChangeTextDocument(event => {
            if (vscode.window.activeTextEditor && event.document === vscode.window.activeTextEditor.document) {
                triggerUpdateDecorations(true);
            }
        })
    );
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
