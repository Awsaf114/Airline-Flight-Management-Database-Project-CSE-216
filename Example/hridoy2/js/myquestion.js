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


// image Picker
    var preview = document.querySelector(".preview");

$("#image-picker").change(function (event) {
    console.log("Clicked");
    readURL(this);
});

function readURL(input) {

    var curFiles = input.files;
  
    console.log(curFiles);
    if (curFiles!= 0) {
        var list = document.createElement("ul");
        preview.appendChild(list);
        for (var i = 0; i < curFiles.length; i++) {
          var listItem = document.createElement("li");
          var para = document.createElement("p");
              para.textContent = "File name " + curFiles[i].name + ".";
        var image = document.createElement("img");
        
        image.src = window.URL.createObjectURL(curFiles[i]);
        
        image.style.cssText = 'height:90px; width:90px';

        listItem.appendChild(image);
        listItem.appendChild(para);
        list.appendChild(listItem);

        }

    }

    // if (input.files && input.files[0]) {
    //     var reader = new FileReader();

    //     reader.onload = function (e) {
    //         $('#image-preview').attr('src', e.target.result);
    //     }

    //     reader.readAsDataURL(input.files[0]);
    // }
}




    $( "textarea.Ask" ).focusin(function() {
        // $(this).parent('div').parent('div').css('background','white');
        
        // $(this).parent('div').addClass('focused');

        console.log("Ask selected");
    }).focusout(function(){

        // $(this).parent('div').removeClass('focused');
        // $(this).parent('div').css('background','transparent');
    });

