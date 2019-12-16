import React, { Fragment, useState } from "react";
import "./Home-page.css";
import { Card, CardContent, Typography } from "@material-ui/core";
import Search from "../components/search/Search";
import AddKaverFAB from "../components/add_kaver_fab/Add-kaver-fab";
import AppHeader from "../components/app-header/App-header";
import HalfPageWave from "../components/decor/Half-page-wave";

export default function HomePage() {
  const [pageViewNum, setPageViewNum] = useState(0);

  const handleSearchTextChange = (searchText: string) => {
    if (searchText.length > 0 && pageViewNum !== 1) {
      setPageViewNum(1);
    } else if (searchText.length === 0 && pageViewNum !== 0) {
      setPageViewNum(0);
    }
  };

  return (
    <Fragment>
      <AppHeader></AppHeader>
      <div id="main">
        <HalfPageWave amplitude={3} waveCount={10} pageViewNum={pageViewNum}></HalfPageWave>

        <div className="Favorites-block">
          <h1>Понравившееся:</h1>
        </div>
        <div className="Center-block">
          <Search onSearchTextChange={handleSearchTextChange}></Search>
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
