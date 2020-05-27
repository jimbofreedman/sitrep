import React from 'react';
import axios from 'axios';
import useStores from "../hooks/useStores";
import {observer} from "mobx-react";
import {
    Grid,
    Typography,
    Paper,
    Card,
    CardContent,
    Avatar,
    IconButton,
    TableContainer,
    Table,
    TableHead,
    TableRow, TableCell, TableBody
} from '@material-ui/core';
import ReactMarkdown from 'react-markdown';
import TodoItem from "./TodoItem";
import moment from "moment";
import Loading from "./Loading";
import config from '../config';
import CardHeader from "@material-ui/core/CardHeader";

function Weather() {
    const { profileStore } = useStores();

    const [forecast, setForecast] = React.useState();
    const [loading, setLoading] = React.useState();

    React.useEffect(() => {
        if (!forecast && !loading) {
            const lat = 43.479931;
            const lon = -110.762428;
            // const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon${lon}=&appid=${config.openWeatherApiToken}`
            const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${config.openWeatherApiToken}`
            axios
                .get(url)
                .then((response) => setForecast(response.data))
                .catch((error) => console.log("Weather error", error))
        }
    });

    if (!forecast) {
        return <Loading />
    }

    const kelvinToCelcius = (kelvin: number) => (kelvin - 273.15).toFixed(0);

    const current = forecast.current;
    console.log("Forecast", forecast);

    const isDaytime = current.sunrise < current.dt < current.sunset;


    return (
        <TableContainer component={Paper}>
            <Table size="small" aria-label="hourly forecast">
                <TableBody>
                    {forecast.hourly.map((f: { dt: number; weather:
                            {
                                main: string,
                                description: string,
                                icon: string
                            }[]; temp: number; feels_like: number; }) => (
                        <TableRow key={f.dt}>
                            <TableCell scope="row">
                                {moment(f.dt*1000).format("HH")}:00
                            </TableCell>
                            <TableCell><Avatar alt={f.weather[0].description} src={`http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`} /></TableCell>
                            <TableCell align="right">{kelvinToCelcius(f.temp)}°</TableCell>
                            <TableCell align="right">{kelvinToCelcius(f.feels_like)}°</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default observer(Weather);
