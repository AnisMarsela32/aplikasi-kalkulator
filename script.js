// Ambil elemen display dan semua tombol
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = ''; // Menyimpan input saat ini
let operator = null; // Menyimpan operator yang dipilih
let previousInput = ''; // Menyimpan input sebelumnya

// Fungsi untuk mengupdate layar display
function updateDisplay(value) {
    display.textContent = value;
}

// Fungsi untuk menghitung hasil
function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = null;
    previousInput = '';
    updateDisplay(currentInput);
}

// Tambahkan event listener untuk setiap tombol
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');

        // Jika tombol C (clear) diklik
        if (value === 'C') {
            currentInput = '';
            previousInput = '';
            operator = null;
            updateDisplay('0');
            return;
        }

        // Jika tombol DEL (delete) diklik
        if (value === 'DEL') {
            currentInput = currentInput.slice(0, -1);
            updateDisplay(currentInput || '0');
            return;
        }

        // Jika tombol operator diklik
        if (['+', '-', '*', '/'].includes(value)) {
            if (currentInput === '') return;
            if (previousInput !== '') {
                calculate();
            }
            operator = value;
            previousInput = currentInput;
            currentInput = '';
            return;
        }

        // Jika tombol sama dengan diklik
        if (value === '=') {
            if (operator === null || currentInput === '') return;
            calculate();
            return;
        }

        // Tambahkan angka atau titik ke input saat ini
        currentInput += value;
        updateDisplay(currentInput);
    });
});