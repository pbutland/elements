// src/element-utils.ts
var elements = [
  "H",
  "He",
  "Li",
  "Be",
  "B",
  "C",
  "N",
  "O",
  "F",
  "Ne",
  "Na",
  "Mg",
  "Al",
  "Si",
  "P",
  "S",
  "Cl",
  "Ar",
  "K",
  "Ca",
  "Sc",
  "Ti",
  "V",
  "Cr",
  "Mn",
  "Fe",
  "Co",
  "Ni",
  "Cu",
  "Zn",
  "Ga",
  "Ge",
  "As",
  "Se",
  "Br",
  "Kr",
  "Rb",
  "Sr",
  "Y",
  "Zr",
  "Nb",
  "Mo",
  "Tc",
  "Ru",
  "Rh",
  "Pd",
  "Ag",
  "Cd",
  "In",
  "Sn",
  "Sb",
  "Te",
  "I",
  "Xe",
  "Cs",
  "Ba",
  "La",
  "Ce",
  "Pr",
  "Nd",
  "Pm",
  "Sm",
  "Eu",
  "Gd",
  "Tb",
  "Dy",
  "Ho",
  "Er",
  "Tm",
  "Yb",
  "Lu",
  "Hf",
  "Ta",
  "W",
  "Re",
  "Os",
  "Ir",
  "Pt",
  "Au",
  "Hg",
  "Tl",
  "Pb",
  "Bi",
  "Po",
  "At",
  "Rn",
  "Fr",
  "Ra",
  "Ac",
  "Th",
  "Pa",
  "U",
  "Np",
  "Pu",
  "Am",
  "Cm",
  "Bk",
  "Cf",
  "Es",
  "Fm",
  "Md",
  "No",
  "Lr",
  "Rf",
  "Db",
  "Sg",
  "Bh",
  "Hs",
  "Mt",
  "Ds",
  "Rg",
  "Cn",
  "Nh",
  "Fl",
  "Mc",
  "Lv",
  "Ts",
  "Og",
  "E"
];
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
function makeSvgResponsive(svgContent) {
  return svgContent.replace(/<rect([^>]*)fill="white"/, '<rect$1fill="var(--bg-color)"').replace(/<text([^>]*?)>([^<]*)<\/text>/g, '<text$1 fill="var(--text-color)">$2</text>').replace(/<svg([^>]*)/, '<svg$1 class="element-svg-content"').replace(/stroke="black"/g, 'stroke="var(--text-color)"');
}
function downloadPermutationAsSVG(permutationRow, word) {
  const svgElements = permutationRow.querySelectorAll(".element-svg-content");
  if (!svgElements.length) return;
  const computedStyle = getComputedStyle(document.body);
  const bgColor = computedStyle.getPropertyValue("--bg-color").trim();
  const textColor = computedStyle.getPropertyValue("--text-color").trim();
  let totalWidth = 0;
  let maxHeight = 0;
  svgElements.forEach((svg) => {
    const svgElement = svg;
    totalWidth += svgElement.getBoundingClientRect().width;
    maxHeight = Math.max(maxHeight, svgElement.getBoundingClientRect().height);
  });
  totalWidth += (svgElements.length - 1) * 10;
  totalWidth += 20;
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
  svgElements.forEach((svg) => {
    const svgElement = svg;
    const width = svgElement.getBoundingClientRect().width;
    const height = svgElement.getBoundingClientRect().height;
    const svgString = new XMLSerializer().serializeToString(svgElement);
    const elementSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    elementSvg.setAttribute("width", width.toString());
    elementSvg.setAttribute("height", height.toString());
    elementSvg.setAttribute("x", currentX.toString());
    elementSvg.setAttribute("y", ((maxHeight - height) / 2).toString());
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgString, "image/svg+xml");
    const originalSvg = svgDoc.documentElement;
    if (originalSvg.hasAttribute("viewBox")) {
      elementSvg.setAttribute("viewBox", originalSvg.getAttribute("viewBox"));
    }
    const replaceVarsInElement = (el) => {
      if (el.tagName.toLowerCase() === "text" && el.hasAttribute("fill")) {
        const fillValue = el.getAttribute("fill");
        if (fillValue?.includes("var(--")) {
          el.setAttribute("fill", computedStyle.color);
        }
      }
      if (el.tagName.toLowerCase() === "rect" && el.hasAttribute("fill")) {
        const fillValue = el.getAttribute("fill");
        if (fillValue?.includes("var(--")) {
          if (fillValue?.includes("--bg-color")) {
            el.setAttribute("fill", computedStyle.backgroundColor);
          }
        }
      }
      if (el.hasAttribute("stroke")) {
        const strokeValue = el.getAttribute("stroke");
        if (strokeValue?.includes("var(--")) {
          el.setAttribute("stroke", computedStyle.color);
        }
      }
      Array.from(el.children).forEach((child) => {
        replaceVarsInElement(child);
      });
    };
    Array.from(originalSvg.childNodes).forEach((child) => {
      const importedNode = document.importNode(child, true);
      if (importedNode.nodeType === Node.ELEMENT_NODE) {
        replaceVarsInElement(importedNode);
      }
      elementSvg.appendChild(importedNode);
    });
    group.appendChild(elementSvg);
    currentX += width + 10;
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
  const shareButton = document.getElementById("share-button");
  if (shareButton) {
    shareButton.disabled = true;
  }
  if (!word) {
    return;
  }
  const elementPermutations = canBeSpelledWithElements(word);
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
            elementDiv.innerHTML = makeSvgResponsive(result.svgContent);
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
          downloadPermutationAsSVG(permutationRow, word);
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
