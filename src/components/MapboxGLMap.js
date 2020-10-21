import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const styles = {
  width: "100%",
  height: "calc(100vh - 80px)",
  position: "absolute"
};

const MapboxGLMap = () => {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/light-v9", // stylesheet location
        center: [10.408773,63.422091],
        zoom: 13
      });
      

      new mapboxgl.Marker().setLngLat([10.3957807, 63.4224338]).setPopup(new mapboxgl.Popup().setHTML("<h3>Studentersamfundet</h3>")).addTo(map);
      new mapboxgl.Marker().setLngLat([10.4023582, 63.4279411]).setPopup(new mapboxgl.Popup().setHTML("<h3>Den gode naboen</h3>")).addTo(map);
      new mapboxgl.Marker().setLngLat([10.3928913, 63.4313285]).setPopup(new mapboxgl.Popup().setHTML("<h3>Trondhjem Mikrobryggeri</h3>")).addTo(map);


      map.on("load", () => {
        setMap(map);
        map.resize();      
      });
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map]);

  return <div ref={el => (mapContainer.current = el)} style={styles} />;
};

export default MapboxGLMap;