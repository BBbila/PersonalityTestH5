import React, { Component } from 'react';
import styles from './indexHome.module.less'
import {Helmet} from 'react-helmet'
import btn from './btn_lijicanyu.png'
import music1 from './music_1.png'
import music2 from './music_2.png'
import music3 from './music_3.png'
import music4 from './music_4.png'
import music5 from './music_5.png'
import music6 from './music_6.png'
import music7 from './music_7.png'
import music8 from './music_8.png'
import STATIC from '../../static'

class indexHome extends Component{
  
  constructor(props) {
    super(props);
    //创建数据项
    this.state = {

    }
    this.handleClickBtn = this.handleClickBtn.bind(this);
  }
  
  handleClickBtn() {
    this.props.history.push("/activity/home");
  }

  render() {
    return (
      <div className={styles.page} ref='pagebox'>
        <Helmet>
            <title>10周年庆活动首页</title>
        </Helmet>
        <div className={styles.page_bg}></div>
        <div className={styles.page_btn}>
          <img className={styles.btn} src={btn} alt='btn' onClick={this.handleClickBtn}></img>
        </div>
        <div className={styles.page_music1}>
          <img className={styles.music1} src={music1} alt='music1'></img>
        </div>
        <div className={styles.page_music2}>
          <img className={styles.music2} src={music2} alt='music2'></img>
        </div>
        <div className={styles.page_music3}>
          <img className={styles.music3} src={music3} alt='music3'></img>
        </div>
        <div className={styles.page_music4}>
          <img className={styles.music4} src={music4} alt='music4'></img>
        </div>
        <div className={styles.page_music5}>
          <img className={styles.music5} src={music5} alt='music5'></img>
        </div>
        <div className={styles.page_music6}>
          <img className={styles.music6} src={STATIC.imgs.play} alt='music6'></img>
        </div>
        <div className={styles.page_music7}>
          <img className={styles.music7} src={music7} alt='music7'></img>
        </div>
        <div className={styles.page_music8}>
          <img className={styles.music8} src={music8} alt='music8'></img>
        </div>       
      </div>
  );
  }
}
export default indexHome;

