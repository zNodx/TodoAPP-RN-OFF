import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import AuthOrApp from './screens/AuthOrApp'
import Auth from './screens/Auth'
import TaskList from './screens/TaskList'
import Menu from './screens/Menu';
import commonStyles from './commonStyles';
 
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const menuConfig = {
    initialRouteName: 'Today',
    contentComponet: Menu,
    contentOptions: {
        drawerLabel: {
            fontFamily: commonStyles.fontFamily,
            fontWeight: 'normal',
            fontSize: 20
        },
        activeLabelStyle:{
            color: '#080',
            fontWeight: 'bold'
        }
    }
}

const DrawerNavigator = props => {
    const { email, name } = props.route.params
    console.log(email, name);
    return (
        <Drawer.Navigator  screenOptions={{
            headerShown: false,  
            }} drawerContent={props => <Menu {...props} email={email} name={name} />}>
            <Drawer.Screen name="Today" options={{ title: 'Hoje' }}>
                {props => <TaskList {...props} title='Hoje' daysAhead={0} />}
            </Drawer.Screen>
            <Drawer.Screen name="Tomorrow" options={{ title: 'Amanhã' }}>
                {props => <TaskList {...props} title='Amanhã' daysAhead={1} />}
            </Drawer.Screen>
            <Drawer.Screen name="Week" options={{ title: 'Semana' }}>
                {props => <TaskList {...props} title='Semana' daysAhead={7} />}
            </Drawer.Screen>
            <Drawer.Screen name="Month" options={{ title: 'Mês' }}>
                {props => <TaskList {...props} title='Mês' daysAhead={30} />}
            </Drawer.Screen>
        </Drawer.Navigator>
    );
};
 
const AuthNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='AuthOrApp'>
            <Stack.Screen name="AuthOrApp" component={AuthOrApp}  />
            <Stack.Screen name="Auth" component={Auth} />
            <Stack.Screen name="Home" component={DrawerNavigator} />
        </Stack.Navigator>
    );
};
 
const Navigator = () => {
    return (
        <NavigationContainer>
            <AuthNavigator />
        </NavigationContainer>
    );
};
 
export default Navigator;