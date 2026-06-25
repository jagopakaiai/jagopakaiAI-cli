import { Command } from 'commander';
import { loginCommand } from './commands/login.js';
import { detectCommand } from './commands/detect.js';
import { syncCommand } from './commands/sync.js';
import { initCommand } from './commands/init.js';
import * as p from '@clack/prompts';

const program = new Command();

program
  .name('jagopakaiai-cli')
  .description('JagoPakaiAI Command Line Interface rules synchronizer')
  .version('1.0.0');

program
  .command('login')
  .description('Authenticate with your JagoPakaiAI API Key')
  .action(async () => {
    await loginCommand();
  });

program
  .command('detect')
  .description('Scan current workspace environment and files')
  .action(async () => {
    await detectCommand();
  });

program
  .command('sync')
  .argument('[skill-name]', 'Name/slug of the skill to sync rules for')
  .description('Pull rules for a skill and synchronize in workspace')
  .action(async (skillName) => {
    await syncCommand(skillName);
  });

program
  .command('init')
  .description('Initialize project settings, detect local AI agents, and generate PRD.md')
  .action(async () => {
    await initCommand();
  });

async function showMainMenu() {
  p.intro('JagoPakaiAI CLI Main Menu');
  const choice = await p.select({
    message: 'What would you like to do?',
    options: [
      { value: 'login', label: '🔑 Login (Save API Key)' },
      { value: 'detect', label: '🔍 Detect Workspace & Environment' },
      { value: 'init', label: '🚀 Initialize Project & Generate PRD' },
      { value: 'sync', label: '🔄 Sync Skill Rules' },
      { value: 'exit', label: '❌ Exit' }
    ]
  });

  if (p.isCancel(choice) || choice === 'exit') {
    p.outro('Goodbye!');
    process.exit(0);
  }

  switch (choice) {
    case 'login':
      await loginCommand();
      break;
    case 'detect':
      await detectCommand();
      break;
    case 'init':
      await initCommand();
      break;
    case 'sync':
      await syncCommand(undefined);
      break;
  }
}

if (process.argv.length <= 2) {
  showMainMenu();
} else {
  program.parse(process.argv);
}
