import React, { Component, Fragment } from 'react'
import { Helmet } from 'react-helmet'
import { Modal} from 'antd';
import styles from './home.module.less'
import utils from '../../utils'
import AudioComponent from '../../Component/playMusic';
import ReactDOM from 'react-dom'
import {SCENE_DATA} from '../../config'
import STATIC from '../../static'
import music from './music.gif'
import liwu from './liwu.gif'
import share from './share.gif'
import taxi from './taxi.gif'
import youxi from './youxi.gif'
import zhibo from './zhibo.gif'
import zipai from './zipai.gif'
import wenzi from './wenzi.png'
import close from './close.png';
import musicoog from './music.ogg'
require('./homeModal.css');


const STORAGEKEY = 'appstoreActivity'
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isloading:true,
      modalVisible: false,
      ModalInfo:{},
      checkOption: null,
      numberChange: STATIC.imgs.number7,
      isPlay: false,//是否有音频在播放
      isRunning:false,
      pointScene: 'music',
      timeOutIndex: null
    }
    this.handleOptionBtn = this.handleOptionBtn.bind(this);
  }

  componentDidMount() {
    // console.log(this)
    let width = utils.calculateWidth()
    //console.log(this.refs.pagebox.scrollLeft)
  }

  //打开弹窗
  setModalVisible(modalVisible) {
    this.setState({ modalVisible});
  } 

  //点击场景时，弹窗进制
  handleScene = (e,scene) => {
    //如果存在这个场景，就打开弹窗，并且将该场景的信息显示出来
    if(SCENE_DATA[scene]) {
      this.setModalVisible(true)
      this.setState({ModalInfo: SCENE_DATA[scene]})
    }
    //如果已经点击并做过题，再打开此场景时，获取本地储存里的数据
    let data = utils.getSessionStorage(STORAGEKEY)
    if (data && data[scene]) {
      console.log(data,data[scene])
      //如果已有选择记录，则匹配选项，让选项颜色改变，并且个数也要发生变化
      this.setState({
        checkOption: data[scene],
        numberChange: STATIC.imgs[`number${7-data.total}`] || STATIC.imgs.number0,
      })
    }
  }

  //点击每个选项的事件
  handleOptionBtn = (e,scene,option) => {
    let doms = this.refs.wrapOption.children
    utils.changeBtnColor(doms,doms[0])
    utils.changeBtnColor(doms,doms[1])
    utils.changeBtnColor(doms,doms[2])
    utils.changeBtnColor(doms,doms[3])
    utils.changeBtnColor(doms,e.currentTarget)//将当前点击的按钮的颜色改变
    
    //本地保存每个场景选的值
    let newData = {}
    newData[scene] = option
    utils.setSessionStorage(STORAGEKEY,newData)
    let data = utils.getSessionStorage(STORAGEKEY)
    this.setState({
      numberChange: STATIC.imgs[`number${7-data.total}`] || STATIC.imgs.number0,
    })
    //点击选项，实现完成状态的显示
    let complestatus = document.getElementById("tip");
    ReactDOM.findDOMNode(complestatus).style.display = 'block';
    setTimeout(() => this.releaseInfo(),500)
    this.loadFeatrue()
    this.CloseandNextScene()
  }

  //关闭每个场景清空每个场景的信息
  releaseInfo = () => {
    this.setModalVisible(false)
    let complestatus = document.getElementById("tip");
    ReactDOM.findDOMNode(complestatus).style.display = 'none';
    this.setState({
      ModalInfo : {},
      checkOption: null
    })
  }

  //当答题结束后加载人设页面
  loadFeatrue = () => {
    let data = utils.getSessionStorage(STORAGEKEY)
    if(data && data.total === 7){
      let loadingFeatrue = this.refs.loadingFeatrue
      ReactDOM.findDOMNode(loadingFeatrue).style.display = 'block'
      this.swichResultPage()
    }
  }
  //跳转到结果页
  swichResultPage = () => {
    if(this.isloading) {
      this.setState({isloading:false})
    }
    setTimeout(() => {this.props.history.push("/activity/result")},1500)
    
  }

  /*播放按钮*/
  play(obj) {
    this.setState({
        isPlay: obj
    });
  }

  /*指引动效 */
  onAnimationEndWord = (e) => {
    let dom = e.currentTarget
      if (utils.hasClass(dom, styles.home_word_jiantou)) {
        utils.addClass(dom, styles.animation_jiantou)
        this.guideScrollNextScene()
      } else {
        utils.addClass(dom, styles.animation_word)
      }
    }
  
  guideScrollNextScene = () => {
    let self = this
    let scene = self.getNextScene()
    // 答题结束 退出
    if (this.state.isRunning || !scene || utils.hasClass(this.refs.homeDialog, styles.dialogIn)) {
      return false
    }
    this.setState({isRunning: true})
    //设置指引的场景
    let toScene = self.refs[scene]
    let to = toScene.offsetLeft - 100 //to表示偏移的像素值
    // 保存将要hand point 的scene
    self.setState({
      pointScene: scene
    })
      var homeHandpoint = document.getElementById("homeHandpoint")
      utils.scrollDom(self.refs.pagebox, to, 5, () => {
      this.setState({isRunning: false})
      //显出指引点击的动画
      if(this.state.pointScene === "music"){
        utils.changeClass(homeHandpoint,styles.home_handpoint_wrapper_music,styles.home_handpoint_wrapper)
        utils.addClass(homeHandpoint, styles.pointIn)
      }else if(this.state.pointScene === "zipai"){
        utils.changeClass(homeHandpoint,styles.home_handpoint_wrapper_zipai,styles.home_handpoint_wrapper_music)
        utils.addClass(homeHandpoint, styles.pointIn)
      }else if(this.state.pointScene === "share"){
        utils.changeClass(homeHandpoint,styles.home_handpoint_wrapper_share,styles.home_handpoint_wrapper_zipai)
        utils.addClass(homeHandpoint, styles.pointIn)
      }else if(this.state.pointScene === "youxi"){
        utils.changeClass(homeHandpoint,styles.home_handpoint_wrapper_youxi,styles.home_handpoint_wrapper_share)
        utils.addClass(homeHandpoint, styles.pointIn)
      }else if(this.state.pointScene === "zhibo"){
        utils.changeClass(homeHandpoint,styles.home_handpoint_wrapper_zhibo,styles.home_handpoint_wrapper_youxi)
        utils.addClass(homeHandpoint, styles.pointIn)
      }else if(this.state.pointScene === "liwu"){
        utils.changeClass(homeHandpoint,styles.home_handpoint_wrapper_liwu,styles.home_handpoint_wrapper_zhibo)
        utils.addClass(homeHandpoint, styles.pointIn)
      }else if(this.state.pointScene === "taxi"){
        utils.changeClass(homeHandpoint,styles.home_handpoint_wrapper_taxi,styles.home_handpoint_wrapper_liwu)
        utils.addClass(homeHandpoint, styles.pointIn)
      }
    })
  }
  getNextScene = () => {
    let data = utils.getSessionStorage(STORAGEKEY)
    let scenes = ['music', 'zipai', 'share', 'youxi', 'zhibo', 'liwu', 'taxi']
    let scene = null
    for (let i=0; i<scenes.length; i++) {
      if (!data || !data[scenes[i]]) {
        scene = scenes[i]
        break
      }
    }
    return scene
  }
  handleHandpoint = () => {
    this.handleScene({},this.state.pointScene)
    var homeHandpoint = document.getElementById("homeHandpoint")
    utils.removeClass(homeHandpoint, styles.pointIn)
  }
  //关闭弹窗后2秒指引下一个场景
  CloseandNextScene =() => {
    if (this.state.timeOutIndex !== null) {
      clearTimeout(this.state.timeOutIndex)
    }
    let timeOutIndex = setTimeout(() => {
      this.guideScrollNextScene()
    }, 1 * 1000)
    this.setState({ timeOutIndex: timeOutIndex })
  }

  render() {
    const {ModalInfo, numberChange, checkOption} = this.state
    return (
      <Fragment>
        <Helmet>
          <title>10周年庆活动</title>
        </Helmet>
        <div className={styles.hint}><img className={styles.hinttext} src={wenzi} alt='wenzi'></img></div>
        <div className={styles.numberImg}><img src={numberChange} alt='number'></img></div>
        {/* <div className={styles.paly}><img src={STATIC.imgs.play} alt='play'></img></div> */}
        <AudioComponent id="playmusic" src={musicoog} play={this.play.bind(this)} isPlay={this.state.isPlay}/>
        {/* 整个内容 */}
        <div className={styles.page} ref='pagebox'>
          <div className={styles.page_bg}></div>
          <div className={styles.page_music} onClick={(e) => {this.handleScene(e,'music')}} ref='music'>
            <img className={styles.music} src={music} alt='music'></img>          
          </div>
          <div className={styles.page_liwu} onClick={(e) => {this.handleScene(e,'liwu')}} ref='liwu'>
            <img className={styles.liwu} src={liwu} alt='liwu'></img>
          </div>
          <div className={styles.page_share} onClick={(e) => {this.handleScene(e,'share')}} ref='share'>
            <img className={styles.share} src={share} alt='share'></img>
          </div>
          <div className={styles.page_taxi} onClick={(e) => {this.handleScene(e,'taxi')}} ref='taxi'>
            <img className={styles.taxi} src={taxi} alt='taxi'></img>
          </div>
          <div className={styles.page_youxi} onClick={(e) => {this.handleScene(e,'youxi')}} ref='youxi'>
            <img className={styles.youxi} src={youxi} alt='youxi'></img>
          </div>
          <div className={styles.page_zhibo} onClick={(e) => {this.handleScene(e,'zhibo')}} ref='zhibo'>
            <img className={styles.zhibo} src={zhibo} alt='zhibo'></img>
          </div>
          <div className={styles.page_zipai} onClick={(e) => {this.handleScene(e,'zipai')}} ref='zipai'>
            <img className={styles.zipai} src={zipai} alt='zipai'></img>
          </div>
          <div className={styles.home_word} ref='pagePointWord'>
            <img className={styles.home_word_bg} src={STATIC.imgs.bg_mengban} alt='mengban'></img>
            <img className={styles.home_word_dian} src={STATIC.imgs.word_dian} onAnimationEnd={this.onAnimationEndWord} alt="点"/>
            <img className={styles.home_word_ji} src={STATIC.imgs.word_ji} onAnimationEnd={this.onAnimationEndWord} alt="击"/>
            <img className={styles.home_word_dong} src={STATIC.imgs.word_dong} onAnimationEnd={this.onAnimationEndWord} alt="动"/>
            <img className={styles.home_word_xiao} src={STATIC.imgs.word_xiao} onAnimationEnd={this.onAnimationEndWord} alt="效"/>
            <img className={styles.home_word_jiantou} src={STATIC.imgs.word_jiantou} onAnimationEnd={this.onAnimationEndWord} alt="=>"/><br/>     
          </div>          
         {/* 指引特效 */}
          <div className={styles.home_handpoint_wrapper} id='homeHandpoint' ref='handHandpoint'>
            <img className={styles.home_handpoint_img} src={STATIC.imgs.image_shou} alt='shou' onClick={this.handleHandpoint}></img>
          </div>
        
          {/* 弹窗 */}
          <Modal  
            wrapClassName="vertical-center-modal"
            visible={this.state.modalVisible}
            onOk={() => this.setModalVisible(false)}
            onCancel={() => this.setModalVisible(false)}
            footer={null}
            closable={false}
          >
          <div className={styles.wrap} ref="wrapBody">       
          <div className={styles.wrap_closebtn} onClick={() => this.setModalVisible(false)}><img className={styles.closebtn} src={close} alt='close'></img></div>
          {ModalInfo.title 
            &&(<div className={styles.wrap_headline}>{ModalInfo.title}</div>)
          }
          {ModalInfo.option 
            &&(<div className={styles.warp_option} ref="wrapOption" id="wrapOption">
              <div className={styles.wrap_btn_blue1}  style={{backgroundImage: checkOption === 'A' ? `url("${STATIC.imgs.btn_pink}")` : `url("${STATIC.imgs.btn_blue}")`}} onClick={(e) => {this.handleOptionBtn(e,ModalInfo.scene,'A')}}><div className={styles.optext}>A. {ModalInfo.option.A}</div></div>
              <div className={styles.wrap_btn_blue2}  style={{backgroundImage: checkOption === 'B' ? `url("${STATIC.imgs.btn_pink}")` : `url("${STATIC.imgs.btn_blue}")`}} onClick={(e) => {this.handleOptionBtn(e,ModalInfo.scene,'B')}}><div className={styles.optext}>B. {ModalInfo.option.B}</div></div>
              <div className={styles.wrap_btn_blue3}  style={{backgroundImage: checkOption === 'C' ? `url("${STATIC.imgs.btn_pink}")` : `url("${STATIC.imgs.btn_blue}")`}} onClick={(e) => {this.handleOptionBtn(e,ModalInfo.scene,'C')}}><div className={styles.optext}>C. {ModalInfo.option.C}</div></div>
              <div className={styles.wrap_btn_blue4}  style={{backgroundImage: checkOption === 'D' ? `url("${STATIC.imgs.btn_pink}")` : `url("${STATIC.imgs.btn_blue}")`}} onClick={(e) => {this.handleOptionBtn(e,ModalInfo.scene,'D')}}><div className={styles.optext}>D. {ModalInfo.option.D}</div></div>
            </div>)
          }
            <div className={styles.wrap_complestatus} id="tip" ref='tip'><p>已完成</p></div> 
          </div>
          </Modal>      
      </div>

      {/* 计算人设界面 */}
      <div className={styles.page_loadingFeatrue} ref='loadingFeatrue'>
      <div className={styles.page_che}><img src={STATIC.imgs.che} alt='che'></img></div>
          <div className={styles.page_text} >正在计算你的人设</div>
      </div>
    </Fragment>
    );
  }
}

export default Home;
