import React from 'react';
import { StyleSheet, Text, View, Animated, Easing, TouchableOpacity } from 'react-native';

export default class App extends React.Component {
  constructor () {
    super()
    this.state = {
      text: Date.now()
    }
    this.spinValue = new Animated.Value(0)
  }

  componentDidMount() {
    this.start()
  }
  
  start = () => {
    this.spinValue.setValue(0)
    Animated.timing(
      this.spinValue,{
        toValue: 1,
        duration: 3000,
        easing: Easing.linear
    }).start(() => this.start())
  }
  render() {
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })
    return (
      <Animated.View style={[{ transform: [{rotate: spin}] }, styles.rotator]}>
        <Text style={styles.desc}>Hej tryck om du har tråkigt</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={()=>{this.setState({text: Date.now()})}} ><Text style={styles.buttonText}>{'TRYCK MIG'}</Text></TouchableOpacity>
        </View>
        <Text style={styles.timeText}>{this.state.text.toString().substring(5)}</Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  rotator: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  desc: {color: 'white', fontSize: 28, textAlign: 'center', padding: 20},
  timeText: { color: 'white', fontSize: 32, padding: 10 },
  buttonContainer: { width: 200, height: 100, backgroundColor: '#800000', borderRadius: 50, justifyContent: 'center', alignItems: 'center' },
  button: {height: 100, width: 200, borderRadius: 50, justifyContent: 'center', alignItems: 'center' },
  buttonText: { color: 'white', fontSize: 23,  textAlign: 'center' }
});
