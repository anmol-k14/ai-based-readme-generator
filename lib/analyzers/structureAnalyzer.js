const path = require('path');
const { readdir, stat } = require('../utils/fileUtils');
const fs = require('fs').promises;  // Use fs.promises for reading files
const config = require('../../config/config');

// Analyze the project directory structure
async function analyzeStructure(dir, relativePath = '', depth = 0, maxDepth = 10) {
  if (depth > maxDepth) return [];
  
  const items = await readdir(dir);
  const structure = [];
  
  for (const item of items) {
    // Skip if the item is '.env' file
    if (item === '.env' || item.toLowerCase() === 'readme.md' || config.IGNORE_DIRS.includes(item)) continue;
    
    const itemPath = path.join(dir, item);
    const itemStat = await stat(itemPath);
    const itemRelativePath = relativePath ? path.join(relativePath, item) : item;
    
    if (itemStat.isDirectory()) {
      const children = await analyzeStructure(itemPath, itemRelativePath, depth + 1, maxDepth);
      structure.push({
        name: item,
        path: itemRelativePath,
        type: 'directory',
        children
      });
    } else {
      // Read content of file when it's a file type (except .env)
      const content = await fs.readFile(itemPath, 'utf-8').catch(() => ''); // Handle case where file might be unreadable

      structure.push({
        name: item,
        path: itemRelativePath,
        type: 'file',
        extension: path.extname(item),
        content  // Store the file content
      });
    }
  }
  
  return structure;
}

module.exports = {
  analyzeStructure
};
