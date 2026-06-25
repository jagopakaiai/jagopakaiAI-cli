import fs from 'fs';
import path from 'path';

export interface DetectedEnv {
  cursor: boolean;
  claude: boolean;
  copilot: boolean;
  git: boolean;
  vscode: boolean;
  projectType: string | null;
}

export function detectWorkspace(dir: string): DetectedEnv {
  const env: DetectedEnv = {
    cursor: false,
    claude: false,
    copilot: false,
    git: false,
    vscode: false,
    projectType: null
  };

  if (fs.existsSync(path.join(dir, '.cursorrules'))) {
    env.cursor = true;
  }
  if (fs.existsSync(path.join(dir, '.claudecoderc')) || fs.existsSync(path.join(dir, '.claudecode'))) {
    env.claude = true;
  }
  if (fs.existsSync(path.join(dir, '.github', 'copilot-instructions.md'))) {
    env.copilot = true;
  }
  if (fs.existsSync(path.join(dir, '.git'))) {
    env.git = true;
  }
  if (fs.existsSync(path.join(dir, '.vscode'))) {
    env.vscode = true;
  }

  // Attempt to guess project type/framework
  if (fs.existsSync(path.join(dir, 'package.json'))) {
    env.projectType = 'NodeJS/JavaScript';
  } else if (fs.existsSync(path.join(dir, 'composer.json'))) {
    env.projectType = 'PHP/Laravel';
  } else if (fs.existsSync(path.join(dir, 'requirements.txt')) || fs.existsSync(path.join(dir, 'pyproject.toml'))) {
    env.projectType = 'Python';
  } else if (fs.existsSync(path.join(dir, 'Cargo.toml'))) {
    env.projectType = 'Rust';
  } else if (fs.existsSync(path.join(dir, 'go.mod'))) {
    env.projectType = 'Go';
  }

  return env;
}

import { execSync } from 'child_process';
import os from 'os';

export interface InstalledAgents {
  claudeCode: boolean;
  antigravity: boolean;
  geminiCli: boolean;
  cline: boolean;
  codex: boolean;
  kilo: boolean;
  opencode: boolean;
}

export function detectInstalledAgents(): InstalledAgents {
  const agents: InstalledAgents = {
    claudeCode: false,
    antigravity: false,
    geminiCli: false,
    cline: false,
    codex: false,
    kilo: false,
    opencode: false
  };

  const checkCommand = (cmd: string): boolean => {
    try {
      const checkCmd = process.platform === 'win32' ? `where.exe ${cmd}` : `command -v ${cmd}`;
      execSync(checkCmd, { stdio: 'ignore' });
      return true;
    } catch {
      return false;
    }
  };

  const checkVscodeExtension = (pattern: string): boolean => {
    const home = os.homedir();
    const extDir = path.join(home, '.vscode', 'extensions');
    if (fs.existsSync(extDir)) {
      try {
        const files = fs.readdirSync(extDir);
        return files.some(f => f.toLowerCase().includes(pattern.toLowerCase()));
      } catch {
        return false;
      }
    }
    return false;
  };

  agents.claudeCode = checkCommand('claude') || fs.existsSync(path.join(os.homedir(), '.claudecode'));
  agents.antigravity = checkCommand('antigravity') || checkCommand('agy') || checkVscodeExtension('antigravity');
  agents.geminiCli = checkCommand('gemini') || checkVscodeExtension('gemini');
  agents.cline = checkCommand('cline') || checkVscodeExtension('claude-dev') || checkVscodeExtension('roo-cline');
  agents.codex = checkCommand('codex') || checkVscodeExtension('codex');
  agents.kilo = checkCommand('kilo') || checkVscodeExtension('kilo');
  agents.opencode = checkCommand('opencode') || checkVscodeExtension('opencode');

  return agents;
}

