export type Direction = 'NORTH' | 'SOUTH' | 'EAST' | 'WEST';
const DIRECTIONS: Direction[] = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
export const TABLE_SIZE = 5;

export interface PlaceData {
  x: number;
  y: number;
  facing: Direction;
}

export interface SimulationResult {
  placed: boolean;
  x: number;
  y: number;
  facing: Direction;
  reports: string[];
}

export const isValidPosition = (x: number, y: number) =>
  x >= 0 && x < TABLE_SIZE && y >= 0 && y < TABLE_SIZE;

//  split + filter.
export const parsePlaceCommand = (line: string): PlaceData | null => {
  const parts = line.trim().split(' ').filter(Boolean);
  if (parts.length !== 2) return null;

  const [, rest] = parts;
  const [xStr, yStr, fStr] = rest.split(',');
  if (!xStr || !yStr || !fStr) return null;

  const x = Number(xStr);
  const y = Number(yStr);
  const f = fStr.trim().toUpperCase() as Direction;

  if (!Number.isInteger(x) || !Number.isInteger(y)) return null;
  if (!DIRECTIONS.includes(f)) return null;
  if (!isValidPosition(x, y)) return null;

  return { x, y, facing: f };
};

export const runSimulation = (inputText: string): SimulationResult => {
  const lines = inputText
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);

  let placed = false;
  let x = 0;
  let y = 0;
  let facing: Direction = 'NORTH';
  const reports: string[] = [];

  lines.forEach(rawLine => {
    // Extract command word and the rest (for PLACE args).
    const [cmd, ...restParts] = rawLine.split(' ').filter(Boolean);
    if (!cmd) return;

    const command = cmd.toUpperCase();
    const rest = restParts.join(' '); // e.g. "1,2,EAST" for PLACE

    switch (command) {
      case 'PLACE': {
        const placeLine = rest ? `PLACE ${rest}` : rawLine;
        const placeData = parsePlaceCommand(placeLine.toUpperCase());
        if (placeData) {
          x = placeData.x;
          y = placeData.y;
          facing = placeData.facing;
          placed = true;
        }
        break;
      }

      case 'MOVE': {
        if (!placed) break;

        let newX = x;
        let newY = y;

        // Use switch for direction as requested.
        switch (facing) {
          case 'NORTH':
            newY += 1;
            break;
          case 'SOUTH':
            newY -= 1;
            break;
          case 'EAST':
            newX += 1;
            break;
          case 'WEST':
            newX -= 1;
            break;
        }

        if (isValidPosition(newX, newY)) {
          x = newX;
          y = newY;
        }
        break;
      }

      case 'LEFT': {
        if (!placed) break;
        const idx = DIRECTIONS.indexOf(facing);
        facing = DIRECTIONS[(idx - 1 + DIRECTIONS.length) % DIRECTIONS.length];
        break;
      }

      case 'RIGHT': {
        if (!placed) break;
        const idx = DIRECTIONS.indexOf(facing);
        facing = DIRECTIONS[(idx + 1) % DIRECTIONS.length];
        break;
      }

      case 'REPORT': {
        if (!placed) break;
        reports.push(`${x},${y},${facing}`);
        break;
      }

      default:
        // Unknown command → ignore
        break;
    }
  });

  return { placed, x, y, facing, reports };
};

// grid generator with Array.from + flatMap (no push, no nested for).
type GridCell = { id: string; row: number; col: number };

export const generateGridData = (size: number): GridCell[] =>
  Array.from({ length: size }, (_, i) => size - 1 - i).flatMap(row =>
    Array.from({ length: size }, (_, col) => ({
      id: `${row}-${col}`,
      row,
      col,
    })),
  );
