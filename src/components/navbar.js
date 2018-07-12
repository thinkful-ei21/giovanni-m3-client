import React from 'react';
import { connect } from 'react-redux';


export class NavBar extends React.Component {
    constructor(){
        super();
        this.state = {aboutHidden: true, menuHidden: true }
       }


    toggleDropdown(){
        this.setState({menuHidden: !this.state.menuHidden})
    }
    
    toggleAbout(){
        this.setState({aboutHidden: !this.state.aboutHidden})
    }
    
    render(){
        let about = this.state.aboutHidden ? 'hidden' : ''
        let menu = this.state.menuHidden ? 'hidden' : ''

        return(
           
                <nav className="navbar">
                    <button onClick={()=> this.toggleDropdown()}><div></div><div></div><div></div></button>

                    <ul className={`${menu}`}>
                        <li className={`${menu}`}></li>
                        <li className={`${menu}`}>something</li>
                        <li className={`${menu}`}>something</li>
                        <li className={`${menu}`}>something</li>
                        <li className={`${menu}`}> 
                            <button className="nav-link"  onClick={()=> this.toggleAbout()}> About</button>
                            
                            <ul className={`about-text ${about}`}>
                                <li className={`about-text ${about}`}>Match 3++ is a game by Giovanni Ricci.</li>
                                <li className={`about-text ${about}`}>Drag to swap adjacent blocks.</li>
                                <li className={`about-text ${about}`}>Match 3 in a row or column to clear them.</li>
                                <li className={`about-text ${about}`}>Match more than three to upgrade one.</li>
                                <li className={`about-text ${about}`}>If you clear all blocks of a number, no new blocks of that number will appear.</li>
                                <li className={`about-text ${about}`}>See how high you can get!</li>
                            </ul>
                        </li>

                    </ul>
                </nav>
            
            
        )    
    }
}

const mapStateToProps = state => {
    // console.log('mapping')
    return {

    };
  };

export default (connect(mapStateToProps)(NavBar));