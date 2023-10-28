import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLOR} from '../../common/styles/color';
import {fontFamily} from '../../common/styles/font';

const ButtonView = () => {
  return (
    <View
      style={{
        marginTop: hp(3),
      }}>
      <View
        style={[
          styles.buttonViwe,
          {
            position: 'absolute',
            zIndex: 0,
            marginLeft: hp(0.4),
            backgroundColor: COLOR.btnBottom,
            marginTop: hp(0.4),
          },
        ]}></View>
      <View style={styles.buttonViwe}>
        <Text style={styles.buttonText}>Continue</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonViwe: {
    height: hp(6),
    width: wp(45),
    borderRadius: wp(3),
    backgroundColor: COLOR.appColor,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 4,
  },
  buttonText: {
    fontFamily: fontFamily.MEDIUM,
    fontSize: wp(5.5),
    color: COLOR.white,
  },
});
export default ButtonView;
