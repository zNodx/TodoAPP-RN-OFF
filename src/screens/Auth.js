import React, { Component } from 'react';
import {ImageBackground, Text, StyleSheet, View, TouchableOpacity, Alert} from 'react-native'
import backgroundImage from '../../assets/imgs/login.jpg'
import commonStyle from '../commonStyles'
import AuthInput from '../components/AuthInput';
import { server, showError,  showSuccess} from '../common';
import axios from 'axios';

const initialState = {
  name: '',
  email: 'ffrmateus@gmail.com',
  password: '123',
  confirmPassword:'',
  stageNew: false
}

export default class Auth extends Component {

  state ={
    ...initialState
  }

  signinOrSignUp = () => {
    if(this.state.stageNew){
        this.signup()
    }else {
      this.signin()
    }
  }


  signup = async () => {
    try {
      await axios.post(`${server}/signup`,{
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        confirmPassword:this.state.confirmPassword,
      })

      showSuccess('Usuário cadastrado!')
      this.setState({...initialState})
    }catch(e){
      showError(e)
    }
  }

  signin = async () => {
      try {
        const res = await axios.post(`${server}/signin`,{
          email: this.state.email,
          password: this.state.password
        })
        axios.defaults.headers.common['Authorization'] = `bearer ${res.data.token}`
        this.props.navigation.navigate('Home',res.data)
      }  catch(e){
        showError(e)
      }
  }

  render() {

    const validations = []
    validations.push(this.state.email && this.state.email.includes('@'))
    validations.push(this.state.password && this.state.password.length >= 3)

    if(this.state.stageNew){
        validations.push(this.state.name && this.state.name.trim().length >= 3)
        validations.push(this.state.password === this.state.confirmPassword)
    }

    const validForm = validations.reduce((t,a) => t && a)

    return (
      <ImageBackground style={styles.background} source={backgroundImage}>
        <Text style={styles.title}>Tasks</Text>
        <View style={styles.formContainer}>
          <Text style={styles.subTitle}>
            {this.state.stageNew ? 'Crie a sua conta': 'Entre na sua conta'}
          </Text>
          {this.state.stageNew &&
              <AuthInput icon="user" placeholder='Nome' value={this.state.name}
              style={styles.input} onChangeText={name => this.setState({name})}
            />
            
          }
          <AuthInput icon='at' placeholder='E-mail' value={this.state.email}
            style={styles.input} onChangeText={email => this.setState({email})}
          />
          <AuthInput icon='lock' placeholder='Password' secureTextEntry={true} value={this.state.password}
            style={styles.input} onChangeText={password => this.setState({password})}
          />
          {this.state.stageNew && 
          <AuthInput icon='asterisk' placeholder='Confirme a senha' secureTextEntry={true} value={this.state.confirmPassword}
          style={styles.input} onChangeText={confirmPassword => this.setState({confirmPassword})}
        />}
        <TouchableOpacity onPress={this.signinOrSignUp} disabled={!validForm}>
          <View style={[styles.button, validForm ? {} : {backgroundColor: '#AAA'}]}>
              <Text style={styles.buttonText}>{this.state.stageNew ? 'Registrar' : 'Entrar'}</Text>
          </View>
        </TouchableOpacity>
        </View>
        <TouchableOpacity style={{padding: 10 }} onPress={
          () => this.setState({stageNew: !this.state.stageNew})
        }>
          <Text style={styles.buttonText}>
            {this.state.stageNew ? 'Já possui uma conta?' : 'Ainda nāo possui conta?'}
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: commonStyle.fontFamily,
    color: commonStyle.colors.secondary,
    fontSize: 70,
    marginBottom: 10
  },
  subTitle: {
    fontFamily: commonStyle.fontFamily,
    color: '#FFF',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10
  },
  input: {
    marginTop: 10,
    backgroundColor: '#FFF',
    padding: 10
  },
  formContainer:{
    backgroundColor:'rgba(0,0,0, 0.8)',
    padding: 20,
    width: '90%'
  },
  button: {
    backgroundColor:'#080',
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
    width: '100%',
    borderRadius: 7
  },
  buttonText: {
    fontFamily: commonStyle.fontFamily,
    color: '#FFF',
    fontSize: 20
  }
})