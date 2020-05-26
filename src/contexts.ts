import React from 'react';
import axios, {AxiosInstance} from 'axios';
import { ResourceStore } from "@reststate/mobx";

import config from './config'

console.log('API:', config.apiUrl);

const createHttpClient = () => {
    const httpClient = axios.create({
        baseURL: `${config.apiUrl}/api/`,
        withCredentials: true,
    });

    httpClient.interceptors.request.use((config) => {
        // @ts-ignore
        const finalChar = config.url[config.url.length - 1];

        if (finalChar === '?') {
            // eslint-disable-next-line no-param-reassign
            // @ts-ignore
            config.url = `${config.url.slice(0, -1)}/`;
        } else if (finalChar !== '/') {
            // eslint-disable-next-line no-param-reassign
            config.url += '/';
        }
        return config;
    });

    httpClient.interceptors.request.use(
        (request) => {
            // eslint-disable-next-line no-param-reassign
            request.headers = {
                ...request.headers,
                'Content-Type': 'application/vnd.api+json',
                Accept: 'application/vnd.api+json',
                Authorization: `Token ${config.apiToken}`,
            };
            return request;
        },
        (error) => Promise.reject(error),
    );

    return httpClient;
}

// @ts-ignore
export default React.createContext({
    todoItemStore: new ResourceStore({name: "todo-items", httpClient: createHttpClient()})
});
