import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, TextInput, ScrollView, StyleSheet, Keyboard } from 'react-native';
import { useRoute } from '@react-navigation/native';


const FoodInput = () => {
  const route = useRoute();
  const { foodId } = route.params;
  const [food, setFood] = useState(null);
  const [weight, setWeight] = useState('');
  const [nutritionFacts, setNutritionFacts] = useState(null)

  useEffect(() => {
    const fetchFoodInput = async () => {
      try {
        const apiKey = 'sd8DWPmBSnFocMzJvTzQ6JcE1vHRxsabdd08JOC8';
        const endpoint = `https://api.nal.usda.gov/fdc/v1/food/${foodId}?api_key=${apiKey}`;
        const response = await axios.get(endpoint);
         setFood(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setFood(null);
      }
    };
  
    fetchFoodInput();
  }, [foodId]);
  

  const getNutrientAmount = (nutrientNames) => {
    let amount = 0;
    nutrientNames.forEach((name) => {
      const nutrient = food.foodNutrients.find((n) => n.name && n.name.toLowerCase() === name.toLowerCase());
      if (nutrient) {
        amount += nutrient.amount;
        
      }
    });
    return amount;
  };
  

  
  const updateNutritionFacts = () => {
    if (!weight || isNaN(weight) || weight <= 0) {
      setNutritionFacts(null);
      return;
    }
  
    const weightInGrams = parseFloat(weight);
    const updatedNutritionFacts = {
      calories: (getNutrientAmount(['Energy, kcal']) * weightInGrams) / 100,
      carbohydrates: (getNutrientAmount(['Carbohydrate, by difference', 'Carbohydrates, total']) * weightInGrams) / 100,
      protein: (getNutrientAmount(['Protein, total', '1003']) * weightInGrams) / 100,
      fat: (getNutrientAmount(['Total lipid (fat)', 'Fat, total']) * weightInGrams) / 100,
    };
  
   
    setNutritionFacts(updatedNutritionFacts);
  };
  
   

  const findNutrientByName = (nutrientNames) => {
    if (!Array.isArray(nutrientNames) || nutrientNames.length === 0) {
      return undefined;
    }
  
    return food.foodNutrients.find((n) =>
      nutrientNames.some((name) => n.name?.toLowerCase().includes(name.toLowerCase()))
    );
  };
  
  

  if (!food) {
    return <Text>Loading...</Text>;
  }

  return (
    <NutritionFactLabel
      food={food}
      weight={weight}
      setWeight={setWeight}
      updateNutritionFacts={updateNutritionFacts}
      nutritionFacts={nutritionFacts}
    />
  );
};

  const NutritionFactLabel = ({ food, weight, setWeight, updateNutritionFacts, nutritionFacts }) => {
    const selectedNutrientIds = [
      1008, // Energy (kcal)
      1004, // Total lipid (fat)
      1258, // Fatty acids, total saturated
      1259, // Fatty acids, total trans
      1003, // Cholesterol
      1093, // Sodium, Na
      1005, // Carbohydrate, by difference
      1079, // Fiber, total dietary
      2000, // Sugars, total including NLEA
      1003, // Protein
      1114, // Vitamin D (D2 + D3)
      1087, // Calcium, Ca
      1089, // Iron, Fe
      1092, // Potassium, K
    ];
  
 
    return (
      <ScrollView>
        <View style={styles.container}>
          
        <Text style={styles.description}>{food.description}</Text>
          
          {/**  
          <View style={styles.weightInputContainer}>
            
            <Text>Enter weight (g):</Text>
            <TextInput
              value={weight}
              onChangeText={setWeight}
              onSubmitEditing={() => {
                updateNutritionFacts();
                Keyboard.dismiss();
              }}
              style={styles.weightInput}
              placeholder="Enter weight in grams"
            />
            </View> */}

         {/*  
         
         ignore this it won't update calories based on weight inputed  
         
         {nutritionFacts ? (
            <>
              <Text style={styles.nutrient}>Calories: {nutritionFacts.calories.toFixed(2)}</Text>
              <Text style={styles.nutrient}>
                Carbohydrates: {nutritionFacts.carbohydrates.toFixed(2)}g
              </Text>
              <Text style={styles.nutrient}>Protein: {nutritionFacts.protein.toFixed(2)}g</Text>
              <Text style={styles.nutrient}>Fat: {nutritionFacts.fat.toFixed(2)}g</Text>
            </>
          ) : (
            <Text></Text>
          )}

          */}
         
         
         <Text style={styles.title}>Nutrition Facts</Text>
  
         {food.foodNutrients
  .filter((nutrient) => selectedNutrientIds.includes(nutrient.nutrient.id))
  .map((nutrient) => (
    <View key={nutrient.nutrient.id} style={styles.nutrientContainer}>
      <Text style={styles.nutrientLabel}>{nutrient.nutrient.name}:</Text>
      <Text style={styles.nutrientValue}>{nutrient.amount}</Text>
    </View>


))}

  

        </View>
      </ScrollView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      padding: 30,
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: 'black',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
    },
    description: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 10,
    },
    nutrientContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 5,
      paddingBottom: 5,
      borderBottomWidth: 1,
      borderBottomColor: 'black',
    },
    nutrientLabel: {
      fontSize: 18,
      fontWeight: 'bold',
            
    },
    nutrientValue: {
      fontSize: 18,
      
    },
    weightInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    weightInput: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      width: 150,
      backgroundColor: 'white',
      paddingLeft: 5,
      marginLeft: 10,
    },
  });
  
  
  export default FoodInput;