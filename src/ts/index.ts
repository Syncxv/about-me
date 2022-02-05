console.log("hey");
const canvas: HTMLCanvasElement = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const SIZE = 5;
let particleArr = [];

const redraw = () => {
    ctx.fillStyle = "rgb(0,0,0, 0.4)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    redraw();
};
canvas.addEventListener("resize", resizeCanvas);
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
console.log(ctx);

const mouse = {
    x: undefined,
    y: undefined,
};
addEventListener("mousemove", (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});
class Particle {
    x: number;
    y: number;
    size: number;
    opaicty: number;
    speedX: number;
    speedY: number;
    constructor(size: number, hehe?: number) {
        this.x = mouse.x + Math.random() * 30;
        this.y = mouse.y + Math.random() * 30;
        this.size = size || Math.random() * 3 + 1.5;
        this.opaicty = 0.5;
        this.speedX = Math.random() * 10;
        this.speedY = Math.random() * 1 * hehe || 1;
        // this.velocity = window.angle ? Math.cos(window.angle) : Math.random() * 3.5;
    }
    update() {
        this.opaicty -= 0.003;
        this.size -= 0.01;
        this.x += this.speedX;
        this.y += this.speedY;
    }
    draw() {
        ctx.beginPath();
        ctx.fillStyle = `hsla(0,100%,100%, ${this.opaicty})`;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }
}

const animate = () => {
    redraw();
    particleArr.forEach((particle, i) => {
        particle.update();
        particle.draw();
        if (particle.opaicty <= 0 || particle.size <= 0) particleArr.splice(i, 1);
    });
    console.log(particleArr.length);

    particleArr.push(new Particle(SIZE));
    requestAnimationFrame(animate);
};
animate();
