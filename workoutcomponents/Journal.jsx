import {View,Text,TextInput,TouchableOpacity,StyleSheet} from 'react-native';

function Journal({navigation}){
  const handleSubmit =() =>{
    navigation.navigate('PostWorkout')
  }

    return(
      <View style={styles.container}>
      <Text style={styles.label}>Journal</Text>
      <TextInput
        style={styles.input}
        placeholder="Write about your workout..."
        multiline={true}
        textAlignVertical="top"
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
    );



}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    height: 120,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    backgroundColor: 'white',
    fontSize: 16,
    textAlignVertical: 'top',
  },
  button: {
    marginTop: 15,
    backgroundColor: '#822f88',
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
});

export default Journal;