import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React, { createContext, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Dashboard from './Tabs/Dashboard'; 
import LogPage from './Tabs/LogPage';
import Goal from './Tabs/Goal';
import Profile from './Tabs/Profile';
import { DataContext } from './DataContext';// fixed recycle warning

//recycle fix
//export const DataContext = createContext(null); 
//recycle fix

// Tab names
const dashboard = 'Dashboard';
const logPage = 'Log';
const goal = 'Goal';
const profile = 'Profile';
const stacknav = 'Log'


const Tab = createBottomTabNavigator();

export default function TabNavigator({ route }) {
  const [docData, setDocData] = useState(route.params?.doc);
  console.log("You've made it to tab navigaor component, did you see the view?");
  console.log(docData);
  console.log("in tab, about to display nav");

  return (
    <DataContext.Provider value={{ docData, setDocData }}>
        <Tab.Navigator initialRouteName = {dashboard} independent={true} screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            let routeName = route.name;

            if (routeName === dashboard)
            {
              iconName = focused ? 'grid': 'grid-outline'
            }

            else if(routeName === stacknav)
            {
              iconName = focused ? 'book' : 'book-outline'
            }

            else if(routeName === goal)
            {
              iconName = focused ? 'calendar' : 'calendar-outline'
            }

            else if(routeName === profile)
            {
              iconName = focused ? 'person' : 'person-outline'
            }

            return <Ionicons name={iconName} size={size} color={color}/>

          },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'grey',
          tabBarLabelStyle: {paddingBottom: 5, fontSize: 10},
          style: {padding:10, height: 70}

        })}>

          <Tab.Screen name={dashboard} component={Dashboard}/>
          <Tab.Screen name={logPage} component={LogPage}/>
          <Tab.Screen name={goal} component={Goal}/>
          <Tab.Screen name={profile} component={Profile}/>
        </Tab.Navigator>
     </DataContext.Provider>
  );
}



// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { NavigationContainer } from '@react-navigation/native';
// import React, { createContext, useState } from 'react';
// import { StyleSheet } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// import Dashboard from './Tabs/Dashboard';
// import LogPage from './Tabs/LogPage';
// import Goal from './Tabs/Goal';
// import Profile from './Tabs/Profile';

// export const DataContext = createContext(null);

// // Tab names
// const dashboard = 'Dashboard';
// const logPage = 'Log';
// const goal = 'Goal';
// const profile = 'Profile';
// const stacknav = 'Log'




// const Tab = createBottomTabNavigator();

// export default function TabNavigator({ route }) {
//   const [docData, setDocData] = useState(route.params?.doc);
//   console.log("made it to render");
//   return (
//     <DataContext.Provider value={{ docData, setDocData }}>
//       <NavigationContainer independent={true}>
//         <Tab.Navigator initialRouteName = "" independent={true} screenOptions={({route}) => ({
//           tabBarIcon: ({focused, color, size}) => {
//             let iconName;
//             let routeName = route.name;

//             if (routeName === dashboard)
//             {
//               iconName = focused ? 'grid': 'grid-outline'
//             }

//             else if(routeName === stacknav)
//             {
//               iconName = focused ? 'book' : 'book-outline'
//             }

//             else if(routeName === goal)
//             {
//               iconName = focused ? 'calendar' : 'calendar-outline'
//             }

//             else if(routeName === profile)
//             {
//               iconName = focused ? 'person' : 'person-outline'
//             }

//             return <Ionicons name={iconName} size={size} color={color}/>

//           },
//           tabBarActiveTintColor: 'black',
//           tabBarInactiveTintColor: 'grey',
//           tabBarLabelStyle: {paddingBottom: 5, fontSize: 10},
//           style: {padding:10, height: 70}

//         })}>

//           <Tab.Screen name={dashboard} component={Dashboard}/>
//           <Tab.Screen name={logPage} component={LogPage}/>
//           <Tab.Screen name={goal} component={Goal}/>
//           <Tab.Screen name={profile} component={Profile}/>

//         </Tab.Navigator>
//       </NavigationContainer>
//     </DataContext.Provider>
//   );
// }






// // import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// // import { NavigationContainer } from '@react-navigation/native';
// // import React from 'react';
// // import { StyleSheet } from 'react-native';
// // import Ionicons from 'react-native-vector-icons/Ionicons';

// // import Dashboard from './Tabs/Dashboard';
// // import LogPage from './Tabs/LogPage';
// // import Goal from './Tabs/Goal';
// // import Profile from './Tabs/Profile';


// // // Tab names
// // const dashboard = 'Dashboard';
// // const logPage = 'Log';
// // const goal = 'Goal';
// // const profile = 'Profile';
// // const stacknav = 'Log'


// // const Tab = createBottomTabNavigator();

// // export default function TabNavigator() {
// //   return (
// //     <NavigationContainer independent={true}>
// //       <Tab.Navigator initialRouteName = "" independent={true} screenOptions={({route}) => ({
// //         tabBarIcon: ({focused, color, size}) => {
// //           let iconName;
// //           let routeName = route.name;

// //           if (routeName === dashboard)
// //           {
// //             iconName = focused ? 'grid': 'grid-outline'
// //           }

// //           else if(routeName === stacknav)
// //           {
// //             iconName = focused ? 'book' : 'book-outline'
// //           }

// //           else if(routeName === goal)
// //           {
// //             iconName = focused ? 'calendar' : 'calendar-outline'
// //           }

// //           else if(routeName === profile)
// //           {
// //             iconName = focused ? 'person' : 'person-outline'
// //           }

// //           return <Ionicons name={iconName} size={size} color={color}/>

// //         },
// //         tabBarActiveTintColor: 'black',
// //         tabBarInactiveTintColor: 'grey',
// //         tabBarLabelStyle: {paddingBottom: 5, fontSize: 10},
// //         style: {padding:10, height: 70}
        
// //       })}>

// //         <Tab.Screen name={dashboard} component={Dashboard}/>
// //         <Tab.Screen name={logPage} component={LogPage}/>
// //         <Tab.Screen name={goal} component={Goal}/>
// //         <Tab.Screen name={profile} component={Profile}/>
       
// //       </Tab.Navigator>
// //     </NavigationContainer>
// //   );
// // }
