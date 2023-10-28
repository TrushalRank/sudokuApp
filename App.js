import {LogBox} from 'react-native';
import React, {useEffect} from 'react';
import Navigation from './src/navigation';
import * as Sentry from '@sentry/react-native';
import analytics from '@react-native-firebase/analytics';
import firestore from '@react-native-firebase/firestore';
import {setDataToAsync} from './src/assets/AsyncStorage/AsyncStorage';
// import firestore from "@react-native-firebase/firestore";
// import { setDataToAsync } from "./src/assets/AsyncStorage/AsyncStorage";
// import DeviceInfo from "react-native-device-info";

const App = () => {
  Sentry.init({
    dsn: 'https://d2066e221206b83eb747521fe79dc91b@o4505684402044928.ingest.sentry.io/4506059771936768',
    tracesSampleRate: 1.0,
  });
  LogBox.ignoreAllLogs();

  useEffect(() => {
    dataFirebase();
    analytics().setAnalyticsCollectionEnabled(true);
  }, []);

  const dataFirebase = async () => {
    await firestore()
      .collection('AD_ID')
      .doc('Admob')
      .onSnapshot(documentSnapshot => {
        console.log(
          '=================8888===================',
          documentSnapshot?._data,
        );
        const value = documentSnapshot?._data?.bannerAd?.length;
        setDataToAsync('LENGHTID', JSON.stringify(value));
      });

    // await firestore()
    //   .collection('AD_ID')
    //   .doc('Admob')
    //   .onSnapshot(documentSnapshot => {
    //     console.log(
    //       '=================8888===================..........',
    //       documentSnapshot?._data?.interstitialAd,
    //     );
    //     const value = documentSnapshot?._data?.interstitialAd?.length;
    //     console.log('00000========', value);
    //     setDataToAsync('INLENGHTID', JSON.stringify(value));
    //   });

    await firestore()
      .collection('AD_ID')
      .doc('Admob')
      .onSnapshot(documentSnapshot => {
        console.log(
          '=================8888===================',
          documentSnapshot?._data?.rewardAd,
        );
        const value = documentSnapshot?._data?.rewardAd?.length;
        console.log('00000========', value);
        setDataToAsync('RELENGHTID', JSON.stringify(value));
      });
  };

  // useEffect(async () => {
  //   const deviceType = DeviceInfo.getDeviceType();
  //   // Determine the specific device model
  //   const model = DeviceInfo.getModel();
  //   const isIOS = Platform.OS === "ios";
  //   let deviceModel = "Unknown";

  //   if (isIOS) {
  //     if (model.includes("iPhone")) {
  //       deviceModel = "iPhone";
  //     } else if (model.includes("iPad")) {
  //       deviceModel = "iPad";
  //     }
  //   } else {
  //     // Android device
  //     if (deviceType === "Tablet") {
  //       deviceModel = "Tablet";
  //     } else {
  //       deviceModel = "Android";
  //     }
  //   }

  //   eventTrackScreen(deviceModel);

  //   await firestore()
  //     .collection("AD_ID")
  //     .doc("Admob")
  //     .onSnapshot((documentSnapshot) => {
  //       const value = documentSnapshot?._data?.bannerAd?.length;
  //       setDataToAsync("LENGHTID", JSON.stringify(value));
  //     });

  //   await firestore()
  //     .collection("AD_ID")
  //     .doc("Admob")
  //     .onSnapshot((documentSnapshot) => {
  //       const value = documentSnapshot?._data?.interstitialAd?.length;
  //       setDataToAsync("INLENGHTID", JSON.stringify(value));
  //     });

  //   await firestore()
  //     .collection("AD_ID")
  //     .doc("Admob")
  //     .onSnapshot((documentSnapshot) => {
  //       const value = documentSnapshot?._data?.nativeadAd?.length;
  //       setDataToAsync("NALENGHTID", JSON.stringify(value));
  //     });
  // });

  return <Navigation />;
};
// export default App;
export default Sentry.wrap(App);
