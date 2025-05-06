import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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

function MapDetails() {
  const { id } = useParams();
  const [mapData, setMapData] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const fetchMapAndMarkers = async () => {
      try {
        const mapRes = await axiosInstance.get(`/maps/${id}/`);
        setMapData(mapRes.data);

        const markerRes = await axiosInstance.get('/markers/');
        const filteredMarkers = markerRes.data.filter(marker => marker.map === parseInt(id));
        setMarkers(filteredMarkers);
      } catch (err) {
        setError('❌ Failed to load map or markers');
      } finally {
        setLoading(false);
      }
    };

    fetchMapAndMarkers();
  }, [id]);

  if (loading) return <p>⏳ Loading map details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="map-wrapper">
      <h2 style={{ textAlign: 'center' }}>🗺️ {mapData.name}</h2>
      <p style={{ textAlign: 'center', marginBottom: '20px' }}>{mapData.description}</p>

      <MapContainer
        center={[24.774265, 46.738586]} // Riyadh
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: '80vh', borderRadius: '12px' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {markers.map(marker => (
          <Marker
            key={marker.id}
            position={[marker.latitude, marker.longitude]}
            icon={customIcon}
          >
            <Popup>
              <strong>📍 {marker.title}</strong><br />
              📝 {marker.description}
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <div style={{ marginTop: '30px' }}>
        <h3 style={{ textAlign: 'center' }}>➕ Add New Marker</h3>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              const markerData = {
                title: e.target.title.value,
                description: e.target.description.value,
                latitude: parseFloat(e.target.latitude.value),
                longitude: parseFloat(e.target.longitude.value),
                map: parseInt(id),
              };

              await axiosInstance.post('/markers/', markerData);
              alert('✅ Marker added successfully!');

              
              const res = await axiosInstance.get('/markers/');
              const filtered = res.data.filter(marker => marker.map === parseInt(id));
              setMarkers(filtered);

              e.target.reset();
            } catch (err) {
              console.error('Error adding marker:', err);
              alert('❌ Failed to add marker.');
            }
          }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            maxWidth: '400px',
            margin: '30px auto',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '12px',
            background: '#f9f9f9',
          }}
        >
          <input type="text" name="title" placeholder="📍 Marker Title" required />
          <textarea name="description" placeholder="📝 Description" required />
          <input type="number" step="any" name="latitude" placeholder="📌 Latitude" required />
          <input type="number" step="any" name="longitude" placeholder="📌 Longitude" required />
          <button
            type="submit"
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              padding: '10px',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            ➕ Add Marker
          </button>
        </form>
      </div>
    </div>
  );
}

export default MapDetails;
