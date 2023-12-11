// - Exercici 6
// Fins a aquest exercici només hem implementat la lògica de la pantalla principal de la botiga. Ara implementarem la validació del formulari de checkout que es troba en l'arxiu checkout.js.
// Per a accedir a aquesta pantalla, has de clicar en la icona del carret de la part superior dreta de la pantalla, apareixent un modal amb el botó que et portarà a aquesta pantalla.
// El teu primer objectiu serà validar el formulari checkout.html utilitzant el fitxer checkout.js
// En aquest exercici hauràs d'implementar la lògica perquè els camps del formulari compleixin les següents condicions:
// - Tots els camps són obligatoris.
// - Tots els camps han de tenir almenys 3 caràcters.
// - El nom i cognoms han de contenir només lletres.
// - El telèfon ha de contenir només números.
// - La contrasenya ha d'incloure números i lletres.
// - L'email ha de tenir format d'email.
// Quan l'usuari/ària introdueixi un camp que no compleixi les validacions anteriors, l'input s'ha de ressaltar en vermell i mostrar un missatge a la part inferior.
// Ajuda: podràs acolorir la vora de l'input en vermell i mostrar el missatge d'error manipulant el dom, encara que també pots usar la classe is-invalid de bootstrap.

// Exercise 6
function validate() {
	console.log("No se envia directamente el formulario")
	var error = 0;
	// Get the input fields
	var fName = document.getElementById("fName");
	var fEmail = document.getElementById("fEmail");
	var fAddress = document.getElementById("fAddress");
	var fLastN = document.getElementById("fLastN");
	var fPassword = document.getElementById("fPassword");
	var fPhone = document.getElementById("fPhone");

	// Get the error elements
	var errorName = document.getElementById("errorName");
	var errorEmail = document.getElementById("errorEmail");  
	var errorAddress = document.getElementById("errorAddress");
	var errorLastN = document.getElementById("errorLastN");
	var errorPassword = document.getElementById("errorPassword");
	var errorPhone = document.getElementById("errorPhone");

	//Validar que el valor contenga solo letras con una expresión regular(/^expr reg $/)
	var lettersOnly = /^[A-Za-z]+$/;

	//Validar que el valor contenga solo números con expresión regular
	var numbersOnly = /^([0-9])*$/;

	//Validar que el valor email tenga formato de email con expresión regular
	var emailFormat = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

	// Validate fields entered by the user: name, phone, password, and email
	//Name
	if((fName.value === "") || (fName.value.trim().length < 3) || (!lettersOnly.test(fName.value.trim()))){
		error++;
		errorName.style.display = "block";
		console.log("ha entrado el if del nombre");

	 } else {
		errorName.style.display = "none";
	 }

	 //Email
	if((fEmail.value == "") || (fEmail.value.trim().length < 3) || (!emailFormat.test(fEmail.value.trim()))){
		error++;
		errorEmail.style.display = "block";
	} else{
		errorEmail.style.display = "none";
	}
	//Address
	if(fAddress.value == "" || fAddress.value.trim().length < 3){
		error++;
		errorAddress.style.display = "block";
	} else{
		errorAddress.style.display = "none";
	}

	//LastName
	if((fLastN.value == "") || (fLastN.value.trim().length < 3) || (!lettersOnly.test(fLastN.value.trim()))){
		error ++;
		errorLastN.style.display = "block";
	} else{
		errorLastN.style.display = "none";
	}
	
	//Password
	if((fPassword.value == "") || (fPassword.value.trim().length < 3) || (lettersOnly.test(fPassword.value.trim())) || (numbersOnly.test(fPassword.value.trim()))){
		error ++;
		errorPassword.style.display = "block";
	} else{
		errorPassword.style.display = "none";
	}
	
	//Phone
	if((fPhone.value == "") || (fPhone.value.trim().length < 3) || (!numbersOnly.test(fPhone.value.trim()))){
		error ++;
		errorPhone.style.display = "block";
	} else{
		errorPhone.style.display = "none";
	}
	
	 
	if(error>0){
		alert("Error, todos los campos son obligatorios");
	}else{
		alert("OK");
	}

	return false;
}
