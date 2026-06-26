# Black Duck MCP

Black Duck MCP brings Signal's AI-powered security analysis directly into your development environment. It enables code scanning through leading coding assistants – including Claude, Gemini, Cursor, Copilot, and others – so you can detect security issues, receive actionable insights, and apply recommended fixes quickly and consistently.

## Key Features & Benefits

- **Changes Scan**:
  - Performs fast, incremental security scans focused only on the code changes introduced by the developer. 
  - Ideal for early-stage detection of issues as code is written
- **File Scan**:
  - Runs a targeted security analysis on specific files or directories. 
  - Best suited for projects that do not use Git or for developers who want to analyze specific portions of the codebase
- **Cross-Platform Support**:
  - Works on Windows, macOS, and Linux

## Requirements

- [Signal License](https://www.blackduck.com/signal-ai-appsec/early-access.html)
- [Node.js](https://nodejs.org/) v24.0.0 or newer

## Getting started

### Step 1: Add to your MCP client

Add the following configuration to your MCP client (using Claude user level config as example):
```json
{
  "mcpServers": {
    "black-duck-signal": {
      "command": "npx",
      "args": ["-y", "@black-duck/mcp-server"],
      "env": {
        "BLACKDUCK_MCP_GATEWAY_KEY": "your-api-key-here"
      }
    }
  }
}
```

### Step 2: Your first scan

Use one of following prompts in your MCP client to get you started:

```
Scan my code changes for security vulnerabilities
```

Your MCP client should execute a security scan and report any vulnerabilities found on the **code changes made**. Requires that the project is git based to determine what files have changed.

```
Scan the changed files with respect to the main branch
```

Your MCP client should execute a security scan taking into account **only code changes in the current branch** vs the main branch and report any vulnerabilities found on the code changes made. Requires that the project is git based to determine what files have changed.

```
Scan all files under folder foobar for security vulnerabilities
```

Your MCP client should execute a security scan and report any vulnerabilities found.

## Tools

| Tool | Parameters | Returns | Best Use Cases |
|------|------------|---------|----------------|
| **`run_changes_security_scan`** | **`projectPath`** (required): Absolute path to git project<br><br>**`gitPatchMode`** (required):<br>• `all-uncommitted`: Scan staged + unstaged changes<br>• `reference-branch`: Scan changes since branching<br><br>**`referenceBranch`** (optional): Reference branch name (e.g., `main`)<br><br>**`scanEntireFileContent`** (optional): When `true`, scans entire content of changed files instead of just changed lines. Default: `false` | • `sarifFilePath`: Path to SARIF report<br>• `status`: `success` or `failure`<br>• `resourceUris`: MCP resource URIs<br>• `issueCounts`: Counts by severity<br>• `analysisGuidance`: Analysis steps | • **Faster**: Analyzes only changed code<br>• **Focused**: Shows issues from your changes<br>• **Iterative**: Perfect for dev workflows & CI/CD<br>• **Efficient**: Reduces scan cost and time |
| **`run_security_scan`** | **`projectPath`** (required): Absolute path to project<br><br>**`filePaths`** (required): Array of file/directory absolute paths to scan | • `sarifFilePath`: Path to SARIF report<br>• `status`: `success` or `failure`<br>• `resourceUris`: MCP resource URIs<br>• `issueCounts`: Counts by severity<br>• `analysisGuidance`: Analysis steps | • Analyzing specific files/directories<br>• Focused security review of critical paths<br>• Quick checks during development<br>• Non-git projects |

## Optional Configuration

The Black Duck Signal MCP server supports the following environment variables:

| Variable | Default | Description |
|----------|---------|-------------|
| `BLACKDUCK_MCP_GATEWAY_KEY` | None (required) | API key for enhanced AI analysis |
| `BLACKDUCK_HOME` | User's home directory | Override the default `.blackduck` folder location |
| `BLACKDUCK_MCP_TOOL_TIMEOUT` | `1800000` (30 min) | Scan timeout in milliseconds |
| `BLACKDUCK_MCP_LOG_LEVEL` | `info` | Log level: `error`, `warn`, `info`, or `debug` |

You can set these variables in your MCP client configuration:

```json
{
  "mcpServers": {
    "black-duck": {
      "command": "npx",
      "args": ["-y", "@black-duck/mcp-server"],
      "env": {
        "BLACKDUCK_MCP_GATEWAY_KEY": "your-api-key-here",
        "BLACKDUCK_MCP_LOG_LEVEL": "debug"
      }
    }
  }
}
```


## Logging and Troubleshooting

### Log Location

All MCP logs are written to `/Users/<username>/.blackduck/mcp/logs/` for linux/mac and `C:\Users\<Username>\AppData\Roaming\BlackDuck\mcp\logs\` (customizable via `BLACKDUCK_HOME`):

- `black-duck-mcp.log` - Combined log (all levels)
- `black-duck-mcp-error.log` - Error-only log

## IP Allowlist

The following URLs and IP addresses must be accessible for the MCP server to function properly:

| URL | IP Address |
|-----|------------|
| `repo.blackduck.com` | `34.149.5.115` |
| `llm.core.blackduck.com` | `104.18.36.253` |

> Ensure your firewall allows outbound HTTPS (port 443) connections to these endpoints


## License

This project is licensed under the [MIT License](https://github.com/blackducksoftware/mcp-server/blob/main/LICENSE).


## Resources
- [Documentation](https://documentation.blackduck.com/bundle/signal/page/topics/c_signal_overview.html)
- [Black Duck Signal](https://www.blackduck.com/signal-ai-appsec.html)
- [Contact Us](https://www.blackduck.com/signal-ai-appsec/early-access.html)
- [Request SBOM](mailto:sbom_request@blackduck.com)
