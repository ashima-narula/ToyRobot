import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { TEXTS } from '../constants/text';
import { COLORS, screenWidth, screenHeight} from '../constants/theme';


interface Props {
  commands: string;
  setCommands: (text: string) => void;
  onRun: () => void;
}

export const CommandInput: React.FC<Props> = ({
  commands,
  setCommands,
  onRun,
}) => (
  <View style={styles.card}>
    <Text style={styles.sectionTitle}>{TEXTS.commandInput}</Text>

    <Text style={styles.description}>{TEXTS.placeHolderText}</Text>

    <TextInput
      style={styles.textInput}
      multiline
      value={commands}
      onChangeText={setCommands}
      placeholder={`Example:\nPLACE 0,0,NORTH\nMOVE\nREPORT`}
      autoCapitalize="characters"
      placeholderTextColor={COLORS.TEXT_MUTED}
    />

    <TouchableOpacity style={styles.button} onPress={onRun}>
      <Text style={styles.buttonText}>{TEXTS.runCommands}</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.CARD_BACKGROUND,
    borderRadius: 16,
    paddingHorizontal: screenWidth * 0.04,       // 4% of width
    paddingVertical: screenHeight * 0.015,       // 1.5% of height
    marginBottom: screenHeight * 0.02,
    borderWidth: 1,
    borderColor: COLORS.CARD_BORDER,
  },
  sectionTitle: {
    fontSize: screenWidth * 0.045,               // responsive title size
    fontWeight: '600',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: screenHeight * 0.008,
  },
  description: {
    fontSize: screenWidth * 0.035,
    color: COLORS.TEXT_MUTED,
    marginBottom: screenHeight * 0.01,
  },
  textInput: {
    minHeight: screenHeight * 0.18,              // ~18% of screen height
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.INPUT_BORDER,
    backgroundColor: COLORS.INPUT_BACKGROUND,
    paddingHorizontal: screenWidth * 0.035,
    paddingVertical: screenHeight * 0.012,
    color: COLORS.TEXT_PRIMARY,
    fontSize: screenWidth * 0.035,
    textAlignVertical: 'top',
    marginBottom: screenHeight * 0.015,
  },
  button: {
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: screenHeight * 0.015,
    borderRadius: 999,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.PRIMARY_TEXT,
    fontSize: screenWidth * 0.04,
    fontWeight: '600',
  },
});
