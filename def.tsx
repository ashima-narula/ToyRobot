// App.tsx
import React from "react";
import { ScrollView, Text, StyleSheet , View, TextInput, TouchableOpacity} from "react-native";
import {COLORS} from "./constants/theme"
import {
  SafeAreaProvider,
  SafeAreaView,
} from "react-native-safe-area-context";


const App = () => {
  return (
    <SafeAreaProvider>
      {/* SafeAreaView from react-native-safe-area-context */}
      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Toy Robot Simulator</Text>
          <Text style={styles.subtitle}>
            Now all content is inside the safe area 👍
          </Text>
          <View style={styles.card}>
          <Text style={styles.sectionTitle}>Commands Input</Text>
                    <Text style={styles.description}>
                      Enter PLACE, MOVE, LEFT, RIGHT, REPORT commands here, one per line.
                    </Text>
                    <TextInput
                    style={styles.textInput}
                    multiline
                    placeholder={`Example:\nPLACE 0,0,NORTH\nMOVE\nREPORT`}
                    autoCapitalize="characters"
                    
                    />
               <TouchableOpacity style={styles.button}>
                 <Text style={styles.buttonText}> Run Command</Text>
               </TouchableOpacity>
          </View>
          <View style={styles.card}>
                       <Text style={styles.sectionTitle}>Table View</Text>
                       {/* {renderGrid()} */}
                     </View>

                     <View style={styles.card}>
                               <Text style={styles.sectionTitle}>REPORT Output</Text>
                               {/* {simulationResult && simulationResult.reports.length > 0 ? (
                                 simulationResult.reports.map((r, idx) => (
                                   <Text key={idx} style={styles.reportLine}>
                                     {r}
                                   </Text>
                                 ))
                               ) : (
                                 <Text style={styles.helperText}>
                                   No REPORT command has been executed yet, or the robot has not been
                                   placed.
                                 </Text>
                               )} */}
                             </View>
        </ScrollView>

      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor:COLORS.BACKGROUND
  },
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
  },
  subtitle: {
    marginVertical: 8,
    fontSize: 14,
  },
  card: {
    backgroundColor: "#111827",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#1f2937",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#f9fafb",
    marginBottom: 8,
  },
  description: {
    fontSize: 13,
    color: "#9ca3af",
    marginBottom: 8,
  },
  textInput:{
    minHeight:120,
    borderColor: "#374151",
    borderWidth:1,
    borderRadius:1.5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
    color: "#e5e7eb",
  },
  button: {
    backgroundColor: "#4f46e5",
    paddingVertical: 10,
    marginTop:15,
    borderRadius: 999,
    alignItems: "center",
  },
  buttonText: {
    color: "#f9fafb",
    fontSize: 15,
    fontWeight: "600",
  },
  helperText: {
    color: "#9ca3af",
    fontSize: 13,
  },
});
