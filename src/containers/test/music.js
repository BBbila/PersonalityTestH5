import React,{Component} from 'react'
import musicoog from './music.ogg'
import AudioComponent from './sound';


class music extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPlay: false,//是否有音频在播放
        }
    }

    /*播放按钮*/
    play(obj) {
        this.setState({
            isPlay: obj
        });
    }

    render() {
        return (
           
             <AudioComponent id="playmusic" src={musicoog} play={this.play.bind(this)} isPlay={this.state.isPlay}/>
        );
    }
}

export default music;