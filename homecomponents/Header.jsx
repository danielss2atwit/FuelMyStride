import { View,StyleSheet,Image } from 'react-native';
import React from 'react';

function Header(){
    return(
        <View style={styles.container}>
        <Image style={styles.logoImage} source={require('../images/logo-only.png')}/>
        </View>


    );
}

export default Header;

const styles = StyleSheet.create({
    logoImage:{
        width:85,
        height: 85,
        resizeMode: 'contain',
        padding: 10,
        marginTop:40,

    },
    container:{
         flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:10,
    },

});