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
  return svgContent.replace(/<svg([^>]*)width="[^"]*"/, "<svg$1").replace(/<svg([^>]*)height="[^"]*"/, "<svg$1").replace(/<rect([^>]*)fill="white"/, '<rect$1fill="var(--bg-color)"').replace(/<text([^>]*?)>([^<]*)<\/text>/g, '<text$1 fill="var(--text-color)">$2</text>').replace(/<svg([^>]*)/, '<svg$1 style="width: 100px; height: auto;"').replace(/stroke="black"/g, 'stroke="var(--text-color)"');
}
function setTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("word-form");
  const wordInput = document.getElementById("word-input");
  const resultDiv = document.getElementById("result");
  const elementContainer = document.getElementById("element-container");
  const themeRadios = document.querySelectorAll('input[name="theme"]');
  themeRadios.forEach((radio) => {
    radio.addEventListener("change", (e) => {
      const target = e.target;
      setTheme(target.value);
    });
  });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });
  wordInput.addEventListener("input", () => {
    const inputText = wordInput.value.trim();
    elementContainer.innerHTML = "";
    resultDiv.textContent = "";
    if (!inputText) {
      resultDiv.textContent = "Please enter a word or phrase";
      return;
    }
    const elementPermutations = canBeSpelledWithElements(inputText);
    if (elementPermutations && elementPermutations.length > 0) {
      resultDiv.textContent = `"${inputText}" can be spelled in ${elementPermutations.length} different way${elementPermutations.length > 1 ? "s" : ""}`;
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
          results.forEach((result) => {
            if ("isSpace" in result && result.isSpace) {
              const spacerDiv = document.createElement("div");
              spacerDiv.className = "word-spacer";
              permutationRow.appendChild(spacerDiv);
              return;
            }
            const elementDiv = document.createElement("div");
            elementDiv.className = "element-svg";
            if ("error" in result && result.error) {
              elementDiv.textContent = `Error loading ${result.element}`;
            } else if ("svgContent" in result) {
              elementDiv.innerHTML = makeSvgResponsive(result.svgContent);
            }
            permutationRow.appendChild(elementDiv);
          });
        });
      });
    } else {
      resultDiv.textContent = `"${inputText}" cannot be spelled using only chemical elements`;
    }
  });
});
//# sourceMappingURL=app.js.map
