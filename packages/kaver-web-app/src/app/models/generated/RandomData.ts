/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RandomData
// ====================================================

export interface RandomData_getRandomSongs {
  __typename: "Song";
  title: string;
}

export interface RandomData {
  getRandomSongs: RandomData_getRandomSongs[] | null;
}
