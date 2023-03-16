const map = L.map("map", {
  center: [building.location.latitude, building.location.longtitude],
  zoom: 16,
  dragging: false,
  tap: false,
  scrollWheelZoom: false,
  doubleClickZoom: false,
  zoomControl: false,
});

const osm = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
});

osm.addTo(map);

const marker = L.marker(
  [building.location.latitude, building.location.longtitude],
  {
    title: building.name,
  }
);

marker.on("click", (e) => {
  L.popup()
    .setLatLng(e.latlng)
    .setContent(
      `<p class='text-muted'> ${building.location.latitude} ${building.location.longtitude} </p>`
    )
    .openOn(map);
});
marker.addTo(map);

const maplayout = L.geoJSON(TAU_Layout, {
  style: {
    fillColor: "#39DB2D",
    fillOpacity: 0.3,
    color: "#0B3A07",
  },
  interactive: false,
});
maplayout.addTo(map);
