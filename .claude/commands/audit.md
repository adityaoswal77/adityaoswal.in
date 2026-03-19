
# Audit Command

Runs a comprehensive audit workflow:

Check for vulnerabilities, edge cases and security

1. **Update devlog** — Append timestamp and audit summary to `DEVLOG.md`
2. **Save context** — Export current project state to `.claude/context.md`
3. **Build website** — Run `npm run build` to check for TypeScript/build errors
4. **Commit to main** — Stage changes and commit with message `"audit: devlog + context update"`

## Usage

```bash
audit
```

## Implementation

This command chains:

- `echo "$(date): Audit run" >> DEVLOG.md`
- Context snapshot export
- `npm run build`
- `git add . && git commit -m "audit: devlog + context update"`
