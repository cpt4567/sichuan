'use client';

import { useEffect } from 'react';
import { useGameState } from '@/lib/useGameState';
import { GameBoard } from '@/components/GameBoard';
import { MODE_LABELS, type GameMode } from '@/lib/boardLayout';

export default function Home() {
  const {
    mode,
    tiles,
    selected,
    hintPair,
    path,
    score,
    hintCount,
    shuffleCount,
    remainingCount,
    gameOver,
    noMoves,
    handleTileClick,
    hint,
    shuffle,
    restart,
    changeMode,
  } = useGameState();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'F1') { e.preventDefault(); hint(); }
      if (e.key === 'F2') { e.preventDefault(); shuffle(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [hint, shuffle]);

  const modes: GameMode[] = ['easy', 'medium', 'hard'];

  return (
    <>
      {/* 엔틱 배경 */}
      <div className="antique-bg" />

      <main className="min-h-screen flex flex-col items-center py-10 px-4 relative">
        <div
          className="deco-line"
          style={{ position: 'absolute', top: '15%', left: 0, width: '60%', transform: 'rotate(-15deg)' }}
        />
        <div
          className="deco-line"
          style={{ position: 'absolute', bottom: '25%', right: 0, width: '50%', transform: 'rotate(12deg)' }}
        />
        {/* 헤더 - 포스터 스타일 */}
        <header className="w-full max-w-5xl mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex flex-col">
              <h1
                className="text-4xl md:text-5xl font-bold tracking-[0.2em] text-[#d4af37] uppercase"
                style={{ fontFamily: 'var(--font-bebas), Impact, sans-serif' }}
              >
                四川省
              </h1>
              <span
                className="text-lg tracking-[0.3em] text-[#87ceeb] mt-1"
                style={{ fontFamily: 'var(--font-bebas), Impact, sans-serif' }}
              >
                SICHUAN · 그림 맞추기
              </span>
            </div>
            <div className="flex gap-2">
              {modes.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => changeMode(m)}
                  className={`vintage-btn px-4 py-2 text-sm font-bold tracking-[0.15em] uppercase transition border-2 ${
                    mode === m
                      ? 'border-[#d4af37] bg-[#d4af37] text-[#0a0806]'
                      : 'border-[#d4af37]/60 text-[#d4af37]/90 hover:border-[#d4af37] hover:bg-[#d4af37]/20'
                  }`}
                  style={{ fontFamily: 'var(--font-bebas), Impact, sans-serif' }}
                >
                  {MODE_LABELS[m]}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-4 h-px bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent" />
        </header>

        {/* 메인 콘텐츠 */}
        <div className="flex gap-6 lg:gap-10 items-start flex-wrap justify-center">
          {/* 좌측 패널 */}
          <aside className="flex flex-col gap-4 w-40">
            <div className="vintage-panel p-5 rounded-sm">
              <div className="text-xs tracking-[0.2em] text-[#d4af37]/80 uppercase mb-2">점수</div>
              <div className="text-3xl font-bold text-[#d4af37]" style={{ fontFamily: 'var(--font-bebas)' }}>{score}</div>
            </div>
            <div className="vintage-panel p-5 rounded-sm">
              <div className="text-xs tracking-[0.2em] text-[#87ceeb]/80 uppercase mb-2">남은 조각</div>
              <div className="text-3xl font-bold text-[#87ceeb]" style={{ fontFamily: 'var(--font-bebas)' }}>{remainingCount}</div>
            </div>
          </aside>

          {/* 게임 보드 */}
          <div className="game-container">
            <GameBoard
              mode={mode}
              tiles={tiles}
              selected={selected}
              hintPair={hintPair}
              path={path}
              onTileClick={handleTileClick}
            />
          </div>

          {/* 우측 패널 */}
          <aside className="flex flex-col gap-4 w-40">
            <div className="vintage-panel p-5 rounded-sm">
              <div className="text-xs tracking-[0.2em] text-[#7dd3fc]/80 uppercase mb-2">힌트 F1</div>
              <div className="text-3xl font-bold text-[#7dd3fc]" style={{ fontFamily: 'var(--font-bebas)' }}>{hintCount}</div>
            </div>
            <div className="vintage-panel p-5 rounded-sm">
              <div className="text-xs tracking-[0.2em] text-[#fb923c]/80 uppercase mb-2">섞기 F2</div>
              <div className="text-3xl font-bold text-[#fb923c]" style={{ fontFamily: 'var(--font-bebas)' }}>{shuffleCount}</div>
            </div>
          </aside>
        </div>

        {/* 버튼 영역 */}
        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <button
            type="button"
            onClick={hint}
            disabled={gameOver || hintCount <= 0}
            className="vintage-btn px-6 py-3 border-2 border-[#7dd3fc] text-[#7dd3fc] hover:bg-[#7dd3fc] hover:text-[#0a0806] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#7dd3fc] font-bold tracking-[0.1em] uppercase transition"
          >
            힌트 F1
          </button>
          <button
            type="button"
            onClick={shuffle}
            disabled={gameOver || shuffleCount <= 0}
            className="vintage-btn px-6 py-3 border-2 border-[#fb923c] text-[#fb923c] hover:bg-[#fb923c] hover:text-[#0a0806] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#fb923c] font-bold tracking-[0.1em] uppercase transition"
          >
            섞기 F2
          </button>
          <button
            type="button"
            onClick={() => restart()}
            className="vintage-btn px-6 py-3 border-2 border-[#4ade80] text-[#4ade80] hover:bg-[#4ade80] hover:text-[#0a0806] font-bold tracking-[0.1em] uppercase transition"
          >
            재시작
          </button>
          <a
            href="/"
            className="vintage-btn px-6 py-3 border-2 border-[#f87171] text-[#f87171] hover:bg-[#f87171] hover:text-[#0a0806] font-bold tracking-[0.1em] uppercase transition inline-block"
          >
            나가기
          </a>
        </div>

        {/* 모달 */}
        {(gameOver || noMoves) && (
          <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="vintage-panel gold-frame p-12 max-w-md text-center mx-4">
              <h2
                className="text-3xl font-bold text-[#d4af37] mb-4 tracking-[0.2em] uppercase"
                style={{ fontFamily: 'var(--font-bebas)' }}
              >
                {gameOver ? '🎉 클리어!' : '😢 막힘'}
              </h2>
              <p className="text-slate-300 mb-8">
                {gameOver
                  ? `최종 점수: ${score}점`
                  : '더 이상 매칭할 수 있는 타일이 없습니다. 섞기를 사용하세요.'}
              </p>
              <button
                type="button"
                onClick={() => restart()}
                className="vintage-btn px-10 py-4 border-2 border-[#d4af37] bg-[#d4af37] text-[#0a0806] font-bold tracking-[0.15em] uppercase hover:bg-transparent hover:text-[#d4af37] transition"
              >
                다시 하기
              </button>
            </div>
          </div>
        )}

        <p className="mt-8 text-sm text-slate-500/80 text-center max-w-lg tracking-widest">
          같은 국기의 타일을 클릭하여 연결하세요. 최대 2번 꺾어서 연결할 수 있는 타일만 제거됩니다.
        </p>
      </main>
    </>
  );
}
