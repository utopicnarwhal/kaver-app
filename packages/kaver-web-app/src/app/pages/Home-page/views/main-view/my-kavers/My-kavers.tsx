import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./My-kavers.css";
import { HalfPageBlock } from "../../../../../components/half-page-block/Half-page-block";

export default () => {
    return (
        <HalfPageBlock title={"Мои каверы"} child={<Card variant="outlined">
            <CardContent>
                <Typography color="textSecondary" gutterBottom>
                    Александра Негрескул
                </Typography>
            </CardContent>
        </Card>}></HalfPageBlock>
    );
};
