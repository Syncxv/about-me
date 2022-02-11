console.log("hey");
const canvas: HTMLCanvasElement = document.querySelector("#canvas")!;
const container: HTMLDivElement = document.querySelector(".container")!;
const ctx = canvas.getContext("2d")!;
const SIZE = 5;
const moveForce = 10; // max popup movement in pixels
const rotateForce = 5; // max popup rotation in deg
let particleArr: Particle[] = [];

const redraw = () => {
    ctx.globalAlpha = 0.3;
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

const mouse: { x: number | undefined; y: number | undefined } = {
    x: undefined,
    y: undefined,
};
addEventListener("mousemove", (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
    var docX = window.innerWidth;
    var docY = window.innerHeight;

    var moveX = ((e.pageX - docX / 2) / (docX / 2)) * -moveForce;
    var moveY = ((e.pageY - docY / 2) / (docY / 2)) * -moveForce;

    var rotateY = (e.pageX / docX) * rotateForce * 2 - rotateForce;
    var rotateX = -((e.pageY / docY) * rotateForce * 2 - rotateForce);
    container.style.left = `${moveX}px`;
    container.style.top = `${moveY}px`;
    container.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    (window as any).docY = docY;
});
class Particle {
    public x: number;
    public y: number;
    public size: number;
    public opaicty: number;
    public speedX: number;
    public speedY: number;
    constructor(_size: number, hehe?: number) {
        hehe = hehe || 1;
        this.x = (mouse.x as number) + Math.random() * 30;
        this.y = (mouse.y as number) + Math.random() * 30;
        this.size = _size ?? Math.random() * 3 + 1.5;
        this.opaicty = 0.5;
        this.speedX = Math.random() * 10;
        this.speedY = Math.random() * 1 * hehe;
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

    particleArr.push(new Particle(SIZE));
    requestAnimationFrame(animate);
};
animate();
