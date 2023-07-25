'use strict';

/**
 * Return a clone of the object.
 */
function clone(object) {
	return JSON.parse(JSON.stringify(object));
}

/**
 * Download a text file.
 */
function downloadTextFile(filename, text) {
	const element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
}

/**
 * Convert a color from hexadecimal (#ffffff) to normalized RGB.
 */
function hexToRgb(color) {
	const r = parseInt(color.substr(1, 2), 16) / 255.0;
	const g = parseInt(color.substr(3, 2), 16) / 255.0;
	const b = parseInt(color.substr(5, 2), 16) / 255.0;
	return [r, g, b];
}

/**
 * Convert a color from normalized RGB to hexadecimal (#ffffff).
 */
function rgbToHex(r, g, b) {
	function componentToHex(c) {
		let hex = c.toString(16);
		return hex.length == 1 ? '0' + hex : hex;
	}

	return '#' + componentToHex(r * 255) + componentToHex(g * 255) + componentToHex(b * 255);
}

/**
 * Show the HTMLElement.
 */
HTMLElement.prototype.show = function () {
	this.hidden = false;
};

/**
 * Hide the HTMLElement.
 */
HTMLElement.prototype.hide = function () {
	this.hidden = true;
};

/**
 * Prepend the HTMLElement to another HTMLElement sibling.
 */
HTMLElement.prototype.prepend = function (sibling) {
	if (sibling instanceof HTMLElement) {
		this.parentNode.insertBefore(sibling, this);
	}

	return this;
};

/**
 * Remove the HTMLElement.
 */
HTMLElement.prototype.remove = function () {
	this.parentNode.removeChild(this);
};

/**
 * Remove all the children of the HTMLElement.
 */
HTMLElement.prototype.removeChildren = function () {
	let child = this.firstElementChild;
	while (child) {
		this.removeChild(child);
		child = this.firstElementChild;
	}
};

/**
 * Append an HTMLCollection to the Element.
 */
Element.prototype.appendCollection = function (collection) {
	if (!(collection instanceof HTMLCollection)) {
		return;
	}

	for (let i = 0; i < collection.length; i++) {
		const element = collection[i];
		this.append(element);
	}
};
