import {View,Text,TextInput,StyleSheet} from 'react-native';
import React, {useRef} from 'react';

function Journal({scrollRef,value,onChangeText}){
  const inputRef = useRef(null);

  const handleFocus =()=>{
    if (scrollRef?.current && inputRef?.current){
      scrollRef.current.scrollToFocusedInput(inputRef.current);
    }
  };
  

    return(
      <View style={styles.container}>
      <Text style={styles.label}>Journal</Text>
      <TextInput
      ref={inputRef}
        style={styles.input}
        placeholder="Write about your workout..."
        multiline={true}
        textAlignVertical="top"
        onFocus={handleFocus}
        value={value}
        onChangeText={onChangeText}
      />
     
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
 
});

export default Journal;