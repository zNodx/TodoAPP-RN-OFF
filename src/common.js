import { Alert, Platform } from "react-native";

const server = 'http://192.168.15.29:3000'

function showError(err) {
  Alert.alert('Ops! Ocorreu um Problema!', `Mensagem: ${err}`)
}

function showSuccess(msg){
  Alert.alert('Sucesso!', 'Logar')
}

export { server, showError, showSuccess}