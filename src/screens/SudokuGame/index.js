import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect, lazy} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ImageBackground,
  Alert,
} from 'react-native';
import {data, optionData} from '../../common/helper/Array';
import {Images} from '../../common/styles/image';
import styles from './styles';
import FastImage from 'react-native-fast-image';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import Header from '../../components/Header';
import GameOverPopup from '../../components/GameOverPopup';
import Rewarded_Ads from '../../components/AdMobComponents/rewarded_Ads';
import BoxSelectedPopop from '../../components/BoxSelected';
import {RewardedAdEventType, RewardedAd} from 'react-native-google-mobile-ads';
import firestore from '@react-native-firebase/firestore';
import {getDataFromAsync} from '../../assets/AsyncStorage/AsyncStorage';
import Congratulations from '../../components/CongrasPop';
import {Banner_Ads} from '../../components';

const SudokuGame = props => {
  const [sudokuGrid, setSudokuGrid] = useState(null);
  const [answerSudoku, setAnswerSudoku] = useState(null);
  const [lifeLine, setLifeLine] = useState(null);
  const [colIndexData, setColIndexData] = useState(null);
  const [rowIndexData, setRowIndexData] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [boxSelected, setBoxSelected] = useState(false);
  const [adsLoded, setAdsLoded] = useState(false);
  const [loding, setLoding] = useState(true);
  const [deti, setdeti] = useState(null);
  const [chackAns, setChackAns] = useState(false);
  const [countErase, setCountErase] = useState(0);
  const [wrongEntryArr, setWrongEntryArr] = useState([]);
  const navigation = useNavigation();

  const isFocused = useIsFocused();
  const [rewardedID, setRewardedID] = useState('');
  const [rewardedAd, setRewardedAd] = useState(null);
  const [showFullAds, setShowFullAds] = useState(true);
  const [congrasAds, setCongrasAds] = useState(false);

  useEffect(() => {
    dataCollection();
  }, [isFocused]);

  const dataCollection = async () => {
    const value = await getDataFromAsync('key_3', value);
    const adsIndex = await JSON.parse(value);
    await firestore()
      .collection('AD_ID')
      .doc('Admob')
      .onSnapshot(documentSnapshot => {
        console.log(
          'documentSnapshot?._data.rewardAd[Platform.OS]',
          documentSnapshot?._data?.rewardAd[adsIndex?.index][Platform.OS],
        );
        if (
          documentSnapshot?._data?.rewardAd?.length === 0 ||
          documentSnapshot?._data?.showReward === false
        ) {
          setRewardedID('');
          setShowFullAds(false);
        } else {
          if (documentSnapshot?._data?.showReward === true) {
            setRewardedID(
              // documentSnapshot?._data.rewardAd[Platform.OS],
              documentSnapshot?._data?.rewardAd[adsIndex?.index][Platform.OS],
            );
          }
        }
      });
  };

  useEffect(() => {
    loadRewardedAd();

    return () => {
      if (rewardedAd) {
        rewardedAd.removeAllListeners();
      }
    };
  }, [rewardedID]);

  useEffect(() => {
    console.log('*****  countErasecountErasecountErase ******', countErase);
  }, [countErase]);

  const ad = RewardedAd.createForAdRequest(rewardedID, {});

  const loadRewardedAd = async () => {
    await ad?.load();
    setRewardedAd(ad);
  };

  useEffect(() => {
    console.log(
      '......................',
      lifeLine,
      adsLoded,
      '********',
      countErase,
    );
    if (adsLoded === true && rewardedAd) {
      showFullAds === true && rewardedAd?.show(), hintData();
      console.log('=======>>loded');
    } else if (countErase === 5 && rewardedAd) {
      console.log('*963./85207410/8520');
      setCountErase(0);
      showFullAds === true && rewardedAd?.show();
    }
  }, [adsLoded, rewardedAd, countErase]);

  useEffect(() => {
    if (!rewardedAd) return;

    rewardedAd.addAdEventListener(RewardedAdEventType.LOADED, () => {
      console.log(';******************** Loded');
    });
  }, [rewardedAd]);

  useEffect(() => {
    if (!rewardedAd) return;

    rewardedAd.addAdEventListener(RewardedAdEventType.EARNED_REWARD, () => {
      console.log(';**************** Close');
      loadRewardedAd();
      setAdsLoded(false);
    });
  }, [rewardedAd]);

  console.log('000000000', props?.route?.params?.allData?.title);

  useEffect(() => {
    newData();
  }, []);

  useEffect(() => {
    answerCheck();
  }, [sudokuGrid]);

  const answerCheck = () => {
    let remainingCount = 0;
    sudokuGrid?.map(item => {
      item?.map(itm => {
        if (itm === 0) {
          remainingCount = remainingCount + 1;
        }
      });
    });
    if (remainingCount === 0 && chackAns === true) {
      let array = sudokuGrid;
      let data = [];
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (sudokuGrid[i][j] != answerSudoku[i][j]) {
            console.log('array[col][row]', array[i][j]);
            data.push({i, j});
            array[i][j] = 0;
            setSudokuGrid([...array]);
          }
        }
      }
      if (data.length !== 0) {
        setWrongEntryArr([...data]);
      } else {
        setWrongEntryArr([]);
        setCongrasAds(true);
        Alert.alert('Congratulations Game Over');
      }
    }
  };

  const hintData = async () => {
    if (props?.route?.params?.allData?.title === 'Expert') {
      setLifeLine(6);
    } else if (props?.route?.params?.allData?.title === 'Medium') {
      setLifeLine(4);
    } else {
      setLifeLine(2);
    }
  };

  const newData = async () => {
    setLoding(true);
    try {
      if (props?.route?.params?.gameName === 'expert') {
        const value1 = await AsyncStorage.getItem('EXPERTSUDOKU');
        const saveData = await AsyncStorage.getItem('EXPERTSAVE');
        const saveHint = await AsyncStorage.getItem('EXPERTSAVEEHINT');
        const save = await AsyncStorage.getItem('EASYDATA');
        // console.log('**********', saveData);
        if (value1 != null) {
          setSudokuGrid(JSON.parse(value1));
          setAnswerSudoku(JSON.parse(saveData));
          setdeti(JSON.parse(value1));
          setLifeLine(JSON.parse(saveHint));
          setChackAns(true);
          setCountErase(JSON.parse(save));
          await AsyncStorage.setItem('GENERATEGAME', value1);
          setLoding(false);
        } else {
          generateSudoku(55);
          setLifeLine(6);
        }
      } else if (props?.route?.params?.gameName === 'medium') {
        const value1 = await AsyncStorage.getItem('MEDIUMSUDOKU');
        const saveData = await AsyncStorage.getItem('MEDIUMSAVE');
        const saveHint = await AsyncStorage.getItem('MEDIUMSAVEHINT');
        const save = await AsyncStorage.getItem('EASYDATA');
        // console.log('**********', saveData);
        if (value1 != null) {
          setSudokuGrid(JSON.parse(value1));
          setAnswerSudoku(JSON.parse(saveData));
          await AsyncStorage.setItem('GENERATEGAME', value1);
          setdeti(JSON.parse(value1));
          setLoding(false);
          setChackAns(true);
          setLifeLine(JSON.parse(saveHint));
          setCountErase(JSON.parse(save));
        } else {
          generateSudoku(50);
          setLifeLine(4);
        }
      } else {
        const value1 = await AsyncStorage.getItem('EASYSUDOKU');
        const saveData = await AsyncStorage.getItem('EASYSAVE');
        const saveHint = await AsyncStorage.getItem('EASYSAVEEHINT');
        const save = await AsyncStorage.getItem('EASYDATA');
        // console.log('**********', saveData);
        if (value1 != null) {
          setSudokuGrid(JSON.parse(value1));
          setAnswerSudoku(JSON.parse(saveData));
          setLifeLine(JSON.parse(saveHint));
          await AsyncStorage.setItem('GENERATEGAME', value1);
          setdeti(JSON.parse(value1));
          setLoding(false);
          setChackAns(true);
          setCountErase(JSON.parse(save));
        } else {
          generateSudoku(40);
          setLifeLine(2);
        }
      }
    } catch (error) {
      console.error('Error retrieving language:', error);
    }
  };

  async function generateSudoku(data) {
    const emptyGrid = Array.from(Array(9), () => Array(9).fill(0));
    solveSudoku(emptyGrid);
    removeNumbers(emptyGrid, data);
    // removeNumbers(emptyGrid, 40); // Adjust the second argument to control the difficulty
    // console.log('..............', emptyGrid);
    setSudokuGrid(emptyGrid);
    await AsyncStorage.setItem('GENERATEGAME', JSON.stringify(emptyGrid));
    setLoding(false);
    setChackAns(true);
    return emptyGrid;
  }

  function solveSudoku(grid) {
    const emptySpot = findEmptySpot(grid);
    if (!emptySpot) {
      return true;
    }

    const [row, col] = emptySpot;

    for (let num = 1; num <= 9; num++) {
      if (isSafe(grid, row, col, num)) {
        grid[row][col] = num;

        if (solveSudoku(grid)) {
          return true;
        }

        grid[row][col] = 0;
      }
    }

    return false;
  }

  function isSafe(grid, row, col, num) {
    return (
      !usedInRow(grid, row, num) &&
      !usedInCol(grid, col, num) &&
      !usedInBox(grid, row - (row % 3), col - (col % 3), num)
    );
  }

  function usedInRow(grid, row, num) {
    return grid[row].includes(num);
  }

  function usedInCol(grid, col, num) {
    return grid.map(row => row[col]).includes(num);
  }

  function usedInBox(grid, startRow, startCol, num) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[i + startRow][j + startCol] === num) {
          return true;
        }
      }
    }
    return false;
  }

  // function findEmptySpot(grid) {
  //   for (let i = 0; i < 9; i++) {
  //     for (let j = 0; j < 9; j++) {
  //       if (grid[i][j] === 0) {
  //         return [i, j];
  //       }
  //     }
  //   }
  //   return null;
  // }
  function findEmptySpot(grid) {
    let array = [[], [], [], [], [], [], [], [], []];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        array[i].push(grid[i][j]);
        if (grid[i][j] === 0) {
          return [i, j];
        }
      }
    }
    setAnswerSudoku(array);
    // console.log('array:::>>', array);
    return null;
  }

  function removeNumbers(grid, numToRemove) {
    let count = 0;
    while (count < numToRemove) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);
      if (grid[row][col] !== 0) {
        grid[row][col] = 0;
        count++;
      }
    }
  }

  function isValid(board1, row, col, num) {
    // Check if the number is not already in the current row and column
    console.log('row row', row);
    console.log('col col col', col);
    console.log('num num num', num);
    console.log(
      'board[row].includes(num)',
      sudokuGrid[row].includes(num),
      sudokuGrid[row],
    );
    if (sudokuGrid[row].includes(num)) {
      return false;
    }

    for (let i = 0; i < 9; i++) {
      if (sudokuGrid[i][col] === num) {
        return false;
      }
    }

    // Check if the number is not already in the current 3x3 subgrid

    const region_row_start = 3 * Math.floor(row / 3);
    const region_col_start = 3 * Math.floor(col / 3);
    for (let i = region_row_start; i < region_row_start + 3; i++) {
      for (let j = region_col_start; j < region_col_start + 3; j++) {
        if (sudokuGrid[i][j] === num) {
          return false;
        }
      }
    }

    return true;
  }

  // const checkData = text => {
  //   if (isValid(sudokuGrid, rowIndexData, colIndexData, text)) {
  //   var newIntBoard = [...sudokuGrid];
  //   newIntBoard[rowIndexData][colIndexData] = text;
  //   setSudokuGrid(newIntBoard);
  //   setColIndexData(null);
  //   setRowIndexData(null);
  //   }
  // };
  const checkData = (text, col, row) => {
    let array = sudokuGrid;
    if (array[row][col] === 0) {
      array[row][col] = text;
      setSudokuGrid([...array]);
      setColIndexData(null);
      setRowIndexData(null);
    } else {
      setColIndexData(null);
      setRowIndexData(null);
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.box}
        onPress={() => {
          console.log('======>>>', item.number);
          {
            rowIndexData != null && colIndexData != null
              ? // ? checkData(item.id)
                checkData(item.id, colIndexData, rowIndexData)
              : null;
          }
        }}>
        <Text style={styles.boxtext}>{item.number}</Text>
      </TouchableOpacity>
    );
  };

  const saveSudokuGame = async (value, saveAns) => {
    console.log('====================================', value, saveAns);
    try {
      if (props?.route?.params?.gameName === 'medium') {
        await AsyncStorage.setItem('MEDIUMSUDOKU', JSON.stringify(value));
        const value1 = await AsyncStorage.getItem('MEDIUMSUDOKU');
        console.log('**********', value1);
        await AsyncStorage.setItem('MEDIUMSAVE', JSON.stringify(saveAns));
        const saveData = await AsyncStorage.getItem('MEDIUMSAVE');
        console.log('**********', saveData);
        await AsyncStorage.setItem('MEDIUMSAVEEHINT', JSON.stringify(lifeLine));
        const saveHint = await AsyncStorage.getItem('MEDIUMSAVEHINT');
        console.log('**********', saveHint);
        await AsyncStorage.setItem('EASYDATA', JSON.stringify(countErase));
        const save = await AsyncStorage.getItem('EASYDATA');
        console.log('********** saveHint', save);
      } else if (props?.route?.params?.gameName === 'expert') {
        await AsyncStorage.setItem('EXPERTSUDOKU', JSON.stringify(value));
        const value1 = await AsyncStorage.getItem('EXPERTSUDOKU');
        console.log('**********', value1);
        await AsyncStorage.setItem('EXPERTSAVE', JSON.stringify(saveAns));
        const saveData = await AsyncStorage.getItem('EXPERTSAVE');
        console.log('**********', saveData);
        await AsyncStorage.setItem('EXPERTSAVEEHINT', JSON.stringify(lifeLine));
        const saveHint = await AsyncStorage.getItem('EXPERTSAVEEHINT');
        console.log('**********', saveHint);
        await AsyncStorage.setItem('EASYDATA', JSON.stringify(countErase));
        const save = await AsyncStorage.getItem('EASYDATA');
        console.log('********** saveHint', save);
      } else {
        await AsyncStorage.setItem('EASYSUDOKU', JSON.stringify(value));
        const value1 = await AsyncStorage.getItem('EASYSUDOKU');
        console.log('**********', value1);
        await AsyncStorage.setItem('EASYSAVE', JSON.stringify(saveAns));
        const saveData = await AsyncStorage.getItem('EASYSAVE');
        console.log('**********', saveData);
        await AsyncStorage.setItem('EASYSAVEEHINT', JSON.stringify(lifeLine));
        const saveHint = await AsyncStorage.getItem('EASYSAVEEHINT');
        console.log('**********', saveHint);
        await AsyncStorage.setItem('EASYDATA', JSON.stringify(countErase));
        const save = await AsyncStorage.getItem('EASYDATA');
        console.log('********** saveHint', save);
      }
    } catch (error) {
      console.error('Error retrieving language:', error);
    }
  };

  const saveErage = async () => {
    setCountErase(countErase + 1);
    await AsyncStorage.setItem('EASYDATA', JSON.stringify(countErase));
    const saveHint = await AsyncStorage.getItem('EASYDATA');
    console.log('********** saveHint', JSON.parse(saveHint));
  };

  const eraseData = async (row, col) => {
    console.log('row', row);
    console.log('col', col);
    console.log(sudokuGrid[col][row]);
    let data = await AsyncStorage.getItem('GENERATEGAME');
    let a = JSON.parse(data);
    let array = sudokuGrid;
    if (a[col][row] === 0) {
      array[col][row] = 0;
      setSudokuGrid([...array]);
      setColIndexData(null);
      setRowIndexData(null);
      saveErage();
    }
  };

  const sudokuHint = (row, col) => {
    console.log('row', row);
    console.log('col', col);
    console.log('====', sudokuGrid);

    let array = sudokuGrid;
    console.log('array[col][row]', array[col][row]);
    if (array[col][row] === 0) {
      console.log('answerSudoku', answerSudoku);
      console.log('answerSudoku[col][row]', answerSudoku[col][row]);
      // array[col][row] = answerSudoku[col][row];
      // setSudokuGrid([...array]);
      // setColIndexData(null);
      // setRowIndexData(null);
      if (lifeLine > 0) {
        setLifeLine(lifeLine - 1);
        array[col][row] = answerSudoku[col][row];
        setSudokuGrid([...array]);
        setColIndexData(null);
        setRowIndexData(null);
      } else {
        console.log('------');
        setGameOver(true);
        setColIndexData(null);
        setRowIndexData(null);
      }
    }
  };

  const clickItem = async item => {
    console.log('-------->>', item);
    if (item === 0) {
      console.log('00000000000');
      setColIndexData(null);
      setRowIndexData(null);
      if (props?.route?.params?.gameName === 'expert') {
        generateSudoku(55);
        setLifeLine(4);
      } else if (props?.route?.params?.gameName === 'medium') {
        generateSudoku(50);
        setLifeLine(6);
      } else {
        generateSudoku(40);
        setLifeLine(2);
      }
      // newData();
    } else if (item === 1) {
      setWrongEntryArr([]);
      setColIndexData(null);
      setRowIndexData(null);
      await AsyncStorage.getItem('GENERATEGAME').then(data => {
        setSudokuGrid(JSON.parse(data));
      });
    } else if (item === 2) {
      console.log('222222222', rowIndexData, colIndexData);
      if (rowIndexData != null && colIndexData != null) {
        sudokuHint(colIndexData, rowIndexData);
      } else {
        setBoxSelected(true);
      }
    } else if (item === 3) {
      console.log('3333333333');
      eraseData(colIndexData, rowIndexData);
    } else {
      console.log('44444444444', sudokuGrid, answerSudoku);
      saveSudokuGame(sudokuGrid, answerSudoku);
    }
  };

  const startGame = () => {
    setColIndexData(null);
    setRowIndexData(null);
    setCongrasAds(false);
    setCountErase(0);
    setWrongEntryArr([]);
    if (props?.route?.params?.gameName === 'expert') {
      generateSudoku(55);
      setLifeLine(4);
    } else if (props?.route?.params?.gameName === 'medium') {
      generateSudoku(50);
      setLifeLine(6);
    } else {
      generateSudoku(40);
      setLifeLine(2);
    }
  };
  const backToHome = () => {
    setCongrasAds(false);
    setTimeout(() => {
      navigation.goBack();
    }, 500);
  };

  const navigateToHome = () => {
    setGameOver(false);
  };
  const closeButton = () => {
    setBoxSelected(false);
  };

  const restartGame = () => {
    setAdsLoded(true);
    setGameOver(false);
  };

  const isWrongEntry = (i, j) => {
    let isWrong = false;
    wrongEntryArr.map(item => {
      if (item.i === i && item.j === j) {
        isWrong = true;
      }
    });
    return isWrong;
  };

  return (
    console.log(
      'oldDataSudokuoldDataSudoku',
      answerSudoku,
      '.........',
      wrongEntryArr,
    ),
    (
      <>
        <Header />
        <ImageBackground
          source={Images.backgroundImage}
          resizeMode="stretch"
          style={{flex: 1}}>
          {!loding ? (
            <View style={styles.container}>
              <View style={styles.mainContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <FastImage
                    source={Images.back_arrow}
                    style={styles.backArrowView}
                    resizeMode={FastImage.resizeMode.contain}></FastImage>
                </TouchableOpacity>
                <Text style={styles.headerFont}>
                  {props?.route?.params?.allData?.title}
                </Text>
                <View style={styles.hintShow}>
                  <Text style={styles.hintText}>{lifeLine}</Text>
                  <FastImage
                    source={Images.hintbg}
                    style={styles.hintView}
                    resizeMode={FastImage.resizeMode.contain}></FastImage>
                </View>
              </View>
              {/* <View style={styles.headerView}>
                <Text style={styles.headerFont}>
                  {props?.route?.params?.allData?.title}
                </Text>
              </View> */}
              <View
                style={{
                  alignItems: 'center',
                  flex: 0.5,
                }}>
                {sudokuGrid?.map((row, rowIndex) => (
                  <View key={rowIndex} style={styles.row}>
                    {row.map((cell, colIndex) => (
                      <TouchableOpacity
                        key={`${rowIndex}-${colIndex}`}
                        style={[
                          styles.cell,
                          {
                            backgroundColor:
                              colIndexData === colIndex &&
                              rowIndexData === rowIndex
                                ? 'white'
                                : isWrongEntry(rowIndex, colIndex)
                                ? 'red'
                                : props?.route?.params?.imageData?.imageData[
                                    rowIndex
                                  ][colIndex],
                            borderWidth: 1,
                          },
                        ]}
                        onPress={() => {
                          console.log('CALLL', cell, colIndex, rowIndex);
                          setColIndexData(colIndex);
                          setRowIndexData(rowIndex);
                        }}>
                        <Text style={styles.cellText}>
                          {cell === 0 ? '' : `${cell}`}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                ))}
              </View>
              <View style={styles.mainContainerView}>
                <View style={styles.optionView}>
                  {optionData.map((item, index) => {
                    return (
                      <View style={styles.solveButton}>
                        <TouchableOpacity
                          style={{alignItems: 'center'}}
                          activeOpacity={1}
                          onPress={() => clickItem(index, item)}>
                          <FastImage
                            source={item?.source}
                            style={styles.optionImage}
                            resizeMode={
                              FastImage.resizeMode.contain
                            }></FastImage>
                          <Text style={styles.solveButtonText}>
                            {item.nameData}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </View>
                <FlatList
                  data={data}
                  contentContainerStyle={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                  renderItem={renderItem}
                  numColumns={5}
                />
              </View>
              <Banner_Ads />
            </View>
          ) : (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size={'large'} color={'black'} />
            </View>
          )}
        </ImageBackground>
        <GameOverPopup
          visible={gameOver}
          navigateToHome={navigateToHome}
          restartGame={restartGame}
          popupTitle={'Hint Over'}
          popopText={`Stuck on a tough puzzle? No worries, here's you get more hints to get you going!`}
          {...props}
        />
        <BoxSelectedPopop
          visible={boxSelected}
          closeButton={closeButton}
          popupTitle={`Please select place where you wan't to take hint.`}
          {...props}
        />
        <Congratulations
          visible={congrasAds}
          closeButton={closeButton}
          backToHome={backToHome}
          startGame={startGame}
          popupTitle={`Congratulations !`}
          popopText={`You've successfully completed the Sudoku puzzle!`}
          {...props}
        />
        {/* {adsLoded === true && (
          <Rewarded_Ads
            onClose={() => {
              hintData(), setAdsLoded(false);
            }}
          />
        )} */}
        {/* // <Interstitial_Ads
        //   onClose={() => {
        //     hintData(), setAdsLoded(false);
        //   }}
        // />
      )} */}
      </>
    )
  );
};

export default SudokuGame;
