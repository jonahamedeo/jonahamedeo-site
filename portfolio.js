const canvas = document.getElementById("weather-canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = document.body.scrollWidth;
    canvas.height = document.body.scrollHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// === Snowflakes Only ===
let flakes = [];
const flakeCount = 300;

for (let i = 0; i < flakeCount; i++) {
    flakes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 1,
        speedY: Math.random() * 2 + 1,
        wind: Math.random() * 1 - 0.5
    });
}

function drawSnow() {
    ctx.fillStyle = "white";
    ctx.beginPath();
    for (let flake of flakes) {
        ctx.moveTo(flake.x, flake.y);
        ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2);
    }
    ctx.fill();
}

function moveSnow() {
    for (let flake of flakes) {
        flake.y += flake.speedY;
        flake.x += flake.wind;

        if (flake.y > canvas.height) {
            flake.y = 0;
            flake.x = Math.random() * canvas.width;
        }
        if (flake.x > canvas.width || flake.x < 0) {
            flake.x = Math.random() * canvas.width;
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnow();
    moveSnow();
    requestAnimationFrame(animate);
}

animate();

