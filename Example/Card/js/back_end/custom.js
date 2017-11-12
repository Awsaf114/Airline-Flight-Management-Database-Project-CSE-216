function makeExpandingArea(container) {
 var area = container.querySelector('textarea');
 var span = container.querySelector('span');
 if (area.addEventListener) {
   area.addEventListener('input', function() {
     span.textContent = area.value;
   }, false);
   span.textContent = area.value;
 } else if (area.attachEvent) {
   // IE8 compatibility
   area.attachEvent('onpropertychange', function() {
     span.innerText = area.value;
   });
   span.innerText = area.value;
 }
// Enable extra CSS
container.className += "active";
}var areas = document.querySelectorAll('.expandingArea');
var l = areas.length;while (l--) {
 makeExpandingArea(areas[l]);
}


$('#expand').click(function () {
  console.log("Clicked hidden");
  var active = true;
  $('#Answer').removeClass('hidden');
  if(!active)
  {
    $('#Answer').addClass('hidden');
    active = false;
  }
});
var questiondiv=  document.querySelector(".col-md-12 question-item");

$("#questiontest").ready(function (event) {
   loadallquestions();
});

// image Picker
    var preview = document.querySelector(".preview");
    
$("#image-picker").change(function (event) {
    console.log("Clicked");
    readURLs(this);
});
$("#comment-with-image").change(function (event) {
    console.log("Clicked");
    readURLs(this);
	
});

function loadallquestions()
{  alert("jico");
   var para=document.createElement("p");
   para.textContent="hello";
   questiondiv.appendChild(para);
   

 

}

function readURLs(input) {

    var curFiles = input.files;
    var b64string="hello!@1";
	var q=0,start;
    console.log(curFiles);
    if (curFiles!= 0) {
        var list = document.createElement("ul");
        preview.appendChild(list);
        for (var i = 0; i < curFiles.length; i++) {
          var listItem = document.createElement("li");
          var para = document.createElement("p");
		  para.id="paras";
          para.textContent = "File name " + curFiles[i].name + ".";
        var image = document.createElement("img");
        
		
        //image.src = window.URL.createObjectURL(curFiles[i]);
		if(localStorage.getItem("count")===null)
		{
			q=1;
			
			
		
			
		}
	    else
		{
			q= Number(	localStorage.getItem("count"))+1;		
		}
        		
	    
		
		var FR= new FileReader();
		FR.addEventListener("load", function(e) {
        image.src       = e.target.result;
        bstring       = e.target.result;
		
		localStorage.setItem(q,bstring);
		
		
		
    });
       FR.readAsDataURL( input.files[0] );
        image.id="shadman".concat(i);
		
		
		
		
		localStorage.setItem("count",q);
		
		//localStorage.setItem("start",start);
		
        
		
		//localStorage.setItem(q,b64string);
		//document.getElementById("paras").innerHTML="File name " + curFiles[i].name + ".";
        image.style.cssText = 'height:90px; width:90px';	
     
    
		
        listItem.appendChild(image);
        listItem.appendChild(para);
	
		//var lst=getBase64Image(document.getElementById(image.id),listItm);
		list.appendChild(listItem);
			
		

        }

    }

    
}


    $( "textarea.Ask" ).focusin(function() {
        // $(this).parent('div').parent('div').css('background','white');
        
        // $(this).parent('div').addClass('focused');

        console.log("Ask selected");
    }).focusout(function(){

        // $(this).parent('div').removeClass('focused');
        // $(this).parent('div').css('background','transparent');
    });

