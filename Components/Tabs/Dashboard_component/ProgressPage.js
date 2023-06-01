import React, { Component } from 'react';
import { View } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';

class ProgressPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { calories, dailyGoal } = this.props;
    const progressPercent = (calories / dailyGoal) * 100;
    const txt = dailyGoal - calories + " To Go"

    return (
      <View style={{ marginLeft: 40 }}>
        <CircularProgress
          value={calories}
          radius={70}
          maxValue={dailyGoal}
          inActiveStrokeColor={'#A2A6B9'}
          activeStrokeColor={'#00C2FF'}
          title={'Calories'}
          titleColor={'black'}
          progressValueColor={'black'}
        />
      </View>
    );
  }
}

export default ProgressPage;


// import React, { Component, useState, useEffect } from 'react';
// import {View} from 'react-native';
// import CircularProgress from 'react-native-circular-progress-indicator';

// class ProgressPage extends Component {
//     constructor(props) {
//         super(props);
//       }
//     render(){
//         return(
//             <View style={{marginLeft: 40}}>
//                 <CircularProgress
//                     value={this.props.calories}    
//                     radius={70}
//                     maxValue={this.props.dailyGoal}
//                     inActiveStrokeColor={'#A2A6B9'}
//                     activeStrokeColor='#00C2FF'
//                     title={'Remaining'}
//                     titleColor='black'
//                     progressValueColor='black'
//                 />
//             </View>
//         );
//     }
// }

// export default ProgressPage