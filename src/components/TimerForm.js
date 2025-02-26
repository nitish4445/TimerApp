import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet,
  Switch,
  ScrollView 
} from 'react-native';
import { useTimerContext, ACTIONS } from '../contexts/TimerContext';

const TimerForm = ({ navigation }) => {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('');
  const [halfwayAlert, setHalfwayAlert] = useState(false);
  const [errors, setErrors] = useState({});
  
  const { dispatch } = useTimerContext();
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!name.trim()) {
      newErrors.name = 'Timer name is required';
    }
    
    if (!duration.trim()) {
      newErrors.duration = 'Duration is required';
    } else if (isNaN(Number(duration)) || Number(duration) <= 0) {
      newErrors.duration = 'Duration must be a positive number';
    }
    
    if (!category.trim()) {
      newErrors.category = 'Category is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = () => {
    if (validateForm()) {
      const durationInSeconds = Number(duration);
      const newTimer = {
        id: Date.now().toString(),
        name,
        duration: durationInSeconds,
        remaining: durationInSeconds,
        category,
        status: 'paused',
        createdAt: new Date(),
        completedAt: null,
        halfwayAlert
      };
      
      dispatch({ type: ACTIONS.ADD_TIMER, payload: newTimer });
      navigation.goBack();
    }
  };
  
  const predefinedCategories = ['Workout', 'Study', 'Work', 'Break', 'Personal'];
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Timer Name</Text>
        <TextInput
          style={styles.input}
          placeholder="E.g., Morning Workout"
          value={name}
          onChangeText={setName}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
        
        <Text style={styles.label}>Duration (seconds)</Text>
        <TextInput
          style={styles.input}
          placeholder="E.g., 60 for 1 minute"
          value={duration}
          onChangeText={setDuration}
          keyboardType="numeric"
        />
        {errors.duration && <Text style={styles.errorText}>{errors.duration}</Text>}
        
        <Text style={styles.label}>Category</Text>
        <TextInput
          style={styles.input}
          placeholder="E.g., Workout"
          value={category}
          onChangeText={setCategory}
        />
        {errors.category && <Text style={styles.errorText}>{errors.category}</Text>}
        
        <Text style={styles.sectionTitle}>Suggested Categories</Text>
        <View style={styles.categoriesContainer}>
          {predefinedCategories.map(cat => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryChip,
                category === cat && styles.selectedCategoryChip
              ]}
              onPress={() => setCategory(cat)}
            >
              <Text 
                style={[
                  styles.categoryChipText,
                  category === cat && styles.selectedCategoryChipText
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.alertContainer}>
          <Text style={styles.label}>Halfway Alert</Text>
          <Switch
            value={halfwayAlert}
            onValueChange={setHalfwayAlert}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={halfwayAlert ? '#2196F3' : '#f4f3f4'}
          />
        </View>
        
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Create Timer</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  formContainer: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  errorText: {
    color: 'red',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 8,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  categoryChip: {
    backgroundColor: '#E0E0E0',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
  },
  selectedCategoryChip: {
    backgroundColor: '#2196F3',
  },
  categoryChipText: {
    fontWeight: '500',
  },
  selectedCategoryChipText: {
    color: 'white',
  },
  alertContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
    paddingVertical: 8,
  },
  submitButton: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 16,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TimerForm;
