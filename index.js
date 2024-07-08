const inputArea = document.querySelector(".textarea");
const todoContainer = document.querySelector(".todolist");
const addButton = document.querySelector(".add");
const statusText = document.querySelector(".status");
const tabs = document.querySelectorAll(".links");
const addTab = document.querySelector(".modified");
const completedTab = document.querySelector(".modified1");
const addContainer = document.querySelector(".addCon");
const completeContainer = document.querySelector(".complete");

let list = [];

tabs.forEach((element) => {
	element.addEventListener("click", () => {
		tabs.forEach((el) => {
			el.classList.remove("dark");
		});
		element.classList.add("dark");
		if (element.classList.contains("hidden")) {
			todoContainer.classList.add("dark");
		}
	});
});

tabs.forEach((tab) => {
	tab.addEventListener("click", () => {
		if (tab.classList.contains("modified")) {
			addContainer.classList.remove("hidden");
			completeContainer.classList.add("hidden");
		} else {
			addContainer.classList.add("hidden");
			completeContainer.classList.remove("hidden");
		}
	});
});

inputArea.addEventListener("keydown", (event) => {
	if (event.key === "Enter") {
		checkAndDisplay();
	}
});

function addText(txt) {
	let text = `
    <div class="textholder">
			<div class="di-1">
				<input class="check" type="checkbox" name="" id="">
				<p class="display">${txt}</p>
			</div>
			<ion-icon class="di-2" name="close-circle-outline"></ion-icon>
		</div>`;
	todoContainer.innerHTML += text;

	// const checkBox = document.querySelectorAll(".check");

	// checkBox.forEach((check) => {
	// 	const display = document.querySelector(".display");
	// 	check.addEventListener("click", () => {
	// 		if (check.checked) {
	// 			if (display && display.classList.contains("display")) {
	// 				display.style.textDecoration = "line-through";
	// 			}
	// 		} else {
	// 			display.style.textDecoration = "none";
	// 		}
	// 	});
	// });

	const deleteIcon = document.querySelectorAll(".di-2");

	deleteIcon.forEach((icon) => {
		icon.addEventListener("click", (event) => {
			const currentTxt = event.target
			// console.log("currentTxt: ", currentTxt);
			const currentTxtParent = currentTxt.parentElement.parentElement;
			console.log('currentTxtParent: ', currentTxtParent);

			  const storedList = JSON.parse(localStorage.getItem("list"));
		});
	});
}

const checkAndDisplay = () => {
	let userName = inputArea.value;

	if (userName === "") {
		displayStatus("empty input");
		statusText.style.color = "red";
		return;
	}

	const checkItem = JSON.parse(localStorage.getItem("list"));

	if (checkItem && checkItem.length > 0) {
		checkItem.push(userName);
		list = checkItem;
		console.log("list: ", list);
		localStorage.setItem("list", JSON.stringify(list));
	} else {
		list.push(userName);
		console.log("list: ", list);
		localStorage.setItem("list", JSON.stringify(list));
	}

	addText(userName);
	inputArea.value = "";
	displayStatus("successfully added");
	statusText.style.color = "#37e637";
};

function displayStatus(stat) {
	statusText.textContent = stat;
	setTimeout(() => {
		statusText.textContent = "";
	}, 3000);
}

window.addEventListener("DOMContentLoaded", () => {
	let storedList = JSON.parse(localStorage.getItem("list")) || [];

	if (storedList.length === 0) {
		return;
	} else {
		for (let i = 0; i < storedList.length; i++) {
			addText(storedList[i]);
			const removeButton = todoContainer.querySelector(
				`.textholder[data-index="${i}"] .remove-btn`
			);
		}
	}
});

addButton.addEventListener("click", checkAndDisplay);

// localStorage.clear();
