// packages/mask/src/index.js
function src_default(Alpine) {
  Alpine.directive("mask", (el, {value, expression}, {effect, evaluateLater}) => {
    let templateFn = () => expression;
    let lastInputValue = "";
    if (["function", "dynamic"].includes(value)) {
      let evaluator = evaluateLater(expression);
      effect(() => {
        templateFn = (input) => {
          let result;
          Alpine.dontAutoEvaluateFunctions(() => {
            evaluator((value2) => {
              result = typeof value2 === "function" ? value2(input) : value2;
            }, {scope: {
              $input: input,
              $money: formatMoney.bind({el})
            }});
          });
          return result;
        };
        processInputValue(el);
      });
    } else {
      processInputValue(el);
    }
    el.addEventListener("input", () => processInputValue(el));
    el.addEventListener("blur", () => processInputValue(el, false));
    function processInputValue(el2, shouldRestoreCursor = true) {
      let input = el2.value;
      let template = templateFn(input);
      if (!template || template === "false")
        return false;
      if (lastInputValue.length - el2.value.length === 1) {
        return lastInputValue = el2.value;
      }
      let setInput = () => {
        lastInputValue = el2.value = formatInput(input, template);
      };
      if (shouldRestoreCursor) {
        restoreCursorPosition(el2, template, () => {
          setInput();
        });
      } else {
        setInput();
      }
    }
    function formatInput(input, template) {
      if (input === "")
        return "";
      let strippedDownInput = stripDown(template, input);
      let rebuiltInput = buildUp(template, strippedDownInput);
      return rebuiltInput;
    }
  });
}
function restoreCursorPosition(el, template, callback) {
  let cursorPosition = el.selectionStart;
  let unformattedValue = el.value;
  callback();
  let beforeLeftOfCursorBeforeFormatting = unformattedValue.slice(0, cursorPosition);
  let newPosition = buildUp(template, stripDown(template, beforeLeftOfCursorBeforeFormatting)).length;
  el.setSelectionRange(newPosition, newPosition);
}
function stripDown(template, input) {
  let inputToBeStripped = input;
  let output = "";
  let regexes = {
    "9": /[0-9]/,
    a: /[a-zA-Z]/,
    "*": /[a-zA-Z0-9]/
  };
  let wildcardTemplate = "";
  for (let i = 0; i < template.length; i++) {
    if (["9", "a", "*"].includes(template[i])) {
      wildcardTemplate += template[i];
      continue;
    }
    for (let j = 0; j < inputToBeStripped.length; j++) {
      if (inputToBeStripped[j] === template[i]) {
        inputToBeStripped = inputToBeStripped.slice(0, j) + inputToBeStripped.slice(j + 1);
        break;
      }
    }
  }
  for (let i = 0; i < wildcardTemplate.length; i++) {
    let found = false;
    for (let j = 0; j < inputToBeStripped.length; j++) {
      if (regexes[wildcardTemplate[i]].test(inputToBeStripped[j])) {
        output += inputToBeStripped[j];
        inputToBeStripped = inputToBeStripped.slice(0, j) + inputToBeStripped.slice(j + 1);
        found = true;
        break;
      }
    }
    if (!found)
      break;
  }
  return output;
}
function buildUp(template, input) {
  let clean = Array.from(input);
  let output = "";
  for (let i = 0; i < template.length; i++) {
    if (!["9", "a", "*"].includes(template[i])) {
      output += template[i];
      continue;
    }
    if (clean.length === 0)
      break;
    output += clean.shift();
  }
  return output;
}
function formatMoney(input, delimeter = ".", thousands) {
  thousands = delimeter === "," && thousands === void 0 ? "." : ",";
  let addThousands = (input2, thousands2) => {
    let output = "";
    let counter = 0;
    for (let i = input2.length - 1; i >= 0; i--) {
      if (input2[i] === thousands2)
        continue;
      if (counter === 3) {
        output = input2[i] + thousands2 + output;
        counter = 0;
      } else {
        output = input2[i] + output;
      }
      counter++;
    }
    return output;
  };
  let strippedInput = input.replaceAll(new RegExp(`[^0-9\\${delimeter}]`, "g"), "");
  let template = Array.from({length: strippedInput.split(delimeter)[0].length}).fill("9").join("");
  template = addThousands(template, thousands);
  if (input.includes(delimeter))
    template += `${delimeter}99`;
  queueMicrotask(() => {
    if (this.el.value.endsWith(delimeter))
      return;
    if (this.el.value[this.el.selectionStart - 1] === delimeter) {
      this.el.setSelectionRange(this.el.selectionStart - 1, this.el.selectionStart - 1);
    }
  });
  return template;
}

// packages/mask/builds/module.js
var module_default = src_default;
export {
  module_default as default,
  stripDown
};
