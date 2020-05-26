import React from 'react';

import useStores from "../hooks/useStores";
import {observer} from "mobx-react";
import {Grid, Typography, Paper} from '@material-ui/core';
import ReactMarkdown from 'react-markdown';
import TodoItem from "./TodoItem";
import moment from "moment";
import Loading from "./Loading";

function TodoItemList() {
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
            <ReactMarkdown>{profileStore.data.attributes.goals}</ReactMarkdown>
        </Paper>
    );
}

export default observer(TodoItemList);
