customElements.define('custom-element', class extends HTMLElement {
	connectedCallback() {
		setTimeout(() => {
			let originalContents = this.innerHTML;
			let test = this.getAttribute('test');
			this.innerHTML = `
			<p>You said "${originalContents}", with test attibute "${test}".</p>
			`;
		}); 
	}
});

customElements.define('custom-blink', class extends HTMLElement {
	connectedCallback() { setTimeout(() => { this.renderContents(); }); }
	
	renderContents() {
		let that = this;
		var showing = true
		setInterval(() => {
			if (showing) {
				that.style.visibility = 'hidden';
				showing = false;
			}
			else {
				that.style.visibility = 'visible';
				showing = true;
			}
		}, this.getAttribute('rate'));
	}
});

function setUpRainbowTags() {
	let colors = [
		'red',
		'green',
		'blue',
	];
	document.querySelectorAll(".rainbow").forEach(element => {
		var colorIndex = 0;
		setInterval(() => {
			let thisColor = colors[colorIndex];
			element.style.color = thisColor;
			colorIndex = (colorIndex + 1) % colors.length;
		}, element.getAttribute('rate') ?? 5000);
	});	
}

function clipboardsave(element) {
	let contents = element.getAttribute('clipboard-contents');
	navigator.clipboard.writeText(contents);
}

// Local storage
function toggleDebug() {
	if (window.localStorage.getItem("debug") == 'true') {
		window.localStorage.removeItem('debug');
		alert("Debug mode turned off.");
		location.reload();
	}
	else {
		window.localStorage.setItem('debug', 'true');
		alert("Debug mode turned on.");
		location.reload();
	}
}

function setUpPopups() {
	document.querySelectorAll("div.Popup").forEach(element => {
		let toggleElement = element.querySelector(".Popup-Toggle");
		if (toggleElement === undefined) {
			console.log("No popup toggle found.");
			return;
		}
		let contentElement = element.querySelector(".Popup-Contents");
		if (contentElement === undefined) {
			console.log("No popup content found.");
			return;
		}
		toggleElement.addEventListener('click', element => {
			let popupElement = document.createElement("div");
			popupElement.className = "Open-Popup";
			popupElement.innerHTML = `
			<div class="Popup-Background"></div>
			<div class="Popup-Container"></div>
			`;
			popupElement.querySelector(".Popup-Background").addEventListener('click', element => {
				popupElement.remove();
			});
			contentElement.style = "display: block !important;";
			popupElement.querySelector(".Popup-Container").appendChild(contentElement);
			document.body.appendChild(popupElement);
		});
	});
}

function setUpNav() {
	document.querySelector(".hud").innerHTML = `
	<div class="center white greyB">
		<a class="inline-block" href="https://starsshadow-dev.github.io" style="width: 400px;"><h1> StarsShadow-dev </h1></a>
	</div>
	`
}

window.onload = () => {
	setUpNav();
	setUpPopups();
	setUpRainbowTags();
	document.querySelectorAll(".javascript-disabled").forEach(element => {
		element.parentNode.removeChild(element); 
	});
	if (window.localStorage.getItem("debug") != 'true') {
		document.querySelectorAll(".debug-only").forEach(element => {
			element.parentNode.removeChild(element); 
		});
	}
}
