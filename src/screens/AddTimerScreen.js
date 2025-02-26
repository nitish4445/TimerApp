import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Switch, Text } from 'react-native';
import { saveTimers } from '../utils/storage';

const AddTimerScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('');
  const [halfwayAlert, setHalfwayAlert] = useState(false);

  const handleAddTimer = async () => {
    const newTimer = {
      name,
      duration: parseInt(duration, 10),
      category,
      halfwayAlert,
      remainingTime: parseInt(duration, 10),
      status: 'Running', // Start the timer immediately
    };
    const currentTimers = await loadTimers();
    const updatedTimers = [...currentTimers, newTimer];
    await saveTimers(updatedTimers);
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Timer Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Duration (seconds)"
        value={duration}
        onChangeText={setDuration}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
        style={styles.input}
      />
      <View style={styles.switchContainer}>
        <Text>Halfway Alert</Text>
        <Switch
          value={halfwayAlert}
          onValueChange={setHalfwayAlert}
        />
      </View>
      <Button title="Add Timer" onPress={handleAddTimer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});

export default AddTimerScreen;