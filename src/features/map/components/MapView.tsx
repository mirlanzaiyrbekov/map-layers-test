import { Map, Marker, Popup, setWorkerUrl } from "maplibre-gl"
import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url"
import "maplibre-gl/dist/maplibre-gl.css"
import { useEffect, useRef } from "react"
import { useAppSelector } from "../../../store/appStore"

export function MapView() {
	const mapContainer = useRef<HTMLDivElement | null>(null)
	const mapRef = useRef<Map | null>(null)

	setWorkerUrl(workerUrl)

	const { layerData } = useAppSelector((state) => ({
		layerData: state.layerData,
	}))

	useEffect(() => {
		if (!mapContainer.current) return

		const map = new Map({
			container: mapContainer.current,
			style: "https://demotiles.maplibre.org/globe.json",
			center: [74.5698, 42.8746],
			zoom: 10,
		})

		mapRef.current = map

		return () => {
			map.remove()
			mapRef.current = null
		}
	}, [])

	useEffect(() => {
		const map = mapRef.current

		if (!map) return

		const markers = layerData.flatMap((layer) =>
			layer.data.map((item) => {
				const marker = new Marker()
					.setLngLat([item.point.lng, item.point.lat])
					.setPopup(new Popup().setText(`${item.value}`))
					.addTo(map)

				return marker
			}),
		)

		return () => {
			markers.forEach((marker) => marker.remove())
		}
	}, [layerData])

	return (
		<div
			ref={mapContainer}
			className="h-125 w-full overflow-hidden rounded-xl"
		/>
	)
}
