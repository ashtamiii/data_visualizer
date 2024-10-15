const canvas = document.getElementById('arrayCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 400;

const comparisonsDisplay = document.getElementById('comparisons');
const swapsDisplay = document.getElementById('swaps');
const timeDisplay = document.getElementById('time');

// Example data
let array = [50, 20, 10, 40, 30, 60, 90, 80, 70];

let comparisons = 0;
let swaps = 0;

function drawArray() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    array.forEach((value, index) => {
        ctx.fillStyle = 'blue';
        ctx.fillRect(index * (canvas.width / array.length), canvas.height - value * 4, (canvas.width / array.length) - 2, value * 4);
    });
}

function bubbleSort() {
    let len = array.length;
    let sorted = false;

    function sortStep(i, j) {
        if (i < len) {
            if (j < len - i - 1) {
                comparisons++;
                if (array[j] > array[j + 1]) {
                    [array[j], array[j + 1]] = [array[j + 1], array[j]];
                    swaps++;
                }
                drawArray();
                setTimeout(() => sortStep(i, j + 1), 100);
            } else {
                sortStep(i + 1, 0);
            }
        }
    }
    sortStep(0, 0);
}

document.getElementById('startSort').addEventListener('click', () => {
    comparisons = 0;
    swaps = 0;

    const startTime = performance.now();
    bubbleSort();

    setTimeout(() => {
        comparisonsDisplay.textContent = comparisons;
        swapsDisplay.textContent = swaps;
        timeDisplay.textContent = (performance.now() - startTime).toFixed(2);
    }, (array.length * 100)); // Adjust the time based on the array length and sorting speed
});

// Initialize
drawArray();