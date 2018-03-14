$(document).ready(function () {

  var map;
  var myLatLng = {lat: -25.363, lng: 131.044};
  var Loaded = false;
  var FLIGHT_ID_FINAL , PASSENGER_ID;
  var BOOKING_INFO;
  var BookingFormFinal = document.getElementById('Qfinal-submit');
  BookingFormFinal.addEventListener("click" , myCard);


  function initMap(data) {

    var srclat = parseFloat(data[0][10]);
    var srclng = parseFloat(data[0][11]);

    var dstlat = parseFloat(data[0][14]);
    var dstlng = parseFloat(data[0][15]);



    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 25.046329, lng: 55.399355},
      zoom: 2
    });

    var flightPlanCoordinates = [
      {lat: srclat, lng: srclng},
      {lat: dstlat, lng: dstlat}
    ];
    console.log(flightPlanCoordinates);
    for(var i=0 ; i < flightPlanCoordinates.length ; i++){
      var marker = new google.maps.Marker({
        position: flightPlanCoordinates[i],
        map: map,
        title: 'Hello World!'
     });
    }

      var flightPath = new google.maps.Polyline({
      path: flightPlanCoordinates,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 3
    });

    flightPath.setMap(map);
    
  }

var BookingShow = document.getElementById('btncamera').addEventListener("click", function () {
	// body...
	console.log("Clicked");
	// initMap();
	var Departure = document.querySelector('#Book_ID').value;
	if (Departure == "") {return;}
  if(Loaded){return;}
	var getFromDb="v1/index.php?destination=&source=&Departure="+Departure;
   var Obj;
   xmlhttp = new XMLHttpRequest();
   
   var flightresponse;
  	xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    	
    	flightresponse = this.responseText;
      console.log(flightresponse);
   		SHowBookingDetails(flightresponse, Departure );
      Loaded = true;
      }
  	};
   xmlhttp.open("GET", getFromDb, true);

   xmlhttp.send();

});

document.getElementById('Book_ID').addEventListener("click", function () {
  // body...
  Loaded = false;
})

document.getElementById('cancelbooking').addEventListener("click", Cancelbooking);
 

function Cancelbooking() {
  // body...
   var PosttoDb="v1/cancel.php";
  var data= new FormData();

  data.append('Book_ID', BOOKING_INFO[0][0]);
  data.append('Name',BOOKING_INFO[0][5]);
  data.append('Email',BOOKING_INFO[0][6]);
  data.append('Status',BOOKING_INFO[0][7]);
  data.append('SrcAirport',BOOKING_INFO[0][9]);
  data.append('DstAirport',BOOKING_INFO[0][13]);
  data.append('Flight_ID',BOOKING_INFO[0][16]);
  data.append('Amount', BOOKING_INFO[0][19]);
  data.append('Payment_ID', BOOKING_INFO[0][20]);

  console.log(" Cancel_Booking ");

  xmlhttp = new XMLHttpRequest();
     
    xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText+"   Posted   ......");
      location.reload();
    }
    };
    xmlhttp.open("POST", PosttoDb , true);

    xmlhttp.send(data);
    alert("Your Booking will be deleted");
}

 
function SHowBookingDetails(responseText , Book_ID) {
	// body...
	var data = JSON.parse(responseText);
	console.log(data);
	// document.getElementById('manage').style.display = "none";
  BOOKING_INFO = data;
  initMap(data);
  var Boarding ; 
  var departureTime = data[0][3].split(" ")[1].split(":");
  var deptDate = data[0][3].split(" ")[0];
  PASSENGER_ID = data[0][4];
  var arr = {
      "January": 01,
      "February": 02,
      "March": 03,
      "April": 04,
      "May": 05,
      "June": 06,
      "July": 07,
      "August": 08,
      "September": 09,
      "October": 10,
      "November": 11,
      "December": 12
    };


  if(parseInt(departureTime[1]) == 0){
    var hr = parseInt(departureTime[0]) - 1
    if(hr <10){
      Boarding = "0"+hr+"30";
    }
    else{
      Boarding = hr+"30";
    }
  }
  else if(parseInt(departureTime[1]) <30 ){
    var hr = parseInt(departureTime[0]) - 1
    if(hr <10){
      Boarding = "0"+hr+"30";
    }
    else{
      Boarding = hr+"30";
    }
  }
  else{
    var min = parseInt(departureTime[1]) - 30
    var hr = parseInt(departureTime[0])

    if(hr <10){
      Boarding = "0"+hr+""+min;
    }
    else{
      Boarding = hr+""+min;
    } 
  }
  var Class;
  if(parseInt(data[0][17]) == 1){
    Class = "Ecomony";
  }
  else if(parseInt(data[0][17]) == 2){
    Class = "Business";
  }
  else{
    Class = "First Class";
  }
  document.getElementById('detail').style.display = 'block';
  document.getElementById('payment_status').textContent = data[0][7];
  if(data[0][7] == "PAID"){
    document.getElementById('anim').style.display = 'none';
  }
  else{
    document.getElementById('anim').style.display = 'block';

  }
  document.getElementById('srcC').textContent = (data[0][8]);
  document.getElementById('dstC').textContent = (data[0][12]);


  document.getElementById('MpassengerName').textContent = (data[0][5]);
  document.getElementById('usernam').textContent = (data[0][5])+", Hi";

  document.getElementById('Mdeparture').textContent = deptDate;
  document.getElementById('Marrival').textContent = (data[0][2].split(" ")[0]);
  document.getElementById('MsrcCode').textContent = (data[0][8]);
  document.getElementById('MsrcAirport').textContent = (data[0][9]);
  document.getElementById('MdstCode').textContent = (data[0][12]);
  document.getElementById('MdstAirport').textContent = (data[0][13]);
  document.getElementById('MFlight').textContent = (data[0][16]);
  FLIGHT_ID_FINAL = data[0][16];
  PASSPORT = data[0][18];
  document.getElementById('MClass').textContent = Class;
  document.getElementById('MBoard').textContent = Boarding;

  var active = $('.active'),
  firstTab = $('.tab:nth-child(1)'),
  secondTab = $('.tab:nth-child(2)'),
  thirdTab = $('.tab:nth-child(3)'),
  yellowBg= $('.yellow'),
  blueBg = $('.selb'),
  snap = $('.snap'),
  manage = $('#manage'),
  sort = $('.sort');



  active.animate({
      left:'20%'
    });
    secondTab.animate({
      marginTop:'50px'
    });
    yellowBg.animate({
      right:'-100%'
    });
    blueBg.animate({
      left:'0'
    });
    $('.camera').animate({
      left:'17%'
    });
    snap.animate({
      // padding:'0 40px 0 40px'
    });
    sort.animate({
      marginLeft:'20px'
    });
    manage.animate({
      marginLeft: '2000px'

    });

}

function myCard() {

  var PosttoDb="v1/payment.php";

  var card1 = document.querySelector('#Qcard-number').value;
  var card2 = document.querySelector('#Qcard-number-1').value;
  var card3 = document.querySelector('#Qcard-number-2').value;
  var card4 = document.querySelector('#Qcard-number-3').value;
  var card4 = document.querySelector('#Qcard-number-3').value;
  var cardholder = document.querySelector('#Qcard-holder').value;
  var month = document.querySelector('#Qcard-expiration-month').value;
  var Year = document.querySelector('#Qcard-expiration-year').value;
  var Expire = (Year+"-"+month+"-1");
  // console.log(year"-"+month+"-1");
  var ccv = document.querySelector('#Qcard-ccv').value;

  var creditcard = card1+card2+card3+card4;

  var data= new FormData();

  data.append('CreditCard',creditcard);
  data.append('CardHolder',cardholder);
  data.append('CCV',ccv);
  data.append('Expire',Expire);
  data.append('PassportNumber',PASSPORT);
  data.append('Flight_ID',FLIGHT_ID_FINAL);
  data.append('Book_ID',BOOKING_INFO[0][0] );

  console.log(creditcard+" "+cardholder+" "+ccv);

  xmlhttp = new XMLHttpRequest();
     
    xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText+"   Posted   ......");
       location.reload();
        // location.href = "Payment.html?FLIGHT_ID_FINAL="+FLIGHT_ID_FINAL+"&Passport="+PASSPORT;
    }
  };
    xmlhttp.open("POST", PosttoDb , true);

    xmlhttp.send(data);
    // swal("Success", "Your Payment has been processed successfully.", "Success");
    alert("Payment Complete");
 // 

}


$('.q').on('keyup change', function(){
  $t = $(this);
  
  if ($t.val().length > 3) {
    $t.next().focus();
  }
  
  var card_number = '';
  $('.q').each(function(){
    card_number += $(this).val() + ' ';
    if ($(this).val().length == 4) {
      $(this).next().focus();
    }
  })
  
  $('#numq').html(card_number);
});


$('#Qcard-holder').on('keyup change', function(){
  $t = $(this);
  $('.credit-card-box .qholder div').html($t.val());
});

$('#Qcard-expiration-month').on('keyup change', function(){
  $t = $(this);
  // $('.credit-card-box .qholder div').html($t.val());
  console.log($t.val());
  $('.qexp div').html($t.val());
});

$('#Qcard-expiration-year').on('keyup change', function(){
  $t = $(this);
  // $('.credit-card-box .qholder div').html($t.val());
  console.log($('.qexp div').html());
  var str= $('.qexp div').html()+ $t.val();
  $('.qexp div').html(str);  

});


// $('#Qcard-expiration-month, #Qcard-expiration-year').change(function(){
//   m = $('#Qcard-expiration-month option').index($('#Qcard-expiration-month option:selected'));
//   m = (m < 10) ? '0' + m : m;
//   y = $('#Qcard-expiration-year').val().substr(2,2);
//   $('.qexp div').html(m + '/' + y);
// })

$('#Qcard-ccv').on('focus', function(){
  $('.credit-card-box').addClass('hover');
}).on('blur', function(){
  $('.credit-card-box').removeClass('hover');
}).on('keyup change', function(){
  $('.qccv div').html($(this).val());
});


/*--------------------
CodePen Tile Preview
--------------------*/
setTimeout(function(){
  $('#card-ccv').focus().delay(1000).queue(function(){
    $(this).blur().dequeue();
  });
}, 500);



})
