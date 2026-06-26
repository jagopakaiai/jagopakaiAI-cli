# Microsoft Sentinel Data Exploration

**INSTALL** [![Install Microsoft Sentinel Data Exploration MCP in VS Code](https://img.shields.io/badge/VS_Code-0098FF?style=flat-square&logo=visualstudiocode&logoColor=ffffff)](https://vscode.dev/redirect?url=vscode:mcp/install?%7B%22name%22%3A%22microsoft-sentinel-data-exploration%22%2C%22url%22%3A%22https%3A%2F%2Fsentinel.microsoft.com%2Fmcp%2Fdata-exploration%22%7D) [![Install Microsoft Sentinel Data Exploration MCP in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=ffffff)](https://vscode.dev/redirect?url=vscode-insiders:mcp/install?%7B%22name%22%3A%22microsoft-sentinel-data-exploration%22%2C%22url%22%3A%22https%3A%2F%2Fsentinel.microsoft.com%2Fmcp%2Fdata-exploration%22%7D)

The data exploration tool collection in the Microsoft Sentinel MCP server lets you search for relevant tables and retrieve data from Microsoft Sentinel's data lake using natural language.

## 🌐 The Microsoft Sentinel Data Exploration MCP Server Endpoint
The Microsoft Sentinel Data Exploration MCP Server is accessible to any IDE, agent, or tool that supports the Model Context Protocol (MCP). Any compatible client can connect to the following **remote MCP endpoint**:
> https://sentinel.microsoft.com/mcp/data-exploration

**Authentication**
OAuth 2.0

## 🧩 Use cases
**Password-Spray Hunt**
Build security agents that autonomously select relevant sign-in tables, aggregates login attempts by user and IP, and flags patterns consistent with password-spray behavior—like low-frequency attempts over several months across many accounts.

**Impossible Travel Check**
Build security agents that correlate sign-in events by user, calculates geodistance and time gaps between logins, and flags cases where travel speed exceeds realistic thresholds, suggesting credential compromise.

**Multi-factor authorization failures**
Build security agents that analyzes multi-factor auth logs to detect spikes in failure rates, clustering by user, IP, or time window, and surfaces anomalies that deviate from baseline behavior over long periods.

**Dormant Account wake-up**
Build security agents that based on inactivity thresholds, scans for accounts with long silence followed by recent activity, and builds a timeline showing when and how these accounts re-engaged.

## 📚 Learn more
[Explore Microsoft Sentinel data lake with data exploration collection](https://aka.ms/mcp/data-exploration)