import {View,Text,StyleSheet} from 'react-native';
import PostHeader from '../postcomponents/PostHeader';
import IdealPlate from '../postcomponents/IdealPlate';
import InsightsCard from '../postcomponents/InsightsCard';

function PostWorkout(){

    return(
    <View>
        <PostHeader />
        <IdealPlate />
        <InsightsCard />
    </View>

        
    );
}
export default PostWorkout;
