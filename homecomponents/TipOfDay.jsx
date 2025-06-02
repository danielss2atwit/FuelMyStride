import { StyleSheet, Text, View } from 'react-native';


function TipOfDay() {
  return (
    <View style={styles.tipBox}>
      <Text style={styles.tipTitle}>⭐Tip of the Day⭐</Text>
      <Text style={styles.tipText}>Try having a carb-based snack 1hr before your run today!</Text>
    </View>
  );
}

export default TipOfDay;

const styles = StyleSheet.create({
  tipBox: {
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    marginBottom: 10,
    width:300,
    height:125,
    alignSelf:'center',
  },
  tipTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 20,
  },
  tipText: {
    textAlign: 'center',
  },
});
