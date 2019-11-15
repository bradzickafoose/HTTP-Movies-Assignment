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

    const changeHandler = e => {
        e.persist();
        let value = e.target.value;
        if (e.target.name === 'metascore') {
            value = parseInt(value, 10);
        }
        setMovie({
            ...movie,
            [e.target.name]: value
        })
    }

    useEffect(() => {
        if (props.movies.length > 0) {
            const newMovie = props.movies.find(
                thing => `${thing.id}` === props.match.params
            )
            setMovie(newMovie)
        }
    }, [props.movies, props.match.params.id]);

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:3333/movies/${movie.id}`, movie)
            .then(response => {
                props.updateMovies(response.data)
            })
            .catch(err => console.log(err))
    }

    if (props.movies.length === 0) {
        return <h2>Loading data...</h2>
    }

    return (
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='Movie Title'
                    onChange={changeHandler}
                    placeholder='title'
                    value={movie.title}
                />
                <input
                    type='text'
                    name='Director'
                    onChange={changeHandler}
                    placeholder='director'
                    value={movie.director}
                />
                <input
                    type='number'
                    name='Metascore'
                    onChange={changeHandler}
                    placeholder='Metascore'
                    value={movie.metascore}
                />

                <button>Update</button>
            </form>
        </div>
    )
}

export default UpdateMovie