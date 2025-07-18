/* eslint-disable no-template-curly-in-string */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable arrow-body-style */

const prReleaseConfig = {
  // Use the current branch for PR releases
  branches: [
    '+([0-9])?(.{+([0-9]),x}).x',
    'main',
    'master',
    { name: 'beta', prerelease: true },
    { name: 'alpha', prerelease: true },
    // Match any branch that's a PR - create prerelease
    { name: '*', prerelease: 'pr-${name.replace(/[^a-zA-Z0-9]/g, "-")}' }
  ],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      'semantic-release-github-pr',
      {
        // Enable GitHub PR releases
        githubPr: true,
        // Customize the pre-release identifier
        prereleaseTemplate: 'pr-${pullRequest.number}',
        // Add labels to the PR when released
        labels: ['🚀 released'],
        // Comment on the PR with release info
        comment: '🎉 This PR has been released in version ${nextRelease.version}',
        // Update PR title with version info
        updatePrTitle: false
      }
    ],
    [
      '@semantic-release/github',
      {
        // Create a pre-release on GitHub
        releasedLabels: ['🚀 released'],
        addReleases: 'bottom'
      }
    ]
    // Note: Removed npm plugin to avoid publishing pre-releases to npm
    // If you want to publish to npm with a pre-release tag, uncomment below:
    /*
    [
      '@semantic-release/npm',
      {
        npmPublish: true,
        tarballDir: 'pack',
        pkgRoot: './dist'
      }
    ]
    */
  ]
};

module.exports = prReleaseConfig;
