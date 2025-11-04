import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function WelcomeScreen() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  const pages = [
    {
      icon: '📖',
      title: '다독',
      description: '어려운 공문서를\n쉽게 읽어드립니다',
    },
    {
      icon: '📁',
      title: '로컬 파일 읽기',
      description: '저장된 문서 파일을\n불러와서 확인하세요',
    },
    {
      icon: '📷',
      title: '카메라로 촬영',
      description: '카메라로 바로 찍어서\n즉시 분석하세요',
    },
    {
      icon: '🖼️',
      title: '앨범에서 선택',
      description: '갤러리에 있는 사진을\n선택해서 확인하세요',
    },
  ];

  const handleNext = () => {
    if (step < pages.length - 1) {
      setStep(step + 1);
    } else {
      router.push('/(tabs)');
    }
  };

  return (
    <TouchableOpacity 
      style={styles.container} 
      activeOpacity={1}
      onPress={handleNext}
    >
      <View style={styles.content}>
        <Text style={styles.icon}>{pages[step].icon}</Text>
        <Text style={styles.title}>{pages[step].title}</Text>
        <Text style={styles.description}>{pages[step].description}</Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.indicators}>
          {pages.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                index === step && styles.indicatorActive,
              ]}
            />
          ))}
        </View>
        <Text style={styles.tapHint}>
          {step < pages.length - 1 ? '화면을 탭하세요' : '시작하기'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  icon: {
    fontSize: 80,
    marginBottom: 32,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 24,
    textAlign: 'center',
  },
  description: {
    fontSize: 20,
    color: '#666',
    textAlign: 'center',
    lineHeight: 32,
  },
  footer: {
    paddingBottom: 60,
    alignItems: 'center',
  },
  indicators: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
  },
  indicatorActive: {
    backgroundColor: '#007AFF',
    width: 24,
  },
  tapHint: {
    fontSize: 16,
    color: '#999',
  },
});