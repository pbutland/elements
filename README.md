# Element Word Visualizer

A web application that visualizes words spelled using chemical element symbols from the periodic table.

## Overview

The Element Word Visualizer shows if and how a word or phrase can be spelled using only chemical element symbols from the periodic table. For example:
- "science" → Sc + I + En + Ce
- "genius" → Ge + Ni + U + S
- "chocolate" → C + Ho + Co + La + Te

This application finds all possible ways to represent a word using element symbols and displays them using periodic table-style element tiles.

## Features

- **Real-time visualization**: As you type, the application automatically checks and displays results
- **Multiple permutations**: Shows all possible ways to spell a word using element symbols
- **Multi-word support**: Works with phrases and sentences, not just single words
- **Dark/light mode**: Switch between themes for comfortable viewing
- **Responsive design**: Works on desktop and mobile devices
- **SVG element tiles**: High-quality visual representation of chemical elements

## Usage

1. Open the application in your web browser
2. Enter a word or phrase in the input field
3. The application will instantly show if and how it can be spelled using element symbols
4. Toggle between light and dark mode using the radio buttons

## Technical Details

The application uses:

- **TypeScript** for type-safe JavaScript development
- **ES Modules** for modern JavaScript structuring
- **SVG** for high-quality element visualizations
- **Dynamic programming algorithm** to find all possible element symbol combinations
- **Responsive CSS** with custom theming
- **Fetch API** for loading element SVG files asynchronously

## Development

### Prerequisites

- Node.js (v18 or later)
- Yarn (v4.6.0 or later)

### Setup

```bash
# Clone the repository
git clone https://github.com/username/element-words.git
cd element-words

# Install dependencies
yarn install
```

### Development Commands

```bash
# Start development server
yarn start

# Build for production
yarn build
```

### Project Structure

```
/
├── elements/           # SVG files for each chemical element
├── words/              # Example word visualizations
├── src/
│   ├── app.ts          # Main application code
│   └── element-utils.ts # Element symbol utilities
├── dist/               # Compiled output (generated)
├── index.html          # Main HTML file
├── find-element-words.js # Utility script to find words that can be spelled with elements
└── package.json        # Project configuration
```

## Utility Script

The project includes a standalone Node.js script (`find-element-words.js`) that can process a word list file to find words that can be spelled using element symbols:

```bash
# Run the script on a word list
node find-element-words.js path/to/wordlist.txt
```

## Credits

- Periodic table element data from [Periodic Table](https://en.wikipedia.org/wiki/Periodic_table)
- SVG element tiles designed for this project