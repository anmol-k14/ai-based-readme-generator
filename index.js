const path = require('path');
const { writeFile, readdir } = require('./lib/utils/fileUtils');
const { initializeGemini, enhanceWithAI } = require('./lib/ai/gemini');
const { analyzeStructure } = require('./lib/analyzers/structureAnalyzer');

// Main function to generate README
async function generateReadme(rootDir) {
  console.log('Starting README generation for:', rootDir);
  
  // Initialize Gemini AI
  const isAIEnabled = initializeGemini();
  
  // Project structure to be filled
  const project = {
    name: path.basename(rootDir),
    structure: []
  };

  // Analyze project structure
  project.structure = await analyzeStructure(rootDir);
  // Generate README content
  if (isAIEnabled) {
    readmeContent= await enhanceWithAI(project, rootDir);
  }
  // Write README.md file
  const readmePath = path.join(rootDir, 'README.md');
  await writeFile(readmePath, readmeContent);
  console.log(`README.md has been created at: ${readmePath}`);
}

// Run the script from the command line
if (require.main === module) {
  const rootDir = process.argv[2] || process.cwd();
  generateReadme(rootDir)
    .then(() => console.log('README generation complete!'))
    .catch(err => console.error('Error generating README:', err));
}

module.exports = { generateReadme };