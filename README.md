# react-native-pager-swiper

A swipeable carousel for React Native using `react-native-pager-view`, inspired by `react-native-swiper`. Supports both New Architecture (Fabric/TurboModules) and Old Architecture (Paper/Native Modules).

## Installation

```bash
npm install react-native-pager-swiper react-native-pager-view

Architecture Support
New Architecture: Compatible with Fabric and TurboModules (React Native >=0.68).
Old Architecture: Compatible with Paper and legacy Native Modules.
Ensure react-native-pager-view is version >=6.2.0 for New Architecture support.
To enable New Architecture in your app:

iOS: Set fabric_enabled => true in Podfile and run pod install.
Android: Set newArchEnabled=true in gradle.properties.
Props

Prop	Type	Default	Description
horizontal	boolean	true	Enable horizontal swiping
loop	boolean	true	Enable infinite looping
index	number	0	Initial slide index
showsButtons	boolean	false	Show next/prev buttons
showsPagination	boolean	true	Show pagination dots
autoplay	boolean	false	Enable autoplay
autoplayTimeout	number	2.5	Autoplay delay in seconds
autoplayDirection	boolean	true	Autoplay direction (true = forward)
style	ViewStyle	-	Swiper container style
containerStyle	ViewStyle	-	Inner container style
dotStyle	ViewStyle	-	Inactive dot style
activeDotStyle	ViewStyle	-	Active dot style
dotColor	string	#ccc	Inactive dot color
activeDotColor	string	#000	Active dot color
paginationStyle	ViewStyle	-	Pagination container style
nextButton	ReactNode	-	Custom next button
prevButton	ReactNode	-	Custom prev button
buttonWrapperStyle	ViewStyle	-	Button container style
onMomentumScrollEnd	Function	-	Called on swipe end
onTouchStart	Function	-	Touch start handler
onTouchEnd	Function	-	Touch end handler
onIndexChanged	Function	-	Called when index changes
scrollEnabled	boolean	true	Enable/disable scrolling
disable	boolean	false	Disable swiper
loadMinimal	boolean	false	Enable lazy loading
loadMinimalSize	number	1	Number of slides to preload
loadMinimalLoader	ReactNode	<Text>Loading...</Text>	Loader component
children	ReactNode	-	Slide components
