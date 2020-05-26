import React from 'react';
import './App.css';

import {observer} from "mobx-react";
import {Grid, Typography, Paper} from '@material-ui/core';
import TodoItemList from "./components/TodoItemList";

function App() {
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
                <TodoItemList />
            </Grid>
        </Grid>
    );
}

export default observer(App);
