import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { analyzeDocument } from './utils/api';

export default function HomeScreen() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = async (imageUri: string) => {
    console.log('Sending image:', imageUri);
    try {
      setLoading(true);
      const response = await analyzeDocument(imageUri);
      setResult(response);
      Alert.alert('완료', '분석이 완료되었습니다');
    } catch (error) {
      Alert.alert('오류', '분석에 실패했습니다');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const pickFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setSelectedImage(uri);
      await handleAnalyze(uri);  // 분석 실행
    }
  };

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    
    if (!permission.granted) {
      Alert.alert('권한 필요', '카메라 권한이 필요합니다');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setSelectedImage(uri);
      await handleAnalyze(uri);  // 분석 실행
    }
  };

  const pickDocument = async () => {
    Alert.alert('준비중', '파일 선택 기능 준비중입니다');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator size="large" color="#007AFF" />
        ) : result ? (
  <ScrollView style={styles.resultContainer}>
    <Text style={styles.resultTitle}>📄 분석 결과</Text>
    <View style={styles.resultBox}>
      <Text style={styles.resultText}>{result.simplified}</Text>
    </View>
    
    <TouchableOpacity 
      style={styles.newButton}
      onPress={() => setResult(null)}
    >
      <Text style={styles.newButtonText}>새 문서 분석</Text>
    </TouchableOpacity>
  </ScrollView>
) : (
  <Text style={styles.emptyText}>문서를 추가해보세요</Text>
)}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.actionButton} onPress={pickDocument}>
          <Text style={styles.actionIcon}>📁</Text>
          <Text style={styles.actionText}>파일</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={takePhoto}>
          <Text style={styles.actionIcon}>📷</Text>
          <Text style={styles.actionText}>촬영</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={pickFromGallery}>
          <Text style={styles.actionIcon}>🖼️</Text>
          <Text style={styles.actionText}>앨범</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    padding: 24,
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
  },
  resultContainer: {
    flex: 1,
    width: '100%',
    padding: 24,
  },
  resultBox: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000',
  },
  resultText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 20,
    paddingBottom: 40,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: 4,
  },
  actionText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  newButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  newButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});