import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SimulationResult, generateGridData, TABLE_SIZE } from '../hooks/Simulation';
import { COLORS, screenWidth, screenHeight} from '../constants/theme';
import { TEXTS } from '../constants/text';

interface GridProps {
  simulationResult: SimulationResult | null;
}

const arrowMap = { NORTH: '↑', SOUTH: '↓', EAST: '→', WEST: '←' } as const;

export const Grid: React.FC<GridProps> = ({ simulationResult }) => {
  if (!simulationResult || !simulationResult.placed) {
    return <Text style={styles.helperText}>{TEXTS.helperText}</Text>;
  }

  const { x, y, facing } = simulationResult;
  const gridData = generateGridData(TABLE_SIZE);

  return (
    <View>
      {/* Optional label above grid */}
      <Text style={styles.gridLabel}>{TEXTS.gridLabel}</Text>

      <FlatList
        data={gridData}
        keyExtractor={item => item.id}
        numColumns={TABLE_SIZE}
        scrollEnabled={false}
        renderItem={({ item }) => {
          const isRobot = item.col === x && item.row === y;

          return (
            <View style={[styles.cell, isRobot && styles.robotCell]}>
              {isRobot ? (
                <>
                  <Text style={styles.robotEmoji}>🤖</Text>
                  <Text style={styles.robotDirection}>
                    {arrowMap[facing]}
                  </Text>
                </>
              ) : (
                <Text style={styles.cellText}>
                  {item.col},{item.row}
                </Text>
              )}
            </View>
          );
        }}
      />
    </View>
  );
};

const CELL_SIZE = screenWidth * 0.16; // tweak if you want bigger/smaller cells

const styles = StyleSheet.create({
  gridLabel: {
    color: COLORS.TEXT,
    fontSize: screenWidth * 0.036,
    marginBottom: screenHeight * 0.01,
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderWidth: 1,
    borderColor: COLORS.GRID_BORDER,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellText: {
    color: COLORS.GRID_COORD_TEXT,
    fontSize: screenWidth * 0.026,
  },
  robotCell: {
    backgroundColor: COLORS.ROBOT_CELL_BG,
  },
  robotEmoji: {
    fontSize: screenWidth * 0.06,
    color: COLORS.ROBOT_EMOJI,
  },
  robotDirection: {
    color: COLORS.ROBOT_DIRECTION_TEXT,
    fontWeight: '700',
    fontSize: screenWidth * 0.04,
  },
  helperText: {
    color: COLORS.TEXT_MUTED,
    fontSize: screenWidth * 0.034,
  },
});
