import React from 'react';
import { useParams } from 'react-router-dom';
import MovieCredit from './MovieCredit';
import MovieDetail from './MovieDetail';

function Detail() {

    const params = useParams();

    return (
        <>
            <MovieDetail id={params.id} />
            <MovieCredit id={params.id} />
        </>
    );
}

export default Detail;
