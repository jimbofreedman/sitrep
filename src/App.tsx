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
             backgroundColor: "#000000",
             width: "1160px",
             height: "720px",
             padding: "60px",
         }} >
             <div style={{
                 backgroundColor: "#333333",
             }} >
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <SprintGoals />
                        <Paper><Typography variant="h1">CHARTS</Typography></Paper>
                        <Paper><Typography variant="h1">CHARTS</Typography></Paper>
                        <Paper><Typography variant="h1">CHARTS</Typography></Paper>
                        <Paper><Typography variant="h1">CHARTS</Typography></Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper><Typography variant="h1">APPTS</Typography></Paper>
                        <TodoItemList />
                    </Grid>
                    <Grid item xs={3}>
                        <Weather />
                    </Grid>
                </Grid>
             </div>
         </div>
    );
}

export default observer(App);
