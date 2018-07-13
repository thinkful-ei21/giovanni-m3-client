import React from 'react';
import Block from './Block';
import { connect } from 'react-redux';
import {insertBlock, dropBlock} from '../actions/grid'

export class Cell extends React.Component {
    constructor(props){
        super(props);
        this.state = { }
       }

    checkCell(){        
        if(this.props.grid[this.props.id]===null){
            if(this.props.id[0]==='1'){
                this.props.dispatch(insertBlock(this.props.id))}
            else{
                this.props.dispatch(dropBlock(this.props.id))
            }
        }
        // else{
        //     this.setState({insert:(
        //         <Block id={this.props.grid[this.props.id]} className='block'/>
            // )})
        // }
        
    }


    componentDidMount(){this.checkCell()}

    componentDidUpdate(prevProps) {
        if (this.props.grid[this.props.id] !== prevProps.grid[this.props.id] || this.props.grid[this.props.id] === null) 
            { this.checkCell(); }
    }
  
    render(){
        
      return (
        <div id={this.props.id} key={this.props.id} className={`${this.props.className} `}>
            
            {this.props.grid[this.props.id] === null? <div></div> : 
                (<Block id={this.props.grid[this.props.id]} key={this.props.grid[this.props.id]}
                    parId ={this.props.id}           
                    value = {this.props.values[this.props.grid[this.props.id]]}
                    className='block'/>) 
            }
        </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        grid: state.grid.positions,
        values: state.grid.values
    };
  };

export default (connect(mapStateToProps)(Cell));