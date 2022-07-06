import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView } from 'react-native';
import 'react-native-gesture-handler';
import Navigator from './src/Navigator';
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
    <SafeAreaView style={{flex:1}}>
      <StatusBar hidden={true}/>
      <Navigator/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

});
