import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const checkFirstLaunch = async () => {
      const hasLaunched = await AsyncStorage.getItem('hasLaunched');
      
      if (hasLaunched === null) {
        // 최초 실행
        await AsyncStorage.setItem('hasLaunched', 'true');
        setIsFirstLaunch(true);
      } else {
        // 이미 실행한 적 있음
        setIsFirstLaunch(false);
      }
    };

    checkFirstLaunch();
  }, []);

  useEffect(() => {
    if (isFirstLaunch === false && segments[0] === 'welcome') {
      // welcome을 건너뛰고 index로
      router.replace('/');
    }
  }, [isFirstLaunch, segments]);

  // 로딩 중
  if (isFirstLaunch === null) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        {isFirstLaunch ? (
          <>
            <Stack.Screen name="welcome" />
            <Stack.Screen name="index" />
          </>
        ) : (
          <>
            <Stack.Screen name="index" />
            <Stack.Screen name="welcome" />
          </>
        )}
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}