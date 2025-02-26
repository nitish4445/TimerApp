import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { loadHistory } from '../utils/storage';

const HistoryScreen = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const loadHistoryData = async () => {
      const storedHistory = await loadHistory();
      setHistory(storedHistory);
    };
    loadHistoryData();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={history}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.historyItem}>
            <Text>{item.name}</Text>
            <Text>{new Date(item.completionTime).toLocaleString()}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  historyItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
});

export default HistoryScreen;