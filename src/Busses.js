import React, { useState, useEffect } from "react";
import EnturService from "@entur/sdk";
import { DateTime } from "luxon";

const service = new EnturService({ clientName: "skaug-infoskjerm" });

const Busses = (props) => {
  const [departures, setDepartures] = useState([]);
  const [departuresFromCenter, setDeparturesFromCenter] = useState([]);
  const [departuresToCenter, setDeparturesToCenter] = useState([]);
  const { refresh } = props;

  const id = "NSR:StopPlace:42743";

  const fromCenter = "NSR:Quay:73261";
  const toCenter = "NSR:Quay:73260";

  const size = 6;

  useEffect(() => {
    service.getDeparturesFromStopPlace(id).then((data) => setDepartures(data));
  }, [refresh]);

  useEffect(() => {
    setDeparturesFromCenter(departures.filter((d) => d.quay.id === fromCenter));
    setDeparturesToCenter(departures.filter((d) => d.quay.id === toCenter));
  }, [departures]);

  return (
    <div className="busses">
        <h2>Buss:</h2>
      <div className="from">
        <h3>Fra Sentrum</h3>
        {departuresFromCenter.slice(0, size).map((departure) => (
          <Departure key={departure.serviceJourney.id} departure={departure} />
        ))}
      </div>
      <div className="towards">
        <h3>Mot Sentrum</h3>
        {departuresToCenter.slice(0, size).map((departure) => (
          <Departure key={departure.serviceJourney.id} departure={departure} />
        ))}
      </div>
    </div>
  );
};

const Departure = (props) => {
  const { departure } = props;
  const { expectedDepartureTime, destinationDisplay, serviceJourney } = departure;
  const departureTime = DateTime.fromISO(expectedDepartureTime);
  const timeTilDeparture = calculateTimeTilDeparture(departureTime);
  return (
    <div className="departure">
      {serviceJourney.journeyPattern.line.publicCode} - {destinationDisplay.frontText} : {timeTilDeparture}
    </div>
  );
};

const calculateTimeTilDeparture = (departureTime) => {
  const now = DateTime.local();
  const diff = departureTime.diff(now, "minutes");
  const minuteFloat = diff.toObject().minutes;
  const flooredMinute = Math.floor(minuteFloat);
  const semanticTimeToDeparture =
    flooredMinute === 0 ? "Nå" : flooredMinute + " min";
  return semanticTimeToDeparture;
};

export default Busses;