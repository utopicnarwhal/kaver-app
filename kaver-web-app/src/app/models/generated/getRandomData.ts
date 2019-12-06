/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getRandomData
// ====================================================

export interface getRandomData_getRandomSingers {
  __typename: "Singer";
  name: string;
}

export interface getRandomData_getRandomSongs {
  __typename: "Song";
  title: string;
}

export interface getRandomData {
  getRandomSingers: getRandomData_getRandomSingers[] | null;
  getRandomSongs: getRandomData_getRandomSongs[] | null;
}
