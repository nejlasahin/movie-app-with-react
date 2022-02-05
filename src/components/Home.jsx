import React, {useState} from 'react';
import Discover from './Discover';
import Trending from './Trending';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

function Home() {

    const theme = useSelector((state) => state.theme);

    const [q, setQ] = useState("");
    const navigate = useNavigate();

    function formSubmit(event) {
        event.preventDefault();
        if (!!event.target.q.value.length) {
            setQ(event.target.q.value);
            navigate(`/search?query=${event.target.q.value}`);
        }
        event.target.q.value = '';
    }


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
                    <button type="submit" className={`btn ${theme ? "btn-light" : "btn-dark"} `}>
                        Search
                    </button>
                </form>
            </div>
            <Discover />
            <Trending />
        </>
    );
}

export default Home