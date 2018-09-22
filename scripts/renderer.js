const fs = require('fs');

function generateWords(count, value, fileContents){
	const wordsList = value.slice(0, count);
	while(wordsList.length < count){
		let word = wordsList[Math.floor(Math.random()*wordsList.length)];
		wordsList.push(word);
	}
	const result = wordsList.join().replace(/,/g, '');
	return fileContents.replace('{{Lipsum content}}', result);
}

function generateSentences(count, value, fileContents){
	const result = value.slice(0, count);
	while(result.length < count){
		let sentence= result[Math.floor(Math.random()*result.length)];
		result.push(sentence);
	}
	const content = fileContents.replace('{{Lipsum content}}', result.join('<br><br>'));
	return content;
}

function generateParagraphs(count, value, fileContents){
	const result = value.slice(0, count);
	while(result.length < count){
		let paragragh = result[Math.floor(Math.random()*result.length)];
		result.push(paragragh);
	}
	const content = fileContents.replace('{{Lipsum content}}', result.join('<br><br>'));
	return content;
};

function view(templateName, values, request, response){
	const fileContents = fs.readFileSync('./views/' + templateName + '.html', { encoding: 'utf-8' });
	response.write(fileContents);
}
module.exports.view = view;
module.exports.generateSentences = generateSentences;
module.exports.generateWords = generateWords;
module.exports.generateParagraphs = generateParagraphs;
