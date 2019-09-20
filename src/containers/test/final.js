import React,{Component} from 'react'
import Progress from '../test/Progress'

class final extends Component{

    render() {
        return(
            <div>
                <Progress allNum={10} percentageNum={0.33} progressName='小明' />
            </div>
        );
    }
}
export default final