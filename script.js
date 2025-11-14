// simple, robust button-driven calculator logic
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const val = btn.dataset.value;
    const action = btn.dataset.action;

    if (action === 'clear') {
      display.value = '';
      return;
    }

    if (action === 'equals') {
      evaluateExpression();
      return;
    }

    // append typed value
    if (val !== undefined) {
      display.value += val;
    }
  });
});

function evaluateExpression() {
  const expr = display.value.trim();
  if (!expr) return;

  // basic safety: allow only digits, operators, parentheses, decimal point and spaces
  if (!/^[0-9+\-*/().\s]+$/.test(expr)) {
    display.value = 'Error';
    return;
  }

  try {
    // use Function rather than eval for slightly better sandboxing
    // still not secure for untrusted input, but fine for local calculator
    // replace unicode symbols if present
    const cleanExpr = expr.replace(/×/g, '*').replace(/÷/g, '/');
    const result = Function('"use strict"; return (' + cleanExpr + ')')();
    display.value = result;
  } catch (e) {
    display.value = 'Error';
  }
}
