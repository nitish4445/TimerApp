import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const CategoryActions = ({ category, onAction }) => {
  return (
    <View style={styles.actionsContainer}>
      <Button title="Start All" onPress={() => onAction(category, 'start')} />
      <Button title="Pause All" onPress={() => onAction(category, 'pause')} />
      <Button title="Reset All" onPress={() => onAction(category, 'reset')} />
    </View>
  );
};

const styles = StyleSheet.create({
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default CategoryActions;