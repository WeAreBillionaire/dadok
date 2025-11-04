import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>어려운 공문서,{'\n'}쉽게 읽어드립니다</Text>
        <Text style={styles.description}>
          복잡한 공문서를 사진으로 찍으면{'\n'}
          쉬운 말로 설명해드립니다
        </Text>

        <View style={styles.featuresContainer}>
          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>📁</Text>
            <Text style={styles.featureTitle}>로컬 파일 읽기</Text>
            <Text style={styles.featureDesc}>
              저장된 문서 파일을{'\n'}불러와서 확인하세요
            </Text>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>📷</Text>
            <Text style={styles.featureTitle}>카메라로 촬영</Text>
            <Text style={styles.featureDesc}>
              카메라로 바로 찍어서{'\n'}즉시 분석하세요
            </Text>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>🖼️</Text>
            <Text style={styles.featureTitle}>앨범에서 선택</Text>
            <Text style={styles.featureDesc}>
              갤러리에 있는 사진을{'\n'}선택해서 확인하세요
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => router.push('/(tabs)')}
      >
        <Text style={styles.buttonText}>시작하기</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
    lineHeight: 42,
    marginTop: 40,
  },
  description: {
    fontSize: 18,
    color: '#666',
    lineHeight: 28,
    marginBottom: 40,
  },
  featuresContainer: {
    gap: 16,
  },
  featureCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  featureIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  featureDesc: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    margin: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});