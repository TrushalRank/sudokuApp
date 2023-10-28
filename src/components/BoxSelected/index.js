import React from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Dialog, {SlideAnimation, DialogContent} from 'react-native-popup-dialog';
import FastImage from 'react-native-fast-image';
import {fontFamily} from '../../common/styles/font';
import {Images} from '../../common/styles/image';
import {COLOR} from '../../common/styles/color';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const BoxSelectedPopop = ({visible, closeButton, popupTitle}) => {
  return (
    <Dialog
      rounded={false}
      visible={visible}
      hasOverlay={true}
      animationDuration={1}
      onTouchOutside={closeButton}
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
          <View
            style={{
              // justifyContent: 'center',
              height: hp(20),
              width: DEVICE_WIDTH - wp(18),
              alignItems: 'center',
              bottom: hp(1.5),
              justifyContent: 'center',
            }}>
            <Text style={styles.gameOverButton}>{popupTitle}</Text>

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
                onPress={closeButton}
                activeOpacity={1}>
                <Text style={styles.btnContainer}>Back</Text>
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
    fontSize: hp(3),
    paddingVertical: 8,
    textAlign: 'center',
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
    marginTop: hp(1.5),
    elevation: 8,
    borderRadius: hp(1.5),
  },
  customPopupContent: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  customPopup: {
    width: DEVICE_WIDTH - wp(10),
    maxHeight: DEVICE_HEIGHT - hp(40),
    borderRadius: hp(1.5),
    backgroundColor: COLOR.updateBg,
    // backgroundColor: 'transparent',
  },
});
export default BoxSelectedPopop;
