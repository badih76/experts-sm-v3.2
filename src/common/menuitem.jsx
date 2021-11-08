import React, { Component } from 'react';
import { NavDropdown, MenuItem, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class MenuItemElement extends Component {
    state = {
        subDir: '/fms'
    }

    render() {
        const { menuitem } = this.props;

        if(menuitem.menuDropdown.length === 0)
        {
            return (
                <NavItem eventKey={menuitem.menuOptionId}>
                    <Link to={this.state.subDir + menuitem.path} >{menuitem.menuOptionTitle}</Link>
                </NavItem>
            );
        }
        else
        {
            return (
                <NavDropdown eventKey={menuitem.menuOptionId} 
                    title={menuitem.menuOptionTitle} 
                    id="basic-nav-dropdown" >
                    {menuitem.menuDropdown.map(dd => {
                        return (<MenuItem 
                                    key={dd.ddItemId} 
                                    eventKey={dd.ddItemId}>
                                        <Link to={this.state.subDir + dd.path} >{dd.ddItemTitle}</Link>
                                </MenuItem>)
                    })}
                </NavDropdown>
            );
        }
    }
};

export default MenuItemElement;