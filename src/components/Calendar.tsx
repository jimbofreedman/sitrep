import React from 'react';
import axios from 'axios';
import useStores from "../hooks/useStores";
import {observer} from "mobx-react";
import {Grid, Typography, Paper} from '@material-ui/core';
import ReactMarkdown from 'react-markdown';
import TodoItem from "./TodoItem";
import moment from "moment";
import Loading from "./Loading";
import config from '../config';
import {google} from "googleapis";

function Calendar() {
    const { profileStore } = useStores();

    const [forecast, setForecast] = React.useState();
    const [loading, setLoading] = React.useState();

    React.useEffect(() => {
        const oauth2Client = new google.auth.OAuth2(
            config.google.clientId,
            config.google.clientSecret,
            config.google.redirectUrl,
        );

        const scopes = [
            'https://www.googleapis.com/auth/calendar'
        ];

        const url = oauth2Client.generateAuthUrl({
            scope: scopes
        });

        if (!forecast && !loading) {
            const lat = -43.479931;
            const lon = -110.762428;
            const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon${lon}=&appid=${config.openWeatherApiToken}`
            axios
                .get(url)
                .then((response) => console.log(response))
                .catch((error) => console.log("Weather error", error))
        }
    });

    if (!forecast) {
        return <Loading />
    }

    return (
        <Paper>
            <Typography>weather</Typography>
        </Paper>
    );
}

export default observer(Calendar);
