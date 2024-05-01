import { Marker, MapContainer, TileLayer, useMap } from "react-leaflet";
import React from "react";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";

function Map({ height, width, lat, lon }) {
  /**
   * Handles changing the view of the map by the user by scrolling or zooming
   * @param {view} view view to update the map display to
   */
  function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }

  // If lat/lon don't exist, set both to zero
  // This fixes a runtime error where the map display for no event is attempted to be displayed
  // Previously caused invalid LatLon reference
  if (isNaN(lat) || isNaN(lon)) {
    lat = 0;
    lon = 0;
  }

  return (
    <div>
      <MapContainer center={[lat, lon]} zoom={16} style={{ height, width }}>
        <ChangeView center={[lat, lon]} zoom={16} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        />
        <Marker
          position={[lat, lon]}
          icon={
            new Icon({
              iconUrl: markerIconPng,
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            })
          }
        ></Marker>
      </MapContainer>
    </div>
  );
}

export default Map;
