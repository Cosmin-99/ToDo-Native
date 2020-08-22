import React, { useState, SetStateAction, useEffect } from 'react';
import { Text, View, Picker, StyleSheet, ScrollView, ImageBackground, Modal, TextInput, TouchableOpacity } from 'react-native';
import { Todo, options } from './AddTodo';
import { SafeAreaView, withOrientation } from 'react-navigation';
import moment from 'moment';
import { Button, Icon, ListItem } from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';


export function ShowList(props: { dataStorage: Todo[], setDataStorage: (e: SetStateAction<Todo[]>) => void }) {

    const getTodo = async (): Promise<void> => {
        try {
            const response: Response = await fetch("http://192.168.0.107:5000/todo");
            const jsonData = await response.json();

            props.setDataStorage(jsonData);
            console.log(jsonData);

        } catch (err) {
            console.log(err);
        }
    }

    const deleteTodo = async (id: number): Promise<void> => {
        try {
            const respone: Response = await fetch(`http://192.168.0.107:5000/todo/${id}`, {
                method: "DELETE"
            });

            props.setDataStorage(props.dataStorage.filter(todo => todo.id !== id))
        } catch (err) {
            console.log(err);
        }
    }

    const editTodo = async (): Promise<void> => {
        try {
            const body = { ...todos};

            const response: Response = await fetch(`http://192.168.0.107:5000/todo/${todos.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

        } catch (err) {
            console.log(err);

        }
    }

    useEffect(() => {
        getTodo();
    }, []);

    const [selctedValue, setSelectedValue] = useState<string>("")

    const [modal, setModal] = useState<boolean>(false)

    const [todos, setTodos] = useState<Todo>({
        titlu: "",
        responsabil: "",
        status: "",
        dataFinalizare: moment(""),
        termenFinalizare: moment("")
    })

    const [isDateVisible, setDateVisible] = useState(false)

    const showDate = () => {
        setDateVisible(true);
    }

    const hideDate = () => {
        setDateVisible(false);
    }

    const handleConfirm = (date: Date) => {
        setTodos({ ...todos, termenFinalizare: moment(date).format("YYYY-MM-DD") })
        //console.warn("A date has been picked: ", date);
        hideDate();
    }

    const handleConfirm2 = (date: Date) => {
        setTodos({ ...todos, dataFinalizare: moment(date).format("YYYY-MM-DD") })
        //console.warn("A date has been picked: ", date);
        hideDate();
    }

    return (
        <ImageBackground source={require('../app_images/desk.jpg')}
            style={styles.imgBackground}>

            <SafeAreaView style={styles.view} >
                <ScrollView>
                    <View>
                        <Text style={styles.title}>
                            Please pick the status
                        </Text>

                        <Picker selectedValue={selctedValue}
                            onValueChange={(e) => setSelectedValue(e)}
                            style={styles.picker} >
                            {options.map(data => <Picker.Item label={data.label} value={data.val} />)}
                        </Picker>

                        {props.dataStorage.filter(e => e.status === selctedValue).map(datas => <ListItem>
                            <Text style={styles.container}>{"\n"}Title: {datas.titlu}{"\n"}
                        Responsible: {datas.responsabil}{"\n"}
                        Status: {datas.status}{"\n"}
                        Added date: {moment(datas.termenFinalizare).format("DD-MM-YYYY")}{"\n"}
                        Due date: {moment(datas.dataFinalizare).format("DD-MM-YYYY")}{"\n"}
                            </Text>
                            <Button danger transparent onPress={() => deleteTodo(datas.id)}>
                                <Icon name="trash" />
                            </Button>
                            <Button transparent onPress={() => { setTodos(datas); setModal(true) }}>
                                <Icon name="color-filter" />
                            </Button>
                        </ListItem>
                        )}

                    </View>
                </ScrollView>
            </SafeAreaView>

            <Modal animationType='fade' visible={modal} onRequestClose={() => setModal(false)}>
                <View style={styles.modalView}>
                    <Text style={styles.title}>Please type in the form  new data about Todo</Text>

                    <TextInput value={todos.titlu}
                        placeholder="Add a title"
                        onChangeText={(e) => setTodos({ ...todos, titlu: e })}
                        style={styles.form}
                        inlineImageLeft='search_icon'
                    />

                    <TextInput value={todos.responsabil}
                        placeholder="Type the name of responsible person"
                        onChangeText={(e) => setTodos({ ...todos, responsabil: e })}
                        style={styles.form}
                    />

                    <Picker selectedValue={todos.status} style={styles.form} onValueChange={(e) => setTodos({ ...todos, status: e })}>
                        {options.map(data => <Picker.Item label={data.label} value={data.val} />)}
                    </Picker>

                    <TouchableOpacity onPress={showDate} style={styles.button}>
                        <Text style={styles.text}>Touch to set the due date</Text>
                    </TouchableOpacity>

                    <DateTimePicker
                        isVisible={isDateVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDate}
                    />

                    <TouchableOpacity onPress={showDate} style={styles.button}>
                        <Text style={styles.text}>Touch to set the added date</Text>
                    </TouchableOpacity>

                    <DateTimePicker
                        isVisible={isDateVisible}
                        mode="date"
                        onConfirm={handleConfirm2}
                        onCancel={hideDate}
                    />

                    <TouchableOpacity onPress={() => {editTodo(); setModal(false)}} style={styles.button2}>
                        <Text style={styles.text}>Add</Text>
                    </TouchableOpacity>

                </View>
            </Modal>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        textAlign: "center",
        justifyContent: "center",
        fontFamily: 'sans-serif-light',
        padding: 10,
        borderColor: 'black',
        borderRadius: 25,
        borderWidth: 1,
        height: 150,
        backgroundColor: '#87CEFA',
    },

    imgBackground: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
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

    button2: {
        marginTop: 19,
        paddingTop: 10,
        paddingBottom: 10,
        marginLeft: 100,
        marginRight: 100,
        backgroundColor: '#6B8E23',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black'
    },

    button3: {
        marginTop: 19,
        paddingTop: 10,
        paddingBottom: 10,
        marginLeft: 100,
        marginRight: 100,
        backgroundColor: 'red',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black'
    },

    view: {
        flex: 1,
        justifyContent: "space-around",
        width: "80%",
        height: "80%",
        backgroundColor: "rgba(400,400,400,.5)"
    },

    buttonContainer: {
        margin: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    text: {
        textAlign: "center",
    },

    form: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray',
        textAlign: "center"
    },

    button: {
        marginTop: 10,
        paddingTop: 15,
        paddingBottom: 15,
        marginLeft: 30,
        marginRight: 30,
        backgroundColor: '#00BCD4',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'
    },

    modalView: {
        flex: 1,
        backgroundColor: 'white',
        //alignItems: 'center',
        justifyContent: 'center'
    }
})