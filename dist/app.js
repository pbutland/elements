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
  ElementType2["OTHER"] = "Other";
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
  ["Alkali Metal" /* ALKALI_METAL */]: "#FFCDD2",
  ["Alkaline Earth" /* ALKALINE_EARTH */]: "#FFECB3",
  ["Transition Metal" /* TRANSITION_METAL */]: "#C8E6C9",
  ["Basic Metal" /* BASIC_METAL */]: "#B3E5FC",
  ["Metalloid" /* METALLOID */]: "#E1BEE7",
  ["Nonmetal" /* NONMETAL */]: "#FDECEB",
  ["Halogen" /* HALOGEN */]: "#D1C4E9",
  ["Noble Gas" /* NOBLE_GAS */]: "#BBDEFB",
  ["Lanthanide" /* LANTHANIDE */]: "#FFE0B2",
  ["Actinide" /* ACTINIDE */]: "#F8BBD0",
  ["Other" /* OTHER */]: "#E0E0E0",
  ["Unknown" /* UNKNOWN */]: "#E0E0E0"
};
var elementToTypeMap = {
  // Alkali Metals
  "H": "Nonmetal" /* NONMETAL */,
  "Li": "Alkali Metal" /* ALKALI_METAL */,
  "Na": "Alkali Metal" /* ALKALI_METAL */,
  "K": "Alkali Metal" /* ALKALI_METAL */,
  "Rb": "Alkali Metal" /* ALKALI_METAL */,
  "Cs": "Alkali Metal" /* ALKALI_METAL */,
  "Fr": "Alkali Metal" /* ALKALI_METAL */,
  // Alkaline Earth Metals
  "Be": "Alkaline Earth" /* ALKALINE_EARTH */,
  "Mg": "Alkaline Earth" /* ALKALINE_EARTH */,
  "Ca": "Alkaline Earth" /* ALKALINE_EARTH */,
  "Sr": "Alkaline Earth" /* ALKALINE_EARTH */,
  "Ba": "Alkaline Earth" /* ALKALINE_EARTH */,
  "Ra": "Alkaline Earth" /* ALKALINE_EARTH */,
  // Transition Metals
  "Sc": "Transition Metal" /* TRANSITION_METAL */,
  "Ti": "Transition Metal" /* TRANSITION_METAL */,
  "V": "Transition Metal" /* TRANSITION_METAL */,
  "Cr": "Transition Metal" /* TRANSITION_METAL */,
  "Mn": "Transition Metal" /* TRANSITION_METAL */,
  "Fe": "Transition Metal" /* TRANSITION_METAL */,
  "Co": "Transition Metal" /* TRANSITION_METAL */,
  "Ni": "Transition Metal" /* TRANSITION_METAL */,
  "Cu": "Transition Metal" /* TRANSITION_METAL */,
  "Zn": "Transition Metal" /* TRANSITION_METAL */,
  "Y": "Transition Metal" /* TRANSITION_METAL */,
  "Zr": "Transition Metal" /* TRANSITION_METAL */,
  "Nb": "Transition Metal" /* TRANSITION_METAL */,
  "Mo": "Transition Metal" /* TRANSITION_METAL */,
  "Tc": "Transition Metal" /* TRANSITION_METAL */,
  "Ru": "Transition Metal" /* TRANSITION_METAL */,
  "Rh": "Transition Metal" /* TRANSITION_METAL */,
  "Pd": "Transition Metal" /* TRANSITION_METAL */,
  "Ag": "Transition Metal" /* TRANSITION_METAL */,
  "Cd": "Transition Metal" /* TRANSITION_METAL */,
  "Hf": "Transition Metal" /* TRANSITION_METAL */,
  "Ta": "Transition Metal" /* TRANSITION_METAL */,
  "W": "Transition Metal" /* TRANSITION_METAL */,
  "Re": "Transition Metal" /* TRANSITION_METAL */,
  "Os": "Transition Metal" /* TRANSITION_METAL */,
  "Ir": "Transition Metal" /* TRANSITION_METAL */,
  "Pt": "Transition Metal" /* TRANSITION_METAL */,
  "Au": "Transition Metal" /* TRANSITION_METAL */,
  "Hg": "Transition Metal" /* TRANSITION_METAL */,
  "Rf": "Transition Metal" /* TRANSITION_METAL */,
  "Db": "Transition Metal" /* TRANSITION_METAL */,
  "Sg": "Transition Metal" /* TRANSITION_METAL */,
  "Bh": "Transition Metal" /* TRANSITION_METAL */,
  "Hs": "Transition Metal" /* TRANSITION_METAL */,
  "Mt": "Transition Metal" /* TRANSITION_METAL */,
  "Ds": "Transition Metal" /* TRANSITION_METAL */,
  "Rg": "Transition Metal" /* TRANSITION_METAL */,
  // Basic Metals (Post-Transition Metals)
  "Al": "Basic Metal" /* BASIC_METAL */,
  "Ga": "Basic Metal" /* BASIC_METAL */,
  "In": "Basic Metal" /* BASIC_METAL */,
  "Sn": "Basic Metal" /* BASIC_METAL */,
  "Tl": "Basic Metal" /* BASIC_METAL */,
  "Pb": "Basic Metal" /* BASIC_METAL */,
  "Bi": "Basic Metal" /* BASIC_METAL */,
  "Po": "Basic Metal" /* BASIC_METAL */,
  "Cn": "Basic Metal" /* BASIC_METAL */,
  "Nh": "Basic Metal" /* BASIC_METAL */,
  "Fl": "Basic Metal" /* BASIC_METAL */,
  "Mc": "Basic Metal" /* BASIC_METAL */,
  "Lv": "Basic Metal" /* BASIC_METAL */,
  // Metalloids
  "B": "Metalloid" /* METALLOID */,
  "Si": "Metalloid" /* METALLOID */,
  "Ge": "Metalloid" /* METALLOID */,
  "As": "Metalloid" /* METALLOID */,
  "Sb": "Metalloid" /* METALLOID */,
  "Te": "Metalloid" /* METALLOID */,
  "At": "Metalloid" /* METALLOID */,
  // Nonmetals
  "C": "Nonmetal" /* NONMETAL */,
  "N": "Nonmetal" /* NONMETAL */,
  "O": "Nonmetal" /* NONMETAL */,
  "P": "Nonmetal" /* NONMETAL */,
  "S": "Nonmetal" /* NONMETAL */,
  "Se": "Nonmetal" /* NONMETAL */,
  // Halogens
  "F": "Halogen" /* HALOGEN */,
  "Cl": "Halogen" /* HALOGEN */,
  "Br": "Halogen" /* HALOGEN */,
  "I": "Halogen" /* HALOGEN */,
  "Ts": "Halogen" /* HALOGEN */,
  // Noble Gases
  "He": "Noble Gas" /* NOBLE_GAS */,
  "Ne": "Noble Gas" /* NOBLE_GAS */,
  "Ar": "Noble Gas" /* NOBLE_GAS */,
  "Kr": "Noble Gas" /* NOBLE_GAS */,
  "Xe": "Noble Gas" /* NOBLE_GAS */,
  "Rn": "Noble Gas" /* NOBLE_GAS */,
  "Og": "Noble Gas" /* NOBLE_GAS */,
  // Lanthanides
  "La": "Lanthanide" /* LANTHANIDE */,
  "Ce": "Lanthanide" /* LANTHANIDE */,
  "Pr": "Lanthanide" /* LANTHANIDE */,
  "Nd": "Lanthanide" /* LANTHANIDE */,
  "Pm": "Lanthanide" /* LANTHANIDE */,
  "Sm": "Lanthanide" /* LANTHANIDE */,
  "Eu": "Lanthanide" /* LANTHANIDE */,
  "Gd": "Lanthanide" /* LANTHANIDE */,
  "Tb": "Lanthanide" /* LANTHANIDE */,
  "Dy": "Lanthanide" /* LANTHANIDE */,
  "Ho": "Lanthanide" /* LANTHANIDE */,
  "Er": "Lanthanide" /* LANTHANIDE */,
  "Tm": "Lanthanide" /* LANTHANIDE */,
  "Yb": "Lanthanide" /* LANTHANIDE */,
  "Lu": "Lanthanide" /* LANTHANIDE */,
  // Actinides
  "Ac": "Actinide" /* ACTINIDE */,
  "Th": "Actinide" /* ACTINIDE */,
  "Pa": "Actinide" /* ACTINIDE */,
  "U": "Actinide" /* ACTINIDE */,
  "Np": "Actinide" /* ACTINIDE */,
  "Pu": "Actinide" /* ACTINIDE */,
  "Am": "Actinide" /* ACTINIDE */,
  "Cm": "Actinide" /* ACTINIDE */,
  "Bk": "Actinide" /* ACTINIDE */,
  "Cf": "Actinide" /* ACTINIDE */,
  "Es": "Actinide" /* ACTINIDE */,
  "Fm": "Actinide" /* ACTINIDE */,
  "Md": "Actinide" /* ACTINIDE */,
  "No": "Actinide" /* ACTINIDE */,
  "Lr": "Actinide" /* ACTINIDE */,
  // Other elements/placeholders
  "E": "Other" /* OTHER */
};
function getElementTypeInfo(element) {
  const normalizedElement = element.charAt(0).toUpperCase() + element.slice(1).toLowerCase();
  const elementType = elementToTypeMap[normalizedElement] || "Unknown" /* UNKNOWN */;
  const baseColor = elementTypeColors[elementType];
  const borderColor = darkenColor(baseColor, 25);
  return {
    type: elementType,
    backgroundColor: baseColor,
    borderColor
  };
}

// src/element-utils.ts
var elements = Object.keys(elementToTypeMap);
var elementSetLower = new Set(elements.map((e) => e.toLowerCase()));
var elementMap = {};
elements.forEach((e) => {
  elementMap[e.toLowerCase()] = e;
});
function canBeSpelledWithElements(wordOrPhrase) {
  const words = wordOrPhrase.split(" ").filter((word) => word.length > 0);
  if (words.length === 0) return false;
  if (words.length === 1) {
    return processWord(words[0]);
  }
  const wordPermutations = [];
  for (const word of words) {
    const permutations = processWord(word);
    if (!permutations) return false;
    wordPermutations.push(permutations);
  }
  return combineWordPermutations(wordPermutations);
}
function processWord(word) {
  word = word.toLowerCase();
  const dp = new Array(word.length + 1).fill(false);
  dp[0] = true;
  const elementPathsAt = new Array(word.length + 1);
  elementPathsAt[0] = [[]];
  for (let i = 1; i <= word.length; i++) {
    elementPathsAt[i] = [];
    for (let j = 1; j <= Math.min(i, 2); j++) {
      const symbol = word.substring(i - j, i);
      if (dp[i - j] && elementSetLower.has(symbol)) {
        dp[i] = true;
        for (const path of elementPathsAt[i - j]) {
          elementPathsAt[i].push([...path, elementMap[symbol]]);
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
      if (elementType && elementType !== "Unknown" /* UNKNOWN */ && elementType !== "Other" /* OTHER */) {
        usedElementTypes.add(elementType);
      }
    });
  }
  Object.entries(ElementType).forEach(([key, typeName]) => {
    if (!usedElementTypes.has(typeName)) return;
    if (key === "UNKNOWN" || key === "OTHER") return;
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
      /<rect([^>]*)fill="white"([^>]*)stroke="black"([^>]*)>/,
      `<rect$1fill="${typeInfo.backgroundColor}"$2stroke="${typeInfo.borderColor}"$3>`
    );
    modifiedSvg = modifiedSvg.replace(
      /<svg([^>]*)/,
      '<svg$1 class="element-svg-content"'
    );
  } else {
    modifiedSvg = svgContent.replace(/<rect([^>]*)fill="white"/, '<rect$1fill="var(--bg-color)"').replace(/<text([^>]*?)>([^<]*)<\/text>/g, '<text$1 fill="var(--text-color)">$2</text>').replace(/<svg([^>]*)/, '<svg$1 class="element-svg-content"').replace(/stroke="black"/g, 'stroke="var(--text-color)"');
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
  totalWidth += wordCount * 10;
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
function processWordInput(word, elementContainer, resultDiv, useColoredElements = false) {
  elementContainer.innerHTML = "";
  resultDiv.textContent = "";
  const shareButton = document.getElementById("share-button");
  if (shareButton) {
    shareButton.disabled = true;
  }
  if (!word) {
    generateElementTypeLegend();
    return;
  }
  const elementPermutations = canBeSpelledWithElements(word);
  generateElementTypeLegend(elementPermutations);
  if (elementPermutations && elementPermutations.length > 0) {
    resultDiv.textContent = `"${word}" can be spelled in ${elementPermutations.length} different way${elementPermutations.length > 1 ? "s" : ""}`;
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
  let useColoredElements = false;
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
      useColoredElements = coloredElementsToggle.checked;
      const inputText = wordInput.value.trim();
      if (inputText) {
        processWordInput(inputText, elementContainer, resultDiv, useColoredElements);
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
    processWordInput(inputText, elementContainer, resultDiv, useColoredElements);
  });
  if (wordFromParam) {
    wordInput.value = wordFromParam;
    processWordInput(wordFromParam, elementContainer, resultDiv, useColoredElements);
  } else {
    shareButton.disabled = true;
  }
});
//# sourceMappingURL=app.js.map
