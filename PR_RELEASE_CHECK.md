# PR Release Check Workflows

These workflows automatically analyze pull requests and add comments indicating whether merging the PR will trigger a new release based on conventional commit patterns.

## Features

- 🔍 **Automatic Analysis**: Analyzes commit messages in PRs to determine release impact
- 📝 **Smart Comments**: Adds/updates comments on PRs with release information
- 🚀 **Release Type Detection**: Identifies major, minor, or patch releases
- 📊 **Commit Statistics**: Shows breakdown of commit types (feat, fix, breaking changes, etc.)
- 🔢 **Version Prediction**: Attempts to predict the next semantic version
- 🔄 **Reusable**: Available as both standalone and reusable workflows

## Quick Start

### Option 1: Simple Setup
Use the pre-configured workflow for standard setups:

```yaml
# .github/workflows/pr-release-check.yml
name: PR Release Check

on:
  pull_request:
    branches:
      - main
    types: [opened, synchronize, edited]

jobs:
  check-release:
    uses: ./.github/workflows/reusable-pr-release-check.yml
    secrets: inherit
```

### Option 2: Custom Configuration
Use the reusable workflow with custom settings:

```yaml
# .github/workflows/pr-release-check.yml
name: PR Release Check

on:
  pull_request:
    branches:
      - main
    types: [opened, synchronize, edited]

jobs:
  check-release:
    uses: ./.github/workflows/reusable-pr-release-check.yml
    with:
      node-version: '18'
      package-manager: 'npm'
      working-directory: './packages/core'
      target-branch: 'main'
      cache-dependency-path: '**/package-lock.json'
    secrets: inherit
```

## Configuration Options

| Input | Description | Default | Required |
|-------|-------------|---------|----------|
| `node-version` | Node.js version to use | `lts/*` | No |
| `package-manager` | Package manager (npm, yarn, pnpm) | `yarn` | No |
| `working-directory` | Working directory for the project | `.` | No |
| `target-branch` | Target branch for releases | `main` | No |
| `cache-dependency-path` | Path to dependency file for caching | `**/yarn.lock` | No |
| `semantic-release-config` | Path to semantic-release config file | `''` | No |

## How It Works

### Commit Analysis
The workflow analyzes commits in the PR and looks for conventional commit patterns:

- **Major Release** (🚀): Breaking changes
  - Commits with `!` suffix (e.g., `feat!: breaking change`)
  - Commits with `BREAKING CHANGE` in body
  
- **Minor Release** (✨): New features
  - Commits starting with `feat:` (e.g., `feat: add new feature`)
  
- **Patch Release** (🔧): Bug fixes and improvements
  - Commits starting with `fix:` (e.g., `fix: resolve issue`)
  - Commits starting with `perf:` (e.g., `perf: improve performance`)

### Comment Examples

#### Release Triggering PR
```markdown
## 🚀 Release Impact

**Major Release** (breaking changes)

➡️ **Next version:** `2.0.0`

This PR contains commits that will trigger a new release when merged to `main`.

### Commit Analysis
The following commit types were detected:
- **Breaking changes:** 1 (suffix `!`) + 0 (body)
- **Features:** 2
- **Fixes:** 1
- **Performance:** 0

### Recent commits:
- feat!: redesign API interface
- feat: add new authentication method
- fix: resolve login issue
```

#### Non-Release PR
```markdown
## 📋 Release Impact

**No Release** - This PR will not trigger a new release.

The commits in this PR do not match the conventional commit patterns that trigger releases:
- `feat:` (minor release)
- `fix:` (patch release)
- `perf:` (patch release)
- `BREAKING CHANGE` or `!` suffix (major release)

### Current commits:
- docs: update README
- chore: update dependencies
- ci: improve workflow
```

## Requirements

1. **Semantic Release**: Your project should use semantic-release
2. **Conventional Commits**: Commits should follow conventional commit format
3. **Package Manager**: One of npm, yarn, or pnpm
4. **Permissions**: The workflow needs:
   - `contents: read` - To read repository contents
   - `pull-requests: write` - To create/update PR comments

## Dependencies

The workflow uses these GitHub Actions:
- `actions/checkout@v4` - For checking out code
- `actions/setup-node@v4` - For setting up Node.js
- `peter-evans/find-comment@v3` - For finding existing comments
- `peter-evans/create-or-update-comment@v4` - For creating/updating comments

## Troubleshooting

### Common Issues

1. **Version detection not working**: Ensure semantic-release is properly configured
2. **Comments not appearing**: Check that the workflow has `pull-requests: write` permission
3. **Wrong package manager**: Update the `package-manager` input to match your setup
4. **Monorepo setup**: Set the correct `working-directory` and `cache-dependency-path`

### Debug Mode

To debug issues, you can check the workflow logs in the Actions tab of your repository.

## Examples

### Basic npm project
```yaml
jobs:
  check-release:
    uses: ./.github/workflows/reusable-pr-release-check.yml
    with:
      package-manager: 'npm'
      cache-dependency-path: '**/package-lock.json'
    secrets: inherit
```

### Monorepo with pnpm
```yaml
jobs:
  check-release:
    uses: ./.github/workflows/reusable-pr-release-check.yml
    with:
      package-manager: 'pnpm'
      working-directory: './packages/api'
      cache-dependency-path: '**/pnpm-lock.yaml'
    secrets: inherit
```

### Different target branch
```yaml
jobs:
  check-release:
    uses: ./.github/workflows/reusable-pr-release-check.yml
    with:
      target-branch: 'develop'
    secrets: inherit
```

## Contributing

To improve these workflows:
1. Test changes in your fork
2. Update documentation
3. Submit a pull request

## License

MIT License - see LICENSE file for details.
