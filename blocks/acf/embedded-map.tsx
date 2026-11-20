'use client';
import { createRoot } from 'react-dom/client';
import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOXGL_ACCESS_TOKEN || '';

type ItemType = {
	location?: {
		address: string;
		city: string;
		lat: number;
		lng: number;
		name: string;
		post_code: string;
		state: string;
		street_name_short: string;
		street_number: string;
	};
	name?: string;
};

type DataType = {
	custom_class?: string;
	locations: Array<ItemType>;
	sec_anchor_name?: string;
};

const EmbeddedMap = ({ data }: { data: DataType }) => {
	//__Variables
	const { custom_class, locations, sec_anchor_name } = data || {};

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
				style: 'mapbox://styles/mapbox/light-v11',
				center: [-112.0225, 40.5497],
				zoom: 14,
				pitch: 0,
				bearing: 0,
				cooperativeGestures: true
			});

			map.current.addControl(new mapboxgl.NavigationControl({ showCompass: false }));

			locations.map((item) => {
				const location = item.location;
				if (location) {
					//Create Marker
					const marker_el = document.createElement('div');
					createRoot(marker_el).render(<div className='' />);
					marker_el.className = 'map_marker';
					const marker = new mapboxgl.Marker({
						element: marker_el,
						anchor: 'bottom'
					}).setLngLat([location.lng, location.lat]);
					if (map?.current) {
						marker.addTo(map.current);
					}
					bounds.extend(marker._lngLat);
				}
			});
			map.current.fitBounds(bounds, { padding: 20, maxZoom: 14, bearing: 0, pitch: 0 });
		}
	}, [mapContainer]);

	if (!data) return null;
	return (
		<section className={`my-16 relative md:gutter-x md:my-28${custom_class ? ` ${custom_class}` : ''}`} id={sec_anchor_name}>
			<div className='inner'>
				<div className='h-[640px] overflow-hidden relative md:rounded-[25px]' ref={mapContainer} />
			</div>
		</section>
	);
};

export default EmbeddedMap;
