import React, {Component} from 'react';
import { View, StyleSheet, Animated, Image, Text } from 'react-native';
import Logo from '../assets/calorieLogo.png'

class ImageLoader extends Component {
    state = {
      opacity: new Animated.Value(0),
    }
  
    onLoad = () => {
      Animated.timing(this.state.opacity, {
        toValue: 3,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }
  
    render() {
      return (
        <Animated.Image
          onLoad={this.onLoad}
          {...this.props}
          style={[
            {
              opacity: this.state.opacity,
              transform: [
                {
                  scale: this.state.opacity.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.85, 1],
                  })
                },
              ],
            },
            this.props.style,
          ]}
        />
      );
    }

  }

const SplashScreen = () => (
  <View style={styles.container}>
    <Animated.View style={styles.animatedContainer}>
      <ImageLoader
        style={{
        width:200,
        height:200,
        }}
        source={Logo}
      />
      </Animated.View>
  </View>
);

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#FFFFFF'

    },
    image: {
      width: 300,
      height: 300,
      borderRadius: 10,
      
    },

    animatedContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      transform: [{translateY: -30}]
    }

  });

export default SplashScreen;