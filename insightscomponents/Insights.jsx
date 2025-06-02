import{View,StyleSheet,Text} from 'react-native';

function Insights(){

    return(
    <View style={styles.container}>
        <Text style={styles.insight}>
        “Your fastest 5k times happened on days when you ate 60g+ carbs within 2 hours before running”
        </Text>
        <Text style={styles.insight}>
        “Performance tends to dip by 15% after low-carb days.”
        </Text>
        <Text style={styles.more}>More Insights.....</Text>
    </View>

      
    );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    padding: 16,
    backgroundColor: '#EAE2D8',
    marginBottom: 30,
    margin:30,
  },
  insight: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  more: {
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 10,
  },
});

export default Insights