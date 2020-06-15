import { get, post } from './tools';
import * as config from './config';

export const fetchMenu = () => get({ url: config.MOCK_MENU });