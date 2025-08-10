# Code Architecture Guidelines

## Configuration-Driven Development

### 1. Single Source of Truth Principle
- **优先使用配置文件**：对于业务逻辑相关的常量、阈值、分类标准，优先考虑在配置文件中统一管理
- **减少硬编码**：避免在组件中散布业务数据，但允许简单的UI常量（如动画时长、基础样式值）直接定义
- **配置职责边界**：配置文件专注于业务逻辑数据，UI样式和交互逻辑保留在组件中
- **例外情况**：对于一次性使用、高度特定的数据，可以考虑就近定义

### 2. Data Consistency Guidelines
- **识别重复模式**：当同一数据在多处使用时，考虑提取到配置中
- **平衡动态性与性能**：复杂计算可以预计算并缓存，简单映射可以动态生成
- **渐进式重构**：对于现有代码，可以逐步将重复的业务数据迁移到配置中

## Component Design Principles

### 3. Component Abstraction Balance
- **适度抽象**：在复用性和特定性之间找到平衡，避免过度通用化导致的复杂性
- **业务导向**：优先考虑业务场景的特殊性，当业务逻辑差异较大时，倾向于创建专门组件
- **渐进式抽象**：从具体实现开始，当发现重复模式时再考虑抽象
- **类型安全**：使用TypeScript确保组件接口的清晰性和安全性

### 4. Separation of Concerns Guidelines
- **明确边界**：配置管理业务规则，组件管理展示逻辑，但允许合理的耦合
- **就近原则**：相关的逻辑尽量放在一起，避免过度分散
- **性能考虑**：复杂计算可以抽取，但简单逻辑可以内联以提高可读性

## Code Organization

### 5. File Structure Guidelines
- **逻辑分组**：按功能模块组织文件，相关的配置、组件、工具函数放在一起
- **配置就近原则**：配置文件可以放在使用它的组件附近，也可以统一管理，根据项目规模决定
- **类型定义策略**：简单类型可以内联定义，复杂类型考虑单独文件或与相关逻辑放在一起

### 6. Naming Conventions
- **一致性优先**：在项目内保持命名风格的一致性
- **语义清晰**：名称应该清楚表达其用途和含义
- **适度描述性**：避免过长的名称，但要足够描述性

## Data Flow

### 7. Configuration Usage Patterns
- **直接访问 vs 封装**：简单的配置访问可以直接使用，复杂的业务逻辑考虑封装
- **性能权衡**：频繁访问的数据可以考虑缓存或预处理
- **错误处理**：对配置数据进行适当的验证和错误处理

### 8. Algorithm Design Principles
- **可读性优先**：算法应该易于理解和维护
- **配置驱动 vs 性能**：在配置灵活性和执行性能之间找到平衡
- **边界处理**：明确处理边界情况和异常输入

## Maintainability

### 9. Code Evolution Strategy
- **识别重复模式**：当发现相似的代码模式时，评估抽象的成本和收益
- **重构时机**：基于"三次法则"，但也要考虑业务复杂度和变化频率
- **渐进式改进**：优先解决当前痛点，避免过度设计

### 10. Quality Assurance
- **关键路径测试**：重点测试核心业务逻辑和用户关键流程
- **配置验证**：确保配置数据的正确性，特别是边界值
- **回归测试**：重构后确保功能不受影响

## Best Practices Summary

### ✅ 推荐做法

```typescript
// 配置驱动，但保持简洁
const labels = CI_CLASSIFICATION_CONFIG.ranges.map(range => range.label);

// 算法基于配置，但优先可读性
function calculatePosition(value: number, ranges: ClassificationRange[]) {
  // 清晰的逻辑，适当的注释
}

// 专门化组件，明确职责
function CICard({ value }: { value: number }) {
  // 专注于CI展示逻辑
}
```

### ⚠️ 需要权衡的情况

- **性能 vs 灵活性**：高频调用的函数可以适度优化
- **复用 vs 简洁**：简单场景不必过度抽象
- **配置 vs 硬编码**：稳定不变的常量可以硬编码

### 🎯 核心原则

1. **可读性第一**：代码应该易于理解和维护
2. **适度抽象**：在复用性和复杂性之间找到平衡
3. **业务导向**：技术决策应该服务于业务需求
4. **渐进式改进**：持续优化，避免一次性大重构

## Examples

### 实际应用示例

**配置驱动的分类：**
```typescript
// 配置定义
export const CI_CLASSIFICATION_CONFIG: ClassificationConfig = {
  name: 'CI',
  unit: '',
  ranges: [
    { min: 0, max: 75, severity: 'normal', label: '正常' },
    { min: 75, max: 85, severity: 'mild', label: '轻度' },
    { min: 85, max: 95, severity: 'moderate', label: '中度' },
    { min: 95, max: Infinity, severity: 'severe', label: '重度' }
  ]
};

// 使用配置的分类函数
function classifyCI(value: number) {
  return classifyByConfig(value, CI_CLASSIFICATION_CONFIG);
}
```

**专门化组件设计：**
```typescript
function CICard({ value }: { value: number }) {
  const classification = classifyCI(value);
  const labels = CI_CLASSIFICATION_CONFIG.ranges.map(range => range.label);
  
  return (
    <div className="ci-card">
      {/* CI特有的展示逻辑 */}
      <CIVisualization value={value} ranges={CI_CLASSIFICATION_CONFIG.ranges} />
      <CIFormula />
      <CIAnnotations />
    </div>
  );
}
```

**平衡的算法设计：**
```typescript
// 配置驱动，但保持可读性
function calculatePosition(value: number, ranges: ClassificationRange[]) {
  for (let i = 0; i < ranges.length; i++) {
    const range = ranges[i];
    if (value >= range.min && value < range.max) {
      // 在当前范围内计算相对位置
      const rangeWidth = range.max === Infinity ? 20 : range.max - range.min;
      const relativePosition = (value - range.min) / rangeWidth;
      return (i * 25) + (relativePosition * 25); // 每个范围占25%宽度
    }
  }
  return 100; // 超出范围时的默认位置
}
```

### 关键收益

1. **配置一致性**：避免硬编码导致的数据不一致
2. **专门化设计**：每个组件专注于特定业务场景
3. **可维护性**：修改业务规则时影响范围可控
4. **类型安全**：TypeScript提供编译时检查
5. **渐进式优化**：可以逐步改进而不影响整体架构

## Summary

这份指南的核心理念是在**灵活性**和**实用性**之间找到平衡：

### 🎯 核心价值观

1. **可读性优先**：代码应该易于理解，即使牺牲一些"完美"的抽象
2. **适度配置驱动**：在配置灵活性和代码简洁性之间找到平衡点
3. **渐进式改进**：从具体实现开始，发现模式后再抽象
4. **业务导向**：技术决策应该服务于业务需求和团队效率

### 📋 实践要点

- **配置使用**：简单访问直接使用，复杂逻辑适当封装
- **组件设计**：专门化 vs 通用化根据业务复杂度决定
- **代码组织**：逻辑分组，就近原则，避免过度分散
- **重构时机**：基于实际痛点，而非理论完美

### 🚀 预期收益

- **维护效率**：修改影响范围可控，定位问题快速
- **开发体验**：类型安全，IDE支持良好
- **团队协作**：代码风格一致，新人容易上手
- **业务适应**：能够快速响应业务需求变化

记住：**好的架构是演进出来的，不是设计出来的**。从简单开始，持续改进。