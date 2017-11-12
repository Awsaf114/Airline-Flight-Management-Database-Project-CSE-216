function uploadanswers() {
    //var question= document.getElementById("demo-message").value;
	//var category= document.getElementById("demo-category").value;
	//var notification= document.getElementById("demo-human").checked;
    var answer =  document .getElementById("comment").value;
	var notifications,imagelink,bol="'",question;
		
//	
//	if(notification=='true')
//	  notifications=1;
//	else
//      notifications=0;  	

	
	var uploadtoDb="v1/index.php/uploadanswers";
	
	
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
	//alert(imagelink);
	
	localStorage.removeItem(j);
	
	data.append(imagelink,ster);
	
	}
	
	}
	localStorage.removeItem("count");
	
    data.append('imagecount',k);
    
	
    var question_id =   123;
    var username = "shadman";
    var image =  123456789;
    var string = "bbbbb";
    var upvote = 0;
    var downvote = 0;
    var anonymous = 0;
    var isright = 1;
	
	data.append('username',username);
	data.append('string',answer);
	data.append('upvote',upvote);
	data.append('downvote',downvote);
    data.append('anonymous',anonymous);
	data.append('isright',isright);
	
    data.append('question_id',question_id);

    
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status != 404) {
                
				alert(this.responseText);
                      
                
            }
        };
		xmlhttp.open("POST", uploadtoDb, true); 
			
        
		xmlhttp.send(data);
		
		
        
    
}

