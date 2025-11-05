import { Platform } from 'react-native';

const API_URL = 'http://192.168.45.48:8000'; // 실제 IP로 변경

export const analyzeDocument = async (imageUri: string) => {
  const formData = new FormData();
  
  formData.append('file', {
    uri: Platform.OS === 'ios' ? imageUri.replace('file://', '') : imageUri,
    type: 'image/jpeg',
    name: 'document.jpg',
  } as any);

  const response = await fetch(`${API_URL}/api/analyze`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  return await response.json();
};