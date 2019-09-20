
import React, {Component} from 'react';
import STATIC from '../../static';
require ('./work.css' );

class AudioComponent extends Component{
    constructor(props) {
        super(props);
          console.log(props.src)
        this.state = {
            isPlay: false,
            isMuted: false,
            volume: 100,
            allTime: 0,
            currentTime: 0,
            value:10,
            songs: props.src
        };
    }
    //播放按钮
    play=()=>{
        this.setState({
            isPlay: !this.state.isPlay
        })
    }

    controlAudio(type, value) {
        const { id, src } = this.props;
        const audio = document.getElementById(`audio${id}`);
        switch(type) {
            case 'allTime':
                this.setState({
                    allTime: audio.duration
                });
                break;
            case 'play':
                audio.play();
                this.setState({
                    isPlay: true
                });
                break;
            case 'pause':
                audio.pause();
                this.setState({
                    isPlay: false
                });
                break;
            case 'muted':
                this.setState({
                    isMuted: !audio.muted
                });
                audio.muted = !audio.muted;
                break;
            case 'changeCurrentTime':
                this.setState({
                    currentTime: value
                });
                audio.currentTime = value;
                if(value == audio.duration) {
                    this.setState({
                        isPlay: false
                    });
                }
                break;
            case 'getCurrentTime':
                this.setState({
                    currentTime: audio.currentTime
                });
                if (audio.currentTime == audio.duration) {
                    this.setState({
                        isPlay: false
                    });
                }
                break;
            case 'changeVolume':
                audio.volume = value / 100;
                this.setState({
                    volume: value,
                    isMuted: !value
                });
                break;
                default:
                //do nothing
        }   
    }
    render(){
        let {isPlay,songs} = this.state;       
        return(
            <div>
                <div className="audio_music">
                    <div className="audioBox">
                        <audio
                            id={`audio${this.props.id}`}
                            src={songs}
                            preload="true"
                            onCanPlay={() => this.controlAudio('allTime')}
                            onTimeUpdate={(e) => this.controlAudio('getCurrentTime')}
                            autoPlay
                        >
                        您的浏览器不支持 audio 标签。
                        </audio>
                        <div className="auido-photos">
                            <img onClick={() => this.controlAudio(isPlay ? 'pause' : 'play')} src={this.state.isPlay?STATIC.imgs.play:STATIC.imgs.musicPause} alt=""/>
                        </div>                                    
                    </div>
               </div>
           </div>
                        
        )
    }
}
export default AudioComponent;
