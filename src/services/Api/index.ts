import axios from "axios";

export const filterCountriesApi = axios.create({
  baseURL:
    "http://ec2-174-129-177-198.compute-1.amazonaws.com:5000/filter-countries",
  headers: { "Content-Type": "application/json" },
});

export const getCountriesApi = axios.create({
  baseURL:
    "http://ec2-174-129-177-198.compute-1.amazonaws.com:5000/get-countries",
  headers: { "Content-Type": "application/json" },
});
