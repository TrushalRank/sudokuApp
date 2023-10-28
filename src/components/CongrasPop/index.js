// import {View, Text} from 'react-native';
// import React from 'react';

// const Congratulations = props => {
//   return (
//     <View>
//       <Text>Congratulations</Text>
//     </View>
//   );
// };

// export default Congratulations;

import React from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Dialog, {SlideAnimation, DialogContent} from 'react-native-popup-dialog';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLOR} from '../../common/styles/color';
import {fontFamily} from '../../common/styles/font';
import FastImage from 'react-native-fast-image';
import {Images} from '../../common/styles/image';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const Congratulations = ({
  visible,
  backToHome,
  startGame,
  popopText,
  popupTitle,
}) => {
  return (
    <Dialog
      rounded={false}
      visible={visible}
      hasOverlay={true}
      animationDuration={1}
      onTouchOutside={() => {
        return false;
      }}
      // onTouchOutside={backToHome}
      dialogAnimation={
        new SlideAnimation({
          initialValue: 0,
          animationDuration: 150,
          useNativeDriver: true,
        })
      }
      onHardwareBackPress={() => {
        return true;
      }}
      dialogStyle={[
        styles.customPopup,
        {
          position: 'relative',
        },
      ]}>
      <DialogContent style={styles.customPopupContent}>
        <View
          style={{
            top: hp(1.5),
            borderWidth: hp(0.6),
            borderColor: COLOR.optionColor,
            borderRadius: hp(1.5),
            alignItems: 'center',
          }}>
          <FastImage
            source={Images.trofiImg}
            style={styles.optionImage}
            resizeMode={FastImage.resizeMode.contain}></FastImage>
          <View
            style={{
              // justifyContent: 'center',
              height: hp(22),
              width: DEVICE_WIDTH - wp(18),
              alignItems: 'center',
              bottom: hp(1.5),
            }}>
            <Text style={styles.gameOverButton}>{popupTitle}</Text>
            <Text
              style={{
                color: COLOR.white,
                fontFamily: fontFamily.MEDIUM,
                marginHorizontal: hp(2),
                fontSize: hp(2.3),
                textAlign: 'center',
              }}>
              {popopText}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                // marginTop: hp(2),
              }}>
              <TouchableOpacity
                style={[
                  styles.popupBtn,
                  {
                    backgroundColor: COLOR.cancelBg,
                    marginRight: hp(2.5),
                  },
                ]}
                onPress={backToHome}
                activeOpacity={1}>
                <Text style={styles.btnContainer}>Back Home</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.popupBtn,
                  {
                    backgroundColor: '#00896C',
                  },
                ]}
                onPress={startGame}
                activeOpacity={1}>
                <Text style={styles.btnContainer}>Start New Game</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </DialogContent>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  gameOverButton: {
    color: COLOR.green,
    fontFamily: fontFamily.MEDIUM,
    // letterSpacing: 1,
    fontSize: 30,
    // paddingHorizontal: 20,
    paddingVertical: 8,
  },
  optionImage: {
    height: hp(14),
    width: hp(14),
  },
  btnContainer: {
    fontSize: hp(2),
    fontFamily: fontFamily.MEDIUM,
    color: COLOR.white,
  },
  popupBtn: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: DEVICE_WIDTH - wp(65.5),
    height: hp(5.5),
    marginTop: hp(2),
    elevation: 8,
    borderRadius: hp(1.5),
  },
  customPopupContent: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  triangleView: {
    width: 0,
    height: 0,
    top: hp(1.8),
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: wp(4),
    borderRightWidth: wp(2),
    borderBottomWidth: 0,
    borderLeftWidth: wp(2),
    borderTopColor: COLOR.updateBg,
    // borderTopColor: COLOR.white,
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    zIndex: 5,
  },
  customPopup: {
    width: DEVICE_WIDTH - wp(10),
    maxHeight: DEVICE_HEIGHT - hp(60),
    borderRadius: hp(1.5),
    backgroundColor: COLOR.updateBg,
    // backgroundColor: 'transparent',
  },
});

export default Congratulations;
