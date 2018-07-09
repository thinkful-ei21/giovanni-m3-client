import React from 'react';
import { connect } from 'react-redux';


export class Score extends React.Component {
    constructor(){
        super();
        this.state = { }
       }

    render(){

        return(
            <div>
                points: {this.props.score}
                High Score: {this.props.score > this.props.highScore ? this.props.score : this.props.highScore}   
            </div>
            
        )    
    }
}

const mapStateToProps = state => {
    // console.log('mapping')
    return {
        score: state.grid.score,
        highScore: state.grid.highScore
    };
  };

export default (connect(mapStateToProps)(Score));