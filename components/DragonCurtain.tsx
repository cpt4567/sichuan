"use client";

import Image from "next/image";

interface DragonCurtainProps {
  side: "left" | "right";
}

/** 좌우 화려한 용 커튼 - 전통 종이오리기 스타일 */
export function DragonCurtain({ side }: DragonCurtainProps) {
  const isLeft = side === "left";

  return (
    <div
      className="fixed top-0 bottom-0 w-28 md:w-36 lg:w-44 z-10 pointer-events-none overflow-hidden"
      style={{
        left: isLeft ? 0 : undefined,
        right: isLeft ? undefined : 0,
        background:
          "linear-gradient(180deg, #8b0000 0%, #5c0000 50%, #8b0000 100%)",
        boxShadow: "inset 0 0 60px rgba(0,0,0,0.3), 4px 0 20px rgba(0,0,0,0.4)",
      }}
    >
      <div
        className="absolute inset-0 w-full h-full [&>img]:object-cover"
        style={{
          transform: isLeft ? "scaleX(1)" : "scaleX(-1)",
        }}
      >
        <Image
          src="/dragon-curtain.png"
          alt=""
          fill
          sizes="(max-width: 768px) 112px, (max-width: 1024px) 144px, 176px"
          className="object-cover object-center opacity-90"
          style={{
            mixBlendMode: "multiply",
          }}
          unoptimized
        />
      </div>
      {/* 금색 테두리 */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-amber-400/60"
        style={{ left: isLeft ? 0 : undefined, right: isLeft ? undefined : 0 }}
      />
    </div>
  );
}
