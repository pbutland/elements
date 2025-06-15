#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/*
 * Searches a words file and outputs any words that can be represented by element symbols
 */

// Check if a file path is provided as an argument
if (process.argv.length < 3) {
  console.error('Please provide a file path containing words to check');
  console.error('Example: node element-words.js words.txt');
  process.exit(1);
}

// Get all valid element symbols from the periodic table with correct capitalization
const elements = [
  'H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne', 
  'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar', 'K', 'Ca', 
  'Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn', 
  'Ga', 'Ge', 'As', 'Se', 'Br', 'Kr', 'Rb', 'Sr', 'Y', 'Zr', 
  'Nb', 'Mo', 'Tc', 'Ru', 'Rh', 'Pd', 'Ag', 'Cd', 'In', 'Sn', 
  'Sb', 'Te', 'I', 'Xe', 'Cs', 'Ba', 'La', 'Ce', 'Pr', 'Nd', 
  'Pm', 'Sm', 'Eu', 'Gd', 'Tb', 'Dy', 'Ho', 'Er', 'Tm', 'Yb', 
  'Lu', 'Hf', 'Ta', 'W', 'Re', 'Os', 'Ir', 'Pt', 'Au', 'Hg', 
  'Tl', 'Pb', 'Bi', 'Po', 'At', 'Rn', 'Fr', 'Ra', 'Ac', 'Th', 
  'Pa', 'U', 'Np', 'Pu', 'Am', 'Cm', 'Bk', 'Cf', 'Es', 'Fm', 
  'Md', 'No', 'Lr', 'Rf', 'Db', 'Sg', 'Bh', 'Hs', 'Mt', 'Ds', 
  'Rg', 'Cn', 'Nh', 'Fl', 'Mc', 'Lv', 'Ts', 'Og'
];

// Create case-insensitive element set for comparisons
const elementSetLower = new Set(elements.map(e => e.toLowerCase()));

// Elements map with correct capitalization for output
const elementMap = {};
elements.forEach(e => {
  elementMap[e.toLowerCase()] = e;
});

// Function to check if a word can be spelled using only element symbols
// Returns: false if not possible, or an array of element symbols if possible
function canBeSpelledWithElements(word) {
  word = word.toLowerCase();
  
  // Dynamic programming approach to find if word can be split into valid element symbols
  const dp = new Array(word.length + 1).fill(false);
  dp[0] = true; // Empty string can always be formed
  
  // To store the decomposition
  const elementPaths = new Array(word.length + 1);
  elementPaths[0] = []; // Empty path for position 0
  
  for (let i = 1; i <= word.length; i++) {
    // Try to form word[0...i-1] using element symbols
    for (let j = 1; j <= Math.min(i, 2); j++) {  // Element symbols are at most 2 letters
      const symbol = word.substring(i - j, i);
      if (dp[i - j] && elementSetLower.has(symbol)) {
        dp[i] = true;
        // Store the element path for this position
        elementPaths[i] = [...elementPaths[i - j], elementMap[symbol]];
        break;
      }
    }
  }
  
  return dp[word.length] ? elementPaths[word.length] : false;
}

// Read the input file
const filePath = process.argv[2];

try {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const words = fileContent.split('\n').filter(word => word.trim() !== '');
  
  const totalWords = words.length;
  let processed = 0;
  const percentStep = Math.max(1, Math.floor(totalWords / 100));
  
  for (const word of words) {
    processed++;
    
    // Check if the word can be spelled using element symbols
    const elementPath = canBeSpelledWithElements(word);
    if (elementPath) {
      console.log(`${word}: ${elementPath.join(' ')}`);
    }
  }
  
} catch (error) {
  console.error(`Error processing file: ${error.message}`);
  process.exit(1);
}
