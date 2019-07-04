import React from 'react';
import { render } from 'react-dom';
import $ from './common';

import App from '../react/components/DemoPage/DemoPage';


$(() => {
    render(
        <App/>,
        document.getElementById('app-root'),
    );
});
