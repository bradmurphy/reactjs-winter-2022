import React, { useContext } from 'react';
import { Context } from '../store/store';
import Carousel from '../components/Carousel';

export default function Home() {
    const [ state, dispatch ] = useContext(Context);

    return (
        <div className="wrap">
            <h1>Home</h1>
            <Carousel slides={state.slides} />
        </div>
    )
};