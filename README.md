# semantic-release-monorepo-git

Semantic release plugin to commit release assets to the project's for multi-lingual [git](https://git-scm.com/) mono-repository.

**This plugin extends `@semantic-release/git` plugin. All the options provided by the base plugin are available. See [**semantic-release**](https://github.com/semantic-release/semantic-release) plugin for more information.**

| Step               | Description                                                                                                                                                                                                                                                                                                |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `verifyConditions` | Verify the access to the remote Git repository, the project root [`workspaceRoot`](#workspaceRoot), the commit [`message`](https://github.com/semantic-release/git?tab=readme-ov-file#message) and the [`assets`](https://github.com/semantic-release/git?tab=readme-ov-file#assets) option configuration. |
| `prepare`          | Create a release commit, including configurable file assets.                                                                                                                                                                                                                                               |

## Dependencies

| Component             | Version    |
| --------------------- | ---------- |
| Node                  | >= 18      |
| semantic-release      | >= 22.0.12 |
| @semantic-release/git | >= 10.0.1  |

## Install

```bash
$ npm install https://github.com/SoftwareAG/semantic-release-monorepo-git/releases/download/v1.0.0/semantic-release-monorepo-git-1.0.0.tgz -D
```

## Usage

The plugin can be configured in the [**semantic-release** configuration file](https://github.com/semantic-release/semantic-release/blob/master/docs/usage/configuration.md#configuration):

```json
{
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    [
      "semantic-release-monorepo-git",
      {
        "assets": ["dist/**/*.{js,css}", "docs", "package.json"],
        "message": "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
      }
    ]
  ]
}
```

With this example, for each release a release commit will be pushed to the remote Git repository with:

- a message formatted like `chore(release): <version> [skip ci]\n\n<release notes>`
- the `.js` and `.css` files in the `dist` directory, the files in the `docs` directory and the `package.json`

### Examples

### Example: Multi-lingual Project with Dependencies in Separate Workspaces

For a project with dependencies implemented in different programming languages, you can use the following example to create the plugin configuration.

The project structure consists of a web application as the main project, with a `release.config.js` file at its root for semantic-release configuration. The dependencies projects, `api` and `common`, are located in the `backend/java` folder and `web-api` is located in the `backend/node` folder. When semantic release is triggered from the `webapp` project, the versions of all the packages - `webapp`, `api`,`common`, and `web-api` - will be updated to the next version.

#### Repository structure

```
repo-root-directory
 |-webapp
 |--package.json
 |--release.config.js
 |--styles
 |--- main.css
 |-- README.md
 |-- index.html
 |-backend
 |--java
 |---api
 |----pom.xml
 |----src
 |---common
 |----pom.xml
 |----src
 |--node
 |---web-api
 |----package.json
 |----src

```

The `pluginConfig` when semantic release is run from `webapp` project

```json
{
  "workspaceRoot": "..",
  "assets": ["webapp/package.json", "backend/java/pom.xml", "backend/node/web-api/package.json"]
}
```

#### `workspaceRoot`

The workspaceRoot parameter accepts either a relative or absolute path, representing the directory where all the assets intended for the commit are located. This folder serves as the root directory from which the version control system will identify and process the assets to be included in the commit.

**Note**: When working with mono repositories that do not have node based main project, install the plugin globally

```bash
$ npm install -g semantic-release https://github.com/SoftwareAG/semantic-release-monorepo-git/releases/download/v1.0.0/semantic-release-monorepo-git-1.0.0.tgz
```
