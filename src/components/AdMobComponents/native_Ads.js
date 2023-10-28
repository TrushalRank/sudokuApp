import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  DeviceEventEmitter,
  Platform,
  Text,
  View,
} from "react-native";
import NativeAdView, {
  AdvertiserView,
  CallToActionView,
  HeadlineView,
  IconView,
  StoreView,
  TaglineView,
} from "react-native-admob-native-ads";
import firestore from "@react-native-firebase/firestore";
import { getDataFromAsync } from "../../assets/AsyncStorage/AsyncStorage";

export const Native_Ads = React.memo(
  ({ index, media, type, loadOnMount = true }) => {
    const [aspectRatio, setAspectRatio] = useState(1.5);
    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);
    const [nativeAdsload, setNativeAdsload] = useState(true);
    const [heightAds, setHeightAds] = useState(false);
    const nativeAdRef = useRef();

    function Logger(tag = "AD", type, value) {}

    const [nativeID, setNativeID] = useState(null);

    useEffect(() => {
      dataGetAsync();
      // dataCollection()
    });

    const dataGetAsync = async () => {
      const value = await getDataFromAsync("key_3", value);
      const adsIndex = await JSON.parse(value);
      await firestore()
        .collection("AD_ID")
        .doc("Admob")
        .onSnapshot((documentSnapshot) => {
          if (
            documentSnapshot?._data?.nativeadAd.length === 0 ||
            documentSnapshot?._data?.showNative === false
          ) {
            setNativeID("");
          } else {
            if (documentSnapshot?._data?.showNative === true) {
              setNativeID(
                documentSnapshot?._data?.nativeadAd[adsIndex?.index][
                  Platform.OS
                ]
              );
            }
          }
        });
      nativeAdRef.current?.loadAd();
    };

    const Events = {
      onViewableItemsChanged: "onViewableItemsChanged",
    };

    const onAdFailedToLoad = (event) => {
      setError(true);
      setLoading(false);
      setNativeAdsload(false);
      Logger("AD", "FAILED", event.error);
    };

    const onAdLoaded = () => {
      Logger("AD", "LOADED", "Ad has loaded successfully");
      setNativeAdsload(true);
      setHeightAds(true);
    };

    const onAdClicked = () => {
      Logger("AD", "CLICK", "User has clicked the Ad");
    };

    const onAdImpression = () => {
      Logger("AD", "IMPRESSION", "Ad impression recorded");
    };

    const onNativeAdLoaded = (event) => {
      Logger("AD", "RECIEVED", "Unified ad  Recieved", event);
      setLoading(false);
      setLoaded(true);
      setError(false);
      setAspectRatio(event.aspectRatio);
    };

    const onAdLeftApplication = () => {
      Logger("AD", "LEFT", "Ad left application");
    };

    const onViewableItemsChanged = useCallback(
      (event) => {
        let viewableAds = event.viewableItems.filter(
          (i) => i.key.indexOf("ad") !== -1
        );
        viewableAds.forEach((adView) => {
          if (adView.index === index && !loaded) {
            setLoading(true);
            setLoaded(false);
            setError(false);
            Logger("AD", "IN VIEW", "Loading " + index);
            nativeAdRef.current?.loadAd();
          } else {
            if (loaded) {
              Logger("AD", "IN VIEW", "Loaded " + index);
            } else {
              Logger("AD", "NOT IN VIEW", index);
            }
          }
        });
      },
      [index, loaded]
    );

    useEffect(() => {
      let onViewableItemsChangedHandler;

      if (!loadOnMount) {
        onViewableItemsChangedHandler = DeviceEventEmitter.addListener(
          Events.onViewableItemsChanged,
          onViewableItemsChanged
        );
      }

      return () => {
        if (!loadOnMount) {
          onViewableItemsChangedHandler.remove();
        }
      };
    }, [index, loadOnMount, loaded, onViewableItemsChanged]);

    useEffect(() => {
      if (loadOnMount || index <= index) {
        setLoading(true);
        setLoaded(false);
        setError(false);
        nativeAdRef.current?.loadAd();
      }
      return () => {
        setLoaded(false);
      };
    }, [loadOnMount, index]);

    return (
      <NativeAdView
        ref={nativeAdRef}
        onAdLoaded={onAdLoaded}
        onAdFailedToLoad={onAdFailedToLoad}
        onAdLeftApplication={onAdLeftApplication}
        onAdClicked={onAdClicked}
        onAdImpression={onAdImpression}
        onNativeAdLoaded={onNativeAdLoaded}
        refreshInterval={60000 * 2}
        style={{
          width: "98%",
          alignSelf: "center",
          backgroundColor: "transparent",
          height: heightAds == true ? "100%" : 0,
        }}
        videoOptions={{
          customControlsRequested: true,
        }}
        mediationOptions={{
          nativeBanner: true,
        }}
        adUnitID={nativeID}
      >
        {nativeAdsload ? (
          <View
            style={{
              width: "100%",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#f0f0f0",
                position: "absolute",
                justifyContent: "center",
                alignItems: "center",
                opacity: !loading && !error && loaded ? 0 : 1,
                zIndex: !loading && !error && loaded ? 0 : 10,
              }}
            >
              {loading && <ActivityIndicator size={28} color="#a9a9a9" />}
              {error && <Text style={{ color: "#a9a9a9" }}>:-(</Text>}
            </View>

            <View
              style={{
                height: 80,
                width: "96%",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 10,
                backgroundColor: "#FFFFFF",
                borderRadius: 10,
                alignItems: "center",
                opacity: loading || error || !loaded ? 0 : 1,
              }}
            >
              <IconView
                style={{
                  width: 60,
                  height: 60,
                }}
              />
              <View
                style={{
                  flexGrow: 1,
                  flexShrink: 1,
                  paddingHorizontal: 6,
                }}
              >
                <HeadlineView
                  hello="abc"
                  style={{
                    fontWeight: "bold",
                    fontSize: 13,
                    color: "black",
                  }}
                />
                <TaglineView
                  numberOfLines={2}
                  style={{
                    fontSize: 11,
                    color: "black",
                  }}
                />
                <AdvertiserView
                  style={{
                    fontSize: 10,
                    color: "gray",
                  }}
                />

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <StoreView
                    style={{
                      fontSize: 12,
                      color: "black",
                    }}
                  />
                </View>
              </View>

              <CallToActionView
                style={[
                  {
                    minHeight: 45,
                    paddingHorizontal: 12,
                    justifyContent: "center",
                    alignItems: "center",
                    elevation: 10,
                    maxWidth: 100,
                    width: 80,
                  },
                  Platform.OS === "ios"
                    ? {
                        backgroundColor: "#FFA500",
                        borderRadius: 10,
                      }
                    : {},
                ]}
                buttonAndroidStyle={{
                  backgroundColor: "#FFA500",
                  borderRadius: 10,
                }}
                allCaps
                textStyle={{
                  fontSize: 13,
                  flexWrap: "wrap",
                  textAlign: "center",
                  color: "white",
                }}
              />
            </View>
          </View>
        ) : null}
      </NativeAdView>
    );
  }
);
