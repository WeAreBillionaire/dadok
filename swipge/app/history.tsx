import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

interface HistoryItem {
  id: string;
  simplified: string;
  timestamp: number;
}

export default function HistoryScreen() {
  const router = useRouter();
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const data = await AsyncStorage.getItem('documentHistory');
    if (data) {
      setHistory(JSON.parse(data));
    }
  };

  const deleteItem = async (id: string) => {
    const newHistory = history.filter(item => item.id !== id);
    await AsyncStorage.setItem('documentHistory', JSON.stringify(newHistory));
    setHistory(newHistory);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>← 뒤로</Text>
        </TouchableOpacity>
        <Text style={styles.title}>분석 기록</Text>
      </View>

      {history.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>분석 기록이 없습니다</Text>
        </View>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <TouchableOpacity 
                style={styles.itemContent}
                onPress={() => router.push({
                  pathname: '/detail',
                  params: { text: item.simplified }
                })}
              >
                <Text style={styles.itemText} numberOfLines={3}>
                  {item.simplified}
                </Text>
                <Text style={styles.itemDate}>
                  {new Date(item.timestamp).toLocaleDateString('ko-KR')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.deleteButton}
                onPress={() => deleteItem(item.id)}
              >
                <Text style={styles.deleteText}>삭제</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    fontSize: 18,
    color: '#007AFF',
    marginRight: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
  },
  item: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  itemContent: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
  },
  itemDate: {
    fontSize: 14,
    color: '#999',
  },
  deleteButton: {
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  deleteText: {
    color: '#FF3B30',
    fontSize: 14,
  },
});