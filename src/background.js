console.log("Starting ...");

const uuid = () => btoa(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));

const actions = {
	ADD: "M3JqOHRlaGo5NnU3b29hZjluczVtNw==",
	FLUSH: "YjZ4Z2huNGViM3BlMzVycGc3MG82dA==",
	ACTION2: "MmJvcmRqc3k5aHNzaDFkd3VvM2JsbQ==",
	ACTION3: "amtleWV0ajNwamZxdHhic2NqYTI0",
	ACTION4: "dnN1ZzgwMnBsb2t2dTJ1ZWwwZGNn",
	ACTION5: "eTlnYmQzd2tjMzd6ajJ4ODF6cW1w",
	ACTION6: "ZHF6bDJsZGE4bDdnb3Q1bm94c2oyNw==",
	ACTION7: "ZXBzNXAzeWVtYm9jbXFuNXVzZWtkdg==",
	ACTION8: "OTJrZDFldzZ0cjRsb2d2amFybDNhbQ==",
	ACTION9: "YzdoemJybGhtcWdkbjM1aTJ5aWduOA=="
};

const treated = JSON.parse(localStorage.getItem("treated")) || [];

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
	switch (msg.action) {
		case actions.ADD:
			treated.push(msg.value);
			break;
		case actions.FLUSH:
			for (let i = treated.length - 1; i >= 0; i--) treated.pop();
			break;
		case actions.GET:
			// sendResponse({
			// 	action: actions.GET,
			// 	value: JSON.stringify(treated)
			// });
			sendResponse("a");
			break;
		return true;
	}
});

