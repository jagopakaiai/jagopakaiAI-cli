# Model Context Protocol (MCP)

Learn how to use the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/introduction) to enable AI agents to securely access and interact with your Intercom data whenever helpful.

Region availability
Currently the Intercom MCP server is only supported in US hosted workspaces.

## What is Model Context Protocol?

MCP is a protocol that enables AI tools and applications to connect with Intercom's data and services in a secure, standardized way. It provides a structured method for AI models to:

- Find and retrieve Intercom data (conversations, contacts, etc.)
- Access specific tools and functionality provided by Intercom
- Maintain context about your Intercom workspace when working with AI assistants


## How MCP Works

Intercom hosts a remote MCP server that follows the authenticated remote MCP specification ([docs](https://modelcontextprotocol.io/specification/2025-03-26/basic/authorization)). This server handles requests from AI tools and provides access to Intercom data through a secure interface.

**Connection URLs:**

- **Streamable HTTP (Recommended)**: `https://mcp.intercom.com/mcp`
- **Legacy SSE**: `https://mcp.intercom.com/sse` (deprecated, maintained for backwards compatibility)


When an AI tool or application needs to access Intercom data:

1. The tool connects to Intercom's MCP server
2. Authentication verifies the user's permissions
3. The tool can then access relevant Intercom data and functionality
4. The connection remains live to receive updates as needed


## Benefits of Using MCP

- **Secure Access**: All data access is authenticated and authorized
- **Standardized Interface**: Consistent interaction pattern across different AI tools
- **Contextual Understanding**: AI assistants maintain awareness of your Intercom environment
- **Increased Development Efficiency**: Retrieve and interpret customer data from Intercom via your internal AI tools to be more efficient in your work


## Available Tools

The Intercom MCP Server provides **6 tools** for interacting with the Intercom API:

### Universal Tools

#### **search**

Universal search tool for finding conversations and contacts using a query DSL approach.

**Key Features:**

- **Must specify** `object_type:conversations` or `object_type:contacts` to indicate which API to call
- Supports complex field-based queries with operators (eq, neq, gt, lt, contains, etc.)
- Returns summary results with IDs prefixed by type (`conversation_*` or `contact_*`)
- Built-in pagination support with `starting_after` parameter
- Free-text search capability with `q:` parameter


**Example Queries:**


```
object_type:conversations state:open source_type:email
object_type:contacts email_domain:"example.com"
object_type:conversations source_body:contains:"refund" limit:20
```

#### **fetch**

Retrieve complete detailed information for specific resources.

**Key Features:**

- Use IDs returned from search results (prefixed with `conversation_` or `contact_`)
- Returns full resource details including metadata, conversation parts, custom attributes
- Includes direct links to Intercom app for easy navigation


### Direct API Tools

#### **search_conversations**

Search conversations by specific IDs with advanced filtering options including source type, author details, state, and timing statistics.

#### **get_conversation**

Retrieve a single conversation by ID with complete details including all conversation parts and metadata.

#### **search_contacts**

Search contacts by IDs, name, email, phone, custom attributes, or email domain with flexible matching options.

#### **get_contact**

Get complete contact information including custom attributes, location data, and activity timestamps.

## Setting things up

### Authentication Methods

The MCP server supports **two authentication approaches**:

1. **OAuth Flow (Recommended)**: Automatic browser-based authentication
2. **Bearer Token**: Direct API token authentication


### Configuration Examples

Configuration Guide
The examples below are generic templates. **Always refer to your specific LLM provider's official documentation** for the most up-to-date configuration instructions, as setup details may vary between versions and providers.

For **OAuth authentication** (recommended):


```json
{
  "mcpServers": {
    "intercom": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "https://mcp.intercom.com/mcp"
      ]
    }
  }
}
```

For **Bearer token authentication**:


```json
{
  "mcpServers": {
    "intercom": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "https://mcp.intercom.com/mcp",
        "--header",
        "Authorization:${AUTH_HEADER}"
      ],
      "env": {
        "AUTH_HEADER": "Bearer YOUR_INTERCOM_API_TOKEN"
      }
    }
  }
}
```

### LLM Provider Setup Guides

Each AI provider has specific setup instructions for MCP servers. Please consult the official documentation for your provider:

- **Claude Desktop**: [MCP setup documentation](https://modelcontextprotocol.io/quickstart/user)
- **Claude Code**: [MCP setup documentation](https://docs.anthropic.com/en/docs/claude-code/mcp)
- **OpenAI**: [MCP integration guide](https://platform.openai.com/docs/guides/tools-remote-mcp)
- **Claude.ai**: Go to [settings](https://claude.ai/settings/profile) > Integrations > + Add integration, then use `https://mcp.intercom.com/mcp`
- **Cursor**: [MCP configuration guide](https://docs.cursor.com/context/model-context-protocol)
- **Windsurf**: [MCP setup instructions](https://docs.windsurf.com/windsurf/cascade/mcp)
- **VS Code**: [MCP integration docs](https://code.visualstudio.com/docs/copilot/chat/mcp-servers)


## Required Scopes

The Intercom MCP server requires the following permissions to access your workspace data. When using Bearer token authentication, ensure your access token includes these scopes. [Learn more about OAuth permissions](https://developers.intercom.com/docs/build-an-integration/learn-more/authentication/setting-up-oauth#permissions).

- **Read and list users and companies**: Required for Intercom User and Company data access
- **Read conversations**: Required for Intercom Conversation data access


## MCP Inspector for Server Exploration

Test the connection using:


```bash
npx @modelcontextprotocol/inspector
```

Then connect to:

- **Transport Type**: Streamable HTTP
- **URL**: `https://mcp.intercom.com/mcp` (or `/sse` for legacy)


## Debugging and Troubleshooting MCP-Remote

1. **Authentication Problems**

```bash
# Kill existing connections
pkill -f mcp-remote

# Clear MCP auth cache
rm -rf ~/.mcp-auth
```
2. **Connection Testing**

```bash
# Test direct connection
npx mcp-remote https://mcp.intercom.com/mcp

# With bearer token
npx mcp-remote https://mcp.intercom.com/mcp --header "Authorization:Bearer YOUR_TOKEN"
```
3. **View Active MCP Connections**

```bash
ps aux | grep mcp-remote | grep -v grep
```


### Error Handling

- **Invalid queries**: The search tool validates field names and operators, returning specific error messages
- **Authentication failures**: Check token validity or restart OAuth flow
- **Rate limiting**: Intercom API limits apply - reduce request frequency if needed


### Troubleshooting Tips

- Restart AI Agent after configuration changes
- Use the MCP Inspector to verify tool availability
- Check browser console for OAuth-related errors
- Verify Intercom API token permissions for bearer auth