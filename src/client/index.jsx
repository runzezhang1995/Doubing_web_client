import React from 'react';
import { render } from 'react-dom';

import App from '../react/components/HomePage/HomePage';
$(() => {
    render(
        <App/>,
        document.getElementById('app-root'),
    );
});
