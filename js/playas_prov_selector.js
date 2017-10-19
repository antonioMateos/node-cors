console.info("PROVINCIAS - - - - - - - - - - - - - - - - - - - - - - - - - - - ");
var provincia = document.querySelectorAll("#provincia_selector option");

for(i=1;i<=provincia.length-1;i++){
	provincias(i);
}

function provincias(i) {
	console.log(provincia[i].outerText,":",	provincia[i].attributes["0"].nodeValue);
}

console.info("LOCALIDADES - - - - - - - - - - - - - - - - - - - - - - - - - - - ");
var localidad = document.querySelectorAll("#datos_selector optgroup");

var ddbb = {};

for(i=0;i<=localidad.length-1;i++){
	localidades(i);
}

function localidades(i) {

	var ciudad = localidad[i].attributes["0"].textContent;
	//ciudad = ciudad.toLowerCase();

	// ADD CIUDADES
	if(ddbb[ciudad] === undefined){
		ddbb[ciudad] = [];
		//ddbb.ciudad
	}
	/* FOR PROTO ONLY
	if(i>=localidad.length-1){
		console.log("DDBB",ddbb);
	}
	*/
	getPlayas(ciudad);
}

var playas = document.querySelectorAll("#datos_selector optgroup option");

function getPlayas(city) {

	var obj = playas;
	console.log("Beaches IN",city);

	for (var prop in obj) {

		var parent = obj[prop].parentElement;

		if(parent != undefined){

			parent = parent.label;

			if(parent === city){

				var b_key = obj[prop].text;

				var itemID = obj[prop].value;
					var indx = itemID.lastIndexOf("-");
					var lngth = itemID.length;
					itemID = itemID.slice(indx+1);

				var beach = {
					name : b_key,
					id : itemID
				};

				var arr = ddbb[city];

				arr.push(beach);
				console.log(">",arr);

			}
		}

	}

}

// BASIC STRUCTURE WANTED!
/*
	ddbb = {

		provincia01 : {
			id : NN,
			ciudad01 : {
				playa01 : {
					nombre : nombrePlaya,
					id : idPlaya
				}
				playa02 : {
					nombre : nombrePlaya,
					id : idPlaya
				}
			}
			ciudad02 : {
				playa01 : {
					nombre : nombrePlaya,
					id : idPlaya
				}
				playa02 : {
					nombre : nombrePlaya,
					id : idPlaya
				}
			}
		}

	}

	Playa -> ddbb.provincia01.ciudad01.playa01.nombre
	ID 	 -> ddbb.provincia01.ciudad01.playa01.id

*/

// HOW TO -> Add elements to an object 
// var object = {}
// object[ newKey ] = newValue;
//
// HOW TO -> Add object to object
// var subObject = {}
// object[ newKey ] = subObject;
//
// FOR THIS EXAMPLE
// --> provincia_key = provincia[i].outerText;
var newPlaya =  {
	id : playa[i].value,	// TO DO --> slice
	loc : [x,y] 			// TO DO --> get playa coordinates
}

var newProvincia = {
	id : provincia[i].attributes["0"].nodeValue, // OR provincia[i].value
	playa[playa_key] = newPlaya
}

ddbb[provincia_key] = newProvincia; // ADD provincia to DDBB