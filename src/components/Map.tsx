import React, { useEffect } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';

const Map = ({ center }) => {
  // noinspection TypeScriptUnresolvedReference
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.GATSBY_GOOGLE_MAPS_API_KEY,
  });

  useEffect((): void => {
    if ( isLoaded && !loadError ) {
      async function initMap(): Promise<void> {
        const { Map } = (await google.maps.importLibrary('maps')) as google.maps.MapsLibrary;
        const { AdvancedMarkerElement } = (await google.maps.importLibrary('marker')) as google.maps.MarkerLibrary;

        // noinspection TypeScriptUnresolvedReference
        const map: google.maps.Map = new Map(document.getElementById('map-view') as HTMLElement, {
          mapId: process.env.GATSBY_GOOGLE_MAPS_MAP_ID,
          center,
          zoom: 15,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        });

        const markerElement: google.maps.marker.AdvancedMarkerElement = new AdvancedMarkerElement({
          map,
          position: center,
        });
      }

      initMap().then();
    }
  }, [isLoaded, loadError]);

  if ( loadError ) return <div>Error loading maps</div>;
  if ( !isLoaded ) return <div>Loading maps...</div>;

  return <div id="map-view" className="map-wrapper" />;
};
export default Map;
