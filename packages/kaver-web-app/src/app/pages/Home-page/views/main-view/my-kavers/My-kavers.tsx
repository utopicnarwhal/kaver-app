import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./My-kavers.css";

export default function MyKavers() {
    return (
        <div className="My-kavers-block">
            <h1>Мои каверы:</h1>
            <Card variant="outlined">
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                        Александра Негрескул
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}
