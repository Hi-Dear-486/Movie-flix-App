"use client ";
import axios from "axios";

// this url base key when we will search then it will be provide BASE_URL
// search example api request
const BASE_URL = "https://api.themoviedb.org/3";

const TMDB_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNzI0MzkxZGQ2ZjEzMjIxZDZhMzZkYmQwOGUwYTk5ZCIsInN1YiI6IjY1ZTc0Mjk1NTY4NDYzMDE4NmE4ZmYyNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jIEuSlvLAODr3bGtkU-vWyvuOPQFqwv3g4fgCA4h6pc";

const headers = {
  // dont forget space in 'bearer '
  Authorization: "bearer " + TMDB_TOKEN,
};

// fetch data from api
export const fetchDatafromApi = async (url, params) => {
  try {
    const { data } = await axios.get(BASE_URL + url, {
      headers,
      params,
    });
    return data;
  } catch (error) {
    return error;
  }
};
