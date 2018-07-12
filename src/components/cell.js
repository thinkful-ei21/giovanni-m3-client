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
        // console.log('firing', this.props.grid[this.props.id])
        // this.props.dispatch(insertBlock(this.props.id))
        if(this.props.grid[this.props.id]===null){
            // console.log(this.props.id[0])
            if(this.props.id[0]==='1'){
                // console.log('inserting')
                this.props.dispatch(insertBlock(this.props.id))}
            else{
                // console.log('dropping')
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
        // console.log('updated')
        if (this.props.grid[this.props.id] !== prevProps.grid[this.props.id] || this.props.grid[this.props.id] === null) {
            // console.log('checking')
            this.checkCell();
        }
    }
  
  

    render(){
        
        // console.log(this.props.values)
      return (
        <div id={this.props.id} key={this.props.id} className={`${this.props.className} `}>
            
            {this.props.grid[this.props.id] === null? <div></div> : 
                (<Block id={this.props.grid[this.props.id]} key={this.props.grid[this.props.id]}
                    parId ={this.props.id}           
                    value = {this.props.values[this.props.grid[this.props.id]]}
                    className='block'/>) 
            }
            {/* {this.state.insert}   */}
            {/* {this.props.grid[this.props.id]} */}
             {/* <Block id='a' className='block'/> */}
        </div>
        )
    }
}

const mapStateToProps = state => {
    // console.log('mapping')
    return {
        grid: state.grid.positions,
        values: state.grid.values
    };
  };

export default (connect(mapStateToProps)(Cell));