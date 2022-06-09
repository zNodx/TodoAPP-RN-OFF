import { Alert, StyleSheet, Text, View, ImageBackground, FlatList, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import React, {Component} from 'react'

import {FontAwesome} from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'

import moment from 'moment'
import 'moment/locale/pt-br'

import todayImage from '../../assets/imgs/today.jpg'
import Task from '../components/Task'
import commonStyles from '../commonStyles'
import AddTask from './AddTask'

const initialState = {
  showDoneTasks: true,
  showAddTask: false,
  visibleTasks: [],
  tasks: []
}

export default class TaskList extends Component {

 state={
    ...initialState
 }

 componentDidMount = async () => {
   const stateString =  await AsyncStorage.getItem('tasksState')
   const state = JSON.parse(stateString) || initialState
   this.setState(state)
 }



 toggleFilter = () => {
   this.setState({ showDoneTasks: !this.state.showDoneTasks}, this.filterTasks )
 }

 filterTasks = () => {
   let visibleTasks = null
   if(this.state.showDoneTasks){
      visibleTasks = [...this.state.tasks]
   }else{
      const pending = task => task.doneAt === null
      visibleTasks = this.state.tasks.filter(pending)
   }
 
   this.setState({ visibleTasks })
 }

 toggleTask = taskId => {

  const tasks = [...this.state.tasks]
  tasks.forEach( task =>{
    if(task.id === taskId){
      task.doneAt = task.doneAt ? null : Date.now()
    }    
  })
  this.setState({tasks}, this.filterTasks)
  AsyncStorage.setItem('tasksState', JSON.stringify(this.state))
}

  addTask = newTask =>{
    if(!newTask.desc || !newTask.desc.trim()){
      Alert.alert('Dados Inválidos', 'Descrição não informada!')
      return
    }
    const tasks = [...this.state.tasks]
    tasks.push({
      id: Math.random(),
      desc: newTask.desc,
      estimateAt: newTask.date,
      doneAt: null
    })

    this.setState({ tasks, showAddTask: false }, this.filterTasks)

  }

  deleteTask = id => {
    const tasks = this.state.tasks.filter(task => task.id !== id)
    this.setState({tasks}, this.filterTasks)
    AsyncStorage.setItem('tasksState', JSON.stringify(this.state))
  }



  render() {
    const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
    return(
      <View style={styles.container}>
      <AddTask isVisible={this.state.showAddTask} onSave={this.addTask} onCancel={() => this.setState({ showAddTask: false })}/>
      <ImageBackground style={styles.background} source={todayImage}>
        <View style={styles.iconBar}>
          <TouchableOpacity
            onPress={() => this.toggleFilter()}
          >
              <FontAwesome name={ this.state.showDoneTasks ? 'eye' : 'eye-slash'} size={40} color={commonStyles.colors.secondary} />
          </TouchableOpacity>
        </View>
        <View style={styles.titleBar}>
            <Text style={styles.title}>Hoje</Text>
            <Text style={styles.subtitle}>{today}</Text>
        </View>
      </ImageBackground>
      <View style={styles.taskList}>
        <FlatList
          data={this.state.visibleTasks}
          keyExtractor={item => item.id}
          renderItem={(task) => <Task {...task.item} toggleTask={this.toggleTask} onDelete={this.deleteTask}/>} 
        />
      </View>
      <TouchableOpacity activeOpacity={0.7} style={styles.addButton} onPress={() => this.setState({showAddTask: true})}>
        <FontAwesome name='plus' size={20} color={commonStyles.colors.secondary}/>
      </TouchableOpacity>
    </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background:{
    flex: 3
  },
  taskList:{
    flex:7
  }, 
  titleBar: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  title: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 50,
    marginLeft: 20,
    marginBottom: 20 
  },
  subtitle: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 20,
    marginLeft: 20,
    marginBottom:30
  },
  iconBar: {
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'flex-end',
    marginTop: 20

  },
  addButton:{
    justifyContent: 'center',
    alignItems: 'center',
    position:'absolute',
    right:30,
    bottom:30,
    width:50,
    height:50,
    borderRadius:25,
    backgroundColor: commonStyles.colors.today
  }
})