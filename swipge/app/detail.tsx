import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as Speech from 'expo-speech';
import { useState } from 'react';

export default function DetailScreen() {
  const router = useRouter();
  const { text } = useLocalSearchParams();
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speakText = () => {
    if (isSpeaking) {
      Speech.stop();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      Speech.speak(text as string, {
        language: 'ko-KR',
        pitch: 1.0,
        rate: 0.8,
        onDone: () => setIsSpeaking(false),
        onStopped: () => setIsSpeaking(false),
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {
          Speech.stop();
          router.back();
        }}>
          <Text style={styles.backButton}>← 뒤로</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.text}>{text}</Text>
      </ScrollView>

      <TouchableOpacity 
        style={styles.speakButton}
        onPress={speakText}
      >
        <Text style={styles.speakButtonText}>
          {isSpeaking ? '🔊 정지' : '🔊 읽어주기'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    fontSize: 18,
    color: '#007AFF',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  text: {
    fontSize: 18,
    lineHeight: 28,
    color: '#333',
  },
  speakButton: {
    backgroundColor: '#34C759',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    margin: 24,
  },
  speakButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});