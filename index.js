const inputArea = document.querySelector(".textarea");
const todoContainer = document.querySelector(".todolist");
const addButton = document.querySelector(".add");
const statusText = document.querySelector(".status");
const tabs = document.querySelectorAll(".links");

let list = [];

tabs.forEach((element) => {
	element.addEventListener("click", () => {
		tabs.forEach((el) => {
			el.classList.remove("dark");
		});
		element.classList.add("dark");
	});
});

addButton.addEventListener("click", () => {
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
});

function addText(txt) {
	let text = `
    <div class="textholder">
			<input class="check" type="checkbox" name="" id="">
			<p class="display">${txt}</p>
		</div>`;
	todoContainer.innerHTML += text;
	
	const checkBox = document.querySelectorAll(".check");
	console.log('checkBox: ', checkBox);

	checkBox.forEach((check) => {
		check.addEventListener("click", () => {
			check.style.color = "#6e35af";
			console.log("check: ", check);
		});
	});
}


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
		}
	}
});

// localStorage.clear();

// const checkBox = document.querySelector(".box")
// const radio = document.querySelector(".radio")
// const radio1 = document.querySelector(".radio1")
// const submit = document.querySelector(".submit")
// const display = document.querySelector(".display")

// submit.addEventListener("click", ()=>{
// } )

// let purchase = 300;

// let check = purchase >= 100 ? "discount" : "no-discount" ;
// console.log('check: ', check);
