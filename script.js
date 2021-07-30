const can = `<canvas width=${innerWidth} height=${innerHeight}>Why are you using this broswer </canvas>`
document.body.innerHTML += can
const coordinates = { x: null, y: null };
const name = prompt("Enter your name") || "Jagan";
// document.title = name;
const colors = ["red", "blue", "green"];
const getColor = () => colors[Math.floor(Math.random() * colors.length)];
addEventListener("mousemove", (e) => {
    coordinates.x = e.x;
    coordinates.y = e.y;
});

const canvas = document.querySelector("canvas");
canvas.width = innerWidth;
canvas.height = innerHeight - 4;

const ctx = canvas.getContext("2d");
const circles = [];

class Circle {
    constructor(
        x,
        y,
        radius,
        color,
        dx,
        dy,
        startAngle,
        endAngle,
        antiClockWise
    ) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color =
            color ||
            `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255
            }, ${Math.random()})`;
        this.dx = dx || Math.random() - 0.5;
        this.dy = dy || Math.random() - 0.5;
        this.startAngle = startAngle || 0;
        this.endAngle = endAngle || Math.PI * 2;
        this.antiClockWise = antiClockWise || false;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(
            this.x,
            this.y,
            this.radius,
            this.startAngle,
            this.endAngle,
            this.antiClockWise
        );
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        const $ = this;
        $.dx =
            $.x + $.radius >= canvas.width || $.x - $.radius <= 0
                ? -$.dx
                : $.dx;
        $.dy =
            $.y + $.radius >= canvas.height || $.y - $.radius <= 0
                ? -$.dy
                : $.dy;

        $.x += $.dx;
        $.y += $.dy;

        if (
            coordinates.x - $.x < 50 &&
            coordinates.x - $.x > -50 &&
            coordinates.y - $.y < 50 &&
            coordinates.y - $.y > -50
        ) {
            if ($.radius < 50) $.radius = 50;
            $.radius++;
        } else if ($.radius > 10) $.radius--;

        $.draw();
    }
}

for (let i = 0; i < 100; i++) {
    const radius = Math.random() * 50;
    const x = Math.random() * (canvas.width - radius * 2) + radius;
    const y = Math.random() * (canvas.height - radius * 2) + radius;
    const dx = Math.random() * 3;
    const dy = Math.random() * 3;
    circles.push(new Circle(x, y, radius, null, dx, dy));
}

let size = 6,
    dsize = 0.09;
const nameAni = () => {
    ctx.beginPath();
    ctx.textAlign = "center";
    ctx.font = size + "rem sans-serif";
    ctx.lineWidth = 5;
    ctx.strokeStyle = "black";
    ctx.strokeText(name, innerWidth / 2, innerHeight / 2);

    ctx.stroke();

    if (size > 10) dsize = -dsize;
    if (size < 6) dsize = Math.abs(dsize);
    size += dsize;
};

const animate = () => {
    canvas.width < innerWidth && (canvas.width = innerWidth);
    canvas.height < innerHeight && (canvas.height = innerHeight - 4);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(animate);

    nameAni();

    circles.forEach((cirlce) => cirlce.update());
};

animate();