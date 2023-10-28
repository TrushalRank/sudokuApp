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
  headerContainer: {
    flex: 0.1,
    alignItems: 'center',
    alignSelf: 'flex-start',
    width: '56%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: wp(4),
    marginTop: hp(5),
  },
  backArrowLogo: {
    marginTop: hp(-5),
    height: hp(4),
    width: wp(9),
  },
  headerFont: {
    fontFamily: fontFamily.MEDIUM,
    fontSize: hp(3.5),
    color: COLOR.black,
  },
  listContainer: {
    flex: 0.9,
    marginHorizontal: wp(4),
  },
  listView: {
    height: hp(6),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(1),
  },
  lineView: {
    height: wp(0.5),
    backgroundColor: COLOR.black,
  },
  imageContainer: {
    height: hp(4),
    width: wp(7),
  },
  textView: {
    fontFamily: fontFamily.REGULAR,
    fontSize: wp(5.2),
    color: COLOR.black,
    marginHorizontal: hp(1.52),
  },
});
