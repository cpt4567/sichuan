'use client';

import { useCallback, useMemo, useState } from 'react';
import type { Tile } from './gameLogic';
import { canConnect, findMatchablePair, hasPossibleMoves } from './gameLogic';
import {
  getBoardLayout,
  getBoardDimensions,
  type GameMode,
  MODE_CONFIG,
} from './boardLayout';

const TILE_TYPES = 42;

function createInitialTiles(mode: GameMode): Tile[] {
  const positions = getBoardLayout(mode);
  const pairCount = Math.floor(positions.length / 2);
  const pairTypes = Array.from({ length: pairCount }, (_, i) => i % TILE_TYPES);
  const types = [...pairTypes, ...pairTypes].slice(0, positions.length);
  for (let i = types.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [types[i], types[j]] = [types[j], types[i]];
  }
  return positions.map((position, i) => ({
    id: `tile-${i}`,
    type: types[i],
    position,
  }));
}

export function useGameState(initialMode: GameMode = 'medium') {
  const [mode, setMode] = useState<GameMode>(initialMode);
  const { rows, cols } = getBoardDimensions(mode);
  const config = MODE_CONFIG[mode];

  const [tiles, setTiles] = useState<Tile[]>(() => createInitialTiles(mode));
  const [selected, setSelected] = useState<Tile | null>(null);
  const [hintPair, setHintPair] = useState<{ from: Tile; to: Tile } | null>(null);
  const [path, setPath] = useState<{ row: number; col: number }[] | null>(null);
  const [score, setScore] = useState(0);
  const [hintCount, setHintCount] = useState(config.hints);
  const [shuffleCount, setShuffleCount] = useState(config.shuffles);

  const board = useMemo(() => {
    const b: (Tile | null)[][] = Array(rows).fill(null).map(() => Array(cols).fill(null));
    for (const t of tiles) {
      b[t.position.row][t.position.col] = t;
    }
    return b;
  }, [tiles, rows, cols]);

  const remainingCount = tiles.length;
  const gameOver = remainingCount === 0;
  const noMoves = !gameOver && !hasPossibleMoves(board, tiles);

  const clearPathAndHint = useCallback(() => {
    setPath(null);
    setHintPair(null);
  }, []);

  const handleTileClick = useCallback((tile: Tile) => {
    if (gameOver) return;

    if (!selected) {
      setSelected(tile);
      clearPathAndHint();
      return;
    }

    if (selected.id === tile.id) {
      setSelected(null);
      clearPathAndHint();
      return;
    }

    if (selected.type !== tile.type) {
      setSelected(tile);
      clearPathAndHint();
      return;
    }

    const { connected, path: foundPath } = canConnect(board, selected.position, tile.position);
    if (!connected) {
      setSelected(tile);
      clearPathAndHint();
      return;
    }

    setTiles((prev) => prev.filter((t) => t.id !== selected.id && t.id !== tile.id));
    setScore((s) => s + 10);
    setSelected(null);
    setPath(foundPath ?? null);
    setHintPair(null);
    setTimeout(clearPathAndHint, 400);
  }, [selected, board, gameOver, clearPathAndHint]);

  const hint = useCallback(() => {
    if (gameOver || hintCount <= 0) return;
    const pair = findMatchablePair(board, tiles);
    if (pair) {
      setHintPair({ from: pair.from, to: pair.to });
      setPath(pair.path);
      setHintCount((c) => c - 1);
      setTimeout(clearPathAndHint, 2000);
    }
  }, [board, tiles, gameOver, hintCount, clearPathAndHint]);

  const shuffle = useCallback(() => {
    if (gameOver || shuffleCount <= 0) return;
    setTiles((prev) => {
      const types = prev.map((t) => t.type);
      for (let i = types.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [types[i], types[j]] = [types[j], types[i]];
      }
      return prev.map((t, i) => ({ ...t, type: types[i] }));
    });
    setShuffleCount((c) => c - 1);
    setSelected(null);
    clearPathAndHint();
  }, [gameOver, shuffleCount, clearPathAndHint]);

  const restart = useCallback((newMode?: GameMode) => {
    const m = newMode ?? mode;
    setMode(m);
    const cfg = MODE_CONFIG[m];
    setTiles(createInitialTiles(m));
    setSelected(null);
    setHintPair(null);
    setPath(null);
    setScore(0);
    setHintCount(cfg.hints);
    setShuffleCount(cfg.shuffles);
  }, [mode]);

  const changeMode = useCallback((newMode: GameMode) => {
    restart(newMode);
  }, [restart]);

  return {
    mode,
    tiles,
    board,
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
  };
}
