// Coverage.jsx
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Load data from router loader
import { useLoaderData } from "react-router";

// Toast alert for error messages
import { toast } from "react-toastify";

const customIcon = new L.Icon({
  iconUrl: "https://i.ibb.co/ZRWPzFnW/location-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
const FlyToLocation = ({ position }) => {
  // get position as a props so that region use {}
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 12, {
        duration: 1.5,
      }); // Smooth zoom/fly
    }
  }, [position, map]);

  return null;
};

const Coverage = () => {
  const position = [23.8103, 90.4125]; // Default center: Dhaka

  const coverageArea = useLoaderData(); // Loaded data from route loader
  const [search, setSearch] = useState(""); // State to store search input
  const [flyTo, setFlyTo] = useState(null); // Coordinate to fly to (after search)

  // 🔍 Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();

    // Find district that matches search input
    const found = coverageArea.find(
      (d) =>
        d.city.toLowerCase().includes(search.toLowerCase()) ||
        d.district.toLowerCase().includes(search.toLowerCase()) ||
        d.region.toLowerCase().includes(search.toLowerCase()) ||
        d.covered_area.some((area) =>
          area.toLowerCase().includes(search.toLowerCase())
        )
    );

    if (found) {
      // If match found, fly to that location
      setFlyTo([found.latitude, found.longitude]);
    } else {
      // Show error message
      toast.error("No matching area found!");
    }
    setSearch("");
  };
  return (
    <div className="relative shadow-md rounded-md my-16 bg-white p-6">
      <h3 className="text-2xl font-bold text-center mb-6">
        We are available in 64 districts
      </h3>

      {/* 🔍 Search Input Form */}
      <form
        onSubmit={handleSearch}
        className="flex justify-center mb-6 gap-2"
        autoComplete="off"
      >
        <input
          type="text"
          name="search"
          placeholder="Search by city, district, or region..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          required
          className="bg-gray-100 rounded-md py-2 px-4 w-64 focus:outline-none focus:ring-2 focus:ring-primary text-gray-700 border border-gray-200 focus:border-primary transition"
        />
        <button
          type="submit"
          className="btn btn-primary font-semibold rounded-md px-6 py-2"
        >
          Search
        </button>
      </form>

      {/* 🗺️ Map Section */}
      <MapContainer
        center={position}
        zoom={7}
        scrollWheelZoom={true}
        className="w-8/12 h-[500px] mx-auto relative z-0"
      >
        {/* Map background tiles */}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Fly animation when searching */}
        [sds,svkdsv]
        {flyTo && <FlyToLocation position={flyTo} />}

        {/* Show all district markers */}
        {coverageArea.map((district, idx) => (
          <Marker key={idx} position={[district.latitude, district.longitude]}>
            <Popup>
              <div>
                <strong>{district.city}</strong>
                <br />
                {district.covered_area.join(", ")}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Coverage;
