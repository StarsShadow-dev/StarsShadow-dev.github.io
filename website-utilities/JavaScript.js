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

function test() {
	var wordlestate = window.localStorage.getItem('nyt-wordle-state');
	console.log (wordlestate);
}

window.onload = () => {
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
