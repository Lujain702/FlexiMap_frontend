import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import axiosInstance from '../services/axiosInstance';
import 'leaflet/dist/leaflet.css';
import '../styles/MapPage.css';

const customIcon = new Icon({
  iconUrl: '/icons/map-marker.svg',
  iconSize: [32, 45],
  iconAnchor: [16, 45],
  popupAnchor: [0, -45],
});

const MapPage = () => {
  const [maps, setMaps] = useState([]);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    
    const fetchMaps = async () => {
      try {
        const response = await axiosInstance.get('/maps/');
        setMaps(response.data); 
      } catch (error) {
        console.error('Error fetching maps:', error);
      }
    };

    const fetchMarkers = async () => {
      try {
        const response = await axiosInstance.get('/markers/');
        setMarkers(response.data); 
      } catch (error) {
        console.error('Error fetching markers:', error);
      }
    };

    fetchMaps(); 
    fetchMarkers(); 
  }, []);

  if (maps.length === 0) {
    return <div>Loading maps...</div>;
  }

  return (
    <div className="map-wrapper">
      <h2 style={{ textAlign: 'center' }}>Explore Riyadh</h2>
      <MapContainer center={[24.774265, 46.738586]} zoom={15} scrollWheelZoom={true} style={{ height: '80vh', borderRadius: '12px' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {markers.map(marker => (
          <Marker key={marker.id} position={[marker.latitude, marker.longitude]} icon={customIcon}>
            <Popup>
              📌 <strong>{marker.title}</strong><br />
              📝 {marker.description}
            </Popup>
          </Marker>
        ))}
        <Marker position={[24.774265, 46.738586]} icon={customIcon}>
          <Popup>
            <strong>Saudi Digital Academy 📌</strong><br />
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapPage;