# Skill: i18n-helper

Manage internationalization with next-intl for LunaSphere.

## Usage

`/i18n-helper <command> [options]`

Commands:
- `add <key> <text>`: Add a new translation key
- `check`: Find missing translations
- `sync`: Sync translation files
- `extract`: Extract hardcoded strings from components

## Instructions

### Project i18n Structure
- Messages directory: `/messages`
- Supported locales: Check `messages/` directory for available locales
- Config: `next.config.js` or `i18n.ts`

### Adding New Translations

1. When adding a key:
   ```
   /i18n-helper add learn.hero.title "Assess Your Baby's Head Shape"
   ```

2. Add the key to ALL locale files in `/messages/`
3. Use nested structure matching the key path
4. For Chinese translations, provide accurate medical terminology

### Checking Missing Translations

1. Scan all message files
2. Compare keys across locales
3. Report missing keys per locale
4. Suggest translations using context

### Extracting Hardcoded Strings

1. Scan components for hardcoded text
2. Identify strings that should be internationalized
3. Suggest appropriate key names
4. Generate the translation entries

### Key Naming Convention

```
<page>.<section>.<element>

Examples:
- home.hero.title
- learn.faq.question1
- common.button.submit
- measure.result.ciValue
```

### Medical Terminology

For medical terms, maintain consistency:
- CI (Cephalic Index) / 头颅指数
- CVAI (Cranial Vault Asymmetry Index) / 颅穹窿不对称指数
- Plagiocephaly / 斜头畸形
- Brachycephaly / 短头畸形

### Output Format

When adding translations, show:
```json
// messages/en.json
{
  "learn": {
    "hero": {
      "title": "English text"
    }
  }
}

// messages/zh.json
{
  "learn": {
    "hero": {
      "title": "中文文本"
    }
  }
}
```
