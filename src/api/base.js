import axios from 'axios';

export function test() {
    return axios({
        url: '/znsp/queds',
        method: 'post',
        // baseURL: 'http://api.yunnancredit.com',
        withCredentials: true
    });
}