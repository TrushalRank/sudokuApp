import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLOR } from "../../common/styles/color";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.whiteSplash,
  },
  image: {
    flex: 1,
  },
  giftshow: {
    flex: 0.6,
    alignItems: "center",
    justifyContent: "center",
  },
  giftImage: {
    height: hp(50),
    width: wp(100),
  },
  appText: {
    flex: 0.4,
    alignItems: "center",
    justifyContent: "center",
    bottom: hp(2),
  },
  textImage: {
    height: hp(20),
    width: wp(100),
    marginVertical: hp(1),
  },
  imageSplash: {
    flex: 1,
  },
  splashCartonImg: {
    height: hp(20),
    width: wp(100),
    zIndex: 1,
    elevation: 1,
    marginTop: hp(15),
  },
});
