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
