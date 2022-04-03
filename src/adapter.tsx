import {getGHToken} from './storage';

const axios = require('axios').default;

export function createAxios() {
    return axios.create({
        baseURL: 'https://api.github.com',
        headers: {
            Authorization: `token ${getGHToken()}`,
            Accept: 'application/vnd.github.v3+json',
        },
    });
}

export function getNotifications(
    before: Date,
    since: Date,
    showAllCards: boolean,
) {
    return createAxios().get('notifications', {
        params: {
            all: true,
            before: before,
            since: since ? since.toISOString() : null,
            per_page: 100,
            participating: !showAllCards,
        },
    });
}
