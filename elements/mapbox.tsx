'use client';
import { createRoot } from 'react-dom/client';
import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { LocationType } from 'lib/types';

type DataType = {
	accessToken: string;
	bearing?: number;
	className?: string;
	center?: [number, number];
	cooperativeGestures?: boolean;
	locations?: LocationType[];
	map_marker?: React.ReactNode;
	pitch?: number;
	show_compass?: boolean;
	style?: string;
	zoom?: number;
};

const Mapbox = ({ accessToken, bearing = 0, className, center = [-112.0225, 40.5497], cooperativeGestures = true, locations, map_marker, pitch = 0, show_compass = true, style = 'mapbox://styles/mapbox/standard', zoom = 14 }: DataType) => {
	mapboxgl.accessToken = accessToken || '';

	//__Refs
	const map = useRef<mapboxgl.Map | null>(null);
	const mapContainer = useRef(null);

	//__Use Effects
	//Initiate Map
	useEffect(() => {
		if (map.current) return;
		if (mapContainer?.current) {
			const bounds = new mapboxgl.LngLatBounds();
			map.current = new mapboxgl.Map({
				container: mapContainer?.current || '',
				style,
				center,
				zoom,
				pitch,
				bearing,
				cooperativeGestures
			});

			if (show_compass) {
				map.current.addControl(new mapboxgl.NavigationControl({ showCompass: false }));
			}

			locations?.map((item) => {
				//Create Marker
				const marker_el = document.createElement('div');
				createRoot(marker_el).render(map_marker);
				marker_el.className = 'map_marker';

				const marker = new mapboxgl.Marker({
					element: map_marker ? marker_el : undefined,
					anchor: 'bottom'
				}).setLngLat([item.lng, item.lat]);
				if (map?.current) {
					marker.addTo(map.current);
				}
				bounds.extend(marker._lngLat);
			});
			map.current.fitBounds(bounds, { padding: 20, maxZoom: 14, bearing: 0, pitch: 0 });
		}
	}, [mapContainer]);

	return <div className={className} ref={mapContainer} />;
};

export default Mapbox;
