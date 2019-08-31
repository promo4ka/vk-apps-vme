import 'core-js/features/map';
import 'core-js/features/set';
import React from 'react';
import ReactDOM from 'react-dom';
import connect from '@vkontakte/vkui-connect';
import App from './App';

// Init VK  Mini App
connect.send('VKWebAppInit', {});
ReactDOM.render(<App />, document.getElementById('root'));