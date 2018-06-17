var map;
var markersArray = [];
var styles = [{
    featureType: 'water',
    stylers: [{
        color: '#19a0d8'
    }]
}, {
    featureType: 'administrative',
    elementType: 'labels.text.stroke',
    stylers: [{
            color: '#ffffff'
        },
        {
            weight: 6
        }
    ]
}, {
    featureType: 'administrative',
    elementType: 'labels.text.fill',
    stylers: [{
        color: '#e85113'
    }]
}, {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{
            color: '#efe9e4'
        },
        {
            lightness: -40
        }
    ]
}, {
    featureType: 'transit.station',
    stylers: [{
            weight: 9
        },
        {
            hue: '#e85113'
        }
    ]
}, {
    featureType: 'road.highway',
    elementType: 'labels.icon',
    stylers: [{
        visibility: 'off'
    }]
}, {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{
        lightness: 100
    }]
}, {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{
        lightness: -100
    }]
}, {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{
            visibility: 'on'
        },
        {
            color: '#f0e4d3'
        }
    ]
}, {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [{
            color: '#efe9e4'
        },
        {
            lightness: -25
        }
    ]
}];

var center = {
    lat: 19.2371877,
    lng: 72.8441358
};

function initMap() {


    map = new google.maps.Map(document.getElementById('map'), {
        center: center,
        zoom: 15,
        styles: styles,
        mapTypeControl: false
    });
    if ($(window).width() <= 1080) {
        map.setZoom(14);
    }

    setMarkers(markers);

    setMap();

    function resetMap() {
        var windowWidth = $(window).width();
        if (windowWidth <= 1080) {
            map.setZoom(14);
            map.setCenter(center);
        } else if (windowWidth > 1080) {
            map.setZoom(15);
            map.setCenter(center);
        }
    }
    $("#resetBtn").click(function() {
        resetMap();
    });
    $(window).resize(function() {
        resetMap();
    });
}

function setMap() {
    for (var i = 0; i < markers.length; i++) {
        if (markers[i].boolTest === true) {
            markers[i].holdMarker.setMap(map);
        } else {
            markers[i].holdMarker.setMap(null);
        }
    }
}

var markers = [{
        title: 'Danish Home',
        lat: 19.23826145179607,
        lng: 72.84666780531006,
        id: "loc1",
        visible: ko.observable(true),
        boolTest: true
    },
    {
        title: 'Flora vin',
        lat: 19.23811963592362,
        lng: 72.8360677152832,
        id: "loc2",
        visible: ko.observable(true),
        boolTest: true
    },
    {
        title: 'Kutchi Ground',
        lat: 19.23625575878671,
        lng: 72.83898595869141,
        id: "loc3",
        visible: ko.observable(true),
        boolTest: true
    },
    {
        title: 'Staff Colony',
        lat: 19.232325339825366,
        lng: 72.83229116499024,
        id: "loc4",
        visible: ko.observable(true),
        boolTest: true
    },
    {
        title: 'Annaya Hosing',
        lat: 19.23167701425759,
        lng: 72.84791235029297,
        id: "loc5",
        visible: ko.observable(true),
        boolTest: true
    }
];

function setMarkers(location) {
    var defaultIcon = makeMarkerIcon('0091ff');
    for (i = 0; i < location.length; i++) {
        location[i].holdMarker = new google.maps.Marker({
            position: new google.maps.LatLng(location[i].lat, location[i].lng),
            map: map,
            title: location[i].title,
            icon: defaultIcon,
            shape: {
                coords: [1, 25, -40, -25, 1],
                type: 'poly'
            }
        });

        location[i].contentString = '' +
            location[i].title + '</strong><br><p>';

        var infowindow = new google.maps.InfoWindow({
            content: markers[i].contentString
        });

        new google.maps.event.addListener(location[i].holdMarker, 'click', (function(marker, i) {
            return function() {
                infowindow.setContent(location[i].contentString);
                infowindow.open(map, this);
                var windowWidth = $(window).width();
                if (windowWidth <= 1080) {
                    map.setZoom(15);
                } else if (windowWidth > 1080) {
                    map.setZoom(16);
                }
                map.setCenter(marker.getPosition());
                location[i].picBoolTest = true;
            };
        })(location[i].holdMarker, i));

        var locList = $('#loc' + (i + 1));
        locList.click((function(marker, i) {
            return function() {
                infowindow.setContent(location[i].contentString);
                infowindow.open(map, marker);
                map.setZoom(16);
                map.setCenter(marker.getPosition());
                location[i].picBoolTest = true;
            };
        })(location[i].holdMarker, i));
    }
}

function makeMarkerIcon(markerColor) {
    var markerImage = new google.maps.MarkerImage(
        'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor +
        '|40|_|%E2%80%A2',
        new google.maps.Size(21, 34),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 34),
        new google.maps.Size(21, 34));
    return markerImage;
}

var viewModel = {
    query: ko.observable(''),
};

viewModel.markers = ko.dependentObservable(function() {
    var self = this;
    var search = self.query().toLowerCase();
    return ko.utils.arrayFilter(markers, function(marker) {
        if (marker.title.toLowerCase().indexOf(search) >= 0) {
            marker.boolTest = true;
            return marker.visible(true);
        } else {
            marker.boolTest = false;
            setMap();
            return marker.visible(false);
        }
    });
}, viewModel);

ko.applyBindings(viewModel);

$("#input").keyup(function() {
    setMap();
});
function optionBox(){
	$('#options_box').toggle(function () {
	    $("#options_box").css({display: "block"});
	}, function () {
	    $("#options_box").css({display: "none"});
	});
}
function myFunction(x) {
	var a = document.getElementById("options_box");
    x.classList.toggle("change");
	a.classList.toggle("display");
}

// Window resize source: https://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_event_resize
$(window).resize(function() {
    var windowWidth = $(window).width();
    if ($(window).width() < 600) {
        $("#options_box").removeClass("display");
    } else if ($(window).width() > 599) {
	        $("#options_box").addClass("display");
    }
});
