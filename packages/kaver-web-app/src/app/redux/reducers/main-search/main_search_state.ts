import { MainSearch } from "../../../models/generated/MainSearch";

export default interface IMainSearchState {
    isSongsFetching: boolean;
    isSingersFetching: boolean;
    searchResults?: MainSearch;
}
