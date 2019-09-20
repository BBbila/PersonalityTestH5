import React, { Component, Fragment } from 'react'
import { Helmet } from 'react-helmet'
import ReactDOM from 'react-dom'
import styles from './result.module.less'
import utils from '../../utils'
import { CONTEXT } from '../../config'
import STATIC from '../../static'

const STORAGEKEY = 'appstoreActivity'

class result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resultImg : STATIC.imgs.image_lemo,
      resultSave : STATIC.imgs.save_lemo,
     
    }
    this.handleClickShare = this.handleClickShare.bind(this)
    this.handleClickMemory = this.handleClickMemory.bind(this)
  }
  componentDidMount() {
    this.differentResultImg()
  }

  differentResultImg = () => {
    let markTotal = 0
    const option = {A: 0, B: 1, C: 2, D: 3}
    let data =utils.getSessionStorage(STORAGEKEY)
    if(data.total === 7){
      for(let i in data) {
        markTotal += option[data[i]] || 0 
      }
    }

    let resultImg = STATIC.imgs.image_lemo
    let resultSave =STATIC.imgs.save_lemo
    if(markTotal > 0 && markTotal<= 3) {
      resultImg = STATIC.imgs.image_lemo
      resultSave = STATIC.imgs.save_lemo
    }else if(markTotal > 3 && markTotal<= 7) {
      resultImg = STATIC.imgs.image_bro
      resultSave = STATIC.imgs.save_bro
    }else if(markTotal > 7 && markTotal<= 11) {
      resultImg = STATIC.imgs.image_faerie
      resultSave = STATIC.imgs.save_faerie
    }else if(markTotal > 11 && markTotal<= 14) {
      resultImg = STATIC.imgs.image_childe
      resultSave = STATIC.imgs.save_childe
    }else if(markTotal > 14 && markTotal<= 18) {
      resultImg = STATIC.imgs.image_BB
      resultSave = STATIC.imgs.save_BB
    }else if(markTotal > 18 && markTotal<= 21) {
      resultImg = STATIC.imgs.image_horse
      resultSave = STATIC.imgs.save_horse
    }
    this.setState({
      resultImg : resultImg,
      resultSave: resultSave
    })

  }
  handleClickShare = () => {
    let wrapShare = this.refs.wrapShare
    ReactDOM.findDOMNode(wrapShare).style.display = 'block'
  }
  handleClickMemory = () => {
    let wrapMemory = this.refs.wrapMemory
    ReactDOM.findDOMNode(wrapMemory).style.display = 'block'
  }


  render() {
    const {resultImg} = this.state
    return (
      <Fragment>
      <div className={styles.page} ref='pagebox'>
        <Helmet>
          <title>10周年庆活动</title>
        </Helmet>
        <div className={styles.page_bg}></div>
        <div className={styles.page_resultImg}><img src={resultImg} alt='resultImg'></img></div>
        <div className={styles.page_btnshare} onClick={this.handleClickShare}><img src={STATIC.imgs.btn_share} alt='btn_share'></img></div>
        <div className={styles.page_btnmemory} onClick={this.handleClickMemory}><img src={STATIC.imgs.btn_memory} alt = 'btn_memory'></img></div>
      </div>

      {/* 点击分享按钮弹出提示 */}
      <div className={styles.wrap_share} ref='wrapShare'>
        <div className={styles.share_tip}><img src={STATIC.imgs.girl} alt='girl'></img></div>
        <img className={styles.shbtn} src={STATIC.imgs.btn_share} alt='btn_share'></img>
      </div>
      {/* 点击按钮弹出提示 */}
      <div className={styles.wrap_memory} ref='wrapMemory'>
        <div className={styles.memory_tip}><img src={STATIC.imgs.girl1} alt='girl1'></img></div>
        <img className={styles.shbtn1} src={STATIC.imgs.btn_memory} alt='btn_share'></img>
      </div>
    </Fragment>
    );
  }
}

export default result;
