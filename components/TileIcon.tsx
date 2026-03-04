"use client";

/** 국기 SVG 타일 - 42개국, 미드센추리 모던 스타일 */
export function TileIcon({ type, size = 40 }: { type: number; size?: number }) {
  const s = size;
  const t = (typeof type === "number" && !Number.isNaN(type) ? type : 0) % 42;

  const flags: Record<number, JSX.Element> = {
    0: <FlagKR s={s} />,
    1: <FlagJP s={s} />,
    2: <FlagUS s={s} />,
    3: <FlagUK s={s} />,
    4: <FlagFR s={s} />,
    5: <FlagDE s={s} />,
    6: <FlagIT s={s} />,
    7: <FlagCH s={s} />,
    8: <FlagCA s={s} />,
    9: <FlagBR s={s} />,
    10: <FlagES s={s} />,
    11: <FlagRU s={s} />,
    12: <FlagCN s={s} />,
    13: <FlagIN s={s} />,
    14: <FlagAU s={s} />,
    15: <FlagNL s={s} />,
    16: <FlagSE s={s} />,
    17: <FlagNO s={s} />,
    18: <FlagDK s={s} />,
    19: <FlagBE s={s} />,
    20: <FlagPL s={s} />,
    21: <FlagGR s={s} />,
    22: <FlagPT s={s} />,
    23: <FlagAR s={s} />,
    24: <FlagMX s={s} />,
    25: <FlagTR s={s} />,
    26: <FlagTH s={s} />,
    27: <FlagVN s={s} />,
    28: <FlagID s={s} />,
    29: <FlagSG s={s} />,
    30: <FlagZA s={s} />,
    31: <FlagEG s={s} />,
    32: <FlagNG s={s} />,
    33: <FlagMA s={s} />,
    34: <FlagIE s={s} />,
    35: <FlagFI s={s} />,
    36: <FlagAT s={s} />,
    37: <FlagCZ s={s} />,
    38: <FlagHU s={s} />,
    39: <FlagRO s={s} />,
    40: <FlagUA s={s} />,
    41: <FlagIL s={s} />,
  };

  return flags[t] ?? <FlagKR s={s} />;
}

/* 공통: 직사각형 비율 3:2, 타일 안에 맞춤 */
function FlagBase({ s, children }: { s: number; children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 30 20"
      width={s}
      height={s}
      preserveAspectRatio="xMidYMid meet"
    >
      {children}
    </svg>
  );
}

function FlagKR({ s }: { s: number }) {
  return (
    <FlagBase s={s}>
      <rect width="30" height="20" fill="#fff" />
      <circle cx="15" cy="10" r="6" fill="#c60c30" />
      <path
        fill="#003478"
        d="M15 4l-2.5 2.5 1 3-3-1L7 10l2.5 2.5-1 3 3-1L15 16l2.5-2.5 1-3-3 1L23 10l-2.5-2.5 1-3-3 1L15 4z"
      />
    </FlagBase>
  );
}
function FlagJP({ s }: { s: number }) {
  return (
    <FlagBase s={s}>
      <rect width="30" height="20" fill="#fff" />
      <circle cx="15" cy="10" r="5" fill="#bc002d" />
    </FlagBase>
  );
}
function FlagUS({ s }: { s: number }) {
  return (
    <FlagBase s={s}>
      <rect width="30" height="20" fill="#b22234" />
      {[...Array(7)].map((_, i) => (
        <rect
          key={i}
          y={i * 2.86}
          width="30"
          height="1.43"
          fill={i % 2 ? "#fff" : "none"}
        />
      ))}
      <rect width="12" height="10" fill="#3c3b6e" />
      {[0, 1, 2, 3, 4].map((row) =>
        [0, 1, 2, 3, 4, 5].map((col) => (
          <circle
            key={`${row}-${col}`}
            cx={1.2 + col * 2.4}
            cy={1 + row * 2}
            r="0.5"
            fill="#fff"
          />
        )),
      )}
    </FlagBase>
  );
}
function FlagUK({ s }: { s: number }) {
  return (
    <FlagBase s={s}>
      <rect width="30" height="20" fill="#012169" />
      <path
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        d="M0 0l30 20M30 0L0 20"
      />
      <path
        fill="none"
        stroke="#C8102E"
        strokeWidth="1.2"
        d="M0 0l30 20M30 0L0 20"
      />
      <path fill="none" stroke="#fff" strokeWidth="4" d="M15 0v20M0 10h30" />
      <path fill="none" stroke="#C8102E" strokeWidth="2" d="M15 0v20M0 10h30" />
    </FlagBase>
  );
}
function FlagFR({ s }: { s: number }) {
  return (
    <FlagBase s={s}>
      <rect x="0" width="10" height="20" fill="#002395" />
      <rect x="10" width="10" height="20" fill="#fff" />
      <rect x="20" width="10" height="20" fill="#ED2939" />
    </FlagBase>
  );
}
function FlagDE({ s }: { s: number }) {
  return (
    <FlagBase s={s}>
      <rect y="0" width="30" height="6.67" fill="#000" />
      <rect y="6.67" width="30" height="6.67" fill="#DD0000" />
      <rect y="13.33" width="30" height="6.67" fill="#FFCE00" />
    </FlagBase>
  );
}
function FlagIT({ s }: { s: number }) {
  return (
    <FlagBase s={s}>
      <rect x="0" width="10" height="20" fill="#009246" />
      <rect x="10" width="10" height="20" fill="#fff" />
      <rect x="20" width="10" height="20" fill="#CE2B37" />
    </FlagBase>
  );
}
function FlagCH({ s }: { s: number }) {
  return (
    <FlagBase s={s}>
      <rect width="30" height="20" fill="#FF0000" />
      <path fill="#fff" d="M8 4h14v3H8V4zm-4 5h22v3H4v-3z" />
      <path fill="#fff" d="M4 4h3v12H4V4zm19 0h3v12h-3V4z" />
    </FlagBase>
  );
}
function FlagCA({ s }: { s: number }) {
  return (
    <FlagBase s={s}>
      <rect width="30" height="20" fill="#ff0000" />
      <rect x="10" width="4" height="20" fill="#fff" />
      <path
        fill="#ff0000"
        d="M12 6l1 2 2 0-1.5 1.5.5 2-1.5-1-1.5 1 .5-2L9 10l2 0z"
      />
    </FlagBase>
  );
}
function FlagBR({ s }: { s: number }) {
  return (
    <FlagBase s={s}>
      <rect width="30" height="20" fill="#009739" />
      <path fill="#FEDD00" d="M15 10L5 4l4 6-4 6 10-6-10-6 10 6z" />
      <circle cx="15" cy="10" r="4" fill="#002776" />
    </FlagBase>
  );
}
function FlagES({ s }: { s: number }) {
  return (
    <FlagBase s={s}>
      <rect y="0" width="30" height="6" fill="#AA151B" />
      <rect y="6" width="30" height="8" fill="#F1BF00" />
      <rect y="14" width="30" height="6" fill="#AA151B" />
    </FlagBase>
  );
}
function FlagRU({ s }: { s: number }) {
  return (
    <FlagBase s={s}>
      <rect y="0" width="30" height="6.67" fill="#fff" />
      <rect y="6.67" width="30" height="6.67" fill="#0039A6" />
      <rect y="13.33" width="30" height="6.67" fill="#D52B1E" />
    </FlagBase>
  );
}
function FlagCN({ s }: { s: number }) {
  return (
    <FlagBase s={s}>
      <rect width="30" height="20" fill="#DE2910" />
      <path
        fill="#FFDE00"
        d="M15 4l1 2 2 0-1.5 1.5.5 2-1.5-1-1.5 1 .5-2L13 6l2 0z"
      />
      <path
        fill="#FFDE00"
        d="M15 4l1 2 2 0-1.5 1.5.5 2-1.5-1-1.5 1 .5-2L13 6l2 0z"
        transform="translate(-4, 6) scale(0.35)"
      />
      <path
        fill="#FFDE00"
        d="M15 4l1 2 2 0-1.5 1.5.5 2-1.5-1-1.5 1 .5-2L13 6l2 0z"
        transform="translate(4, 6) scale(0.35)"
      />
      <path
        fill="#FFDE00"
        d="M15 4l1 2 2 0-1.5 1.5.5 2-1.5-1-1.5 1 .5-2L13 6l2 0z"
        transform="translate(-2, 10) scale(0.35)"
      />
      <path
        fill="#FFDE00"
        d="M15 4l1 2 2 0-1.5 1.5.5 2-1.5-1-1.5 1 .5-2L13 6l2 0z"
        transform="translate(2, 10) scale(0.35)"
      />
    </FlagBase>
  );
}
function FlagIN({ s }: { s: number }) {
  return (
    <FlagBase s={s}>
      <rect y="0" width="30" height="6.67" fill="#FF9933" />
      <rect y="6.67" width="30" height="6.67" fill="#fff" />
      <rect y="13.33" width="30" height="6.67" fill="#138808" />
      <circle
        cx="15"
        cy="10"
        r="2.5"
        fill="#000080"
        stroke="#fff"
        strokeWidth="0.5"
      />
    </FlagBase>
  );
}
function FlagAU({ s }: { s: number }) {
  return (
    <FlagBase s={s}>
      <rect width="30" height="20" fill="#00008B" />
      <rect x="10" width="4" height="20" fill="#fff" />
      <rect y="6" width="30" height="4" fill="#fff" />
      <circle cx="15" cy="10" r="5" fill="#fff" />
      <circle cx="15" cy="10" r="3" fill="#00008B" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <path
          key={i}
          fill="#fff"
          d="M15 6l0.4 1.5h1.5l-1.2 0.9 0.4 1.5-1.2-0.9-1.2 0.9 0.4-1.5-1.2-0.9h1.5z"
          transform={`rotate(${i * 60} 15 10)`}
        />
      ))}
    </FlagBase>
  );
}
function FlagNL({ s }: { s: number }) {
  return (
    <FlagBase s={s}>
      <rect y="0" width="30" height="6.67" fill="#AE1C28" />
      <rect y="6.67" width="30" height="6.67" fill="#fff" />
      <rect y="13.33" width="30" height="6.67" fill="#21468B" />
    </FlagBase>
  );
}
function FlagSE({ s }: { s: number }) {
  return (
    <FlagBase s={s}>
      <rect width="30" height="20" fill="#006AA7" />
      <rect x="10" width="4" height="20" fill="#FECC00" />
      <rect y="6" width="30" height="4" fill="#FECC00" />
    </FlagBase>
  );
}
function FlagNO({ s }: { s: number }) {
  return (
    <FlagBase s={s}>
      <rect width="30" height="20" fill="#EF2B2D" />
      <rect x="8" width="4" height="20" fill="#fff" />
      <rect y="6" width="30" height="4" fill="#fff" />
      <rect x="10" width="2" height="20" fill="#002868" />
      <rect y="7" width="30" height="2" fill="#002868" />
    </FlagBase>
  );
}
function FlagDK({ s }: { s: number }) {
  return (
    <FlagBase s={s}>
      <rect width="30" height="20" fill="#C60C30" />
      <rect x="10" width="4" height="20" fill="#fff" />
      <rect y="6" width="30" height="4" fill="#fff" />
    </FlagBase>
  );
}
function FlagBE({ s }: { s: number }) {
  return (
    <FlagBase s={s}>
      <rect x="0" width="10" height="20" fill="#000" />
      <rect x="10" width="10" height="20" fill="#FDDA24" />
      <rect x="20" width="10" height="20" fill="#ED2939" />
    </FlagBase>
  );
}
function FlagPL({ s }: { s: number }) {
  return (
    <FlagBase s={s}>
      <rect y="0" width="30" height="10" fill="#fff" />
      <rect y="10" width="30" height="10" fill="#DC143C" />
    </FlagBase>
  );
}
function FlagGR({ s }: { s: number }) {
  return (
    <FlagBase s={s}>
      <rect width="30" height="20" fill="#0D5EAF" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} y={i * 4} width="30" height="2" fill="#fff" />
      ))}
      <rect width="10" height="10" fill="#0D5EAF" />
      {[0, 1, 2].map((row) =>
        [0, 1, 2].map((col) => (
          <rect
            key={`${row}-${col}`}
            x={col * 3.3}
            y={row * 3.3}
            width="2"
            height="2"
            fill="#fff"
          />
        )),
      )}
    </FlagBase>
  );
}
function FlagPT({ s }: { s: number }) {
  return (
    <FlagBase s={s}>
      <rect width="30" height="20" fill="#006600" />
      <rect x="12" width="18" height="20" fill="#FF0000" />
      <circle
        cx="18"
        cy="10"
        r="5"
        fill="#FFD900"
        stroke="#003399"
        strokeWidth="1"
      />
    </FlagBase>
  );
}
function FlagAR({ s }: { s: number }) {
  return (
    <FlagBase s={s}>
      <rect y="0" width="30" height="6.67" fill="#75AADB" />
      <rect y="6.67" width="30" height="6.67" fill="#fff" />
      <rect y="13.33" width="30" height="6.67" fill="#75AADB" />
      <path
        fill="#F6B40E"
        d="M15 6l2 4 4 0-3 2.5 1 4-3-2.5-3 2.5 1-4-3-2.5 4 0z"
      />
    </FlagBase>
  );
}
function FlagMX({ s }: { s: number }) {
  return (
    <FlagBase s={s}>
      <rect x="0" width="10" height="20" fill="#006847" />
      <rect x="10" width="10" height="20" fill="#fff" />
      <rect x="20" width="10" height="20" fill="#CE1126" />
      <path
        fill="#8B4513"
        d="M12 6l1 2 2 0-1.5 1.5.5 2-1.5-1-1.5 1 .5-2L9 8l2 0z"
      />
    </FlagBase>
  );
}
function FlagTR({ s }: { s: number }) {
  return (
    <FlagBase s={s}>
      <rect width="30" height="20" fill="#E30A17" />
      <circle cx="12" cy="10" r="4" fill="#fff" />
      <circle cx="13" cy="10" r="3" fill="#E30A17" />
      <path
        fill="#fff"
        d="M12 6l0.5 1.5 1.5 0-1 1 0.5 1.5-1-1-1 1 0.5-1.5-1-1 1.5 0z"
      />
    </FlagBase>
  );
}
function FlagTH({ s }: { s: number }) {
  return (
    <FlagBase s={s}>
      <rect y="0" width="30" height="4" fill="#A51931" />
      <rect y="4" width="30" height="4" fill="#fff" />
      <rect y="8" width="30" height="4" fill="#2D2A4A" />
      <rect y="12" width="30" height="4" fill="#fff" />
      <rect y="16" width="30" height="4" fill="#A51931" />
    </FlagBase>
  );
}
function FlagVN({ s }: { s: number }) {
  return (
    <FlagBase s={s}>
      <rect width="30" height="20" fill="#DA251D" />
      <path fill="#FFFF00" d="M15 4l2 6 6 0-5 4 2 6-5-4-5 4 2-6-5-4 6 0z" />
    </FlagBase>
  );
}
function FlagID({ s }: { s: number }) {
  return (
    <FlagBase s={s}>
      <rect y="0" width="30" height="10" fill="#fff" />
      <rect y="10" width="30" height="10" fill="#A31937" />
    </FlagBase>
  );
}
function FlagSG({ s }: { s: number }) {
  return (
    <FlagBase s={s}>
      <rect y="0" width="30" height="10" fill="#fff" />
      <rect y="10" width="30" height="10" fill="#ED2939" />
      <path fill="#fff" d="M0 0l12 10L0 20V0z" />
      <circle cx="6" cy="12" r="4" fill="#ED2939" />
    </FlagBase>
  );
}
function FlagZA({ s }: { s: number }) {
  return (
    <FlagBase s={s}>
      <rect width="30" height="20" fill="#007749" />
      <path fill="#fff" d="M0 0l30 20H0V0z" />
      <path fill="#FFB81C" d="M0 0l12 10L0 20V0z" />
      <path fill="#000" d="M0 0l8 10L0 20V0z" />
      <path fill="#E1392D" d="M0 0l30 20V0H0z" />
    </FlagBase>
  );
}
function FlagEG({ s }: { s: number }) {
  return (
    <FlagBase s={s}>
      <rect y="0" width="30" height="6.67" fill="#C8102E" />
      <rect y="6.67" width="30" height="6.67" fill="#fff" />
      <rect y="13.33" width="30" height="6.67" fill="#000" />
      <circle cx="15" cy="10" r="3" fill="#fff" />
    </FlagBase>
  );
}
function FlagNG({ s }: { s: number }) {
  return (
    <FlagBase s={s}>
      <rect x="0" width="10" height="20" fill="#008751" />
      <rect x="10" width="10" height="20" fill="#fff" />
      <rect x="20" width="10" height="20" fill="#008751" />
      <circle cx="15" cy="10" r="3" fill="#fff" />
    </FlagBase>
  );
}
function FlagMA({ s }: { s: number }) {
  return (
    <FlagBase s={s}>
      <rect width="30" height="20" fill="#C1272D" />
      <path
        fill="#006233"
        d="M15 4l2 4 4 0-3 2.5 1 4-3-2.5-3 2.5 1-4-3-2.5 4 0z"
      />
    </FlagBase>
  );
}
function FlagIE({ s }: { s: number }) {
  return (
    <FlagBase s={s}>
      <rect x="0" width="10" height="20" fill="#169B62" />
      <rect x="10" width="10" height="20" fill="#fff" />
      <rect x="20" width="10" height="20" fill="#FF883E" />
    </FlagBase>
  );
}
function FlagFI({ s }: { s: number }) {
  return (
    <FlagBase s={s}>
      <rect width="30" height="20" fill="#fff" />
      <rect x="10" width="4" height="20" fill="#003580" />
      <rect y="6" width="30" height="4" fill="#003580" />
    </FlagBase>
  );
}
function FlagAT({ s }: { s: number }) {
  return (
    <FlagBase s={s}>
      <rect y="0" width="30" height="6.67" fill="#ED2939" />
      <rect y="6.67" width="30" height="6.67" fill="#fff" />
      <rect y="13.33" width="30" height="6.67" fill="#ED2939" />
    </FlagBase>
  );
}
function FlagCZ({ s }: { s: number }) {
  return (
    <FlagBase s={s}>
      <rect width="30" height="10" fill="#fff" />
      <rect y="10" width="30" height="10" fill="#D7141A" />
      <path fill="#11457E" d="M0 0l15 10L0 20V0z" />
    </FlagBase>
  );
}
function FlagHU({ s }: { s: number }) {
  return (
    <FlagBase s={s}>
      <rect y="0" width="30" height="6.67" fill="#477050" />
      <rect y="6.67" width="30" height="6.67" fill="#fff" />
      <rect y="13.33" width="30" height="6.67" fill="#CD2A3E" />
    </FlagBase>
  );
}
function FlagRO({ s }: { s: number }) {
  return (
    <FlagBase s={s}>
      <rect x="0" width="10" height="20" fill="#002B7F" />
      <rect x="10" width="10" height="20" fill="#FCD116" />
      <rect x="20" width="10" height="20" fill="#CE1126" />
    </FlagBase>
  );
}
function FlagUA({ s }: { s: number }) {
  return (
    <FlagBase s={s}>
      <rect y="0" width="30" height="10" fill="#0057B7" />
      <rect y="10" width="30" height="10" fill="#FFD700" />
    </FlagBase>
  );
}
function FlagIL({ s }: { s: number }) {
  return (
    <FlagBase s={s}>
      <rect width="30" height="20" fill="#fff" />
      <rect y="6" width="30" height="4" fill="#0038B8" />
      <rect y="10" width="30" height="4" fill="#0038B8" />
      <path
        fill="#fff"
        d="M15 4l1 2 2 0-1.5 1.5.5 2-1.5-1-1.5 1 .5-2L13 6l2 0z"
      />
    </FlagBase>
  );
}
