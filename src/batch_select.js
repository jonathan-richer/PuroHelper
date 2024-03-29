console.log("Puro helper est en marche ...");

// Créer + sélectionner le lot de la journée

const batchName = (() => {
    const today = new Date();
    const year = today.getFullYear().toString();
    const month = (m => {
        const rm = ++m;
        let str = rm.toString();
        if (str.length < 2) str = "0" + str;
        return str;
    })(today.getMonth());
    const date = (d => {
        let str = d.toString();
        if (str.length < 2) str = "0" + str;
        return str;
    })(today.getDate());
    return `${year}-${month}-${date}`;
})();

// Sélectionner lot d'aujourd'hui

const selectElt = document.getElementById("ctl00_CPPC_ddlBatch");
const btnSelect = document.getElementById("ctl00_CPPC_btnSelect");

const inputName = document.getElementById("ctl00_CPPC_txtBatchName");
const btnCreate = document.getElementById("ctl00_CPPC_btnCreate");

const newBtn = document.createElement("button");
newBtn.innerText = "Sélectionner le lot d'aujourd'hui";
newBtn.addEventListener("click", e => {
    e.preventDefault();
    selectElt.children[0].removeAttribute("selected");

    let found = false;
    for (const child of selectElt.children) {
        if (child.innerHTML === batchName) {
          child.setAttribute("selected","");
          found = true;
          break;
        }
    }

    if (found) {
        btnSelect.click();
    } else {
        inputName.value = batchName;
        btnCreate.click();
    }
});

newBtn.style["background"] = "#098A00";
newBtn.style["color"] = "#EDA600";
newBtn.style["font-weight"] = "750";
newBtn.style["font-size"] = "14px";

btnSelect.parentElement.appendChild(newBtn);
