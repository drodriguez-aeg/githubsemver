# Example usage in another repository

## Using the reusable build workflow

Create `.github/workflows/ci.yml` in your repository:

```yaml
name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    uses: your-org/github-semver-workflows/.github/workflows/reusable-build.yml@main
    with:
      node-version: '18'
      build-command: 'npm run build'
      test-command: 'npm test'
      lint-command: 'npm run lint'
```

## Using the reusable release workflow

Create `.github/workflows/release.yml` in your repository:

```yaml
name: Release

on:
  push:
    branches: [ main ]

jobs:
  release:
    uses: your-org/github-semver-workflows/.github/workflows/reusable-release.yml@main
    secrets:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
    with:
      node-version: '18'
      build-command: 'npm run build'
```

## Using the Docker workflow

Create `.github/workflows/docker.yml` in your repository:

```yaml
name: Docker Build

on:
  push:
    branches: [ main ]
    tags: [ 'v*' ]
  pull_request:
    branches: [ main ]

jobs:
  docker:
    uses: your-org/github-semver-workflows/.github/workflows/reusable-docker.yml@main
    with:
      image-name: ${{ github.repository }}
      push: ${{ github.event_name != 'pull_request' }}
    secrets:
      REGISTRY_USERNAME: ${{ github.actor }}
      REGISTRY_PASSWORD: ${{ secrets.GITHUB_TOKEN }}
```

## Required setup in your repository

1. **Install dependencies** (copy relevant parts to your package.json):
```json
{
  "devDependencies": {
    "@commitlint/cli": "^18.4.3",
    "@commitlint/config-conventional": "^18.4.3",
    "commitizen": "^4.3.0",
    "cz-conventional-changelog": "^3.3.0"
  },
  "scripts": {
    "commit": "cz"
  },
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog"
    }
  }
}
```

2. **Copy configuration files**:
   - `.commitlintrc.json`
   - `.releaserc.json` (if using semantic-release)

3. **Set up repository secrets** (if needed):
   - `NPM_TOKEN` (for npm publishing)
   - `GITHUB_TOKEN` (automatically provided)
