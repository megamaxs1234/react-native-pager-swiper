import React, { useEffect, useRef, useState, ReactNode, ReactElement } from 'react';
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  Text,
} from 'react-native';
import PagerView from 'react-native-pager-view';

interface PagerSwiperProps {
  horizontal?: boolean;
  loop?: boolean;
  index?: number;
  showsButtons?: boolean;
  showsPagination?: boolean;
  autoplay?: boolean;
  autoplayTimeout?: number;
  autoplayDirection?: boolean;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  dotStyle?: StyleProp<ViewStyle>;
  activeDotStyle?: StyleProp<ViewStyle>;
  dotColor?: string;
  activeDotColor?: string;
  paginationStyle?: StyleProp<ViewStyle>;
  nextButton?: ReactNode;
  prevButton?: ReactNode;
  buttonWrapperStyle?: StyleProp<ViewStyle>;
  onMomentumScrollEnd?: (e: any, state: { index: number }, context: any) => void;
  onTouchStart?: (e: any, state: any, context: any) => void;
  onTouchEnd?: (e: any, state: any, context: any) => void;
  onIndexChanged?: (index: number) => void;
  scrollEnabled?: boolean;
  disable?: boolean;
  loadMinimal?: boolean;
  loadMinimalSize?: number;
  loadMinimalLoader?: ReactNode;
  children: ReactNode;
}

const PagerSwiper: React.FC<PagerSwiperProps> = ({
  horizontal = true,
  loop = true,
  index = 0,
  showsButtons = false,
  showsPagination = true,
  autoplay = false,
  autoplayTimeout = 2.5,
  autoplayDirection = true,
  style,
  containerStyle,
  dotStyle,
  activeDotStyle,
  dotColor = '#ccc',
  activeDotColor = '#000',
  paginationStyle,
  nextButton,
  prevButton,
  buttonWrapperStyle,
  onMomentumScrollEnd,
  onTouchStart,
  onTouchEnd,
  onIndexChanged,
  scrollEnabled = true,
  disable = false,
  loadMinimal = false,
  loadMinimalSize = 1,
  loadMinimalLoader = <Text>Loading...</Text>,
  children,
}) => {
  const pagerRef = useRef<PagerView>(null);
  const [currentIndex, setCurrentIndex] = useState(index);
  const [loadedIndices, setLoadedIndices] = useState<number[]>([index]);
  const childrenArray = React.Children.toArray(children) as ReactElement[];
  const totalSlides = childrenArray.length;

  // Handle looping
  const effectiveIndex = loop && totalSlides > 1 ? currentIndex % totalSlides : currentIndex;

  // Autoplay logic
  useEffect(() => {
    if (!autoplay || disable || totalSlides <= 1 || !loop) return;
    const interval = setInterval(() => {
      const nextIndex = autoplayDirection
        ? (currentIndex + 1) % totalSlides
        : (currentIndex - 1 + totalSlides) % totalSlides;
      pagerRef.current?.setPage(nextIndex);
      setCurrentIndex(nextIndex);
    }, autoplayTimeout * 1000);
    return () => clearInterval(interval);
  }, [autoplay, autoplayTimeout, autoplayDirection, currentIndex, totalSlides, disable, loop]);

  // Lazy loading logic
  useEffect(() => {
    if (!loadMinimal) {
      setLoadedIndices(Array.from({ length: totalSlides }, (_, i) => i));
      return;
    }
    const newIndices = [currentIndex];
    for (let i = 1; i <= loadMinimalSize; i++) {
      newIndices.push((currentIndex + i) % totalSlides);
      newIndices.push((currentIndex - i + totalSlides) % totalSlides);
    }
    setLoadedIndices([...new Set(newIndices)]);
  }, [currentIndex, loadMinimal, loadMinimalSize, totalSlides]);

  // Handle page change
  const handlePageSelected = (e: { nativeEvent: { position: number } }) => {
    const newIndex = e.nativeEvent.position;
    setCurrentIndex(newIndex);
    onIndexChanged?.(newIndex);
    onMomentumScrollEnd?.(e, { index: newIndex }, null);
  };

  // Render pagination dots
  const renderPagination = () => {
    if (!showsPagination || totalSlides <= 1) return null;
    return (
      <View style={[styles.pagination, paginationStyle]}>
        {childrenArray.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              { backgroundColor: i === effectiveIndex ? activeDotColor : dotColor },
              i === effectiveIndex ? activeDotStyle : dotStyle,
            ]}
          />
        ))}
      </View>
    );
  };

  // Render navigation buttons
  const renderButtons = () => {
    if (!showsButtons || totalSlides <= 1) return null;
    return (
      <View style={[styles.buttonWrapper, buttonWrapperStyle]}>
        <TouchableOpacity
          onPress={() => {
            const prevIndex = loop
              ? (currentIndex - 1 + totalSlides) % totalSlides
              : Math.max(0, currentIndex - 1);
            pagerRef.current?.setPage(prevIndex);
            setCurrentIndex(prevIndex);
          }}
          disabled={disable}
        >
          {prevButton || <Text style={styles.buttonText}>{'<'}</Text>}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            const nextIndex = loop
              ? (currentIndex + 1) % totalSlides
              : Math.min(totalSlides - 1, currentIndex + 1);
            pagerRef.current?.setPage(nextIndex);
            setCurrentIndex(nextIndex);
          }}
          disabled={disable}
        >
          {nextButton || <Text style={styles.buttonText}>{'>'}</Text>}
        </TouchableOpacity>
      </View>
    );
  };

  // Render slides
  const renderSlide = (child: ReactElement, i: number) => {
    if (loadMinimal && !loadedIndices.includes(i)) {
      return <View key={i} style={styles.slide}>{loadMinimalLoader}</View>;
    }
    return (
      <View key={i} style={styles.slide}>
        {child}
      </View>
    );
  };

  if (disable || totalSlides === 0) return <View style={[styles.container, style]} />;

  return (
    <View style={[styles.container, style]}>
      <PagerView
        ref={pagerRef}
        style={[styles.pager, containerStyle]}
        initialPage={index}
        orientation={horizontal ? 'horizontal' : 'vertical'}
        onPageSelected={handlePageSelected}
        scrollEnabled={scrollEnabled}
        onTouchStart={(e) => onTouchStart?.(e, { index: currentIndex }, null)}
        onTouchEnd={(e) => onTouchEnd?.(e, { index: currentIndex }, null)}
      >
        {childrenArray.map(renderSlide)}
      </PagerView>
      {renderPagination()}
      {renderButtons()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pager: {
    flex: 1,
  },
  slide: {
    flex: 1,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    width: '100%',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: '50%',
    width: '100%',
    paddingHorizontal: 10,
  },
  buttonText: {
    fontSize: 24,
    color: '#000',
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
});

export default PagerSwiper;
