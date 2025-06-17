// Element type definitions and color schemes for styling element symbols
// Each element is categorized according to standard periodic table groupings
// Colors use a pastel palette with darker borders

// Define element types as an enum for better type safety
export enum ElementType {
    ALKALI_METAL = 'Alkali Metal',
    ALKALINE_EARTH = 'Alkaline Earth',
    TRANSITION_METAL = 'Transition Metal',
    BASIC_METAL = 'Basic Metal',
    METALLOID = 'Metalloid',
    NONMETAL = 'Nonmetal',
    HALOGEN = 'Halogen',
    NOBLE_GAS = 'Noble Gas',
    LANTHANIDE = 'Lanthanide',
    ACTINIDE = 'Actinide',
    FICTIONAL = 'Fictional',
    UNKNOWN = 'Unknown'
}

/**
 * Creates a darker shade of a given hexadecimal color
 * @param color The hexadecimal color to darken (e.g. '#RRGGBB')
 * @param percent The percentage to darken the color (0-100)
 * @returns A darker hexadecimal color
 */
export function darkenColor(color: string, percent: number = 20): string {
    // Remove the hash if it exists
    color = color.replace('#', '');
    
    // Parse the hex values
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);
    
    // Calculate the darker shade by reducing the RGB values
    const darkenAmount = 1 - (percent / 100);
    const dr = Math.max(0, Math.floor(r * darkenAmount));
    const dg = Math.max(0, Math.floor(g * darkenAmount));
    const db = Math.max(0, Math.floor(b * darkenAmount));
    
    // Convert back to hex
    return `#${dr.toString(16).padStart(2, '0')}${dg.toString(16).padStart(2, '0')}${db.toString(16).padStart(2, '0')}`;
}

// Map element types to their base colors
export const elementTypeColors: Record<ElementType, string> = {
    [ElementType.ALKALI_METAL]: '#f8ab91',
    [ElementType.ALKALINE_EARTH]: '#fed091',
    [ElementType.TRANSITION_METAL]: '#f8f29a',
    [ElementType.BASIC_METAL]: '#a9d69a',
    [ElementType.METALLOID]: '#a8dee6',
    [ElementType.NONMETAL]: '#a1add7',
    [ElementType.HALOGEN]: '#af9bca',
    [ElementType.NOBLE_GAS]: '#cc9fc9',
    [ElementType.LANTHANIDE]: '#ea9dc4',
    [ElementType.ACTINIDE]: '#e0a9cd',
    [ElementType.FICTIONAL]: '#8dcfff',
    [ElementType.UNKNOWN]: '#E0E0E0'
};

// Map element symbols to their types
export const elementToTypeMap: Record<string, ElementType> = {
    // Alkali Metals
    'h': ElementType.NONMETAL,
    'li': ElementType.ALKALI_METAL,
    'na': ElementType.ALKALI_METAL,
    'k': ElementType.ALKALI_METAL,
    'rb': ElementType.ALKALI_METAL,
    'cs': ElementType.ALKALI_METAL,
    'fr': ElementType.ALKALI_METAL,
    
    // Alkaline Earth Metals
    'be': ElementType.ALKALINE_EARTH,
    'mg': ElementType.ALKALINE_EARTH,
    'ca': ElementType.ALKALINE_EARTH,
    'sr': ElementType.ALKALINE_EARTH,
    'ba': ElementType.ALKALINE_EARTH,
    'ra': ElementType.ALKALINE_EARTH,
    
    // Transition Metals
    'sc': ElementType.TRANSITION_METAL,
    'ti': ElementType.TRANSITION_METAL,
    'v': ElementType.TRANSITION_METAL,
    'cr': ElementType.TRANSITION_METAL,
    'mn': ElementType.TRANSITION_METAL,
    'fe': ElementType.TRANSITION_METAL,
    'co': ElementType.TRANSITION_METAL,
    'ni': ElementType.TRANSITION_METAL,
    'cu': ElementType.TRANSITION_METAL,
    'zn': ElementType.TRANSITION_METAL,
    'y': ElementType.TRANSITION_METAL,
    'zr': ElementType.TRANSITION_METAL,
    'nb': ElementType.TRANSITION_METAL,
    'mo': ElementType.TRANSITION_METAL,
    'tc': ElementType.TRANSITION_METAL,
    'ru': ElementType.TRANSITION_METAL,
    'rh': ElementType.TRANSITION_METAL,
    'pd': ElementType.TRANSITION_METAL,
    'ag': ElementType.TRANSITION_METAL,
    'cd': ElementType.TRANSITION_METAL,
    'hf': ElementType.TRANSITION_METAL,
    'ta': ElementType.TRANSITION_METAL,
    'w': ElementType.TRANSITION_METAL,
    're': ElementType.TRANSITION_METAL,
    'os': ElementType.TRANSITION_METAL,
    'ir': ElementType.TRANSITION_METAL,
    'pt': ElementType.TRANSITION_METAL,
    'au': ElementType.TRANSITION_METAL,
    'hg': ElementType.TRANSITION_METAL,
    'rf': ElementType.TRANSITION_METAL,
    'db': ElementType.TRANSITION_METAL,
    'sg': ElementType.TRANSITION_METAL,
    'bh': ElementType.TRANSITION_METAL,
    'hs': ElementType.TRANSITION_METAL,
    'mt': ElementType.TRANSITION_METAL,
    'ds': ElementType.TRANSITION_METAL,
    'rg': ElementType.TRANSITION_METAL,
    
    // Basic Metals (Post-Transition Metals)
    'al': ElementType.BASIC_METAL,
    'ga': ElementType.BASIC_METAL,
    'in': ElementType.BASIC_METAL,
    'sn': ElementType.BASIC_METAL,
    'tl': ElementType.BASIC_METAL,
    'pb': ElementType.BASIC_METAL,
    'bi': ElementType.BASIC_METAL,
    'po': ElementType.BASIC_METAL,
    'cn': ElementType.BASIC_METAL,
    'nh': ElementType.BASIC_METAL,
    'fl': ElementType.BASIC_METAL,
    'mc': ElementType.BASIC_METAL,
    'lv': ElementType.BASIC_METAL,
    
    // Metalloids
    'b': ElementType.METALLOID,
    'si': ElementType.METALLOID,
    'ge': ElementType.METALLOID,
    'as': ElementType.METALLOID,
    'sb': ElementType.METALLOID,
    'te': ElementType.METALLOID,
    'at': ElementType.METALLOID,
    
    // Nonmetals
    'c': ElementType.NONMETAL,
    'n': ElementType.NONMETAL,
    'o': ElementType.NONMETAL,
    'p': ElementType.NONMETAL,
    's': ElementType.NONMETAL,
    'se': ElementType.NONMETAL,
    
    // Halogens
    'f': ElementType.HALOGEN,
    'cl': ElementType.HALOGEN,
    'br': ElementType.HALOGEN,
    'i': ElementType.HALOGEN,
    'ts': ElementType.HALOGEN,
    
    // Noble Gases
    'he': ElementType.NOBLE_GAS,
    'ne': ElementType.NOBLE_GAS,
    'ar': ElementType.NOBLE_GAS,
    'kr': ElementType.NOBLE_GAS,
    'xe': ElementType.NOBLE_GAS,
    'rn': ElementType.NOBLE_GAS,
    'og': ElementType.NOBLE_GAS,
    
    // Lanthanides
    'la': ElementType.LANTHANIDE,
    'ce': ElementType.LANTHANIDE,
    'pr': ElementType.LANTHANIDE,
    'nd': ElementType.LANTHANIDE,
    'pm': ElementType.LANTHANIDE,
    'sm': ElementType.LANTHANIDE,
    'eu': ElementType.LANTHANIDE,
    'gd': ElementType.LANTHANIDE,
    'tb': ElementType.LANTHANIDE,
    'dy': ElementType.LANTHANIDE,
    'ho': ElementType.LANTHANIDE,
    'er': ElementType.LANTHANIDE,
    'tm': ElementType.LANTHANIDE,
    'yb': ElementType.LANTHANIDE,
    'lu': ElementType.LANTHANIDE,
    
    // Actinides
    'ac': ElementType.ACTINIDE,
    'th': ElementType.ACTINIDE,
    'pa': ElementType.ACTINIDE,
    'u': ElementType.ACTINIDE,
    'np': ElementType.ACTINIDE,
    'pu': ElementType.ACTINIDE,
    'am': ElementType.ACTINIDE,
    'cm': ElementType.ACTINIDE,
    'bk': ElementType.ACTINIDE,
    'cf': ElementType.ACTINIDE,
    'e': ElementType.ACTINIDE,
    'es': ElementType.ACTINIDE,
    'fm': ElementType.ACTINIDE,
    'md': ElementType.ACTINIDE,
    'no': ElementType.ACTINIDE,
    'lr': ElementType.ACTINIDE,

    // Isotopes
    'd': ElementType.NONMETAL, // Deuterium (Hydrogen isotope)
    't': ElementType.NONMETAL, // Tritium (Hydrogen isotope)
    'tn': ElementType.NOBLE_GAS, // Thoron (Radon isotope)

    // Fictional Elements for missing letters
    'a': ElementType.FICTIONAL, // Adamantium - Fictional super-strong metal from Marvel comics
    'az': ElementType.FICTIONAL, // Azbantium - Fictional mineral from Doctor Who which is 400 times harder than diamond
    'da': ElementType.FICTIONAL, // Dalekanium - Fictional metal from Doctor Who, used in Dalek construction
    'di': ElementType.FICTIONAL, // Dilithium - Fictional crystal used in Star Trek for warp drives
    'g': ElementType.FICTIONAL, // Gravitonium - Fictional element from Marvel's Agents of S.H.I.E.L.D.
    'j': ElementType.FICTIONAL, // Jeddium - Named after Jedi from Star Wars
    'ju': ElementType.FICTIONAL, // Jumbonium - Fictional element from Futurama
    'l': ElementType.FICTIONAL, // Latinum - Precious material from Star Trek
    'm': ElementType.FICTIONAL, // Mithril - Fictional metal from Lord of the Rings
    'oc': ElementType.FICTIONAL, // Octiron - Fictional element from Discworld
    'q': ElementType.FICTIONAL, // Quirium - From Elite universe, an artificial element used as a fuel
    'r': ElementType.FICTIONAL, // Rhodinium - From Star Trek universe, a rare metallic element
    'ub': ElementType.FICTIONAL, // Unobtainium - A substance with the exact properties needed for a piece of hardware or other item of use, but not obtainable
    'ur': ElementType.FICTIONAL, // Uridium - Fictional metal named in the 1986 computer game Uridium
    'x': ElementType.FICTIONAL, // Xonium - Based on X-Men
    'z': ElementType.FICTIONAL, // Zexonyte - In the video game Earthbound, a material that is harvested from meteorites
};

// Interface for element type info (for backwards compatibility)
export interface ElementTypeInfo {
    type: string;
    backgroundColor: string;
    borderColor: string;
}

/**
 * Gets element type information for a given element symbol.
 * 
 * @param element The element symbol
 * @returns ElementTypeInfo containing type name and color information
 */
export function getElementTypeInfo(element: string): ElementTypeInfo {
    // Get the element type or use UNKNOWN as fallback
    const elementType = elementToTypeMap[element] || ElementType.UNKNOWN;
    
    // Get the base color for this element type
    const baseColor = elementTypeColors[elementType];
    
    // Generate a darker border color from the base color
    const borderColor = darkenColor(baseColor, 25);
    
    // Return in the ElementTypeInfo format for backwards compatibility
    return { 
        type: elementType,
        backgroundColor: baseColor,
        borderColor: borderColor
    };
}
