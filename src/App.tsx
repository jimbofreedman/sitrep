import React from 'react';
import './App.css';

import {observer} from "mobx-react";
import {Grid, Typography, Paper} from '@material-ui/core';
import TodoItemList from "./components/TodoItemList";
import SprintGoals from "./components/SprintGoals";
import Weather from "./components/Weather";

function App() {
     return (
         <div style={{
             width: "80%",
             height: "80%"
         }} >
            <Grid container>
                <Grid item lg={9}>
                    <SprintGoals />
                    <Paper><Typography variant="h1">CHARTS</Typography></Paper>
                    <Paper><Typography variant="h1">CHARTS</Typography></Paper>
                    <Paper><Typography variant="h1">CHARTS</Typography></Paper>
                    <Paper><Typography variant="h1">CHARTS</Typography></Paper>
                </Grid>
                <Grid item lg={3}>
                    <Weather />
                    <Paper><Typography variant="h1">APPTS</Typography></Paper>
                    <TodoItemList />
                </Grid>
            </Grid>
         </div>
    );
}

export default observer(App);
