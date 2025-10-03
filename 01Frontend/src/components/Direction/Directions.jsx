import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";

function Directions() {
  const [start, setStart] = useState(""); 
  const [destination, setDestination] = useState(""); 
  const [mapInstance, setMapInstance] = useState(null);
  const [directionPlugin, setDirectionPlugin] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const apiKey = "6815a707-0226-4b0c-826f-1805f1925a1d"; // Your API key

    // Define the callback FIRST before loading scripts
    window.initMap1 = function () {
      console.log("initMap1 called");
      if (window.mappls && window.mappls.Map) {
        const map = new window.mappls.Map("map", {
          center: [28.09, 78.3],
          zoom: 5,
        });
        
        map.addListener('load', function() {
          console.log("Map loaded");
          setMapInstance(map);
          setMapLoaded(true);
        });
      } else {
        console.error("Mappls not available");
      }
    };

    // Check if scripts are already loaded
    const existingScript1 = document.querySelector(`script[src*="map_sdk"]`);
    const existingScript2 = document.querySelector(`script[src*="map_sdk_plugins"]`);

    if (existingScript1 && existingScript2) {
      if (window.mappls) {
        window.initMap1();
      }
      return;
    }

    // Load Map SDK with callback
    const script1 = document.createElement("script");
    script1.src = `https://apis.mappls.com/advancedmaps/api/${apiKey}/map_sdk?layer=vector&v=3.0&callback=initMap1`;
    script1.async = true;
    script1.defer = true;

    // Load Plugins
    const script2 = document.createElement("script");
    script2.src = `https://apis.mappls.com/advancedmaps/api/${apiKey}/map_sdk_plugins?v=3.0`;
    script2.async = true;
    script2.defer = true;

    script1.onerror = () => console.error("Failed to load Map SDK");
    script2.onerror = () => console.error("Failed to load Plugins");

    document.body.appendChild(script1);
    document.body.appendChild(script2);

    return () => {
      if (document.body.contains(script1)) document.body.removeChild(script1);
      if (document.body.contains(script2)) document.body.removeChild(script2);
    };
  }, []);

  const handleGetDirections = () => {
    if (!mapInstance || !mapLoaded || !start || !destination) {
      alert("Please enter both start and destination");
      return;
    }

    // Mappls will handle geocoding automatically
    const direction_option = {
      map: mapInstance,
      divWidth: "350px",
      isDraggable: false,
      start: start,  // Just pass the place name/address string
      end: destination,  // Just pass the place name/address string
      Profile: ["driving", "biking", "trucking", "walking"],
    };

    if (window.mappls && window.mappls.direction) {
      window.mappls.direction(direction_option, function (data) {
        setDirectionPlugin(data);
        console.log("Direction Plugin:", data);
      });
    } else {
      console.error("Direction plugin not loaded");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="flex justify-between items-center bg-blue-500 px-6 py-3 shadow-md">
        <nav className="flex space-x-8">
          {["Home", "Explore", "Saved", "Settings"].map((item) => (
            <button key={item} className="relative text-white font-medium group">
              {item}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-100 group-hover:w-full"></span>
            </button>
          ))}
        </nav>
        <FaUserCircle className="w-8 h-8 text-white cursor-pointer" />
      </header>

      {/* Main Layout */}
      <div className="flex flex-1 p-6 space-x-6">
        {/* Sidebar */}
        <aside className="w-64 bg-white p-4 rounded-xl shadow-md">
          <div className="mb-6">
            <h2 className="font-semibold mb-4 text-lg">Get Directions</h2>
            
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Location
            </label>
            <input
              type="text"
              placeholder="Enter start location"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Destination
            </label>
            <input
              type="text"
              placeholder="Enter destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            
            <button
              className={`w-full px-3 py-2 rounded-md text-white font-medium transition-colors ${
                mapLoaded ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'
              }`}
              onClick={handleGetDirections}
              disabled={!mapLoaded}
            >
              {mapLoaded ? "Get Directions" : "Loading Map..."}
            </button>
          </div>
          
          <div>
            <h2 className="font-semibold mb-2 text-lg">Navigation</h2>
            <button className="w-full px-3 py-2 rounded-md bg-green-500 text-white font-medium hover:bg-green-600 transition-colors">
              Start Navigation
            </button>
          </div>
        </aside>

        {/* Map Section */}
        <main className="flex-1 bg-gray-200 rounded-xl shadow-md overflow-hidden">
          <div
            id="map"
            style={{ 
              width: "100%", 
              height: "100%", 
              minHeight: "70vh"
            }}
          ></div>
        </main>
      </div>
    </div>
  );
}

export default Directions;
