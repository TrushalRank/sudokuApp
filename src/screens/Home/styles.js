import {Dimensions, Platform, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLOR} from '../../common/styles/color';
import {fontFamily} from '../../common/styles/font';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  mainView: {
    flex: 1,
  },
  logoContainer: {
    flex: 0.2,
    alignItems: 'center',
    alignSelf: 'flex-end',
    width: '70%',
    marginRight: wp(7.5),
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  logoImage: {
    marginTop: hp(8),
    height: hp(8),
    width: wp(50),
  },
  settingLogo: {
    height: hp(5.5),
    width: wp(10),
  },
  mainContainer: {
    flex: 0.8,
    alignItems: 'center',
  },
  imageContainer: {
    // flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  renderView: {
    // height: wp(60),
    marginTop: hp(5),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  containContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemImage: {
    width: hp(30),
    height: hp(30),
    alignSelf: 'center',
    marginTop: hp(1.5),
  },
  arrowContainer: {
    position: 'absolute',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  arrowIcon: {
    width: hp(4),
    height: hp(4),
    marginTop: hp(8),
  },
  arrowIconGame: {
    width: hp(3),
    height: hp(3),
    marginTop: hp(6),
  },
  gameImageName: {
    fontFamily: fontFamily.BOLD,
    fontSize: wp(6),
    color: COLOR.black,
  },
  gameHeaderName: {
    fontFamily: fontFamily.REGULAR,
    fontSize: wp(6),
    color: COLOR.black,
  },
  buttonViwe: {
    height: hp(6),
    width: wp(45),
    marginTop: hp(3),
    borderRadius: wp(3),
    backgroundColor: COLOR.appColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
