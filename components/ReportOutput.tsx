import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SimulationResult } from '../hooks/Simulation';
import { TEXTS, } from '../constants/text';
import { COLORS , screenWidth, screenHeight} from '../constants/theme';


interface Props {
  simulationResult: SimulationResult | null;
}

export const ReportOutput: React.FC<Props> = ({ simulationResult }) => (
  <View style={styles.card}>
    {/* Title / heading for the report section */}
    <Text style={styles.sectionTitle}>{TEXTS.helperText}</Text>

    {simulationResult && simulationResult.reports.length > 0 ? (
      simulationResult.reports.map((r, idx) => (
        <Text key={idx} style={styles.reportLine}>
          {r}
        </Text>
      ))
    ) : (
      <Text style={styles.helperText}>{TEXTS.reportOutputText}</Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.CARD_BACKGROUND,
    borderRadius: 16,
    paddingHorizontal: screenWidth * 0.04,
    paddingVertical: screenHeight * 0.015,
    marginVertical: screenHeight * 0.02,
    borderWidth: 1,
    borderColor: COLORS.CARD_BORDER,
  },
  sectionTitle: {
    fontSize: screenWidth * 0.045,
    fontWeight: '600',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: screenHeight * 0.01,
  },
  reportLine: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: screenWidth * 0.038,
    fontWeight: '500',
    paddingVertical: screenHeight * 0.004,
  },
  helperText: {
    color: COLORS.TEXT_MUTED,
    fontSize: screenWidth * 0.034,
  },
});
