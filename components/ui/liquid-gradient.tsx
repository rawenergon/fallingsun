"use client";

import React, { useEffect, useRef } from "react";

export type Colors = {
  [key: string]: string;
};

export interface LiquidProps {
  isHovered?: boolean;
  colors: Colors;
  className?: string;
}

export const Liquid: React.FC<LiquidProps> = ({ isHovered = false, colors, className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let t = 0;

    const palette = Object.values(colors);

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || 200;
      canvas.height = canvas.parentElement?.clientHeight || 60;
    };
    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      if (w === 0 || h === 0) return;

      const speed = isHovered ? 0.045 : 0.015;
      t += speed;

      const grad = ctx.createLinearGradient(
        w * 0.5 + Math.sin(t) * w * 0.4,
        0,
        w * 0.5 + Math.cos(t * 0.8) * w * 0.4,
        h
      );

      grad.addColorStop(0, palette[1] || "#1E10C5");
      grad.addColorStop(0.3, palette[8] || "#4743EF");
      grad.addColorStop(0.6, palette[6] || "#0E2DCB");
      grad.addColorStop(0.85, palette[10] || "#0B06FC");
      grad.addColorStop(1, palette[16] || "#3F4CC0");

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Liquid plasma swirls
      const waveCount = 3;
      for (let i = 0; i < waveCount; i++) {
        ctx.beginPath();
        const yOffset = h * (0.3 + i * 0.25);
        ctx.moveTo(0, yOffset);

        for (let x = 0; x <= w; x += 10) {
          const waveHeight = isHovered ? 14 : 8;
          const y = yOffset + Math.sin(x * 0.03 + t * 2 + i * 1.5) * waveHeight;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
        ctx.closePath();

        const waveGrad = ctx.createLinearGradient(0, 0, w, 0);
        waveGrad.addColorStop(0, palette[(i * 3 + 2) % palette.length] || "#9089E2");
        waveGrad.addColorStop(0.5, palette[(i * 4 + 7) % palette.length] || "#0017E9");
        waveGrad.addColorStop(1, palette[(i * 2 + 13) % palette.length] || "#B6BAF6");

        ctx.fillStyle = waveGrad;
        ctx.globalAlpha = 0.45;
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, [isHovered, colors]);

  return <canvas ref={canvasRef} className={`w-full h-full block ${className}`} />;
};

export default Liquid;
