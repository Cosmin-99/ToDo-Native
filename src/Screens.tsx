import React, { useState } from 'react';
import { StyleSheet, Text, View  , ImageBackground, Dimensions} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from './Home';
import { Add, Todo } from './AddTodo';
import {ShowList} from './TodoList';
import {MaterialCommunityIcons} from '@expo/vector-icons';


export function Tabs(props: { dataStorage: Todo[]}){

  const Tab = createBottomTabNavigator();

  return(
  <Tab.Navigator>
      <Tab.Screen name = "Home" 
                component = {HomeScreen} 
                options = {{tabBarIcon: () => (
                  <MaterialCommunityIcons name = "home-flood" size = {20} color = "red"/>
                  ),
                  }}/>
      <Tab.Screen name = "Add" 
                component = {prop => <Add {...props}/>}
                options = {{tabBarIcon: () => (
                    <MaterialCommunityIcons name = "plus-circle-multiple-outline" size = {20} color = "red"/>
                  ),
                  }}/>
      <Tab.Screen name = "Todos"
                component = {prop => <ShowList {...props}/>}
                options = {{tabBarIcon: () => (
                  <MaterialCommunityIcons name = "book-open-page-variant" size = {20} color = "red" />
                  ),
                  }} />
  </Tab.Navigator>
  );
}


