# Design Spec: MCP Registry Scraper and Setup Generator

Scrape all MCP servers from the GitHub MCP Registry (pages 1 to 4, containing exactly 110 servers) and copy official/archived reference implementations into the `mcp/` directory. Each MCP will be stored in its own folder containing its original `README.md` and a generated `config.json` containing the launch commands, packages, description, and metadata so that the CLI can perform auto-installation.

## Target Directory Structure

The files will be organized under the `mcp/` directory inside the workspace:

```text
mcp/
  <normalized-owner>-<normalized-repo>/
    README.md     # Scraped / copied documentation
    config.json   # Auto-setup metadata config
```

- **Folder Names**: Folders are named using the lowercase format `<owner>-<repo>` to ensure uniqueness and compatibility.
- **`README.md`**: Contains the raw markdown text scraped directly from the repository's metadata or copied from the reference server folder.
- **`config.json`**: Standardized configuration block. Example structure:

```json
{
  "name": "microsoft-markitdown",
  "displayName": "Markitdown",
  "description": "Convert various file formats (PDF, Word, Excel, images, audio) to Markdown.",
  "repository": "https://github.com/microsoft/markitdown",
  "mcpConfig": {
    "command": "uvx",
    "args": [
      "markitdown-mcp"
    ]
  },
  "env": {}
}
```

## Automation Script Design (`playground/scrape_mcps.py`)

We will write a python script to handle the scraping efficiently:

1. **Phase 1: Fetch Registry Links**
   - Query `https://github.com/mcp?page=1` through `page=4`.
   - Parse all list URLs matching `/mcp/<owner>/<repo>` (110 unique servers).
2. **Phase 2: Fetch and Extract Detail JSON**
   - Fetch detail pages `https://github.com/mcp/<owner>/<repo>` in parallel using `concurrent.futures`.
   - Find the `<script>` tag containing the `mcpDetailsRoute` payload.
   - Extract the JSON payload containing the server details.
3. **Phase 3: Write Outputs**
   - Normalize the folder names to `<owner>-<repo>`.
   - Extract the README markdown string from `server_data.repository.readme` and write to `mcp/<owner>-<repo>/README.md`.
   - Map `server_data.packages` to `mcpConfig`.
     - `runtimeHint == "uvx"` -> `command: "uvx"`, `args: [<identifier>]`
     - `runtimeHint == "npx"` or `registryType == "npm"` -> `command: "npx"`, `args: ["-y", <identifier>]`
     - `runtimeHint == "pip"` -> `command: "python"`, `args: ["-m", <identifier>]`
     - If no packages, default to `command: ""` (manual setup required).
   - Write metadata to `mcp/<owner>-<repo>/config.json`.
4. **Phase 4: Integrate Reference Servers**
   - Scan our cloned reference repositories (`playground/temp-servers` and `playground/temp-servers-archived`).
   - Copy their `README.md` to `mcp/<server-name>/`.
   - Generate their `config.json` matching `src/utils/mcp.ts` default definitions.
5. **Phase 5: Clean Up**
   - Clean up temporary files in `playground/temp-servers` and `playground/temp-servers-archived`.

## Self-Review Check
- **No Placeholders**: All fields and rules are fully defined.
- **Consistency**: Output folder layout matches requirements. All 110 registry servers are parsed.
- **Safety**: Safe handling of empty package information and robust fallback mappings.
