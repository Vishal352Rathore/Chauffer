import React, { useState } from 'react';

const GoogleMap = () => {

  const address = localStorage.getItem() ;
  const API_KEY = 'AIzaSyCZ0UycRv9Fy9PMDBY-uoU_SkXZGnmjP18' 
  const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null });

  // Function to get latitude and longitude based on address
  const getAddressCoordinates = async (address) => {
    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        setCoordinates({ latitude: lat, longitude: lng });
      } else {
        console.error('No coordinates found for the address');
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error);
    }
  };

  // Call getAddressCoordinates function with an address
  // For example:
  getAddressCoordinates('1600 Amphitheatre Parkway, Mountain View, CA');

  return (
    <div>
      <h2>Latitude: {coordinates.latitude}</h2>
      <h2>Longitude: {coordinates.longitude}</h2>
    </div>
  );
};

export default GoogleMap;
