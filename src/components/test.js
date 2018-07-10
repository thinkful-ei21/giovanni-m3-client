import React, { Component } from 'react';
import { connect } from 'react-redux';
import Block from './Block';
import Row from './Row';
import Score from './score'
import posed, { PoseGroup } from 'react-pose';
import {spring} from 'popmotion';

import { checkGrid, deleteBlock, resetGame, incrimentVal, calcScore } from '../actions/grid';
import { submitScore, clearAuth } from '../actions/auth';

const sidebarConfig = {
  open: { x: '0%' },
  closed: { x: '-100%' },
  initialPose: 'closed'
}

const itemConfig = {
  draggable: true,
  dragBounds: { left: -60, right: 60, top: -60, bottom: 60 },
  dragEnd: {transition: spring },
  open: { y: 0, opacity: 1 },
  closed: { y: 20, opacity: 0 }
}

const Sidebar = posed.ul(sidebarConfig)
const Item = posed.li(itemConfig)

class Test extends Component {
  constructor(){
   super();
   this.state = {isOpen:true}
  
  }


  
  render() {
    const { isOpen } = this.state;
  
    return (
      <Sidebar className="container" pose={isOpen ? 'open' : 'closed'}>
        <Item className="item" />
        <Item className="item" />
        <Item className="item" />
        <Item className="item" />
        <Item className="item" />
        <Item className="item" />
        <Item className="item" />
        <Item className="item" />
        <Item className="item" />
        <Item className="item" />
        <Item className="item" />
        <Item className="item" />
      </Sidebar>
    );
  }
}

const mapStateToProps = state => {
  return {
   grid: state.grid.positions,
   groups: state.grid.groups,
   points: state.grid.score,
   gameOver: state.grid.gameOver,
   userName: state.auth.currentUser
  };
};

export default (connect(mapStateToProps)(Test));
