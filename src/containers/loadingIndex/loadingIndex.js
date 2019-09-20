import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Helmet} from 'react-helmet'
import { CONTEXT } from '../../config'
import styles from './loadingIndex.module.less'
import STATIC from '../../static'


class loadingIndex extends Component{
  constructor(props) {
    super(props);
    this.state = {
        isLoading: true,
        numpercent: 0,
    }
    
  }
  componentDidMount() {
    this.preLoadprogress()
    this.delLoadprogress()
  }

  //页面加载
  pageLoaded = () => {
    if (this.isLoading) {
      this.setState({isLoading: false})
    }
    setTimeout(() => {
      this.swichpage()
    },500)
  }

  swichpage = () => {
    this.props.history.push("/activity/indexHome");
  }

  //进度加载
  preLoadprogress = () => {
    let imagesArr = STATIC.preload_imgs
    let length = imagesArr.length
    let loaded = 0
    let loadImgSucc = () => {
        loaded++
        this.setState({
            numpercent: parseInt(loaded / length * 100) 
        })
        if (loaded === length) {
          this.pageLoaded()
        }
      }
      for (let i = 0; i < length; i++) {
        let image = new Image()
        image.src = imagesArr[i]
        image.onload = loadImgSucc
      }
      //指定时间来调用函数
      setTimeout(() => {
        this.pageLoaded()
      }, 9000)
  }

  delLoadprogress = () => {
    let imagesArr = STATIC.delload_imgs
    let length = imagesArr.length
    setTimeout(() => {
      for (let i = 0; i < length; i++) {
        let image = new Image()
        image.src = imagesArr[i]
      }
    }, 30)
  }

  render() {
      let {numpercent} = this.state
      return (
        <div className={styles.page} ref='pagebox'>
          <Helmet>
            <title>10周年庆活动加载页</title>
          </Helmet>
          <div className={styles.page_bg}></div>
          <div className={styles.page_che}><img src={STATIC.imgs.che} alt='che'></img></div>
          <div className={styles.page_text} >正在赶往PARTY现场<br/>
            <div className={styles.page_percent} id='load'><p>{numpercent}%</p></div>
          </div>
        </div>
      );
  }
}
export default loadingIndex;