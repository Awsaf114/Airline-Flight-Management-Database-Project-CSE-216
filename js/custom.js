// *************************************************
	// Booking and Scheduling
// *************************************************

$(document).ready(function () {

// Some global variables for form submission
var returnFlag = false,
	payLater = false,
	FLIGHT_ID_FINAL = 0,
	FLIGHT_ID_RETURN = 0,
	TOTAL_PRICE_LEAVE = 0,
	TOTAL_PRICE_RETURN = 0,
	PASSPORT, 
	EXISTING_PASS,
	FLIGHT_DAY_RET,
	FLIGHT_DAY,
	FLIGHT_DAY_RET_TIME,
	FLIGHT_DAY_TIME,
	AIRPORT_DATA,
	countrydata,
	BOOKING_DEP_AIRPORT_SRC,
	BOOKING_DEP_AIRPORT_DST,
	BOOKING_RET_AIRPORT_SRC,
	BOOKING_RET_AIRPORT_DST,
	DEP_CATA,
	RET_CATA,
	DISC;

//Number of passengers
var Adult =1, Child =0, Infant=0 ;


var BookingForm = document.getElementById('BookingForm');
var BookingFormFinal = document.getElementById('final-submit');

var BookingShow = document.getElementById('booking').addEventListener("click", bookingclicked);

 BookingForm.addEventListener("click" , BookingFormValidation);
BookingFormFinal.addEventListener("click" , CreditCard);


var countup1 = $('#countup1'),
countup2 = $('#countup2'),
countup3 = $('#countup3'),
countdown1 = $('#countdown1'),
countdown2 = $('#countdown2'),
countdown3 = $('#countdown3'),
counter1 = $('#counter1'),
counter2 = $('#counter2'),
counter3 = $('#counter3');

   var getFromDb="v1/Query.php?table=Airport&data=";
   xmlhttp = new XMLHttpRequest();
   
   var flightresponse;
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
            var jsondata = {
              "Bahamas": null,
            }
            countrydata = {
            	"Bangladesh" : null,
            }
         
        flightresponse = JSON.parse(this.responseText);
        AIRPORT_DATA = flightresponse;
        // console.log(flightresponse);

        for (var i = flightresponse.length - 1; i >= 0; i--) {
           var user = flightresponse[i];
           var val = null;
          jsondata[user] = val ;

          countrydata[flightresponse[i][2]] = val;
        }

        $('input.autocomplete').autocomplete({
          data: jsondata,
          limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
          onAutocomplete: function(val) {
            // Callback function when value is autcompleted.
            console.log(val);
            // bookingclicked();
          },
          minLength: 1, // The minimum length of the input for the autocomplete to start. 

          }).keyup(function() {

        });


      }

    };

   xmlhttp.open("GET", getFromDb, true);

   xmlhttp.send();

countup1.on("click" , function(){
  var i = document.getElementById("counter1").innerHTML ;
  var count = parseInt(i);
  if(count<7)
    count++;
  document.getElementById("counter1").innerHTML = count;
});

countup2.on("click" , function(){
  // var i = parseInt(counter1.nodeValue);
  var i = document.getElementById("counter2").innerHTML ;
  var count = parseInt(i);
  if(count<4)
    count++;
  document.getElementById("counter2").innerHTML = count;
  // console.log(counter1.innerHTML +"  " + count);
});

countup3.on("click" , function(){
  // var i = parseInt(counter1.nodeValue);
  var i = document.getElementById("counter3").innerHTML ;
  var count = parseInt(i);
  if(count<2)
    count++;
  document.getElementById("counter3").innerHTML = count;
  // console.log(counter1.innerHTML +"  " + count);
});

countdown1.on("click" , function(){
  // var i = parseInt(counter1.nodeValue);
  var i = document.getElementById("counter1").innerHTML ;
  var count = parseInt(i);
  if(count>0)
    count--;
  document.getElementById("counter1").innerHTML = count;
  // console.log(counter1.innerHTML +"  " + count);
});

countdown2.on("click" , function(){
  // var i = parseInt(counter1.nodeValue);
  var i = document.getElementById("counter2").innerHTML ;
  var count = parseInt(i);
  if(count>0)
    count--;
  document.getElementById("counter2").innerHTML = count;
  // console.log(counter1.innerHTML +"  " + count);
});

countdown3.on("click" , function(){
  // var i = parseInt(counter1.nodeValue);
  var i = document.getElementById("counter3").innerHTML ;
  var count = parseInt(i);
  if(count>0)
    count--;
  document.getElementById("counter3").innerHTML = count;
  // console.log(counter1.innerHTML +"  " + count);
});



$('#returnticket').on("change" , function () {
  // body...
  document.getElementById('Return').value = "";
  document.getElementById('Return').blur();
  
  console.log("Switch");
  if($('#returnticket').is(':checked')){

    $('.activate-after').activateStep();
     $('.returndate').value = "";
      $('.returndate').removeAttr("disabled");
   	returnFlag = true;
  }
   else{
     $('.returndate').text = "";
     
     $('.returndate').attr("disabled", "disabled");
     $('.activate-after').deactivateStep();
     returnFlag = false;
   }
});

$('#paylater').on("change" , function () {
  // body...
  // document.getElementById('Return').value = "";
  // document.getElementById('Return').blur();
    var form = $('#BookingForm');
  
  console.log("Switch");
  if($('#paylater').is(':checked')){
	 $('.activate-later').deactivateStep();
    form.text("Finish");
    payLater = true;
  }
   else{
     // $('.returndate').text = "";
     
     // $('.returndate').attr("disabled", "disabled");
    $('.activate-later').activateStep();
    form.text("Proceed to payment") ;
     payLater = false;
   }
});


function bookingclicked(){

	var sour = document.querySelector('.source').value;
  	var dest = document.querySelector('.destination').value;
  	var Departure = document.querySelector('.departdate').value;
  	var Arrival = document.querySelector('.returndate').value;
  	var adult = parseInt(document.getElementById("counter1").innerHTML) ;
	var child = parseInt(document.getElementById("counter2").innerHTML) ;
	var infant = parseInt(document.getElementById("counter3").innerHTML) ;
  	Adult = adult;
  	Child = child;
  	Infant = infant;
  	
  	console.log("INside.........");
	// setTimeout(function(){ 
	
	if(sour != "" && dest != ""){
	  	
		MakeForms();
	 // $('.stepper').nextStep();
		 var Booking =  $('#Booking-step');
		var Return =  $('#Return-step');

	  
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

	  if(Departure != ""){
	  	console.log("Not Null");
	  	var deptsp = Departure.split(" ");
	  	var day = deptsp[0];
	  	var monthchar =  deptsp[1].substring(0, deptsp[1].length-1);
	  	
	  	var month = arr[monthchar];
	  	console.log(month);
	  	console.log(arr);
	  	
	  	var year = deptsp[2];
	  	 Departure = year+"-"+month+"-"+day;
	  	console.log(Departure);
	  }
	  if(Arrival != ""){
	  	console.log("Not Null");
	  	var arsp = Arrival.split(" ");
	  	var day = arsp[0];
	  	var monthchar =  arsp[1].substring(0, arsp[1].length-1);
	  	
	  	var month = arr[monthchar];
	  	console.log(month);
	  	console.log(arr);
	  	
	  	var year = arsp[2];
	  	Arrival = year+"-"+month+"-"+day;
	  	console.log(Arrival);
	  }
	 	var source = sour.split(",")[0];
	 	var destination = dest.split(",")[0];
	 console.log("Clicked " +source+" "+destination+" "+Departure+" "+Arrival );


	   var getFromDb="v1/index.php?destination="+destination+"&source="+source+"&Departure="+Departure;
	   var Obj;
	   xmlhttp = new XMLHttpRequest();
	   
	   var flightresponse;
	  	xmlhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	    	// console.log(this.responseText);
	      flightresponse = this.responseText;
	   		bookingCard(flightresponse, Booking , "dep");
	   
	      // console.log(flightdata);
	        // document.getElementById("table").innerHTML = this.responseText;
	    }
	  };
	   xmlhttp.open("GET", getFromDb, true);

	   xmlhttp.send();

	   if(returnFlag){

	   var getFromDb="v1/index.php?destination="+source+"&source="+destination+"&Departure="+Arrival;
	   var Obj;
	   xmlhttp = new XMLHttpRequest();
	   
	   var flightresponse;
	  	xmlhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	    	// console.log(this.responseText);
	      flightresponse = this.responseText;
	   		bookingCard(flightresponse , Return , "arr");
	   
	      // console.log(flightdata);
	        // document.getElementById("table").innerHTML = this.responseText;
	    }
	  	};
	   xmlhttp.open("GET", getFromDb, true);

	   xmlhttp.send();

	   }
    }
  	else{
  		// $('.stepper').destroyFeedback();
  		// $('.stepper').getStep($('.stepper').getActiveStep()).addClass('wrong');
  		// $('.stepper').prevStep();
  		alert("Please Enter a Source and destination");
  		location.reload();
  	}

	 // }, 100);
}

function bookingCard(flightresponse , Booking , type) {

	// console.log(flightresponse);
	flightdata = JSON.parse(flightresponse);
	console.log(flightdata);


	var BookingRoute = document.createElement("div");

	// BookingCard.id = "q"+myObj[it].id;
	BookingRoute.classList.add('row');
	Booking.append(BookingRoute);

	var Routedet = document.createElement("div");
	Routedet.classList.add('path');
	Routedet.style.cssText = 'display: inline-flex;' ;
	BookingRoute.append(Routedet);

	if(flightdata.length !=0 ){

	var CountrySrc = document.createElement("h4");
	CountrySrc.textContent = flightdata[0][2];
	Routedet.append(CountrySrc);

	//Flight Icon
    var FligtIconlrg = document.createElement("i");
    	FligtIconlrg.style.cssText = 'transform: rotate(45deg) ;margin: 12px;';
	    // FligtIcon.textContent = "flight";
	    FligtIconlrg.classList.add('fa');
	    FligtIconlrg.classList.add('fa-plane');
	    FligtIconlrg.classList.add('fa-3x');
	    Routedet.append(FligtIconlrg);

	var CountryDst = document.createElement("h4");
	CountryDst.textContent = flightdata[1][4];
	Routedet.append(CountryDst);

	}else{
		var CountrySrc = document.createElement("h4");
		CountrySrc.textContent = "There are no flights currently operational in this route";
		Routedet.append(CountrySrc);

	}
	
	for (var i = 0; i < flightdata.length ; i++) {
	// Booking Card
	var BookingCard = document.createElement("div");

	// BookingCard.id = "q"+myObj[it].id;
	BookingCard.classList.add('row');
	BookingCard.classList.add('flight-card1');
	Booking.append(BookingCard);

	// Path
	var Path = document.createElement("div");
	Path.classList.add('path');
	Path.style.cssText = 'display: inline-flex;';
		BookingCard.append(Path);

	//Source
	var Src = document.createElement("p");
	    // Src.textContent = "DAC";
	    Src.textContent = flightdata[i][3];
	    Src.id = "SrcCode" +flightdata[i][9];
	    Path.append(Src);

	//Depart Time
	var Fulltime = flightdata[i][8];
	var TimeHM = Fulltime.split(" ");
	var DepartureDate = TimeHM[0];
	var DepartureTime = TimeHM[1].split(":");
    var DepTime = document.createElement("h5");
	    // DepTime.textContent = "09:15";
	    DepTime.textContent = DepartureTime[0] + ":"+ DepartureTime[1];
	    DepTime.style.cssText = 'margin: 20px;transform: translateX(-60px);';
	    Path.append(DepTime);

	//Flight Icon
    var FligtIcon = document.createElement("i");
    	FligtIcon.style.cssText = 'transform: rotate(45deg) translate(-40px, 40px);margin: 22px;';
	    // FligtIcon.textContent = "flight";
	    FligtIcon.classList.add('fa');
	    FligtIcon.classList.add('fa-plane');
	    FligtIcon.classList.add('fa-2x');
	    Path.append(FligtIcon);


	// Arrival Time
	var Dest = document.createElement("p");
	    // Dest.textContent = "JED";
		Dest.textContent = flightdata[i][5];
	    Dest.id = "DstCode" +flightdata[i][9];
	    Path.append(Dest);

	//Arrival Time
	 Fulltime = flightdata[i][6];
	 TimeHM = Fulltime.split(" ");
	var ArrivalDate = TimeHM[0];
	var ArrivalTime = TimeHM[1].split(":");
    
    var ArrTime = document.createElement("h5");
	    // ArrTime.textContent = "15:10";
	    ArrTime.textContent = ArrivalTime[0]+":"+ArrivalTime[1];
	    ArrTime.style.cssText = 'margin: 20px;transform: translateX(-60px);';
	    Path.append(ArrTime);

	//Economy
	// var economyid = "e"+type+i;
	var economyid = "e"+type+flightdata[i][9];

    var Economy = document.createElement("div");
	Economy.id = economyid;
	Economy.style.cssText = 'padding: 10px; padding-bottom: 22px; border-radius: 5px; margin-right: 5px;';
	Economy.classList.add('flightClass');
	Economy.classList.add('Eco');
	Economy.classList.add('red');
	Economy.classList.add('accent-1');
		BookingCard.append(Economy);

		//Economy Text
	    var Eco = document.createElement("h5");
		    Eco.textContent = "Economy";
		    Eco.classList.add('text-white');
		    Economy.append(Eco);

	    var ep = flightdata[i][0][0].price;
    	//Economy Text
	    var EcoPrice = document.createElement("strong");
		    EcoPrice.textContent = "$" +ep;
		    EcoPrice.style.cssText = "position: absolute; transform: translate(-2px , -3px);"
		    EcoPrice.classList.add('flow-text');
		    Economy.append(EcoPrice);

		var EcoSeat = document.createElement("span");
		    EcoSeat.textContent = flightdata[i][10][0]+" Seats";
		    EcoSeat.classList.add('text-white');
		    EcoSeat.classList.add('grey');
		    EcoSeat.classList.add('darken-4');
		    EcoSeat.style.cssText = "top: 40px; padding: 13px;  padding-top:5px; padding-bottom: 5px; border-radius: 20px;position: relative;";
		    Economy.append(EcoSeat);

	
	//Business
	var Business = document.createElement("div");
	Business.style.cssText = 'padding: 10px; padding-bottom: 22px; border-radius: 5px; margin-right: 5px;';
	// Business.id = "b"+type+i;
	Business.id = "b"+type+flightdata[i][9];
	Business.classList.add('flightClass');
	Business.classList.add('Buss');
	Business.classList.add('blue');
	Business.classList.add('accent-1');
		BookingCard.append(Business);

		//Business Text 
	    var Buss = document.createElement("h5");
		    Buss.textContent = "Business";
		    Buss.classList.add('text-white');
		    Business.append(Buss);

	    var bp = flightdata[i][0][1].price;
		//Business Text
	    var BussPrice = document.createElement("strong");
		    BussPrice.textContent = "$"+bp;
		    BussPrice.style.cssText = "position: absolute; transform: translate(-2px , -3px);"
		    BussPrice.classList.add('flow-text');
		    Business.append(BussPrice);

		var BussSeat = document.createElement("span");
		    BussSeat.textContent = flightdata[i][10][1]+" Seats";
		    BussSeat.classList.add('text-white');
		    BussSeat.classList.add('grey');
		    BussSeat.classList.add('darken-4');
		    BussSeat.style.cssText = "top: 40px; padding: 13px;  padding-top:5px; padding-bottom: 5px;border-radius: 20px; position: relative;";
		    Business.append(BussSeat);


	//FirstClass
	var FirstClass = document.createElement("div");
	FirstClass.style.cssText = 'padding: 10px; padding-bottom: 22px; border-radius: 5px; margin-right: 5px;';
	// FirstClass.id = "f"+type+i;
	FirstClass.id = "f"+type+flightdata[i][9];
	FirstClass.classList.add('flightClass');
	FirstClass.classList.add('First');
	FirstClass.classList.add('blue-grey');
	FirstClass.classList.add('lighten-1');
		BookingCard.append(FirstClass);

		//FirstClass TextFirst  
		var First = document.createElement("h5");
		    First.textContent = "First Class";
		    First.classList.add('text-white');
		    FirstClass.append(First);

	    var fp = flightdata[i][0][2].price;
		//FirstClass Text
		// var divdet = document.createElement('div');

	    var FirstPrice = document.createElement("strong");
		    FirstPrice.textContent = "$"+fp;
		    FirstPrice.style.cssText = "position: absolute; transform: translate(-2px , -3px);"
		    FirstPrice.classList.add('flow-text');
		    FirstClass.append(FirstPrice);

		var FirstSeat = document.createElement("span");
		    FirstSeat.textContent = flightdata[i][10][2]+" Seats";
		    FirstSeat.classList.add('text-white');
		    FirstSeat.classList.add('grey');
		    FirstSeat.classList.add('darken-4');
		    FirstSeat.style.cssText = "top: 40px;  padding: 13px; padding-top:5px; padding-bottom: 5px; border-radius: 20px; position: relative;";
		    FirstClass.append(FirstSeat);


	// Travel Time
	var TravelTime = document.createElement("div");
	TravelTime.style.cssText = 'padding: 3px;';
		BookingCard.append(TravelTime);

		//TextFirst  
		var texttime = document.createElement("span");
		    texttime.textContent = "Travel Time: "+DepartureDate+" ";
		    TravelTime.append(texttime);


		//FirstTime Text
	    var FlightTime = document.createElement("span");
		    FlightTime.textContent = flightdata[i][7];
		    FlightTime.classList.add('flight-time');
			FlightTime.classList.add('teal');
		    FlightTime.classList.add('lighten-4');
		    TravelTime.append(FlightTime);


	// var totalid = "t"+type+i;
	var totalid = "t"+type+flightdata[i][9];

	
	//GrandTotal
	var GrandTotal = document.createElement("div");
	GrandTotal.id = totalid;
	// GrandTotal.textContent = ""
	GrandTotal.classList.add('total');
	GrandTotal.classList.add('grey');
	GrandTotal.classList.add('darken-3');
	GrandTotal.style.display = "none"
		BookingCard.append(GrandTotal);

		//GrandHeadingClass TextFirst  
		var GrandHeading = document.createElement("span");
		    GrandHeading.textContent = "Grand Total:";
		    GrandHeading.classList.add('text-white');
		    GrandHeading.style.cssText = 'transform: translate(29.5em,15px);';
		    GrandTotal.append(GrandHeading);

		// var Pricecalc = document.createElement('div');
		// Pricecalc.classList.add('container');
		// GrandTotal.append(Pricecalc);

		// var vat = document.createElement('a');
		// vat.textContent = "SubTotal (4 items) : $222950";
		// vat.style.cssText = 'transform: translateX(10em); color: white !important;';
		// vat.classList.add('dropdown-button');
		// vat.classList.add('btn');
		// vat.setAttribute("data-activates" , "dropdown1");
		// Pricecalc.append(vat);
		
		// var vat1 = document.createElement('h5');
		// vat1.textContent = "+ 15% vat :  4050";
		// vat1.style.cssText = 'transform: translateX(10em); color: white !important;';
		// Pricecalc.append(vat1);
		
		// var vat2 = document.createElement('h5');
		// vat2.textContent = "$27000";
		// vat2.style.cssText = 'transform: translateX(10em); color: white !important;';
		// Pricecalc.append(vat2);
		

		// var AmountPayableid = "p"+type+i;
		var AmountPayableid = "p"+type+flightdata[i][9];
		var AmountPayable = document.createElement("h5");
		    AmountPayable.textContent = "$3000";
		    AmountPayable.id = AmountPayableid;
			AmountPayable.classList.add('tooltipped');
			AmountPayable.setAttribute("data-position" , "bottom");
			// AmountPayable.setAttribute("data-tooltip" , "SubTotal : $ 224859\n+15% vat");

			// $('.tooltipped').tooltip({delay: 50});
		    // AmountPayable.classList.add('text-white');
		    AmountPayable.style.cssText = 'transform: translateX(20em);';
		    GrandTotal.append(AmountPayable);

		//FirstClass Text
	    var NextStep = document.createElement("button");
	    	NextStep.id = "n"+type+flightdata[i][9];
		    NextStep.textContent = "Next-Step";
		    NextStep.classList.add('NextStep');
			NextStep.classList.add('red');
		    NextStep.classList.add('darken-2');
		    NextStep.classList.add('next-step');
		    
		    GrandTotal.append(NextStep);
		    console.log(type);

		handleclick(flightdata[i][9] , i , flightdata.length , type , flightdata);

		$('.dropdown-button').dropdown({
	      inDuration: 300,
	      outDuration: 225,
	      constrainWidth: false, // Does not change width of dropdown to that of the activator
	      hover: true, // Activate on hover
	      gutter: 0, // Spacing from edge
	      belowOrigin: false, // Displays dropdown below the button
	      alignment: 'left', // Displays dropdown with edge aligned to the left of button
	      stopPropagation: false // Stops event propagation
	    }
  );

	}
}

function handleclick(i  , j, len , type , flightdata) {

	var objid = "e"+type+i;
	var buss = "b"+type+i;
	var fir = "f"+type+i;
	// console.log(i);

	document.getElementById("n"+type+i).addEventListener("click" , function () {
		// body...
		if(!returnFlag){
			FLIGHT_ID_FINAL = i;
			// DEP_CATA = 
			var payment = document.getElementById("p"+type+i).textContent;
			var pay = payment.split('$');
			TOTAL_PRICE_LEAVE = parseInt(pay[1])*(Adult+Child+Infant);
			BOOKING_DEP_AIRPORT_SRC = flightdata[j][11];
			BOOKING_DEP_AIRPORT_DST = flightdata[j][12];
		}
		else if(returnFlag && type == "dep"){
			document.getElementById('ret_row').style.display = 'block';
			var Fulltime = flightdata[j][8];
			var TimeHM = Fulltime.split(" ");
			var DepartureDate = TimeHM[0].split("-")[2];

			var DepartureTime = TimeHM[1].split(":");

			FLIGHT_DAY = DepartureDate;
			FLIGHT_DAY_TIME = DepartureTime[0];

			FLIGHT_ID_FINAL = i;
			var payment = document.getElementById("p"+type+i).textContent;
			var pay = payment.split('$');
			TOTAL_PRICE_LEAVE = parseInt(pay[1])*(Adult+Child+Infant);
			BOOKING_DEP_AIRPORT_SRC = flightdata[j][11];
			BOOKING_DEP_AIRPORT_DST = flightdata[j][12];
		}
		else{
			// Do something
			var Fulltime = flightdata[j][8];
			var TimeHM = Fulltime.split(" ");
			var DepartureDate = TimeHM[0].split("-")[2];

			var DepartureTime = TimeHM[1].split(":");

			FLIGHT_DAY_RET = DepartureDate;
			FLIGHT_DAY_RET_TIME = DepartureTime;

			if(parseInt(FLIGHT_DAY_RET) <= parseInt(FLIGHT_DAY) && parseInt(FLIGHT_DAY_RET_TIME) <= parseInt(FLIGHT_DAY_TIME)){
				alert("Cannot return on the same day");
			}
			FLIGHT_ID_RETURN = i;
			var payment = document.getElementById("p"+type+i).textContent;
			var pay = payment.split('$');
			TOTAL_PRICE_RETURN = parseInt(pay[1])*(Adult+Child+Infant);
			BOOKING_RET_AIRPORT_SRC = flightdata[j][11];
			BOOKING_RET_AIRPORT_DST = flightdata[j][12];
		}

		getExistingPassenger(flightdata[j][1]);

	});

	if(flightdata[j][10][0] != 0 ){
		document.getElementById(objid).addEventListener("click" , function () {
			// body...
			if (type == "dep") {
				DEP_CATA = "ECONOMY_CLASS";
			}
			else{
				RET_CATA = "ECONOMY_CLASS";
			}
			var total = document.getElementById("t"+type+i);
			var payable = document.getElementById("p"+type+i);
			var economyListener = document.getElementById(objid);
			for(var j=0 ; j< flightdata.length ; j++){
				// console.log(len);
				var elem = document.getElementById("t"+type+flightdata[j][9]);
			  	if (elem.style.display == "inline-flex" && elem != total) {
			  		elem.style.display = "none";
		    	
		     	 }
			}
			  
			  if (total.style.display === "none") {
			  	console.log("Display ... visible"+objid);
			  	var payment = economyListener.childNodes[1].textContent;
				var pay = payment.split('$');
			  	payable.textContent ="$"+parseInt(pay[1])*(Adult+Child+Infant);


		    	total.style.display = "inline-flex";
		    	
		    	economyListener.classList.remove('accent-1');
			    economyListener.classList.add('darken-3');
			  } else if(payable.textContent == economyListener.childNodes[1].textContent){
			      total.style.display = "none";
			    economyListener.classList.add('accent-1');
			    economyListener.classList.remove('darken-3');
			  }else{
			  	// payable.textContent = economyListener.lastChild.textContent;

				var payment = economyListener.childNodes[1].textContent;
				var pay = payment.split('$');
			  	payable.textContent = "$"+parseInt(pay[1])*(Adult+Child+Infant);

		  		economyListener.classList.remove('accent-1');
			    economyListener.classList.add('darken-3');
			
				var tmp_b = document.getElementById("b"+type+i);
				tmp_b.classList.add('accent-1');
			    tmp_b.classList.remove('darken-3');
				var tmp_f = document.getElementById("f"+type+i);
				tmp_f.classList.add('accent-1');
			    tmp_f.classList.remove('darken-3');
				
			  }
		});
	}

	if(flightdata[j][10][1] != 0 ){
		document.getElementById(buss).addEventListener("click" , function () {
		// body...
		if (type == "dep") {
				DEP_CATA = "BUSINESS_CLASS";
			}
			else{
				RET_CATA = "BUSINESS_CLASS";
			}
		var total = document.getElementById("t"+type+i);
		  var payable = document.getElementById("p"+type+i);
		  var economyListener = document.getElementById(buss);
		
			for(var j=0 ; j< flightdata.length ; j++){
			// console.log(len);
			var elem = document.getElementById("t"+type+flightdata[j][9]);
		  	if (elem.style.display == "inline-flex" && elem != total) {
		  		elem.style.display = "none";
	    	
	     	 }
			}
		  if (total.style.display === "none") {
		  	console.log("Display ... visible"+buss);
		  // payable.textContent = economyListener.lastChild.textContent;
			var payment = economyListener.childNodes[1].textContent;
			var pay = payment.split('$');
		  	payable.textContent ="$"+ parseInt(pay[1])*(Adult+Child+Infant);

		      total.style.display = "inline-flex";
			economyListener.classList.remove('accent-1');
		    economyListener.classList.add('darken-3');
		  } else if(payable.textContent == economyListener.childNodes[1].textContent){
		      total.style.display = "none";
		    economyListener.classList.add('accent-1');
		    economyListener.classList.remove('darken-3');
		  }else{
		  	// payable.textContent = economyListener.lastChild.textContent;
	  		
	  		var payment = economyListener.childNodes[1].textContent;
			var pay = payment.split('$');
		  	payable.textContent ="$"+parseInt(pay[1])*(Adult+Child+Infant);

	  		economyListener.classList.remove('accent-1');
		    economyListener.classList.add('darken-3');
		
		  	var tmp_b = document.getElementById("e"+type+i);
			tmp_b.classList.add('accent-1');
		    tmp_b.classList.remove('darken-3');
			var tmp_f = document.getElementById("f"+type+i);
			tmp_f.classList.add('accent-1');
		    tmp_f.classList.remove('darken-3');
			
		  }
		});
	}

	if(flightdata[j][10][2] != 0 ){
		document.getElementById(fir).addEventListener("click" , function () {
		// body...
		if (type == "dep") {
			DEP_CATA = "FIRST_CLASS";
		}
		else{
			RET_CATA = "FIRST_CLASS";
		}
		var total = document.getElementById("t"+type+i);
		var payable = document.getElementById("p"+type+i);
		var economyListener = document.getElementById(fir);
		
		for(var j=0 ; j< flightdata.length ; j++){
			// console.log(len);
			var elem = document.getElementById("t"+type+flightdata[j][9]);
		  	if (elem.style.display == "inline-flex" && elem != total) {
		  		elem.style.display = "none";
	    	
	     	 }
		}

		  if (total.style.display === "none") {
		  	console.log("Display ... visible"+fir);
		  	// payable.textContent = economyListener.lastChild.textContent;
		    
		    var payment = economyListener.childNodes[1].textContent;
			var pay = payment.split('$');
		  	payable.textContent = "$"+ parseInt(pay[1])*(Adult+Child+Infant);

		    total.style.display = "inline-flex";
			economyListener.classList.remove('accent-1');
		    economyListener.classList.add('darken-3');
		  } else if(payable.textContent == economyListener.childNodes[1].textContent) {
		      total.style.display = "none";
		    economyListener.classList.add('accent-1');
		    economyListener.classList.remove('darken-3');
		  }
		  else{
		  	// payable.textContent = economyListener.lastChild.textContent;
			
			var payment = economyListener.childNodes[1].textContent;
			var pay = payment.split('$');
		  	payable.textContent ="$"+parseInt(pay[1])*(Adult+Child+Infant);

			economyListener.classList.remove('accent-1');
		    economyListener.classList.add('darken-3');
		
		  	var tmp_b = document.getElementById("b"+type+i);
			tmp_b.classList.add('accent-1');
		    tmp_b.classList.remove('darken-3');
			var tmp_f = document.getElementById("e"+type+i);
			tmp_f.classList.add('accent-1');
		    tmp_f.classList.remove('darken-3');
			
		  }
		});
	}
}

function BookingFormValidation() {
	// body...
	console.log(Adult+Child+Infant);
	PASSPORT = document.querySelector("#passport_number0").value;

	for(var i = 0 ; i< (Adult+ Child + Infant) ; i++){

		var FirstName = document.querySelector("#first_name"+i);
		var LastName = document.querySelector("#last_name"+i);
		var PassportNumber = document.querySelector("#passport_number"+i);
		var Telephone = document.querySelector('#telephone'+i);
		var Date_of_Birth = document.querySelector('#DOB'+i);
		var Email = document.querySelector('#email'+i);
		var Address = document.querySelector('#Address'+i);
		var Nationality = document.querySelector('#Country'+i);
		var Gender = document.querySelector('#Gender'+i);

		var tmp_FirstName = FirstName.value;
		var tmp_LastName = LastName.value;
		var tmp_PassportNumber = PassportNumber.value;
		var tmp_Telephone = Telephone.value;
		var tmp_Date_of_Birth = Date_of_Birth.value;
		var tmp_Email = Email.value;
		var tmp_Address = Address.value;
		var tmp_Nationality = Nationality.value;
		var tmp_Gender = Gender.value;
		
		if(parseInt(FLIGHT_DAY_RET) <= parseInt(FLIGHT_DAY) && parseInt(FLIGHT_DAY_RET_TIME) <= parseInt(FLIGHT_DAY_TIME)){
				// alert("Cannot return on the same day");
			swal("Connection Time too Short", "Cannot return on the same day", "error");

		}

		if(tmp_FirstName == "" || tmp_LastName== "" || tmp_PassportNumber== "" || tmp_Gender== "" || 
			tmp_Nationality== "" || tmp_Address== "" || tmp_Email== "" || tmp_Telephone== "" || tmp_Date_of_Birth== ""){
			// alert("Please fill up all the fields");
			swal("Cannot proceed", "Please fill up all the fields", "error");
	
	  		$('.stepper').destroyFeedback();
	  		$('.stepper').getStep($('.stepper').getActiveStep()).addClass('wrong');
		  	return;
		}

	  	

	}

	DataSend();

}

function DataSend() {
	// body...
	for(var i = 0 ; i< (Adult+ Child + Infant) ; i++){

		var FirstName = document.querySelector("#first_name"+i);
		var LastName = document.querySelector("#last_name"+i);
		var PassportNumber = document.querySelector("#passport_number"+i);
		var Telephone = document.querySelector('#telephone'+i);
		var Date_of_Birth = document.querySelector('#DOB'+i);
		var Email = document.querySelector('#email'+i);
		var Address = document.querySelector('#Address'+i);
		var Nationality = document.querySelector('#Country'+i);
		var Gender = document.querySelector('#Gender'+i);

		var tmp_FirstName = FirstName.value;
		var tmp_LastName = LastName.value;
		var tmp_PassportNumber = PassportNumber.value;
		var tmp_Telephone = Telephone.value;
		var tmp_Date_of_Birth = Date_of_Birth.value;
		var tmp_Email = Email.value;
		var tmp_Address = Address.value;
		var tmp_Nationality = Nationality.value;
		var tmp_Gender = Gender.value;

		var PosttoDb="v1/Passenger_Booking.php";
		var Lead_Pass = document.querySelector("#passport_number0").value;
		var finalcost_ret = 0;
		var finalcost = 0;
		DISC = 0;
		if(returnFlag){
			
			var calccost = parseInt(TOTAL_PRICE_RETURN);
			var newcost = calccost * 0.1;
			var vat = calccost * 0.15;
			var discount = GetDiscountInfo(Lead_Pass);
			console.log(discount);
			if(discount != 0 ){
				DISC = (calccost * (parseInt(discount[11])/100));
				calccost = calccost - (calccost * (discount[11]/100)); 
			}		
			finalcost_ret = newcost + calccost + vat;


			var data= new FormData();
			data.append('FirstName',tmp_FirstName);
			data.append('LastName',tmp_LastName);
			data.append('PassportNumber',tmp_PassportNumber);
			data.append('Telephone',tmp_Telephone);
			data.append('Date_of_Birth',tmp_Date_of_Birth);
			data.append('Email',tmp_Email);
			data.append('Address',tmp_Address);
			data.append('Nationality',tmp_Nationality);
			data.append('Gender', tmp_Gender);
			
			data.append('FLIGHT_ID' , FLIGHT_ID_RETURN);
			data.append('Total' , (Adult+Infant+Child));
			data.append('Price' , TOTAL_PRICE_RETURN);
			data.append('Lead_Pass', Lead_Pass);
			data.append('Category'  ,RET_CATA);
			xmlhttp = new XMLHttpRequest();
	   
		  	xmlhttp.onreadystatechange = function() {
			    if (this.readyState == 4 && this.status == 200) {
			    	console.log(this.responseText+"   Posted   ......");
			    }
		 	};
		    xmlhttp.open("POST", PosttoDb , true);

		    xmlhttp.send(data);

		}
		
		var calccost = parseInt(TOTAL_PRICE_LEAVE);
		var newcost = calccost * 0.1;
		var vat = calccost * 0.15;
		var discount = GetDiscountInfo(Lead_Pass);
		if(discount != 0 ){
			DISC = (calccost * (parseInt(discount[11])/100))
			calccost = calccost - (calccost * (discount[11]/100)); 
		}		
		var finalcost = newcost + calccost + vat;
		// console.log(vat)
		var data= new FormData();
		data.append('FirstName',tmp_FirstName);
		data.append('LastName',tmp_LastName);
		data.append('PassportNumber',tmp_PassportNumber);
		data.append('Telephone',tmp_Telephone);
		data.append('Date_of_Birth',tmp_Date_of_Birth);
		data.append('Email',tmp_Email);
		data.append('Address',tmp_Address);
		data.append('Nationality',tmp_Nationality);
		data.append('Gender', tmp_Gender);
		
		data.append('FLIGHT_ID' , FLIGHT_ID_FINAL);
		data.append('Total' , (Adult+Infant+Child));
		data.append('Price' , TOTAL_PRICE_LEAVE);
		data.append('Lead_Pass', Lead_Pass);
		data.append('Category'  ,DEP_CATA);

		console.log(tmp_Gender+tmp_Nationality+tmp_Address+tmp_Email+tmp_FirstName);

		
	    xmlhttp = new XMLHttpRequest();
	   
	  	xmlhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	    	console.log(this.responseText+"   Posted   ......");
	    	if(payLater){
	    		// GetDiscountInfo(Lead_Pass);
				var a = "&Qty="+(Adult+ Child + Infant)+"&BOOKING_DEP_AIRPORT_SRC="+BOOKING_DEP_AIRPORT_SRC+
			 	"&BOOKING_DEP_AIRPORT_DST="+BOOKING_DEP_AIRPORT_DST+"&TOTAL_PRICE_LEAVE="+TOTAL_PRICE_LEAVE
			 	+"&BOOKING_RET_AIRPORT_SRC="+BOOKING_RET_AIRPORT_SRC+"&BOOKING_RET_AIRPORT_DST="+BOOKING_RET_AIRPORT_DST+
			 	"&TOTAL_PRICE_RETURN="+TOTAL_PRICE_RETURN+"&DISC="+DISC;
	    
				location.href = "Payment.html?FLIGHT_ID_FINAL="+
				FLIGHT_ID_FINAL+"&FLIGHT_ID_RETURN="+FLIGHT_ID_RETURN+"&Passport="+Lead_Pass+a;
			}
		    }
	 	};
	 	xmlhttp.open("POST", PosttoDb , true);

	    xmlhttp.send(data);
	    var cost = finalcost + finalcost_ret;
	    var tcost = 0;

	    
	}

	var receipt = GetDiscountInfo(Lead_Pass);
    var tab = document.getElementById('Departing_receipt');

    var tb = document.createElement('tbody');
    tab.append(tb);

    var tr = document.createElement('tr');
    tb.append(tr);

	var td = document.createElement('td');
    td.textContent = (Adult+ Child + Infant);
    tr.append(td);

    var td = document.createElement('td');
    td.textContent = BOOKING_DEP_AIRPORT_SRC;
    tr.append(td);

    var td = document.createElement('td');
    td.textContent = "To";
    tr.append(td);
    
    var td = document.createElement('td');
    td.textContent = BOOKING_DEP_AIRPORT_DST;
    tr.append(td);
    
    var td = document.createElement('td');
    td.textContent = "BDT "+TOTAL_PRICE_LEAVE;
    tr.append(td);

	console.log("Assigned "+BOOKING_DEP_AIRPORT_SRC);	    
	    if (returnFlag) {
	    	var receipt = GetDiscountInfo(Lead_Pass);
	    var tab = document.getElementById('Departing_receipt_ret');

	    var tb = document.createElement('tbody');
	    tab.append(tb);

	    var tr = document.createElement('tr');
	    tb.append(tr);

		var td = document.createElement('td');
	    td.textContent = (Adult+ Child + Infant);
	    tr.append(td);

	    var td = document.createElement('td');
	    td.textContent = BOOKING_RET_AIRPORT_SRC;
	    tr.append(td);

	    var td = document.createElement('td');
	    td.textContent = "To";
	    tr.append(td);
	    
	    var td = document.createElement('td');
	    td.textContent = BOOKING_RET_AIRPORT_DST;
	    tr.append(td);
	    
	    var td = document.createElement('td');
	    td.textContent = "BDT "+TOTAL_PRICE_RETURN;
	    tr.append(td);
	    	tcost = parseInt(TOTAL_PRICE_RETURN);
	    }
	    tcost = tcost + parseInt(TOTAL_PRICE_LEAVE);
	    document.getElementById('gtotal').textContent = "BDT "+tcost;
	    document.getElementById('VAT').textContent = "BDT "+vat.toFixed(2);;
	    document.getElementById('tt').textContent = "BDT "+newcost.toFixed(2);
	    document.getElementById('disc').textContent = "BDT "+DISC.toFixed(2);
	    document.getElementById('grand').textContent = "BDT "+cost.toFixed(2);



	// $('.stepper').nextStep();
}

function MakeForms() {
	// body...
	var Total = Adult + Child+ Infant;

  	var ul = $('#Tabform');
  	var content = $('#ContentTab');
  	console.log(Adult+" "+Child +" "+Infant+" "+Total);

  	for(var i = 0 ; i< Total ; i++){

	  	var listitem = document.createElement('li');

	  	var item = document.createElement('a');
	  	item.classList.add('myTab');
	  	item.href = "#Adult"+i;
	  	item.textContent = "Form "+i;
	  	if(i==0)
	  		item.classList.add("active");
	  	item.setAttribute("data-toggle" , "tab");
	  	listitem.append(item);
	  	ul.append(listitem);

	  	var contentdiv = document.createElement('div');
	  	contentdiv.id = "Adult"+i;
	  	contentdiv.classList.add("tab-pane");
	  	if(i==0)
	  		contentdiv.classList.add("active");
	  	else
	  		contentdiv.classList.add("fade");
	  	// contentdiv.textContent = "Adult"+i;
	  	content.append(contentdiv);

	  	var contentrow = document.createElement('div');
	  	contentrow.classList.add("row");
	  	contentdiv.append(contentrow);

		var contentrow1st = document.createElement('div');
	  	contentrow1st.classList.add("col");
	  	contentrow1st.classList.add("s7");
	  	contentrow1st.classList.add("l7");
	  	contentrow1st.style.cssText = 'border-right: 2px solid grey; margin-bottom: 10px;';
	  	contentrow.append(contentrow1st);

		// Have account
		var contentrow2nd = document.createElement('div');
	  	contentrow2nd.classList.add("col");
	  	contentrow2nd.classList.add("s5");
	  	contentrow2nd.classList.add("l5");
	  	contentrow.append(contentrow2nd);

	  	var h5 = document.createElement('h5');
	  	h5.textContent = "Have an account?";
	  	contentrow2nd.append(h5);

	  	var divContainer = document.createElement('div');
	  	divContainer.classList.add('container');
	  	divContainer.style.cssText = "padding: 30px; margin-top:  50px; box-shadow:  0 10px 90px -2px rgba(0, 0, 0, 0.3);";
	  	contentrow2nd.append(divContainer);

	  	var Login = document.createElement('strong');
	  	Login.textContent = "Log In";
	  	divContainer.append(Login);

	  	var userLastName = document.createElement('input');
	  	userLastName.type = "text";
	  	userLastName.placeholder = "Last Name";
	  	userLastName.required = true;
	  	userLastName.classList.add('validate');
	  	userLastName.id= "checklastname"+i;
	  	divContainer.append(userLastName);

	  	// var userLastNamelabel = document.createElement('label');
	  	// userLastNamelabel.textContent = "First Name";
	  	// userLastNamelabel.setAttribute("for" , userLastName.id);
	  	// divContainer.append(userLastNamelabel);

		var userPassport = document.createElement('input');
	  	userPassport.type = "text";
	  	userPassport.required = true;
	  	userPassport.placeholder = "Passport Number";
	  	userPassport.classList.add('validate');

	  	userPassport.id= "checkpassport"+i;
	  	divContainer.append(userPassport);

	  	// console.log(userLastName.id);

	  	// var userPassportlabel = document.createElement('label');
	  	// userPassportlabel.textContent = "First Name";
	  	// userPassportlabel.setAttribute("for" , userPassport.id);
	  	// divContainer.append(userPassportlabel);

		var Verify = document.createElement('a');
	  	Verify.classList.add('btn');
	  	Verify.classList.add('blue');
	  	Verify.classList.add('lighten-1');
	  	Verify.id = "Verify"+i;
	  	Verify.textContent = "Verify";
	  	divContainer.append(Verify);

	  	handleFormClick( i );

	  	var form = document.createElement('form');
	  	form.classList.add("col");
	  	form.classList.add("s12");

	  	contentrow1st.append(form);

	  	var formrow1 = document.createElement('div');
	  	formrow1.classList.add("row");
	  	form.append(formrow1);

	  	var FirstNamediv = document.createElement('div');
	  	FirstNamediv.classList.add("input-field");
	  	FirstNamediv.classList.add("col");
	  	FirstNamediv.classList.add("s6");

	  	formrow1.append(FirstNamediv);

	  	var FirstNameinp = document.createElement('input');
	  	FirstNameinp.placeholder = "First Name";
	  	FirstNameinp.id = "first_name"+i;
	  	FirstNameinp.type = "text";
	  	FirstNameinp.required = true;
	  	FirstNameinp.classList.add("validate");

	  	FirstNamediv.append(FirstNameinp);

	  	// var Firstnamelabel = document.createElement('label');
	  	// Firstnamelabel.textContent = "First Name";
	  	// Firstnamelabel.setAttribute("for" , FirstNameinp.id);
	  	// FirstNamediv.append(Firstnamelabel);


		var LastNamediv = document.createElement('div');
	  	LastNamediv.classList.add("input-field");
	  	LastNamediv.classList.add("col");
	  	LastNamediv.classList.add("s6");

	  	formrow1.append(LastNamediv);

		var LastNameinp = document.createElement('input');
		LastNameinp.placeholder = "Last Name";
	  	LastNameinp.id = "last_name"+i;
	  	LastNameinp.required = true;
	  	LastNameinp.type = "text";
	  	LastNameinp.classList.add("validate");

	  	LastNamediv.append(LastNameinp);

	  	// var Lastnamelabel = document.createElement('label');
	  	// Lastnamelabel.textContent = "Last Name";
	  	// Lastnamelabel.setAttribute("for" , FirstNameinp.id);
	  	// LastNamediv.append(Lastnamelabel);


		var formrow2 = document.createElement('div');
	  	formrow2.classList.add("row");
	  	form.append(formrow2);

	  	var Passportdiv = document.createElement('div');
	  	Passportdiv.classList.add("input-field");
	  	Passportdiv.classList.add("col");
	  	Passportdiv.classList.add("s3");

	  	formrow2.append(Passportdiv);

		// var Passporticon = document.createElement('i');
	 //  	Passporticon.textContent = "filter_none";
	 //  	Passporticon.classList.add("material-icons");
	 //  	Passporticon.classList.add("prefix");
		// Passportdiv.append(Passporticon);

		var Passportinp = document.createElement('input');
	  	Passportinp.id = "passport_number"+i;
	  	Passportinp.placeholder = "Passport Number";
	  	Passportinp.type = "text";
	  	Passportinp.required = true;
	  	Passportinp.classList.add("validate");

	  	Passportdiv.append(Passportinp);

	  	// var Passportlabel = document.createElement('label');
	  	// Passportlabel.textContent = "Passport No.";
	  	// Passportlabel.setAttribute("for" , Passportinp.id);
	  	// Passportdiv.append(Passportlabel);

		// Gender
	  	var Gendertdiv = document.createElement('div');
	  	Gendertdiv.classList.add("input-field");
	  	Gendertdiv.classList.add("col");
	  	Gendertdiv.classList.add("s3");

	  	formrow2.append(Gendertdiv);

		var Gendertselect = document.createElement('select');
	  	Gendertselect.id = "Gender"+i;
		Gendertdiv.append(Gendertselect);

		var Gendertinp1 = document.createElement('option');
	  	Gendertinp1.setAttribute("value" , "Male");
	  	Gendertinp1.textContent = "Male";
	  	Gendertselect.append(Gendertinp1);

		var Gendertinp2 = document.createElement('option');
	  	Gendertinp2.setAttribute("value" , "Female");
	  	Gendertinp2.textContent = "Female";
	  	Gendertselect.append(Gendertinp2);

	  	// var Genderlabel = document.createElement('label');
	  	// Genderlabel.textContent = "Gender";
	  	// Genderlabel.setAttribute("for" , Gendertselect.id);
	  	// Gendertdiv.append(Genderlabel);

	  	// Date of Date_of_Birth
	  	var DOBdiv = document.createElement('div');
	  	DOBdiv.classList.add("input-field");
	  	DOBdiv.classList.add("col");
	  	DOBdiv.classList.add("s6");

	  	formrow2.append(DOBdiv);

		// var DOBicon = document.createElement('i');
	 //  	DOBicon.textContent = "event_note";
	 //  	DOBicon.classList.add("material-icons");
	 //  	DOBicon.classList.add("prefix");
		// DOBdiv.append(DOBicon);

		var DOBinp = document.createElement('input');
		DOBinp.placeholder = "Date of Birth"
	  	DOBinp.id = "DOB"+i;
	  	DOBinp.type = "text";
	  	DOBinp.classList.add("datepicker");

	  	DOBdiv.append(DOBinp);

	  	// var DOBlabel = document.createElement('label');
	  	// DOBlabel.textContent = "Date of Birth";
	  	// DOBlabel.setAttribute("for" , DOBinp.id);
	  	// DOBdiv.append(DOBlabel);


		var formrow3 = document.createElement('div');
	  	formrow3.classList.add("row");
	  	form.append(formrow3);

	  	var Phonediv = document.createElement('div');
	  	Phonediv.classList.add("input-field");
	  	Phonediv.classList.add("col");
	  	Phonediv.classList.add("s6");

	  	formrow3.append(Phonediv);

		// var Phoneicon = document.createElement('i');
	 //  	Phoneicon.textContent = "phone";
	 //  	Phoneicon.classList.add("material-icons");
	 //  	Phoneicon.classList.add("prefix");
		// Passportdiv.append(Phoneicon);

		var Phoneinp = document.createElement('input');
	  	Phoneinp.id = "telephone"+i;
	  	Phoneinp.placeholder = "Mobile Number"
	  	Phoneinp.type = "tel";
	  	Phoneinp.classList.add("validate");

	  	Phonediv.append(Phoneinp);

	  	// var Phonelabel = document.createElement('label');
	  	// Phonelabel.textContent = "Phone Number";
	  	// Phonelabel.setAttribute("for" , Phoneinp.id);
	  	// Phonediv.append(Phonelabel);

		var Countrydiv = document.createElement('div');
	  	Countrydiv.classList.add("input-field");
	  	Countrydiv.classList.add("col");
	  	Countrydiv.classList.add("s6");

	  	formrow3.append(Countrydiv);

		var Countryselect = document.createElement('input');
	  	Countryselect.id = "Country"+i;
	  	Countryselect.type = "text";
	  	Countryselect.placeholder = "Nationality";
	  	Countryselect.classList.add("autocomplete");
	  	Countryselect.setAttribute("autocomplete" ,"off")

	  	Countrydiv.append(Countryselect);

	  	$('input.autocomplete').autocomplete({
          data: countrydata,
          limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
          onAutocomplete: function(val) {
            // Callback function when value is autcompleted.
            console.log(val);
            // bookingclicked();
          },
          minLength: 1, // The minimum length of the input for the autocomplete to start. 

          }).keyup(function() {

        });


		// var Countryselect = document.createElement('select');
	 //  	Countryselect.id = "Country"+i;
		// Countrydiv.append(Countryselect);

		// var cou = {
	 //  		0: "Bangladesh",
	 //  		1: "India",
	 //  		2: "United Arab Emirates",
	 //  		3: "United States",
	 //  		4: "Pakistan",
	 //  		5: "Nepal",
	 //  		6: "Bhutan",
	 //  		7: "Srilanka",
	 //  		8: "Russia",
	 //  		9: "Spain",
	 //  	};

		// for(var num = 0 ; num< 10 ; num++){
		// 	var Countryinp1 = document.createElement('option');
		// 	var str = cou[num];
		//   	Countryinp1.setAttribute("value" , str);
		//   	Countryinp1.textContent = str;
		//   	Countryselect.append(Countryinp1);
		// }
		
	  	// var Countrylabel = document.createElement('label');
	  	// Countrylabel.textContent = "Nationality";
	  	// Countrylabel.setAttribute("for" , Countryselect.id);
	  	// Countrydiv.append(Countrylabel);

		var formrow4 = document.createElement('div');
	  	formrow4.classList.add("row");
	  	form.append(formrow4);

	  	// Email
		var Emaildiv = document.createElement('div');
	  	Emaildiv.classList.add("input-field");
	  	Emaildiv.classList.add("col");
	  	Emaildiv.classList.add("s3");

	  	formrow4.append(Emaildiv);

		// var Emailicon = document.createElement('i');
	 //  	Emailicon.textContent = "email";
	 //  	Emailicon.classList.add("material-icons");
	 //  	Emailicon.classList.add("prefix");
		// Emaildiv.append(Emailicon);

		var Emailinp = document.createElement('input');
	  	Emailinp.id = "email"+i;
	  	Emailinp.placeholder = "Enter Your Email"
	  	Emailinp.type = "email";
	  	Emailinp.classList.add("validate");

	  	Emaildiv.append(Emailinp);

	  	// var Emaillabel = document.createElement('label');
	  	// Emaillabel.textContent = "Email";
	  	// Emaillabel.setAttribute("for" , Emailinp.id);
	  	// Emaildiv.append(Emaillabel);


		// Confirm
		var ConfEmaildiv = document.createElement('div');
	  	ConfEmaildiv.classList.add("input-field");
	  	ConfEmaildiv.classList.add("col");
	  	ConfEmaildiv.classList.add("s3");

	  	formrow4.append(Emaildiv);


		var ConfEmailinp = document.createElement('input');
	  	ConfEmailinp.id = "email"+i;
	  	ConfEmailinp.placeholder = "Confirm Your Email"
	  	ConfEmailinp.type = "email";
	  	ConfEmailinp.classList.add("validate");

	  	ConfEmaildiv.append(ConfEmailinp);

	  	// var ConfEmaillabel = document.createElement('label');
	  	// ConfEmaillabel.textContent = "Email";
	  	// ConfEmaillabel.setAttribute("for" , Emailinp.id);
	  	// ConfEmaildiv.append(ConfEmaillabel);



		// Address
		var formrow5 = document.createElement('div');
	  	formrow5.classList.add("row");
	  	form.append(formrow5);

	  	var Addressdiv = document.createElement('div');
	  	Addressdiv.classList.add("input-field");
	  	Addressdiv.classList.add("col");
	  	Addressdiv.classList.add("s6");

	  	formrow5.append(Addressdiv);

		// var Addressicon = document.createElement('i');
	 //  	Addressicon.textContent = "phone";
	 //  	Addressicon.classList.add("material-icons");
	 //  	Addressicon.classList.add("prefix");
		// Addressdiv.append(Addressicon);

		var Addressinp = document.createElement('input');
	  	Addressinp.id = "Address"+i;
	  	Addressinp.placeholder = "Address";
	  	// Addressinp.type = "text";
	  	Addressinp.classList.add("materialize-textarea");

	  	Addressdiv.append(Addressinp);

	  	// var Addresslabel = document.createElement('label');
	  	// Addresslabel.textContent = "Address";
	  	// Addresslabel.setAttribute("for" , Phoneinp.id);
	  	// Addressdiv.append(Addresslabel);


	}

	$('select').material_select();
	$('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 95, // Creates a dropdown of 15 years to control year,
    today: 'Today',
    clear: 'Clear',
    close: 'Ok',
    closeOnSelect: false // Close upon selecting a date,
  });
}

function handleFormClick(id) {
	// body...
	document.getElementById("Verify"+id).addEventListener("click" , function () {
		console.log("checklastname"+id +" "+"click");
		var Name = document.querySelector('#checklastname'+id).value;
		var passport = document.querySelector('#checkpassport'+id).value; 
		if(checkPassengerExist(Name , passport , id)){
			console.log("Found");
			// alert("Your account Exists")
			swal("Verified", "Thank You for flying with BUET Airlines. We have already filled up your information for your convinience.Please proceed to the next Step!", "success", {
			  button: "Done",
			});
		}
		else{
			console.log("Not Found");
			// alert("Your Account Does Not exist");
			swal("Could Not Authenticate", "Your Account Does not exist!Please fillup the signup form to continue", "error");
		}

	});
}

function CreditCard() {
	for(var i = 0 ; i< (Adult+ Child + Infant) ; i++){

		var FirstName = document.querySelector("#first_name"+i);
		var LastName = document.querySelector("#last_name"+i);
		var PassportNumber = document.querySelector("#passport_number"+i);
		var Telephone = document.querySelector('#telephone'+i);
		var Date_of_Birth = document.querySelector('#DOB'+i);
		var Email = document.querySelector('#email'+i);
		var Address = document.querySelector('#Address'+i);
		var Nationality = document.querySelector('#Country'+i);
		var Gender = document.querySelector('#Gender'+i);

		var tmp_FirstName = FirstName.value;
		var tmp_LastName = LastName.value;
		var tmp_PassportNumber = PassportNumber.value;
		var tmp_Telephone = Telephone.value;
		var tmp_Date_of_Birth = Date_of_Birth.value;
		var tmp_Email = Email.value;
		var tmp_Address = Address.value;
		var tmp_Nationality = Nationality.value;
		var tmp_Gender = Gender.value;
		
		if(parseInt(FLIGHT_DAY_RET) <= parseInt(FLIGHT_DAY) && parseInt(FLIGHT_DAY_RET_TIME) <= parseInt(FLIGHT_DAY_TIME)){
				alert("Cannot return on the same day");
		}

		if(tmp_FirstName == "" || tmp_LastName== "" || tmp_PassportNumber== "" || tmp_Gender== "" || 
			tmp_Nationality== "" || tmp_Address== "" || tmp_Email== "" || tmp_Telephone== "" || tmp_Date_of_Birth== ""){
			alert("Please fill up all the fields");
	
	  		$('.stepper').destroyFeedback();
	  		$('.stepper').getStep($('.stepper').getActiveStep()).addClass('wrong');
		  	return;
		}

	  	

	}


	var PosttoDb="v1/payment.php";

	var card1 = document.querySelector('#card-number').value;
	var card2 = document.querySelector('#card-number-1').value;
	var card3 = document.querySelector('#card-number-2').value;
	var card4 = document.querySelector('#card-number-3').value;
	var card4 = document.querySelector('#card-number-3').value;
	var cardholder = document.querySelector('#card-holder').value;
	var month = document.querySelector('#card-expiration-month').value;
	var Year = document.querySelector('#card-expiration-year').value;
	var Expire = (Year+"-"+month+"-1");
	// console.log(year"-"+month+"-1");
	var ccv = document.querySelector('#card-ccv').value;

	var creditcard = card1+card2+card3+card4;

	var data= new FormData();

	data.append('CreditCard',creditcard);
	data.append('CardHolder',cardholder);
	data.append('CCV',ccv);
	data.append('Expire',Expire);
	data.append('PassportNumber',PASSPORT);
	data.append('Flight_ID',FLIGHT_ID_FINAL);

	console.log(creditcard+" "+cardholder+" "+ccv);

	if(returnFlag){
	var data= new FormData();

	data.append('CreditCard',creditcard);
	data.append('CardHolder',cardholder);
	data.append('CCV',ccv);
	data.append('Expire',Expire);
	data.append('PassportNumber',PASSPORT);
	data.append('Flight_ID',FLIGHT_ID_RETURN);

	xmlhttp = new XMLHttpRequest();
	   
  	xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    	console.log(this.responseText+"   Posted   ......");

    }
 	};
    xmlhttp.open("POST", PosttoDb , true);

    xmlhttp.send(data);

  }


	xmlhttp = new XMLHttpRequest();
	   
  	xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    	console.log(this.responseText+"   Posted   ......");
    	var a = "&Qty="+(Adult+ Child + Infant)+"&BOOKING_DEP_AIRPORT_SRC="+BOOKING_DEP_AIRPORT_SRC+
	 	"&BOOKING_DEP_AIRPORT_DST="+BOOKING_DEP_AIRPORT_DST+"&TOTAL_PRICE_LEAVE="+TOTAL_PRICE_LEAVE
	 	+"&BOOKING_RET_AIRPORT_SRC="+BOOKING_RET_AIRPORT_SRC+"&BOOKING_RET_AIRPORT_DST="+BOOKING_RET_AIRPORT_DST+
	 	"&TOTAL_PRICE_RETURN="+TOTAL_PRICE_RETURN+"&DISC="+DISC;
	    
  		location.href = "Payment.html?FLIGHT_ID_FINAL="+
		FLIGHT_ID_FINAL+"&FLIGHT_ID_RETURN="+FLIGHT_ID_RETURN+"&Passport="+document.querySelector("#passport_number0").value+a;
    }
 	};
    xmlhttp.open("POST", PosttoDb , true);

    xmlhttp.send(data);

}

function getExistingPassenger(route) {
	// body...
	 var getFromDb="v1/Query.php?table=Passengers&data="+route;
	 xmlhttp = new XMLHttpRequest();
   
   var flightresponse;
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
		console.log(this.responseText);             
        flightresponse = JSON.parse(this.responseText);

        console.log(flightresponse);
        EXISTING_PASS = flightresponse;
      }

    };

   xmlhttp.open("GET", getFromDb, true);

   xmlhttp.send();
}

function checkPassengerExist(Name , Passport , id) {
	// body...
	for(var i = 0 ; i< EXISTING_PASS.length ; i++){
		if(EXISTING_PASS[i][2] == Name && EXISTING_PASS[i][3] == Passport ){
		console.log("inside");

		console.log(id);
		var FirstName = document.getElementById("first_name"+id);
		var LastName = document.getElementById("last_name"+id);
		var PassportNumber = document.getElementById("passport_number"+id);
		var Telephone = document.getElementById('telephone'+id);
		var Date_of_Birth = document.getElementById('DOB'+id);
		var Email = document.getElementById('email'+id);
		var Address = document.getElementById('Address'+id);
		var Nationality = document.getElementById('Country'+id);
		var Gender = document.getElementById('Gender'+id);

		FirstName.value = EXISTING_PASS[i][1];
		LastName.value = EXISTING_PASS[i][2];
		PassportNumber.value = EXISTING_PASS[i][3];
		Telephone.value = EXISTING_PASS[i][4];
		Date_of_Birth.value = EXISTING_PASS[i][5];
		Email.value = EXISTING_PASS[i][6];
		Address.value = EXISTING_PASS[i][7];
		Nationality.value = EXISTING_PASS[i][8];
		Gender.value = EXISTING_PASS[i][9];

			return true;
		}
	}

	return false;

}

function GetDiscountInfo(Passport) {
	// body...
	for(var i = 0 ; i< EXISTING_PASS.length ; i++){
		if(EXISTING_PASS[i][3] == Passport ){
			console.log("inside");
			console.log(EXISTING_PASS[i]);
			document.getElementById('booking_ref').textContent = EXISTING_PASS[i][1]+" "+EXISTING_PASS[i][2];
			return EXISTING_PASS[i];
		}
	}
	return 0;
}

$('.input-cart-number').on('keyup change', function(){
  $t = $(this);
  
  if ($t.val().length > 3) {
    $t.next().focus();
  }
  
  var card_number = '';
  $('.input-cart-number').each(function(){
    card_number += $(this).val() + ' ';
    if ($(this).val().length == 4) {
      $(this).next().focus();
    }
  })
  
  $('.credit-card-box .number').html(card_number);
});

$('#card-holder').on('keyup change', function(){
  $t = $(this);
  $('.credit-card-box .card-holder div').html($t.val());
});

$('#card-holder').on('keyup change', function(){
  $t = $(this);
  $('.credit-card-box .card-holder div').html($t.val());
});

$('#card-expiration-month, #card-expiration-year').change(function(){
  m = $('#card-expiration-month option').index($('#card-expiration-month option:selected'));
  m = (m < 10) ? '0' + m : m;
  y = $('#card-expiration-year').val().substr(2,2);
  $('.card-expiration-date div').html(m + '/' + y);
})

$('#card-ccv').on('focus', function(){
  $('.credit-card-box').addClass('hover');
}).on('blur', function(){
  $('.credit-card-box').removeClass('hover');
}).on('keyup change', function(){
  $('.ccv div').html($(this).val());
});


/*--------------------
CodePen Tile Preview
--------------------*/
setTimeout(function(){
  $('#card-ccv').focus().delay(1000).queue(function(){
    $(this).blur().dequeue();
  });
}, 500);

/*function getCreditCardType(accountNumber) {
  if (/^5[1-5]/.test(accountNumber)) {
    result = 'mastercard';
  } else if (/^4/.test(accountNumber)) {
    result = 'visa';
  } else if ( /^(5018|5020|5038|6304|6759|676[1-3])/.test(accountNumber)) {
    result = 'maestro';
  } else {
    result = 'unknown'
  }
  return result;
}

$('#card-number').change(function(){
  console.log(getCreditCardType($(this).val()));
})*/


});