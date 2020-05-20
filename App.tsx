import React, { useState } from 'react';
import { StyleSheet, Text, View  , ImageBackground, Dimensions, TouchableHighlight} from 'react-native';
import {Add,Todo} from './src/AddTodo';
import { Tabs } from './src/Screens';
import { NavigationContainer } from '@react-navigation/native';


 

export default function App() {

  const [data,setData] = useState<Todo[]>([])

  return (           
                <NavigationContainer>
                  <Tabs dataStorage = {data} />
                </NavigationContainer>
        );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
