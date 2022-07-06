import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import { Component } from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';



export default class AuthOrApp extends Component {

  componentDidMount = async () => {
    const userDataJson = await AsyncStorage.getItem('userData')
    let userData = null

    try {
      JSON.parse(userDataJson)
    }
    catch (e) {

    }

    if (userData && userData.token) {
      axios.defaults.headers.common['Authorization'] = `bearer ${userData.token}`
      this.props.navigation.navigate('Home', res.data)
      this.props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: 'Home',
              params: userData,
            },
          ],
        })
      )
    }
    else {
      this.props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: 'Auth',
            },
          ],
        })
      )
    }  
  }
  


  render() {
    return(
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  }
})