import React, { Fragment, useState } from "react";
import "./Home-page.css";
import AddKaverFAB from "../../components/add-kaver-fab/Add-kaver-fab";
import AppHeader from "../../components/app-header/App-header";
import { PageView } from "../../components/page-view/Page-view";
import { Search } from "../../components/search/Search";
import MainView from "./views/main-view/Main-view";
import SearchResultsView from "./views/search-results-view/Search-results-view";

export default function HomePage() {
  const [pageViewNum, setPageViewNum] = useState(0);

  const handleSearchTextChange = (searchText: string) => {
    if (searchText.length > 0 && pageViewNum !== 1) {
      setPageViewNum(1);
    } else if (searchText.length === 0 && pageViewNum !== 0) {
      setPageViewNum(0);
    }
  };

  const page1 = (
    <MainView></MainView>
  );

  const page2 = (
    <SearchResultsView></SearchResultsView>
  );

  return (
    <Fragment>
      <AppHeader></AppHeader>
      <div id="main">
        <PageView pageViewNum={pageViewNum} page1={page1} page2={page2}></PageView>
        <div className="Center-block">
          <Search onSearchTextChange={handleSearchTextChange}></Search>
        </div>
        <AddKaverFAB ></AddKaverFAB>
      </div>
    </Fragment>
  );
}
