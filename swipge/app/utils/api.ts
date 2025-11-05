import axios from 'axios';

const API_URL = 'http://your-server-ip:8000'; // 백엔드 서버 주소로 변경

export const analyzeDocument = async (imageUri: string) => {
  const formData = new FormData();
  
  formData.append('file', {
    uri: imageUri,
    type: 'image/jpeg',
    name: 'document.jpg',
  } as any);

  const response = await axios.post(`${API_URL}/api/analyze`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};