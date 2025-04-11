# Readme Generator

The `readme-generator` project is a Node.js tool designed to automate the creation of `README.md` files for your projects. It analyzes the structure of a given directory, identifies key files and subdirectories, and generates a comprehensive `README.md` file. This tool can optionally leverage the Gemini AI model to enhance the generated content with more detailed descriptions and explanations.

## Key Features

- **Automated README Generation:** Automatically creates a `README.md` file based on the project's directory structure.
- **AI-Powered Enhancement:** Integrates with the Gemini AI model to provide richer, more informative README content.
- **Customizable Ignore List:** Allows you to specify directories and files to exclude from the analysis.
- **Command-Line Interface:** Simple command-line usage for easy integration into your workflow.

## Project Structure

```
readme-generator/
├── config/
│   └── config.js
├── lib/
│   ├── ai/
│   │   └── gemini.js
│   ├── analyzers/
│   │   └── structureAnalyzer.js
│   └── utils/
│       └── fileUtils.js
├── index.js
├── package-lock.json
└── package.json
```

- **`config/config.js`:** Configuration file for the project, including the Gemini API key and directories to ignore.
- **`lib/ai/gemini.js`:** Handles the integration with the Gemini AI model for content enhancement.
- **`lib/analyzers/structureAnalyzer.js`:** Analyzes the directory structure of the project.
- **`lib/utils/fileUtils.js`:** Provides utility functions for file system operations.
- **`index.js`:** Main entry point of the application.
- **`package.json`:** Lists project dependencies and metadata.

## Technologies Used

- **Node.js:** JavaScript runtime environment.
- **@google/generative-ai:** Google's generative AI API for content creation.
- **dotenv:** Loads environment variables from a `.env` file.

## Environment Variables

- **`GEMINI_API_KEY`:** The API key for accessing the Gemini AI model. This is required to enable AI-powered content enhancement. You can set this in your `.env` file or as an environment variable.
- **SIGNIFICANT_FILES_LIMIT:** Specifies the maximum number of significant files to consider for AI enhancement.

## Getting Started

### Prerequisites

- Node.js (>=18.0.0)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/anmol-k14/ai-based-readme-generator.git
   cd readme-generator
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

3. Configure the environment:

   - Create a `.env` file in the root directory.
   - Add your Gemini API key to the `.env` file:

     ```
     GEMINI_API_KEY=YOUR_GEMINI_API_KEY
     ```

### Usage

Run the `readme-generator` from the command line:

```bash
node index.js <directory>
```

Replace `<directory>` with the path to the project directory for which you want to generate a `README.md` file. If no directory is specified, the current working directory will be used.

## Configuration

The `config/config.js` file allows you to customize the behavior of the `readme-generator`.

- **`IGNORE_DIRS`:** An array of directory names to ignore during the analysis.
- **`GEMINI_API_KEY`:** The API key for the Gemini AI model.
- **`SIGNIFICANT_FILES_LIMIT`:**  Specifies the maximum number of significant files to consider for AI enhancement.

## Contributing

Contributions are welcome! Please submit a pull request with your proposed changes.