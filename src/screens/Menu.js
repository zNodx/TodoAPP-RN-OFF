import React from "react";
import {ScrollView, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {  DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {FontAwesome} from '@expo/vector-icons'
import { Gravatar } from "react-native-gravatar";
import commonStyles from "../commonStyles";


export default (props) => {
  
  const logout = () => {
    delete axios.defaults.headers.common['Authorization']
    AsyncStorage.removeItem('userData')
    props.navigation.dispatch(
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

  return (
    <DrawerContentScrollView {...props}>
      <Text style={styles.title}>
        TASK
      </Text>
      <View style={styles.header}>
        <Gravatar style={styles.avatar} options={{
            secure: true 
        }}/>
      </View>
      <View style={styles.drawerOptions}>
      <View style={styles.userInfos}>
        <Text>{props.email}</Text>
        <Text>{props.name}</Text>
      </View>
      <TouchableOpacity onPress={logout}>
        <View style={styles.logoutIcon}>
          <FontAwesome name='sign-out' size={30} color='#800' />
        </View>
      </TouchableOpacity>
      </View>
      <DrawerItemList {...props }/>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  header:{
    borderBottomWidth: 1,
    borderColor: '#DDD',
    display: "flex",
    flexDirection:"row",
    justifyContent:"center",
  },
  title: {
    color: '#000',
    fontFamily: commonStyles.fontFamily,
    fontSize: 30,
    textAlign:"center",
    paddingTop:30,
    padding:10,
   },
  avatar:{
    width: 60,
    height: 60,
    borderWidth: 3,
    borderRadius: 30,
    margin: 10
  },
  userInfos:{
    margin:10,
    fontFamily: commonStyles.fontFamily   
  },
  drawerOptions:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  logoutIcon: {
    marginLeft: 10,
    marginBottom: 10
  }
})