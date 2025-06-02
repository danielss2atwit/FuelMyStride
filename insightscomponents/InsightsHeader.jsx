import{View,Image,StyleSheet,Text} from 'react-native';

function InsightsHeader(){

    return(
        <View style={styles.container}>
            <View style={styles.placeholder} />
                <Text style={styles.title}>Your Personalized{"\n"}Insights</Text>
                <Image style={styles.image} source={require('../images/logo-only.png')}/>
                    
                </View>
    );
}


const styles = StyleSheet.create({
    container:{
    marginTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // Vertically center both title and image
    paddingHorizontal: 20, // optional spacing from sides
    
    },
    title:{
    fontSize: 25,
    flex: 1, // takes available space
    textAlign: 'center',
    fontWeight:'bold',
        
        
    },
    image:{
        height:70,
        width:70,
        resizeMode: 'contain',
    },
    placeholder:{
        width:70,
    }

})

export default InsightsHeader