

const showHide = document.createElement("button");
showHide.innerText = "Afficher/Cacher envois traités";
showHide.style["float"] = "left";
showHide.style["background"] = "red";
showHide.style["color"] = "#FFF";
showHide.style["border"] = "none";
showHide.style["padding"] = "3px 14px";
showHide.addEventListener("click", e => {
	e.preventDefault();
	hiddenStatus = !hiddenStatus;
	const elements = document.querySelector("#ctl00_CPPC_gvBatchItems > tbody > tr").children;
	for (const element of elements) {
		element.style["background"] = hiddenStatus ? "": "red";
	}
	showHide.style["background"] = hiddenStatus ? "red" : "blue";
	hide(hiddenStatus ? treated : notTreated);
	show(hiddenStatus ? notTreated : treated);
});
document.getElementById("ctl00_CPPC_lblTitle").parentElement.appendChild(showHide);

processSingle2.addEventListener("click", e => {
	e.preventDefault();
	if (selected) sendMessageToBackground({ action: actions.ADD, value: selected });
	else return;
	if (!DEBUG) processSingle.click();
});

const actions = {
	ADD: "ADD",
	FLUSH: "FLUSH",
	GET: "GET"
};

const uuid = () => btoa(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));

const shipments = document.querySelectorAll("[name=\"rdoSelection\"]");
let treated = [];
let notTreated = [];

let selected = undefined;

const activeRequests = [];
const EXTENSIONID = "glgpmabmmcphggahbnemnpkjkaboffkh";
let hiddenStatus = true;

for (let i = 0; i < shipments.length; i++) {
	shipments[i].addEventListener("click", e => {
		selected = shipments[i].value;
	});
}

const hide = arr => {
	for (let j = 0; j < arr.length; j++) {
		for (let i = 0; i < shipments.length; i++) {
			if (shipments[i].value === arr[j]) {
				shipments[i].parentElement.parentElement.style['display'] = 'none';
			}
		}
	}
}
const show = arr => {
	for (let j = 0; j < arr.length; j++) {
		for (let i = 0; i < shipments.length; i++) {
			if (shipments[i].value === arr[j]) {
				shipments[i].parentElement.parentElement.style['display'] = 'table-row';
			}
		}
	}
}

const sendMessageToBackground = msg => {
	const requestID = uuid();
	const message = {
		requestID,
		content: {
			action: msg.action,
			value: msg.value
		}
	};
	chrome.runtime.sendMessage(EXTENSIONID, message);
	activeRequests.push(requestID);
};

sendMessageToBackground({ action: actions.GET, id: uuid() });

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
	for (let i = 0; i < activeRequests.length; i++) {
		if (activeRequests[i] === msg.senderRequestID) {
			activeRequests.splice(i, 1);
		}
	}
	if (msg.content.action === actions.GET) {
		hide(msg.content.value);
		treated = msg.content.value;
		notTreated = Array.from(shipments).map(e => e.value).filter(e => {
			for (const number of treated) {
				if (e === number) return false;
			}
			return true;
		});
	}
});
