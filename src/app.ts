// Element word visualizer application
import { canBeSpelledWithElements } from './element-utils';
import { getElementTypeInfo, ElementType, elementTypeColors, darkenColor, elementToTypeMap } from './element-types';

// Function to generate the legend dynamically
function generateElementTypeLegend(elementPermutations: string[][] | false = false) {
    const legendElement = document.getElementById('element-type-legend');
    if (!legendElement) return;

    const coloredElementsToggle = document.getElementById('colored-elements') as HTMLInputElement;
    
    // Only show legend if there are letters in input AND there are valid permutations
    const shouldShowLegend = elementPermutations && elementPermutations.length > 0 && coloredElementsToggle?.checked;
    legendElement.style.display = shouldShowLegend ? 'block' : 'none';

    // If we shouldn't show the legend, no need to continue
    if (!shouldShowLegend) return;

    // Clear existing legend
    const legendContainer = legendElement.querySelector('.legend-container') as HTMLDivElement;
    if (!legendContainer) return;
    
    legendContainer.innerHTML = '';

    // Get all element types that appear in any permutation
    const usedElementTypes = new Set<ElementType>();
    
    if (elementPermutations && elementPermutations.length > 0) {
        // Get all unique elements from all permutations
        const uniqueElements = [...new Set(
            elementPermutations.flatMap(permutation => 
                permutation.filter(element => element !== '_SPACE_')
            )
        )];
        
        // Convert to element types - include any element that appears in any permutation
        uniqueElements.forEach(element => {
            const elementType = elementToTypeMap[element];
            if (elementType && elementType !== ElementType.UNKNOWN) {
                usedElementTypes.add(elementType);
            }
        });
    }

    // Create a legend item for each element type that appears in any permutation
    Object.entries(ElementType).forEach(([key, typeName]) => {
        // Skip types that don't appear in any permutation
        if (!usedElementTypes.has(typeName as ElementType)) return;
            
        // Skip UNKNOWN types in the legend
        if (key === 'UNKNOWN') return;

        // Get the base color for this element type
        const baseColor = elementTypeColors[typeName as ElementType];
        if (!baseColor) return;

        // Generate border color programmatically
        const borderColor = darkenColor(baseColor, 25);

        // Create the legend item
        const legendItem = document.createElement('div');
        legendItem.className = 'legend-item';

        // Create the color sample
        const colorSample = document.createElement('span');
        colorSample.className = 'legend-color';
        colorSample.style.backgroundColor = baseColor;
        colorSample.style.border = `2px solid ${borderColor}`;

        // Add the text label
        legendItem.appendChild(colorSample);
        legendItem.appendChild(document.createTextNode(typeName));

        // Add to the legend container
        legendContainer.appendChild(legendItem);
    });
}

// Function to modify SVG content to make it responsive and theme-aware
function makeSvgResponsive(svgContent: string, useColoredElements: boolean = false, elementSymbol: string = ''): string {
    let modifiedSvg = svgContent;
    
    if (useColoredElements && elementSymbol) {
        // For colored elements mode, apply the element type coloring directly
        const typeInfo = getElementTypeInfo(elementSymbol);
        
        // Apply the background color to the rectangle and border color to the stroke
        modifiedSvg = modifiedSvg.replace(
            /<rect([^>]*)fill="white"([^>]*)stroke="black"([^>]*)>/,
            `<rect$1fill="${typeInfo.backgroundColor}"$2stroke="${typeInfo.borderColor}"$3>`
        );
        
        // Add the SVG content class without modifying text colors
        modifiedSvg = modifiedSvg.replace(
            /<svg([^>]*)/,
            '<svg$1 class="element-svg-content"'
        );
    } else {
        // For normal theme-aware mode (non-colored)
        modifiedSvg = svgContent
            .replace(/<rect([^>]*)fill="white"/, '<rect$1fill="var(--bg-color)"')
            .replace(/<text([^>]*?)>([^<]*)<\/text>/g, '<text$1 fill="var(--text-color)">$2</text>')
            .replace(/<svg([^>]*)/, '<svg$1 class="element-svg-content"')
            .replace(/stroke="black"/g, 'stroke="var(--text-color)"');
    }
    
    return modifiedSvg;
}

// Function to create a downloadable SVG from a permutation row
function downloadPermutationAsSVG(permutationRow: HTMLElement, word: string, useColoredElements: boolean = false): void {
    // Get all word containers in the permutation row
    const wordContainers = permutationRow.querySelectorAll('.element-word');
    if (!wordContainers.length) return;
    
    // Get computed colors from CSS variables for SVG export
    const computedStyle = getComputedStyle(document.body);
    const bgColor = computedStyle.getPropertyValue('--bg-color').trim();
    const textColor = computedStyle.getPropertyValue('--text-color').trim();
    
    // Get all SVG elements for validation
    const allSvgElements = permutationRow.querySelectorAll('.element-svg-content');
    if (!allSvgElements.length) return;
    
    // Helper function to get original SVG dimensions
    const getOriginalSvgDimensions = (svgElement: SVGSVGElement): { width: number, height: number } => {
        // Parse the SVG content
        const svgString = new XMLSerializer().serializeToString(svgElement);
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgString, 'image/svg+xml');
        const originalSvg = svgDoc.documentElement;
        
        // Try to get width and height from attributes first
        let width = parseFloat(originalSvg.getAttribute('width') || '0');
        let height = parseFloat(originalSvg.getAttribute('height') || '0');
        
        // If not available, try to get from viewBox
        if (width === 0 || height === 0) {
            const viewBox = originalSvg.getAttribute('viewBox');
            if (viewBox) {
                const parts = viewBox.split(/\s+|,/).map(parseFloat);
                if (parts.length === 4) {
                    width = parts[2];
                    height = parts[3];
                }
            }
        }
        
        // Use fallback values if still not available
        if (width === 0) width = 100;
        if (height === 0) height = 100;
        
        return { width, height };
    };
    
    // Calculate dimensions based on the SVG elements
    let totalWidth = 0;
    let maxHeight = 0;
    let wordCount = 0;
    
    // First pass to calculate max height across all elements
    allSvgElements.forEach((svg: Element) => {
        const svgElement = svg as SVGSVGElement;
        const { height } = getOriginalSvgDimensions(svgElement);
        maxHeight = Math.max(maxHeight, height);
    });
    
    // Calculate total width, considering word grouping
    wordContainers.forEach((wordContainer) => {
        const wordSvgElements = wordContainer.querySelectorAll('.element-svg-content');
        if (wordSvgElements.length > 0) {
            wordCount++;
            let wordWidth = 0;
            
            // Calculate width for this word
            wordSvgElements.forEach((svg: Element) => {
                const svgElement = svg as SVGSVGElement;
                const { width } = getOriginalSvgDimensions(svgElement);
                wordWidth += width;
            });
            
            // Add spacing between elements within the word
            wordWidth += (wordSvgElements.length - 1) * 10;
            
            totalWidth += wordWidth;
        }
    });
    
    // Add some padding
    totalWidth += 20;  // 10px padding on each side
    
    // Add extra spacing between words (20px between words)
    if (wordCount > 1) {
        totalWidth += (wordCount - 1) * 20;
    }
    
    // Account for the extra spacing that's added after the last element of each word
    // When positioning elements, we add extra 10px spacing after every element including the last one
    // but that space isn't needed for the last element in each word
    totalWidth += wordCount * 10;
    
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
    
    // Process each word container and its SVG elements
    wordContainers.forEach((wordContainer) => {
        const wordSvgElements = wordContainer.querySelectorAll('.element-svg-content');
        if (wordSvgElements.length === 0) return;
        
        // Create a group for this word
        const wordGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        group.appendChild(wordGroup);
        
        // Starting X position for elements within this word
        const wordStartX = currentX;
        let wordCurrentX = 0;            // Process each SVG element in this word
        wordSvgElements.forEach((svg: Element) => {
            const svgElement = svg as SVGSVGElement;
            const { width, height } = getOriginalSvgDimensions(svgElement);
            
            // Get the element symbol from the data attribute
            const elementSymbol = svgElement.getAttribute('data-element') || '';
            
            // Get the original SVG's XML content
            const svgString = new XMLSerializer().serializeToString(svgElement);
            
            // Parse the original SVG content as a document
            const parser = new DOMParser();
            const svgDoc = parser.parseFromString(svgString, 'image/svg+xml');
            const originalSvg = svgDoc.documentElement;
            
            // Replace CSS variables with computed values in the SVG content
            const replaceVarsInElement = (el: Element, elementSymbol: string = '', useColoredElements: boolean = false) => {
                // For rectangle elements
                if (el.tagName.toLowerCase() === 'rect') {
                    if (useColoredElements && elementSymbol) {
                        // When colored elements are enabled, apply element-specific colors
                        const { backgroundColor, borderColor } = getElementTypeInfo(elementSymbol);
                        el.setAttribute('fill', backgroundColor);
                        el.setAttribute('stroke', borderColor);
                    } else {
                        // Standard theme handling
                        const fillValue = el.getAttribute('fill');
                        if (fillValue?.includes('var(--bg-color)') || fillValue === 'white') {
                            el.setAttribute('fill', computedStyle.backgroundColor);
                        }
                        
                        const strokeValue = el.getAttribute('stroke');
                        if (strokeValue?.includes('var(--text-color)') || strokeValue === 'black') {
                            el.setAttribute('stroke', computedStyle.color);
                        }
                    }
                }
                
                // For text elements - always keep them readable
                if (el.tagName.toLowerCase() === 'text') {
                    // In colored mode, text stays black (default)
                    // In theme mode, apply the text color from the theme
                    if (!useColoredElements && el.hasAttribute('fill')) {
                        const fillValue = el.getAttribute('fill');
                        if (fillValue?.includes('var(--text-color)')) {
                            el.setAttribute('fill', computedStyle.color);
                        }
                    }
                }
                
                // Handle any other elements with stroke attributes
                if (!useColoredElements && el.hasAttribute('stroke') && el.tagName.toLowerCase() !== 'rect') {
                    const strokeValue = el.getAttribute('stroke');
                    if (strokeValue?.includes('var(--text-color)') || strokeValue === 'black') {
                        el.setAttribute('stroke', computedStyle.color);
                    }
                }
                
                // Process children recursively
                Array.from(el.children).forEach(child => {
                    replaceVarsInElement(child, elementSymbol, useColoredElements);
                });
            };
            
            // Extract content from original SVG directly
            // Most element SVGs have their content in a g tag
            let contentElement = originalSvg.querySelector('g');
            
            // Element position within the word group
            const elementX = wordStartX + wordCurrentX;
            
            if (contentElement) {
                // Clone the content element
                const clonedContent = contentElement.cloneNode(true) as Element;
                
                // Apply necessary transformations to position the element
                const currentTransform = clonedContent.getAttribute('transform') || '';
                clonedContent.setAttribute('transform', 
                    `translate(${elementX}, ${(maxHeight - height) / 2}) ${currentTransform}`);
                
                // Replace variables
                replaceVarsInElement(clonedContent, elementSymbol, useColoredElements);
                
                // Add to the word group
                wordGroup.appendChild(clonedContent);
            } else {
                // If no g tag found, create a group for this element
                const newGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
                newGroup.setAttribute('transform', `translate(${elementX}, ${(maxHeight - height) / 2})`);
                
                // Copy all child nodes except the svg tag itself
                Array.from(originalSvg.childNodes).forEach(child => {
                    if (child.nodeType === Node.ELEMENT_NODE && (child as Element).tagName.toLowerCase() !== 'svg') {
                        const importedNode = document.importNode(child, true);
                        if (importedNode.nodeType === Node.ELEMENT_NODE) {
                            replaceVarsInElement(importedNode as Element, elementSymbol, useColoredElements);
                        }
                        newGroup.appendChild(importedNode);
                    }
                });
                
                // Add to the word group
                wordGroup.appendChild(newGroup);
            }
            
            wordCurrentX += width + 10;  // Add spacing between elements within the word
        });
        
        // Move to the next word's starting position (with extra spacing between words)
        currentX += wordCurrentX + 20;  // Add extra space (20px) between words
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

    const coloredElementsToggle = document.getElementById('colored-elements') as HTMLInputElement;
    const useColoredElements = coloredElementsToggle?.checked;
    const fictionalElementsToggle = document.getElementById('fictional-elements') as HTMLInputElement;
    const useFictionalElements = fictionalElementsToggle?.checked;

    // Get share button
    const shareButton = document.getElementById('share-button') as HTMLButtonElement;
    
    // Disable the share button by default
    if (shareButton) {
        shareButton.disabled = true;
    }
    
    if (!word) {
        // If no word, make sure the legend is hidden
        generateElementTypeLegend();
        return;
    }
    
    // Check if the word/phrase can be spelled using element symbols
    const elementPermutations = canBeSpelledWithElements(word, useFictionalElements);
    
    // Update the legend with element permutations
    generateElementTypeLegend(elementPermutations);
    
    if (elementPermutations && elementPermutations.length > 0) {
        // Word/phrase can be spelled with element symbols
        resultDiv.textContent = elementPermutations.length > 1 ? `"${word}" can be spelled in ${elementPermutations.length} different way${elementPermutations.length > 1 ? 's' : ''}` : ``;
        
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
                            // Make SVG responsive - pass the element symbol and the colored option to apply correct colors
                            elementDiv.innerHTML = makeSvgResponsive(result.svgContent, useColoredElements, result.element);
                            
                            // Store the element symbol as a data attribute for download SVG function
                            const svgElement = elementDiv.querySelector('.element-svg-content');
                            if (svgElement) {
                                svgElement.setAttribute('data-element', result.element);
                            }
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
                        downloadPermutationAsSVG(permutationRow, word, useColoredElements);
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
    
    // Set up colored elements toggle
    const coloredElementsToggle = document.getElementById('colored-elements') as HTMLInputElement;
    if (coloredElementsToggle) {
        coloredElementsToggle.addEventListener('change', () => {
            // Re-process the current input with the new setting
            const inputText = wordInput.value.trim();
            if (inputText) {
                processWordInput(inputText, elementContainer, resultDiv);
            }
        });
    }
    
    // Set up fictional elements toggle
    const fictionalElementsToggle = document.getElementById('fictional-elements') as HTMLInputElement;
    if (fictionalElementsToggle) {
        fictionalElementsToggle.addEventListener('change', () => {
            const inputText = wordInput.value.trim();
            if (inputText) {
                processWordInput(inputText, elementContainer, resultDiv);
            }
        });
    }

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
