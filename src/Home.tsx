import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons';
import { View ,SafeAreaView ,TouchableOpacity,Text,StyleSheet,ImageBackground } from 'react-native';



export function HomeScreen(){

    return (
        <ImageBackground source = {require('../app_images/desk.jpg')}
                         style = {styles.imgBackground}>
            <View style = {styles.view}>                 
                <Text style={styles.container}>
                    That's my first ToDo App for mobile , please enjoy it !!!
                </Text>
            </View>    
        </ImageBackground>
    );
}

const styles = StyleSheet.create(
    {
        container: {
            fontFamily: 'sans-serif-light',
            textAlign: 'center',
            padding: 60
        },

        imgBackground: {
            width: '100%',
            height: '100%',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        },

       view: {
           width: "80%",
           height: "80%",
           backgroundColor: "rgba(255,255,255,.6)"
       }
    }
)