import React, { useEffect, useState } from "react";

const DadJoke = () => {
    const [joke, setJoke] = useState({});

    useEffect(() => {
        console.log("component rendered");
        fetch("https://www.reddit.com/r/dadjokes/top.json?t=day&limit=1")
        .then((response) => response.json())
        .then((json) => setJoke(json.data.children[0].data));
    }, []);

    console.log(joke);

    return (
        <div className="reddit">
            <p>{joke.title}</p>
            <p>{joke.selftext}</p>
        </div>
    );    
};

export default DadJoke;