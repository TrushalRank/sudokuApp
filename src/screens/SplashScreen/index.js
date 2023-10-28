// import {
//   BackHandler,
//   ImageBackground,
//   Linking,
//   ToastAndroid,
//   View,
// } from "react-native";
// import React, { useEffect, useState } from "react";
// import styles from "./styles";
// import { Images } from "../../common/styles/image";
// import {
//   getDataFromAsync,
//   setDataToAsync,
// } from "../../assets/AsyncStorage/AsyncStorage";
// import moment from "moment";
// import FastImage from "react-native-fast-image";
// import { UpdateScreen } from "../../components";
// import VersionCheck from "react-native-version-check";
// import firestore from "@react-native-firebase/firestore";
// import { useFocusEffect } from "@react-navigation/native";

// const SplashScreen = (props) => {
//   const [showPopop, setShowPopop] = useState(false);

//   useEffect(() => {
//     dateTime();
//     dataGetAsync();
//     inDateTime();
//     naDateTime();
//     dataCollection();
//     languageData();
//   }, []);

//   useFocusEffect(
//     React.useCallback(() => {
//       // props.navigation.replace("Home");
//       dataCollection();
//     }, [])
//   );
//   const dataCollection = async () => {
//     await firestore()
//       .collection("AD_ID")
//       .doc("Admob")
//       .onSnapshot((documentSnapshot) => {
//         setTimeout(() => {
//           if (
//             documentSnapshot._data?.appVersion >
//             VersionCheck.getCurrentVersion()
//           ) {
//             setShowPopop(true);
//           } else {
//             props.navigation.replace("Home");
//           }
//         }, 3000);
//       });
//   };

//   const dateTime = () => {
//     const storeValue = async (key, value) => {
//       try {
//         await setDataToAsync(key, JSON.stringify(value));
//       } catch (error) {}
//     };

//     const retrieveValue = async () => {
//       const storedDateObj = await JSON.parse(await getDataFromAsync("key_1"));
//       const tempData = await getDataFromAsync("LENGHTID");
//       const adsIndex = JSON.parse(tempData);
//       const date = moment().format("L");
//       if (!storedDateObj) {
//         storeValue("key_1", {
//           storedDate: date,
//           index: 0,
//         });
//       } else {
//         if (storedDateObj?.storedDate != date) {
//           const tempData = await getDataFromAsync("LENGHTID");
//           const adsIndex = JSON.parse(tempData);
//           storeValue("key_1", {
//             storedDate: date,
//             index:
//               parseInt(storedDateObj?.index) < adsIndex - 1
//                 ? parseInt(storedDateObj?.index) + 1
//                 : 0,
//           });
//         }
//       }
//     };
//     retrieveValue();
//   };

//   const inDateTime = () => {
//     const storeValue = async (key, value) => {
//       try {
//         await setDataToAsync(key, JSON.stringify(value));
//       } catch (error) {}
//     };

//     const retrieveValue = async () => {
//       const storedDateObj = await JSON.parse(await getDataFromAsync("key_2"));
//       const tempData = await getDataFromAsync("INLENGHTID");
//       const adsIndex = JSON.parse(tempData);
//       const date = moment().format("L");
//       if (!storedDateObj) {
//         storeValue("key_2", {
//           storedDate: date,
//           index: 0,
//         });
//       } else {
//         if (storedDateObj?.storedDate != date) {
//           storeValue("key_2", {
//             storedDate: date,
//             index:
//               parseInt(storedDateObj?.index) < adsIndex - 1
//                 ? parseInt(storedDateObj?.index) + 1
//                 : 0,
//           });
//         }
//       }
//     };
//     retrieveValue();
//   };

//   const naDateTime = () => {
//     const storeValue = async (key, value) => {
//       try {
//         await setDataToAsync(key, JSON.stringify(value));
//       } catch (error) {}
//     };
//     const retrieveValue = async () => {
//       const storedDateObj = await JSON.parse(await getDataFromAsync("key_3"));
//       const tempData = await getDataFromAsync("NALENGHTID");
//       const adsIndex = JSON.parse(tempData);
//       const date = moment().format("L");
//       if (!storedDateObj) {
//         storeValue("key_3", {
//           storedDate: date,
//           index: 0,
//         });
//       } else {
//         if (storedDateObj?.storedDate != date) {
//           const tempData = await getDataFromAsync("NALENGHTID");
//           const adsIndex = JSON.parse(tempData);
//           storeValue("key_3", {
//             storedDate: date,
//             index:
//               parseInt(storedDateObj?.index) < adsIndex - 1
//                 ? parseInt(storedDateObj?.index) + 1
//                 : 0,
//           });
//         }
//       }
//     };
//     retrieveValue();
//   };

//   const dataGetAsync = async () => {
//     const tempData = await getDataFromAsync("SWITCH_VALUE");
//     const data = await JSON.parse(tempData);
//     if (data === null) {
//       setDataToAsync("SWITCH_VALUE", JSON.stringify(true));
//     }
//   };

//   const languageData = async () => {
//     const tempData = await getDataFromAsync("APPLANGUGE");
//     const data = await JSON.parse(tempData);
//     if (data === null) {
//       setDataToAsync(
//         "APPLANGUGE",
//         JSON.stringify({ name: "English", key: "eng", code: "en-IN" })
//       );
//     }
//   };

//   const updateGame = () => {
//     Linking.openURL(
//       "https://play.google.com/store/apps/details?id=com.kids.preschool.learning.game"
//     );
//   };

//   const backGame = () => {
//     // ToastAndroid.show("Please Update Kids Pre School App First...", 1000);
//     props.navigation.replace("Home");
//     // BackHandler.exitApp();
//   };

//   return (
//     <>
//       {/* <View style={styles.container}>
//         <View style={styles.giftshow}>
//           <FastImage
//             style={styles.giftImage}
//             source={Images.SplashScreenGif}
//             resizeMode={FastImage.resizeMode.contain}
//           />
//         </View>
//         <View style={styles.appText}>
//           <FastImage
//             style={styles.textImage}
//             source={Images.SplashScreen}
//             resizeMode={FastImage.resizeMode.contain}
//           />
//           <FastImage
//             style={styles.textImage}
//             source={Images.SplashScreenImagelast}
//             resizeMode={FastImage.resizeMode.contain}
//           />
//         </View>
//       </View> */}
//       {showPopop == true ? (
//         <ImageBackground
//           style={styles.imageSplash}
//           source={showPopop && Images.updatePopopBag}
//           resizeMode="stretch"
//         >
//           <FastImage
//             style={styles.splashCartonImg}
//             source={Images.updatePopopBagCarton}
//             resizeMode={FastImage.resizeMode.contain}
//           />
//           <UpdateScreen
//             visible={showPopop}
//             backGame={() => backGame()}
//             updateGame={() => updateGame()}
//           />
//         </ImageBackground>
//       ) : (
//         <View style={styles.container}>
//           <View style={styles.giftshow}>
//             <FastImage
//               style={styles.giftImage}
//               source={Images.SplashScreenGif}
//               resizeMode={FastImage.resizeMode.contain}
//             />
//           </View>
//           <View style={styles.appText}>
//             <FastImage
//               style={styles.textImage}
//               source={Images.SplashScreen}
//               resizeMode={FastImage.resizeMode.contain}
//             />
//             <FastImage
//               style={styles.textImage}
//               source={Images.SplashScreenImagelast}
//               resizeMode={FastImage.resizeMode.contain}
//             />
//           </View>
//         </View>
//       )}
//     </>
//   );
// };

// export default SplashScreen;

import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  StatusBar,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Images} from '../../common/styles/image';
import Header from '../../components/Header';
import VersionCheck from 'react-native-version-check';
import moment from 'moment';
import {
  getDataFromAsync,
  setDataToAsync,
} from '../../assets/AsyncStorage/AsyncStorage';
import {UpdateScreen} from '../../components';
import {useFocusEffect} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const SplashScreen = props => {
  const [showPopop, setShowPopop] = useState(false);

  useEffect(() => {
    bannerAd();
    // inDateTime();
    console.log('VersionCheck.getPackageName()', VersionCheck.getPackageName());
    rewarded();
    // data();
  }, []);

  const data = () => {
    setTimeout(() => {
      // props.navigation.replace('Home');
    }, 3000);
  };

  useFocusEffect(
    React.useCallback(() => {
      dataCollection();
    }, []),
  );
  const dataCollection = async () => {
    await firestore()
      .collection('AD_ID')
      .doc('Admob')
      .onSnapshot(documentSnapshot => {
        console.log('.......****......');
        setTimeout(() => {
          console.log(
            'documentSnapshot._data?.appVersion',
            documentSnapshot._data?.appVersion >
              VersionCheck.getCurrentVersion(),
          );
          if (
            documentSnapshot._data?.appVersion >
            VersionCheck.getCurrentVersion()
          ) {
            setShowPopop(true);
          } else {
            props.navigation.replace('Home');
          }
        }, 3000);
      });
  };

  const updateGame = () => {
    Linking.openURL(
      `https://play.google.com/store/apps/details?id=${VersionCheck.getPackageName()}`,
    );
  };

  const backGame = () => {
    // ToastAndroid.show("Please Update Kids Pre School App First...", 1000);
    props.navigation.replace('Home');
    // BackHandler.exitApp();
  };

  const bannerAd = () => {
    const storeValue = async (key, value) => {
      try {
        await setDataToAsync(key, JSON.stringify(value));
      } catch (error) {}
    };

    const retrieveValue = async () => {
      const storedDateObj = await JSON.parse(await getDataFromAsync('key_1'));
      const tempData = await getDataFromAsync('LENGHTID');
      console.log('tempDatatempData', tempData);
      const adsIndex = JSON.parse(tempData);
      console.log('adsIndexadsIndex...', adsIndex);
      const date = moment().format('L');
      console.log('date date date', date);
      if (!storedDateObj) {
        storeValue('key_1', {
          storedDate: date,
          index: 0,
        });
      } else {
        console.log(
          'storedDateObj?.storedDate',
          storedDateObj?.storedDate,
          '0000',
          date,
        );
        if (storedDateObj?.storedDate != date) {
          const tempData = await getDataFromAsync('LENGHTID');
          const adsIndex = JSON.parse(tempData);
          console.log('adsIndexadsIndex1111', adsIndex);
          storeValue('key_1', {
            storedDate: date,
            index:
              parseInt(storedDateObj?.index) < adsIndex - 1
                ? parseInt(storedDateObj?.index) + 1
                : 0,
          });
        }
      }
    };
    retrieveValue();
  };

  const inDateTime = () => {
    const storeValue = async (key, value) => {
      try {
        await setDataToAsync(key, JSON.stringify(value));
      } catch (error) {}
    };

    const retrieveValue = async () => {
      const storedDateObj = await JSON.parse(await getDataFromAsync('key_2'));
      const tempData = await getDataFromAsync('INLENGHTID');
      const adsIndex = JSON.parse(tempData);
      console.log('adsIndexadsIndex', adsIndex);
      const date = moment().format('L');
      if (!storedDateObj) {
        storeValue('key_2', {
          storedDate: date,
          index: 0,
        });
      } else {
        if (storedDateObj?.storedDate != date) {
          storeValue('key_2', {
            storedDate: date,
            index:
              parseInt(storedDateObj?.index) < adsIndex - 1
                ? parseInt(storedDateObj?.index) + 1
                : 0,
          });
        }
      }
    };
    retrieveValue();
  };

  const rewarded = () => {
    const storeValue = async (key, value) => {
      try {
        await setDataToAsync(key, JSON.stringify(value));
      } catch (error) {}
    };

    const retrieveValue = async () => {
      const storedDateObj = await JSON.parse(await getDataFromAsync('key_3'));
      const tempData = await getDataFromAsync('RELENGHTID');
      const adsIndex = JSON.parse(tempData);
      console.log('adsIndexadsIndex', adsIndex);
      const date = moment().format('L');
      if (!storedDateObj) {
        storeValue('key_3', {
          storedDate: date,
          index: 0,
        });
      } else {
        if (storedDateObj?.storedDate != date) {
          storeValue('key_3', {
            storedDate: date,
            index:
              parseInt(storedDateObj?.index) < adsIndex - 1
                ? parseInt(storedDateObj?.index) + 1
                : 0,
          });
        }
      }
    };
    retrieveValue();
  };

  return (
    <>
      <Header />
      <ImageBackground
        style={{flex: 1}}
        resizeMode="stretch"
        source={Images.splashScreenImage}>
        {showPopop === true && (
          <UpdateScreen
            visible={showPopop}
            backGame={() => backGame()}
            updateGame={() => updateGame()}
          />
        )}
      </ImageBackground>
    </>
  );
};

export default SplashScreen;
