



function uploadQuestion() {
    var question= document.getElementById("demo-message").value;
	var category= document.getElementById("demo-category").value;
	var notification= document.getElementById("demo-human").checked;
	var notifications,imagelink,bol="'";
		
	
	if(notification=='true')
	  notifications=1;
	else
      notifications=0;  	

	
	var uploadtoDb="v1/index.php/uploadquestion";
	
	
	var j=11,k=0,f=0;
	var user="shadman";
	var data=new FormData();
	
	if(localStorage.getItem("count")===null)
	{ 
	  k=0;
	  
	}
	else
	{	
        
	for(j=1;j<=Number (localStorage.getItem("count"));j++)
	{	
	var ster=localStorage.getItem(j);
	
	
	ster=ster.replace("data:image/jpeg;base64,", "");
	ster=ster.replace("data:image/png;base64,", "");
	ster=ster.replace("data:image/jpg;base64,", "");
	k=k+1;
	
	
	imagelink=user.concat(k);
	
	localStorage.removeItem(j);
	
	data.append(imagelink,ster);
	
	}
	
	}
	localStorage.removeItem("count");
	
	
	data.append('username',user);
	data.append('question',question);
	data.append('category',category);
	data.append('notifications',notifications);
	data.append('imagecount',k);
	
    
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status != 404) {
                
				alert("Upload Successful");
                      
                
            }
        };
		xmlhttp.open("POST", uploadtoDb, true); 
			
        
		xmlhttp.send(data);
    
}



$("#questiontest").ready(function (event) {
   
   parsingAllQuestions("0");
});


function parsingAllQuestions(filter){
    alert("Hello bro...")    ; 
    var getFromDb="v1/index.php/viewallquestions";

    var PageToSendTo = "v1/index.php/viewallquestions?";
	var MyVariable = filter;
	var VariablePlaceholder = "filter=";
	var UrlToSend = PageToSendTo + VariablePlaceholder + MyVariable;
	alert(UrlToSend);

   var Obj;
   var data=new FormData();
   data.append('filter',filter);
   xmlhttp = new XMLHttpRequest();
   xmlhttp.onreadystatechange = function() {
     if (this.readyState == 4 && this.status == 201) {
          //Obj = this.responseText;
          Obj = JSON.parse(this.responseText);
          //alert(Obj);
          loadallquestions(this.responseText);
           
          console.log("Printing response...");
          
     }
   };
   xmlhttp.open("POST", getFromDb, true);
   xmlhttp.send(data);
    
    
 
    
 }




function viewAllAnswers(){
    alert("Hello bro...")    ; 
    var getFromDb="v1/index.php/viewallanswers";
   var Obj;
   xmlhttp = new XMLHttpRequest();
   xmlhttp.onreadystatechange = function() {
     if (this.readyState == 4 && this.status == 201) {
       
          Obj = JSON.parse(this.responseText);
           
          console.log("Printing response...");
         alert(this.responseText);
          

     }
   };
   xmlhttp.open("GET", getFromDb, true);
   xmlhttp.send();
   
 }








String.prototype.replaceAll = function(str1, str2, ignore) 
{
    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
}

function uploadFile() {
    var blobFile = $('#filechooser').files[0];
    var formData = new FormData();
    formData.append("fileToUpload", blobFile);

    $.ajax({
       url: "upload.php",
       type: "POST",
       data: formData,
       processData: false,
       contentType: false,
       success: function(response) {
           // .. do something
       },
       error: function(jqXHR, textStatus, errorMessage) {
           console.log(errorMessage); // Optional
       }
    });
}


// function parsingAllQuestions(){
//   	console.log("Hello...")    ; 
// 	 var getFromDb="v1/index.php/viewallquestions";
// 	var myObj;
// 	xmlhttp = new XMLHttpRequest();
// 	xmlhttp.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 201) {
//          myObj = JSON.parse(this.responseText);
//          console.log(myObj);

//     }
// 	};
// 	xmlhttp.open("GET", getFromDb, true);
// 	xmlhttp.send();
// 	return myObj;
//    }