const fs = require('fs');
const path = require('path');

function getMarkdownFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getMarkdownFiles(entryPath)); // Recursively collect files
    } else if (entry.isFile() && /\.(md|mdx)$/.test(entry.name)) {
      files.push(entryPath);
    }
  }

  return files;
}

function extractContent(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf8');

  // Remove YAML frontmatter if it exists
  const contentWithoutFrontmatter = fileContent.replace(
    /^---\n[\s\S]*?\n---\n/, // Matches frontmatter block
    ''
  );

  return contentWithoutFrontmatter.trim(); // Trim extra whitespace
}

// Export the main function so it can be imported elsewhere
function generateContentFile() {
  const pagesDir = path.join(process.cwd(), 'pages');
  const publicDir = path.join(process.cwd(), 'public');
  
  // Ensure public directory exists
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  const markdownFiles = getMarkdownFiles(pagesDir);
  let combinedContent = '';

  markdownFiles.forEach((filePath) => {
    const content = extractContent(filePath);
    combinedContent += `### File: ${filePath}\n\n${content}\n\n`;
  });

  const outputFilePath = path.join(process.cwd(), 'public', 'content.txt');
  fs.writeFileSync(outputFilePath, combinedContent, 'utf8');
  console.log(`Generated content file at: ${outputFilePath}`);
}

// Only run directly if this script is executed directly
if (require.main === module) {
  generateContentFile();
}

module.exports = generateContentFile;