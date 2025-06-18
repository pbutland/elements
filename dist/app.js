// src/element-types.ts
var ElementType = /* @__PURE__ */ ((ElementType2) => {
  ElementType2["ALKALI_METAL"] = "Alkali Metal";
  ElementType2["ALKALINE_EARTH"] = "Alkaline Earth";
  ElementType2["TRANSITION_METAL"] = "Transition Metal";
  ElementType2["BASIC_METAL"] = "Basic Metal";
  ElementType2["METALLOID"] = "Metalloid";
  ElementType2["NONMETAL"] = "Nonmetal";
  ElementType2["HALOGEN"] = "Halogen";
  ElementType2["NOBLE_GAS"] = "Noble Gas";
  ElementType2["LANTHANIDE"] = "Lanthanide";
  ElementType2["ACTINIDE"] = "Actinide";
  ElementType2["FICTIONAL"] = "Fictional";
  ElementType2["UNKNOWN"] = "Unknown";
  return ElementType2;
})(ElementType || {});
function darkenColor(color, percent = 20) {
  color = color.replace("#", "");
  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);
  const darkenAmount = 1 - percent / 100;
  const dr = Math.max(0, Math.floor(r * darkenAmount));
  const dg = Math.max(0, Math.floor(g * darkenAmount));
  const db = Math.max(0, Math.floor(b * darkenAmount));
  return `#${dr.toString(16).padStart(2, "0")}${dg.toString(16).padStart(2, "0")}${db.toString(16).padStart(2, "0")}`;
}
var elementTypeColors = {
  ["Alkali Metal" /* ALKALI_METAL */]: "#f8ab91",
  ["Alkaline Earth" /* ALKALINE_EARTH */]: "#fed091",
  ["Transition Metal" /* TRANSITION_METAL */]: "#f8f29a",
  ["Basic Metal" /* BASIC_METAL */]: "#a9d69a",
  ["Metalloid" /* METALLOID */]: "#a8dee6",
  ["Nonmetal" /* NONMETAL */]: "#a1add7",
  ["Halogen" /* HALOGEN */]: "#af9bca",
  ["Noble Gas" /* NOBLE_GAS */]: "#cc9fc9",
  ["Lanthanide" /* LANTHANIDE */]: "#ea9dc4",
  ["Actinide" /* ACTINIDE */]: "#e0a9cd",
  ["Fictional" /* FICTIONAL */]: "#8dcfff",
  ["Unknown" /* UNKNOWN */]: "#E0E0E0"
};
var elementToTypeMap = {
  // Alkali Metals
  "h": "Nonmetal" /* NONMETAL */,
  "li": "Alkali Metal" /* ALKALI_METAL */,
  "na": "Alkali Metal" /* ALKALI_METAL */,
  "k": "Alkali Metal" /* ALKALI_METAL */,
  "rb": "Alkali Metal" /* ALKALI_METAL */,
  "cs": "Alkali Metal" /* ALKALI_METAL */,
  "fr": "Alkali Metal" /* ALKALI_METAL */,
  // Alkaline Earth Metals
  "be": "Alkaline Earth" /* ALKALINE_EARTH */,
  "mg": "Alkaline Earth" /* ALKALINE_EARTH */,
  "ca": "Alkaline Earth" /* ALKALINE_EARTH */,
  "sr": "Alkaline Earth" /* ALKALINE_EARTH */,
  "ba": "Alkaline Earth" /* ALKALINE_EARTH */,
  "ra": "Alkaline Earth" /* ALKALINE_EARTH */,
  // Transition Metals
  "sc": "Transition Metal" /* TRANSITION_METAL */,
  "ti": "Transition Metal" /* TRANSITION_METAL */,
  "v": "Transition Metal" /* TRANSITION_METAL */,
  "cr": "Transition Metal" /* TRANSITION_METAL */,
  "mn": "Transition Metal" /* TRANSITION_METAL */,
  "fe": "Transition Metal" /* TRANSITION_METAL */,
  "co": "Transition Metal" /* TRANSITION_METAL */,
  "ni": "Transition Metal" /* TRANSITION_METAL */,
  "cu": "Transition Metal" /* TRANSITION_METAL */,
  "zn": "Transition Metal" /* TRANSITION_METAL */,
  "y": "Transition Metal" /* TRANSITION_METAL */,
  "zr": "Transition Metal" /* TRANSITION_METAL */,
  "nb": "Transition Metal" /* TRANSITION_METAL */,
  "mo": "Transition Metal" /* TRANSITION_METAL */,
  "tc": "Transition Metal" /* TRANSITION_METAL */,
  "ru": "Transition Metal" /* TRANSITION_METAL */,
  "rh": "Transition Metal" /* TRANSITION_METAL */,
  "pd": "Transition Metal" /* TRANSITION_METAL */,
  "ag": "Transition Metal" /* TRANSITION_METAL */,
  "cd": "Transition Metal" /* TRANSITION_METAL */,
  "hf": "Transition Metal" /* TRANSITION_METAL */,
  "ta": "Transition Metal" /* TRANSITION_METAL */,
  "w": "Transition Metal" /* TRANSITION_METAL */,
  "re": "Transition Metal" /* TRANSITION_METAL */,
  "os": "Transition Metal" /* TRANSITION_METAL */,
  "ir": "Transition Metal" /* TRANSITION_METAL */,
  "pt": "Transition Metal" /* TRANSITION_METAL */,
  "au": "Transition Metal" /* TRANSITION_METAL */,
  "hg": "Transition Metal" /* TRANSITION_METAL */,
  "rf": "Transition Metal" /* TRANSITION_METAL */,
  "db": "Transition Metal" /* TRANSITION_METAL */,
  "sg": "Transition Metal" /* TRANSITION_METAL */,
  "bh": "Transition Metal" /* TRANSITION_METAL */,
  "hs": "Transition Metal" /* TRANSITION_METAL */,
  "mt": "Transition Metal" /* TRANSITION_METAL */,
  "ds": "Transition Metal" /* TRANSITION_METAL */,
  "rg": "Transition Metal" /* TRANSITION_METAL */,
  // Basic Metals (Post-Transition Metals)
  "al": "Basic Metal" /* BASIC_METAL */,
  "ga": "Basic Metal" /* BASIC_METAL */,
  "in": "Basic Metal" /* BASIC_METAL */,
  "sn": "Basic Metal" /* BASIC_METAL */,
  "tl": "Basic Metal" /* BASIC_METAL */,
  "pb": "Basic Metal" /* BASIC_METAL */,
  "bi": "Basic Metal" /* BASIC_METAL */,
  "po": "Basic Metal" /* BASIC_METAL */,
  "cn": "Basic Metal" /* BASIC_METAL */,
  "nh": "Basic Metal" /* BASIC_METAL */,
  "fl": "Basic Metal" /* BASIC_METAL */,
  "mc": "Basic Metal" /* BASIC_METAL */,
  "lv": "Basic Metal" /* BASIC_METAL */,
  // Metalloids
  "b": "Metalloid" /* METALLOID */,
  "si": "Metalloid" /* METALLOID */,
  "ge": "Metalloid" /* METALLOID */,
  "as": "Metalloid" /* METALLOID */,
  "sb": "Metalloid" /* METALLOID */,
  "te": "Metalloid" /* METALLOID */,
  "at": "Metalloid" /* METALLOID */,
  // Nonmetals
  "c": "Nonmetal" /* NONMETAL */,
  "n": "Nonmetal" /* NONMETAL */,
  "o": "Nonmetal" /* NONMETAL */,
  "p": "Nonmetal" /* NONMETAL */,
  "s": "Nonmetal" /* NONMETAL */,
  "se": "Nonmetal" /* NONMETAL */,
  // Halogens
  "f": "Halogen" /* HALOGEN */,
  "cl": "Halogen" /* HALOGEN */,
  "br": "Halogen" /* HALOGEN */,
  "i": "Halogen" /* HALOGEN */,
  "ts": "Halogen" /* HALOGEN */,
  // Noble Gases
  "he": "Noble Gas" /* NOBLE_GAS */,
  "ne": "Noble Gas" /* NOBLE_GAS */,
  "ar": "Noble Gas" /* NOBLE_GAS */,
  "kr": "Noble Gas" /* NOBLE_GAS */,
  "xe": "Noble Gas" /* NOBLE_GAS */,
  "rn": "Noble Gas" /* NOBLE_GAS */,
  "og": "Noble Gas" /* NOBLE_GAS */,
  // Lanthanides
  "la": "Lanthanide" /* LANTHANIDE */,
  "ce": "Lanthanide" /* LANTHANIDE */,
  "pr": "Lanthanide" /* LANTHANIDE */,
  "nd": "Lanthanide" /* LANTHANIDE */,
  "pm": "Lanthanide" /* LANTHANIDE */,
  "sm": "Lanthanide" /* LANTHANIDE */,
  "eu": "Lanthanide" /* LANTHANIDE */,
  "gd": "Lanthanide" /* LANTHANIDE */,
  "tb": "Lanthanide" /* LANTHANIDE */,
  "dy": "Lanthanide" /* LANTHANIDE */,
  "ho": "Lanthanide" /* LANTHANIDE */,
  "er": "Lanthanide" /* LANTHANIDE */,
  "tm": "Lanthanide" /* LANTHANIDE */,
  "yb": "Lanthanide" /* LANTHANIDE */,
  "lu": "Lanthanide" /* LANTHANIDE */,
  // Actinides
  "ac": "Actinide" /* ACTINIDE */,
  "th": "Actinide" /* ACTINIDE */,
  "pa": "Actinide" /* ACTINIDE */,
  "u": "Actinide" /* ACTINIDE */,
  "np": "Actinide" /* ACTINIDE */,
  "pu": "Actinide" /* ACTINIDE */,
  "am": "Actinide" /* ACTINIDE */,
  "cm": "Actinide" /* ACTINIDE */,
  "bk": "Actinide" /* ACTINIDE */,
  "cf": "Actinide" /* ACTINIDE */,
  "e": "Actinide" /* ACTINIDE */,
  "es": "Actinide" /* ACTINIDE */,
  "fm": "Actinide" /* ACTINIDE */,
  "md": "Actinide" /* ACTINIDE */,
  "no": "Actinide" /* ACTINIDE */,
  "lr": "Actinide" /* ACTINIDE */,
  // Isotopes
  "d": "Nonmetal" /* NONMETAL */,
  // Deuterium (Hydrogen isotope)
  "t": "Nonmetal" /* NONMETAL */,
  // Tritium (Hydrogen isotope)
  "tn": "Noble Gas" /* NOBLE_GAS */,
  // Thoron (Radon isotope)
  // Fictional Elements for missing letters
  "a": "Fictional" /* FICTIONAL */,
  // Adamantium - Fictional super-strong metal from Marvel comics
  "az": "Fictional" /* FICTIONAL */,
  // Azbantium - Fictional mineral from Doctor Who which is 400 times harder than diamond
  "da": "Fictional" /* FICTIONAL */,
  // Dalekanium - Fictional metal from Doctor Who, used in Dalek construction
  "di": "Fictional" /* FICTIONAL */,
  // Dilithium - Fictional crystal used in Star Trek for warp drives
  "fn": "Fictional" /* FICTIONAL */,
  // Feminum - Indestructible metal that forms Wonder Woman's bracelets
  "g": "Fictional" /* FICTIONAL */,
  // Gravitonium - Fictional element from Marvel's Agents of S.H.I.E.L.D.
  "j": "Fictional" /* FICTIONAL */,
  // Jedite - Named after Jedi from Star Wars
  "ju": "Fictional" /* FICTIONAL */,
  // Jumbonium - Fictional element from Futurama
  "l": "Fictional" /* FICTIONAL */,
  // Latinum - Precious material from Star Trek
  "m": "Fictional" /* FICTIONAL */,
  // Mithril - Fictional metal from Lord of the Rings
  "oc": "Fictional" /* FICTIONAL */,
  // Octiron - Fictional element from Discworld
  "q": "Fictional" /* FICTIONAL */,
  // Quirium - From Elite universe, an artificial element used as a fuel
  "r": "Fictional" /* FICTIONAL */,
  // Rhodinium - From Star Trek universe, a rare metallic element
  "ub": "Fictional" /* FICTIONAL */,
  // Unobtainium - A substance with the exact properties needed for a piece of hardware or other item of use, but not obtainable
  "ur": "Fictional" /* FICTIONAL */,
  // Uridium - Fictional metal named in the 1986 computer game Uridium
  "x": "Fictional" /* FICTIONAL */,
  // Xonium - Based on X-Men
  "z": "Fictional" /* FICTIONAL */
  // Zexonyte - In the video game Earthbound, a material that is harvested from meteorites
};
function getElementTypeInfo(element) {
  const elementType = elementToTypeMap[element] || "Unknown" /* UNKNOWN */;
  const baseColor = elementTypeColors[elementType];
  const borderColor = darkenColor(baseColor, 25);
  return {
    type: elementType,
    backgroundColor: baseColor,
    borderColor
  };
}

// src/element-utils.ts
function canBeSpelledWithElements(wordOrPhrase, includeFictionalElements) {
  const words = wordOrPhrase.split(" ").filter((word) => word.length > 0);
  if (words.length === 0) return false;
  if (words.length === 1) {
    return processWord(words[0], includeFictionalElements);
  }
  const wordPermutations = [];
  for (const word of words) {
    const permutations = processWord(word, includeFictionalElements);
    if (!permutations) return false;
    wordPermutations.push(permutations);
  }
  return combineWordPermutations(wordPermutations);
}
function processWord(word, includeFictionalElements) {
  word = word.toLowerCase();
  const filteredElements = Object.entries(elementToTypeMap).filter(([symbol, type]) => {
    return includeFictionalElements || type !== "Fictional";
  }).map(([symbol, type]) => {
    return symbol.toLowerCase();
  }).reduce((set, symbol) => {
    set.add(symbol);
    return set;
  }, /* @__PURE__ */ new Set());
  const dp = new Array(word.length + 1).fill(false);
  dp[0] = true;
  const elementPathsAt = new Array(word.length + 1);
  elementPathsAt[0] = [[]];
  for (let i = 1; i <= word.length; i++) {
    elementPathsAt[i] = [];
    for (let j = 1; j <= Math.min(i, 2); j++) {
      const symbol = word.substring(i - j, i);
      if (dp[i - j] && filteredElements.has(symbol)) {
        dp[i] = true;
        for (const path of elementPathsAt[i - j]) {
          elementPathsAt[i].push([...path, symbol.toLowerCase()]);
        }
      }
    }
  }
  return dp[word.length] ? elementPathsAt[word.length] : false;
}
function combineWordPermutations(wordPermutations) {
  let result = wordPermutations[0];
  for (let i = 1; i < wordPermutations.length; i++) {
    const newResult = [];
    for (const existingPath of result) {
      for (const newPath of wordPermutations[i]) {
        newResult.push([...existingPath, "_SPACE_", ...newPath]);
      }
    }
    result = newResult;
  }
  return result;
}

// src/app.ts
function generateElementTypeLegend(elementPermutations = false) {
  const legendElement = document.getElementById("element-type-legend");
  if (!legendElement) return;
  const coloredElementsToggle = document.getElementById("colored-elements");
  const shouldShowLegend = elementPermutations && elementPermutations.length > 0 && coloredElementsToggle?.checked;
  legendElement.style.display = shouldShowLegend ? "block" : "none";
  if (!shouldShowLegend) return;
  const legendContainer = legendElement.querySelector(".legend-container");
  if (!legendContainer) return;
  legendContainer.innerHTML = "";
  const usedElementTypes = /* @__PURE__ */ new Set();
  if (elementPermutations && elementPermutations.length > 0) {
    const uniqueElements = [...new Set(
      elementPermutations.flatMap(
        (permutation) => permutation.filter((element) => element !== "_SPACE_")
      )
    )];
    uniqueElements.forEach((element) => {
      const elementType = elementToTypeMap[element];
      if (elementType && elementType !== "Unknown" /* UNKNOWN */) {
        usedElementTypes.add(elementType);
      }
    });
  }
  Object.entries(ElementType).forEach(([key, typeName]) => {
    if (!usedElementTypes.has(typeName)) return;
    if (key === "UNKNOWN") return;
    const baseColor = elementTypeColors[typeName];
    if (!baseColor) return;
    const borderColor = darkenColor(baseColor, 25);
    const legendItem = document.createElement("div");
    legendItem.className = "legend-item";
    const colorSample = document.createElement("span");
    colorSample.className = "legend-color";
    colorSample.style.backgroundColor = baseColor;
    colorSample.style.border = `2px solid ${borderColor}`;
    legendItem.appendChild(colorSample);
    legendItem.appendChild(document.createTextNode(typeName));
    legendContainer.appendChild(legendItem);
  });
}
function makeSvgResponsive(svgContent, useColoredElements = false, elementSymbol = "") {
  let modifiedSvg = svgContent;
  if (useColoredElements && elementSymbol) {
    const typeInfo = getElementTypeInfo(elementSymbol);
    modifiedSvg = modifiedSvg.replace(
      /<rect([^>]*)fill="transparent"([^>]*)stroke="black"([^>]*)>/,
      `<rect$1fill="${typeInfo.backgroundColor}"$2stroke="${typeInfo.borderColor}"$3>`
    );
    modifiedSvg = modifiedSvg.replace(
      /<svg([^>]*)/,
      '<svg$1 class="element-svg-content"'
    );
  } else {
    modifiedSvg = svgContent.replace(/<svg([^>]*)/, '<svg$1 class="element-svg-content"').replace(/stroke="black"/g, 'stroke="var(--text-color)"').replace(/fill="black"/g, 'fill="var(--text-color)"');
  }
  return modifiedSvg;
}
function downloadPermutationAsSVG(permutationRow, word, useColoredElements = false) {
  const wordContainers = permutationRow.querySelectorAll(".element-word");
  if (!wordContainers.length) return;
  const computedStyle = getComputedStyle(document.body);
  const bgColor = computedStyle.getPropertyValue("--bg-color").trim();
  const textColor = computedStyle.getPropertyValue("--text-color").trim();
  const allSvgElements = permutationRow.querySelectorAll(".element-svg-content");
  if (!allSvgElements.length) return;
  const getOriginalSvgDimensions = (svgElement) => {
    const svgString = new XMLSerializer().serializeToString(svgElement);
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgString, "image/svg+xml");
    const originalSvg = svgDoc.documentElement;
    let width = parseFloat(originalSvg.getAttribute("width") || "0");
    let height = parseFloat(originalSvg.getAttribute("height") || "0");
    if (width === 0 || height === 0) {
      const viewBox = originalSvg.getAttribute("viewBox");
      if (viewBox) {
        const parts = viewBox.split(/\s+|,/).map(parseFloat);
        if (parts.length === 4) {
          width = parts[2];
          height = parts[3];
        }
      }
    }
    if (width === 0) width = 100;
    if (height === 0) height = 100;
    return { width, height };
  };
  let totalWidth = 0;
  let maxHeight = 0;
  let wordCount = 0;
  allSvgElements.forEach((svg) => {
    const svgElement = svg;
    const { height } = getOriginalSvgDimensions(svgElement);
    maxHeight = Math.max(maxHeight, height);
  });
  wordContainers.forEach((wordContainer) => {
    const wordSvgElements = wordContainer.querySelectorAll(".element-svg-content");
    if (wordSvgElements.length > 0) {
      wordCount++;
      let wordWidth = 0;
      wordSvgElements.forEach((svg) => {
        const svgElement = svg;
        const { width } = getOriginalSvgDimensions(svgElement);
        wordWidth += width;
      });
      wordWidth += (wordSvgElements.length - 1) * 10;
      totalWidth += wordWidth;
    }
  });
  totalWidth += 20;
  if (wordCount > 1) {
    totalWidth += (wordCount - 1) * 20;
  }
  totalWidth += (wordCount - 1) * 10;
  maxHeight += 20;
  const combinedSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  combinedSvg.setAttribute("width", totalWidth.toString());
  combinedSvg.setAttribute("height", maxHeight.toString());
  combinedSvg.setAttribute("viewBox", `0 0 ${totalWidth} ${maxHeight}`);
  combinedSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  const bgRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  bgRect.setAttribute("width", "100%");
  bgRect.setAttribute("height", "100%");
  bgRect.setAttribute("fill", computedStyle.backgroundColor);
  combinedSvg.appendChild(bgRect);
  const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
  let currentX = 10;
  wordContainers.forEach((wordContainer) => {
    const wordSvgElements = wordContainer.querySelectorAll(".element-svg-content");
    if (wordSvgElements.length === 0) return;
    const wordGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.appendChild(wordGroup);
    const wordStartX = currentX;
    let wordCurrentX = 0;
    wordSvgElements.forEach((svg) => {
      const svgElement = svg;
      const { width, height } = getOriginalSvgDimensions(svgElement);
      const elementSymbol = svgElement.getAttribute("data-element") || "";
      const svgString = new XMLSerializer().serializeToString(svgElement);
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(svgString, "image/svg+xml");
      const originalSvg = svgDoc.documentElement;
      const replaceVarsInElement = (el, elementSymbol2 = "", useColoredElements2 = false) => {
        if (el.tagName.toLowerCase() === "rect") {
          if (useColoredElements2 && elementSymbol2) {
            const { backgroundColor, borderColor } = getElementTypeInfo(elementSymbol2);
            el.setAttribute("fill", backgroundColor);
            el.setAttribute("stroke", borderColor);
          } else {
            const fillValue = el.getAttribute("fill");
            if (fillValue?.includes("var(--bg-color)") || fillValue === "white") {
              el.setAttribute("fill", computedStyle.backgroundColor);
            }
            const strokeValue = el.getAttribute("stroke");
            if (strokeValue?.includes("var(--text-color)") || strokeValue === "black") {
              el.setAttribute("stroke", computedStyle.color);
            }
          }
        }
        if (el.tagName.toLowerCase() === "text") {
          if (!useColoredElements2 && el.hasAttribute("fill")) {
            const fillValue = el.getAttribute("fill");
            if (fillValue?.includes("var(--text-color)")) {
              el.setAttribute("fill", computedStyle.color);
            }
          }
        }
        if (!useColoredElements2 && el.hasAttribute("stroke") && el.tagName.toLowerCase() !== "rect") {
          const strokeValue = el.getAttribute("stroke");
          if (strokeValue?.includes("var(--text-color)") || strokeValue === "black") {
            el.setAttribute("stroke", computedStyle.color);
          }
        }
        Array.from(el.children).forEach((child) => {
          replaceVarsInElement(child, elementSymbol2, useColoredElements2);
        });
      };
      let contentElement = originalSvg.querySelector("g");
      const elementX = wordStartX + wordCurrentX;
      if (contentElement) {
        const clonedContent = contentElement.cloneNode(true);
        const currentTransform = clonedContent.getAttribute("transform") || "";
        clonedContent.setAttribute(
          "transform",
          `translate(${elementX}, ${(maxHeight - height) / 2}) ${currentTransform}`
        );
        replaceVarsInElement(clonedContent, elementSymbol, useColoredElements);
        wordGroup.appendChild(clonedContent);
      } else {
        const newGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
        newGroup.setAttribute("transform", `translate(${elementX}, ${(maxHeight - height) / 2})`);
        Array.from(originalSvg.childNodes).forEach((child) => {
          if (child.nodeType === Node.ELEMENT_NODE && child.tagName.toLowerCase() !== "svg") {
            const importedNode = document.importNode(child, true);
            if (importedNode.nodeType === Node.ELEMENT_NODE) {
              replaceVarsInElement(importedNode, elementSymbol, useColoredElements);
            }
            newGroup.appendChild(importedNode);
          }
        });
        wordGroup.appendChild(newGroup);
      }
      wordCurrentX += width + 10;
    });
    currentX += wordCurrentX + 20;
  });
  combinedSvg.appendChild(group);
  const svgData = new XMLSerializer().serializeToString(combinedSvg);
  const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
  const svgUrl = URL.createObjectURL(svgBlob);
  const downloadLink = document.createElement("a");
  downloadLink.href = svgUrl;
  downloadLink.download = `${word.replace(/\s+/g, "-")}-elements.svg`;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
  setTimeout(() => {
    URL.revokeObjectURL(svgUrl);
  }, 100);
}
function shareUrl(word) {
  const url = new URL(window.location.href);
  url.search = new URLSearchParams({ word }).toString();
  navigator.clipboard.writeText(url.toString()).then(() => {
    const toast = document.getElementById("toast");
    if (toast) {
      toast.classList.add("show");
      setTimeout(() => {
        toast.classList.remove("show");
      }, 3e3);
    }
  }).catch((err) => {
    console.error("Failed to copy URL: ", err);
    alert("Failed to copy the share link to clipboard.");
  });
}
function setTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
}
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}
function processWordInput(word, elementContainer, resultDiv) {
  elementContainer.innerHTML = "";
  resultDiv.textContent = "";
  const coloredElementsToggle = document.getElementById("colored-elements");
  const useColoredElements = coloredElementsToggle?.checked;
  const fictionalElementsToggle = document.getElementById("fictional-elements");
  const useFictionalElements = fictionalElementsToggle?.checked;
  const shareButton = document.getElementById("share-button");
  if (shareButton) {
    shareButton.disabled = true;
  }
  if (!word) {
    generateElementTypeLegend();
    return;
  }
  const elementPermutations = canBeSpelledWithElements(word, useFictionalElements);
  generateElementTypeLegend(elementPermutations);
  if (elementPermutations && elementPermutations.length > 0) {
    resultDiv.textContent = elementPermutations.length > 1 ? `"${word}" can be spelled in ${elementPermutations.length} different way${elementPermutations.length > 1 ? "s" : ""}` : ``;
    if (shareButton) {
      shareButton.disabled = false;
    }
    const svgCache = {};
    elementPermutations.forEach((elementPath, permutationIndex) => {
      const permutationRow = document.createElement("div");
      permutationRow.className = "permutation-row";
      elementContainer.appendChild(permutationRow);
      const loadPromises = elementPath.map((element) => {
        if (element === "_SPACE_") {
          return Promise.resolve({
            element: "_SPACE_",
            isSpace: true
          });
        }
        if (svgCache[element]) {
          return Promise.resolve({
            element,
            svgContent: svgCache[element]
          });
        }
        return fetch(`./elements/${element.toLowerCase()}.svg`).then((response) => {
          if (!response.ok) {
            throw new Error(`SVG for ${element} not found`);
          }
          return response.text();
        }).then((svgContent) => {
          svgCache[element] = svgContent;
          return {
            element,
            svgContent
          };
        }).catch((error) => {
          console.error(error);
          return {
            element,
            error: true
          };
        });
      });
      Promise.all(loadPromises).then((results) => {
        let currentWord = document.createElement("div");
        currentWord.className = "element-word";
        permutationRow.appendChild(currentWord);
        results.forEach((result) => {
          if ("isSpace" in result && result.isSpace) {
            currentWord = document.createElement("div");
            currentWord.className = "element-word";
            permutationRow.appendChild(currentWord);
            return;
          }
          const elementDiv = document.createElement("div");
          elementDiv.className = "element-svg";
          if ("error" in result && result.error) {
            elementDiv.textContent = `Error loading ${result.element}`;
          } else if ("svgContent" in result) {
            elementDiv.innerHTML = makeSvgResponsive(result.svgContent, useColoredElements, result.element);
            const svgElement = elementDiv.querySelector(".element-svg-content");
            if (svgElement) {
              svgElement.setAttribute("data-element", result.element);
            }
          }
          currentWord.appendChild(elementDiv);
        });
        const downloadButton = document.createElement("button");
        downloadButton.className = "download-svg-button";
        downloadButton.title = "Download SVG";
        downloadButton.innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                        </svg>
                    `;
        permutationRow.appendChild(downloadButton);
        downloadButton.addEventListener("click", () => {
          downloadPermutationAsSVG(permutationRow, word, useColoredElements);
        });
      });
    });
  } else {
    resultDiv.textContent = `"${word}" cannot be spelled using only chemical elements`;
    if (shareButton) {
      shareButton.disabled = true;
    }
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("word-form");
  const wordInput = document.getElementById("word-input");
  const resultDiv = document.getElementById("result");
  const elementContainer = document.getElementById("element-container");
  const themeRadios = document.querySelectorAll('input[name="theme"]');
  const shareButton = document.getElementById("share-button");
  const wordFromParam = getQueryParam("word");
  themeRadios.forEach((radio) => {
    radio.addEventListener("change", (e) => {
      const target = e.target;
      setTheme(target.value);
    });
  });
  const coloredElementsToggle = document.getElementById("colored-elements");
  if (coloredElementsToggle) {
    coloredElementsToggle.addEventListener("change", () => {
      const inputText = wordInput.value.trim();
      if (inputText) {
        processWordInput(inputText, elementContainer, resultDiv);
      }
    });
  }
  const fictionalElementsToggle = document.getElementById("fictional-elements");
  if (fictionalElementsToggle) {
    fictionalElementsToggle.addEventListener("change", () => {
      const inputText = wordInput.value.trim();
      if (inputText) {
        processWordInput(inputText, elementContainer, resultDiv);
      }
    });
  }
  shareButton.addEventListener("click", () => {
    if (!shareButton.disabled) {
      const inputText = wordInput.value.trim();
      if (inputText) {
        shareUrl(inputText);
      }
    }
  });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });
  wordInput.addEventListener("input", () => {
    const inputText = wordInput.value.trim();
    processWordInput(inputText, elementContainer, resultDiv);
  });
  if (wordFromParam) {
    wordInput.value = wordFromParam;
    processWordInput(wordFromParam, elementContainer, resultDiv);
  } else {
    shareButton.disabled = true;
  }
});
//# sourceMappingURL=app.js.map
