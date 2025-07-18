/* eslint-disable no-template-curly-in-string */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable arrow-body-style */
const { execSync } = require('node:child_process');

const isDryRun = () => {
  return process.argv.includes('--dry-run');
};

const getLocalRepoUrl = () => {
  const topLevelDir = execSync('git rev-parse --show-toplevel').toString().trim();
  return `file://${topLevelDir}/.git`;
};

const getCurrentBranch = () => {
  return execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
};

const releaseConfig = () => {
  return {
    repositoryUrl: isDryRun()
      ? getLocalRepoUrl()
      : 'git@github.com:AEG-Presents/aegp-elvis-svc-base',
    branches: isDryRun() ? getCurrentBranch() : 'master',
    plugins: [
      '@semantic-release/commit-analyzer',
      '@semantic-release/release-notes-generator',
      '@semantic-release/github',
      [
        '@semantic-release/changelog',
        {
          changelogFile: 'docs/CHANGELOG.md',
        },
      ],
      [
        '@semantic-release/npm',
        {
          pkgRoot: './dist',
        },
      ],
      [
        '@semantic-release/git',
        {
          assets: ['docs', 'package.json'],
          message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
        },
      ],
    ],
  };
};

module.exports = releaseConfig();