import { StyleSheet, Text, View, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import commonStyles from '../commonStyles'
import {FontAwesome} from '@expo/vector-icons'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import moment from 'moment'
import 'moment/locale/pt-br'
import React from 'react'

const Task = ({ id, desc, estimateAt, doneAt, toggleTask, onDelete}) => {

  const date = moment(estimateAt).locale('pt-br').format('ddd, D [de] MMMM')
  const getCheckView = (doneAt) => {
    if(doneAt != null){
      return(
          <View style={styles.done}><FontAwesome name='check' size={15} color='#FFF'/></View>
      )
    }else{
      return (
        <View style={styles.pending}></View>
      )
    }
  }

  const getRightContent = () => {
    return (
      <TouchableOpacity style={styles.right} onPress={() => onDelete && onDelete(id)}>
        <FontAwesome name="trash" size={30} color={'#FFF'}/>
      </TouchableOpacity>
    )
  }
  const getLeftContent = () => {
    return (
      <View style={styles.left}>
        <FontAwesome name="trash" size={20} color={'#FFF'} style={styles.excludeIcon}/>
        <Text style={styles.excludeText}>Excluir</Text>
      </View>
    )
  }

  return (
    <GestureHandlerRootView>
      <Swipeable
        renderLeftActions={getLeftContent}
        renderRightActions={getRightContent}
        onSwipeableLeftOpen={() => onDelete && onDelete(id)}
        >
        <View style={styles.container}>
          <TouchableWithoutFeedback
            onPress={() => toggleTask(id)}
          >
            <View style={styles.checkContainer}>
              {getCheckView(doneAt)}
            </View>
          </TouchableWithoutFeedback>
          <View>
            <Text style={[styles.desc,doneAt != null && {textDecorationLine:'line-through'}]}>{desc}</Text>
            <Text style={styles.date}>{date}</Text>
          </View>
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  )
}

export default Task

const styles = StyleSheet.create({
  container:{
    flexDirection: 'row',
    borderColor: '#AAA',
    borderBottomWidth: 1,
    alignItems: 'center',
    backgroundColor: '#FFF'    
  },
  checkContainer: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center'
  }, 
  pending: {
    height: 25,
    width: 25,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#555'
  },
  done: {
    height: 25,
    width: 25,
    borderRadius: 13,
    borderWidth: 1,
    backgroundColor: '#4D7031',
    alignItems: 'center',
    justifyContent: 'center'
  },
  desc:
  {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.mainText,
    fontSize: 15
  },
  date: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.subText
  },
  right:{
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 20
  },
  left: {
    flex:1,
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center'
  },
  excludeText: {
    fontFamily: commonStyles.fontFamily,
    color: '#FFF',
    fontSize: 15,
    margin: 10
  },
  excludeIcon: {
    marginLeft: 10
  }
})