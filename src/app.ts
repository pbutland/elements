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

// Function to create a downloadable SVG from a permutation row
function downloadPermutationAsSVG(permutationRow: HTMLElement, word: string): void {
    // Get all SVG elements in the permutation row
    const svgElements = permutationRow.querySelectorAll('.element-svg-content');
    if (!svgElements.length) return;
    
    // Get computed colors from CSS variables for SVG export
    const computedStyle = getComputedStyle(document.body);
    const bgColor = computedStyle.getPropertyValue('--bg-color').trim();
    const textColor = computedStyle.getPropertyValue('--text-color').trim();
    
    // Calculate dimensions based on the SVG elements
    let totalWidth = 0;
    let maxHeight = 0;
    
    // Calculate total width and maximum height
    svgElements.forEach((svg) => {
        const svgElement = svg as SVGSVGElement;
        totalWidth += svgElement.getBoundingClientRect().width;
        maxHeight = Math.max(maxHeight, svgElement.getBoundingClientRect().height);
    });
    
    // Add some padding
    totalWidth += (svgElements.length - 1) * 10;  // 10px spacing between elements
    totalWidth += 20;  // 10px padding on each side
    maxHeight += 20;   // 10px padding on top and bottom
    
    // Start creating the combined SVG
    const combinedSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    combinedSvg.setAttribute('width', totalWidth.toString());
    combinedSvg.setAttribute('height', maxHeight.toString());
    combinedSvg.setAttribute('viewBox', `0 0 ${totalWidth} ${maxHeight}`);
    combinedSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    
    // Set background color based on current theme (using actual RGB color instead of variable)
    const bgRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bgRect.setAttribute('width', '100%');
    bgRect.setAttribute('height', '100%');
    bgRect.setAttribute('fill', computedStyle.backgroundColor);
    combinedSvg.appendChild(bgRect);
    
    // Group to hold all the elements
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    
    // Current X position for placing elements
    let currentX = 10;  // Start with 10px padding
    
    // Process each SVG element
    svgElements.forEach((svg) => {
        const svgElement = svg as SVGSVGElement;
        const width = svgElement.getBoundingClientRect().width;
        const height = svgElement.getBoundingClientRect().height;
        
        // Instead of extracting content, generate a new SVG for each element
        // Get the original SVG's XML content
        const svgString = new XMLSerializer().serializeToString(svgElement);
        
        // Create a new SVG from scratch with proper positioning
        const elementSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        elementSvg.setAttribute('width', width.toString());
        elementSvg.setAttribute('height', height.toString());
        elementSvg.setAttribute('x', currentX.toString());
        elementSvg.setAttribute('y', ((maxHeight - height) / 2).toString());
        
        // Parse the original SVG content as a document
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgString, 'image/svg+xml');
        const originalSvg = svgDoc.documentElement;
        
        // Get the viewBox from the original SVG to preserve aspect ratio and positioning
        if (originalSvg.hasAttribute('viewBox')) {
            elementSvg.setAttribute('viewBox', originalSvg.getAttribute('viewBox')!);
        }
        
        // Replace CSS variables with computed values in the SVG content
        const replaceVarsInElement = (el: Element) => {
            // Handle text elements
            if (el.tagName.toLowerCase() === 'text' && el.hasAttribute('fill')) {
                const fillValue = el.getAttribute('fill');
                if (fillValue?.includes('var(--')) {
                    el.setAttribute('fill', computedStyle.color);
                }
            }
            
            // Handle rect elements
            if (el.tagName.toLowerCase() === 'rect' && el.hasAttribute('fill')) {
                const fillValue = el.getAttribute('fill');
                if (fillValue?.includes('var(--')) {
                    if (fillValue?.includes('--bg-color')) {
                        el.setAttribute('fill', computedStyle.backgroundColor);
                    }
                }
            }
            
            // Handle stroke attributes on any element
            if (el.hasAttribute('stroke')) {
                const strokeValue = el.getAttribute('stroke');
                if (strokeValue?.includes('var(--')) {
                    el.setAttribute('stroke', computedStyle.color);
                }
            }
            
            // Process children recursively
            Array.from(el.children).forEach(child => {
                replaceVarsInElement(child);
            });
        };
        
        // Import and copy all child nodes from the original SVG
        // This preserves their original positions
        Array.from(originalSvg.childNodes).forEach(child => {
            const importedNode = document.importNode(child, true);
            if (importedNode.nodeType === Node.ELEMENT_NODE) {
                replaceVarsInElement(importedNode as Element);
            }
            elementSvg.appendChild(importedNode);
        });
        
        group.appendChild(elementSvg);
        currentX += width + 10;  // Add spacing
    });
    
    combinedSvg.appendChild(group);
    
    // Convert SVG to a data URI
    const svgData = new XMLSerializer().serializeToString(combinedSvg);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);
    
    // Create a download link
    const downloadLink = document.createElement('a');
    downloadLink.href = svgUrl;
    downloadLink.download = `${word.replace(/\s+/g, '-')}-elements.svg`;
    
    // Trigger download
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    
    // Clean up the URL object
    setTimeout(() => {
        URL.revokeObjectURL(svgUrl);
    }, 100);
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
                    
                    results.forEach(result => {
                        // Handle space marker - create a new word container
                        if ('isSpace' in result && result.isSpace) {
                            currentWord = document.createElement('div');
                            currentWord.className = 'element-word';
                            permutationRow.appendChild(currentWord);
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
                    
                    // Add download button for this permutation
                    const downloadButton = document.createElement('button');
                    downloadButton.className = 'download-svg-button';
                    downloadButton.title = 'Download SVG';
                    downloadButton.innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                        </svg>
                    `;
                    permutationRow.appendChild(downloadButton);
                    
                    // Set up download button click handler
                    downloadButton.addEventListener('click', () => {
                        downloadPermutationAsSVG(permutationRow, word);
                    });
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
