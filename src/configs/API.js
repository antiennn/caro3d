import axios from 'axios';

export const endpoint = {
    'auth':(access_token)=>`/api/users/auth/?access_token=${access_token}`,
    'find_match':(access_token)=>`/api/match/temp_room/?access_token=${access_token}`
};

export const userApi = () =>
    axios.create({
      baseURL: "http://127.0.0.1:8000",
    });

export const matchApi = () =>
    axios.create({
        baseURL: "http://127.0.0.1:8001",
    });