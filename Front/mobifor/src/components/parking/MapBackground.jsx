// Fundo SVG estilo mapa neutro — quadras, vias, calçadas, vegetação
export default function MapBackground() {
  return (
    <>
      <defs>
        {/* Textura sutil de calçada */}
        <pattern id="sidewalk" width="12" height="12" patternUnits="userSpaceOnUse">
          <rect width="12" height="12" fill="#e2ddd4" />
          <rect width="6"  height="6"  fill="#ddd8cf" />
          <rect x="6" y="6" width="6" height="6" fill="#ddd8cf" />
        </pattern>
        {/* Textura de grama */}
        <pattern id="grass" width="8" height="8" patternUnits="userSpaceOnUse">
          <rect width="8" height="8" fill="#c8d8a8" />
          <circle cx="2" cy="3" r="1" fill="#b8cc95" opacity="0.6" />
          <circle cx="6" cy="6" r="1" fill="#b8cc95" opacity="0.6" />
        </pattern>
        {/* Textura de asfalto */}
        <pattern id="road" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="20" height="20" fill="#c9c3b8" />
          <rect width="20" height="20" fill="#c5bfb4" opacity="0.5" />
        </pattern>
      </defs>

      {/* Canvas base */}
      <rect x="-2000" y="-2000" width="6000" height="6000" fill="#ede8df" />

      {/* ── VIAS PRINCIPAIS ────────────────────────────── */}

      {/* Via horizontal norte */}
      <rect x="-200" y="0" width="900" height="52" fill="url(#road)" />
      <rect x="-200" y="0" width="900" height="52" fill="#b8b2a6" opacity="0.3" />
      {/* faixa central */}
      <line x1="-200" y1="26" x2="700" y2="26"
        stroke="#d6d0c4" strokeWidth="1.5" strokeDasharray="18 10" />
      {/* meio-fio norte */}
      <rect x="-200" y="0"  width="900" height="3" fill="#cac4b8" />
      <rect x="-200" y="49" width="900" height="3" fill="#cac4b8" />

      {/* Via horizontal sul */}
      <rect x="-200" y="390" width="900" height="52" fill="url(#road)" />
      <rect x="-200" y="390" width="900" height="52" fill="#b8b2a6" opacity="0.3" />
      <line x1="-200" y1="416" x2="700" y2="416"
        stroke="#d6d0c4" strokeWidth="1.5" strokeDasharray="18 10" />
      <rect x="-200" y="390" width="900" height="3" fill="#cac4b8" />
      <rect x="-200" y="439" width="900" height="3" fill="#cac4b8" />

      {/* Via vertical oeste */}
      <rect x="-200" y="-200" width="52" height="900" fill="url(#road)" />
      <rect x="-200" y="-200" width="52" height="900" fill="#b8b2a6" opacity="0.3" />
      <line x1="-174" y1="-200" x2="-174" y2="700"
        stroke="#d6d0c4" strokeWidth="1.5" strokeDasharray="18 10" />
      <rect x="-200" y="-200" width="3"  height="900" fill="#cac4b8" />
      <rect x="-151" y="-200" width="3"  height="900" fill="#cac4b8" />

      {/* Via vertical leste */}
      <rect x="448" y="-200" width="52" height="900" fill="url(#road)" />
      <rect x="448" y="-200" width="52" height="900" fill="#b8b2a6" opacity="0.3" />
      <line x1="474" y1="-200" x2="474" y2="700"
        stroke="#d6d0c4" strokeWidth="1.5" strokeDasharray="18 10" />
      <rect x="448" y="-200" width="3"  height="900" fill="#cac4b8" />
      <rect x="497" y="-200" width="3"  height="900" fill="#cac4b8" />

      {/* Via horizontal central (separa setores A/B de C/D) */}
      <rect x="-200" y="198" width="900" height="40" fill="url(#road)" />
      <rect x="-200" y="198" width="900" height="40" fill="#b8b2a6" opacity="0.25" />
      <line x1="-200" y1="218" x2="700" y2="218"
        stroke="#d6d0c4" strokeWidth="1" strokeDasharray="14 8" />
      <rect x="-200" y="198" width="900" height="2" fill="#cac4b8" />
      <rect x="-200" y="236" width="900" height="2" fill="#cac4b8" />

      {/* ── QUADRAS / CALÇADAS ─────────────────────────── */}

      {/* Quadra noroeste */}
      <rect x="-148" y="52" width="596" height="146" fill="url(#sidewalk)" />
      {/* borda interna quadra NW */}
      <rect x="-148" y="52"  width="596" height="4" fill="#d8d3ca" />
      <rect x="-148" y="194" width="596" height="4" fill="#d8d3ca" />

      {/* Quadra sudoeste */}
      <rect x="-148" y="238" width="596" height="152" fill="url(#sidewalk)" />
      <rect x="-148" y="238" width="596" height="4" fill="#d8d3ca" />
      <rect x="-148" y="386" width="596" height="4" fill="#d8d3ca" />

      {/* ── ÁREA DE ESTACIONAMENTO (fundo diferente) ───── */}
      <rect x="20"  y="60"  width="260" height="132" rx="3" fill="#dbd5cc" />
      <rect x="320" y="60"  width="128" height="132" rx="3" fill="#dbd5cc" />
      <rect x="20"  y="248" width="260" height="132" rx="3" fill="#dbd5cc" />
      <rect x="320" y="248" width="128" height="132" rx="3" fill="#dbd5cc" />

      {/* ── VEGETAÇÃO / CANTEIROS ──────────────────────── */}

      {/* Canteiros quadra NW */}
      <rect x="-100" y="70"  width="60" height="40" rx="3" fill="url(#grass)" />
      <rect x="-100" y="70"  width="60" height="40" rx="3" fill="#b5ca8a" opacity="0.4" />
      <rect x="-100" y="145" width="60" height="40" rx="3" fill="url(#grass)" />
      <rect x="-100" y="145" width="60" height="40" rx="3" fill="#b5ca8a" opacity="0.4" />

      {/* Árvores (círculos estilizados) */}
      {[
        [-80, 90], [-80, 165], [420, 90], [420, 165],
        [-80, 260], [-80, 340], [420, 260], [420, 340],
      ].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="12" fill="#a8c070" opacity="0.7" />
          <circle cx={cx} cy={cy} r="8"  fill="#96b45a" opacity="0.8" />
          <circle cx={cx} cy={cy} r="3"  fill="#7a9a42" opacity="0.6" />
        </g>
      ))}

      {/* Canteiros sul */}
      <rect x="-100" y="255" width="60" height="40" rx="3" fill="url(#grass)" />
      <rect x="-100" y="255" width="60" height="40" rx="3" fill="#b5ca8a" opacity="0.4" />
      <rect x="-100" y="330" width="60" height="40" rx="3" fill="url(#grass)" />
      <rect x="-100" y="330" width="60" height="40" rx="3" fill="#b5ca8a" opacity="0.4" />

      {/* ── NOME DAS VIAS ──────────────────────────────── */}
      {[
        { x: 80,  y: 22,  text: "Av. Principal",    rotate: 0   },
        { x: 80,  y: 410, text: "Rua dos Estudantes", rotate: 0 },
        { x: -188, y: 200, text: "R. Lateral",       rotate: -90 },
        { x: 460,  y: 200, text: "R. Leste",         rotate: -90 },
        { x: 100,  y: 215, text: "Via Interna",      rotate: 0   },
      ].map((l, i) => (
        <text
          key={i}
          x={l.x} y={l.y}
          fontSize="7.5"
          fontWeight="500"
          fill="#a09880"
          fontFamily="system-ui, sans-serif"
          letterSpacing="0.5"
          transform={l.rotate ? `rotate(${l.rotate}, ${l.x}, ${l.y})` : undefined}
          textAnchor="middle"
        >
          {l.text}
        </text>
      ))}

      {/* ── LABELS DOS SETORES ─────────────────────────── */}
      {[
        { x: 22,  y: 57,  text: "SETOR A" },
        { x: 322, y: 57,  text: "SETOR B" },
        { x: 22,  y: 245, text: "SETOR C" },
        { x: 322, y: 245, text: "SETOR D" },
      ].map(l => (
        <text
          key={l.text} x={l.x} y={l.y}
          fontSize="7" fontWeight="700"
          fill="#9c9485"
          fontFamily="system-ui, sans-serif"
          letterSpacing="1.8"
        >
          {l.text}
        </text>
      ))}
    </>
  )
}