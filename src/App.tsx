import React from 'react';
import logo from './logo.svg';
import './App.css';

import createBrowserHistory from 'history/createBrowserHistory';
import { syncHistoryWithStore } from 'mobx-react-router';
import useStores from "./hooks/useStores";
import LoginScreen from "./screens/LoginScreen";
import {observer} from "mobx-react";
import HomeScreen from "./screens/HomeScreen";
import {Grid, Typography, Paper} from '@material-ui/core';

function App() {
    // const { routingStore, authStore } = useStores();
    // const browserHistory = createBrowserHistory();
    // const history = syncHistoryWithStore(browserHistory, routingStore);

    return (
        <Grid container>
            <Grid item lg={9}>
                <Paper><Typography variant="h1">HEADLINE GOALS</Typography></Paper>
                <Paper><Typography variant="h1">CHARTS</Typography></Paper>
                <Paper><Typography variant="h1">CHARTS</Typography></Paper>
                <Paper><Typography variant="h1">CHARTS</Typography></Paper>
                <Paper><Typography variant="h1">CHARTS</Typography></Paper>
            </Grid>
            <Grid item lg={3}>
                <Paper><Typography variant="h1">WEATHER</Typography></Paper>
                <Paper><Typography variant="h1">APPTS</Typography></Paper>
                <Paper>
                    <Typography variant="h1">TASKS</Typography>
                    {/*{processedItemList*/}
                    {/*    .map((item: { id: number; }) => (*/}
                    {/*        <TodoItem key={item.id} item={item} />*/}
                    {/*    ))}*/}
                </Paper>
            </Grid>
        </Grid>
    );
}

export default observer(App);
