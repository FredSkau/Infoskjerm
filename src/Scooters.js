import React, { useEffect, useState } from "react";
import createEnturService from "@entur/sdk";

const service = createEnturService({
    clientName: "skaug-infoskjerm",
});

const Scooters = () => {
    const [scooters, setScooters] = useState([]);

    useEffect(() => {
        service.getScootersByPosition(
            {
                latitude: 63.409351,
                longitude: 10.431701,
            }
        )
        .then((data) => setScooters(data));
    }, []);

    return (
        <div className="Scooters">
            <h2>Scootere:</h2>
            { 
                scooters.map((station) => (
                    <Station station={station}/>    
                ))
            }
        </div>
    );
};

export default Scooters;

const Station = (props) => {
    const{operator, lat, lon, battery} = props.station;
    return <div className="station">
        {operator} - {lat}, {lon} : {battery}%
    </div>
};