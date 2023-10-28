import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {RewardedAdEventType, RewardedAd} from 'react-native-google-mobile-ads';
import {getDataFromAsync} from '../../assets/AsyncStorage/AsyncStorage';
import firestore from '@react-native-firebase/firestore';

const Rewarded_Ads = props => {
  const [loaded, setLoaded] = useState(false);
  const isFocused = useIsFocused();
  const [rewardedID, setRewardedID] = useState('');

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
          'documentSnapshot?._data.rewardAd[Platform.OS]',
          documentSnapshot?._data.rewardAd[adsIndex?.index][Platform.OS],
        );
        if (
          documentSnapshot?._data.rewardAd.length === 0 ||
          documentSnapshot?._data?.showReward === false
        ) {
          setRewardedID('');
        } else {
          if (documentSnapshot?._data?.showReward === true) {
            setRewardedID(
              // documentSnapshot?._data.rewardAd[Platform.OS],
              documentSnapshot?._data.rewardAd[adsIndex?.index][Platform.OS],
            );
          }
        }
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      console.log('.....'), console.log('rewardedID', rewardedID);
      const rewarded = RewardedAd.createForAdRequest(rewardedID, {
        requestNonPersonalizedAdsOnly: true,
      });

      rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
        setLoaded(true);
        rewarded.show();
      });
      rewarded.addAdEventListener(RewardedAdEventType.EARNED_REWARD, reward => {
        // console.log('User earned reward of ', reward);
        props?.onClose();
      });

      rewarded.load();

      // Unsubscribe from events on unmount
      return () => {
        rewarded.removeAllListeners();
      };
    }, [rewardedID]),
  );

  if (!loaded) {
    return null;
  }

  return <></>;
};

export default Rewarded_Ads;
