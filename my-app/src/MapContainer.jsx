import React, { useState, useEffect } from "react";

function Map() {
  const [location, setLocation] = useState(null);
  const [score, setScore] = useState(0);
  const [activeMarker, setActiveMarker] = useState(null);
  const [infoWindow, setInfoWindow] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (location) {
      const initMap = () => {
        const map = new window.google.maps.Map(document.getElementById("map"), {
          center: location,
          zoom: 15,
        });
        new window.google.maps.Marker({
          position: location,
          map: map,
        });
  
        const markers = [];
        const markerNames = [
          "Dracula's Castle",
          "The Witch's Hut",
          "Frankenstein's Lab",
          "The Ghostly Mansion",
          "The Haunted Cemetery",
          "The Abandoned Asylum",
          "The Cursed Woods",
          "The Dark Crypt",
          "The Phantom's Lair",
          "The Creepy Carnival",
          "The Spooky Swamp",
          "The Mysterious Manor",
          "The Shadowy Tower",
          "The Eerie Graveyard"
        ];
        
        const locations = [
          { lat: 57.7000, lng: 11.9669 }, // Gothenburg Central Station
          { lat: 57.6964, lng: 11.9865 }, // Liseberg Amusement Park
          { lat: 57.7045, lng: 11.9585 }, // Avenyn Boulevard
          { lat: 57.6906, lng: 11.9380 }, // Slottsskogen Park
          { lat: 57.7089, lng: 11.9746 }, // Gothenburg Opera House
          { lat: 57.7179, lng: 11.9567 }, // Haga District
          { lat: 57.6844, lng: 11.9685 }, // Universeum Science Center
          { lat: 57.6885, lng: 11.9875 }, // Fish Market
          { lat: 57.6917, lng: 11.9228 }, // Gunnebo House and Gardens
          { lat: 57.7300, lng: 11.9382 }, // Volvo Museum
          { lat: 57.7361, lng: 11.9717 }, // Maritiman Museum
          { lat: 57.7068, lng: 11.9563 }, // Poseidon Statue
          { lat: 57.7147, lng: 11.9451 }, // Skansen Kronan Fortress
          { lat: 57.6950, lng: 11.9257 }  // Aeroseum Aviation Museum
        ];

        let infoWindow = new window.google.maps.InfoWindow();

        for (let i = 0; i < locations.length; i++) {
          const marker = new window.google.maps.Marker({
            position: locations[i],
            map: map,
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              fillColor: "purple",
              fillOpacity: 0.8,
              strokeColor: "white",
              strokeWeight: 1,
              scale: 10,
            },
            title: markerNames[i % markerNames.length],
          });
      
          window.google.maps.event.addListener(marker, 'click', function() {
            let newScore = score;
            let scoringRules = "You scored 0 points.";
            scoringRules += " The rules for scoring are: <br>";
            scoringRules += "- Within 5 meters: 20 points <br>";
            scoringRules += "- Within 20 meters: 15 points <br>";
            scoringRules += "- Within 50 meters: 10 points <br>";
            scoringRules += "- Within 100 meters: 5 points <br>";
            infoWindow.setContent(`<div style='background-color: white;'>${marker.title}<br>Total score: ${newScore}<br>${scoringRules}</div>`);
            infoWindow.open(map, marker);
            // ...
          });
          
          
      
          markers.push(marker);
        };                               
      };

      if (!window.google) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key={}&libraries=places`;
        script.onload = initMap;
        document.head.appendChild(script);
      } else {
        initMap();
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const handleFindMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          const map = new window.google.maps.Map(document.getElementById("map"), {
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            zoom: 15,
          });
          new window.google.maps.Marker({
            position: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            map: map,
          });
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };  

  return (
<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
  <button onClick={handleFindMyLocation} style={{ marginBottom: "1rem" }}>Find My Location</button>
  <p>Score: {score}</p>
  <div id="map" style={{ height: "400px", width: "80%", margin: "auto" }}>
    {location ? (
      <p>
        Latitude: {location.lat}, Longitude: {location.lng}
      </p>
    ) : (
      <p>Loading...</p>
    )}
  </div>
</div>

  );
}
export default Map;