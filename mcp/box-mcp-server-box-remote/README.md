# Box MCP Server (Remote)

Securely connect MCP-compatible agents to your Box content and Box AI—without moving data out of Box.

> **Endpoint**: `https://mcp.box.com`

---

## Overview

The remote Box MCP server lets AI agent platforms (e.g., **Copilot Studio**, **Claude**, **Mistral Le Chat**) connect to Box to securely query and use Box data and AI-powered tools, while keeping content protected. Authorization is handled via OAuth so users can grant controlled access from within the client they’re using.

[Learn more in the remote Box MCP server guide](https://developer.box.com/guides/box-mcp/remote/)

> Looking for the self-hosted/local version? See [box-community/mcp-server-box](https://github.com/box-community/mcp-server-box).

---

## Capabilities

The remote Box MCP server provides tools across several areas, such as:  
- **User info** (e.g., identify the authenticated user)  
- **File and folder operations** (read content, list folders, search files/folders, etc.)  
- **Box AI tools** (Q&A across files, metadata extraction, etc.)  

For the complete and most up-to-date set of supported tools, see the [remote Box MCP server documentation](https://developer.box.com/guides/box-mcp/remote/).

---

## Setup

To connect an MCP client to the remote Box MCP server, you’ll first configure an OAuth app in Box, then use its credentials in your client. The preferred path is to use the predefined **Box MCP Server** integration in the [Admin Console](https://support.box.com/hc/en-us/articles/360043695714-Admin-Console-Guide), but in certain flows (e.g., the [GitHub MCP registry](https://github.com/mcp)), you may need to create your own OAuth app in the [Developer Console](https://app.box.com/developers/console) instead.

### 1. Configure an OAuth app in Box

Choose one of the following options:  

- **Admin Console flow (preferred):** Enable or configure the Box MCP server from **Admin Console → Integrations**.  
- **Developer Console flow:** [Create an OAuth app](https://developer.box.com/guides/authentication/oauth2/oauth2-setup/) with the proper redirect URI and scopes.  

For detailed instructions, see the [remote Box MCP server guide](https://developer.box.com/guides/box-mcp/remote/).


### 2. Connect from your MCP client

Most clients or platforms let you add a remote MCP server by URL and will guide you through the OAuth flow. Here are some of the details you’ll typically need to provide:

- **Endpoint URL:** `https://mcp.box.com`  
- **Name:** a name of your choice (e.g., `box-remote-mcp`)  
- **Authorization:** Bearer token (via OAuth 2.0)  
- **Client ID** and **Client Secret**: obtained from your app’s credentials (Admin Console for the predefined **Box MCP Server** integration, or Developer Console if you created your own OAuth app)  
- **Redirect URI**: provided by your client and must be added to your app configuration (via the Admin Console or Developer Console, depending on your flow)  

See the [remote Box MCP server guide](https://developer.box.com/guides/box-mcp/remote/) for client-specific connection examples (Claude, Copilot Studio, Le Chat).

---

## OAuth & Discovery

The remote Box MCP server is an **OAuth‑protected resource** backed by Box’s authorization server:

- [Resource metadata](https://mcp.box.com/.well-known/oauth-protected-resource)  
- [Authorization server metadata](https://api.box.com/.well-known/oauth-authorization-server)  

For implementation details, see the [Box authentication guide](https://developer.box.com/guides/authentication/).

**Using tokens with the Box API**

All Box API calls require a valid [Access Token](https://developer.box.com/guides/authentication/tokens/access-tokens/). Example:

```bash
curl https://api.box.com/2.0/users/me \
  -H "authorization: Bearer <ACCESS_TOKEN>"
```

---

## Terms

Use of the Box MCP server and Box APIs is subject to the **Box Terms of Service**:  
https://www.box.com/legal/termsofservice

---

## Support & Docs

- Remote Box MCP server: https://developer.box.com/guides/box-mcp/remote/  
- Authentication guide: https://developer.box.com/guides/authentication/  
- API status: https://status.box.com/  
- Community: https://community.box.com/
