import axios from 'axios';
import cookie from 'react-cookies';

export const publicAPI = {
    items: (param) => `api/items/${param}`,
};