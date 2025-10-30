const canvas = document.getElementById("animationCanvas");
const ctx = canvas.getContext("2d");

// Jugador
let player = {
  x: 50,
  y: 100,
  width: 30,
  height: 30,
  velocityY: 0,
  gravity: 1,
  jumpStrength: -15,
  isJumping: false
};

const ground = canvas.height - player.height;
let obstacles = [];
let clouds = [];
let obstacleSpeed = 4;
let cloudSpeed = 1;

// Crear obstáculos
function spawnObstacle() {
  obstacles.push({
    x: canvas.width,
    y: ground,
    width: 20 + Math.random() * 20,
    height: 30
  });
}

// Crear nubes
function spawnCloud() {
  clouds.push({
    x: canvas.width,
    y: 20 + Math.random() * 50,
    width: 40 + Math.random() * 30,
    height: 20
  });
}

// Dibuja jugador
function drawPlayer() {
  ctx.fillStyle = "#1e2a38";
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Dibuja obstáculos
function drawObstacles() {
  ctx.fillStyle = "#d32f2f";
  obstacles.forEach(ob => {
    ctx.fillRect(ob.x, ob.y, ob.width, ob.height);
  });
}

// Dibuja nubes
function drawClouds() {
  ctx.fillStyle = "rgba(255,255,255,0.7)";
  clouds.forEach(cl => {
    ctx.beginPath();
    ctx.ellipse(cl.x, cl.y, cl.width, cl.height, 0, 0, Math.PI * 2);
    ctx.fill();
  });
}

// Verifica colisión
function checkCollision() {
  return obstacles.some(ob => {
    return (
      player.x < ob.x + ob.width &&
      player.x + player.width > ob.x &&
      player.y < ob.y + ob.height &&
      player.y + player.height > ob.y
    );
  });
}

// Reinicia juego
function resetGame() {
  player.y = 100;
  player.velocityY = 0;
  player.isJumping = false;
  obstacles = [];
  clouds = [];
}

// Salto automático si hay obstáculo cerca
function autoJump() {
  obstacles.forEach(ob => {
    const distance = ob.x - player.x;
    if (distance > 0 && distance < 60 && !player.isJumping) {
      player.velocityY = player.jumpStrength;
      player.isJumping = true;
    }
  });
}

// Loop principal
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Fondo cielo
  ctx.fillStyle = "#b3e5fc";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawClouds();

  // Suelo
  ctx.fillStyle = "#ccc";
  ctx.fillRect(0, ground + player.height, canvas.width, 5);

  // Movimiento jugador
  player.velocityY += player.gravity;
  player.y += player.velocityY;

  if (player.y >= ground) {
    player.y = ground;
    player.velocityY = 0;
    player.isJumping = false;
  }

  // Movimiento obstáculos
  obstacles.forEach(ob => ob.x -= obstacleSpeed);
  obstacles = obstacles.filter(ob => ob.x + ob.width > 0);

  // Movimiento nubes
  clouds.forEach(cl => cl.x -= cloudSpeed);
  clouds = clouds.filter(cl => cl.x + cl.width > 0);

  autoJump(); // Salta si hay obstáculo cerca

  drawPlayer();
  drawObstacles();

  if (checkCollision()) {
    resetGame();
  }

  requestAnimationFrame(update);
}

// Obstáculos cada 1.5 segundos
setInterval(spawnObstacle, 1500);

// Nubes cada 2 segundos
setInterval(spawnCloud, 2000);

update();
