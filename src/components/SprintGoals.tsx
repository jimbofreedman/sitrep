import React from 'react';

import useStores from "../hooks/useStores";
import {observer} from "mobx-react";
import {Grid, Typography, Paper, Card, CardContent, CardActions, Avatar} from '@material-ui/core';
import ReactMarkdown from 'react-markdown';
import TodoItem from "./TodoItem";
import moment from "moment";
import Loading from "./Loading";

function SprintGoals() {
    const { profileStore } = useStores();

    React.useEffect(() => {
        if (!profileStore.hasData && !profileStore.loading) {
            profileStore.load();
        }
    });

    if (!profileStore.hasData) {
        return <Loading />
    }

    return (
        <Paper>
            <Card>
                <CardContent>
                    <ReactMarkdown>{profileStore.data.attributes.goals}</ReactMarkdown>
                </CardContent>
            </Card>
        </Paper>
    );
}

export default observer(SprintGoals);
