import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';

import {
  CommandInput,
  Grid,
  ReportOutput,
  SimulationResult,
  runSimulation,
} from './components/index';
import { COLORS, screenHeight, screenWidth } from './constants/theme';
import { TEXTS } from './constants/text';

const App: React.FC = () => {
  const [commands, setCommands] = useState(
    `PLACE 1,2,EAST\nMOVE\nMOVE\nLEFT\nMOVE\nREPORT`,
  );
  const [simulationResult, setSimulationResult] =
    useState<SimulationResult | null>(null);

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={styles.contentContainerStyle}
        edges={['top', 'left', 'right', 'bottom']} // choose which edges to respect
      >
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <Text style={styles.title}>{TEXTS.applicationTitle}</Text>

        <CommandInput
          commands={commands}
          setCommands={setCommands}
          onRun={() => setSimulationResult(runSimulation(commands))}
        />
        <Grid simulationResult={simulationResult} />
        <ReportOutput simulationResult={simulationResult} />
      </ScrollView>
    </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  title: {
    fontSize: screenWidth * 0.06, // ~6% of screen width
    fontWeight: "700",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: screenWidth * 0.035, // slightly smaller, responsive
    marginBottom: 16,
  },
  contentContainerStyle: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    minHeight: screenHeight,           // ensure it fills the screen
    paddingHorizontal: screenWidth * 0.05, // 5% horizontal padding
    paddingTop: screenHeight * 0.02,       // small top padding
  },
});
