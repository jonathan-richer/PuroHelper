console.log("Puro helper est en marche ...");

// Acquérir les éléments à modifier.
// Bouton « Créer une expédition »

const createShipment = document.getElementById("ctl00_CPPC_btnCreate");

// Bouton « Traiter l'envoi sélectionné »

const processSingle = document.getElementById("ctl00_CPPC_btnProcessSingle");

// Bouton « Traiter le lot »

const processBatch = document.getElementById("ctl00_CPPC_btnProcessBatch");


/*
 * Modifier le style des élément selon la règle suivante:
 * « Créer une expédition » et « Traiter l'envoi sélectionné » : Arrière-plan    -> Vert fluo   (#57FF47)
 *																 Alignement      -> Gauche
 *																 Couleur du text -> Bleu        (#0000FF)
 *																 Grosseur        -> 750
 * Hover (cherche comment faire)							   : Arrière-plan    -> Vert        (#31D121)
 *
 * Ajouter une confirmation à l'appui de « Traiter le lot ».
 *
 */

// « Créer une expédition » et « Traiter l'envoi sélectionné »

createShipment.style["float"]       = "left";
createShipment.style["background"]  = "#0000FF"
createShipment.style["color"]       = "#57FF47";
createShipment.style["font-weight"] = "750";
createShipment.style["font-size"]   = "14px";


if (processSingle !== null) {
	processSingle.style["float"]       = "left";
	processSingle.style["background"]  = "#57FF47"
	processSingle.style["color"]       = "#0000FF";
	processSingle.style["font-weight"] = "750";
	processSingle.style["font-size"]   = "14px";
}


// « Traiter le lot » confirmation
if (processBatch !== null) {
	const btn = document.createElement("button");
	const btnCancel = document.createElement("button");

	processBatch.style.display = "none";

	btn.innerText = "Traiter le lot";
	btn.style.display = "inline-block";
	btn.onclick = e => {
		e.preventDefault();
	    if (confirm("Êtes-vous certain de vouloir traiter le lot?")) {
	    	processBatch.style.display = "inline-block";
			btnCancel.style.display = "inline-block";
	    	btn.style.display = "none";
	    }
	}

	btnCancel.innerText = "Annuler";
	btnCancel.style.display = "none";
	btnCancel.onclick = e => {
		e.preventDefault();
		processBatch.style.display = "none";
		btnCancel.style.display = "none";
		btn.style.display = "inline-block";
	}

	processBatch.parentElement.appendChild(btn);
	processBatch.parentElement.appendChild(btnCancel);
}
