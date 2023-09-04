import React, { useRef, useEffect, useState } from "react";

import { yDraw, xDraw, circleDraw, radiusDraw, squareDraw, triangleDraw } from '../../Util/CanvasAdditions';

function Canvas(props) {
    const canvasRef = useRef(null)
    const ctxRef = useRef(null)
    const WIDTH = 250;
    const HEIGHT = 250;
    const DPI_WIDTH = WIDTH * 2;
    const DPI_HEIGHT = HEIGHT * 2;
    const COLOR = "#FFFFFF"
    const RADIUS = 200;
    const PADDING = 10;

    useEffect(() => {   
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        canvas.style.width = WIDTH + "px";
        canvas.style.height = HEIGHT + "px";
        canvas.width = DPI_WIDTH;
        canvas.height = DPI_HEIGHT;
        yDraw(ctx, COLOR, DPI_WIDTH, DPI_HEIGHT);
        xDraw(ctx, COLOR, DPI_WIDTH, DPI_HEIGHT);
        radiusDraw(ctx, COLOR, DPI_WIDTH, DPI_HEIGHT, RADIUS, PADDING);
        circleDraw(ctx, COLOR, DPI_WIDTH, DPI_HEIGHT, RADIUS, PADDING);
        squareDraw(ctx, COLOR, DPI_WIDTH, DPI_HEIGHT, RADIUS);
        triangleDraw(ctx, COLOR, DPI_WIDTH, DPI_HEIGHT, RADIUS);

        canvas.addEventListener('mousedown', (evt) => {
            let [x, y] = getCursorPosition(canvas, evt);
            props.canvasEvent(x, y);
        });
    }, [])

    const drawDot = (dot) => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d");

        let x = (dot.x / dot.r + WIDTH / RADIUS) * RADIUS;
        let y = -(dot.y / dot.r - WIDTH / RADIUS) * RADIUS;

        ctx.beginPath();
        ctx.strokeStyle = COLOR;
        ctx.arc(x, y, 8, 0, 2 * Math.PI)
        ctx.closePath();
        ctx.stroke();
    }

    const getCursorPosition = (canvas, evt) => {
        const rect = canvas.getBoundingClientRect();
        const x = (evt.clientX - rect.left) / (RADIUS / 2) - WIDTH / RADIUS;
        const y = -(evt.clientY - rect.top) / (RADIUS / 2) + HEIGHT / RADIUS;
        return [x, y];
    }

    return (
        <>
            <canvas id="graph" ref={canvasRef}>
            </canvas>
            {props.dots.map(function(element) {
                drawDot(element);
            })}
        </>
    )
}

export default Canvas