import React from 'react';
import { render } from 'react-dom';
import $ from './common';

import App from '../react/components/DemoPage/DemoPage';


// use react as page template 

$(() => {
    render(
        <App/>,
        document.getElementById('app-root'),
    );
});
