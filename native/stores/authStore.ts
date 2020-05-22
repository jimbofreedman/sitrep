import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';
import * as Facebook from "expo-facebook";
import * as Google from 'expo-google-app-auth';

import { observable, action, computed } from 'mobx';
import axios from 'axios';

export default class AuthStore {
    httpClient = null;

    @observable apiToken:string = null;

    @computed get isLoggedIn() {
        return this.apiToken !== null;
    }

    constructor() {
        this.httpClient = axios.create({
            baseURL: `${Constants.manifest.extra.apiUrl}`,
        });

        if (__DEV__) {
          this.httpClient.interceptors.request.use(request => {
            console.log('AuthStore HTTP Request:', request);
            return request;
          });
        }

        SecureStore.getItemAsync('apiToken').then(t => { this.apiToken = t });
        Facebook.initializeAsync(Constants.manifest.extra.facebook.appId).then(() => {});
    }

    @action.bound async checkLoggedIn() {
        return this.httpClient
            .get(`${Constants.manifest.extra.apiUrl}/api/users/me/`, {
                headers: {
                    authorization: `Token ${this.apiToken}`,
                },
            })
            .then(() => {
                console.log('Logged in');
                return true;
            })
            .catch(() => {
                console.log('Not logged in');
                return false;
            });
    }

    @action.bound
    async loginEmailPassword(email, password) {
        return this.httpClient
            .post(`${Constants.manifest.extra.apiUrl}/auth-token/`, { username: email, password: password})
            .then((response) => {
                console.log("Login success");
                this.apiToken = response.data.token;
                SecureStore.setItemAsync('apiToken', this.apiToken);
                return true;
            })
            .catch((error) => {
                console.log("Login failure", error)
                if (!error.response) {
                    throw new Error("Could not contact login server");
                }
                switch (error.response.status) {
                    case 400:
                        throw new Error('Incorrect e-mail address or password');
                    default:
                        throw new Error('Unknown login error', error);
                }
            });
    }

    @action.bound
    async loginFacebook() {
        try {
            const {
                type,
                token,
                /*        expires,
                permissions,
                declinedPermissions, */
            } = await Facebook.logInWithReadPermissionsAsync({
                permissions: ['public_profile', 'email'],
            });
            if (type === 'success') {
                console.log(Constants.manifest.extra);
                const params = {
                    client_id: Constants.manifest.extra.facebook.clientId,
                    client_secret: Constants.manifest.extra.facebook.clientSecret,
                    grant_type: 'convert_token',
                    backend: 'facebook',
                    token,
                };

                const response = await this.httpClient.post(
                    `${Constants.manifest.extra.apiUrl}/auth/convert-token`,
                    params
                );
                this.apiToken = response.data.data.access_token;
                SecureStore.setItemAsync('apiToken', this.apiToken);
            } else {
                // type === 'cancel'
            }
        } catch (error) {
            console.log(`Facebook Login Error: ${error}`);
        }
    }

    @action.bound
    async loginGoogle() {
        try {
            const config = {
                androidClientId: "837901818162-5566r7va6bpfkk0npfb8c5up1igau07d.apps.googleusercontent.com",
                iosClientId: "837901818162-oqh6u87cg4kjbe8ut6og3asqjb9rupde.apps.googleusercontent.com",
                scopes: ["profile", "email"],
            };
            const {
                type,
                accessToken,
                user
            } = await Google.logInAsync(config);
            if (type === 'success') {
                console.log("success!", accessToken, user)
                this.finishLoginOAuth('google-oauth2', accessToken);
            } else {
                // type === 'cancel'
                console.log("cancelled");
            }
        } catch (error) {
            console.log(`Google Login Error: ${error}`);
        }
    }

    @action.bound async finishLoginOAuth(backend, token) {
        const params = {
            client_id: Constants.manifest.extra[backend].clientId,
            client_secret: Constants.manifest.extra[backend].clientSecret,
            grant_type: 'convert_token',
            backend,
            token,
        };

        const response = await this.httpClient.post(
            `${Constants.manifest.extra.apiUrl}/auth/convert-token`,
            params
        );
        this.apiToken = response.data.access_token;
        SecureStore.setItemAsync('apiToken', this.apiToken);
    }

    @action.bound async logout() {
        await SecureStore.deleteItemAsync('apiToken');
        this.apiToken = null;
    }
}