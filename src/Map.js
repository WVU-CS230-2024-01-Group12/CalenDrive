import { Marker, MapContainer, TileLayer, useMap } from "react-leaflet";
import React from "react";
import "leaflet/dist/leaflet.css";

function Map({ height, width, longitude, latitude }) {
  function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }

  return (
    <MapContainer
      center={{ longitude, latitude }}
      zoom={13}
      style={{ height, width }}
    >
      <ChangeView center={{ longitude, latitude }} zoom={13} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      />
      <Marker position={{ longitude, latitude }}></Marker>
    </MapContainer>
  );
}

export default Map;
