import { GeoJSONSource, Map, Popup, type MapLayerMouseEvent } from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"
import { useEffect, useRef, useState } from "react"

import { layerDataToGeoJson } from "@/entities/layer/toGeoJson"
import { layerConfig } from "@/features/layers/config"
import { useAppSelector } from "../../../store/appStore"

export function MapView() {
	const [isChanging, setIsChanging] = useState(false)

	const mapContainer = useRef<HTMLDivElement | null>(null)
	const mapRef = useRef<Map | null>(null)

	const { layerData, selectedTimeId, activeLayerIds } = useAppSelector(
		(state) => ({
			layerData: state.layerData,
			selectedTimeId: state.selectedTimes,
			activeLayerIds: state.activeLayers,
		}),
	)

	// Создание карты
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
					"circle-radius": ["get", "radius"],
					"circle-color": ["get", "color"],
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

	// Обновление данных карты при изменении времени или слоёв
	useEffect(() => {
		const map = mapRef.current

		if (!map) return

		setIsChanging(true)

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

		const timeout = setTimeout(() => {
			setIsChanging(false)
		}, 200)

		return () => {
			clearTimeout(timeout)
		}
	}, [layerData, selectedTimeId, activeLayerIds])

	// Popup при клике на точку
	useEffect(() => {
		const map = mapRef.current

		if (!map) return

		const handleClick = (event: MapLayerMouseEvent) => {
			const feature = event.features?.[0]

			if (!feature) return

			const coordinates = feature.geometry.coordinates as [number, number]

			const layerId = feature.properties?.layerId

			const layer = layerConfig.find((item) => item.id === layerId)

			const value = feature.properties?.value ?? "-"
			const layerName = layer?.name ?? "Слой"
			const unit = layer?.unit ?? ""

			new Popup()
				.setLngLat(coordinates)
				.setText(`${layerName}: ${value} ${unit}`)
				.addTo(map)
		}

		map.on("click", "layer-data-points", handleClick)

		return () => {
			map.off("click", "layer-data-points", handleClick)
		}
	}, [])

	return (
		<div className="overflow-hidden rounded-xl">
			<div
				ref={mapContainer}
				className={`h-125 w-full transition-opacity duration-300 ${
					isChanging ? "opacity-60" : "opacity-100"
				}`}
			/>
		</div>
	)
}
