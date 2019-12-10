import React, { Fragment, useState, useEffect } from "react";
import "./Home-page.css";
import { Card, CardContent, Typography } from "@material-ui/core";
import { HalfPageWave } from "../components/decor/Half-page-wave";
import Search from "../components/search/Search";
import AddKaverFAB from "../components/add_kaver_fab/Add-kaver-fab";
import AppHeader from "../components/app-header/App-header";

export default function HomePage() {
  const [state, setState] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setState(state + 0.2);
    }, 20);
    return () => {
      clearTimeout(timer);
    };
  });

  return (
    <Fragment>
      <AppHeader></AppHeader>
      <div id="main">
        <HalfPageWave amplitude={3} waveCount={10} offsetX={-state % 10}></HalfPageWave>

        <div className="Favorites-block">
          <h1>Понравившееся:</h1>
        </div>
        <div className="Center-block">
          <Search></Search>
        </div>
        <div className="My-kavers-block">
          <h1>Мои каверы:</h1>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Александра Негрескул
                  </Typography>
            </CardContent>
          </Card>
        </div>
        <AddKaverFAB></AddKaverFAB>
      </div>
    </Fragment>
  );
}
