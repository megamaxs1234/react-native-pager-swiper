react-native-pager-swiper
A swipeable carousel for React Native using react-native-pager-view, inspired by react-native-swiper. Supports both New Architecture (Fabric/TurboModules) and Old Architecture (Paper/Native Modules).
Installation
npm install react-native-pager-swiper react-native-pager-view

For iOS, run:
cd ios && pod install

Usage
import PagerSwiper from 'react-native-pager-swiper';

function App() {
  return (
    <PagerSwiper
      autoplay
      autoplayTimeout={3}
      showsButtons
      showsPagination
      loop
      loadMinimal
      loadMinimalSize={1}
      dotColor="#fff"
      activeDotColor="#ff0000"
      onIndexChanged={(index) => console.log('Index:', index)}
    >
      <View style={{ backgroundColor: 'red', flex: 1 }}><Text>Slide 1</Text></View>
      <View style={{ backgroundColor: 'green', flex: 1 }}><Text>Slide 2</Text></View>
      <View style={{ backgroundColor: 'blue', flex: 1 }}><Text>Slide 3</Text></View>
    </PagerSwiper>
  );
}

Architecture Support

New Architecture: Compatible with Fabric and TurboModules (React Native >=0.68).
Old Architecture: Compatible with Paper and legacy Native Modules.
Ensure react-native-pager-view is version >=6.2.0 for New Architecture support.

To enable New Architecture:

iOS: Set fabric_enabled => true in Podfile and run pod install.
Android: Set newArchEnabled=true in gradle.properties.

Props



Prop
Type
Default
Description



horizontal
boolean
true
Enable horizontal swiping


loop
boolean
true
Enable infinite looping


index
number
0
Initial slide index


showsButtons
boolean
false
Show next/prev buttons


showsPagination
boolean
true
Show pagination dots


autoplay
boolean
false
Enable autoplay


autoplayTimeout
number
2.5
Autoplay delay in seconds


autoplayDirection
boolean
true
Autoplay direction (true = forward)


style
object
-
Swiper container style


containerStyle
object
-
Inner container style


dotStyle
object
-
Inactive dot style


activeDotStyle
object
-
Active dot style


dotColor
string
#ccc
Inactive dot color


activeDotColor
string
#000
Active dot color


paginationStyle
object
-
Pagination container style


nextButton
ReactNode
-
Custom next button


prevButton
ReactNode
-
Custom prev button


buttonWrapperStyle
object
-
Button container style


onMomentumScrollEnd
Function
-
Called on swipe end


onTouchStart
Function
-
Touch start handler


onTouchEnd
Function
-
Touch end handler


onIndexChanged
Function
-
Called when index changes


scrollEnabled
boolean
true
Enable/disable scrolling


disable
boolean
false
Disable swiper


loadMinimal
boolean
false
Enable lazy loading


loadMinimalSize
number
1
Number of slides to preload


loadMinimalLoader
ReactNode
<Text>Loading...</Text>
Loader component


children
ReactNode
-
Slide components


Development
To test locally:

Clone the repo: git clone https://github.com/your-username/react-native-pager-swiper.git
Install dependencies: yarn install
Run the example app:cd example
yarn install
cd ios && pod install && cd ..
yarn ios  # or yarn android



Troubleshooting
Error: Cannot find module 'react-native-pager-swiper'

Ensure the library is linked in the example app:cd example
rm -rf node_modules
yarn install
yarn start --reset-cache


Rebuild for iOS: cd ios && pod install && cd ..
Run: yarn ios or yarn android.

License
MIT