function F2C(x){
	var value = parseFloat(x);
	var newValue = Math.round((value - 32) * 5 / 9);
	return newValue + '°C';
}

function C2F(x){
	return (x * 9 / 5) + 32;
}

function oz2g(x){
	// x is regex match string that should be a digit ending with ounce(s)
	// Doesn't properly process weird strings like 1 1/2 ounces
	var value = parseFloat(x);
	var newValue = Math.round(value * 28.3495);
	return newValue + 'g';
}

function g2oz(x){
	var value = parseFloat(x);
	var newValue = value / 28.3495;
	return newValue.toFixed(1) + 'oz';
}

function lbs2g(x){
	var value = parseFloat(x);
	var newValue = oz2g(value * 16);
	return newValue;
}

function quarttoml(x){
	var value = parseFloat(x);
	var newValue = value * 946;
	return newValue + 'ml';
}

function pinttoml(x){
	var value = parseFloat(x);
	var newValue = value * 473;
	return newValue + 'ml';	
}

var elements = document.getElementsByTagName('*');

for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    for (var j = 0; j < element.childNodes.length; j++) {
        var node = element.childNodes[j];

        if (node.nodeType === 3) {
            var text = node.nodeValue;

			var regexFtoC = /((\d+(?:\.\d*)?)\s*(degrees*|\°)*\s*(F(ahrenheit)*)\b)/gi;
			var regexOztoG = /((\d*\s*\d*\/)*(\d*(\s|-)o(z|(unce))+s*))/gi;
			var regexLbtoG = /((\d*\s*\d*\/)*(\d*(\s|-)((lb)|(pound))+s*))/gi;
			var regexCupstoG = /((\d*\s*\d*\/)*(\d*(\s|-)cups*))/gi;
			var regexQuarttoL = /((\d*\s*\d*\/)*(\d*(\s|-)quarts*))/gi;
			var regexPinttoL = /((\d*\s*\d*\/)*(\d*(\s|-)pints*))/gi;

            var replacedText = text.replace(regexOztoG, oz2g);
            var replacedText = replacedText.replace(regexLbtoG, lbs2g);
            var replacedText = replacedText.replace(regexFtoC, F2C);
            var replacedText = replacedText.replace(regexQuarttoL, quarttoml);
            var replacedText = replacedText.replace(regexPinttoL, pinttoml);

            if (replacedText !== text) {
                element.replaceChild(document.createTextNode(replacedText), node);
            }

        }
    }
}