"use client";

import React, { useEffect, useRef, useState } from "react";
import type * as Leaflet from "leaflet";
import { useEarthquakes } from "@/hooks/useEarthquakes";

export const MapContainer: React.FC = () => {
  const { data: earthquakes, isLoading } = useEarthquakes();
  const [leaflet, setLeaflet] = useState<typeof import("leaflet") | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Leaflet.Map | null>(null);
  const markersRef = useRef<(Leaflet.CircleMarker | Leaflet.Marker)[]>([]);

  useEffect(() => {
    const cssId = "leaflet-css";
    if (!document.getElementById(cssId)) {
      const link = document.createElement("link");
      link.id = cssId;
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    let mounted = true;
    import("leaflet")
      .then((mod) => {
        if (mounted) setLeaflet(mod);
      })
      .catch((err) => {
        console.error("Failed to load leaflet", err);
      });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!leaflet || !mapContainerRef.current || mapRef.current) return;

    mapRef.current = leaflet.map(mapContainerRef.current);

    // Set view to show all of Indonesia
    // Indonesia bounds: roughly from lat -10.5 to 6, lng 95 to 141
    mapRef.current.fitBounds([
      [-10.5, 95],
      [6, 141],
    ]);

    leaflet
      .tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
          attribution: "Tiles &copy; Esri",
          maxZoom: 19,
        }
      )
      .addTo(mapRef.current);

    // cleanup on unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [leaflet]);

  useEffect(() => {
    if (!leaflet || !mapRef.current || earthquakes.length === 0) return;

    // Remove existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Add markers for each earthquake
    earthquakes.forEach((earthquake) => {
      if (earthquake.lintang && earthquake.bujur) {
        const latStr = earthquake.lintang.replace(/\s[LS]/i, "");
        const lngStr = earthquake.bujur.replace(/\s[BT]/i, "");

        let lat = parseFloat(earthquake.lintang);
        if (/[Ss]$/.test(earthquake.lintang)) {
          lat = -Math.abs(lat);
        }
        let lng = parseFloat(earthquake.bujur);
        if (/[Bb]$/.test(earthquake.bujur)) {
          lng = -Math.abs(lng);
        }

        if (!isNaN(lat) && !isNaN(lng)) {
          const magnitude = earthquake.magnitude
            ? parseFloat(earthquake.magnitude)
            : 0;
          const size = Math.max(10, magnitude * 5);

          const marker = leaflet
            .marker([lat, lng], {
              icon: leaflet.icon({
                iconUrl: "/earthquake.svg",
                iconSize: [size, size],
                iconAnchor: [size / 2, size / 2],
                popupAnchor: [0, -size / 2],
              }),
            })
            .bindPopup(
              `<div style="font-size: 16px; max-width: 300px;">
                <strong>Tanggal:</strong> ${earthquake.tanggal}<br/>
                <strong>Jam:</strong> ${earthquake.jam}<br/>
                <strong>Magnitude:</strong> ${magnitude}<br/>
                <strong>Kedalaman:</strong> ${earthquake.kedalaman}<br/>
                <strong>Koordinat:</strong> ${earthquake.lintang}, ${earthquake.bujur}<br/>
                <strong>Wilayah:</strong> ${earthquake.wilayah}<br/>
                <strong>Potensi:</strong> ${earthquake.potensi}<br/>
              </div>`
            )
            .addTo(mapRef.current!);

          markersRef.current.push(marker);
        }
      }
    });
  }, [earthquakes, leaflet]);

  return (
    <div
      ref={mapContainerRef}
      style={{ width: "100%", height: "100vh" }}
      id="map"
    />
  );
};
