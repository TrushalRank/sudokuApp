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
    // marginHorizontal: wp(4),
  },
  backArrowView: {
    height: hp(4),
    width: hp(4),
    // marginTop: hp(5),
  },
  hintView: {
    height: hp(2.7),
    width: hp(2.7),
    // marginTop: hp(5),
  },
  boxtext: {
    fontSize: 30,
    fontFamily: fontFamily.REGULAR,
    color: 'black',
  },
  box: {
    backgroundColor: COLOR.optionColor,
    justifyContent: 'center',
    alignItems: 'center',
    width: hp(7),
    height: hp(7),
    // width: hp(7.5),
    // height: hp(7.5),
    borderRadius: wp(10),
    marginHorizontal: hp(1.2),
    marginVertical: hp(1.5),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,

    elevation: 5,
  },
  keypadContainer: {
    position: 'relative',
    top: '9.5%',
  },
  keypadRow: {
    flexDirection: 'row',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
  },
  headerView: {
    height: hp(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  cell: {
    width: hp(4.8),
    height: hp(4.8),
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    fontWeight: '600',
    alignSelf: 'center',
    borderWidth: hp(0.1),
  },
  bagImage: {
    height: hp(40.5),
    width: wp(90),
  },
  mainContainer: {
    flexDirection: 'row',
    height: hp(15),
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: wp(4),
  },
  headerFont: {
    marginTop: hp(8),
    fontFamily: fontFamily.MEDIUM,
    fontSize: wp(5),
    color: COLOR.black,
    left: hp(2),
  },
  hintShow: {
    borderWidth: 1,
    height: hp(4.5),
    width: hp(8),
    borderRadius: hp(5),
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  cellText: {
    fontSize: hp(2.7),
    fontFamily: fontFamily.MEDIUM,
    color: COLOR.black,
  },
  optionView: {
    height: hp(10),
    width: '100%',
    flexDirection: 'row',
    // justifyContent: 'space-between',
    marginVertical: 3,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  mainContainerView: {
    flex: 0.5,
    marginHorizontal: hp(1.5),
  },
  solveButton: {
    // height: hp(8),
    // width: hp(9.5),
    // alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: 'yellow',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  solveButtonText: {
    fontFamily: fontFamily.MEDIUM,
    fontSize: wp(3.3),
    top: hp(0.3),
    color: COLOR.black,
  },
  hintText: {
    fontFamily: fontFamily.MEDIUM,
    fontSize: wp(5),
    color: COLOR.black,
  },
  optionImage: {
    height: hp(5.7),
    width: hp(5.7),
    borderRadius: hp(3),
    backgroundColor: COLOR.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,

    elevation: 8,
  },
});
