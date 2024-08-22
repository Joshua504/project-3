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
/* ----------------------------- switching tabs ----------------------------- */
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
/* ------------------------------ enter-botton ------------------------------ */
inputArea.addEventListener("keydown", (event) => {
	if (event.key === "Enter") {
		checkAndDisplay();
	}
});
/* ------------------------- creating the todo-items ------------------------ */
let completeArray = [];

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
/* --------------- moving completed items to the completed tab -------------- */
	const checkBox = document.querySelectorAll(".check");

	checkBox.forEach((check) => {
		check.addEventListener("change", (e) => {
			const currentTxt = e.target;
			const textHolder = currentTxt.parentElement.parentElement;
			const pText = textHolder.querySelector(".display").textContent;

			if (check.checked) {
				const storedList = JSON.parse(localStorage.getItem("list")) || [];
				const updatedList = storedList.filter((item) => item !== text);
				const completedArray = storedList.filter((item) => item === text);
				localStorage.setItem("list", JSON.stringify(updatedList));
				localStorage.setItem("completedList", JSON.stringify(completedArray));

				const completedItem = textHolder.cloneNode(true);
				completeContainer.appendChild(completedItem);

				textHolder.remove();
			}
		});
	});
/* ------------------------------- delete-todo ------------------------------ */
	const deleteIcon = document.querySelectorAll(".di-2");

	deleteIcon.forEach((icon) => {
		icon.addEventListener("click", (event) => {
			const currentTxt = event.target;
			const textHolder = currentTxt.parentElement;
			const pText = textHolder.querySelector(".display").textContent;

			const storedList = JSON.parse(localStorage.getItem("list"));
			const updatedList = storedList.filter((item) => item !== pText);
			localStorage.setItem("list", JSON.stringify(updatedList));

			textHolder.remove();
			displayStatus("successfully deleted");
			statusText.style.color = "red";
		});
	});
}
/* --------------------------- displaying the todo -------------------------- */
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
		localStorage.setItem("list", JSON.stringify(list));
	} else {
		list.push(userName);
		localStorage.setItem("list", JSON.stringify(list));
	}

	addText(userName);
	inputArea.value = "";
	displayStatus("successfully added");
	statusText.style.color = "#37e637";
};
/* ----------------------------- status display ----------------------------- */
function displayStatus(stat) {
	statusText.textContent = stat;
	setTimeout(() => {
		statusText.textContent = "";
	}, 3000);
}
/* --------------- retrieving from localstorage when reloading -------------- */
window.addEventListener("DOMContentLoaded", () => {
	let storedList = JSON.parse(localStorage.getItem("list")) || [];

	if (storedList.length === 0) {
		return;
	} else {
		for (let i = 0; i < storedList.length; i++) {
			addText(storedList[i]);
		}
	}
});

addButton.addEventListener("click", checkAndDisplay);
// localStorage.clear();
