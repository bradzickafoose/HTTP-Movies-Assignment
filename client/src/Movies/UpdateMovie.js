import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialMovie = {
    id: '',
    title: '',
    director: '',
    metascore: 0,
    stars: []
};

const UpdateMovie = props => {
    const [movie, setMovie] = useState(initialMovie);

    const handleChanges = event => {
        setMovie({
            ...movie,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${props.match.params.id}`, movie)
            .then(() => props.history.push('/'))
            .catch(error => console.error(error));
    }

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
            .then(response => setMovie(response.data))
            .catch(error => console.error(error.response));
    }, []);

    // if (props.movies.length === 0) {
    //     return <h2>Loading data...</h2>
    // }

    return (
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='Movie Title'>Movie Title</label>
                    <input
                        type='text'
                        name='title'
                        onChange={handleChanges}
                        value={movie.title}
                    />
                </div>
                <div>
                    <label htmlFor='Director'>Director</label>
                    <input
                        type='text'
                        name='director'
                        onChange={handleChanges}
                        value={movie.director}
                    />
                </div>
                <div>
                    <label htmlFor='Metascore'>Metascore</label>
                    <input
                        type='number'
                        name='metascore'
                        onChange={handleChanges}
                        value={movie.metascore}
                    />
                </div>

                <button type='submit'>Update</button>
            </form>
        </div>
    )
}

export default UpdateMovie