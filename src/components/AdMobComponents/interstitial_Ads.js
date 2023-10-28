import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import {InterstitialAd, AdEventType} from 'react-native-google-mobile-ads';
import firestore from '@react-native-firebase/firestore';
import {getDataFromAsync} from '../../assets/AsyncStorage/AsyncStorage';

const Interstitial_Ads = props => {
  const [loaded, setLoaded] = useState(false);
  const isFocused = useIsFocused();
  const [interstitialID, setInterstitialID] = useState('');

  useEffect(() => {
    dataCollection();
  }, [isFocused]);

  const dataCollection = async () => {
    const value = await getDataFromAsync('key_2', value);
    const adsIndex = await JSON.parse(value);
    await firestore()
      .collection('AD_ID')
      .doc('Admob')
      .onSnapshot(documentSnapshot => {
        console.log(
          'documentSnapshot?._data.interstitialAd[Platform.OS]',
          documentSnapshot?._data.interstitialAd[adsIndex?.index][Platform.OS],
        );
        if (
          documentSnapshot?._data.interstitialAd.length === 0 ||
          documentSnapshot?._data?.showFull === false
        ) {
          setInterstitialID('');
        } else {
          if (documentSnapshot?._data?.showFull === true) {
            setInterstitialID(
              // documentSnapshot?._data.interstitialAd[Platform.OS],
              documentSnapshot?._data.interstitialAd[adsIndex?.index][
                Platform.OS
              ],
            );
          }
        }
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      console.log('.....'), console.log('interstitialID', interstitialID);
      const interstitial = InterstitialAd.createForAdRequest(interstitialID, {
        requestNonPersonalizedAdsOnly: true,
        keywords: ['fashion', 'clothing'],
      });

      interstitial.addAdEventListener(AdEventType.LOADED, () => {
        setLoaded(true);
        interstitial.show();
      });

      interstitial.addAdEventListener(AdEventType.CLOSED, () => {
        props?.onClose();
        console.log('************');
      });

      interstitial.load();

      return () => {
        interstitial.removeAllListeners();
      };
    }, [interstitialID]),
  );

  if (!loaded) {
    return null;
  }

  return <></>;
};

export default Interstitial_Ads;
