import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
 

    render() {
        return (
            <header>
                <Navbar className="navbar" container light>
                    <NavbarBrand className="navbar-brand" tag={Link} to="/">
                        Men&uuml;
                    </NavbarBrand>

                    <ul>
                    </ul>
                </Navbar>
            </header>
        );
    }
}



