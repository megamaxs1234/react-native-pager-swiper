# react-native-pager-swiper

A drop-in replacement for `react-native-swiper` using `react-native-pager-view`.

## 🚀 Features

- Smooth swipe transitions
- Horizontal & vertical swiping
- Looping
- Autoplay
- Custom pagination dots
- Compatible with all major React Native versions

## 📦 Installation

```bash
npm install react-native-pager-swiper react-native-pager-view


⚙️ Usage
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Swiper from 'react-native-pager-swiper';

const App = () => (
  <Swiper
    loop
    autoplay
    horizontal
    index={0}
    onIndexChanged={(i) => console.log('Page index:', i)}
  >
    <View style={styles.slide}><Text>Slide 1</Text></View>
    <View style={styles.slide}><Text>Slide 2</Text></View>
    <View style={styles.slide}><Text>Slide 3</Text></View>
  </Swiper>
);

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  }
});

export default App;


📚 Props
Prop	Type	Default	Description
loop	bool	false	Enables continuous loop
autoplay	bool	false	Enables autoplay
autoplayTimeout	number	2.5	Time between auto swipes (in seconds)
index	number	0	Initial index
horizontal	bool	true	Direction of swipe
onIndexChanged	func		Callback on index change
showsPagination	bool	true	Show pagination dots
dot	element		Custom dot
activeDot	element		Custom active dot
paginationStyle	style		Style for pagination container


