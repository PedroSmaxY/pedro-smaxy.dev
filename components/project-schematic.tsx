"use client";

import Image from "next/image";

export type ProjectPreviewData = {
  title: string;
  image?: string;
  terminalPreview?: string[];
  period: string;
};

type SchematicProps = {
  project: ProjectPreviewData;
  viewMode: "schematic" | "capture";
};

function TerminalStrip({ command }: { command?: string }) {
  if (!command) return null;
  return (
    <div className="h-8 px-4 flex items-center border-t border-[#EDEAE2]/10 bg-[#050608]/95 font-mono text-[11px] text-[#9A968E] truncate">
      <span className="truncate">{command}</span>
    </div>
  );
}

function SvgHudHeader({ left, right }: { left: string; right: string }) {
  return (
    <g>
      <text x="16" y="18" className="fill-[#9A968E] font-mono text-[8.2px]">
        {left}
      </text>
      <text
        x="544"
        y="18"
        textAnchor="end"
        className="fill-[#FF8A4C] font-mono text-[8.2px]"
      >
        {right}
      </text>
      <line
        x1="16"
        y1="26"
        x2="544"
        y2="26"
        stroke="#EDEAE2"
        strokeOpacity="0.1"
      />
    </g>
  );
}

function SvgBottomMetrics({ items }: { items: [string, string, string] }) {
  return (
    <g>
      <line
        x1="16"
        y1="190"
        x2="544"
        y2="190"
        stroke="#EDEAE2"
        strokeOpacity="0.1"
      />
      <text x="16" y="206" className="fill-[#9A968E] font-mono text-[8px]">
        {items[0]}
      </text>
      <text
        x="280"
        y="206"
        textAnchor="middle"
        className="fill-[#EDEAE2] font-mono text-[8px]"
      >
        {items[1]}
      </text>
      <text
        x="544"
        y="206"
        textAnchor="end"
        className="fill-[#FF8A4C] font-mono text-[8px]"
      >
        {items[2]}
      </text>
    </g>
  );
}

type BlueprintSpec = {
  systemTag: string;
  perfTag: string;
  input: { title: string; sub: string };
  hub: { title: string; sub: string };
  outputs: [
    { title: string; sub: string },
    { title: string; sub: string },
    { title: string; sub: string },
  ];
  metrics: [string, string, string];
  command?: string;
};

function ArchitectureBlueprint({ spec }: { spec: BlueprintSpec }) {
  const outputYs = [42, 88, 134];

  return (
    <div className="absolute inset-0 flex flex-col justify-between bg-[#07080A] dot-matrix">
      <div className="relative flex-1 flex items-center justify-center p-3 sm:p-4">
        <svg
          data-schematic-canvas
          viewBox="0 0 560 220"
          className="w-full h-full max-h-[220px]"
          aria-hidden="true"
        >
          <SvgHudHeader left={spec.systemTag} right={spec.perfTag} />

          <line
            x1="128"
            y1="108"
            x2="176"
            y2="108"
            stroke="#EDEAE2"
            strokeOpacity="0.22"
            strokeWidth="1"
          />
          <line
            x1="128"
            y1="108"
            x2="176"
            y2="108"
            stroke="#FF4D00"
            strokeOpacity="0.8"
            strokeWidth="1.4"
            strokeDasharray="4 8"
            className="animate-[flowDash_2.4s_linear_infinite] motion-reduce:animate-none"
          />

          {outputYs.map((y, idx) => {
            const targetY = y + 19;
            const pathD = `M 326 108 C 352 108 352 ${targetY} 376 ${targetY}`;
            return (
              <g key={spec.outputs[idx].title}>
                <path
                  d={pathD}
                  fill="none"
                  stroke="#EDEAE2"
                  strokeOpacity="0.18"
                  strokeWidth="1"
                />
                <path
                  d={pathD}
                  fill="none"
                  stroke="#FF8A4C"
                  strokeOpacity="0.7"
                  strokeWidth="1.3"
                  strokeDasharray="4 8"
                  className="animate-[flowDash_2.4s_linear_infinite] motion-reduce:animate-none"
                />
                <rect
                  x="376"
                  y={y}
                  width="168"
                  height="38"
                  fill="#0F1013"
                  stroke="#EDEAE2"
                  strokeOpacity="0.22"
                />
                <text
                  x="388"
                  y={y + 16}
                  className="fill-[#EDEAE2] font-mono text-[9px]"
                >
                  {spec.outputs[idx].title}
                </text>
                <text
                  x="388"
                  y={y + 29}
                  className="fill-[#9A968E] font-mono text-[7.8px]"
                >
                  {spec.outputs[idx].sub}
                </text>
              </g>
            );
          })}

          <rect
            x="16"
            y="82"
            width="112"
            height="52"
            fill="#0F1013"
            stroke="#EDEAE2"
            strokeOpacity="0.22"
          />
          <text
            x="72"
            y="105"
            textAnchor="middle"
            className="fill-[#EDEAE2] font-mono text-[9px]"
          >
            {spec.input.title}
          </text>
          <text
            x="72"
            y="120"
            textAnchor="middle"
            className="fill-[#9A968E] font-mono text-[7.8px]"
          >
            {spec.input.sub}
          </text>

          <rect
            x="176"
            y="72"
            width="150"
            height="72"
            fill="#0F1013"
            stroke="#FF4D00"
            strokeWidth="1.4"
          />
          <circle cx="187" cy="84" r="2" fill="#FF4D00" />
          <text
            x="251"
            y="105"
            textAnchor="middle"
            className="fill-[#FF8A4C] font-mono text-[9.5px]"
          >
            {spec.hub.title}
          </text>
          <text
            x="251"
            y="122"
            textAnchor="middle"
            className="fill-[#EDEAE2] font-mono text-[8px]"
          >
            {spec.hub.sub}
          </text>

          <SvgBottomMetrics items={spec.metrics} />
        </svg>
      </div>
      <TerminalStrip command={spec.command} />
    </div>
  );
}

function BlackHoleSchematic() {
  const cx = 280;
  const cy = 108;

  return (
    <div className="absolute inset-0 flex flex-col justify-between bg-[#07080A] dot-matrix">
      <div className="relative flex-1 flex items-center justify-center overflow-hidden p-3 sm:p-4">
        <svg
          data-schematic-canvas
          viewBox="0 0 560 220"
          className="w-full h-full max-h-[220px]"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="kerrObsGlow" cx="48%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FF4D00" stopOpacity="0.32" />
              <stop offset="55%" stopColor="#FF8A4C" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#07080A" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="dopplerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#EDEAE2" stopOpacity="0.92" />
              <stop offset="38%" stopColor="#FF8A4C" stopOpacity="0.85" />
              <stop offset="75%" stopColor="#FF4D00" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#FF4D00" stopOpacity="0.15" />
            </linearGradient>
          </defs>

          <SvgHudHeader
            left="Black Hole · [Kerr · Spin 0.90M] · r = 8.40 r_s"
            right="Doppler: Phys · ZAMO 1.39x · 60 FPS"
          />

          <circle cx={cx} cy={cy} r="94" fill="url(#kerrObsGlow)" />

          {/* Upper and Lower Gravitational Lensed Einstein Halos */}
          <path
            d={`M ${cx - 106} ${cy} C ${cx - 68} ${cy - 4}, ${cx - 56} ${cy - 62}, ${cx} ${cy - 62} C ${cx + 56} ${cy - 62}, ${cx + 68} ${cy - 4}, ${cx + 106} ${cy}`}
            fill="none"
            stroke="url(#dopplerGrad)"
            strokeWidth="1.6"
          />
          <path
            d={`M ${cx - 92} ${cy} C ${cx - 58} ${cy - 4}, ${cx - 48} ${cy - 51}, ${cx} ${cy - 51} C ${cx + 48} ${cy - 51}, ${cx + 58} ${cy - 4}, ${cx + 92} ${cy}`}
            fill="none"
            stroke="#FF8A4C"
            strokeOpacity="0.52"
            strokeWidth="1.1"
            strokeDasharray="4 8"
            className="animate-[flowDash_2.6s_linear_infinite] motion-reduce:animate-none"
          />
          <path
            d={`M ${cx - 78} ${cy + 2} C ${cx - 48} ${cy + 8}, ${cx - 46} ${cy + 52}, ${cx} ${cy + 52} C ${cx + 46} ${cy + 52}, ${cx + 48} ${cy + 8}, ${cx + 78} ${cy + 2}`}
            fill="none"
            stroke="url(#dopplerGrad)"
            strokeOpacity="0.72"
            strokeWidth="1.3"
          />

          {/* Multi-ring Equatorial Accretion Disk */}
          <ellipse
            cx={cx}
            cy={cy + 1}
            rx="126"
            ry="15.5"
            fill="none"
            stroke="url(#dopplerGrad)"
            strokeWidth="1.7"
          />
          <ellipse
            cx={cx}
            cy={cy + 1}
            rx="102"
            ry="11.5"
            fill="none"
            stroke="#FF4D00"
            strokeOpacity="0.58"
            strokeWidth="1.1"
            strokeDasharray="4 8"
            className="animate-[flowDash_2.4s_linear_infinite] motion-reduce:animate-none"
          />
          <ellipse
            cx={cx}
            cy={cy + 1}
            rx="78"
            ry="8.5"
            fill="none"
            stroke="#EDEAE2"
            strokeOpacity="0.28"
            strokeWidth="0.9"
          />

          {/* Photon Sphere Ring & Dark Event Horizon Core */}
          <circle
            cx={cx}
            cy={cy}
            r="36"
            fill="none"
            stroke="#FF8A4C"
            strokeOpacity="0.55"
            strokeWidth="1"
            strokeDasharray="2 4"
          />
          <circle
            cx={cx}
            cy={cy}
            r="29"
            fill="#050608"
            stroke="#EDEAE2"
            strokeOpacity="0.32"
            strokeWidth="1"
          />

          <SvgBottomMetrics
            items={[
              "[M] Half-Block/ASCII",
              "[K] Kerr/Lite · [V] Doppler",
              "[E] Hawking Evap · [Z] Zen Dive",
            ]}
          />
        </svg>
      </div>
      <TerminalStrip command="$ cargo run --release -- --spin 0.90" />
    </div>
  );
}

function SolarSystemSchematic({ lines }: { lines?: string[] }) {
  const cx = 280;
  const cy = 108;
  const ticks = Array.from({ length: 12 }, (_, i) => (i * 30 * Math.PI) / 180);

  return (
    <div className="absolute inset-0 flex flex-col justify-between bg-[#07080A] dot-matrix">
      <div className="relative flex-1 flex items-center justify-center overflow-hidden p-3 sm:p-4">
        <svg
          data-schematic-canvas
          viewBox="0 0 560 220"
          className="w-full h-full max-h-[220px]"
          aria-hidden="true"
        >
          <SvgHudHeader
            left="AstroEngine · Solar System › Saturn · 285000 km"
            right="Half-Block (HD) · LIVE (1.0x) · 600 FPS"
          />

          {/* Outer Observatory Azimuthal Graduated Ring */}
          <circle
            cx={cx}
            cy={cy}
            r="78"
            fill="none"
            stroke="#EDEAE2"
            strokeOpacity="0.14"
            strokeWidth="1"
          />
          {ticks.map((rad, i) => {
            const x1 = Number((cx + Math.cos(rad) * 75).toFixed(2));
            const y1 = Number((cy + Math.sin(rad) * 75).toFixed(2));
            const x2 = Number((cx + Math.cos(rad) * 81).toFixed(2));
            const y2 = Number((cy + Math.sin(rad) * 81).toFixed(2));
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#EDEAE2"
                strokeOpacity="0.3"
                strokeWidth="1"
              />
            );
          })}
          <line
            x1={cx - 86}
            y1={cy}
            x2={cx + 86}
            y2={cy}
            stroke="#EDEAE2"
            strokeOpacity="0.08"
            strokeDasharray="2 4"
          />
          <line
            x1={cx}
            y1={cy - 82}
            x2={cx}
            y2={cy + 82}
            stroke="#EDEAE2"
            strokeOpacity="0.08"
            strokeDasharray="2 4"
          />

          {/* Sun Core */}
          <circle cx={cx} cy={cy} r="7.5" fill="#FF4D00" />
          <circle
            cx={cx}
            cy={cy}
            r="12"
            fill="none"
            stroke="#FF8A4C"
            strokeOpacity="0.32"
            strokeWidth="1"
          />

          {/* 5 Concentric Circular Orbits */}
          <circle cx={cx} cy={cy} r="20" fill="none" stroke="#EDEAE2" strokeOpacity="0.18" strokeWidth="1" />
          <circle cx={cx} cy={cy} r="33" fill="none" stroke="#EDEAE2" strokeOpacity="0.22" strokeWidth="1" />
          <circle
            cx={cx}
            cy={cy}
            r="46"
            fill="none"
            stroke="#FF8A4C"
            strokeOpacity="0.38"
            strokeWidth="2.8"
            strokeDasharray="1 4"
          />
          <circle cx={cx} cy={cy} r="59" fill="none" stroke="#EDEAE2" strokeOpacity="0.22" strokeWidth="1" />
          <circle cx={cx} cy={cy} r="71" fill="none" stroke="#EDEAE2" strokeOpacity="0.26" strokeWidth="1" strokeDasharray="3 3" />

          {/* Orbiting Bodies Locked to Circular Tracks */}
          <g>
            <circle cx={cx + 20} cy={cy} r="2.2" fill="#EDEAE2" />
            <animateTransform
              attributeName="transform"
              type="rotate"
              from={`0 ${cx} ${cy}`}
              to={`360 ${cx} ${cy}`}
              dur="10s"
              repeatCount="indefinite"
            />
          </g>

          <g>
            <circle cx={cx + 33} cy={cy} r="2.8" fill="#EDEAE2" />
            <circle cx={cx + 33} cy={cy} r="6" fill="none" stroke="#9A968E" strokeOpacity="0.35" strokeWidth="0.7" />
            <circle cx={cx + 39} cy={cy} r="1.1" fill="#9A968E" />
            <animateTransform
              attributeName="transform"
              type="rotate"
              from={`140 ${cx} ${cy}`}
              to={`500 ${cx} ${cy}`}
              dur="18s"
              repeatCount="indefinite"
            />
          </g>

          <g>
            <circle cx={cx + 59} cy={cy} r="4.2" fill="#FF8A4C" />
            <circle cx={cx + 59} cy={cy} r="8" fill="none" stroke="#FF8A4C" strokeOpacity="0.4" strokeDasharray="1 2" />
            <animateTransform
              attributeName="transform"
              type="rotate"
              from={`235 ${cx} ${cy}`}
              to={`595 ${cx} ${cy}`}
              dur="28s"
              repeatCount="indefinite"
            />
          </g>

          <g>
            <g transform={`translate(${cx + 71}, ${cy})`}>
              <ellipse
                cx="0"
                cy="0"
                rx="13"
                ry="3.8"
                transform="rotate(-18)"
                fill="none"
                stroke="#FF8A4C"
                strokeOpacity="0.85"
                strokeWidth="1.2"
              />
              <circle cx="0" cy="0" r="4.5" fill="#0F1013" stroke="#EDEAE2" strokeWidth="1.1" />
            </g>
            <animateTransform
              attributeName="transform"
              type="rotate"
              from={`325 ${cx} ${cy}`}
              to={`685 ${cx} ${cy}`}
              dur="42s"
              repeatCount="indefinite"
            />
          </g>

          <SvgBottomMetrics
            items={[
              "[1-9] Target Body",
              "[B] Half-Block/ASCII · [O] Orbits",
              "[V] Venus SAR · [Space] Time Warp",
            ]}
          />
        </svg>
      </div>
      <TerminalStrip command={lines?.[0]} />
    </div>
  );
}

function FinAISchematic({ lines }: { lines?: string[] }) {
  const outputs = [
    { title: "MongoDB 7.0 (NoSQL)", sub: "24h TTL Cache · <15ms Hit", y: 42 },
    { title: "Gemini BYOK · SSE Stream", sub: "11 JSON Categories · CFP® AI", y: 88 },
    { title: "Next.js 16 · React 19", sub: "TanStack Query · 434 Tests", y: 134 },
  ];

  return (
    <div className="absolute inset-0 flex flex-col justify-between bg-[#07080A] dot-matrix">
      <div className="relative flex-1 flex items-center justify-center p-3 sm:p-4">
        <svg
          data-schematic-canvas
          viewBox="0 0 560 220"
          className="w-full h-full max-h-[220px]"
          aria-hidden="true"
        >
          <SvgHudHeader
            left="FINAI // SPEC-KIT SDD · 17 SPECS · LGPD ZERO-PII"
            right="BYOK AES-256-GCM · -95% TOKENS · 434 TESTS"
          />

          {/* Column 1: Ingest & Privacy Gate */}
          <rect
            x="16"
            y="44"
            width="124"
            height="42"
            fill="#0F1013"
            stroke="#EDEAE2"
            strokeOpacity="0.22"
          />
          <text
            x="78"
            y="61"
            textAnchor="middle"
            className="fill-[#EDEAE2] font-mono text-[8.8px]"
          >
            OFX SGML / CSV
          </text>
          <text
            x="78"
            y="75"
            textAnchor="middle"
            className="fill-[#9A968E] font-mono text-[7.4px]"
          >
            UTF-8 · Win-1252 Parser
          </text>

          <line
            x1="78"
            y1="86"
            x2="78"
            y2="106"
            stroke="#EDEAE2"
            strokeOpacity="0.22"
            strokeWidth="1"
          />
          <line
            x1="78"
            y1="86"
            x2="78"
            y2="106"
            stroke="#FF4D00"
            strokeOpacity="0.8"
            strokeWidth="1.3"
            strokeDasharray="4 8"
            className="animate-[flowDash_2.4s_linear_infinite] motion-reduce:animate-none"
          />

          <rect
            x="16"
            y="106"
            width="124"
            height="44"
            fill="#0F1013"
            stroke="#FF8A4C"
            strokeOpacity="0.55"
          />
          <text
            x="78"
            y="124"
            textAnchor="middle"
            className="fill-[#FF8A4C] font-mono text-[8.8px]"
          >
            LGPD SANITIZER
          </text>
          <text
            x="78"
            y="139"
            textAnchor="middle"
            className="fill-[#EDEAE2] font-mono text-[7.4px]"
          >
            CPF/CNPJ Purge · Dedup
          </text>

          {/* Connector Col 1 -> Col 2 */}
          <path
            d="M 140 128 C 157 128 157 108 174 108"
            fill="none"
            stroke="#EDEAE2"
            strokeOpacity="0.22"
            strokeWidth="1"
          />
          <path
            d="M 140 128 C 157 128 157 108 174 108"
            fill="none"
            stroke="#FF4D00"
            strokeOpacity="0.8"
            strokeWidth="1.4"
            strokeDasharray="4 8"
            className="animate-[flowDash_2.4s_linear_infinite] motion-reduce:animate-none"
          />

          {/* Column 2: Fastify 4 SDD Kernel */}
          <rect
            x="174"
            y="44"
            width="164"
            height="126"
            fill="#0F1013"
            stroke="#FF4D00"
            strokeWidth="1.4"
          />
          <circle cx="186" cy="57" r="2" fill="#FF4D00" />
          <text
            x="260"
            y="60"
            textAnchor="middle"
            className="fill-[#FF8A4C] font-mono text-[8.8px]"
          >
            FASTIFY 4 · SDD KERNEL
          </text>
          <line
            x1="184"
            y1="68"
            x2="328"
            y2="68"
            stroke="#EDEAE2"
            strokeOpacity="0.12"
          />

          <rect
            x="184"
            y="75"
            width="144"
            height="38"
            fill="#0A0B0D"
            stroke="#EDEAE2"
            strokeOpacity="0.18"
          />
          <text
            x="256"
            y="90"
            textAnchor="middle"
            className="fill-[#EDEAE2] font-mono text-[8px]"
          >
            BYOK Vault · AES-256-GCM
          </text>
          <text
            x="256"
            y="103"
            textAnchor="middle"
            className="fill-[#9A968E] font-mono text-[7.1px]"
          >
            12B IV · 16B Tag · RAM Only
          </text>

          <rect
            x="184"
            y="121"
            width="144"
            height="38"
            fill="#0A0B0D"
            stroke="#EDEAE2"
            strokeOpacity="0.18"
          />
          <text
            x="256"
            y="136"
            textAnchor="middle"
            className="fill-[#EDEAE2] font-mono text-[8px]"
          >
            SHA-256 StateHash Engine
          </text>
          <text
            x="256"
            y="149"
            textAnchor="middle"
            className="fill-[#9A968E] font-mono text-[7.1px]"
          >
            Merchant Dedup · -95% Tokens
          </text>

          {/* Column 3: Persistence, AI Stream & Client */}
          {outputs.map((out) => {
            const targetY = out.y + 19;
            const pathD = `M 338 108 C 358 108 358 ${targetY} 376 ${targetY}`;
            return (
              <g key={out.title}>
                <path
                  d={pathD}
                  fill="none"
                  stroke="#EDEAE2"
                  strokeOpacity="0.18"
                  strokeWidth="1"
                />
                <path
                  d={pathD}
                  fill="none"
                  stroke="#FF8A4C"
                  strokeOpacity="0.7"
                  strokeWidth="1.3"
                  strokeDasharray="4 8"
                  className="animate-[flowDash_2.4s_linear_infinite] motion-reduce:animate-none"
                />
                <rect
                  x="376"
                  y={out.y}
                  width="168"
                  height="38"
                  fill="#0F1013"
                  stroke="#EDEAE2"
                  strokeOpacity="0.22"
                />
                <text
                  x="388"
                  y={out.y + 16}
                  className="fill-[#EDEAE2] font-mono text-[8.8px]"
                >
                  {out.title}
                </text>
                <text
                  x="388"
                  y={out.y + 29}
                  className="fill-[#9A968E] font-mono text-[7.5px]"
                >
                  {out.sub}
                </text>
              </g>
            );
          })}

          <SvgBottomMetrics
            items={[
              "INGEST: OFX/CSV -> LGPD REGEX",
              "CACHE: SHA-256 + 24H TTL (<15MS)",
              "VITEST: 434 PASSED (89 FILES)",
            ]}
          />
        </svg>
      </div>
      <TerminalStrip command={lines?.[0] ?? "$ spec-kit --verify finai"} />
    </div>
  );
}

type ProjectKind = "black-hole" | "solar-system" | "abnt-mcp" | "furia" | "finai";

function resolveProjectKind(title: string): ProjectKind {
  const normalized = title.toLowerCase();
  if (normalized.includes("black hole")) return "black-hole";
  if (normalized.includes("solar system")) return "solar-system";
  if (normalized.includes("abnt")) return "abnt-mcp";
  if (normalized.includes("furia")) return "furia";
  return "finai";
}

export function ProjectSchematic({ project, viewMode }: SchematicProps) {
  if (viewMode === "capture" && project.image) {
    return (
      <div className="absolute inset-0 overflow-hidden bg-[#050608]">
        <Image
          src={project.image}
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          alt={project.title}
          className="object-cover"
        />
      </div>
    );
  }

  switch (resolveProjectKind(project.title)) {
    case "black-hole":
      return <BlackHoleSchematic />;
    case "solar-system":
      return <SolarSystemSchematic lines={project.terminalPreview} />;
    case "abnt-mcp":
      return (
        <ArchitectureBlueprint
          spec={{
            systemTag: "ABNT_MCP // SPEC-DRIVEN ENGINE",
            perfTag: "80 TESTS PASSED · 87% COV",
            input: { title: "AI CLIENT", sub: "JSON-RPC STDIO" },
            hub: { title: "FASTMCP 4.1.3", sub: "19 TOOLS · 8 RES" },
            outputs: [
              { title: "pillars/diagnostics.py", sub: "NBR 14724 / 6022 Audit" },
              { title: "pillars/writing.py", sub: "NBR 10520:23 · IBGE 1993" },
              { title: "pillars/compiler.py", sub: "Rust Typst + abnTeX2 PDF" },
            ],
            metrics: [
              "SPEC: abnt.spec.json",
              "APIS: CROSSREF + SCIELO",
              "BANCASIM: ADVISORY.PY",
            ],
            command: project.terminalPreview?.[0],
          }}
        />
      );
    case "furia":
      return (
        <ArchitectureBlueprint
          spec={{
            systemTag: "FURIA_FANBOT // 3-SERVICE DOCKER",
            perfTag: "STATUS: 200 OK · LIVE",
            input: { title: "TELEGRAM BOT", sub: "8 Python Handlers" },
            hub: { title: "FASTIFY REST", sub: "utils/cache.ts TTL" },
            outputs: [
              { title: "team-routes.ts", sub: "Roster & CS2 Overview" },
              { title: "players-routes.ts", sub: "Player Telemetry & Stats" },
              { title: "frontend/ (Next.js)", sub: "furia-fanbot.vercel.app" },
            ],
            metrics: [
              "BOT: /resumo · /matches",
              "ALERTS: match_notification.py",
              "ORCHESTRATION: COMPOSE",
            ],
            command: "$ docker compose up -d [bot-py + fastify-api + next-web]",
          }}
        />
      );
    case "finai":
      return <FinAISchematic lines={project.terminalPreview} />;
  }
}
