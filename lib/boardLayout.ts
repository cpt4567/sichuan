/**
 * 사천성 보드 레이아웃
 * - 모드별로 다른 보드 형태
 */

import type { Position } from './gameLogic';

export type GameMode = 'easy' | 'medium' | 'hard';

/** 하수대: 빈 칸 많음, 쉬움 */
function getLayoutEasy(): Position[] {
  const positions: Position[] = [];
  // 8x16 그리드, 복도 많음
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 16; c++) {
      if (r % 2 === 0 && (c === 3 || c === 4 || c === 11 || c === 12)) continue;
      if (r % 2 === 1 && (c === 7 || c === 8)) continue;
      positions.push({ row: r, col: c });
    }
  }
  return positions;
}

/** 중수대: 현재 보드 */
function getLayoutMedium(): Position[] {
  const positions: Position[] = [];
  for (let c = 2; c <= 15; c++) positions.push({ row: 0, col: c });
  for (let c = 1; c <= 16; c++) positions.push({ row: 1, col: c });
  for (let c = 0; c <= 17; c++) {
    if ((c >= 4 && c <= 5) || (c >= 12 && c <= 13)) continue;
    for (let r = 2; r <= 7; r++) positions.push({ row: r, col: c });
  }
  for (let c = 1; c <= 16; c++) positions.push({ row: 8, col: c });
  for (let c = 2; c <= 15; c++) positions.push({ row: 9, col: c });
  return positions;
}

/** 상수대: 빈 칸 적음, 어려움 */
function getLayoutHard(): Position[] {
  const positions: Position[] = [];
  for (let c = 2; c <= 15; c++) positions.push({ row: 0, col: c });
  for (let c = 1; c <= 16; c++) positions.push({ row: 1, col: c });
  for (let c = 0; c <= 17; c++) {
    if (c === 9) continue; // 세로 복도 1개만
    for (let r = 2; r <= 7; r++) positions.push({ row: r, col: c });
  }
  for (let c = 1; c <= 16; c++) positions.push({ row: 8, col: c });
  for (let c = 2; c <= 15; c++) positions.push({ row: 9, col: c });
  return positions;
}

export function getBoardLayout(mode: GameMode = 'medium'): Position[] {
  switch (mode) {
    case 'easy': return getLayoutEasy();
    case 'hard': return getLayoutHard();
    default: return getLayoutMedium();
  }
}

export function getBoardDimensions(mode: GameMode = 'medium'): { rows: number; cols: number } {
  if (mode === 'easy') return { rows: 8, cols: 16 };
  return { rows: 10, cols: 18 };
}

export const MODE_LABELS: Record<GameMode, string> = {
  easy: '하수대',
  medium: '중수대',
  hard: '상수대',
};

export const MODE_CONFIG: Record<GameMode, { hints: number; shuffles: number }> = {
  easy: { hints: 8, shuffles: 5 },
  medium: { hints: 5, shuffles: 3 },
  hard: { hints: 3, shuffles: 2 },
};
