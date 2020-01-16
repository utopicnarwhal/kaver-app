import React, { useState } from "react";
import "./Home-page.css";
import AddKaverFAB from "../../components/add-kaver-fab/Add-kaver-fab";
import AppHeader from "../../components/app-header/App-header";
import { PageView } from "../../components/page-view/Page-view";
import { Search } from "../../components/search/Search";
import MainView from "./views/main-view/Main-view";
import SearchResultsView from "./views/search-results-view/Search-results-view";
import { connect } from "react-redux";
import { mainSearch } from "../../redux/reducers/main-search/main_search_actions_creators";

interface IProps {
  mainSearch: (searchText: string) => void;
}

function HomePage(props: IProps) {
  const [pageViewNum, setPageViewNum] = useState(0);
  const [searchText, setSearchText] = useState("");

  const handleSearch = (newSearchText: string) => {
    setSearchText(newSearchText);
    props.mainSearch(newSearchText);
    if (newSearchText.length > 0 && pageViewNum !== 1) {
      setPageViewNum(1);
    } else if (newSearchText.length === 0 && pageViewNum !== 0) {
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
    <>
      <AppHeader></AppHeader>
      <div id="main">
        <PageView pageViewNum={pageViewNum} page1={page1} page2={page2}></PageView>
        <div className="Center-block">
          <Search onSearch={handleSearch} searchText={searchText}></Search>
        </div>
        <AddKaverFAB ></AddKaverFAB>
      </div>
    </>
  );
}

// Make functions available on props
const mapDispatchToProps = (dispatch: any) => {
  return {
    mainSearch: (searchText: string) => dispatch(mainSearch(searchText)),
  } as IProps;
};

export default connect(null, mapDispatchToProps)(HomePage);
