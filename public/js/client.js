var input = document.getElementById('address');
var markers = [];
var map;
var mapOptions;
let typeHome = 'Casa';
const mapDraw = $('#map');
// DOM selectore
const referencias = $('#referencias');
const userAddres = $('#address');
const sendInfo = $('#send');
const inputMap = $('#inputMap');
const inputReferences = $('#inputReferences');
const inpuNumDpto = $('#inputNumDpto');
const inputType = $('#inputType');
const limit = $('#inputLimit');
// Validación de input
let validateInputAddress = false;
let validateType = false;
let validateReferences = false;

// Inicializando variables
var validateLimit = false;

function initMap() {


  mapOptions = {
    zoom: 14,
    center: new google.maps.LatLng(-12.08451, -77.05127),
    mapTypeId: 'terrain'
  };

 
  inputAddress();
  var mapLimit = new google.maps.Polygon({
    paths: [
      new google.maps.LatLng(-12.06518, -77.04526),
      new google.maps.LatLng(-12.07513, -77.05382),
      new google.maps.LatLng(-12.07261, -77.05709),
      new google.maps.LatLng(-12.07205, -77.05864),
      new google.maps.LatLng(-12.07154, -77.06069),
      new google.maps.LatLng(-12.07165, -77.06146),
      new google.maps.LatLng(-12.07261, -77.06166),
      new google.maps.LatLng(-12.07297, -77.062),
      new google.maps.LatLng(-12.07305, -77.06201),
      new google.maps.LatLng(-12.08127, -77.06646),
      new google.maps.LatLng(-12.08304, -77.06724),
      new google.maps.LatLng(-12.08413, -77.06484),
      new google.maps.LatLng(-12.0854, -77.06433),
      new google.maps.LatLng(-12.08657, -77.06289),
      new google.maps.LatLng(-12.08669, -77.06229),
      new google.maps.LatLng(-12.08802, -77.06032),
      new google.maps.LatLng(-12.09326, -77.05293),
      new google.maps.LatLng(-12.09529, -77.05432),
      new google.maps.LatLng(-12.09797, -77.05565),
      new google.maps.LatLng(-12.09915, -77.05296),
      new google.maps.LatLng(-12.09885, -77.0497),
      new google.maps.LatLng(-12.0984, -77.04907),
      new google.maps.LatLng(-12.09964, -77.04301),
      new google.maps.LatLng(-12.09872, -77.04187),
      new google.maps.LatLng(-12.09543, -77.04005),
      new google.maps.LatLng(-12.0934, -77.04032),
      new google.maps.LatLng(-12.09374, -77.0439),
      new google.maps.LatLng(-12.08309, -77.04493),
      new google.maps.LatLng(-12.08324, -77.04369),
      new google.maps.LatLng(-12.08288, -77.04189),
      new google.maps.LatLng(-12.07976, -77.04166),
      new google.maps.LatLng(-12.07975, -77.04247),
      new google.maps.LatLng(-12.07677, -77.04207),
      new google.maps.LatLng(-12.07448, -77.04197),
      new google.maps.LatLng(-12.0691, -77.03963),
      new google.maps.LatLng(-12.06508, -77.03904),
      new google.maps.LatLng(-12.06508, -77.03904),
      new google.maps.LatLng(-12.06518, -77.04526)

    ],

  });
  //mapLimit.setMap(map);
  var button = document.getElementById('search');

  button.addEventListener('click', function () {
    mapDraw.css('height', '35vh');
    $('main').css('height','75vh');
    $('footer').css('height','5vh');
    var text = $('#address').val();
    inputMap.val(userAddres.val());
    deleteMarkers()
    $.ajax({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(text)},Peru&key=AIzaSyA7YnCgF_fr5JpSoRsZZ5C9_YvooKa62Jc`,
      success: function (respuesta) {
        // ubicacion a validar
        var point = new google.maps.LatLng(respuesta.results[0].geometry.location.lat, respuesta.results[0].geometry.location.lng);
        addMarker(point);

        if (google.maps.geometry.poly.containsLocation(point, mapLimit)) {
          validateLimit = true;
          validateInputAddress = true;
          console.log('esta dentro de los limites');
          limit.val(validateLimit)
        } else {
          validateLimit = false;
          validateInputAddress = true;
          console.log('No se encuentra dentro de los limites');
          limit.val(validateLimit)
        }
      },
      error: function () {
        console.log("No se ha podido obtener la información");
      }
    });


  });



}

// Autocompletado input
function inputAddress() {
  var autocompleteorigin = new google.maps.places.Autocomplete(input);
  var marker = new google.maps.Marker({
    map: map,
    anchorPoint: new google.maps.Point(0, -29),
    icon: 'https://user-images.githubusercontent.com/32285482/43907999-74c95c46-9bbc-11e8-8545-3c324d913e9a.png'
  });
  autocompleteorigin.setFields(
    ['address_components', 'geometry', 'icon', 'name']);
  var infowindow = new google.maps.InfoWindow();
  var infowindowContent = document.getElementById('infowindow-content');
  infowindow.setContent(infowindowContent);



}






//Agregando marcadores al mapa
function addMarker(location) {
  mapOptions = {
    zoom: 16,
    center: location,
    mapTypeId: 'terrain'
  };
  map = new google.maps.Map(document.getElementById('map'),
    mapOptions);
  var marker = new google.maps.Marker({
    position: location,
    draggable: true,
    map: map,
    icon: 'https://user-images.githubusercontent.com/32285482/43907999-74c95c46-9bbc-11e8-8545-3c324d913e9a.png'
  });
  markers.push(marker);
}
// enviando marcadores en el mapa
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}
// Funciones para limpiar marcadores
function clearMarkers() {
  setMapOnAll(null);
}
// Muestra y borra marcodores
function showMarkers() {
  setMapOnAll(map);
}

function deleteMarkers() {
  clearMarkers();
  markers = [];
}

/**Valores de Input Radio Button */

$('#radiotipo input').on('change', function () {
  typeHome = $('input[name=tipo]:checked', '#radiotipo').val();

  if (typeHome == 'Departamento') {
    $('main').css('height','80vh');
    showNumDpto();
    validateType = true;
    activeButton();
    inputType.val(typeHome);
  } else if (typeHome == 'Casa') {
    inputType.val(typeHome);
    validateType = true;
    $('main').css('height','75vh');
    activeButton();
    $('#box-dpto-number').empty();
  } else {
    validateType = false;
    desactiveButton();
  }
});

// Función que muestra y oculta el input de num de dpto
function showNumDpto() {
  let template = ` <div class="container">
                      <div class="row">
                         <div class="col-6 offset-5 pb-2">
                            <span>Número</span>
                            <input type="text" class="num-dpto style-input number-dpto" name="numdpto">
                        </div>
  
                      </div>
                    
                  </div>`;

  $('#box-dpto-number').append(template);
}



$('#referencias').on('keyup', function () {
  if ($('#referencias').val()) {
    validateReferences = true;
    inputReferences.val(referencias.val());
    activeButton();
  } else {
    validateReferences = false;
    desactiveButton();
  }
});


$(document).on('keyup', '.num-dpto', function () {
  inpuNumDpto.val($('.num-dpto').val());
});

function activeButton() {
  if (validateInputAddress && validateReferences && validateType) {
    sendInfo.attr('disabled', false);
    sendInfo.removeClass('btn-desactive');

  }
}

function desactiveButton() {
  sendInfo.attr('disabled', 'disabled');
  sendInfo.addClass('btn-desactive');
}

desactiveButton();