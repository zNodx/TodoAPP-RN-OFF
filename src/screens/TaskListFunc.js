import { Alert, StyleSheet, Text, View, ImageBackground, FlatList, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import React,{useState, useEffect} from 'react'

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

export default function TaskListFunc() {

  const [showDoneTasks, setShowDoneTasks] = useState(true)
  const [showAddTask, setShowAddTask] = useState(false)
  const [visibleTasks, setVisibleTasks] = useState([])
  const [tasks, setTasks] = useState([])

  useEffect(() => {

    const stateString = AsyncStorage.getItem('tasksState')
    const state = JSON.parse(stateString) || initialState
    setTasks(state.tasks || initialState.tasks) 
    setShowDoneTasks(state.showDoneTasks || initialState.)
    setShowAddTask(state.showAddTask || initialState.)
    setVisibleTasks(state.visibleTasks || initialState.)
  },[])

  const toggleFilter = () => setShowDoneTasks(!showDoneTasks)

  const filterTasks = () => {
    let visibleTasks = null
    if(showDoneTasks){
       visibleTasks = [...this.state.tasks]
    }else{
       const pending = task => task.doneAt === null
       visibleTasks = this.state.tasks.filter(pending)
   }
  }

  return (
    <View>
      <Text>TaskListFunc</Text>
    </View>
  )
}