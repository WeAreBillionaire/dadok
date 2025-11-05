import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

export default function HomeScreen() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const pickFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      Alert.alert('선택됨', '이미지를 선택했습니다');
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
      setSelectedImage(result.assets[0].uri);
      Alert.alert('촬영됨', '사진을 촬영했습니다');
    }
  };

  const pickDocument = async () => {
    // 파일 선택 (나중에 구현)
    Alert.alert('준비중', '파일 선택 기능 준비중입니다');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emptyText}>
          {selectedImage ? '이미지 선택됨' : '문서를 추가해보세요'}
        </Text>
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
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
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
});