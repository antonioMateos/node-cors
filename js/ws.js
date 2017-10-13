var socket = io();

socket.on("connect", function(msg){

  console.log("socket ON",msg);

});

socket.on("response", function(newResp){

  console.log(newResp);

  var datosUrl = newResp.datos;
  var metaDatosUrl = newResp.metadatos;

  $('#responseList').prepend(datosUrl);

  //STATS
  stats();

});

// START <> STOP Streaming
// TO DO --> Add key press font intro on search!!!
$('#start-btn').click(function(){

	var search = $('#input-url').val(); // <-- Get input value
	// TO DO --> SEND INPUT VALUE

	/*
	if(search!=""){

		cleanRespList(); // <-- Clean responseList
		$('main').addClass('searching'); // CHANGE STYLE TO STOP STREAMING
		$('#search').show();
		$('#search').text(search); // <-- Write tracked hashtag in title
		socket.emit('start',search); // <-- Socket emit hashtag to server
		responseMsg("start");

	} else {

		responseMsg("empty");

	}
	*/
	socket.emit('start',urlCall);

});

$('#stop-btn').click(function(){
	$('#search').val("");
	socket.emit('stop');
	$('main').removeClass('searching'); // CHANGE STYLE TO START STREAMING
	responseMsg("stop");
});

// STATS Fn
var nt = 0; // Number of answers received
function stats() {
	$('.stats').show(); // show STATS
	nt += 1;
	$('.stats p span').text(nt);
}

// RESPONSE MSGs
function responseMsg(response) {

	// Toast Config
	var resp;
	var className = "response-msg";

	var msg = {
		empty: "Please, write a url!!!",
		stop: "Receiving stopped!",
		start: "Call started!"
	};

	if(response=="empty") {
		resp = msg.empty;
		className += " error";
	}

	if(response=="stop") {
		resp = msg.stop;
		className += " stop";
	}

	if(response=="start") {
		resp = msg.start;
		className += " success";
	}

	// Materialize.toast(message, displayLength, className, completeCallback);
	var toastContent = "<span>"+resp+"</span>";
	var time = 4000;
	Materialize.toast(toastContent, time, className); // 4000 is the duration of the toast

}

// REFRESH Tw List
function cleanRespList() {
	//Refresh ul tweetList
	$('#responseList').html("");
};

//API Call
var urlCall = "https://opendata.aemet.es/opendata/api/valores/climatologicos/inventarioestaciones/todasestaciones/?api_key=";