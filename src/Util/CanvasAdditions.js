function yDraw(ctx, COLOR, DPI_WIDTH, DPI_HEIGHT) {
    ctx.beginPath();
    ctx.strokeStyle = COLOR;
    ctx.lineWidth = 4;
    ctx.lineTo(DPI_WIDTH / 2, 0);
    ctx.lineTo(DPI_WIDTH / 2, DPI_HEIGHT);
    ctx.stroke();
    ctx.closePath();
}

function xDraw(ctx, COLOR, DPI_WIDTH, DPI_HEIGHT) {
    ctx.beginPath();
    ctx.strokeStyle = COLOR;
    ctx.lineWidth = 4;
    ctx.lineTo(0, DPI_HEIGHT / 2);
    ctx.lineTo(DPI_WIDTH, DPI_HEIGHT / 2);
    ctx.stroke();
    ctx.closePath();
}

function radiusDraw(ctx, COLOR, DPI_WIDTH, DPI_HEIGHT, RADIUS, PADDING) {
    ctx.beginPath();
    ctx.strokeStyle = COLOR;
    ctx.font = "normal 40px Montserrat Light";
    ctx.fillStyle = COLOR;
    ctx.fillText("R", DPI_WIDTH / 2 + RADIUS + PADDING, DPI_HEIGHT / 2 - PADDING);
    ctx.fillText("R/2", DPI_WIDTH / 2 + RADIUS / 2 - 2 * PADDING, DPI_HEIGHT / 2 - PADDING);
    ctx.fillText("R/2", DPI_WIDTH / 2 - RADIUS / 2 - 2 * PADDING, DPI_HEIGHT / 2 - PADDING);
    ctx.fillText("R", DPI_WIDTH / 2 + PADDING, DPI_HEIGHT / 2 - RADIUS - PADDING);
    ctx.fillText("R", DPI_WIDTH / 2 + PADDING, DPI_HEIGHT / 2 + RADIUS + PADDING);
    ctx.closePath();
}

function squareDraw(ctx, COLOR, DPI_WIDTH, DPI_HEIGHT, RADIUS) {
    ctx.beginPath();
    ctx.strokeStyle = COLOR;
    ctx.lineWidth = 4;
    ctx.lineTo(DPI_WIDTH / 2, DPI_HEIGHT - (DPI_HEIGHT / 2 + RADIUS));
    ctx.lineTo(DPI_WIDTH / 2 + RADIUS, DPI_HEIGHT - (DPI_HEIGHT / 2 + RADIUS));
    ctx.lineTo(DPI_WIDTH / 2 + RADIUS, DPI_HEIGHT - (DPI_HEIGHT / 2));
    ctx.stroke();
    ctx.closePath();
}

function circleDraw(ctx, COLOR, DPI_WIDTH, DPI_HEIGHT, RADIUS, PADDING) {
    ctx.beginPath();
    ctx.strokeStyle = COLOR;
    ctx.lineWidth = 4;
    for (let i = DPI_HEIGHT / 2; i <= DPI_WIDTH / 2 + RADIUS / 2; i++) {
        ctx.lineTo(i, Math.round(Math.sqrt(RADIUS * RADIUS / 4 - (i - DPI_WIDTH / 2) * (i - DPI_WIDTH / 2)) + DPI_HEIGHT / 2));
    }
    ctx.stroke();
    ctx.closePath();
}

function triangleDraw(ctx, COLOR, DPI_WIDTH, DPI_HEIGHT, RADIUS) {
    ctx.beginPath();
    ctx.strokeStyle = COLOR;
    ctx.lineWidth = 4;
    ctx.lineTo(DPI_WIDTH / 2, DPI_HEIGHT - (DPI_HEIGHT / 2 - RADIUS));
    ctx.lineTo(DPI_WIDTH / 2 - RADIUS / 2, DPI_HEIGHT - (DPI_HEIGHT / 2));
    ctx.stroke();
    ctx.closePath();
}

export { yDraw, xDraw, radiusDraw, squareDraw, circleDraw, triangleDraw }