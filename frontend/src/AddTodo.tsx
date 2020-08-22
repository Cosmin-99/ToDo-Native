import React, { useState, SetStateAction } from 'react';
import { View, TextInput , Text, Picker, Button , StyleSheet , TouchableOpacity, ImageBackground} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';


export interface Todo {
    id?: number | any
    titlu: string
    responsabil: string
    status: string
    dataFinalizare: any
    termenFinalizare: any
}

export interface Options {
    label: string
    val: string
}

export const options: Options[] =  [
    {label:"Planificat" , val: "Planificat"},
    {label:"In curs" , val: "In curs"},
    {label:"Terminat" , val: "Terminat"},
    {label:"Blocat" , val: "Blocat"}
];

export function Add(props: { dataStorage: Todo[], setDataStorage: (e: SetStateAction<Todo[]>) => void}){
    const [todo,setTodo] = useState<Todo>({
        titlu: "",
        responsabil: "",
        status: "",
        dataFinalizare: moment(""),
        termenFinalizare: moment("")
    })

const [isDateVisible,setDateVisible] = useState(false)

const showDate = () => {
    setDateVisible(true);
}

const hideDate = () => {
    setDateVisible(false);
}

const handleConfirm = (date: Date) => {
    setTodo({...todo, termenFinalizare: moment(date).format("YYYY-MM-DD")})
    console.warn("A date has been picked: ", date);
    hideDate();
}

const handleConfirm2 = (date: Date) => {
    setTodo({...todo, dataFinalizare: moment(date).format("YYYY-MM-DD")})
    console.warn("A date has been picked: ", date);
    hideDate();
}

const uploadData = () => {
    props.dataStorage.push(todo);
    console.warn(props.dataStorage)
}

const submitData = async () => {
    try {
        const body = {...todo};

        const response: Response = await fetch("http://192.168.0.107:5000/todo",{
            method: "POST",
            headers: {"Content-Type": "application/json" },
            body: JSON.stringify(body)
        })

        //console.log(response);
    } catch (err) {
        console.log(err);
    }
}

    return (
        <ImageBackground source = {require('../app_images/desk.jpg')}
                         style = {styles.imgBackground}>
            <View style = {styles.container}>
            
                <Text style = {styles.title}>Please type in the form data about Todo</Text>

                <TextInput value = {todo.titlu}
                        placeholder = "Add a title"
                        onChangeText = {(e) => setTodo({...todo , titlu: e})}
                        style = {styles.form}
                        inlineImageLeft = 'search_icon'
                />

                <TextInput value = {todo.responsabil}
                       placeholder = "Type the name of responsible person"
                       onChangeText = {(e) => setTodo({...todo,responsabil: e})}
                       style = {styles.form}
                />  

                <Picker selectedValue = {todo.status} style = {styles.form} onValueChange = {(e) => setTodo({...todo,status: e})}>
                {options.map(data => <Picker.Item label = {data.label} value = {data.val} />)}
                </Picker>

                <TouchableOpacity  onPress = {showDate} style = {styles.button}>
                <Text style = {styles.text}>Touch to set the due date</Text>
                </TouchableOpacity>

                <DateTimePicker
                isVisible = {isDateVisible} 
                mode = "date"
                onConfirm = {handleConfirm}
                onCancel = {hideDate}
                />
             
                <TouchableOpacity  onPress = {showDate} style = {styles.button}>
                <Text style = {styles.text}>Touch to set the added date</Text>
                </TouchableOpacity>

                <DateTimePicker
                isVisible = {isDateVisible} 
                mode = "date"
                onConfirm = {handleConfirm2}
                onCancel = {hideDate}
                />

                <TouchableOpacity  onPress = {submitData} style = {styles.button2}>
                <Text style = {styles.text}>Add</Text>
                </TouchableOpacity>

            </View>
        </ImageBackground>    
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-around",
        width: "90%",
        height: "80%",
        backgroundColor: "rgba(255,255,255,.6)"
    },

    form: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray',
        textAlign: "center"
    },

    button: {
        marginTop:10,
        paddingTop:15,
        paddingBottom:15,
        marginLeft:30,
        marginRight:30,
        backgroundColor:'#00BCD4',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff'
    },

    text: {
        textAlign: "center",
    },

    button2: {
        marginTop:8,
        paddingTop:8,
        paddingBottom:8,
        marginLeft:100,
        marginRight:100,
        backgroundColor:'#6B8E23',
        borderRadius:10,
        borderWidth: 1,
        borderColor: 'black'
    },

    title: {
        fontFamily: 'sans-serif-light',
        padding: 50,
        textAlign: 'center',
      },

      imgBackground: {
        width: '100%',
        height: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }
})