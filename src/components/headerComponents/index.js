import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Images} from '../../common/styles/image';
import {useNavigation} from '@react-navigation/native';
import {COLOR} from '../../common/styles/color';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import font, {fontFamily} from '../../common/styles/font';
import FastImage from 'react-native-fast-image';

const HeaderComponents = ({headerName, rightImage, leftImage, onPress}) => {
  const navigation = useNavigation();

  const CustomStatusBar = ({backgroundColor, dark, ...props}) => {
    const insets = useSafeAreaInsets();
    const styles = makestyles(backgroundColor, insets);
    return (
      <>
        <View style={styles.container}>
          <StatusBar
            animated
            barStyle={dark ? 'dark-content' : 'light-content'}
            backgroundColor={backgroundColor}
            {...props}
          />
        </View>
      </>
    );
  };

  return (
    <>
      <CustomStatusBar backgroundColor={COLOR.appColor} dark />
      <View
        style={{
          width: '100%',
          backgroundColor: COLOR.appColor,
          paddingVertical: '4%',
        }}>
        <View
          style={[
            styles.container,
            {
              justifyContent:
                rightImage === true ? 'space-between' : 'flex-start',
              gap: rightImage === true ? 0 : wp(5),
            },
          ]}>
          <TouchableOpacity
            style={styles.icon}
            onPress={() =>
              leftImage === true ? navigation.goBack() : onPress()
            }>
            {leftImage != undefined && (
              <FastImage
                style={styles.icon}
                source={leftImage === true ? Images.bttonBack : leftImage}
                resizeMode={FastImage.resizeMode.cover}
              />
            )}
          </TouchableOpacity>
          <Text style={styles.headerTextStyle}>{headerName}</Text>
          <TouchableOpacity
            style={styles.icon}
            onPress={() =>
              rightImage === true && navigation.navigate('Setting')
            }>
            {rightImage == true && (
              <FastImage
                style={styles.icon}
                source={Images.icSetting}
                resizeMode={FastImage.resizeMode.cover}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const makestyles = (backgroundColor, insets) =>
  StyleSheet.create({
    container: {backgroundColor: backgroundColor, paddingTop: insets.top},
  });

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.appColor,
    // paddingVertical: "4%",
    width: '95%',
    paddingHorizontal: '2.5%',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    height: hp(5),
    width: hp(5),
  },
  headerTextStyle: {
    color: COLOR.white,
    alignSelf: 'center',
    fontSize: hp(2.8),
    fontFamily: fontFamily.BOLD,
  },
});

export default HeaderComponents;
