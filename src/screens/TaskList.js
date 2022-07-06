import { Alert, StyleSheet, Text, View, ImageBackground, FlatList, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import React, {Component} from 'react'

import {FontAwesome} from '@expo/vector-icons'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import moment from 'moment'
import 'moment/locale/pt-br'

import { server, showError} from '../common'
import todayImage from '../../assets/imgs/today.jpg'
import tomorrow from '../../assets/imgs/tomorrow.jpg'
import week from '../../assets/imgs/week.jpg'
import month from '../../assets/imgs/month.jpg'
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
   const savedState = JSON.parse(stateString) || initialState
   this.setState({
     showDoneTasks: savedState.showDoneTasks
   }, this.filterTasks)
   this.loadTasks()
 }

 loadTasks = async () => {
  try{
    const maxDate = moment()
      .add({ days: this.props.daysAhead})
      .format('YYYY-MM-DD 23:59:59')
    const res = await axios.get(`${server}/tasks?date=${maxDate}`)
    this.setState({tasks: res.data }, this.filterTasks)
   } catch(e){
      showError(e)
   }
 }


 toggleFilter = () =>  this.setState({ showDoneTasks: !this.state.showDoneTasks}, this.filterTasks )

 filterTasks = () => {
   let visibleTasks = null
   if(this.state.showDoneTasks){
      visibleTasks = [...this.state.tasks]
   }else{
      const pending = task => task.doneAt === null
      visibleTasks = this.state.tasks.filter(pending)
   }
 
   this.setState({ visibleTasks })
   AsyncStorage.setItem('tasksState', JSON.stringify({
    showDoneTasks: this.state.showDoneTasks
   }))
 }

 toggleTask = async taskId => {
   
  try {
    await axios.put(`${server}/tasks/${taskId}/toggle`)
    this.loadTasks()
  } catch(e){
    showError(e)
  }

}

  addTask = async newTask =>{
    if(!newTask.desc || !newTask.desc.trim()){
      Alert.alert('Dados Inválidos', 'Descrição não informada!')
      return
    }

    try {
      await axios.post(`${server}/tasks`, {
        desc: newTask.desc,
        estimateAt: newTask.date
      })
      this.setState({ showAddTask : false }, this.loadTasks)
    } catch(e){
      showError(e)
    }
  }

  deleteTask = async taskId => {

    try {
      await axios.delete(`${server}/tasks/${taskId}`)
      this.loadTasks()
    } catch(e){
      showError(e)
    }

  }

  getImage = () => {
    switch(this.props.daysAhead){
      case 0: return todayImage
      case 1: return tomorrow
      case 7: return week
      default: return month
    }
  }

  getColor = () => {
    switch(this.props.daysAhead){
      case 0: return commonStyles.colors.today
      case 1: return commonStyles.colors.tomorrow
      case 7: return commonStyles.colors.week
      default: return commonStyles.colors.month
    }
  }

  render() {
    const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
    return(
      <View style={styles.container}>
      <AddTask isVisible={this.state.showAddTask} onSave={this.addTask} onCancel={() => this.setState({ showAddTask: false })}/>
      <ImageBackground style={styles.background} source={this.getImage( )}>
        <View style={styles.iconBar}>
          <TouchableOpacity
            onPress={() => this.props.navigation.openDrawer()}
          >
              <FontAwesome name='bars' size={20 } color={commonStyles.colors.secondary} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.toggleFilter()}
          >
              <FontAwesome name={ this.state.showDoneTasks ? 'eye' : 'eye-slash'} size={20 } color={commonStyles.colors.secondary} />
          </TouchableOpacity>
        </View>
        <View style={styles.titleBar}>
            <Text style={styles.title}>{this.props.title}</Text>
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
      <TouchableOpacity activeOpacity={0.7} style={[styles.addButton, {backgroundColor: this.getColor()}]} onPress={() => this.setState({showAddTask: true})}>
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
    justifyContent: 'space-between',
    marginTop: 25

  },
  addButton:{
    justifyContent: 'center',
    alignItems: 'center',
    position:'absolute',
    right:30,
    bottom:30,
    width:50,
    height:50,
    borderRadius:25
  }
})