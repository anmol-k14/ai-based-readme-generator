const IGNORE_DIRS = ['node_modules', '.git', 'dist', 'build', 'coverage'];
const dotenv= require('dotenv')
dotenv.config();

module.exports = {
  IGNORE_DIRS,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  SIGNIFICANT_FILES_LIMIT: 10
};