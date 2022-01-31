import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API_KEY from '../data/api';

function MovieDetail({ id }) {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const params = useParams();

    useEffect(() => {
        setTimeout(() => {
            const URL = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
            fetch(URL)
                .then((response) => response.json())
                .then((json) => {
                    setData(json);
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
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-3">
                        <img src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`} width="300px" className="img-fluid" alt="..." />
                    </div>
                    <div className="col-md-6">
                        <p>{data.original_title}</p>
                        {data.genres.map(e => (
                            <p className="badge bg-dark p-2 me-2">{e.name}</p>
                        ))}
                        <p>{data.release_date}</p>
                        <p>{data.overview}</p>
                        <p></p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MovieDetail;
