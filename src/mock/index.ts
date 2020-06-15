
import Menu from './menu';
import * as config from '../axios/config';
const Mock = require('mockjs');
Mock.mock(config.MOCK_MENU, 'get', () => {
    return Menu.data;
});