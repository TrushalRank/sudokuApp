import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';
import firestore from '@react-native-firebase/firestore';
import {getDataFromAsync} from '../../assets/AsyncStorage/AsyncStorage';

const Banner_Ads = () => {
  const [adUnitId, setadUnitId] = useState('');
  const [showAds, setShowAds] = useState(true);
  const isFocuse = useIsFocused();

  useFocusEffect(
    React.useCallback(() => {
      dataCollection();
    }, [isFocuse]),
  );

  const dataCollection = async () => {
    const value = await getDataFromAsync('key_1', value);
    const adsIndex = await JSON.parse(value);
    console.log('======  adsIndex   ====banner', adsIndex);
    await firestore()
      .collection('AD_ID')
      .doc('Admob')
      .onSnapshot(documentSnapshot => {
        console.log(
          'documentSnapshotdocumentSnapshot',
          documentSnapshot?._data.bannerAd[0][Platform.OS],
        );
        if (
          documentSnapshot?._data.bannerAd.length === 0 ||
          documentSnapshot?._data?.showBanner === false
        ) {
          setadUnitId('');
        } else {
          if (documentSnapshot?._data?.showBanner === true) {
            setadUnitId(
              documentSnapshot?._data.bannerAd[adsIndex?.index][Platform.OS],
            );
          }
        }
      });
  };

  const onAdFailedToLoad = error => {
    setShowAds(false);
  };

  const onAdLoaded = () => {
    setShowAds(true);
  };

  return adUnitId != '' && showAds ? (
    <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      onAdFailedToLoad={onAdFailedToLoad}
      onAdLoaded={onAdLoaded}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />
  ) : null;
};

export default Banner_Ads;
