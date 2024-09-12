// Get canvas and context
const canvas = document.getElementById("sandCanvas");
const ctx = canvas.getContext("2d");

// Set canvas dimensions
canvas.width = 700;
canvas.height = 700;

// Define grid size
const pixelSize = 5;  // Size of each sand particle
const cols = canvas.width / pixelSize;
const rows = canvas.height / pixelSize;

// Create a 2D array for the grid (0 = empty, 1 = sand particle)
let sandGrid = new Array(cols).fill(null).map(() => new Array(rows).fill(0));

// Sand color
const sandColor = "#DAA520";
const emptyColor = "#f0f0f0";

// Draw the grid on the canvas
function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear the canvas
    for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
            ctx.fillStyle = sandGrid[x][y] === 1 ? sandColor : emptyColor;
            ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        }
    }
}

// Simulate sand particle movement
function updateSand() {
    for (let x = 0; x < cols; x++) {
        for (let y = rows - 1; y >= 0; y--) {
            if (sandGrid[x][y] === 1) {
                if (y < rows - 1 && sandGrid[x][y + 1] === 0) {
                    // Move the sand particle down
                    sandGrid[x][y] = 0;
                    sandGrid[x][y + 1] = 1;
                } else if (y < rows - 1 && x > 0 && sandGrid[x - 1][y + 1] === 0) {
                    // Move diagonally left
                    sandGrid[x][y] = 0;
                    sandGrid[x - 1][y + 1] = 1;
                } else if (y < rows - 1 && x < cols - 1 && sandGrid[x + 1][y + 1] === 0) {
                    // Move diagonally right
                    sandGrid[x][y] = 0;
                    sandGrid[x + 1][y + 1] = 1;
                }
            }
        }
    }
}

// Add sand where the user clicks
function addSand(x, y) {
    const gridX = Math.floor(x / pixelSize);
    const gridY = Math.floor(y / pixelSize);

    // Ensure the clicked point is within bounds
    if (gridX >= 0 && gridX < cols && gridY >= 0 && gridY < rows) {
        sandGrid[gridX][gridY] = 1;
    }
}

// Handle mouse clicks and drags
canvas.addEventListener("mousedown", (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    addSand(mouseX, mouseY);
});

canvas.addEventListener("mousemove", (event) => {
    if (event.buttons === 1) {  // Left mouse button is held down
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        addSand(mouseX, mouseY);
    }
});

// Main animation loop
function animate() {
    drawGrid();  // Draw the sand particles on the canvas
    updateSand();  // Simulate the movement of the sand
    requestAnimationFrame(animate);  // Call animate recursively
}

// Start the animation
animate();
