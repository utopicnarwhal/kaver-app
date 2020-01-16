import ApiClient from "../../../services/api_client";
import gql from "graphql-tag";
import { MainSearchVariables, MainSearch } from "../../../models/generated/MainSearch";

const MAIN_SEARCH_QUERY = gql`
  query MainSearch($searchString: String!) {
    searchSingerByTitleSubstring(substring: $searchString, page: 1) {
      href
      name
      _id
    }
    searchSongByTitleSubstring(substring: $searchString, page: 1) {
      href
      title
      _id
      singer {
        name
        _id
        href
      }
      chordsAndText
    }
  }
`;

export default class MainSearchDataSource {
  public static async mainSearch(searchString: string) {
    const result = await ApiClient.getInstance().query<MainSearch, MainSearchVariables>({
      query: MAIN_SEARCH_QUERY,
      variables: {
        searchString
      },
    });
    return result;
  }
}
