import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import API_KEY from '../data/api';
import { useSelector } from "react-redux";

function Discover() {

    const theme = useSelector((state) => state.theme);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            const URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
            fetch(URL)
                .then((response) => response.json())
                .then((json) => {
                    setData(json.results);
                    setLoading(false);
                });
        }, 500);
    }, []);

    if (loading) {
        return (
            <div className="d-flex justify-content-center mt-5">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <>
            <h1 className={`text-center ${theme ? "text-white" : "text-dark"} `}>Discover</h1>
            <div className="container movie-card-group my-5">
                <div className="row text-center" id="scrollbar">
                    {
                        data.map((item) => (
                            <div className="col-md-3">
                                <MovieCard genre={item.genre_ids[0]} id={item.id} title={item.title ? item.title : item.original_name} release_date={item.release_date ? item.release_date : item.first_air_date} poster_path={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
}

export default Discover