import React, { useState, useContext, useEffect} from 'react';
import { View, StyleSheet, Text, Image, KeyboardAvoidingView } from 'react-native';
import { ScrollView } from 'react-native';
import MacroNutrients from './Dashboard_component/MacroNutrients';
import Progress from './Dashboard_component/ProgressPage';
import goal_icon from '../../assets/dashboard_icons/goal.png';
import food_icon from '../../assets/dashboard_icons/food.png';
import Calorie_icon from '../../assets/dashboard_icons/calories.png';
//import { DataContext } from '../TabNavigator'; removed to fix recycle warning
import { DataContext } from '../DataContext';//added to fix recycle warning/ 



function Dashboard() {

  const[username, setUserName] = useState("Joe")
  const[userCalories, setUserCalories] = useState(1000);
  const[dailyGoal, setDailyGoal] = useState(2000);


  // get from context 
  const { docData } = useContext(DataContext);

  useEffect(() => {
    // This function will be called once when the component mounts
    if (docData) {
      setUserName(docData.name);
      setUserCalories(docData.calories);
      setDailyGoal(docData.dailyGoal);
    }
  }, []);

  
  // Greet user based on time.
  function getGreeting() {
    const date = new Date();
    const hour = date.getHours();
    if (hour >= 5 && hour <11) {
      return `Good morning`;
    } else if (hour >= 12 && hour <= 18) {
      return `Good afternoon!`;
    } else {
      return `Good evening!`;
    }
  }



  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={{ flex: 1, }}  >

    <ScrollView contentContainerStyle={{ padding: 5 }}>
      <View>
        <View>
          <Text
            style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 32, marginTop: 10 }}
          >
            Welcome, {username}
          </Text>
        </View>
        <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
                backgroundColor: 'white',
                borderRadius: 20,
                height: 200,
                width: 400,
                marginStart: 7,
              }}
            >
              <View style={{ flex: 25 }}>
                <Text
                  style={{
                    paddingLeft: 49,
                    paddingBottom: 10,
                    fontWeight: 'bold',
                    fontSize: 25,
                    marginTop: 10,
                  }}
                >
                  Calories
                </Text>
                <Progress calories={userCalories} dailyGoal={dailyGoal} />
              </View>

              <View style={{ flex: 5 }}>
                <Image
                  source={goal_icon}
                  style={{ width: 39, height: 45, marginTop: 15, marginBottom: 15 }}
                />
                <Image source={food_icon} style={{ width: 39, height: 45, marginBottom: 15 }} />
                <Image source={Calorie_icon} style={{ width: 39, height: 45 }} />
              </View>

              <View style={{ flex: 10 }}>
                <Text style={{ marginTop: 15 }}>Base Goal</Text>
                <Text style={{ marginBottom: 15 }}>{dailyGoal}</Text>

                <Text style={{ marginTop: 15 }}>Calories</Text>
                <Text style={{ marginBottom: 1 }}>{userCalories}</Text>

                <Text style={{ marginTop: 15 }}>Exercise</Text>
                <Text>50</Text>
              </View>
            </View>
            <View style={{ marginTop: 20 }}>
              <View>
              <MacroNutrients/>
              </View>

            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
  );
}

export default Dashboard;


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 10,
  },

  title: {
    fontWeight: 'bold',
    fontSize: 30,
  },
});

// // import Progress from './Dashboard_component/ProgressPage';
// // import goal_icon from '../../assets/dashboard_icons/goal.png';
// // import food_icon from '../../assets/dashboard_icons/food.png';
// // import Calorie_icon from '../../assets/dashboard_icons/calories.png';
// // import { DataContext } from '../TabNavigator';

// // //const DataContext = React.createContext(DataContext);
// // console.log("Okay dashboard component exists, almost");

// // class Dashboard extends Component {
// // //  const contextType = DataContext;
// // //  const { foo } = useContext(MyContext);
// // docData  = useContext(DataContext);


// // ///docData = DataContext;

// //   state = {
// //     protein: 0,
// //     carbs: 0,
// //     fat: 0,
// //   };


// //   handleProteinInput = (value) => {
// //     this.setState({ protein: value });
// //   };

// //   handleCarbsInput = (value) => {
// //     this.setState({ carbs: value });
// //   };

// //   handleFatInput = (value) => {
// //     this.setState({ fat: value });
// //   };

// //   render() {
// //     return (
// //       <KeyboardAvoidingView
// //         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
// //         style={{ flex: 1, }}
// //       >

// //         <ScrollView contentContainerStyle={{ padding: 5 }}>
// //           <View>
// //             <View>
// //               <Text
// //                 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 32, marginTop: 10 }}
// //               >
// //                 Good Morning, {docData.name}
// //               </Text>
// //             </View>

// //             <View
// //               style={{
// //                 flexDirection: 'row',
// //                 marginTop: 20,
// //                 backgroundColor: 'white',
// //                 borderRadius: 20,
// //                 height: 200,
// //                 width: 400,
// //                 marginStart: 7,
// //               }}
// //             >
// //               <View style={{ flex: 25 }}>
// //                 <Text
// //                   style={{
// //                     paddingLeft: 49,
// //                     paddingBottom: 10,
// //                     fontWeight: 'bold',
// //                     fontSize: 25,
// //                     marginTop: 10,
// //                   }}
// //                 >
// //                   Calories
// //                 </Text>
// //                 <Progress />
// //               </View>

// //               <View style={{ flex: 5 }}>
// //                 <Image
// //                   source={goal_icon}
// //                   style={{ width: 39, height: 45, marginTop: 15, marginBottom: 15 }}
// //                 />
// //                 <Image source={food_icon} style={{ width: 39, height: 45, marginBottom: 15 }} />
// //                 <Image source={Calorie_icon} style={{ width: 39, height: 45 }} />
// //               </View>

// //               <View style={{ flex: 10 }}>
// //                 <Text style={{ marginTop: 15 }}>Base Goal</Text>
// //                 <Text style={{ marginBottom: 15 }}>2,000</Text>

// //                 <Text style={{ marginTop: 15 }}>Calories</Text>
// //                 <Text style={{ marginBottom: 1 }}>1,500</Text>

// //                 <Text style={{ marginTop: 15 }}>Exercise</Text>
// //                 <Text>50</Text>
// //               </View>
// //             </View>
// //             <View style={{ marginTop: 20 }}>
// //               <View>
// //                 <MacroNutrients />
// //               </View>

// //             </View>
// //           </View>
// //         </ScrollView>
// //       </KeyboardAvoidingView>
// //     );
// //   }
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //   },
// //   text: {
// //     marginLeft: 10,
// //   },

// //   title: {
// //     fontWeight: 'bold',
// //     fontSize: 30,
// //   },
// // });

// // export default Dashboard;
