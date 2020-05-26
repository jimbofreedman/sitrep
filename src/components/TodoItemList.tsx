import React from 'react';

import useStores from "../hooks/useStores";
import {observer} from "mobx-react";
import {Grid, Typography, Paper} from '@material-ui/core';
import TodoItem from "./TodoItem";
import moment from "moment";

function TodoItemList() {
    const { todoItemStore } = useStores();

    const refresh = () => {
        console.log("Refreshing")
        todoItemStore.loadAll()
    }

    const filter = (item: { attributes: { title: any; deleted: any; status: string; start: number; snoozeUntil: number }; }) => {
        return (
            !item.attributes.deleted &&
            item.attributes.status === 'open' &&
            (!item.attributes.start || moment(item.attributes.start) < moment()) &&
            (!item.attributes.snoozeUntil || moment(item.attributes.snoozeUntil) < moment())
        );
    };

    const sort = (a: { attributes: { order: number; }; }, b: { attributes: { order: number; }; }) => {
        return a.attributes.order - b.attributes.order;
    };

    const processedItemList = todoItemStore.all().filter(filter).sort(sort);

    React.useEffect(() => {
        if (!todoItemStore.hasData && !todoItemStore.loading) {
            refresh();
        }

        const todoItemRefresh = setInterval(() => {
            refresh();
        }, 5000);

        return function cleanup() {
            clearInterval(todoItemRefresh);
        };
    });

    return (
        <Paper>
            {processedItemList
                .map((item: { id: number; }) => (
                    <TodoItem key={item.id} item={item} />
                ))}
        </Paper>

    );
}

export default observer(TodoItemList);
