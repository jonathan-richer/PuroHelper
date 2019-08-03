console.log("Starting ...");

const actions = {
	ADD: "ADD",
	FLUSH: "FLUSH",
	GET: "GET"
};

const updateTreated = e => {
	if (e) localStorage.setItem("treated", JSON.stringify(e));
	else return JSON.parse(localStorage.getItem("treated")) || [];
}

const treated = updateTreated();

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
	console.log(msg.content.action);
	switch (msg.content.action) {
		case actions.GET:
			chrome.tabs.sendMessage(sender.tab.id, { senderRequestID: msg.requestID, content: { action: actions.GET, value: treated }});
			break;
		case actions.ADD:
			treated.push(msg.content.value);
			updateTreated(treated);
			break;
	}
	console.log("Finished!");
	return;
});
