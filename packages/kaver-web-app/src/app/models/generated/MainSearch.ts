/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MainSearch
// ====================================================

export interface MainSearch_searchSingerByTitleSubstring {
  __typename: "Singer";
  href: string;
  name: string;
  _id: KaverObjectId;
}

export interface MainSearch_searchSongByTitleSubstring_singer {
  __typename: "Singer";
  name: string;
  _id: KaverObjectId;
  href: string;
}

export interface MainSearch_searchSongByTitleSubstring {
  __typename: "Song";
  href: string;
  title: string;
  _id: KaverObjectId;
  singer: MainSearch_searchSongByTitleSubstring_singer;
  chordsAndText: string;
}

export interface MainSearch {
  searchSingerByTitleSubstring: MainSearch_searchSingerByTitleSubstring[] | null;
  searchSongByTitleSubstring: MainSearch_searchSongByTitleSubstring[] | null;
}

export interface MainSearchVariables {
  searchString: string;
}
