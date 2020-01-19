/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MainSearch
// ====================================================

export interface MainSearch_searchSingerByNameSubstring {
  __typename: "Singer";
  href: string;
  name: string;
  _id: KaverObjectId | null;
}

export interface MainSearch_searchSongByTitleSubstring_singer {
  __typename: "Singer";
  name: string;
  _id: KaverObjectId | null;
  href: string;
}

export interface MainSearch_searchSongByTitleSubstring {
  __typename: "Song";
  href: string;
  title: string;
  _id: KaverObjectId | null;
  singer: MainSearch_searchSongByTitleSubstring_singer | null;
  chordsAndText: string | null;
}

export interface MainSearch {
  searchSingerByNameSubstring: MainSearch_searchSingerByNameSubstring[] | null;
  searchSongByTitleSubstring: MainSearch_searchSongByTitleSubstring[] | null;
}

export interface MainSearchVariables {
  searchString: string;
}
