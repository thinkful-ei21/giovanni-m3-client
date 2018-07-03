import React, { Component } from 'react';
import posed, { PoseGroup } from 'react-pose';
import { connect } from 'react-redux';

import {spring} from 'popmotion';

import {swapBlocks} from '../actions/grid';
import {toggleHidden} from '../actions/block';

// const looseSpring = (props) =>
//   spring({ ...props, stiffness: 200, damping: 0 })

const Item = posed.div({
    draggable: true,
    dragBounds: { left: -50, right: 50, top: -50, bottom: 50 },
    dragEnd: {transition: spring }
});




export class Block extends Component{
    constructor(){
        super();
        this.state = {        }
       }


    
    // render() {
    //     return <Box className="item" 
    //             pose={this.state.isVisible ? 'visible' : 'hidden'}
    //             />;
    // }
    



    drag(ev) {
        // console.log(ev.target.id)
        // this.props.dispatch(toggleHidden())
        // ev.dataTransfer.setData("text", ev.target.id);
    }

    moved(e){}
    
    testClick(e){
        // let id = e.target.id
        // console.log(id)
        // console.log(this.props.grid)
        // this.props.dispatch(swapBlocks(id, 'left'))
    }

    render(){
        // console.log(this.props.isHidden)
        return (
            <Item hidden={this.props.isHidden} id={this.props.id} 
            value={this.props.id}
            className='item' onDragStart={e=>this.drag(e) }
            onValueChange={{ x: x => console.log('x',x),
                y: y => console.log('y',y)
            }}
            onDragEnd ={e=>this.testClick(e)}

            >{this.props.id}</Item>
        )
    }

};

const mapStateToProps = state => {
    return {
        isHidden: state.block.isHidden,
        grid: state.grid.positions
    };
  };

export default (connect(mapStateToProps)(Block));