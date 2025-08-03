import {StyleSheet, View} from 'react-native';
import WellnessHeader from '../wellnesscomponents/WellnessHeader';
import WellnessForm from '../wellnesscomponents/WellnessForm';

function Wellness() {
    return(
        <View style={styles.screen}>
            <WellnessHeader />
            <WellnessForm />
        </View>
    );
}

export default Wellness

const styles = StyleSheet.create({
    screen:{
        flex:1,
        backgroundColor:'#E6F0FA', 
    }
})