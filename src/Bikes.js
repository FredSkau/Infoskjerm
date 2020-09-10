import React, { useEffect, useState } from "react";
import createEnturService from "@entur/sdk";

const service = createEnturService({
    clientName: "skaug-infoskjerm",
});

const Bikes = () => {
    const [bikeStations, setBikeStations] = useState([]);

    useEffect(() => {
        service.getBikeRentalStationsByPosition(
            {
                latitude: 63.409351,
                longitude: 10.431701,
            },
            300
        )
        .then((data) => setBikeStations(data));
    }, []);

    return (
        <div className="BikeStations">
            {
                bikeStations.map((station) => (
                    <Station key={station.id} station={station} />
                ))
            }
        </div>
    );
};

export default Bikes;

const Station = (props) => {
    const{name, bikesAvailable, spacesAvailable} = props.station;
    return <div className="station">
        {name} - {bikesAvailable} : {spacesAvailable}
    </div>
};