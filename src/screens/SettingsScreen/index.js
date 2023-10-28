import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React from 'react';
import styles from './styles';
import {Images} from '../../common/styles/image';
import {useNavigation} from '@react-navigation/native';
import Rate, {AndroidMarket} from 'react-native-rate';
import Share from 'react-native-share';
import Header from '../../components/Header';
import VersionCheck from 'react-native-version-check';
import {Banner_Ads} from '../../components';
import {StringFont} from '../../common/styles/string';

const SettingsScreen = () => {
  const navigation = useNavigation();

  // ------  Rate Funcation ------ //

  const rateApp = () => {
    const options = {
      AppleAppID: 'your-apple-app-id',
      GooglePackageName: `${VersionCheck.getPackageName()}`,
      preferredAndroidMarket: AndroidMarket.Google,
      preferInApp: true,
      fallbackPlatformURL: 'your-fallback-url',
    };
    Rate.rate(options, success => {
      if (success) {
        Linking?.openURL(
          `market://details?id=${VersionCheck.getPackageName()}`,
        );
      }
    });
  };
  // ------  Share Funcation ------ //

  const shareApp = () => {
    const shareOptionsApp = {
      title: 'Share via',
      message:
        Platform.OS === 'android'
          ? 'Sudoku - Classic Puzzle Games - Android'
          : 'Sudoku - Classic Puzzle Games - ios',
      url: `https://play.google.com/store/apps/details?id=${VersionCheck.getPackageName()}&hl=en-IN`,
      filename: 'test', // only for base64 file in Android
    };
    Share.open(shareOptionsApp);
  };

  // // ------  privacyPolicy Funcation ------ //

  // const privacyPolicy = () => {
  //   Linking.openURL(
  //     'https://kidlearningstudio.blogspot.com/2023/09/preschool-kids-learning-games-fun.html',
  //   );
  // };

  return (
    <>
      <Header />
      <ImageBackground
        style={styles.container}
        resizeMode="stretch"
        source={Images.backgroundImage}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={Images.back_arrow}
                style={styles.backArrowLogo}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text style={styles.headerFont}>{StringFont.Setting}</Text>
          </View>
          <View style={styles.listContainer}>
            <TouchableOpacity
              underlayColor={'#DDDDDD'}
              onPress={() => rateApp()}
              style={styles.listView}>
              <Image
                source={Images.rateArrow}
                style={styles.imageContainer}
                resizeMode="contain"
              />
              <Text style={styles.textView}>{StringFont.Rate}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              underlayColor={'#DDDDDD'}
              onPress={() => shareApp()}
              style={styles.listView}>
              <Image
                source={Images.shareArrow}
                style={styles.imageContainer}
                resizeMode="contain"
              />
              <Text style={styles.textView}>{StringFont.Share}</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity
              underlayColor={'#DDDDDD'}
              onPress={() => privacyPolicy()}
              style={styles.listView}>
              <Image
                source={Images.PrivacyPolicyArrow}
                style={styles.imageContainer}
                resizeMode="contain"
              />
              <Text style={styles.textView}>{StringFont.Privacy_Policy}</Text>
            </TouchableOpacity> */}
          </View>
          <Banner_Ads />
        </View>
      </ImageBackground>
    </>
  );
};

export default SettingsScreen;
