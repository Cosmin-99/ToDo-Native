import React, {useState} from 'react';
import {Text,View, Picker, StyleSheet, ScrollView} from 'react-native';
import { Todo , options } from './AddTodo';
import { SafeAreaView } from 'react-navigation';


export function ShowList(props: {dataStorage: Todo[]}){

    const [selctedValue,setSelectedValue] = useState("")

    return(
        <SafeAreaView style = {styles.view} >
        <ScrollView>
            <View >
            <Text style = {styles.title}>
                Please pick the status 
            </Text>

            <Picker selectedValue = {selctedValue} 
                    onValueChange = {(e) => setSelectedValue(e)}
                    style = {styles.picker} >
            {options.map(data => <Picker.Item label = {data.label} value = {data.val} />)}
            </Picker>
        
                        {props.dataStorage.filter(e => e.status === selctedValue).map(datas =>
                        <Text style = {styles.container}>Title: {datas.titlu}{"\n"}
                        Responsible: {datas.responsabil}{"\n"}
                        Status: {datas.status}{"\n"}
                        Added date: {datas.termenFinalzare}{"\n"}
                        Due date: {datas.dataFinalizare}{"\n"}
                        {"\n"}
                        </Text>
                        ) }
                    
                   </View>
                </ScrollView>
            </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        textAlign: "center",
        justifyContent: "center",
        fontFamily: 'sans-serif-light',
        padding: 10,
    },

    title: {
        textAlign: "center",
        fontFamily: 'sans-serif-light',
        padding: 50
        
    },

    picker: {
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'red',
        textAlign: "center",
    },

    view: {
        flex: 1,
        justifyContent: "space-around",
    }
})