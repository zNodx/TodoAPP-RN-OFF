import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { useFonts } from 'expo-font';

import TaskList from './src/screens/TaskList'

export default function App() {
  const [loaded] = useFonts({
    Lato: require('./assets/fonts/Lato.ttf'),
  })

  if (!loaded) {
    return null;
  }
  return (
     <TaskList/>
  );
}

const styles = StyleSheet.create({
 
});
