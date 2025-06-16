// Element type definitions and color schemes for styling element symbols
// Each element is categorized according to standard periodic table groupings
// Colors use a pastel palette with darker borders
// Define element types as an enum for better type safety
export var ElementType;
(function (ElementType) {
    ElementType["ALKALI_METAL"] = "Alkali Metal";
    ElementType["ALKALINE_EARTH"] = "Alkaline Earth";
    ElementType["TRANSITION_METAL"] = "Transition Metal";
    ElementType["BASIC_METAL"] = "Basic Metal";
    ElementType["METALLOID"] = "Metalloid";
    ElementType["NONMETAL"] = "Nonmetal";
    ElementType["HALOGEN"] = "Halogen";
    ElementType["NOBLE_GAS"] = "Noble Gas";
    ElementType["LANTHANIDE"] = "Lanthanide";
    ElementType["ACTINIDE"] = "Actinide";
    ElementType["OTHER"] = "Other";
    ElementType["UNKNOWN"] = "Unknown";
})(ElementType || (ElementType = {}));
/**
 * Creates a darker shade of a given hexadecimal color
 * @param color The hexadecimal color to darken (e.g. '#RRGGBB')
 * @param percent The percentage to darken the color (0-100)
 * @returns A darker hexadecimal color
 */
export function darkenColor(color, percent = 20) {
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
export const elementTypeColors = {
    [ElementType.ALKALI_METAL]: '#FFCDD2',
    [ElementType.ALKALINE_EARTH]: '#FFECB3',
    [ElementType.TRANSITION_METAL]: '#C8E6C9',
    [ElementType.BASIC_METAL]: '#B3E5FC',
    [ElementType.METALLOID]: '#E1BEE7',
    [ElementType.NONMETAL]: '#FDECEB',
    [ElementType.HALOGEN]: '#D1C4E9',
    [ElementType.NOBLE_GAS]: '#BBDEFB',
    [ElementType.LANTHANIDE]: '#FFE0B2',
    [ElementType.ACTINIDE]: '#F8BBD0',
    [ElementType.OTHER]: '#E0E0E0',
    [ElementType.UNKNOWN]: '#E0E0E0'
};
// Map element symbols to their types
export const elementToTypeMap = {
    // Alkali Metals
    'H': ElementType.NONMETAL,
    'Li': ElementType.ALKALI_METAL,
    'Na': ElementType.ALKALI_METAL,
    'K': ElementType.ALKALI_METAL,
    'Rb': ElementType.ALKALI_METAL,
    'Cs': ElementType.ALKALI_METAL,
    'Fr': ElementType.ALKALI_METAL,
    // Alkaline Earth Metals
    'Be': ElementType.ALKALINE_EARTH,
    'Mg': ElementType.ALKALINE_EARTH,
    'Ca': ElementType.ALKALINE_EARTH,
    'Sr': ElementType.ALKALINE_EARTH,
    'Ba': ElementType.ALKALINE_EARTH,
    'Ra': ElementType.ALKALINE_EARTH,
    // Transition Metals
    'Sc': ElementType.TRANSITION_METAL,
    'Ti': ElementType.TRANSITION_METAL,
    'V': ElementType.TRANSITION_METAL,
    'Cr': ElementType.TRANSITION_METAL,
    'Mn': ElementType.TRANSITION_METAL,
    'Fe': ElementType.TRANSITION_METAL,
    'Co': ElementType.TRANSITION_METAL,
    'Ni': ElementType.TRANSITION_METAL,
    'Cu': ElementType.TRANSITION_METAL,
    'Zn': ElementType.TRANSITION_METAL,
    'Y': ElementType.TRANSITION_METAL,
    'Zr': ElementType.TRANSITION_METAL,
    'Nb': ElementType.TRANSITION_METAL,
    'Mo': ElementType.TRANSITION_METAL,
    'Tc': ElementType.TRANSITION_METAL,
    'Ru': ElementType.TRANSITION_METAL,
    'Rh': ElementType.TRANSITION_METAL,
    'Pd': ElementType.TRANSITION_METAL,
    'Ag': ElementType.TRANSITION_METAL,
    'Cd': ElementType.TRANSITION_METAL,
    'Hf': ElementType.TRANSITION_METAL,
    'Ta': ElementType.TRANSITION_METAL,
    'W': ElementType.TRANSITION_METAL,
    'Re': ElementType.TRANSITION_METAL,
    'Os': ElementType.TRANSITION_METAL,
    'Ir': ElementType.TRANSITION_METAL,
    'Pt': ElementType.TRANSITION_METAL,
    'Au': ElementType.TRANSITION_METAL,
    'Hg': ElementType.TRANSITION_METAL,
    'Rf': ElementType.TRANSITION_METAL,
    'Db': ElementType.TRANSITION_METAL,
    'Sg': ElementType.TRANSITION_METAL,
    'Bh': ElementType.TRANSITION_METAL,
    'Hs': ElementType.TRANSITION_METAL,
    'Mt': ElementType.TRANSITION_METAL,
    'Ds': ElementType.TRANSITION_METAL,
    'Rg': ElementType.TRANSITION_METAL,
    // Basic Metals (Post-Transition Metals)
    'Al': ElementType.BASIC_METAL,
    'Ga': ElementType.BASIC_METAL,
    'In': ElementType.BASIC_METAL,
    'Sn': ElementType.BASIC_METAL,
    'Tl': ElementType.BASIC_METAL,
    'Pb': ElementType.BASIC_METAL,
    'Bi': ElementType.BASIC_METAL,
    'Po': ElementType.BASIC_METAL,
    'Cn': ElementType.BASIC_METAL,
    'Nh': ElementType.BASIC_METAL,
    'Fl': ElementType.BASIC_METAL,
    'Mc': ElementType.BASIC_METAL,
    'Lv': ElementType.BASIC_METAL,
    // Metalloids
    'B': ElementType.METALLOID,
    'Si': ElementType.METALLOID,
    'Ge': ElementType.METALLOID,
    'As': ElementType.METALLOID,
    'Sb': ElementType.METALLOID,
    'Te': ElementType.METALLOID,
    'At': ElementType.METALLOID,
    // Nonmetals
    'C': ElementType.NONMETAL,
    'N': ElementType.NONMETAL,
    'O': ElementType.NONMETAL,
    'P': ElementType.NONMETAL,
    'S': ElementType.NONMETAL,
    'Se': ElementType.NONMETAL,
    // Halogens
    'F': ElementType.HALOGEN,
    'Cl': ElementType.HALOGEN,
    'Br': ElementType.HALOGEN,
    'I': ElementType.HALOGEN,
    'Ts': ElementType.HALOGEN,
    // Noble Gases
    'He': ElementType.NOBLE_GAS,
    'Ne': ElementType.NOBLE_GAS,
    'Ar': ElementType.NOBLE_GAS,
    'Kr': ElementType.NOBLE_GAS,
    'Xe': ElementType.NOBLE_GAS,
    'Rn': ElementType.NOBLE_GAS,
    'Og': ElementType.NOBLE_GAS,
    // Lanthanides
    'La': ElementType.LANTHANIDE,
    'Ce': ElementType.LANTHANIDE,
    'Pr': ElementType.LANTHANIDE,
    'Nd': ElementType.LANTHANIDE,
    'Pm': ElementType.LANTHANIDE,
    'Sm': ElementType.LANTHANIDE,
    'Eu': ElementType.LANTHANIDE,
    'Gd': ElementType.LANTHANIDE,
    'Tb': ElementType.LANTHANIDE,
    'Dy': ElementType.LANTHANIDE,
    'Ho': ElementType.LANTHANIDE,
    'Er': ElementType.LANTHANIDE,
    'Tm': ElementType.LANTHANIDE,
    'Yb': ElementType.LANTHANIDE,
    'Lu': ElementType.LANTHANIDE,
    // Actinides
    'Ac': ElementType.ACTINIDE,
    'Th': ElementType.ACTINIDE,
    'Pa': ElementType.ACTINIDE,
    'U': ElementType.ACTINIDE,
    'Np': ElementType.ACTINIDE,
    'Pu': ElementType.ACTINIDE,
    'Am': ElementType.ACTINIDE,
    'Cm': ElementType.ACTINIDE,
    'Bk': ElementType.ACTINIDE,
    'Cf': ElementType.ACTINIDE,
    'Es': ElementType.ACTINIDE,
    'Fm': ElementType.ACTINIDE,
    'Md': ElementType.ACTINIDE,
    'No': ElementType.ACTINIDE,
    'Lr': ElementType.ACTINIDE,
    // Other elements/placeholders
    'E': ElementType.OTHER
};
/**
 * Gets element type information for a given element symbol.
 *
 * @param element The element symbol (case-insensitive)
 * @returns ElementTypeInfo containing type name and color information
 */
export function getElementTypeInfo(element) {
    // Normalize element symbol (capitalize first letter, lowercase the rest)
    const normalizedElement = element.charAt(0).toUpperCase() + element.slice(1).toLowerCase();
    // Get the element type or use UNKNOWN as fallback
    const elementType = elementToTypeMap[normalizedElement] || ElementType.UNKNOWN;
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
