'use client';

import { useMemo } from 'react';
import type { Tile } from '@/lib/gameLogic';
import { getBoardLayout, getBoardDimensions, type GameMode } from '@/lib/boardLayout';
import { TileIcon } from './TileIcon';

const TILE_SIZE = 44;
const TILE_GAP = 2;

interface GameBoardProps {
  mode: GameMode;
  tiles: Tile[];
  selected: Tile | null;
  hintPair: { from: Tile; to: Tile } | null;
  path: { row: number; col: number }[] | null;
  onTileClick: (tile: Tile) => void;
}

export function GameBoard({ mode, tiles, selected, hintPair, path, onTileClick }: GameBoardProps) {
  const { rows, cols } = getBoardDimensions(mode);
  const positions = useMemo(() => getBoardLayout(mode), [mode]);
  const tileMap = useMemo(() => {
    const m = new Map<string, Tile>();
    for (const t of tiles) {
      m.set(`${t.position.row},${t.position.col}`, t);
    }
    return m;
  }, [tiles]);

  const posToPixel = (row: number, col: number) => ({
    x: col * (TILE_SIZE + TILE_GAP) + TILE_GAP,
    y: row * (TILE_SIZE + TILE_GAP) + TILE_GAP,
  });

  const pathD = useMemo(() => {
    if (!path || path.length < 2) return '';
    return path
      .map((p, i) => {
        const { x, y } = posToPixel(p.row, p.col);
        const cx = x + TILE_SIZE / 2;
        const cy = y + TILE_SIZE / 2;
        return i === 0 ? `M ${cx} ${cy}` : `L ${cx} ${cy}`;
      })
      .join(' ');
  }, [path]);

  const isHint = (tile: Tile) =>
    hintPair && (tile.id === hintPair.from.id || tile.id === hintPair.to.id);

  return (
    <div className="game-board-wrapper">
      <svg
        className="connection-path"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: cols * (TILE_SIZE + TILE_GAP) + TILE_GAP,
          height: rows * (TILE_SIZE + TILE_GAP) + TILE_GAP,
          pointerEvents: 'none',
        }}
      >
        {pathD && (
          <path
            d={pathD}
            fill="none"
            stroke="#d4af37"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
      <div
        className="game-board"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, ${TILE_SIZE + TILE_GAP}px)`,
          gridTemplateRows: `repeat(${rows}, ${TILE_SIZE + TILE_GAP}px)`,
          gap: TILE_GAP,
          position: 'relative',
        }}
      >
        {positions.map((pos) => {
          const tile = tileMap.get(`${pos.row},${pos.col}`);
          if (!tile) {
            return (
              <div
                key={`${pos.row}-${pos.col}`}
                style={{
                  gridColumn: pos.col + 1,
                  gridRow: pos.row + 1,
                }}
              />
            );
          }
          const sel = selected?.id === tile.id;
          const hint = isHint(tile);
          return (
            <button
              key={tile.id}
              type="button"
              className={`tile ${sel ? 'selected' : ''} ${hint ? 'hint' : ''}`}
              style={{
                gridColumn: pos.col + 1,
                gridRow: pos.row + 1,
                width: TILE_SIZE,
                height: TILE_SIZE,
                padding: 0,
                border: 'none',
                borderRadius: 2,
                cursor: 'pointer',
                background: sel
                  ? 'linear-gradient(135deg, rgba(40,35,25,0.95) 0%, rgba(50,45,35,0.95) 100%)'
                  : hint
                    ? 'linear-gradient(135deg, rgba(25,35,45,0.9) 0%, rgba(20,30,40,0.95) 100%)'
                    : 'linear-gradient(145deg, rgba(25,22,18,0.95) 0%, rgba(20,18,15,0.98) 50%, rgba(15,12,10,0.95) 100%)',
                boxShadow: sel
                  ? '0 0 0 2px #d4af37, 0 4px 12px rgba(0,0,0,0.5)'
                  : '0 2px 6px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.03)',
                transform: sel ? 'scale(1.05)' : 'scale(1)',
                transition: 'all 0.15s ease',
              }}
              onClick={() => onTileClick(tile)}
            >
              <TileIcon type={tile.type} size={TILE_SIZE - 8} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
