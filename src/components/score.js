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
            </div>
        )    
    }
}

const mapStateToProps = state => {
    // console.log('mapping')
    return {
        score: state.grid.score
    };
  };

export default (connect(mapStateToProps)(Score));