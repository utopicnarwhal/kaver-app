import ApiClient from "../../../services/api_client";
import gql from "graphql-tag";

const MAIN_SEARCH_QUERY = gql`
  query MainSearch($searchString: String!, $page: Number!){
    login(searchString: $searchString, page: $page) {
      firstname
      lastname
    }
  }
`;

export default class MainSearchDataSource {
  public static async login(searchString: string, page: string) {
    const result = await ApiClient.getInstance().query({
      query: MAIN_SEARCH_QUERY,
      variables: {
        searchString,
        page
      },
    });
    return result;
  }
}
