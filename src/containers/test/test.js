import React, {Component} from 'react'
import ReactDOM from 'react-dom' 
import { Modal, Button } from 'antd';
import styles from './testleo.module.less';
import btn_blue from './btn_blue.png';
import btn_pink from './btn_pink.png';
import close from './close.png';
require('./test.css');

class test extends Component{

  constructor(props) {
    super(props);
    //创建数据项
    this.state = {
      modalVisible: false,
    }
    this.handleOptionBtn = this.handleOptionBtn.bind(this);   
  }
  
  setModalVisible(modalVisible) {
    this.setState({ modalVisible });
  } 
  //点击选项，实现完成状态的显示
  handleOptionBtn() {
    let btnBlue =document.getElementById("btnBule");
    let complestatus = document.getElementById("tip");
    ReactDOM.findDOMNode(complestatus).style.display = 'block';
    ReactDOM.findDOMNode(btnBlue).style.backgroundImage = `url("${btn_pink}")`;
  }

  render() {
    return (
      <div>       
        <Button type="primary" onClick={() => this.setModalVisible(true)}>显示垂直居中的对话框</Button>
        <Modal  
          wrapClassName="vertical-center-modal"
          visible={this.state.modalVisible}
          onOk={() => this.setModalVisible(false)}
          onCancel={() => this.setModalVisible(false)}
          footer={null}
          closable={false}
        >
        <div className={styles.wrap}>       
        <div className={styles.wrap_closebtn} onClick={() => this.setModalVisible(false)}><img className={styles.closebtn} src={close} alt='close'></img></div>
        <div className={styles.wrap_headline}>餐桌上吃的食物、酒，礼物等种草party好物,我要去剁手</div>       
        <div className={styles.wrap_btn_blue1} id="btnBule" onClick={this.handleOptionBtn}><div className={styles.optext}>A. 京东</div></div>
        <div className={styles.wrap_btn_blue2} id="btnBule" onClick={this.handleOptionBtn}><div className={styles.optext}>B. 天猫</div></div>
        <div className={styles.wrap_btn_blue3} id="btnBule" onClick={this.handleOptionBtn}><div className={styles.optext}>C. 网易游戏</div></div>
        <div className={styles.wrap_btn_blue4} id="btnBule" onClick={this.handleOptionBtn}><div className={styles.optext}>D. 拼多多</div></div>
        <div className={styles.wrap_complestatus} id="tip"><p>已完成</p></div>
        </div>
        </Modal>
      </div>
    );
  }
}

export default test;

