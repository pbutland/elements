// Element word visualizer application
import { canBeSpelledWithElements } from './element-utils';

// Function to modify SVG content to make it responsive and theme-aware
function makeSvgResponsive(svgContent: string): string {
    return svgContent
        .replace(/<rect([^>]*)fill="white"/, '<rect$1fill="var(--bg-color)"')
        .replace(/<text([^>]*?)>([^<]*)<\/text>/g, '<text$1 fill="var(--text-color)">$2</text>')
        .replace(/<svg([^>]*)/, '<svg$1 class="element-svg-content"')
        .replace(/stroke="black"/g, 'stroke="var(--text-color)"');
}

// Function to create a shareable URL and copy to clipboard
function shareUrl(word: string): void {
    // Create URL with the current word as a parameter
    const url = new URL(window.location.href);
    url.search = new URLSearchParams({ word }).toString();
    
    // Copy to clipboard
    navigator.clipboard.writeText(url.toString())
        .then(() => {
            // Show toast notification
            const toast = document.getElementById('toast');
            if (toast) {
                toast.classList.add('show');
                
                // Hide toast after 3 seconds
                setTimeout(() => {
                    toast.classList.remove('show');
                }, 3000);
            }
        })
        .catch(err => {
            console.error('Failed to copy URL: ', err);
            alert('Failed to copy the share link to clipboard.');
        });
}

// Theme management
function setTheme(theme: 'light' | 'dark'): void {
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

// Function to get URL query parameters
function getQueryParam(param: string): string | null {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Function to process word input
function processWordInput(word: string, elementContainer: HTMLElement, resultDiv: HTMLElement): void {
    // Clear previous results
    elementContainer.innerHTML = '';
    resultDiv.textContent = '';
    
    // Get share button
    const shareButton = document.getElementById('share-button') as HTMLButtonElement;
    
    // Disable the share button by default
    if (shareButton) {
        shareButton.disabled = true;
    }
    
    if (!word) {
        return;
    }
    
    // Check if the word/phrase can be spelled using element symbols
    const elementPermutations = canBeSpelledWithElements(word);
    
    if (elementPermutations && elementPermutations.length > 0) {
        // Word/phrase can be spelled with element symbols
        resultDiv.textContent = `"${word}" can be spelled in ${elementPermutations.length} different way${elementPermutations.length > 1 ? 's' : ''}`;
        
        // Enable the share button if the word can be spelled
        if (shareButton) {
            shareButton.disabled = false;
        }
        
        // Create a map to cache SVGs so we don't reload them for each permutation
        const svgCache: Record<string, string> = {};
        
        // Process each permutation
        elementPermutations.forEach((elementPath, permutationIndex) => {
            // Create a container for this permutation
            const permutationRow = document.createElement('div');
            permutationRow.className = 'permutation-row';
            
            elementContainer.appendChild(permutationRow);
            
            // Define the result type to handle different cases
            type ElementResult = 
                | { element: string; isSpace: true; }
                | { element: string; svgContent: string; }
                | { element: string; error: true; };
                
            // Array to store promises for this permutation's SVG loads
            const loadPromises = elementPath.map(element => {
                // Skip processing for space markers - will be handled later
                if (element === '_SPACE_') {
                    return Promise.resolve({
                        element: '_SPACE_',
                        isSpace: true as const
                    });
                }
                
                // Use cached SVG if available
                if (svgCache[element]) {
                    return Promise.resolve({
                        element,
                        svgContent: svgCache[element]
                    });
                }
                
                // Otherwise, fetch the SVG
                return fetch(`./elements/${element.toLowerCase()}.svg`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`SVG for ${element} not found`);
                        }
                        return response.text();
                    })
                    .then(svgContent => {
                        // Cache the SVG
                        svgCache[element] = svgContent;
                        return {
                            element,
                            svgContent
                        };
                    })
                    .catch(error => {
                        console.error(error);
                        return {
                            element,
                            error: true as const
                        };
                    });
            });
            
            // When all SVGs for this permutation are loaded, add them to the container in the correct order
            Promise.all(loadPromises)
                .then((results: ElementResult[]) => {
                    // Group elements into words
                    let currentWord = document.createElement('div');
                    currentWord.className = 'element-word';
                    permutationRow.appendChild(currentWord);
                    
                    // Track all word spacers in this permutation
                    const spacers: HTMLElement[] = [];
                    
                    // Track spaces between words
                    let inWord = true;
                    
                    results.forEach(result => {
                        // Handle space marker - create a new word container
                        if ('isSpace' in result && result.isSpace) {
                            const spacerDiv = document.createElement('div');
                            spacerDiv.className = 'word-spacer';
                            permutationRow.appendChild(spacerDiv);
                            spacers.push(spacerDiv);
                            
                            // Start a new word container after the spacer
                            currentWord = document.createElement('div');
                            currentWord.className = 'element-word';
                            permutationRow.appendChild(currentWord);
                            inWord = true; // Mark that we're starting a new word
                            return;
                        }
                        
                        const elementDiv = document.createElement('div');
                        elementDiv.className = 'element-svg';
                        
                        if ('error' in result && result.error) {
                            elementDiv.textContent = `Error loading ${result.element}`;
                        } else if ('svgContent' in result) {
                            // Make SVG responsive
                            elementDiv.innerHTML = makeSvgResponsive(result.svgContent);
                        }
                        
                        // Add the element to the current word container
                        currentWord.appendChild(elementDiv);
                    });
                    
                    // Function to check spacer visibility based on word wrapping
                    const updateSpacerVisibility = () => {
                        spacers.forEach(spacer => {
                            const prevWord = spacer.previousElementSibling as HTMLElement;
                            const nextWord = spacer.nextElementSibling as HTMLElement;
                            
                            if (prevWord && nextWord) {
                                const prevRect = prevWord.getBoundingClientRect();
                                const nextRect = nextWord.getBoundingClientRect();
                                
                                // If words are not on the same line, hide the spacer
                                if (Math.abs(prevRect.top - nextRect.top) > 10) {
                                    spacer.classList.add('word-spacer-hidden');
                                } else {
                                    spacer.classList.remove('word-spacer-hidden');
                                }
                            }
                        });
                    };
                    
                    // Check initially after rendering and on window resize
                    setTimeout(updateSpacerVisibility, 10);
                    window.addEventListener('resize', updateSpacerVisibility);
                });
        });
    } else {
        // Word/phrase cannot be spelled with element symbols
        resultDiv.textContent = `"${word}" cannot be spelled using only chemical elements`;
        
        // Keep share button disabled since the word can't be spelled
        if (shareButton) {
            shareButton.disabled = true;
        }
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('word-form') as HTMLFormElement;
    const wordInput = document.getElementById('word-input') as HTMLInputElement;
    const resultDiv = document.getElementById('result') as HTMLDivElement;
    const elementContainer = document.getElementById('element-container') as HTMLDivElement;
    const themeRadios = document.querySelectorAll('input[name="theme"]') as NodeListOf<HTMLInputElement>;
    const shareButton = document.getElementById('share-button') as HTMLButtonElement;
    
    // Check for query parameter 'word'
    const wordFromParam = getQueryParam('word');
    
    // Set up theme toggle event listeners
    themeRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            const target = e.target as HTMLInputElement;
            setTheme(target.value as 'light' | 'dark');
        });
    });
    
    // Set up share button click handler
    shareButton.addEventListener('click', () => {
        // Only proceed if button is not disabled
        if (!shareButton.disabled) {
            const inputText = wordInput.value.trim();
            if (inputText) {
                shareUrl(inputText);
            }
        }
    });
    
    // Prevent default form submission but still keep the form for accessibility
    form.addEventListener('submit', (e) => {
        e.preventDefault();
    });
    
    // Process input as user types
    wordInput.addEventListener('input', () => {
        const inputText = wordInput.value.trim();
        processWordInput(inputText, elementContainer, resultDiv);
    });
    
    // If there's a word parameter in the URL, use it to auto-populate input field
    if (wordFromParam) {
        wordInput.value = wordFromParam;
        processWordInput(wordFromParam, elementContainer, resultDiv);
    } else {
        // Ensure share button is disabled initially
        shareButton.disabled = true;
    }
});
