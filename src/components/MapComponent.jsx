import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axiosInstance from '../services/axiosInstance';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';


const customIcon = new Icon({
  iconUrl: '/icons/map-marker.svg',
  iconSize: [32, 45],
  iconAnchor: [16, 45],
  popupAnchor: [0, -45],
});

const MapComponent = () => {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const response = await axiosInstance.get('/markers/');
        setMarkers(response.data);
      } catch (error) {
        console.error('Error fetching markers:', error);
      }
    };

    fetchMarkers();
  }, []);

  return (
    <div style={{ height: '100vh' }}>
      <MapContainer center={[24.7136, 46.6753]} zoom={12} style={{ height: '100%', borderRadius: '12px' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        
        {markers.map(marker => (
          <Marker key={marker.id} position={[marker.latitude, marker.longitude]} icon={customIcon}>
            <Popup>
              📌 <strong>{marker.title}</strong><br />
              📝 {marker.description}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
