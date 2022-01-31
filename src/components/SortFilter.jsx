import React, { useState, useEffect } from 'react'
import MovieCard from './MovieCard';
import { useParams } from 'react-router-dom';
import API_KEY from '../data/api';

function SortFilter() {

    const params = useParams();
    const [data, setData] = useState([]);
    const [sort, setSort] = useState();
    const [search, setSearch] = useState(false);
    const [genreList, setGenreList] = useState([])
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [changeUrl, setChangeUrl] = useState("");
    const [dataSize, setDataSize] = useState(3);
    useEffect(() => {
        setTimeout(() => {
            const url = `https://api.themoviedb.org/3/movie/${params.category}?api_key=${API_KEY}`
            fetch(url.concat(changeUrl))
                .then((response) => response.json())
                .then((json) => {
                    setData(json.results);
                });
        }, 500);
    }, [params, changeUrl]);

    function genreButton(event) {
        if (event.target.checked == true) {
            genreList.push(event.target.id)
        } else {
            const index = genreList.indexOf(event.target.id);
            if (index > -1) {
                genreList.splice(index, 1);
            }
        }
    }

    useEffect(() => {
        setChangeUrl("")

        if (sort) {
            setChangeUrl(changeUrl.concat("&", sort))
        }
        if (startDate) {
            setChangeUrl(changeUrl.concat("&", startDate))
        }
        if (endDate) {
            setChangeUrl(changeUrl.concat("&", endDate))
        }
        if (genreList.length > 0) {
            genreList.map(item => (
                setChangeUrl(changeUrl.concat("&", item))
            ))
        }
        setSearch(false)
        setDataSize(3)
    }, [search])

    function showData(){
        if(data.length > dataSize) {
            setDataSize(dataSize + 3);
        }
    }

    return (
        <>
            <div className="container">
                <div className="container my-5">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="mb-3">
                                <h5>Sort By</h5>
                                <select className="form-select mt-3" aria-label="Default select example" onChange={(e) => setSort(e.target.value)}>
                                    <option value="" selected>Open this select menu</option>
                                    <option value="title.asc">Movie Title A to Z</option>
                                    <option value="title.desc">Movie Title Z to A</option>
                                    <option value="popularity.asc">Increasing in Popularity</option>
                                    <option value="popularity.desc">Descending in Popularity</option>
                                    <option value="primary_release_date.asc">Increasing by Release Date</option>
                                    <option value="primary_release_date.desc">Descending by Release Date</option>
                                </select>
                            </div>


                            <div className="mt-5 mb-3">
                                <h5>Filter By</h5>
                                <ul class="list-group list-group-horizontal">
                                    <li class="list-group-item border-0">From:</li>
                                    <li class="list-group-item border-0"><input type="date" id="start_date"
                                        onChange={(e) => setStartDate(`release_date.gte=${e.target.value}`)} /></li>
                                </ul>
                                <ul class="list-group list-group-horizontal">
                                    <li class="list-group-item border-0">To:</li>
                                    <li class="list-group-item border-0 ms-4"><input type="date" id="end_date"
                                        onChange={(e) => setEndDate(`release_date.lte=${e.target.value}`)} /></li>
                                </ul>
                            </div>

                            <div className="mt-5 mb-3">
                                <input type="checkbox" class="btn-check" onClick={genreButton} id="with_genres=28" autocomplete="off" />
                                <label class="btn btn-outline-dark me-3" for="with_genres=28">Action</label>
                                <input type="checkbox" class="btn-check" onClick={genreButton} id="with_genres=12" autocomplete="off" />
                                <label class="btn btn-outline-dark me-3" for="with_genres=12">Adventure</label>
                                <input type="checkbox" class="btn-check" onClick={genreButton} id="with_genres=35" autocomplete="off" />
                                <label class="btn btn-outline-dark me-3" for="with_genres=35">Comedy</label>
                                <input type="checkbox" class="btn-check" onClick={genreButton} id="with_genres=10749" autocomplete="off" />
                                <label class="btn btn-outline-dark me-3 mt-3" for="with_genres=10749">Romance</label>
                                <input type="checkbox" class="btn-check" onClick={genreButton} id="with_genres=18" autocomplete="off" />
                                <label class="btn btn-outline-dark me-3 mt-3" for="with_genres=18">Drama</label>
                                <input type="checkbox" class="btn-check" onClick={genreButton} id="with_genres=80" autocomplete="off" />
                                <label class="btn btn-outline-dark me-3 mt-3" for="with_genres=80">Crime</label>
                            </div>
                            <div class="d-grid gap-2">
                                <button type="button" class="btn btn-dark btn mt-3 text-center" onClick={() => setSearch(true)}>Search</button>
                            </div>
                        </div>

                        <div className="col-md-8 text-center">
                            <div className="row text-center">
                                {
                                    data.slice(0, dataSize).map((item, index) =>
                                    (
                                        <div className="col-md-4">
                                            <MovieCard genre={item.genre_ids[0]} id={item.id} title={item.title ? item.title : item.original_name} release_date={item.release_date ? item.release_date : item.first_air_date} poster_path={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} />
                                        </div>
                                    ))
                                }
                            </div >
                            <button className='btn btn-dark ms-5' onClick={showData}>Load More</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SortFilter;
