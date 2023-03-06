var map = L.map('map').setView([15.63507941496928, 120.41506672865296],17);

var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

osm.addTo(map)


// Google map Satelite
var googleSat = L.tileLayer('http://{s}.google.com/vt?lyrs=s&x={x}&y={y}&z={z}',{
    subdomains:['mt0','mt1','mt2','mt3']
});
// googleSat.addTo(map);



var myIcon = L.icon({
    iconUrl: 'icon/icon.png',
    iconSize: [60, 60]
});


//Marker
// var marker = L.marker([15.63507941496928, 120.41506672865296],
//     {icon: myIcon,
//     title: "TAU"}
//     );
// var popup = marker.bindPopup("<img src='./icon/tau.png' width = '60px' height='60px'></img> <a href = 'youtube.com'>YOUTUBE</a>").openPopup();
// popup;

// var marker2 = L.marker([15.634461, 120.414148],
//     {
//         title: 'TAU OVAL'
//     }
//     ).bindPopup(
//         "<video controls autoplay width='300px' height= '260px'><source src = './assets/TAU_SCUAA.mp4'></source></video>"
//     ).openPopup();

// var markers = L.layerGroup([marker, marker2]);
// markers.addTo(map);

//GeoJson
var maplayout = L.geoJSON(TAU_Layout,{style:{
    fillColor: '#39DB2D',
    fillOpacity: .30,
    color: '#0B3A07',
    }
}
)
maplayout.addTo(map)

var layout_a = L.geoJSON(Layout_A,{style:{
    fillColor: 'red',
    fillOpacity: .60,
    color: 'black',
    }
}
)
layout_a.addTo(map)

var layout_b = L.geoJSON(Layout_B,{style:{
    fillColor: '#F8820B',
    fillOpacity: .60,
    color: 'black',
    }
}
)
layout_b.addTo(map)

var layout_c = L.geoJSON(Layout_C,{style:{
    fillColor: '#1111DD',
    fillOpacity: .60,
    color: 'black',
    }
}
)
layout_c.addTo(map)

var layout_d = L.geoJSON(Layout_D,{style:{
    fillColor: '#E0E038',
    fillOpacity: .60,
    color: 'black',
    }
}
)
layout_d.addTo(map)

var layout_e = L.geoJSON(Layout_E,{style:{
    fillColor: '#D71275',
    fillOpacity: .60,
    color: 'black',
    }
}
)
layout_e.addTo(map)

var layout_f = L.geoJSON(Layout_F,{style:{
    fillColor: '#1EEFEF',
    fillOpacity: .60,
    color: 'black',
    }
}
)
layout_f.addTo(map)

var layout_g = L.geoJSON(Layout_G,{style:{
    fillColor: '#D20D0D',
    fillOpacity: .60,
    color: 'black',
    }
}
)
layout_g.addTo(map)

var layout_h = L.geoJSON(Layout_H,{style:{
    fillColor: '#16E816',
    fillOpacity: .60,
    color: 'black',
    }
}
)
layout_h.addTo(map)

// Layer Controllers
var baseMaps = {
    "OpenStreetMap": osm,
    "Google Satellite": googleSat
};

var overlayMaps = {
    // 'Marker': markers,
    // 'Tau Layout': maplayout,
    'Layout A': layout_a,
    'Layout B': layout_b,
    'Layout C': layout_c,
    'Layout D': layout_d,
    'Layout E': layout_e,
    'Layout F': layout_f,
    'Layout G': layout_g,
    'Layout H': layout_h,
};


var layerControl = L.control.layers(baseMaps, overlayMaps,{collapsed: false}).addTo(map);


// EVENTS
// map.on('mousemove', function(e)
// {
//     document.getElementsByClassName('coordinate')[0].innerHTML = 'lat: '+e.latlng.lat+ "   "+ 'lng: '+ e.latlng.lng;
// })