import { MapContainer, TileLayer, useMap } from "react-leaflet";
import React from "react";
import "leaflet/dist/leaflet.css";

function EventLocationMap({ height, width }) {
  function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height, width }}>
      <ChangeView center={[51.505, -0.09]} zoom={13} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  );
}

export default EventLocationMap;
