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

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const GameOverPopup = ({
  visible,
  navigateToHome,
  restartGame,
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
      // onTouchOutside={navigateToHome}
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
            width: DEVICE_WIDTH - wp(15),
            height: DEVICE_HEIGHT - hp(71),
            borderRadius: hp(1.5),
            backgroundColor: COLOR.updateBg,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              top: hp(0.9),
              borderWidth: hp(0.6),
              borderColor: COLOR.optionColor,
              borderRadius: hp(1.5),
            }}>
            <View
              style={{
                // justifyContent: 'center',
                height: hp(25),
                width: DEVICE_WIDTH - wp(23),
                alignItems: 'center',
              }}>
              <Text style={styles.gameOverButton}>{popupTitle}</Text>
              <Text
                style={{
                  color: COLOR.white,
                  fontFamily: fontFamily.MEDIUM,
                  marginHorizontal: hp(2),
                  fontSize: hp(2),
                  textAlign: 'center',
                }}>
                {popopText}
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  style={[
                    styles.popupBtn,
                    {
                      backgroundColor: COLOR.cancelBg,
                      marginRight: 30,
                    },
                  ]}
                  onPress={navigateToHome}
                  activeOpacity={1}>
                  <Text style={styles.btnContainer}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.popupBtn,
                    {
                      backgroundColor: '#00896C',
                    },
                  ]}
                  onPress={restartGame}
                  activeOpacity={1}>
                  <Text style={styles.btnContainer}>Watch Ad</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.triangleView}></View>
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
  btnContainer: {
    fontSize: hp(2.5),
    fontFamily: fontFamily.MEDIUM,
    color: COLOR.white,
  },
  popupBtn: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: DEVICE_WIDTH - wp(68),
    height: hp(5.5),
    marginTop: hp(2),
    elevation: 8,
    borderRadius: hp(1),
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
    width: DEVICE_WIDTH - wp(15),
    height: DEVICE_HEIGHT - hp(57),
    borderRadius: hp(1.5),
    // backgroundColor: COLOR.updateBg,
    backgroundColor: 'transparent',
  },
});

export default GameOverPopup;
