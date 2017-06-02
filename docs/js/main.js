$(document).ready(function() {
  $('#time').periodpicker({
    lang: 'ru',
    norange: true, // use only one value
    cells: [1, 1],
    clearButtonInButton: true,
    timepicker: true, // use timepicker
    timepickerOptions: {
      hours: true,
      minutes: true,
      seconds: false,
      ampm: true
    },

    onAfterHide: function() {
      ['hours', 'minutes', 'hours12', 'date'].forEach(function(item) {
        element = document.getElementById(item);
        element.value = splitDateToFields('time')[item];
      });
    }
  });

  $('.call').on('click', function(){
    $('.heading__form').text('Оставьте заявку на обратный звонок');
    $('.goal').val('Оставьте заявку на обратный звонок')
  });
  $('.cons').on('click', function(){
    $('.heading__form').text('Оставьте заявку на консультацию');
    $('.goal').val('Оставьте заявку на консультацию')
  });
  $('').text()
  $('.dynamic_inputs').each(function() { $(this).val(findUtms(this.dataset.utm)) });


  $(".order-review").on('click', function (e) {
      e.preventDefault();
      $(".new__review .item:hidden").slice(0, 1).slideDown();
      if ($(".new__review .item:hidden").length == 0) {
          $(".order-review").hide();
      }
  });
  $(".order__case").on('click', function (e) {
      e.preventDefault();
      $(".new__case .item:hidden").slice(0, 1).slideDown();
      if ($(".new__case .item:hidden").length == 0) {
          $(".order__case").hide();
      }
  });
   $(".price__order").on('click', function (e) {
      e.preventDefault();
      $(".new__tr .item:hidden").slice(0, 4).slideDown();
      if ($(".new__tr .item:hidden").length == 0) {
          $(".price__order").hide();
      }
  });

  $(window).resize(function() {
    slideout.close();
  });

  $('.services__list li').on('click', function(){
    var image  = $(this).data('image');
    var text = $(this).data('text');
    $('.services img').attr('src', image);
    $('.services p').text(text);
  });
});


//SlideOut
var slideout = new Slideout({
  'panel': document.getElementById('panel'),
  'menu': document.getElementById('menu'),
  'padding': 256,
  'tolerance': 70
});
document.querySelector('.toggle-menu').addEventListener('click', function() {
  slideout.toggle();
});
gumshoe.init();

function initMap() {
  var map;
  var bounds = new google.maps.LatLngBounds();
  var mapOptions = {
      mapTypeId: 'roadmap'
  };
                  
  // Display a map on the page
  map = new google.maps.Map(document.getElementById("map"), mapOptions);
  map.setTilt(45);
      
  // Multiple Markers
  var markers = [
      ['Puustellinrinne 3, Helsinki, Finnland', 60.2477494,24.8618071],
      ['Luodontie 6, Pori, Finnland', 61.4686045,21.8635021],
      ['Hannikaisenkatu 11-13, Jyväskylä, Finnland', 62.2380455,25.7458288],
      ['Tullikatu 6, Tampere, Finnland', 61.4973324,23.7770237],
      ['Luodontie 6, Pori, Finnland', 59.4243996,24.7263591]
  ];
                      
  // Info Window Content
      
  // Display multiple markers on a map
  var infoWindow = new google.maps.InfoWindow(), marker, i;
  
  // Loop through our array of markers & place each one on the map  
  for( i = 0; i < markers.length; i++ ) {
      var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
      bounds.extend(position);
      marker = new google.maps.Marker({
          position: position,
          map: map,
          title: markers[i][0]
      });
      
      // Allow each marker to have an info window    
      google.maps.event.addListener(marker, 'click', (function(marker, i) {
          return function() {
              infoWindow.setContent(infoWindowContent[i][0]);
              infoWindow.open(map, marker);
          }
      })(marker, i));

      // Automatically center the map fitting all markers on the screen
      map.fitBounds(bounds);
  }

  // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
  var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
      this.setZoom(6);
      google.maps.event.removeListener(boundsListener);
  });

  
}

// Map Big
var button = document.querySelector('#map__order');
button.addEventListener('click', function(event) {
    var target = document.querySelector(button.getAttribute('data-target'));
    if (target.style.marginTop !== "-57px") {
        target.style.marginTop = "-57px";
        button.innerHTML = button.getAttribute('data-shown-text');
    } else {
        target.style.marginTop = "-350px";
        button.innerHTML = button.getAttribute('data-hidden-text');
    }
});

//Slider
var swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    paginationClickable: true
});

var modalCallBack = new tingle.modal();
modalCallBack.setContent(document.querySelector('.call--back--modal').innerHTML);
var hang = new tingle.modal();
hang.setContent(document.querySelector('.hang').innerHTML);


//Ajax отправка формы
document.querySelectorAll('form').forEach(function(item) {
item.addEventListener('submit', function(event) {
  sendAjaxForm(this, event);
})});
function sendAjaxForm(form, event) {
  var fields = form.querySelectorAll('input, textarea')

  var formHasError =  Array.prototype.reduce.call(fields, function(invalidCount, currentItem) {
    if (currentItem.matches(':invalid')) invalidCount++;
  }, 0);

  if (formHasError) {
    return true;
  } else {
    event.preventDefault();

    var formData = new FormData(form);
    var xhr = new XMLHttpRequest();

    xhr.open('POST', 'send.php');
    xhr.onreadystatechange = function() {
      if ((xhr.readyState == 4) && (xhr.status == 200)) {
        data = xhr.responseText;
        form.outerHTML = '<div style="display: flex; flex-direction: column; height: 100%;"><h3 style="color: #000; text-align: center; margin-top: auto">Спасибо, ваша заявка отправлена</h3><p style="color: #000; text-align: center; margin-bottom: auto;">Наши менеджеры свяжутся с вами в течение дня</p></div>';
      }
    }
    xhr.send(formData);

    return false;
  }
} 

function checkMandatory() {
  for(i=0;i<mndFileds.length;i++) {
    var fieldObj=document.forms['WebToLeads2095140000000141078'][mndFileds[i]];
    if(fieldObj) {
    if (((fieldObj.value).replace(/^\s+|\s+$/g, '')).length==0) {
     if(fieldObj.type =='file')
      { 
       alert('Выберите файл для отправки.'); 
       fieldObj.focus(); 
       return false;
      } 
    alert(fldLangVal[i] +' не может быть пустым.'); 
            fieldObj.focus();
            return false;
    }  else if(fieldObj.nodeName=='SELECT') {
           if(fieldObj.options[fieldObj.selectedIndex].value=='-None-') {
      alert(fldLangVal[i] +' не может отсутствовать.'); 
      fieldObj.focus();
      return false;
       }
    } else if(fieldObj.type =='checkbox'){
     if(fieldObj.checked == false){
      alert('Please accept  '+fldLangVal[i]);
      fieldObj.focus();
      return false;
       } 
     } 
     try {
         if(fieldObj.name == 'Last Name') {
      name = fieldObj.value;
        }
    } catch (e) {}
      }
  }
}

function splitDateToFields(id) {
  value = jQuery('#' + id).periodpicker('valueStringStrong');

  if (!value) {
    return {
      'hours':   '',
      'minutes': '',
      'hours12': '',
      'date':    ''
    }
  }
  var d = new Date(jQuery('#' + id).periodpicker('valueStringStrong'));

  var minutes, hours, hours12;

  time = d.toLocaleTimeString('en-US', {
    hour12: true,
    hour: "numeric",
    minute: "numeric"
  });

  hours   = time.split(/[\s:]+/)[0];
  minutes = time.split(/[\s:]+/)[1];
  hours12 = time.split(/[\s:]+/)[2];

  date = d.toLocaleDateString();

  return {
    'hours':   hours,
    'minutes': minutes,
    'hours12': hours12,
    'date':    date
  }
}
function findUtms(value) {
    var querystring = document.location.search;
    if (!querystring) {
      return undefined;
    }
    // remove leading ?
    querystring = querystring.substring(1);
    querystring = querystring.split('&');

    var utms = {};
    for (var i = 0; i < querystring.length; i++) {
      var part = querystring[i];
      if (part && part.length > 4 && part.startsWith("utm_")) {
        var keyValue = part.split("=");
        if (keyValue.length > 1) {
          utms[keyValue[0].substring(4)] = keyValue[1];
        }
      }
    }
    return utms[value]
  }
