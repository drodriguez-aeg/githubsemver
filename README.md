# GitHub Semantic Versioning Workflows

This repository contains reusable GitHub Actions workflows that implement semantic versioning and automated releases using Commitizen and semantic-release.

## Features

- 🔄 **Semantic Versioning**: Automatic version bumping based on conventional commits
- 📝 **Conventional Commits**: Enforced commit message format using Commitizen
- 🚀 **Automated Releases**: Automatic changelog generation and GitHub releases
- 🔁 **Reusable Workflows**: Workflows that can be referenced in other repositories
- 📦 **Package Management**: Using Yarn for dependency management

## Quick Start

### 1. Install Dependencies

```bash
yarn install
```

### 2. Make Commits Using Commitizen

```bash
yarn commit
```

This will prompt you to create a conventional commit message.

### 3. Automatic Releases

Releases are automatically created when changes are pushed to the main branch, based on the conventional commit messages.

## Available Workflows

### CI/CD Pipeline (`ci.yml`)
- Runs tests and linting
- Supports multiple Node.js versions
- Caches dependencies for faster builds

### Semantic Release (`release.yml`)
- Automatically determines version bumps
- Generates changelogs
- Creates GitHub releases
- Updates package.json

### Reusable Workflows

#### Build and Test (`reusable-build.yml`)
A reusable workflow for building and testing Node.js projects.

**Usage in other repositories:**
```yaml
jobs:
  build:
    uses: your-org/github-semver-workflows/.github/workflows/reusable-build.yml@main
    with:
      node-version: '18'
```

#### Semantic Release (`reusable-release.yml`)
A reusable workflow for semantic releasing.

**Usage in other repositories:**
```yaml
jobs:
  release:
    uses: your-org/github-semver-workflows/.github/workflows/reusable-release.yml@main
    secrets:
      NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## Commit Message Format

This project uses [Conventional Commits](https://www.conventionalcommits.org/). The commit message format is:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types
- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to the build process or auxiliary tools

### Examples
```
feat: add new reusable workflow for Docker builds
fix: resolve issue with cache key generation
docs: update README with usage examples
chore: bump dependencies to latest versions
```

## Configuration Files

- **`.commitlintrc.json`**: Commit message linting configuration
- **`.releaserc.json`**: Semantic-release configuration
- **`package.json`**: Project dependencies and scripts

## GitHub Actions Setup

To use these workflows in your repository, you'll need to:

1. Add the following secrets to your repository:
   - `GITHUB_TOKEN` (automatically provided)
   - `NPM_TOKEN` (if publishing to npm)

2. Ensure your default branch is protected and requires PR reviews

3. Reference the workflows from this repository in your `.github/workflows/` files

## License

MIT License - see [LICENSE](LICENSE) file for details.
