import React from 'react';
import { connect } from 'react-redux';


export class NavBar extends React.Component {
    constructor(){
        super();
        this.state = {aboutHidden: true, menuHidden: true, contactHidden: true}
       }


    toggleDropdown(){
        this.setState({menuHidden: !this.state.menuHidden})
        this.setState({aboutHidden: true})
        this.setState({contactHidden: true})  
    }
    
    toggleAbout(){
        this.setState({aboutHidden: !this.state.aboutHidden})
        this.setState({contactHidden: true})  
    }
    
    toggleContact(){
        this.setState({contactHidden: !this.state.contactHidden})
        this.setState({aboutHidden: true})   
    }

    openLink(url){
        var win=window.open(url, '_blank');
        win.focus();
    }

    render(){
        let about = this.state.aboutHidden ? 'hidden' : ''
        let menu = this.state.menuHidden ? 'hidden' : ''
        let contact = this.state.contactHidden ? 'hidden' : ''

        return(
           
                <nav className="navbar">
                    <button onClick={()=> this.toggleDropdown()}><div></div><div></div><div></div></button>

                    <ul className={`menu ${menu}`}>
                        <li className={`menu ${menu}`}></li>
                        <li className={`menu ${menu}`}>
                        <button className="nav-link"  onClick={()=> this.toggleContact()}> Contact </button>
                        </li>
                        <li className={`menu ${menu}`}>
                            <button className="nav-link"  onClick={()=> this.openLink("https://github.com/mormagli/match-3-client")}> GitHub </button>
                            </li>
                        <li className={`menu ${menu}`}>Portfolio </li>
                        <li className={`menu ${menu}`}> 
                            <button className="nav-link"  onClick={()=> this.toggleAbout()}> About </button>
                        </li>

                    </ul>
                    <ul className={`about-text ${about}`}>
                                <li className={`about about-text ${about}`}>Match 3++ is a game by Giovanni Ricci. </li>
                                <li className={`about about-text ${about}`}>Drag to swap adjacent blocks. </li>
                                <li className={`about about-text ${about}`}>Match 3 in a row or column to clear them. </li>
                                <li className={`about about-text ${about}`}>Match more than three to upgrade one. </li>
                                <li className={`about about-text ${about}`}>If you clear all blocks of a number, no new blocks of that number will appear. </li>
                                <li className={`about about-text ${about}`}>See how high you can get! </li>
                    </ul>
                    <ul className={`about-text contact ${contact}`}>
                                <li className={`about-text contact ${contact}`}>Giovanni Ricci</li>
                                <li className={`about-text contact ${contact}`}> mormagli@gmail.com </li>
                    </ul>
                </nav>
            
            
        )    
    }
}

const mapStateToProps = state => {
    return {    };
  };

export default (connect(mapStateToProps)(NavBar));