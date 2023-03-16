var map = L.map("map").setView([15.638161, 120.418707], 16);

var osm = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  minZoom: 16,
});
// osm.addTo(map);
// console.log(buildings);

// Google map Satelite
var googleSat = L.tileLayer(
  "http://{s}.google.com/vt?lyrs=s&x={x}&y={y}&z={z}",
  {
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
    minZoom: 16,
  }
);
googleSat.addTo(map);

//GeoJson
const maplayout = L.geoJSON(TAU_Layout, {
  style: {
    fillColor: "#39DB2D",
    fillOpacity: 0.3,
    color: "#0B3A07",
  },
});
maplayout.addTo(map);

const cluster = L.markerClusterGroup();

// #region 'Marker class A'
// Markers per classifications
const buildingMarkersA = [];

//buildings per class
const classA = buildings.filter(
  (b) => b.classification === "Administrative and Support Services"
);
for (let building of classA) {
  const marker = L.marker(
    [building.location.latitude, building.location.longtitude],
    {
      title: building.name,
    }
  );
  marker.on("click", (e) => {
    // const {lat,lng} = e.latlng
    L.popup()
      .setLatLng(e.latlng)
      .setContent(
        `<div style='width: 200px; height: auto;'>
    <img src='${
      building.images.length > 0
        ? building.images[0].slice(6)
        : "/images/tau.png"
    }' class='img-fluid'/>
  </div>
  <a href='/buildings/${building._id}'>${building.name}</a>
  <p class='text-muted mt-0'>${building.typologies.reduce(
    (a, c) => `${a}/${c}`
  )}</p>
  <hr />
  <p>Location: ${building.location.latitude}, ${
          building.location.longtitude
        }</p>
  `
      )
      .openOn(map);
    map.panTo(e.latlng);
  });

  const markerIcon = L.divIcon({
    className: "",
    html: `<div class='circle-marker a'><span>${building.location.mapLabel}</span></div>`,
  });
  marker.setIcon(markerIcon);
  // buildingMarkersA.push(marker);
  cluster.addLayer(marker);
}
const layout_a = L.geoJSON(Layout_A, {
  style: {
    fillColor: "red",
    fillOpacity: 0.6,
    color: "black",
  },
});
const markerLayoutA = L.layerGroup([layout_a, ...buildingMarkersA]);
markerLayoutA.addTo(map);
//#endregion

//#region 'Building marker B'
const classB = buildings.filter(
  (b) => b.classification === "Auxiliary Buildings and Production Facilities"
);
const buildingMarkersB = [];
for (let building of classB) {
  const marker = L.marker(
    [building.location.latitude, building.location.longtitude],
    {
      title: building.name,
    }
  );

  marker.on("click", (e) => {
    // const {lat,lng} = e.latlng
    L.popup()
      .setLatLng(e.latlng)
      .setContent(
        `<div style='width: 200px; height: auto;'>
    <img src='${
      building.images.length > 0
        ? building.images[0].slice(6)
        : "/images/tau.png"
    }' class='img-fluid'/>
  </div>
  <a href='/buildings/${building._id}'>${building.name}</a>
  <p class='text-muted mt-0'>${building.typologies.reduce(
    (a, c) => `${a}/${c}`
  )}</p>
  <hr />
  <p>Location: ${building.location.latitude}, ${
          building.location.longtitude
        }</p>
  `
      )
      .openOn(map);
    map.panTo(e.latlng);
  });

  const markerIcon = L.divIcon({
    className: "",
    html: `<div class='circle-marker b'><span>${building.location.mapLabel}</span></div>`,
  });
  marker.setIcon(markerIcon);

  // buildingMarkersB.push(marker);

  cluster.addLayer(marker);
}

const layout_b = L.geoJSON(Layout_B, {
  style: {
    fillColor: "#F8820B",
    fillOpacity: 0.6,
    color: "black",
  },
});
const markerLayoutB = L.layerGroup([layout_b, ...buildingMarkersB]);
markerLayoutB.addTo(map);
//#endregion

//#region 'Building Marker C'

const classC = buildings.filter(
  (b) => b.classification === "Academic Buildings"
);
const buildingMarkersC = [];
for (let building of classC) {
  const marker = L.marker(
    [building.location.latitude, building.location.longtitude],
    {
      title: building.name,
    }
  );

  marker.on("click", (e) => {
    // const {lat,lng} = e.latlng
    L.popup()
      .setLatLng(e.latlng)
      .setContent(
        `<div style='width: 200px; height: auto;'>
    <img src='${
      building.images.length > 0
        ? building.images[0].slice(6)
        : "/images/tau.png"
    }' class='img-fluid'/>
  </div>
  <a href='/buildings/${building._id}'>${building.name}</a>
  <p class='text-muted mt-0'>${building.typologies.reduce(
    (a, c) => `${a}/${c}`
  )}</p>
  <hr />
  <p>Location: ${building.location.latitude}, ${
          building.location.longtitude
        }</p>
  `
      )
      .openOn(map);
    map.panTo(e.latlng);
  });

  const markerIcon = L.divIcon({
    className: "",
    html: `<div class='circle-marker c'><span>${building.location.mapLabel}</span></div>`,
  });
  marker.setIcon(markerIcon);

  // buildingMarkersC.push(marker);

  cluster.addLayer(marker);
}

const layout_c = L.geoJSON(Layout_C, {
  style: {
    fillColor: "#1111DD",
    fillOpacity: 0.6,
    color: "black",
  },
});
const markerLayoutC = L.layerGroup([layout_c, ...buildingMarkersC]);
markerLayoutC.addTo(map);
//#endregion

//#region 'Building Marker D'
const classD = buildings.filter(
  (b) => b.classification === "Research, Extension, and Training"
);
const buildingMarkersD = [];
for (let building of classD) {
  const marker = L.marker(
    [building.location.latitude, building.location.longtitude],
    {
      title: building.name,
    }
  );

  marker.on("click", (e) => {
    // const {lat,lng} = e.latlng
    L.popup()
      .setLatLng(e.latlng)
      .setContent(
        `<div style='width: 200px; height: auto;'>
    <img src='${
      building.images.length > 0
        ? building.images[0].slice(6)
        : "/images/tau.png"
    }' class='img-fluid'/>
  </div>
  <a href='/buildings/${building._id}'>${building.name}</a>
  <p class='text-muted mt-0'>${building.typologies.reduce(
    (a, c) => `${a}/${c}`
  )}</p>
  <hr />
  <p>Location: ${building.location.latitude}, ${
          building.location.longtitude
        }</p>
  `
      )
      .openOn(map);
    map.panTo(e.latlng);
  });

  const markerIcon = L.divIcon({
    className: "",
    html: `<div class='circle-marker d'><span>${building.location.mapLabel}</span></div>`,
  });
  marker.setIcon(markerIcon);

  // buildingMarkersD.push(marker);

  cluster.addLayer(marker);
}
const layout_d = L.geoJSON(Layout_D, {
  style: {
    fillColor: "#E0E038",
    fillOpacity: 0.6,
    color: "black",
  },
});

const markerLayoutD = L.layerGroup([layout_d, ...buildingMarkersD]);
markerLayoutD.addTo(map);

//#endregion

//#region 'Building Marker E'
const classE = buildings.filter(
  (b) => b.classification === "Housing Facilities"
);
const buildingMarkersE = [];
for (let building of classE) {
  const marker = L.marker(
    [building.location.latitude, building.location.longtitude],
    {
      title: building.name,
    }
  );

  marker.on("click", (e) => {
    // const {lat,lng} = e.latlng
    L.popup()
      .setLatLng(e.latlng)
      .setContent(
        `<div style='width: 200px; height: auto;'>
    <img src='${
      building.images.length > 0
        ? building.images[0].slice(6)
        : "/images/tau.png"
    }' class='img-fluid'/>
  </div>
  <a href='/buildings/${building._id}'>${building.name}</a>
  <p class='text-muted mt-0'>${building.typologies.reduce(
    (a, c) => `${a}/${c}`
  )}</p>
  <hr />
  <p>Location: ${building.location.latitude}, ${
          building.location.longtitude
        }</p>
  `
      )
      .openOn(map);
    map.panTo(e.latlng);
  });

  const markerIcon = L.divIcon({
    className: "",
    html: `<div class='circle-marker e'><span>${building.location.mapLabel}</span></div>`,
  });
  marker.setIcon(markerIcon);

  // buildingMarkersE.push(marker);

  cluster.addLayer(marker);
}

const layout_e = L.geoJSON(Layout_E, {
  style: {
    fillColor: "#D71275",
    fillOpacity: 0.6,
    color: "black",
  },
});
const markerLayoutE = L.layerGroup([layout_e, ...buildingMarkersE]);
markerLayoutE.addTo(map);
//#endregion

//#region 'Building Marker F'
const classF = buildings.filter(
  (b) => b.classification === "Sports and Recreational Facilities"
);
const buildingMarkersF = [];
for (let building of classF) {
  const marker = L.marker(
    [building.location.latitude, building.location.longtitude],
    {
      title: building.name,
    }
  );

  marker.on("click", (e) => {
    // const {lat,lng} = e.latlng
    L.popup()
      .setLatLng(e.latlng)
      .setContent(
        `<div style='width: 200px; height: auto;'>
    <img src='${
      building.images.length > 0
        ? building.images[0].slice(6)
        : "/images/tau.png"
    }' class='img-fluid'/>
  </div>
  <a href='/buildings/${building._id}'>${building.name}</a>
  <p class='text-muted mt-0'>${building.typologies.reduce(
    (a, c) => `${a}/${c}`
  )}</p>
  <hr />
  <p>Location: ${building.location.latitude}, ${
          building.location.longtitude
        }</p>
  `
      )
      .openOn(map);
    map.panTo(e.latlng);
  });

  const markerIcon = L.divIcon({
    className: "",
    html: `<div class='circle-marker f'><span>${building.location.mapLabel}</span></div>`,
  });
  marker.setIcon(markerIcon);

  // buildingMarkersF.push(marker);
  cluster.addLayer(marker);
}
const layout_f = L.geoJSON(Layout_F, {
  style: {
    fillColor: "#1EEFEF",
    fillOpacity: 0.6,
    color: "black",
  },
});
const markerLayoutF = L.layerGroup([layout_f, ...buildingMarkersF]);
markerLayoutF.addTo(map);

//#endregion

//#region 'Building Marker G'
const classG = buildings.filter((b) => b.classification === "Utilities");
const buildingMarkersG = [];
for (let building of classG) {
  const marker = L.marker(
    [building.location.latitude, building.location.longtitude],
    {
      title: building.name,
    }
  );

  marker.on("click", (e) => {
    // const {lat,lng} = e.latlng
    L.popup()
      .setLatLng(e.latlng)
      .setContent(
        `<div style='width: 200px; height: auto;'>
    <img src='${
      building.images.length > 0
        ? building.images[0].slice(6)
        : "/images/tau.png"
    }' class='img-fluid'/>
  </div>
  <a href='/buildings/${building._id}'>${building.name}</a>
  <p class='text-muted mt-0'>${building.typologies.reduce(
    (a, c) => `${a}/${c}`
  )}</p>
  <hr />
  <p>Location: ${building.location.latitude}, ${
          building.location.longtitude
        }</p>
  `
      )
      .openOn(map);
    map.panTo(e.latlng);
  });

  const markerIcon = L.divIcon({
    className: "",
    html: `<div class='circle-marker g'><span>${building.location.mapLabel}</span></div>`,
  });
  marker.setIcon(markerIcon);

  // buildingMarkersG.push(marker);

  cluster.addLayer(marker);
}
const layout_g = L.geoJSON(Layout_G, {
  style: {
    fillColor: "#D20D0D",
    fillOpacity: 0.6,
    color: "black",
  },
});
const markerLayoutG = L.layerGroup([layout_g, ...buildingMarkersG]);
markerLayoutG.addTo(map);
//#endregion

//#region 'Building Marker H'
const classH = buildings.filter((b) => b.classification === "Other Structures");
const buildingMarkersH = [];
for (let building of classH) {
  const marker = L.marker(
    [building.location.latitude, building.location.longtitude],
    {
      title: building.name,
    }
  );

  marker.on("click", (e) => {
    // const {lat,lng} = e.latlng
    L.popup()
      .setLatLng(e.latlng)
      .setContent(
        `<div style='width: 200px; height: auto;'>
    <img src='${
      building.images.length > 0
        ? building.images[0].slice(6)
        : "/images/tau.png"
    }' class='img-fluid'/>
  </div>
  <a href='/buildings/${building._id}'>${building.name}</a>
  <p class='text-muted mt-0'>${building.typologies.reduce(
    (a, c) => `${a}/${c}`
  )}</p>
  <hr />
  <p>Location: ${building.location.latitude}, ${
          building.location.longtitude
        }</p>
  `
      )
      .openOn(map);
    map.panTo(e.latlng);
  });

  const markerIcon = L.divIcon({
    className: "",
    html: `<div class='circle-marker h'><span>${building.location.mapLabel}</span></div>`,
  });
  marker.setIcon(markerIcon);

  // buildingMarkersH.push(marker);

  cluster.addLayer(marker);
}
const layout_h = L.geoJSON(Layout_H, {
  style: {
    fillColor: "#16E816",
    fillOpacity: 0.6,
    color: "black",
  },
});
const markerLayoutH = L.layerGroup([layout_h, ...buildingMarkersH]);
markerLayoutH.addTo(map);
//#endregion

cluster.addTo(map);
// Layer Controllers
const baseMaps = {
  "Google Satellite": googleSat,
  OpenStreetMap: osm,
};

const overlayMaps = {
  "Administrative and Support Services": markerLayoutA,
  "Auxiliary Buildings and Production Facilities": markerLayoutB,
  "Academic Buildings": markerLayoutC,
  "Research, Extension, and Training": markerLayoutD,
  "Housing Facilities": markerLayoutE,
  "Sports and Recreational Facilities": markerLayoutF,
  Utilities: markerLayoutG,
  "Other Structures": markerLayoutH,
};

const layerControl = L.control
  .layers(baseMaps, overlayMaps, { collapsed: true })
  .addTo(map);
