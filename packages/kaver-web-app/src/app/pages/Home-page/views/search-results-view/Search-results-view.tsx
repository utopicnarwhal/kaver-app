import React from "react";
import { MainSearch } from "../../../../models/generated/MainSearch";
import { Card, CardContent, Typography } from "@material-ui/core";
import { IAppState } from "../../../../redux/store";
import { connect } from "react-redux";
import { HalfPageBlock } from "../../../../components/half-page-block/Half-page-block";

interface IProps {
    searchResults?: MainSearch;
    isSongsFetching: boolean;
    isSingerFetching: boolean;
}

function SearchResultsView(props: IProps) {
    return (
        <>
            <HalfPageBlock title={"Найденные авторы"} child={props.searchResults?.searchSingerByNameSubstring?.map((value, index) => {
                return <Card variant="outlined" key={value._id ?? index}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                            {value.name}
                        </Typography>
                    </CardContent>
                </Card>;
            })} />
            <HalfPageBlock title={"Найденные песни"} child={props.searchResults?.searchSongByTitleSubstring?.map((value, index) => {
                return <Card variant="outlined" key={value._id ?? index}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                            {value.title}
                        </Typography>
                    </CardContent>
                </Card>;
            })} />
        </>
    );
}

// Make data available on props
const mapStateToProps = (store: IAppState) => {
    return {
        searchResults: store.mainSearchState.searchResults,
        isSongsFetching: store.mainSearchState.isSongsFetching,
        isSingerFetching: store.mainSearchState.isSingersFetching
    } as IProps;
};

export default connect(mapStateToProps)(SearchResultsView);
