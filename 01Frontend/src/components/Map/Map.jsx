import React, { useEffect } from "react";
import { FaUserCircle } from "react-icons/fa"; // user profile icon
import { useNavigate } from "react-router-dom";

function Map() {
  const navigate = useNavigate();

  useEffect(() => {
    const apiKey = "6815a707-0226-4b0c-826f-1805f1925a1d";
    const script1 = document.createElement("script");
    script1.src = `https://apis.mappls.com/advancedmaps/api/${apiKey}/map_sdk?layer=vector&v=3.0&callback=initMap1`;
    script1.async = true;

    const script2 = document.createElement("script");
    script2.src = `https://apis.mappls.com/advancedmaps/api/${apiKey}/map_sdk_plugins?v=3.0`;
    script2.async = true;

    document.body.appendChild(script1);
    document.body.appendChild(script2);

    window.initMap1 = function () {
      const map = new window.mappls.Map("map", {
        center: [28.09, 78.3],
        zoom: 5,
      });
      map.addListener("load", function () {
        const optional_config = {
          region: "IND",
          height: 300,
        };
        new window.mappls.search(
          document.getElementById("auto"),
          optional_config,
          function (data) {
            if (data) {
              const dt = data[0];
              if (!dt) return false;
              const eloc = dt.eLoc;
              const place = dt.placeName + ", " + dt.placeAddress;
              if (window.marker) window.marker.remove();
              window.mappls.pinMarker(
                {
                  map: map,
                  pin: eloc,
                  popupHtml: place,
                  popupOptions: { openPopup: true },
                },
                function (marker) {
                  window.marker = marker;
                  marker.fitbounds();
                }
              );
            }
          }
        );
      });
    };

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="flex justify-between items-center bg-blue-500 px-6 py-3 shadow-md">
        <nav className="flex space-x-8">
          {["Home", "Explore", "Saved", "Settings"].map((item) => (
            <button
              key={item}
              className="relative text-white font-medium group"
            >
              {item}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-100 group-hover:w-full"></span>
            </button>
          ))}
        </nav>

        {/* Profile Icon */}
        <FaUserCircle className="w-8 h-8 text-white cursor-pointer" />
      </header>

      {/* Main Content */}
      <div className="flex flex-1 p-6 space-x-6">
        {/* Sidebar */}
        <aside className="w-64 bg-white p-4 rounded-xl shadow-md">
          <div className="mb-6">
            <h2 className="font-semibold mb-2">Search</h2>
            <input
              type="text"
              id="auto"
              placeholder="Search location"
              className="w-full px-3 py-2 rounded-md border"
            />
          </div>
          <div className="mb-6">
            <h2 className="font-semibold mb-2">Directions</h2>
            <button
              className="w-full px-3 py-2 rounded-md bg-blue-400 text-white"
              onClick={() => navigate("/directions")}
            >
              Get Directions
            </button>
          </div>
          <div>
            <h2 className="font-semibold mb-2">Navigation</h2>
            <button className="w-full px-3 py-2 rounded-md bg-blue-400 text-white">
              Start Navigation
            </button>
          </div>
        </aside>

        {/* Map Section */}
        <main className="flex-1 bg-gray-200 rounded-xl shadow-md flex items-center justify-center relative">
          <div
            id="map"
            className="w-full h-[70vh] rounded-xl"
            style={{ minHeight: "400px" }}
          ></div>
        </main>
      </div>
    </div>
  );
}

export default Map;
