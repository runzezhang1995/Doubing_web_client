import React from 'react';
import { hot } from 'react-hot-loader';
import $ from 'jquery'; 
import './DemoPage.styl';


import { LinkContainer } from "react-router-bootstrap";

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';


import Detection from './detection';

class App extends React.Component{
    constructor(props, context) {
        super(props, context);
    
        this.render = this.render.bind(this);
    
        this.state = {
            mounted: true,
        }
    }
   

    componentDidMount() {
        // this.serverRequest = $.get('/api/queryImageList', (data, status) => {
        //     this.setState({ mounted: true,
        //         queryImageList: data.list
        //     });
        //     console.log(this.state);
        // }, 'json'); 

    }

    render = () => (
    <div>
        <NavigationBar />
        <Detection/>
    </div>
        
    );
}


// navigation bar, hold icon and school name 
const NavigationBar = () => (
    <Navbar bg="light" variant="light">
        <Navbar.Brand href="">
            <img
                alt=""
                src="/hku_logo.jpg"
                width="30"
                height="30"
                className="d-inline-block align-top"
            />
        {' The University of Hong Kong'}
        </Navbar.Brand>
    </Navbar>
    );





export default hot(module)(App);      