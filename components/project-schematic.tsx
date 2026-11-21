"use client";

export type ProjectPreviewData = {
  title: string;
  image?: string;
  terminalPreview?: string[];
  period: string;
};

type SchematicProps = {
  project: ProjectPreviewData;
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
    {
      title: "Dashboard & Patrimônio",
      sub: "KPIs · Carteira · Multi-Mês",
      y: 42,
    },
    {
      title: "Consultor IA CFP® (SSE)",
      sub: "Diagnóstico & Chat Tempo Real",
      y: 88,
    },
    {
      title: "Metas & Módulo Fiscal",
      sub: "11 Categorias · IRPF & PJ",
      y: 134,
    },
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
            left="FINAI // FINANCIAL INTELLIGENCE & WEALTH · SDD"
            right="BYOK AES-256-GCM · LGPD ZERO-PII · 434 TESTS"
          />

          {/* Column 1: Statement Ingestion & LGPD Privacy */}
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
            className="fill-[#EDEAE2] font-mono text-[8.5px]"
          >
            EXTRATOS OFX / CSV
          </text>
          <text
            x="78"
            y="75"
            textAnchor="middle"
            className="fill-[#9A968E] font-mono text-[7.3px]"
          >
            Importação &amp; Conciliação
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
            className="fill-[#FF8A4C] font-mono text-[8.5px]"
          >
            ANONIMIZADOR LGPD
          </text>
          <text
            x="78"
            y="139"
            textAnchor="middle"
            className="fill-[#EDEAE2] font-mono text-[7.3px]"
          >
            CPF/CNPJ Purge · Zero-PII
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

          {/* Column 2: FinAI Intelligence Engine with Visual Cashflow Telemetry */}
          <rect
            x="174"
            y="42"
            width="164"
            height="130"
            fill="#0F1013"
            stroke="#FF4D00"
            strokeWidth="1.4"
          />
          <circle cx="185" cy="54" r="2" fill="#FF4D00" />
          <text
            x="260"
            y="57"
            textAnchor="middle"
            className="fill-[#FF8A4C] font-mono text-[8.4px]"
          >
            FINAI ENGINE · GEMINI BYOK
          </text>
          <line
            x1="183"
            y1="64"
            x2="329"
            y2="64"
            stroke="#EDEAE2"
            strokeOpacity="0.12"
          />

          {/* Visual Cashflow & Savings Chart Box */}
          <rect
            x="183"
            y="70"
            width="146"
            height="58"
            fill="#0A0B0D"
            stroke="#EDEAE2"
            strokeOpacity="0.18"
          />
          <text x="190" y="81" className="fill-[#9A968E] font-mono text-[6.8px]">
            FLUXO &amp; POUPANÇA
          </text>
          <text
            x="322"
            y="81"
            textAnchor="end"
            className="fill-[#FF8A4C] font-mono text-[6.8px]"
          >
            +34.2% SAVED
          </text>
          <line
            x1="190"
            y1="114"
            x2="322"
            y2="114"
            stroke="#EDEAE2"
            strokeOpacity="0.1"
            strokeDasharray="2 2"
          />
          <path
            d="M 190 112 Q 222 106 254 109 T 322 104"
            fill="none"
            stroke="#9A968E"
            strokeOpacity="0.45"
            strokeWidth="1"
          />
          <path
            d="M 190 110 C 215 106, 235 95, 262 96 C 285 97, 302 85, 322 86"
            fill="none"
            stroke="#FF4D00"
            strokeWidth="1.5"
          />
          <circle cx="262" cy="96" r="1.8" fill="#FF8A4C" />
          <circle cx="322" cy="86" r="2.2" fill="#FF4D00" />
          <rect x="190" y="120" width="56" height="2.5" fill="#FF4D00" />
          <rect x="249" y="120" width="42" height="2.5" fill="#FF8A4C" />
          <rect
            x="294"
            y="120"
            width="28"
            height="2.5"
            fill="#EDEAE2"
            fillOpacity="0.45"
          />

          {/* Security & Cache Telemetry Strip */}
          <rect
            x="183"
            y="134"
            width="146"
            height="30"
            fill="#0A0B0D"
            stroke="#EDEAE2"
            strokeOpacity="0.18"
          />
          <text
            x="256"
            y="146"
            textAnchor="middle"
            className="fill-[#EDEAE2] font-mono text-[7.8px]"
          >
            BYOK Vault · AES-256-GCM
          </text>
          <text
            x="256"
            y="158"
            textAnchor="middle"
            className="fill-[#9A968E] font-mono text-[7px]"
          >
            Cache 24h · -95% Tokens (&lt;15ms)
          </text>

          {/* Column 3: Product Modules */}
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
                  className="fill-[#EDEAE2] font-mono text-[8.6px]"
                >
                  {out.title}
                </text>
                <text
                  x="388"
                  y={out.y + 29}
                  className="fill-[#9A968E] font-mono text-[7.3px]"
                >
                  {out.sub}
                </text>
              </g>
            );
          })}

          <SvgBottomMetrics
            items={[
              "INGEST: OFX/CSV (LGPD CLEAN)",
              "AI: GEMINI SSE + CACHE 24H",
              "QUALITY: 434 VITEST · 17 SPECS",
            ]}
          />
        </svg>
      </div>
      <TerminalStrip command={lines?.[0] ?? "$ spec-kit --verify finai"} />
    </div>
  );
}

function AbntMcpSchematic({ lines }: { lines?: string[] }) {
  const rules = [
    { y: 70, accent: "#FF4D00", text: "NBR 14724 · Estrutura 3-3-2-2" },
    { y: 94, accent: "#FF4D00", text: "NBR 10520:23 · (Autor, Ano)" },
    { y: 118, accent: "#FF8A4C", text: "NBR 6023 · BibTeX Cross-Audit" },
    { y: 142, accent: "#FF8A4C", text: "IBGE 1993 · Tabelas & BancaSim" },
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
            left="ABNT_MCP // NORMATIVE ACADEMIC COMPILER · FASTMCP 4.1.3"
            right="19 TOOLS · 80 TESTS (87% COV) · TYPST / LATEX"
          />

          {/* Column 1: AI Client & Scientific Index */}
          <rect
            x="16"
            y="44"
            width="124"
            height="54"
            fill="#0F1013"
            stroke="#EDEAE2"
            strokeOpacity="0.22"
          />
          <text
            x="78"
            y="58"
            textAnchor="middle"
            className="fill-[#EDEAE2] font-mono text-[8.2px]"
          >
            CLAUDE / IDE CLIENT
          </text>
          <text
            x="78"
            y="71"
            textAnchor="middle"
            className="fill-[#9A968E] font-mono text-[7.1px]"
          >
            MCP JSON-RPC · stdio
          </text>
          <text
            x="78"
            y="84"
            textAnchor="middle"
            className="fill-[#FF8A4C] font-mono text-[7.1px]"
          >
            19 Tools · 8 Resources
          </text>

          <line
            x1="78"
            y1="98"
            x2="78"
            y2="114"
            stroke="#EDEAE2"
            strokeOpacity="0.22"
            strokeWidth="1"
          />
          <line
            x1="78"
            y1="98"
            x2="78"
            y2="114"
            stroke="#FF4D00"
            strokeOpacity="0.8"
            strokeWidth="1.3"
            strokeDasharray="4 8"
            className="animate-[flowDash_2.4s_linear_infinite] motion-reduce:animate-none"
          />

          <rect
            x="16"
            y="114"
            width="124"
            height="54"
            fill="#0F1013"
            stroke="#EDEAE2"
            strokeOpacity="0.22"
          />
          <text
            x="78"
            y="128"
            textAnchor="middle"
            className="fill-[#EDEAE2] font-mono text-[8.2px]"
          >
            CROSSREF &amp; SCIELO
          </text>
          <text
            x="78"
            y="141"
            textAnchor="middle"
            className="fill-[#9A968E] font-mono text-[7.1px]"
          >
            DOI Lookup · BibTeX Clean
          </text>
          <text
            x="78"
            y="154"
            textAnchor="middle"
            className="fill-[#FF8A4C] font-mono text-[7.1px]"
          >
            abnt.spec.json (SDD)
          </text>

          {/* Connectors Col 1 -> Col 2 */}
          {[71, 141].map((startY) => {
            const d = `M 140 ${startY} C 156 ${startY} 156 108 172 108`;
            return (
              <g key={startY}>
                <path
                  d={d}
                  fill="none"
                  stroke="#EDEAE2"
                  strokeOpacity="0.2"
                  strokeWidth="1"
                />
                <path
                  d={d}
                  fill="none"
                  stroke="#FF4D00"
                  strokeOpacity="0.8"
                  strokeWidth="1.3"
                  strokeDasharray="4 8"
                  className="animate-[flowDash_2.4s_linear_infinite] motion-reduce:animate-none"
                />
              </g>
            );
          })}

          {/* Column 2: Normative Auditor Engine */}
          <rect
            x="172"
            y="42"
            width="168"
            height="130"
            fill="#0F1013"
            stroke="#FF4D00"
            strokeWidth="1.4"
          />
          <circle cx="183" cy="54" r="2" fill="#FF4D00" />
          <text
            x="260"
            y="57"
            textAnchor="middle"
            className="fill-[#FF8A4C] font-mono text-[8.3px]"
          >
            NORMATIVE AUDITOR ENGINE
          </text>
          <line
            x1="181"
            y1="64"
            x2="331"
            y2="64"
            stroke="#EDEAE2"
            strokeOpacity="0.12"
          />

          {rules.map((rule) => (
            <g key={rule.text}>
              <rect
                x="181"
                y={rule.y}
                width="150"
                height="21"
                fill="#0A0B0D"
                stroke="#EDEAE2"
                strokeOpacity="0.16"
              />
              <rect
                x="187"
                y={rule.y + 9}
                width="3"
                height="3"
                fill={rule.accent}
              />
              <text
                x="195"
                y={rule.y + 13}
                className="fill-[#EDEAE2] font-mono text-[7.3px]"
              >
                {rule.text}
              </text>
            </g>
          ))}

          {/* Connector Col 2 -> Col 3 */}
          <line
            x1="340"
            y1="108"
            x2="376"
            y2="108"
            stroke="#EDEAE2"
            strokeOpacity="0.2"
            strokeWidth="1"
          />
          <line
            x1="340"
            y1="108"
            x2="376"
            y2="108"
            stroke="#FF8A4C"
            strokeOpacity="0.8"
            strokeWidth="1.4"
            strokeDasharray="4 8"
            className="animate-[flowDash_2.4s_linear_infinite] motion-reduce:animate-none"
          />

          {/* Column 3: Vector ABNT Academic Page Blueprint */}
          <rect
            x="376"
            y="42"
            width="168"
            height="130"
            fill="#0F1013"
            stroke="#EDEAE2"
            strokeOpacity="0.25"
          />
          <text
            x="384"
            y="54"
            className="fill-[#EDEAE2] font-mono text-[7.5px]"
          >
            A4 // MONOGRAFIA.PDF
          </text>
          <text
            x="536"
            y="54"
            textAnchor="end"
            className="fill-[#FF8A4C] font-mono text-[7.2px]"
          >
            3-3-2-2 CM
          </text>
          <line
            x1="376"
            y1="60"
            x2="544"
            y2="60"
            stroke="#EDEAE2"
            strokeOpacity="0.12"
          />

          {/* Mini A4 Sheet Wireframe */}
          <rect
            x="386"
            y="67"
            width="64"
            height="84"
            fill="#0A0B0D"
            stroke="#EDEAE2"
            strokeOpacity="0.35"
          />
          <rect
            x="394"
            y="75"
            width="50"
            height="70"
            fill="none"
            stroke="#FF4D00"
            strokeOpacity="0.4"
            strokeDasharray="2 2"
          />
          <line
            x1="398"
            y1="82"
            x2="422"
            y2="82"
            stroke="#EDEAE2"
            strokeWidth="1.5"
          />
          {[88, 93, 98].map((lineY) => (
            <line
              key={lineY}
              x1="398"
              y1={lineY}
              x2="438"
              y2={lineY}
              stroke="#9A968E"
              strokeOpacity="0.6"
              strokeWidth="1"
            />
          ))}
          <rect
            x="410"
            y="103"
            width="28"
            height="13"
            fill="#FF4D00"
            fillOpacity="0.15"
            stroke="#FF8A4C"
            strokeWidth="0.8"
          />
          {/* Open IBGE Table Wireframe */}
          {[123, 127, 136].map((rowY) => (
            <line
              key={rowY}
              x1="398"
              y1={rowY}
              x2="438"
              y2={rowY}
              stroke="#EDEAE2"
              strokeOpacity="0.7"
              strokeWidth="0.8"
            />
          ))}
          <line
            x1="418"
            y1="123"
            x2="418"
            y2="136"
            stroke="#EDEAE2"
            strokeOpacity="0.35"
            strokeWidth="0.7"
          />

          {/* Compiler Badges */}
          <rect
            x="458"
            y="67"
            width="78"
            height="26"
            fill="#0A0B0D"
            stroke="#FF4D00"
            strokeOpacity="0.6"
          />
          <text
            x="497"
            y="78"
            textAnchor="middle"
            className="fill-[#FF8A4C] font-mono text-[7.5px]"
          >
            TYPST RUST
          </text>
          <text
            x="497"
            y="88"
            textAnchor="middle"
            className="fill-[#9A968E] font-mono text-[6.7px]"
          >
            Native PDF
          </text>

          <rect
            x="458"
            y="98"
            width="78"
            height="26"
            fill="#0A0B0D"
            stroke="#EDEAE2"
            strokeOpacity="0.18"
          />
          <text
            x="497"
            y="109"
            textAnchor="middle"
            className="fill-[#EDEAE2] font-mono text-[7.5px]"
          >
            abnTeX2
          </text>
          <text
            x="497"
            y="119"
            textAnchor="middle"
            className="fill-[#9A968E] font-mono text-[6.7px]"
          >
            LaTeX 4-Pass
          </text>

          <rect
            x="458"
            y="129"
            width="78"
            height="22"
            fill="#0A0B0D"
            stroke="#EDEAE2"
            strokeOpacity="0.18"
          />
          <text
            x="497"
            y="143"
            textAnchor="middle"
            className="fill-[#FF4D00] font-mono text-[7.2px]"
          >
            0 VIOLATIONS
          </text>

          <text
            x="460"
            y="164"
            textAnchor="middle"
            className="fill-[#9A968E] font-mono text-[6.8px]"
          >
            NBR 14724 · 10520:2023 VERIFIED
          </text>

          <SvgBottomMetrics
            items={[
              "PROTOCOL: MCP STDIO (19 TOOLS)",
              "STANDARDS: ABNT 2023 + IBGE",
              "OUTPUT: TYPST & ABNTEX2 PDF",
            ]}
          />
        </svg>
      </div>
      <TerminalStrip command={lines?.[0] ?? "$ abnt-mcp --transport stdio"} />
    </div>
  );
}

function FuriaSchematic() {
  const bubbles = [
    {
      y: 70,
      stroke: "#FF4D00",
      strokeOpacity: "0.55",
      cmdColor: "fill-[#FF8A4C]",
      cmd: "/proximaspartidas",
      sub: "FURIA vs NAVI · 19:00",
    },
    {
      y: 103,
      stroke: "#EDEAE2",
      strokeOpacity: "0.18",
      cmdColor: "fill-[#EDEAE2]",
      cmd: "/resumo · /stats",
      sub: "Mapas · K/D · Winrate",
    },
    {
      y: 136,
      stroke: "#EDEAE2",
      strokeOpacity: "0.18",
      cmdColor: "fill-[#EDEAE2]",
      cmd: "/elenco · Alertas",
      sub: "Push Match Notification",
    },
  ];

  const players = [
    {
      name: "KSCERATO",
      y: 77,
      barW: 62,
      barColor: "#FF4D00",
      rating: "1.24",
      ratingColor: "fill-[#FF8A4C]",
    },
    {
      name: "yuurih",
      y: 98,
      barW: 57,
      barColor: "#FF8A4C",
      rating: "1.18",
      ratingColor: "fill-[#EDEAE2]",
    },
    {
      name: "FalleN",
      y: 119,
      barW: 51,
      barColor: "#EDEAE2",
      barOpacity: "0.65",
      rating: "1.09",
      ratingColor: "fill-[#9A968E]",
    },
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
            left="FURIA_CS2 // TELEGRAM BOT & ESPORTS FAN HUB"
            right="PYTHON BOT · FASTIFY CACHE · NEXT.JS · DOCKER"
          />

          {/* Column 1: Telegram Bot Console */}
          <rect
            x="16"
            y="42"
            width="136"
            height="130"
            fill="#0F1013"
            stroke="#EDEAE2"
            strokeOpacity="0.22"
          />
          <circle cx="26" cy="54" r="2" fill="#FF8A4C" />
          <text
            x="34"
            y="57"
            className="fill-[#EDEAE2] font-mono text-[8px]"
          >
            TELEGRAM BOT (PY)
          </text>
          <line
            x1="22"
            y1="64"
            x2="146"
            y2="64"
            stroke="#EDEAE2"
            strokeOpacity="0.12"
          />

          {bubbles.map((b) => (
            <g key={b.cmd}>
              <rect
                x="23"
                y={b.y}
                width="122"
                height="29"
                fill="#0A0B0D"
                stroke={b.stroke}
                strokeOpacity={b.strokeOpacity}
              />
              <text
                x="30"
                y={b.y + 12}
                className={`${b.cmdColor} font-mono text-[7.5px]`}
              >
                {b.cmd}
              </text>
              <text
                x="30"
                y={b.y + 23}
                className="fill-[#9A968E] font-mono text-[6.8px]"
              >
                {b.sub}
              </text>
            </g>
          ))}

          {/* Connector Col 1 -> Col 2 */}
          <line
            x1="152"
            y1="108"
            x2="180"
            y2="108"
            stroke="#EDEAE2"
            strokeOpacity="0.2"
            strokeWidth="1"
          />
          <line
            x1="152"
            y1="108"
            x2="180"
            y2="108"
            stroke="#FF4D00"
            strokeOpacity="0.8"
            strokeWidth="1.4"
            strokeDasharray="4 8"
            className="animate-[flowDash_2.4s_linear_infinite] motion-reduce:animate-none"
          />

          {/* Column 2: Fastify REST & Docker Orchestrator */}
          <rect
            x="180"
            y="42"
            width="156"
            height="130"
            fill="#0F1013"
            stroke="#FF4D00"
            strokeWidth="1.4"
          />
          <circle cx="191" cy="54" r="2" fill="#FF4D00" />
          <text
            x="262"
            y="57"
            textAnchor="middle"
            className="fill-[#FF8A4C] font-mono text-[8.3px]"
          >
            FASTIFY REST · CACHE
          </text>
          <line
            x1="188"
            y1="64"
            x2="328"
            y2="64"
            stroke="#EDEAE2"
            strokeOpacity="0.12"
          />

          <rect
            x="189"
            y="72"
            width="138"
            height="42"
            fill="#0A0B0D"
            stroke="#EDEAE2"
            strokeOpacity="0.18"
          />
          <text
            x="258"
            y="88"
            textAnchor="middle"
            className="fill-[#EDEAE2] font-mono text-[8px]"
          >
            In-Memory TTL Cache
          </text>
          <text
            x="258"
            y="102"
            textAnchor="middle"
            className="fill-[#9A968E] font-mono text-[7px]"
          >
            Roster · Matches · Stats API
          </text>

          <rect
            x="189"
            y="120"
            width="138"
            height="42"
            fill="#0A0B0D"
            stroke="#EDEAE2"
            strokeOpacity="0.18"
          />
          <text
            x="258"
            y="136"
            textAnchor="middle"
            className="fill-[#EDEAE2] font-mono text-[8px]"
          >
            Docker Compose Stack
          </text>
          <text
            x="258"
            y="150"
            textAnchor="middle"
            className="fill-[#FF8A4C] font-mono text-[7px]"
          >
            bot-py + fastify + next-web
          </text>

          {/* Connector Col 2 -> Col 3 */}
          <line
            x1="336"
            y1="108"
            x2="364"
            y2="108"
            stroke="#EDEAE2"
            strokeOpacity="0.2"
            strokeWidth="1"
          />
          <line
            x1="336"
            y1="108"
            x2="364"
            y2="108"
            stroke="#FF8A4C"
            strokeOpacity="0.8"
            strokeWidth="1.4"
            strokeDasharray="4 8"
            className="animate-[flowDash_2.4s_linear_infinite] motion-reduce:animate-none"
          />

          {/* Column 3: CS2 Roster Telemetry & Fan Hub */}
          <rect
            x="364"
            y="42"
            width="180"
            height="130"
            fill="#0F1013"
            stroke="#EDEAE2"
            strokeOpacity="0.22"
          />
          <text
            x="374"
            y="57"
            className="fill-[#EDEAE2] font-mono text-[8px]"
          >
            CS2 ROSTER TELEMETRY
          </text>
          <text
            x="536"
            y="57"
            textAnchor="end"
            className="fill-[#FF4D00] font-mono text-[7.5px]"
          >
            LIVE
          </text>
          <line
            x1="372"
            y1="64"
            x2="536"
            y2="64"
            stroke="#EDEAE2"
            strokeOpacity="0.12"
          />

          {players.map((p) => (
            <g key={p.name}>
              <text
                x="374"
                y={p.y + 6}
                className="fill-[#EDEAE2] font-mono text-[7.3px]"
              >
                {p.name}
              </text>
              <rect
                x="426"
                y={p.y}
                width="76"
                height="6"
                fill="#0A0B0D"
              />
              <rect
                x="426"
                y={p.y}
                width={p.barW}
                height="6"
                fill={p.barColor}
                fillOpacity={p.barOpacity ?? "1"}
              />
              <text
                x="536"
                y={p.y + 6}
                textAnchor="end"
                className={`${p.ratingColor} font-mono text-[7.3px]`}
              >
                {p.rating}
              </text>
            </g>
          ))}

          <rect
            x="374"
            y="139"
            width="162"
            height="23"
            fill="#0A0B0D"
            stroke="#EDEAE2"
            strokeOpacity="0.18"
          />
          <text
            x="455"
            y="153"
            textAnchor="middle"
            className="fill-[#FF8A4C] font-mono text-[7.1px]"
          >
            NEXT.JS FAN HUB · VERCEL 200 OK
          </text>

          <SvgBottomMetrics
            items={[
              "BOT: 8 PYTHON HANDLERS",
              "API: FASTIFY + TTL CACHE",
              "WEB: NEXT.JS + DOCKER COMPOSE",
            ]}
          />
        </svg>
      </div>
      <TerminalStrip command="$ docker compose up -d [bot-py + fastify-api + next-web]" />
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

export function ProjectSchematic({ project }: SchematicProps) {
  switch (resolveProjectKind(project.title)) {
    case "black-hole":
      return <BlackHoleSchematic />;
    case "solar-system":
      return <SolarSystemSchematic lines={project.terminalPreview} />;
    case "abnt-mcp":
      return <AbntMcpSchematic lines={project.terminalPreview} />;
    case "furia":
      return <FuriaSchematic />;
    case "finai":
      return <FinAISchematic lines={project.terminalPreview} />;
  }
}
