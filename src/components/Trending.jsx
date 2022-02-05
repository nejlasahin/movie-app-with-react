import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import API_KEY from '../data/api';
import { useSelector } from "react-redux";

function Trending() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [today, setToday] = useState(true);
    const [lastWeek, setLastWeek] = useState(false);
    const theme = useSelector((state) => state.theme);

    const [url, setUrl] = useState(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`)

    useEffect(() => {
        setTimeout(() => {
            fetch(url)
                .then((response) => response.json())
                .then((json) => {
                    setData(json.results);
                    setLoading(false);
                });
        }, 500);
    }, [url]);


    function todayTrending() {
        setToday(true)
        setLastWeek(false)
    }

    function lastWeekTrending() {
        setToday(false)
        setLastWeek(true)
    }
    useEffect(() => {
        if (today) {
            setUrl(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`)
        } else {
            setUrl(`https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`)
        }
    }, [lastWeek, today]);

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
            <h1 className={`text-center ${theme ? "text-white" : "text-dark"} `}>Trending</h1>
            <div className="container movie-card-group mt-5 pb-20">
                <button onClick={todayTrending} type="button" className={`${today ? theme ? "btn-light" : "btn-dark" : theme ? "btn-outline-light" : "btn-outline-dark"} btn ms-2`}>Today</button>
                <button onClick={lastWeekTrending} type="button" className={`${lastWeek ? theme ? "btn-light" : "btn-dark" : theme ? "btn-outline-light" : "btn-outline-dark"} btn ms-2`}>Last Week</button>
                <div className="row text-center mt-5" id="scrollbar">
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

export default Trending