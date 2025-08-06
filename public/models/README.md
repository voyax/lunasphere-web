# AI模型文件目录

这个目录用于存放ONNX格式的AI模型文件。

## 使用说明

1. 将您的ONNX模型文件放置在此目录下
2. 在网页中输入模型路径，例如：`/models/your-model.onnx`
3. 点击"加载模型"按钮
4. 模型加载成功后即可使用AI分析功能

## 模型要求

- 格式：ONNX (.onnx)
- 输入：224x224 RGB图像
- 输出：包含CI、CVAI等头型分析指标

## 示例

```
public/models/
├── head-shape-model.onnx     # 主要的头型分析模型
├── backup-model.onnx         # 备用模型
└── README.md                 # 本说明文件
```

## 注意事项

- 确保模型文件大小合理（建议小于100MB）
- 模型文件必须可通过HTTP访问
- 首次加载可能需要一些时间，请耐心等待