"use client";

import { type Colors, Liquid } from "@/components/ui/liquid-gradient";
import type React from "react";
import { useState } from "react";

const COLORS: Colors = {
  color1: "#FFFFFF",
  color2: "#1E10C5",
  color3: "#9089E2",
  color4: "#FCFCFE",
  color5: "#F9F9FD",
  color6: "#B2B8E7",
  color7: "#0E2DCB",
  color8: "#0017E9",
  color9: "#4743EF",
  color10: "#7D7BF4",
  color11: "#0B06FC",
  color12: "#C5C1EA",
  color13: "#1403DE",
  color14: "#B6BAF6",
  color15: "#C1BEEB",
  color16: "#290ECB",
  color17: "#3F4CC0",
};

export const DashboardButton: React.FC<{ href?: string }> = ({ href = "https://recolabrecox.vercel.app/" }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex justify-center">
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className="relative inline-block w-48 h-[3.1rem] mx-auto group rounded-xl border border-white/20 transition-transform duration-300 hover:scale-[1.03]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Outer Glow Aura */}
        <div className="absolute w-[114%] h-[132%] top-[6%] left-1/2 -translate-x-1/2 filter blur-[18px] opacity-75 pointer-events-none">
          <span className="absolute inset-0 rounded-xl bg-[#d9d9d9] filter blur-[6px]" />
          <div className="relative w-full h-full overflow-hidden rounded-xl">
            <Liquid isHovered={isHovered} colors={COLORS} />
          </div>
        </div>

        {/* Ambient Dark Core */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[94%] h-[114%] rounded-xl bg-[#010128] filter blur-[7px] pointer-events-none" />

        {/* Inner Liquid Pill */}
        <div className="relative w-full h-full overflow-hidden rounded-xl shadow-xl">
          <span className="absolute inset-0 rounded-xl bg-black" />
          <Liquid isHovered={isHovered} colors={COLORS} />

          {/* Spark Highlights */}
          {[1, 2, 3, 4].map((i) => (
            <span
              key={`spark-${i}`}
              className={`absolute inset-0 rounded-xl border-solid border-[2px] border-gradient-to-b from-transparent to-white mix-blend-overlay filter ${
                i <= 2 ? "blur-[2px]" : "blur-[4px]"
              }`}
            />
          ))}

          {/* Center Neon Pulse */}
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[70%] h-[42%] rounded-xl filter blur-[14px] bg-[#000066] pointer-events-none" />

          {/* Button Text */}
          <span className="relative z-10 flex h-full items-center justify-center gap-2 px-5 font-mono text-sm font-semibold tracking-wider text-white">
            <span>Dashboard</span>
            <span className="text-base text-cyan-300 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </span>
        </div>
      </a>
    </div>
  );
};

export default DashboardButton;
