import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";


const VitebskLatLong = { lat: 55.2047, lng: 30.2086 };
const Vitebsk2LatLong = { lat: 55.206, lng: 30.21 };

const _fetchGoogleMapApiKey = () => {
  return "AIzaSyDSHhsC3wqjA6IXiIvROlCDwSGsrnnqzGw";
};

const CustomSkinMap = withScriptjs(
  withGoogleMap( /*props*/ () => (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={VitebskLatLong}
      defaultOptions={{
        scrollwheel: false,
        zoomControl: true,
        styles: [
          {
            featureType: "water",
            stylers: [
              { saturation: 43 },
              { lightness: -11 },
              { hue: "#0088ff" }
            ]
          },
          {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: [
              { hue: "#ff0000" },
              { saturation: -100 },
              { lightness: 99 }
            ]
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#808080" }, { lightness: 54 }]
          },
          {
            featureType: "landscape.man_made",
            elementType: "geometry.fill",
            stylers: [{ color: "#ece2d9" }]
          },
          {
            featureType: "poi.park",
            elementType: "geometry.fill",
            stylers: [{ color: "#ccdca1" }]
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#767676" }]
          },
          {
            featureType: "road",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#ffffff" }]
          },
          { featureType: "poi", stylers: [{ visibility: "off" }] },
          {
            featureType: "landscape.natural",
            elementType: "geometry.fill",
            stylers: [{ visibility: "on" }, { color: "#b8cb93" }]
          },
          { featureType: "poi.park", stylers: [{ visibility: "on" }] },
          {
            featureType: "poi.sports_complex",
            stylers: [{ visibility: "on" }]
          },
          { featureType: "poi.medical", stylers: [{ visibility: "on" }] },
          {
            featureType: "poi.business",
            stylers: [{ visibility: "simplified" }]
          }
        ]
      }}
    >
      <Marker position={VitebskLatLong} />
      <Marker position={Vitebsk2LatLong} />
    </GoogleMap>
  ))
);

// eslint-disable-next-line no-unused-vars
function Maps({ ...props }) 
{
  const gmapApiKey = _fetchGoogleMapApiKey();
  //console.log(gmapApiKey);
  const url = `https://maps.googleapis.com/maps/api/js?key=${gmapApiKey}`;

  return (
    <CustomSkinMap
      googleMapURL={url}
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `100vh` }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  );
}

export default Maps;
