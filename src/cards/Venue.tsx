import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Card from '@/components/Card';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const mapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#263c3f' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#6b9a76' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#38414e' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#212a37' }],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9ca5b3' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#746855' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#1f2835' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#f3d19c' }],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#2f3948' }],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#17263c' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#515c6d' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#17263c' }],
  },
];

const Venue = (props) => {
  const center = useMemo(() => ({ lat: 47.50530903649446, lng: 19.01786543666104 }), []);

  // noinspection TypeScriptUnresolvedReference
  return (
    <Card id="venue" style={props.style} onCloseArticle={props.onCloseArticle} articleClassName={props.articleClassName}>
      <h2 className="major">A helyszín</h2>
      <span className="image main">
        {/*<StaticImage formats={['auto', 'webp']} src="../../static/assets/villa.jpg" alt="Venue" />*/}
      </span>

      <LoadScript googleMapsApiKey={process.env.GATSBY_GOOGLE_MAPS_API_KEY}>
        <div className="map-wrapper">
          <GoogleMap
            mapContainerClassName="map-container"
            center={center}
            zoom={15}
            options={{
              styles: mapStyle,
              mapTypeControl: false,
              streetViewControl: false,
              fullscreenControl: false,
            }}>
              <Marker position={center} />
          </GoogleMap>
        </div>
      </LoadScript>

      <h4 style={{ textAlign: 'center' }}>
        <a
          href="https://ul.waze.com/ul?preview_venue_id=12452315.124654223.5259128&navigate=yes&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location"
          target="_blank" rel="noopener noreferrer">
          Vezess ide waze!
        </a>
      </h4>
  </Card>
  );
};

Venue.propTypes = {
  articleClassName: PropTypes.string.isRequired,
  style: PropTypes.any.isRequired,
  onCloseArticle: PropTypes.func.isRequired,
};

export default Venue;
