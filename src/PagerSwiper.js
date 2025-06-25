import React, { useRef, useState, useEffect } from 'react';
import { View, Dimensions, Platform, StyleSheet } from 'react-native';
import PagerView from 'react-native-pager-view';

const { width, height } = Dimensions.get('window');

const PagerSwiper = ({
  children,
  horizontal = true,
  loop = false,
  index = 0,
  onIndexChanged = () => {},
  showsPagination = true,
  dot = <View style={styles.dot} />,
  activeDot = <View style={styles.activeDot} />,
  paginationStyle = {},
  style,
  autoplay = false,
  autoplayTimeout = 2.5,
}) => {
  const pagerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(index);
  const childrenArray = React.Children.toArray(children);
  const pageCount = childrenArray.length;

  // Loop logic
  const getPageIndex = (i) => {
    if (!loop) return i;
    if (i >= pageCount) return 0;
    if (i < 0) return pageCount - 1;
    return i;
  };

  // Autoplay logic
  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      let nextIndex = getPageIndex(currentIndex + 1);
      pagerRef.current?.setPage?.(nextIndex);
    }, autoplayTimeout * 1000);

    return () => clearInterval(interval);
  }, [currentIndex, autoplay, autoplayTimeout]);

  const handlePageSelected = (e) => {
    const newIndex = e.nativeEvent.position;
    setCurrentIndex(newIndex);
    onIndexChanged(newIndex);
  };

  return (
    <View style={[{ flex: 1 }, style]}>
      <PagerView
        ref={pagerRef}
        style={{ flex: 1 }}
        initialPage={index}
        orientation={horizontal ? 'horizontal' : 'vertical'}
        onPageSelected={handlePageSelected}
      >
        {childrenArray.map((child, i) => (
          <View key={i}>{child}</View>
        ))}
      </PagerView>

      {showsPagination && (
        <View style={[styles.pagination, paginationStyle]}>
          {childrenArray.map((_, i) => (
            <View key={i} style={{ margin: 3 }}>
              {i === currentIndex ? activeDot : dot}
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dot: {
    backgroundColor: 'rgba(0,0,0,.2)',
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  activeDot: {
    backgroundColor: '#007aff',
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  pagination: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PagerSwiper;
