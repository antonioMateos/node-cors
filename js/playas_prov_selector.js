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

for(i=0;i<=localidad.length-1;i++){
	localidades(i);
}

function localidades(i) {
	// LABEL --> localidad[i].attributes["0"].textContent
	var ciudad = localidad[i].attributes["0"].textContent;
	// PLAYAS
	printPlayas(ciudad);
}

var playas = document.querySelectorAll("#datos_selector optgroup option");

function printPlayas(city) {

	var obj = playas;
	//console.log(city);

	for (var prop in obj) {

		var parent = obj[prop].parentElement;

		if(parent != undefined){

			parent = parent.label;

			if(parent === city){

				var itemID = obj[prop].value;
					var indx = itemID.lastIndexOf("-");
					var lngth = itemID.length;
					itemID = itemID.slice(indx+1);

				//console.log("> "+obj[prop].text,":",itemID);
				var key = obj[prop].text;
				var id = itemID;
			}
		}

	}

}

// -> playa[1].text;
// -> playa[1].value; // VALUE --> TO DO --> Slice para quitar nombre de playa y quedarme solo con la ID

// BASIC OBJECT
var ddbb = {
	provincia_key : {
		id : id,			// <-- ID 15 p.e.
		newPlaya :{ 		// <-- Ares p.e.
			id : id, 		// <-- 15004
			loc : [x,y] 	// <-- Coordenates --> TO DO --> Ajax Call to get them
		}
	}
}

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