// Element utilities for checking if words can be spelled with element symbols
import { elementToTypeMap } from './element-types';

/**
 * Check if a word or phrase can be spelled using only element symbols
 * @param wordOrPhrase The word or phrase to check
 * @returns false if not possible, or an array of permutations (each permutation is an array of element symbols with special '_SPACE_' marker for word boundaries)
 */
export function canBeSpelledWithElements(wordOrPhrase: string, includeFictionalElements: boolean): string[][] | false {
  // Split the input by spaces to handle multiple words
  const words = wordOrPhrase.split(' ').filter(word => word.length > 0);
  if (words.length === 0) return false;
  
  // If it's just one word, use the original algorithm
  if (words.length === 1) {
    return processWord(words[0], includeFictionalElements);
  }
  
  // Process each word separately
  const wordPermutations: string[][][] = [];
  for (const word of words) {
    const permutations = processWord(word, includeFictionalElements);
    if (!permutations) return false; // If any word can't be spelled, the whole phrase can't be spelled
    wordPermutations.push(permutations);
  }
  
  // Combine permutations from all words with space markers
  return combineWordPermutations(wordPermutations);
}

/**
 * Process a single word to find all possible ways to spell it with elements
 * @param word A single word without spaces
 * @returns false if not possible, or an array of permutations
 */
function processWord(word: string, includeFictionalElements: boolean): string[][] | false {
  word = word.toLowerCase();

  const filteredElements = Object.entries(elementToTypeMap).filter(([symbol, type]) => {
    // Filter out fictional elements if not included
    return includeFictionalElements || type !== 'Fictional';
  }).map(([symbol, type]) => {
    return symbol.toLowerCase();
  }).reduce((set, symbol) => {
    set.add(symbol);
    return set;
  }, new Set<string>()); 

  // Dynamic programming approach to find all possible ways to split the word
  const dp: boolean[] = new Array(word.length + 1).fill(false);
  dp[0] = true; // Empty string can always be formed
  
  // To store all possible decompositions
  // elementPathsAt[i] contains all possible ways to decompose word[0...i-1]
  const elementPathsAt: string[][][] = new Array(word.length + 1);
  elementPathsAt[0] = [[]]; // Empty path for position 0
  
  for (let i = 1; i <= word.length; i++) {
    elementPathsAt[i] = [];
    
    // Try to form word[0...i-1] using element symbols
    for (let j = 1; j <= Math.min(i, 2); j++) {  // Element symbols are at most 2 characters
      const symbol = word.substring(i - j, i);
      
      if (dp[i - j] && filteredElements.has(symbol)) {
        dp[i] = true;
        
        // For each path that leads to position (i-j), append this symbol
        for (const path of elementPathsAt[i - j]) {
          elementPathsAt[i].push([...path, symbol.toLowerCase()]);
        }
      }
    }
  }
  
  return dp[word.length] ? elementPathsAt[word.length] : false;
}

/**
 * Combines permutations from multiple words, adding a space marker between words
 * @param wordPermutations Array of permutations for each word
 * @returns Combined permutations with space markers
 */
function combineWordPermutations(wordPermutations: string[][][]): string[][] {
  // Start with first word's permutations
  let result = wordPermutations[0];
  
  // Combine with each subsequent word
  for (let i = 1; i < wordPermutations.length; i++) {
    const newResult: string[][] = [];
    
    // For each existing permutation...
    for (const existingPath of result) {
      // ...combine with each permutation of the current word
      for (const newPath of wordPermutations[i]) {
        // Add space marker between words
        newResult.push([...existingPath, '_SPACE_', ...newPath]);
      }
    }
    
    result = newResult;
  }
  
  return result;
}
