#!/usr/bin/env node
// Post-install: copy plugin files to ~/.oh-my-team and configure Claude Code

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const HOME = os.homedir();
const INSTALL_DIR = path.join(HOME, '.oh-my-team');
const PLUGIN_ROOT = path.resolve(__dirname, '..');
const SETTINGS_FILE = path.join(HOME, '.claude', 'settings.json');
const CONFIG_FILE = path.join(HOME, '.claude.json');

console.log('\n  Oh My Team — Post-install setup\n');

// 1. Copy plugin to ~/.oh-my-team
try {
    if (fs.existsSync(INSTALL_DIR)) {
        fs.rmSync(INSTALL_DIR, { recursive: true });
    }
    fs.cpSync(PLUGIN_ROOT, INSTALL_DIR, { recursive: true });
    // Clean up npm artifacts from the copy
    ['node_modules', 'package.json', 'package-lock.json', '.git'].forEach(f => {
        const p = path.join(INSTALL_DIR, f);
        if (fs.existsSync(p)) fs.rmSync(p, { recursive: true });
    });
    console.log('  [OK] Plugin installed to ~/.oh-my-team');
} catch (e) {
    console.log('  [!] Could not copy plugin files:', e.message);
}

// 2. Enable agent teams in Claude settings
try {
    fs.mkdirSync(path.join(HOME, '.claude'), { recursive: true });
    let settings = {};
    if (fs.existsSync(SETTINGS_FILE)) {
        settings = JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf8'));
    }
    if (!settings.env) settings.env = {};
    if (!settings.env.CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS) {
        settings.env.CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS = '1';
        fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2));
        console.log('  [OK] Agent teams enabled in Claude settings');
    } else {
        console.log('  [OK] Agent teams already enabled');
    }
} catch (e) {
    console.log('  [!] Could not update Claude settings:', e.message);
}

// 3. Set tmux teammate mode
try {
    if (fs.existsSync(CONFIG_FILE)) {
        const config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
        if (!config.teammateMode) {
            config.teammateMode = 'tmux';
            fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
            console.log('  [OK] tmux teammate mode enabled');
        } else {
            console.log('  [OK] Teammate mode already configured');
        }
    }
} catch (e) {
    console.log('  [!] Could not update Claude config:', e.message);
}

console.log('\n  Ready! Run: omt\n');
console.log('  Usage:');
console.log('    omt              Start Oh My Team');
console.log('    omt -d           Start with auto-approve');
console.log('    omt -c           Continue last session');
console.log('');
