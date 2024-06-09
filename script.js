const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const hearts = [];

function Heart() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 20 + 10;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.opacity = Math.random() * 0.5 + 0.5;
}

Heart.prototype.draw = function() {
    ctx.fillStyle = `rgba(255, 105, 180, ${this.opacity})`;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.bezierCurveTo(this.x + this.size / 2, this.y - this.size / 2, this.x + this.size, this.y + this.size / 3, this.x, this.y + this.size);
    ctx.bezierCurveTo(this.x - this.size, this.y + this.size / 3, this.x - this.size / 2, this.y - this.size / 2, this.x, this.y);
    ctx.fill();
};

Heart.prototype.update = function() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.5) this.size -= 0.1;

    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height || this.size <= 0.5) {
        const index = hearts.indexOf(this);
        hearts.splice(index, 1);
    }
};

function handleHearts() {
    for (let i = 0; i < hearts.length; i++) {
        hearts[i].update();
        hearts[i].draw();
    }

    if (hearts.length < 100) {
        hearts.push(new Heart());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleHearts();
    requestAnimationFrame(animate);
}

animate();
