var map = L.map("map").setView([15.638161, 120.418707], 14);

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

  // const popup = marker
  //   .bindPopup(
  //     `<div style='width: 200px; height: auto;'>
  //       <img src='${
  //         building.images.length > 0
  //           ? building.images[0].slice(6)
  //           : "/images/tau.png"
  //       }' class='img-fluid'/>
  //     </div>
  //     <a href='/buildings/${building._id}'>${building.name}</a>
  //     <p class='text-muted mt-0'>${building.typologies.reduce(
  //       (a, c) => `${a}/${c}`
  //     )}</p>
  //     <hr />
  //     <p>Location: ${building.location.latitude}, ${
  //       building.location.longtitude
  //     }</p>
  //     `
  //   )
  //   .openPopup();

  buildingMarkersA.push(marker);
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

  buildingMarkersB.push(marker);
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

const classC= buildings.filter(
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

  buildingMarkersC.push(marker);
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

const layout_d = L.geoJSON(Layout_D, {
  style: {
    fillColor: "#E0E038",
    fillOpacity: 0.6,
    color: "black",
  },
});
layout_d.addTo(map);

const layout_e = L.geoJSON(Layout_E, {
  style: {
    fillColor: "#D71275",
    fillOpacity: 0.6,
    color: "black",
  },
});
layout_e.addTo(map);

const layout_f = L.geoJSON(Layout_F, {
  style: {
    fillColor: "#1EEFEF",
    fillOpacity: 0.6,
    color: "black",
  },
});
layout_f.addTo(map);

const layout_g = L.geoJSON(Layout_G, {
  style: {
    fillColor: "#D20D0D",
    fillOpacity: 0.6,
    color: "black",
  },
});
layout_g.addTo(map);

const layout_h = L.geoJSON(Layout_H, {
  style: {
    fillColor: "#16E816",
    fillOpacity: 0.6,
    color: "black",
  },
});
layout_h.addTo(map);

// Layer Controllers
const baseMaps = {
  "Google Satellite": googleSat,
  OpenStreetMap: osm,
};

const overlayMaps = {
  "Administrative and Support Services": markerLayoutA,
  "Auxiliary Buildings and Production Facilities": markerLayoutB,
  "Academic Buildings": layout_c,
  "Research, Extension, and Training": layout_d,
  "Housing Facilities": layout_e,
  "Sports and Recreational Facilities": layout_f,
  Utilities: layout_g,
  "Other Structures": layout_h,
};

const layerControl = L.control
  .layers(baseMaps, overlayMaps, { collapsed: true })
  .addTo(map);
