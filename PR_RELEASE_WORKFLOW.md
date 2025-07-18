# PR Release Workflow with semantic-release-github-pr

This repository now includes a workflow that creates pre-releases for pull requests using the `semantic-release-github-pr` plugin.

## How it works

1. **Trigger**: The workflow runs on every PR opened, synchronized, or reopened against the `main` branch
2. **Analysis**: It analyzes commits in the PR using conventional commit messages
3. **Pre-release**: If there are releasable changes, it creates a GitHub pre-release
4. **PR Integration**: It adds labels and comments to the PR with release information

## Files Added

- `.github/workflows/pr-release.yml` - GitHub Actions workflow for PR releases
- `pr-release.config.js` - Semantic release configuration for PR releases

## What happens when a PR is created/updated

1. The workflow analyzes commits in the PR
2. If there are features, fixes, or breaking changes (following conventional commits), it:
   - Creates a GitHub pre-release with version like `1.2.3-pr-123.1`
   - Adds a `🚀 released` label to the PR
   - Comments on the PR with the release information
   - Creates release notes based on the commits

## Configuration Options

In `pr-release.config.js`, you can customize:

- **prereleaseTemplate**: How the pre-release version is formatted
- **labels**: What labels to add to the PR
- **comment**: Custom comment message for the PR
- **updatePrTitle**: Whether to update the PR title with version info

## Branch Configuration

The configuration supports:
- `main`/`master` branches for regular releases
- `beta`/`alpha` branches for pre-releases
- Any other branch (like PR branches) for PR-specific pre-releases

## NPM Publishing (Optional)

Currently, the configuration doesn't publish to npm to avoid cluttering the npm registry with PR pre-releases. If you want to enable npm publishing for pre-releases, uncomment the npm plugin section in `pr-release.config.js` and add the `NPM_TOKEN` secret to your repository.

## Required Permissions

The workflow requires these permissions:
- `contents: write` - To create releases
- `issues: write` - To add labels
- `pull-requests: write` - To comment and label PRs
- `packages: write` - If publishing to npm/GitHub packages

## Setup Requirements

1. Install the plugin: `yarn add --dev semantic-release-github-pr`
2. Ensure your commits follow conventional commit format
3. The `GITHUB_TOKEN` is automatically provided by GitHub Actions

## Example PR Flow

1. Create a PR with conventional commits like:
   ```
   feat: add new feature
   fix: resolve bug
   ```
2. The workflow creates a pre-release `1.2.3-pr-123.1`
3. PR gets labeled with `🚀 released`
4. PR receives a comment with release details
5. When PR is merged to main, the regular release workflow creates the final release

This setup provides immediate feedback on what will be released when a PR is merged, helping with release planning and communication.
