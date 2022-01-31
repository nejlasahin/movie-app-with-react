import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import MovieCard from './MovieCard';
import Pagination from '@mui/material/Pagination';
import Grid from '@mui/material/Grid';
import API_KEY from '../data/api';

function Search() {

    const location = useLocation();
    const navigate = useNavigate();

    const [current, setCurrent] = useState(1);
    const [minIndex, setMinIndex] = useState();
    const [maxIndex, setMaxIndex] = useState();
    const [pageSize, setPageSize] = useState(4);

    const urlParams = new URLSearchParams(location.search);
    const [q, setQ] = useState(urlParams.get('query'));

    function formSubmit(event) {
        event.preventDefault();
        if (!!event.target.q.value.length) {
            setQ(event.target.q.value);
            navigate(`/search?query=${event.target.q.value}`);
        }
        event.target.q.value = '';
    }

    const [data, setData] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            const URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${q}&page=1`;
            fetch(URL)
                .then((response) => response.json())
                .then((json) => {
                    setData(json.results);
                    setMinIndex(0)
                    setMaxIndex(pageSize)
                    setCurrent(1)
                });
        }, 500);
    }, [q]);

    function handlePageChange(event, page) {
        setCurrent(page)
        setMinIndex((page - 1) * pageSize)
        setMaxIndex(page * pageSize)
    };

    return (
        <>
            <div className="container">
                <form onSubmit={formSubmit}>
                    <div className="mt-5 mb-3">
                        <input
                            name="q"
                            type="text"
                            className="form-control"
                            id="search"
                            defaultValue={q}
                        />
                    </div>
                    <button type="submit" className="btn btn-dark">
                        Search
                    </button>
                </form>
                <div className="container my-5">
                    <div className="row row-cols-1 row-cols-md-4 g-4 text-center">
                        {
                            q &&
                            data.map((item, index) => index >= minIndex && index < maxIndex &&
                                (
                                    <div className="col">
                                        <MovieCard genre={item.genre_ids[0]} id={item.id} title={item.title ? item.title : item.original_name} release_date={item.release_date ? item.release_date : item.first_air_date} poster_path={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} />
                                    </div>
                                ))
                        }
                    </div >
                </div >
                <Grid container justifyContent="center">
                    {
                        data.length > 0 ?
                            <Pagination page={current} onChange={handlePageChange} count={data.length / pageSize < 1 ? 1 : (data.length / pageSize)} rowsPerPage={pageSize} />
                            :
                            <h3 className="text-center text-muted my-5">Movie not found.</h3>
                    }
                </Grid>
            </div>
        </>
    );
}

export default Search;
