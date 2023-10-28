// import {
//   View,
//   TouchableOpacity,
//   ScrollView,
//   ImageBackground,
//   Alert,
// } from "react-native";
// import React, { useEffect, useState } from "react";
// import styles from "./styles";
// import analytics from "@react-native-firebase/analytics";
// import { useFocusEffect } from "@react-navigation/native";
// import firestore from "@react-native-firebase/firestore";
// import {
//   Banner_Ads,
//   HeaderComponents,
//   UpdateScreen,
// } from "../../../components";
// import {
//   HomeScreenArray,
//   eventTrackScreen,
// } from "../../../common/helper/Array";
// import VersionCheck from "react-native-version-check";
// import { checkVersion } from "react-native-check-version";
// import TikiktComponent from "../../../components/TikiktComponent";
// import { Images } from "../../../common/styles/image";
// import { COLOR } from "../../../common/styles/color";
// import { StringFont } from "../../../common/styles/string";
// import LanguageModal from "../../../components/languageModal";
// import { getDataFromAsync } from "../../../assets/AsyncStorage/AsyncStorage";

// const Home = ({ navigation }) => {
//   const [showPopop, setShowPopop] = useState(false);
//   const [language, setLanguage] = useState(null);

//   // ------ React Hook ------ //
//   useFocusEffect(
//     React.useCallback(() => {
//       languageData();
//       dataCollection();
//       analytics().setAnalyticsCollectionEnabled(true);
//       eventTrackScreen("Home");
//       checkUpdateNeeded();
//     }, [])
//   );

//   const languageData = async () => {
//     const tempData = await getDataFromAsync("APPLANGUGE");
//     const data = await JSON.parse(tempData);
//     if (data === null) {
//       setLanguage("eng");
//     }
//     setLanguage(data?.key);
//   };

//   useEffect(async () => {
//     VersionCheck.getCountry();
//     const version = await checkVersion();
//     if (version.needsUpdate) {
//       console.log(`App has a ${version.updateType} update pending.`);
//     }
//   }, []);

//   const checkUpdateNeeded = async () => {
//     VersionCheck.needUpdate({
//       currentVersion: VersionCheck.getCurrentVersion(),
//       latestVersion: "1.0",
//     }).then((res) => {
//       if (res.isNeeded) {
//         setShowPopop(true);
//       }
//     });
//     VersionCheck.getCountry();
//   };

//   // ------ Funcation Data Collection ------ //
//   const dataCollection = async () => {
//     const data = [];
//     await firestore()
//       .collection("EventsCollection")
//       .get()
//       .then((querySnapshot) => {
//         ``;
//         querySnapshot.forEach((snapshot) => {
//           let res = snapshot.data();
//           data.push(res);
//         });
//       });
//   };

//   const languageIconClick = () => {
//     setShowPopop(!showPopop);
//     languageData();
//   };

//   // ------ React return method ------ //
//   return (
//     <View style={styles.container}>
//       <ImageBackground
//         style={styles.bagContainer}
//         resizeMode="stretch"
//         source={Images.homeScreen}
//       >
//         <ImageBackground
//           style={styles.headerImage}
//           resizeMode="stretch"
//           source={Images.VectorFast}
//         >
//           <HeaderComponents
//             headerName={StringFont.Kids_Play}
//             rightImage
//             leftImage={Images.languageIcon}
//             onPress={() => languageIconClick()}
//           />
//         </ImageBackground>
//         {/* {showPopop == true && <UpdateScreen visible={showPopop} />} */}
//         <View style={styles.mainView}>
//           <ScrollView
//             style={{ flex: 1 }}
//             contentContainerStyle={{ alignItems: "center" }}
//             showsVerticalScrollIndicator={false}
//           >
//             <TouchableOpacity
//               onPress={() =>
//                 navigation.navigate("learningList", {
//                   item: HomeScreenArray[0],
//                   index: 0,
//                   mainScreenIndex: 0,
//                 })
//               }
//             >
//               <TikiktComponent
//                 imageTikit
//                 source={Images.card_one}
//                 tikitColorfront={COLOR.fastTikitColor}
//                 tikitColorBack={COLOR.fastTikitBackColor}
//                 headerText={StringFont.Let_s_start_Learning[language]}
//                 headerSmallText={
//                   StringFont.Today_a_reader_tomorrow_a_leader[language]
//                 }
//               />
//             </TouchableOpacity>
//             <TouchableOpacity
//               onPress={() =>
//                 navigation.navigate("learningList", {
//                   item: HomeScreenArray[1],
//                   index: 1,
//                   mainScreenIndex: 1,
//                 })
//               }
//             >
//               <TikiktComponent
//                 imageTikit
//                 source={Images.card_two}
//                 tikitColorfront={COLOR.tikitTwoColor}
//                 tikitColorBack={COLOR.tikitTwoBackColor}
//                 headerText={StringFont.Start_Video_Learning[language]}
//                 headerSmallText={
//                   StringFont.Unlock_Your_Potential_Through_Video_Learning[
//                     language
//                   ]
//                 }
//               />
//             </TouchableOpacity>
//             <TouchableOpacity
//               onPress={() =>
//                 navigation.navigate("learningList", {
//                   item: HomeScreenArray[2],
//                   index: 2,
//                   mainScreenIndex: 2,
//                 })
//               }
//             >
//               <TikiktComponent
//                 imageTikit
//                 source={Images.card_three}
//                 tikitColorfront={COLOR.tikitThreeColor}
//                 tikitColorBack={COLOR.tikitThreeBackColor}
//                 headerText={StringFont.Look_and_choose[language]}
//                 headerSmallText={
//                   StringFont.Look_Guess_Play_Fun_for_Kids_and_Learn_Every_Day[
//                     language
//                   ]
//                 }
//               />
//             </TouchableOpacity>
//             <TouchableOpacity
//               onPress={() =>
//                 navigation.navigate("learningList", {
//                   item: HomeScreenArray[3],
//                   index: 3,
//                   mainScreenIndex: 3,
//                 })
//               }
//             >
//               <TikiktComponent
//                 imageTikit
//                 source={Images.card_four}
//                 tikitColorfront={COLOR.tikitFourColor}
//                 tikitColorBack={COLOR.tikitFourBackColor}
//                 headerText={StringFont.Listen_and_Guess[language]}
//                 headerSmallText={
//                   StringFont.Listen_Play_Guess_Fun_for_Kids_Every_Day[language]
//                 }
//               />
//             </TouchableOpacity>
//           </ScrollView>
//         </View>
//         {showPopop == true && (
//           <LanguageModal
//             visible={showPopop}
//             backGame={() => backGame()}
//             updateGame={() => updateGame()}
//             onPress={() => languageIconClick()}
//           />
//         )}
//         {/* <Banner_Ads /> */}
//       </ImageBackground>
//     </View>
//   );
// };

// export default Home;

import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import crashlytics from '@react-native-firebase/crashlytics';
import FastImage from 'react-native-fast-image';
import {gameLevel, imageArray} from '../../common/helper/Array';
import {Images} from '../../common/styles/image';
import styles from './styles';
import ButtonView from '../../components/Button';
import Header from '../../components/Header';
import {Banner_Ads} from '../../components';

const Home = ({navigation}) => {
  const [currentBoard, setCurrentBoard] = useState(0);
  const [currentGame, setCurrentGame] = useState(0);

  useEffect(() => {
    dataCollection();
  }, []);

  const dataCollection = async () => {
    await firestore()
      .collection('AD_ID')
      .doc('Admob')
      .onSnapshot(documentSnapshot => {
        console.log('====================================');
        console.log(documentSnapshot);
        console.log('====================================');
      });
  };

  const clickItem = (item1, item2) => {
    // console.log('=====----===', item1, '-=-=-=-=', item2);
    navigation.navigate('SudokuGame', {
      title: item1?.title,
      gameName: item2?.name,
      imageData: item1,
      allData: item2,
    });
  };

  const renderItemImage = imageArray => {
    // console.log('====>>', imageArray);
    return (
      <View style={styles.renderView}>
        <Text style={styles.gameImageName}>{imageArray?.title}-Sudoku</Text>
        <FastImage
          style={styles.itemImage}
          source={imageArray?.source}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
    );
  };
  const renderItem = gameLevel => {
    console.log('====>>gameLevel', gameLevel);
    return (
      <View style={styles.renderView}>
        <Text style={styles.gameHeaderName}>{gameLevel?.title}</Text>
      </View>
    );
  };

  return (
    <>
      <Header />
      <ImageBackground
        style={styles.container}
        resizeMode="stretch"
        source={Images.backgroundImage}>
        <View style={styles.mainView}>
          <View style={styles.logoContainer}>
            <FastImage
              source={Images.SudokuLogo}
              style={styles.logoImage}
              resizeMode={FastImage.resizeMode.contain}></FastImage>
            <TouchableOpacity
              onPress={() => navigation.navigate('SettingsScreen')}>
              <FastImage
                source={Images.settingsLogo}
                style={styles.settingLogo}
                resizeMode={FastImage.resizeMode.contain}></FastImage>
            </TouchableOpacity>
          </View>
          <View style={styles.mainContainer}>
            <View style={styles.imageContainer}>
              {renderItemImage(imageArray[currentBoard])}
              <View
                style={[
                  styles.arrowContainer,
                  {width: Dimensions.get('window').width - 40},
                ]}>
                <TouchableOpacity
                  disabled={currentBoard === 0}
                  onPress={() => setCurrentBoard(currentBoard - 1)}>
                  {currentBoard > 0 && (
                    <FastImage
                      style={styles.arrowIcon}
                      source={Images.btn_prev}
                      resizeMode={FastImage.resizeMode.contain}></FastImage>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  disabled={currentBoard > 4}
                  onPress={() => setCurrentBoard(currentBoard + 1)}>
                  {currentBoard < 4 && (
                    <FastImage
                      style={styles.arrowIcon}
                      source={Images.btn_next}
                      resizeMode={FastImage.resizeMode.contain}></FastImage>
                  )}
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.imageContainer}>
              {renderItem(gameLevel[currentGame])}
              <View
                style={[
                  styles.arrowContainer,
                  {width: Dimensions.get('window').width - 160},
                ]}>
                <TouchableOpacity
                  // disabled={currentBoard === 0}
                  onPress={() =>
                    setCurrentGame(currentGame === 0 ? 2 : currentGame - 1)
                  }>
                  <FastImage
                    style={styles.arrowIconGame}
                    source={Images.btn_prev}
                    resizeMode={FastImage.resizeMode.contain}></FastImage>
                </TouchableOpacity>
                <TouchableOpacity
                  // disabled={currentBoard > 3}
                  onPress={() =>
                    setCurrentGame(currentGame === 2 ? 0 : currentGame + 1)
                  }>
                  <FastImage
                    style={styles.arrowIconGame}
                    source={Images.btn_next}
                    resizeMode={FastImage.resizeMode.contain}></FastImage>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() =>
                clickItem(imageArray[currentBoard], gameLevel[currentGame])
              }>
              <ButtonView />
            </TouchableOpacity>
          </View>
        </View>
        <Banner_Ads />
      </ImageBackground>
    </>
  );
};

export default Home;
