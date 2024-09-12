const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

const starshipSize = 40;
const obstacleSize = 30;
const bulletSize = 10;
const starSpeed = 1;
const obstacleSpeed = 3;
const starshipSpeed = 10    ; // Increased speed
const bulletSpeed = 5;

let starship = {
    x: canvas.width / 2 - starshipSize / 2,
    y: canvas.height - starshipSize - 10,
    width: starshipSize,
    height: starshipSize,
    color: "#00f"
};

let obstacles = [];
let bullets = [];
let stars = [];

function drawStarship() {
    ctx.fillStyle = starship.color;
    ctx.fillRect(starship.x, starship.y, starship.width, starship.height);
}

function drawObstacles() {
    ctx.fillStyle = "#f00";
    for (let obstacle of obstacles) {
        ctx.fillRect(obstacle.x, obstacle.y, obstacleSize, obstacleSize);
    }
}

function drawBullets() {
    ctx.fillStyle = "#ff0";
    for (let bullet of bullets) {
        ctx.fillRect(bullet.x, bullet.y, bulletSize, bulletSize);
    }
}

function drawStars() {
    ctx.fillStyle = "#fff";
    for (let star of stars) {
        ctx.fillRect(star.x, star.y, 2, 2);
    }
}

function updateObstacles() {
    for (let obstacle of obstacles) {
        obstacle.y += obstacleSpeed;
    }
    obstacles = obstacles.filter(obstacle => obstacle.y < canvas.height);
}

function updateBullets() {
    for (let bullet of bullets) {
        bullet.y -= bulletSpeed;
    }
    bullets = bullets.filter(bullet => bullet.y > 0);
}

function updateStars() {
    for (let star of stars) {
        star.y += starSpeed;
        if (star.y > canvas.height) {
            star.y = -2;
            star.x = Math.random() * canvas.width;
        }
    }
}

function addObstacle() {
    const x = Math.random() * (canvas.width - obstacleSize);
    obstacles.push({ x, y: -obstacleSize });
}

function addStar() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    stars.push({ x, y });
}

function collisionDetection() {
    // Check for collisions between starship and obstacles
    for (let obstacle of obstacles) {
        if (
            starship.x < obstacle.x + obstacleSize &&
            starship.x + starshipSize > obstacle.x &&
            starship.y < obstacle.y + obstacleSize &&
            starship.y + starshipSize > obstacle.y
        ) {
            alert("Game Over!");
            document.location.reload();
        }
    }

    // Check for collisions between bullets and obstacles
    for (let bullet of bullets) {
        for (let i = obstacles.length - 1; i >= 0; i--) {
            let obstacle = obstacles[i];
            if (
                bullet.x < obstacle.x + obstacleSize &&
                bullet.x + bulletSize > obstacle.x &&
                bullet.y < obstacle.y + obstacleSize &&
                bullet.y + bulletSize > obstacle.y
            ) {
                obstacles.splice(i, 1); // Remove the obstacle
                bullets.splice(bullets.indexOf(bullet), 1); // Remove the bullet
                break;
            }
        }
    }
}

function handleControls() {
    window.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") {
            starship.x -= starshipSpeed;
        } else if (e.key === "ArrowRight") {
            starship.x += starshipSpeed;
        } else if (e.key === "ArrowUp") {
            starship.y -= starshipSpeed;
        } else if (e.key === "ArrowDown") {
            starship.y += starshipSpeed;
        } else if (e.key === " ") { // Spacebar to shoot
            bullets.push({
                x: starship.x + starshipSize / 2 - bulletSize / 2,
                y: starship.y
            });
        }

        // Constrain the starship within canvas boundaries
        starship.x = Math.max(0, Math.min(canvas.width - starshipSize, starship.x));
        starship.y = Math.max(0, Math.min(canvas.height - starshipSize, starship.y));
    });
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawStars();
    drawObstacles();
    drawBullets();
    drawStarship();

    updateObstacles();
    updateBullets();
    updateStars();

    collisionDetection();

    if (Math.random() < 0.02) {
        addObstacle();
    }

    if (Math.random() < 0.05) {
        addStar();
    }

    requestAnimationFrame(gameLoop);
}

handleControls();
gameLoop();
