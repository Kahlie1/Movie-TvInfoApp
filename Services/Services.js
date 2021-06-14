/* servises/services.js */

import axios from 'axios';
import { URL, API_KEY } from '../Config/Const';

export const fetchMovies = async (search) => {
    console.log('fetch movies', search);
    if (!search) {
        const response = await axios.get(`${URL}movie/now_playing?api_key=${API_KEY}`);

        return [...response.data.results];
    } else {
        console.log('in else');
        const response = await axios.get(
            `${URL}search/movie?api_key=${API_KEY}&language=en-US&query=${search}`
        );
        return [...response.data.results];
    }
};

export const fetchMoviesUpcoming = async (search) => {
    console.log('fetch movies Upcoming', search);
    if (!search) {
        const response = await axios.get(`${URL}movie/upcoming?api_key=${API_KEY}`);
        return [...response.data.results];
    } else {
        console.log('in else');
        const response = await axios.get(
            `${URL}search/movie?api_key=${API_KEY}&language=en-US&query=${search}`
        );
        return [...response.data.results];
    }
};

export const movieGenres = async (search) => {
    const response = await axios.get(`${URL}genre/movie/list?api_key=${API_KEY}`);
    return [...response.data.genres];
}; 

export const tvGenres = async (search) => {
    const response = await axios.get(`${URL}genre/tv/list?api_key=${API_KEY}`);
    return [...response.data.genres];
};

export const fetchTrailer = async (id) => {
    const response = await axios.get(`${URL}movie/${id}/videos?api_key=${API_KEY}`);
    return [...response.data.results];
};

export const fetchTrailerTv = async (id) => {
    const response = await axios.get(`${URL}tv/${id}/videos?api_key=${API_KEY}`);
    return [...response.data.results];
};

export const fetchTv = async (search) => {
    console.log('fetch tv shows', search);
    if (!search) {
        const response = await axios.get(`${URL}tv/airing_today?api_key=${API_KEY}`);
        return [...response.data.results];
    } else {
        console.log('in else');
        const response = await axios.get(
            `${URL}search/tv?api_key=${API_KEY}&language=en-US&query=${search}`
        );
        return [...response.data.results];
    }
};