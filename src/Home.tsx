import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons';
import { View ,SafeAreaView ,TouchableOpacity,Text,StyleSheet,ImageBackground } from 'react-native';



export function HomeScreen(){

    return (
            <Text style={styles.container}>
                That's my first ToDo App for mobile , please enjoy it !!!
            </Text>
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
            flex: 1
        }
    }
)