# Interactive Map Dashboard

A small interactive map application built with React and TypeScript.

The application displays environmental data on a map and allows users to work with different layers and time points.

## Features

- Interactive map
- Temperature, wind and insolation layers
- Enable/disable individual layers
- Select a specific time
- Update map data when the selected time changes
- Popups with information about map points
- Chart with layer data over time
- Select time directly from the chart
- Multiple active layers can be displayed at the same time

## How It Works

The map displays data for the currently selected time.
When the user changes the time, the data on the map is updated accordingly.
Layers can be enabled or disabled independently. Only active layers are displayed on the map and included in the chart.
The chart shows the available values for each active layer across the available time points. The selected time is also highlighted on the chart.
Clicking on a map point opens a popup with information about that point.

## Data

The project currently uses mock data.
Each data item is connected to a layer and a specific time point. The data is converted to GeoJSON before being passed to the map.
The layer configuration is kept separately, so new layers can be added without changing the main map component.

## Project Structure

The main application code is located in `src`.

```text
src/
├── entities/
│   └── layer/
│
├── features/
│   └── layers/
│
├── ...
```

The map, layer configuration, data transformation and analytics are kept in separate parts of the application.

## Notes

This is a frontend-only implementation. No backend is required to run the project.
The data is currently mocked and can be replaced with data from an API in the future.
