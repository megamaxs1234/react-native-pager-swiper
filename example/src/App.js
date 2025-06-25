import React from 'react';
import { StyleSheet, View, Image, Text, Dimensions } from 'react-native';
import PagerSwiper from 'react-native-pager-swiper';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const DATA = [
  { id: '1', image: 'https://via.placeholder.com/600x400/ff0000', text: 'Slide 1' },
  { id: '2', image: 'https://via.placeholder.com/600x400/00ff00', text: 'Slide 2' },
  { id: '3', image: 'https://via.placeholder.com/600x400/0000ff', text: 'Slide 3' },
];

export default function App() {
  return (
    <View style={styles.container}>
      <PagerSwiper
        style={styles.swiper}
        autoplay
        autoplayTimeout={3}
        showsButtons
        showsPagination
        loop
        loadMinimal
        loadMinimalSize={1}
        dotColor="#fff"
        activeDotColor="#ff0000"
        onIndexChanged={(index) => console.log('Index changed:', index)}
      >
        {DATA.map((item) => (
          <View key={item.id} style={styles.slide}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.text}>{item.text}</Text>
          </View>
        ))}
      </PagerSwiper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  swiper: {
    height: 400,
  },
  slide: {
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  image: {
    width: '100%',
    height: '80%',
    resizeMode: 'cover',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
  },
});