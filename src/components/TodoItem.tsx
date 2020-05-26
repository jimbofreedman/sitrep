import * as React from 'react';

import moment, {Moment} from 'moment';
import {
    Button,
    Card,
    CardContent,
    Typography,
    Badge,
    CardHeader,
    IconButton,
    Avatar,
    useTheme,
    CardMedia, CardActions, MenuItem, Menu
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        flex: '1 0 auto',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    playIcon: {
        height: 38,
        width: 38,
    },
}));

// @ts-ignore
function TodoItem({ item }) {
    const classes = useStyles();
    const theme = useTheme();

    const due = item.attributes.due ? moment(item.attributes.due) : null;
    const overdue = due && due < moment();

    console.log('Rendering', item.attributes.title);

    return (
        <Card className={classes.root}>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h6" variant="h6">
                        {item.attributes.title}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                        {due ? `Due ${!overdue ? "in " : ""}${due.fromNow()}` : null}
                    </Typography>
                </CardContent>
            </div>
            <CardActions>
                {item.attributes.streak ?
                    <Avatar aria-label="streak">
                        {item.attributes.streak}
                    </Avatar> : null}
            </CardActions>
        </Card>
    );
}

export default observer(TodoItem);
