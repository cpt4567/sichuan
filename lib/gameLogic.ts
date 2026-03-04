/**
 * 사천성 게임 로직
 * - 같은 타일 2개를 최대 2번 꺾어서 연결할 수 있으면 제거 가능
 * - 경로: 직선(1구간), L자(2구간), Z자(3구간)
 */

export type Position = { row: number; col: number };

export interface Tile {
  id: string;
  type: number;
  position: Position;
}

const DIRECTIONS = [
  { dr: -1, dc: 0 },
  { dr: 1, dc: 0 },
  { dr: 0, dc: -1 },
  { dr: 0, dc: 1 },
];

/** 보드에서 (row, col)이 비어있거나 목적지인지 */
function canPass(
  board: (Tile | null)[][],
  row: number,
  col: number,
  toRow: number,
  toCol: number
): boolean {
  const rows = board.length;
  const cols = board[0].length;
  if (row < 0 || row >= rows || col < 0 || col >= cols) return false;
  if (row === toRow && col === toCol) return true; // 목적지는 항상 통과
  return board[row][col] === null;
}

/**
 * 두 타일이 최대 2번 꺾어서 연결 가능한지 BFS 탐색
 */
export function canConnect(
  board: (Tile | null)[][],
  from: Position,
  to: Position
): { connected: boolean; path?: Position[] } {
  const rows = board.length;
  const cols = board[0].length;
  const toRow = to.row;
  const toCol = to.col;

  if (from.row === toRow && from.col === toCol) return { connected: false };

  type State = { row: number; col: number; turns: number; lastDir: number; path: Position[] };
  const visited = new Set<string>();
  const key = (r: number, c: number, t: number, d: number) => `${r},${c},${t},${d}`;

  // 시작점에서 4방향 첫 이동을 모두 큐에 넣음
  const queue: State[] = [];
  for (let dirIdx = 0; dirIdx < 4; dirIdx++) {
    const { dr, dc } = DIRECTIONS[dirIdx];
    const nr = from.row + dr;
    const nc = from.col + dc;
    if (!canPass(board, nr, nc, toRow, toCol)) continue;

    const stateKey = key(nr, nc, 2, dirIdx);
    if (visited.has(stateKey)) continue;
    visited.add(stateKey);

    queue.push({
      row: nr,
      col: nc,
      turns: 2,
      lastDir: dirIdx,
      path: [from, { row: nr, col: nc }],
    });
  }

  while (queue.length > 0) {
    const { row, col, turns, lastDir, path } = queue.shift()!;

    if (row === toRow && col === toCol) {
      return { connected: true, path: [...path, to] };
    }

    for (let dirIdx = 0; dirIdx < 4; dirIdx++) {
      const { dr, dc } = DIRECTIONS[dirIdx];
      const nr2 = row + dr;
      const nc2 = col + dc;
      if (!canPass(board, nr2, nc2, toRow, toCol)) continue;

      const turnUsed = lastDir !== dirIdx ? 1 : 0;
      const newTurns = turns - turnUsed;
      if (newTurns < 0) continue;

      const stateKey2 = key(nr2, nc2, newTurns, dirIdx);
      if (visited.has(stateKey2)) continue;
      visited.add(stateKey2);

      queue.push({
        row: nr2,
        col: nc2,
        turns: newTurns,
        lastDir: dirIdx,
        path: [...path, { row: nr2, col: nc2 }],
      });
    }
  }

  return { connected: false };
}

/** 매칭 가능한 타일 쌍 찾기 (힌트용) */
export function findMatchablePair(
  board: (Tile | null)[][],
  tiles: Tile[]
): { from: Tile; to: Tile; path: Position[] } | null {
  const byType = new Map<number, Tile[]>();
  for (const t of tiles) {
    if (!byType.has(t.type)) byType.set(t.type, []);
    byType.get(t.type)!.push(t);
  }

  for (const list of Array.from(byType.values())) {
    for (let i = 0; i < list.length; i++) {
      for (let j = i + 1; j < list.length; j++) {
        const a = list[i];
        const b = list[j];
        const { connected, path } = canConnect(board, a.position, b.position);
        if (connected && path) return { from: a, to: b, path };
      }
    }
  }
  return null;
}

/** 게임 클리어 가능 여부 */
export function hasPossibleMoves(board: (Tile | null)[][], tiles: Tile[]): boolean {
  return findMatchablePair(board, tiles) !== null;
}
