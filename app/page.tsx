'use client';

import { useEffect } from 'react';
import { useGameState } from '@/lib/useGameState';
import { GameBoard } from '@/components/GameBoard';
import { DragonCurtain } from '@/components/DragonCurtain';
import { BGMPlayer } from '@/components/BGMPlayer';
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
      {/* 배경: 중국 국기 100% */}
      <div className="antique-bg">
        <div className="antique-bg-overlay" />
      </div>

      {/* 좌우 용 커튼 */}
      <DragonCurtain side="left" />
      <DragonCurtain side="right" />

      {/* BGM 플레이어 */}
      <BGMPlayer />

      <main className="min-h-screen flex flex-col items-center py-10 px-4 sm:pl-28 sm:pr-28 md:pl-36 md:pr-36 lg:pl-44 lg:pr-44 relative">
        <div
          className="deco-line"
          style={{ position: 'absolute', top: '15%', left: 0, width: '60%', transform: 'rotate(-15deg)' }}
        />
        <div
          className="deco-line"
          style={{ position: 'absolute', bottom: '25%', right: 0, width: '50%', transform: 'rotate(12deg)' }}
        />
        {/* 헤더 - 붉은색 테마 */}
        <header className="w-full max-w-5xl mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex flex-col">
              <h1
                className="text-4xl md:text-5xl font-bold tracking-[0.2em] text-red-400 uppercase"
                style={{ fontFamily: 'var(--font-bebas), Impact, sans-serif' }}
              >
                四川省
              </h1>
              <span
                className="text-lg tracking-[0.3em] text-amber-300 mt-1"
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
                      ? 'border-red-500 bg-red-500 text-white'
                      : 'border-red-400/60 text-red-300 hover:border-red-400 hover:bg-red-400/20'
                  }`}
                  style={{ fontFamily: 'var(--font-bebas), Impact, sans-serif' }}
                >
                  {MODE_LABELS[m]}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-4 h-px bg-gradient-to-r from-transparent via-red-400/50 to-transparent" />
        </header>

        {/* 메인 콘텐츠 */}
        <div className="flex gap-6 lg:gap-10 items-start flex-wrap justify-center p-5">
          {/* 좌측 패널 */}
          <aside className="flex flex-col gap-4 w-40">
            <div className="vintage-panel rounded-sm">
              <div className="text-xs tracking-[0.2em] text-red-300/80 uppercase mb-2">점수</div>
              <div className="text-3xl font-bold text-red-400" style={{ fontFamily: 'var(--font-bebas)' }}>{score}</div>
            </div>
            <div className="vintage-panel rounded-sm">
              <div className="text-xs tracking-[0.2em] text-amber-300/80 uppercase mb-2">남은 조각</div>
              <div className="text-3xl font-bold text-amber-300" style={{ fontFamily: 'var(--font-bebas)' }}>{remainingCount}</div>
            </div>
          </aside>

          {/* 게임 보드 */}
          <div className="game-container p-5">
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
            <div className="vintage-panel rounded-sm">
              <div className="text-xs tracking-[0.2em] text-red-300/80 uppercase mb-2">힌트 F1</div>
              <div className="text-3xl font-bold text-red-400" style={{ fontFamily: 'var(--font-bebas)' }}>{hintCount}</div>
            </div>
            <div className="vintage-panel rounded-sm">
              <div className="text-xs tracking-[0.2em] text-amber-300/80 uppercase mb-2">섞기 F2</div>
              <div className="text-3xl font-bold text-amber-300" style={{ fontFamily: 'var(--font-bebas)' }}>{shuffleCount}</div>
            </div>
          </aside>
        </div>

        {/* 버튼 영역 */}
        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <button
            type="button"
            onClick={hint}
            disabled={gameOver || hintCount <= 0}
            className="vintage-btn px-6 py-3 border-2 border-red-400 text-red-400 hover:bg-red-400 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-red-400 font-bold tracking-[0.1em] uppercase transition"
          >
            힌트 F1
          </button>
          <button
            type="button"
            onClick={shuffle}
            disabled={gameOver || shuffleCount <= 0}
            className="vintage-btn px-6 py-3 border-2 border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-red-950 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-amber-400 font-bold tracking-[0.1em] uppercase transition"
          >
            섞기 F2
          </button>
          <button
            type="button"
            onClick={() => restart()}
            className="vintage-btn px-6 py-3 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-bold tracking-[0.1em] uppercase transition"
          >
            재시작
          </button>
          <a
            href="/"
            className="vintage-btn px-6 py-3 border-2 border-red-600 text-red-400 hover:bg-red-600 hover:text-white font-bold tracking-[0.1em] uppercase transition inline-block"
          >
            나가기
          </a>
        </div>

        {/* 모달 */}
        {(gameOver || noMoves) && (
          <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="vintage-panel gold-frame p-12 max-w-md text-center mx-4">
              <h2
                className="text-3xl font-bold text-red-400 mb-4 tracking-[0.2em] uppercase"
                style={{ fontFamily: 'var(--font-bebas)' }}
              >
                {gameOver ? '🎉 클리어!' : '😢 막힘'}
              </h2>
              <p className="text-red-100 mb-8">
                {gameOver
                  ? `최종 점수: ${score}점`
                  : '더 이상 매칭할 수 있는 타일이 없습니다. 섞기를 사용하세요.'}
              </p>
              <button
                type="button"
                onClick={() => restart()}
                className="vintage-btn px-10 py-4 border-2 border-red-500 bg-red-500 text-white font-bold tracking-[0.15em] uppercase hover:bg-transparent hover:text-red-400 transition"
              >
                다시 하기
              </button>
            </div>
          </div>
        )}

        <p className="mt-8 text-sm text-red-200/80 text-center max-w-lg tracking-widest">
          같은 국기의 타일을 클릭하여 연결하세요. 최대 2번 꺾어서 연결할 수 있는 타일만 제거됩니다.
        </p>
      </main>
    </>
  );
}
