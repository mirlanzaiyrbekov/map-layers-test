import { GeoJSONSource, Map, Marker, Popup } from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"
import { useEffect, useRef } from "react"

import { layerDataToGeoJson } from "@/entities/layer/toGeoJson"
import { layerConfig } from "@/features/layers/config"
import { useAppSelector } from "../../../store/appStore"

export function MapView() {
	const mapContainer = useRef<HTMLDivElement | null>(null)
	const mapRef = useRef<Map | null>(null)

	const { layerData, selectedTimeId, activeLayerIds } = useAppSelector(
		(state) => ({
			layerData: state.layerData,
			selectedTimeId: state.selectedTimes,
			activeLayerIds: state.activeLayers,
		}),
	)

	useEffect(() => {
		if (!mapContainer.current) return

		const map = new Map({
			container: mapContainer.current,
			style: "https://demotiles.maplibre.org/style.json",
			center: [74.5698, 42.8746],
			zoom: 10,
		})
		map.on("load", () => {
			map.addSource("layer-data", {
				type: "geojson",
				data: {
					type: "FeatureCollection",
					features: [],
				},
			})

			map.addLayer({
				id: "layer-data-points",
				type: "circle",
				source: "layer-data",
				paint: {
					"circle-radius": 10,
					"circle-color": "#2563eb",
					"circle-opacity": 0.7,
					"circle-stroke-width": 2,
					"circle-stroke-color": "#ffffff",
				},
			})
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

		const selectedData = layerData.filter(
			(layer) =>
				layer.time.id === selectedTimeId &&
				activeLayerIds.includes(layer.layerId),
		)

		const geoJsonData = selectedData.map((layer) => layerDataToGeoJson(layer))

		const geoJson = {
			type: "FeatureCollection" as const,
			features: geoJsonData.flatMap((collection) => collection.features),
		}

		const source = map.getSource("layer-data") as GeoJSONSource | undefined

		if (source) {
			source.setData(geoJson)
		}

		const markers = selectedData.flatMap((layer) =>
			layer.data.map((item) => {
				const size = Math.max(20, Math.min(50, item.value + 20))
				const config = layerConfig.find((item) => item.id === layer.layerId)
				const element = document.createElement("div")
				element.title = `${layer.layerId}: ${item.value}`
				element.style.width = `${size}px`
				element.style.height = `${size}px`
				element.style.borderRadius = "50%"
				element.style.backgroundColor =
					config?.color ?? "rgba(107, 114, 128, 0.7)"
				element.style.border = "2px solid white"
				element.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)"

				const marker = new Marker({
					element,
				})
					.setLngLat([item.point.lng, item.point.lat])
					.setPopup(new Popup().setText(`${layer.layerId}: ${item.value}`))
					.addTo(map)

				return marker
			}),
		)

		return () => {
			markers.forEach((marker) => marker.remove())
		}
	}, [layerData, selectedTimeId, activeLayerIds])

	return (
		<div
			ref={mapContainer}
			className="h-125 w-full overflow-hidden rounded-xl"
		/>
	)
}
