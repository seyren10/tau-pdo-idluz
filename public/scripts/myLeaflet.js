var map = L.map("map").setView([15.638161, 120.418707], 16);

var osm = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  minZoom: 16,
  maxZoom: 20,
});
// osm.addTo(map);
// console.log(buildings);

// Google map Satelite
var googleSat = L.tileLayer(
  "http://{s}.google.com/vt?lyrs=s&x={x}&y={y}&z={z}",
  {
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
    minZoom: 16,
    maxZoom: 20,
  }
);
googleSat.addTo(map);

//GeoJson
const maplayout = L.geoJSON(TAU_Layout, {
  style: {
    weight: 3,
    fillColor: "#394B2D",
    fillOpacity: 0.5,
    color: "#0B3A07",
  },
});
maplayout.addTo(map);


map.on('zoom',()=>{
  const currentZoom = map.getZoom();
  console.log(currentZoom)

  if(currentZoom >=17){
    clusterA.options.iconCreateFunction = function (cluster){
      return L.divIcon({
        className: '',
        html: `<div class='marker-cluster a reduce'><span>${clusterLabelA}</span></div>`,
      })
    }
    clusterB.options.iconCreateFunction = function (cluster){
      return L.divIcon({
        className: '',
        html: `<div class='marker-cluster b reduce'><span>${clusterLabelB}</span></div>`,
      })
    }
    clusterC.options.iconCreateFunction = function (cluster){
      return L.divIcon({
        className: '',
        html: `<div class='marker-cluster c reduce'><span>${clusterLabelC}</span></div>`,
      })
    }
    clusterD.options.iconCreateFunction = function (cluster){
      return L.divIcon({
        className: '',
        html: `<div class='marker-cluster d reduce'><span>${clusterLabelD}</span></div>`,
      })
    }
    clusterE.options.iconCreateFunction = function (cluster){
      return L.divIcon({
        className: '',
        html: `<div class='marker-cluster e reduce'><span>${clusterLabelE}</span></div>`,
      })
    }
    clusterF.options.iconCreateFunction = function (cluster){
      return L.divIcon({
        className: '',
        html: `<div class='marker-cluster f reduce'><span>${clusterLabelF}</span></div>`,
      })
    }
    clusterG.options.iconCreateFunction = function (cluster){
      return L.divIcon({
        className: '',
        html: `<div class='marker-cluster g reduce'><span>${clusterLabelG}</span></div>`,
      })
    }
    clusterH.options.iconCreateFunction = function (cluster){
      return L.divIcon({
        className: '',
        html: `<div class='marker-cluster h reduce'><span>${clusterLabelH}</span></div>`,
      })
    }
  }
})

// #region 'Marker class A'
// Markers per classifications
let clusterLabelA = "";
const buildingMarkersA = [];
const clusterA = L.markerClusterGroup({
  iconCreateFunction: function (cluster) {
    console.dir(cluster)
    return L.divIcon({
      className: "",
      html: `<div class='marker-cluster a'><span>${clusterLabelA}</span></div>`,
    });
  },
  disableClusteringAtZoom: 18,
});


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
  <p class='text-success mb-0'>${building.classification}</p>
  <p class='mt-0'>Location: ${building.location.latitude}, ${
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
  clusterLabelA = building.location.mapLabel.slice(0,1)
  marker.setIcon(markerIcon);
  clusterA.addLayer(marker);
}
const layout_a = L.geoJSON(Layout_A, {
  style: {
    weight: .5,
    fillColor: "red",
    fillOpacity: 0.5,
    color: "black",
  },
});
const markerLayoutA = L.layerGroup([layout_a, clusterA]);
markerLayoutA.addTo(map);
//#endregion

//#region 'Building marker B'
let clusterLabelB;
const classB = buildings.filter(
  (b) => b.classification === "Auxiliary Buildings and Production Facilities"
);
const clusterB = L.markerClusterGroup({
  iconCreateFunction: function (cluster) {
    return L.divIcon({
      className: "",
      html: `<div class='marker-cluster b'><span>${clusterLabelB}</span></div>`,
    });
  },
  disableClusteringAtZoom: 18,
});
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
  <p class='text-success mb-0'>${building.classification}</p>
  <p class='mt-0'>Location: ${building.location.latitude}, ${
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
  clusterLabelB = building.location.mapLabel.slice(0,1)
  marker.setIcon(markerIcon);

  clusterB.addLayer(marker);
}

const layout_b = L.geoJSON(Layout_B, {
  style: {
    weight: .5,
    fillColor: "#F8820B",
    fillOpacity: 0.5,
    color: "black",
  },
});
const markerLayoutB = L.layerGroup([layout_b, clusterB]);
markerLayoutB.addTo(map);
//#endregion

//#region 'Building Marker C'
let clusterLabelC
const classC = buildings.filter(
  (b) => b.classification === "Academic Buildings"
);
const clusterC = L.markerClusterGroup({
  iconCreateFunction: function (cluster) {
    return L.divIcon({
      className: "",
      html: `<div class='marker-cluster c'><span>${clusterLabelC}</span></div>`,
    });
  },
  disableClusteringAtZoom: 18,
});
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
  <p class='text-success mb-0'>${building.classification}</p>
  <p class='mt-0'>Location: ${building.location.latitude}, ${
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
  clusterLabelC = building.location.mapLabel.slice(0,1)
  marker.setIcon(markerIcon);


  clusterC.addLayer(marker);
}

const layout_c = L.geoJSON(Layout_C, {
  style: {
    weight: .5,
    fillColor: "#1111DD",
    fillOpacity: 0.5,
    color: "black",
  },
});
const markerLayoutC = L.layerGroup([layout_c, clusterC]);
markerLayoutC.addTo(map);
//#endregion

//#region 'Building Marker D'
let clusterLabelD
const classD = buildings.filter(
  (b) => b.classification === "Research, Extension, and Training"
);
const clusterD = L.markerClusterGroup({
  iconCreateFunction: function (cluster) {
    return L.divIcon({
      className: "",
      html: `<div class='marker-cluster d'><span>${clusterLabelD}</span></div>`,
    });
  },
  disableClusteringAtZoom: 18,
});
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
  <p class='text-success mb-0'>${building.classification}</p>
  <p class='mt-0'>Location: ${building.location.latitude}, ${
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
  clusterLabelD = building.location.mapLabel.slice(0,1)
  marker.setIcon(markerIcon);

  clusterD.addLayer(marker);
}
const layout_d = L.geoJSON(Layout_D, {
  style: {
    weight: .5,
    fillColor: "#E0E038",
    fillOpacity: 0.5,
    color: "black",
  },
});

const markerLayoutD = L.layerGroup([layout_d, clusterD]);
markerLayoutD.addTo(map);

//#endregion

//#region 'Building Marker E'
let clusterLabelE
const classE = buildings.filter(
  (b) => b.classification === "Housing Facilities"
);
const clusterE = L.markerClusterGroup({
  iconCreateFunction: function (cluster) {
    return L.divIcon({
      className: "",
      html: `<div class='marker-cluster e'><span>${clusterLabelE}</span></div>`,
    });
  },
  disableClusteringAtZoom: 18,
});
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
  <p class='text-success mb-0'>${building.classification}</p>
  <p class='mt-0'>Location: ${building.location.latitude}, ${
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
  clusterLabelE = building.location.mapLabel.slice(0,1)
  marker.setIcon(markerIcon);

  clusterE.addLayer(marker);
}

const layout_e = L.geoJSON(Layout_E, {
  style: {
    weight: .5,
    fillColor: "#D71275",
    fillOpacity: 0.5,
    color: "black",
  },
});
const markerLayoutE = L.layerGroup([layout_e, clusterE]);
markerLayoutE.addTo(map);
//#endregion

//#region 'Building Marker F'
let clusterLabelF
const classF = buildings.filter(
  (b) => b.classification === "Sports and Recreational Facilities"
);
const clusterF = L.markerClusterGroup({
  iconCreateFunction: function (cluster) {
    return L.divIcon({
      className: "",
      html: `<div class='marker-cluster f'><span>${clusterLabelF}</span></div>`,
    });
  },
  disableClusteringAtZoom: 18,
});
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
  <p class='text-success mb-0'>${building.classification}</p>
  <p class='mt-0'>Location: ${building.location.latitude}, ${
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
  clusterLabelF = building.location.mapLabel.slice(0,1)
  marker.setIcon(markerIcon);


  clusterF.addLayer(marker);
}
const layout_f = L.geoJSON(Layout_F, {
  style: {
    weight: .5,
    fillColor: "#1EEFEF",
    fillOpacity: 0.5,
    color: "black",
  },
});
const markerLayoutF = L.layerGroup([layout_f, clusterF]);
markerLayoutF.addTo(map);

//#endregion

//#region 'Building Marker G'
let clusterLabelG
const classG = buildings.filter((b) => b.classification === "Utilities");
const clusterG = L.markerClusterGroup({
  iconCreateFunction: function (cluster) {
    return L.divIcon({
      className: "",
      html: `<div class='marker-cluster g'><span>${clusterLabelG}</span></div>`,
    });
  },
  disableClusteringAtZoom: 18,
});
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
  <p class='text-success mb-0'>${building.classification}</p>
  <p class='mt-0'>Location: ${building.location.latitude}, ${
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
  clusterLabelG = building.location.mapLabel.slice(0,1)
  marker.setIcon(markerIcon);

  clusterG.addLayer(marker);
}
const layout_g = L.geoJSON(Layout_G, {
  style: {
    weight: .5,
    fillColor: "#D20D0D",
    fillOpacity: 0.5,
    color: "black",
  },
});
const markerLayoutG = L.layerGroup([layout_g, clusterG]);
markerLayoutG.addTo(map);
//#endregion

//#region 'Building Marker H'
let clusterLabelH
const classH = buildings.filter((b) => b.classification === "Other Structures");
const clusterH = L.markerClusterGroup({
  iconCreateFunction: function (cluster) {
    return L.divIcon({
      className: "",
      html: `<div class='marker-cluster h'><span>${clusterLabelH}</span></div>`,
    });
  },
  disableClusteringAtZoom: 18,
});
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
  <p class='text-success mb-0'>${building.classification}</p>
  <p class='mt-0'>Location: ${building.location.latitude}, ${
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
  clusterLabelH = building.location.mapLabel.slice(0,1)
  marker.setIcon(markerIcon);

  clusterH.addLayer(marker);
}
const layout_h = L.geoJSON(Layout_H, {
  style: {
    weight: .5,
    fillColor: "#16E816",
    fillOpacity: 0.5,
    color: "black",
  },
});
const markerLayoutH = L.layerGroup([layout_h, clusterH]);
markerLayoutH.addTo(map);
//#endregion

clusterA.addTo(map);
clusterB.addTo(map)
clusterC.addTo(map)
clusterD.addTo(map)
clusterE.addTo(map)
clusterF.addTo(map)
clusterG.addTo(map)
clusterH.addTo(map)
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
