export default function MapBackground() {
  return (
    <>
      <defs>
        <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <rect width="60" height="60" fill="#f0ece4" />
        </pattern>
        <pattern id="block" width="1" height="1" patternUnits="objectBoundingBox">
          <rect width="1" height="1" fill="#e8e2d8" />
        </pattern>
      </defs>

      {/* Base do mapa */}
      <rect x="-2000" y="-2000" width="8000" height="8000" fill="#f0ece4" />

      {/* ── CAMPUS PRINCIPAL (área hachurada/cinza claro) ── */}
      <polygon
        points="80,30 520,30 560,80 560,420 480,460 60,460 30,400 30,80"
        fill="#e8e2d6"
        stroke="#d4cdc2"
        strokeWidth="1"
      />

      {/* ── VIAS INTERNAS DO CAMPUS ── */}
      {/* Via horizontal superior (R. Interna) */}
      <rect x="30"  y="68"  width="530" height="22" fill="#ddd7cc" />
      <text x="240" y="82" fontSize="8" fill="#999" fontFamily="system-ui" textAnchor="middle" fontWeight="500">R. interna</text>

      {/* Via diagonal / curva central */}
      <path d="M 200 90 Q 280 140 260 220 Q 240 300 280 380" fill="none" stroke="#ddd7cc" strokeWidth="18" />
      <path d="M 200 90 Q 280 140 260 220 Q 240 300 280 380" fill="none" stroke="#ccc6bb" strokeWidth="1" />

      {/* Via vertical direita */}
      <rect x="390" y="30" width="20" height="200" fill="#ddd7cc" />

      {/* Via horizontal meio */}
      <rect x="30" y="230" width="350" height="18" fill="#ddd7cc" />

      {/* Via curva sul */}
      <path d="M 100 380 Q 200 400 300 390 Q 380 382 420 370" fill="none" stroke="#ddd7cc" strokeWidth="16" />

      {/* Via sul/leste */}
      <rect x="420" y="220" width="18" height="200" fill="#ddd7cc" />
      <rect x="60"  y="380" width="380" height="18" fill="#ddd7cc" />

      {/* ── BLOCOS / EDIFICAÇÕES ── */}
      {/* Bloco N / Unifor Bloco C (centro) */}
      <rect x="200" y="130" width="80"  height="55"  rx="2" fill="#dbd5c8" stroke="#ccc6b8" strokeWidth="0.8" />
      <rect x="210" y="145" width="60"  height="35"  rx="1" fill="#d4cebf" />
      <text x="240" y="162" fontSize="6.5" fill="#888" fontFamily="system-ui" textAnchor="middle">Bloco N</text>

      {/* Biblioteca */}
      <rect x="55"  y="240" width="70"  height="55"  rx="2" fill="#dbd5c8" stroke="#ccc6b8" strokeWidth="0.8" />
      <text x="90"  y="272" fontSize="5.5" fill="#888" fontFamily="system-ui" textAnchor="middle">Biblioteca</text>
      <text x="90"  y="280" fontSize="5.5" fill="#888" fontFamily="system-ui" textAnchor="middle">Central</text>

      {/* Teatro Celina Queiroz */}
      <rect x="55"  y="155" width="65"  height="45"  rx="2" fill="#dbd5c8" stroke="#ccc6b8" strokeWidth="0.8" />
      <text x="88"  y="174" fontSize="5.5" fill="#888" fontFamily="system-ui" textAnchor="middle">Teatro</text>
      <text x="88"  y="182" fontSize="5.5" fill="#888" fontFamily="system-ui" textAnchor="middle">Celina Q.</text>

      {/* Bloco D */}
      <rect x="55"  y="330" width="60"  height="35"  rx="2" fill="#dbd5c8" stroke="#ccc6b8" strokeWidth="0.8" />
      <text x="85"  y="352" fontSize="5.5" fill="#888" fontFamily="system-ui" textAnchor="middle">Bloco D</text>

      {/* Ginásio */}
      <rect x="270" y="310" width="70"  height="50"  rx="3" fill="#d4f0d4" stroke="#b8ddb8" strokeWidth="0.8" />
      <text x="305" y="338" fontSize="5.5" fill="#6a9" fontFamily="system-ui" textAnchor="middle">Ginásio</text>

      {/* Estádio (elipse) */}
      <ellipse cx="460" cy="290" rx="50" ry="30" fill="#c8e8c0" stroke="#a8d0a0" strokeWidth="0.8" />
      <text x="460" y="292" fontSize="5.5" fill="#5a8a5a" fontFamily="system-ui" textAnchor="middle">Estádio</text>

      {/* Academia */}
      <rect x="430" y="340" width="50"  height="28"  rx="2" fill="#dbd5c8" stroke="#ccc6b8" strokeWidth="0.8" />
      <text x="455" y="358" fontSize="5.5" fill="#888" fontFamily="system-ui" textAnchor="middle">Academia</text>

      {/* Embarque/Desembarque */}
      <rect x="30"  y="330" width="55"  height="30"  rx="2" fill="#dbd5c8" stroke="#ccc6b8" strokeWidth="0.8" />
      <text x="58"  y="346" fontSize="5"  fill="#888" fontFamily="system-ui" textAnchor="middle">Embarque</text>
      <text x="58"  y="353" fontSize="5"  fill="#888" fontFamily="system-ui" textAnchor="middle">Desembarque</text>

      {/* Área verde lateral direita */}
      <rect x="500" y="90"  width="55"  height="120" rx="4" fill="#d8ecc8" stroke="#b8d8a0" strokeWidth="0.8" />

      {/* ── LABELS DO MAPA ── */}
      <text x="310" y="220" fontSize="10" fontWeight="700" fill="#b0a898" fontFamily="system-ui" textAnchor="middle">UNIFOR</text>
      <text x="310" y="232" fontSize="7"  fill="#b0a898" fontFamily="system-ui" textAnchor="middle">Universidade de Fortaleza</text>

      <text x="460" y="148" fontSize="7"  fill="#999" fontFamily="system-ui" textAnchor="middle" fontWeight="600">UNIFOR –</text>
      <text x="460" y="158" fontSize="6"  fill="#999" fontFamily="system-ui" textAnchor="middle">Estac. Geral</text>

      {/* Símbolo P (estacionamento) */}
      {[[130, 150], [390, 380]].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="9" fill="#9b59b6" opacity="0.85" />
          <text x={cx} y={cy+3} fontSize="9" fontWeight="700" fill="white" fontFamily="system-ui" textAnchor="middle">P</text>
        </g>
      ))}
    </>
  )
}