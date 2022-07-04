import { useState, useEffect } from "react";
const BASE_URL = `https://api.tfl.gov.uk/`;
export default function useLocation(options) {
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);

  // when user click the pin then get user's location.
  useEffect(() => {
    if (lat !== 0 && lon !== 0) {
      fetch(
        `${BASE_URL}StopPoint?lat=${lat}&lon=${lon}&stopTypes=NaptanMetroStation`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((result) => {
          if (result) {
            // add user location's station inside options as first row.
            options.unshift({
              value: `${lat},${lon}`,
              label: `📍 Your Location`,
            });
          }
        });
    }
  }, [lat, lon, options]);

  return [setLat, setLon];
}
