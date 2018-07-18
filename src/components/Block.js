import React, { Component } from 'react';
import posed from 'react-pose';
import { connect } from 'react-redux';

import {spring, tween} from 'popmotion';

import {swapBlocks} from '../actions/grid';


// const looseSpring = (props) =>
//   spring({ ...props, stiffness: 200, damping: 0 })

const Item = posed.li({
    draggable: true,
    centered: {},

    left: {x: ({w}) => -(w-1) },
    right: {x: ({w}) => (w-1) },
    up: {y: ({w}) => -(w-1) },
    down: {y: ({w}) => (w-1) },

    dragBounds: { left: -65, right: 65, top: -65, bottom: 65 },
    dragEnd: {transition: spring },
    flip: {transition: tween},
    props: {w:0},


});



export class Block extends Component{
    constructor(){
        super();
        this.state = { direction: '', dragging:false, swapping:false, width:0 }
       }
    
    xVal;
    yVal;
    setX(x){this.xVal = x}
    setY(y){this.yVal = y}



    componentDidUpdate(prevProps) {
        if (this.props.swap[this.props.parId] !== prevProps.swap[this.props.parId]) {
            this.setState({swapping: this.props.swap[this.props.parId]})
        }
        if(this.state.width !== document.getElementById(this.props.id).offsetHeight){
            this.setState({width:document.getElementById(this.props.id).offsetHeight})
        }
    }

    componentDidMount(){
        // console.log(document.getElementById(this.props.id).offsetHeight)
        this.setState({width:document.getElementById(this.props.id).offsetHeight})
    }

    
    getDirection(){
        let id = this.props.id
                
        if (Math.abs(Math.abs(this.xVal)-Math.abs(this.yVal)) >= 25){
            let direction = ''
            if(Math.abs(this.xVal) > Math.abs(this.yVal) && this.xVal > 0){direction='right'}
            else if(Math.abs(this.xVal) > Math.abs(this.yVal) && this.xVal < 0){direction='left'}
            else if(Math.abs(this.xVal) < Math.abs(this.yVal) && this.yVal > 0){direction='down'}
            else if(Math.abs(this.xVal) < Math.abs(this.yVal) && this.yVal < 0){direction='up'}

            this.props.dispatch(swapBlocks(id, direction))
        }
    }

    startDragging(){
        this.setState({dragging:true})
    }

    stopDragging(){
        this.setState({dragging:false})
    }

    clickTest(){

        // var element = document.getElementById(`${this.props.id}`)
    
        // console.log(document.getElementById(this.props.id).offsetHeight)
        // this.setState({triggered:!this.state.triggered})
        
        }



    render(){
        let color = this.props.value;
        while(color> 9){color = color-9}

        return (
            
            <Item  id={this.props.id}
            
            key={this.props.id}
            value={this.props.value}
            className={`item item-${color} btn btn-lg btn-default ${this.state.dragging ? 'dragging' : ''}` }
            pose={!this.state.swapping ? 'centered' : this.props.swap[this.props.parId] }
            onClick={()=> this.clickTest()}
            w={this.state.width}
            onDragStart={()=> this.startDragging()}
            onValueChange={{ x: x => this.setX(x), y: y => this.setY(y) }}
            onDragEnd ={()=>{
                this.stopDragging()
                this.getDirection()}}
            >
                <div className="item-value"> {this.props.value} </div>
            </Item>
        )
    }

};

const mapStateToProps = state => {
    return {
        grid: state.grid.positions,
        values: state.grid.values,
        swap: state.grid.swapping
    };
  };

export default (connect(mapStateToProps)(Block));