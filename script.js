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

    if (val !== undefined) {
      display.value += val;
    }
  });
});

function evaluateExpression() {
  const expr = display.value.trim();
  if (!expr) return;

  if (!/^[0-9+\-*/().\s]+$/.test(expr)) {
    display.value = 'Error';
    return;
  }

  try {
    const cleanExpr = expr.replace(/×/g, '*').replace(/÷/g, '/');
    const result = Function('"use strict"; return (' + cleanExpr + ')')();
    display.value = result;
  } catch (e) {
    display.value = 'Error';
  }
}

