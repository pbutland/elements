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

// Theme management
function setTheme(theme: 'light' | 'dark'): void {
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('word-form') as HTMLFormElement;
    const wordInput = document.getElementById('word-input') as HTMLInputElement;
    const resultDiv = document.getElementById('result') as HTMLDivElement;
    const elementContainer = document.getElementById('element-container') as HTMLDivElement;
    const themeRadios = document.querySelectorAll('input[name="theme"]') as NodeListOf<HTMLInputElement>;
    
    // Set up theme toggle event listeners
    themeRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            const target = e.target as HTMLInputElement;
            setTheme(target.value as 'light' | 'dark');
        });
    });
    
    // Prevent default form submission but still keep the form for accessibility
    form.addEventListener('submit', (e) => {
        e.preventDefault();
    });
    
    // Process input as user types
    wordInput.addEventListener('input', () => {
        const inputText = wordInput.value.trim();
        
        // Clear previous results
        elementContainer.innerHTML = '';
        resultDiv.textContent = '';
        
        if (!inputText) {
            resultDiv.textContent = 'Please enter a word or phrase';
            return;
        }
        
        // Check if the word/phrase can be spelled using element symbols
        const elementPermutations = canBeSpelledWithElements(inputText);
        
        if (elementPermutations && elementPermutations.length > 0) {
            // Word/phrase can be spelled with element symbols
            resultDiv.textContent = `"${inputText}" can be spelled in ${elementPermutations.length} different way${elementPermutations.length > 1 ? 's' : ''}`;
            
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
                        results.forEach(result => {
                            // Handle space marker
                            if ('isSpace' in result && result.isSpace) {
                                const spacerDiv = document.createElement('div');
                                spacerDiv.className = 'word-spacer';
                                permutationRow.appendChild(spacerDiv);
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
                            
                            permutationRow.appendChild(elementDiv);
                        });
                    });
            });
        } else {
            // Word/phrase cannot be spelled with element symbols
            resultDiv.textContent = `"${inputText}" cannot be spelled using only chemical elements`;
        }
    });
});
