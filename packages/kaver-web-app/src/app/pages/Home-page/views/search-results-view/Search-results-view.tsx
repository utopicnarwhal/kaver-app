import React from "react";
import { MainSearch } from "../../../../models/generated/MainSearch";
import { Card, CardContent, Typography } from "@material-ui/core";
import { IAppState } from "../../../../redux/store";
import { connect } from "react-redux";

interface IProps {
    searchResults?: MainSearch;
    isSongsFetching: boolean;
    isSingerFetching: boolean;
}

function SearchResultsView(props: IProps) {
    return (
        <>
            <div>
                Найденные авторы
                {props.searchResults?.searchSingerByTitleSubstring?.map((value) => {
                    return <Card variant="outlined">
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                {value.name}
                            </Typography>
                        </CardContent>
                    </Card>;
                })}
            </div>
            <div>
                Найденные песни
                {props.searchResults?.searchSongByTitleSubstring?.map((value) => {
                    return <Card variant="outlined">
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                {value.title}
                            </Typography>
                        </CardContent>
                    </Card>;
                })}
            </div>
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
