import React, {Component} from 'react';
import PropTypes from 'prop-types';
 
export default class Progress extends Component {
  static contextTypes = {
    percentageNum: PropTypes.number,
    allNum: PropTypes.number,
    progressName: PropTypes.string
  };
  constructor(props) {
    super(props)
      
  }
 
  render() {
    let percentageNum = (this.props.percentageNum*100);
    //这个支持css样式响应式的
    let leftPercentage = (1-this.props.percentageNum)*(-100);
    //不支持样式响应式,可以写死
    // let leftPercentage = (1-this.props.percentageNum)*(-450);
    let div1 = {
      //不支持样式响应式,可以写死
      // width:"450px"
      //这个支持css样式响应式的
        width:"90%",
        height:"45px",
        background:"#dedede",
        position: "relative",
        margin:"22px auto 0",
        overflow: "hidden",
      };
    let div2 = {
      //不支持样式响应式,可以写死
      // width:"450px"
      //这个支持css样式响应式的
        width:"100%",
        height:"45px",
        background:"#1AAAA8",
        position: "absolute",
      //不支持样式响应式,可以写死
        // left:`${leftPercentage}px`,
      //这个支持css样式响应式的
        left:`${leftPercentage}%`,
      };
    let div3 = {
        position: "absolute",
        width:"auto",
        height:"45px",
        left:"15px",
        color:"#ffffff",
        lineHeight: "45px",
        fontSize: "16px",
      };
    let div4 ={
        position: "absolute",
        width:"auto",
        height:"45px",
        right:"15px",
        lineHeight: "45px",
        fontSize: "16px",
        color: "#7B7B7B",
      };
    return (
      <div style={div1}>
        <div style={div2}></div>
        <div style={div3}>{this.props.progressName}</div>
        <div style={div4}>
          {percentageNum}%
                |
          {this.props.allNum}
        </div>
        
      </div>
    )
  }
}
 