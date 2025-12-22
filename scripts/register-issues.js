const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ISSUES_FILE = path.join(__dirname, '../docs/github_issues.md');

if (!fs.existsSync(ISSUES_FILE)) {
    console.error(`Error: File not found at ${ISSUES_FILE}`);
    process.exit(1);
}

const content = fs.readFileSync(ISSUES_FILE, 'utf8');

// Parse issues
// The file format has "## Issue X: ..." headers.
const sections = content.split(/^## Issue /m).slice(1); // Skip preamble

console.log(`Found ${sections.length} potential issues.`);

for (const section of sections) {
    const lines = section.trim().split('\n');

    // Extract Title
    // Format: **제목:** [Tag] Title Text
    const titleMatch = section.match(/\*\*제목:\*\*\s*(.*)/);
    if (!titleMatch) {
        console.warn("Could not find title in a section, skipping...");
        continue;
    }
    const title = titleMatch[1].trim();

    // Extract Body
    // Everything after the title line until the end (or next ----)
    // We'll just take the whole section but remove the "Issue N" header and "Title" line.
    let body = section.replace(/^[0-9]+:.*\n+/, '') // Remove "1: Setup..." header leftover from split
        .replace(/\*\*제목:\*\*\s*.*\n+/, '') // Remove title line
        .replace(/---$/, '') // Remove trailing separator
        .trim();

    console.log(`Creating issue: ${title}`);

    try {
        // Use gh CLI to create the issue. 
        // We pass title and body as arguments.
        // execSync handles arguments safely if we wrap them properly or use safe generic escaping, 
        // but passing complex multiline body via shell command line can be tricky on Windows.
        // A better way with 'gh' is: gh issue create --title "..." --body-file - 
        // and pipe the body content to stdin.

        execSync(`gh issue create --title "${title.replace(/"/g, '\\"')}" --body-file -`, {
            input: body,
            stdio: ['pipe', 'inherit', 'inherit'], // Pipe stdin, inherit stdout/stderr
            encoding: 'utf-8'
        });

        console.log("Values submitted successfully.\n");
        // Sleep briefly
        const start = Date.now();
        while (Date.now() - start < 1000) { }

    } catch (e) {
        console.error(`Failed to create issue "${title}":`, e.message);
    }
}
