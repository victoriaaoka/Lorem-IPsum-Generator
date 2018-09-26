const fs = require('fs');

function generator(count, value, char){
	const theItemsArray = value.slice(0, count);
	while(theItemsArray.length < count){
		let newItem = theItemsArray[Math.floor(Math.random()*theItemsArray.length)];
		theItemsArray.push(newItem);
	}
	const result = theItemsArray.join(char);
	return result;
}

function generateWords(count, value, fileContents){
	const result = generator(count, value, '').replace(/,/g, '');
	return fileContents.replace('{{Lipsum content}}', result);
}

function generateBlock(count, value, fileContents){
	const result = generator(count, value, '<br><br>');
	return fileContents.replace('{{Lipsum content}}', result);
};

function view(templateName, values, request, response){
	const fileContents = fs.readFileSync('./views/' + templateName + '.html', { encoding: 'utf-8' });
	response.write(fileContents);
}
module.exports.view = view;
module.exports.generateWords = generateWords;
module.exports.generateBlock = generateBlock;
