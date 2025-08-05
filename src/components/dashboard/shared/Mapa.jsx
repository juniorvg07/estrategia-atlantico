import { MapContainer, TileLayer, Circle } from "react-leaflet";

export const Mapa = ({ datos }) => {
  return (
    <MapContainer
      center={[10.9685, -74.7813]}
      zoom={10}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {datos.map((punto, idx) => (
        <Circle
          key={idx}
          center={[punto.lat, punto.lng]}
          radius={300} // radio fijo en metros
          pathOptions={{ color: "red", fillColor: "red", fillOpacity: 0.4 }}
        />
      ))}
    </MapContainer>
  );
};
