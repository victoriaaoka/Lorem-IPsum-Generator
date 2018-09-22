const fs = require('fs');
const qs = require('querystring');
const renderer = require('./renderer.js');
const loremIpsum = require('./lipsum.js');

function homeRoute(request, response){
	if (request.url === '/') {
		//if the url === '/' && GET
		if (request.method === 'GET') {
			response.writeHead(200, { 'content-Type': 'text/html' });
			renderer.view('header', {}, request, response);
			renderer.view('index', {}, request, response);
      		renderer.view('footer', {}, request, response);
			response.end();
		} else {
			let requestBody = '';
			request.on('data', (data) => {
				requestBody += data;
			});
			request.on('end', () => {
				const formData = qs.parse(requestBody);
				const count = formData.thecount;
				let fileContents = fs.readFileSync('./views/lipsum.html', { encoding: 'utf-8' });
				if (formData.thecount <= 0) {
					fileContents = '<h4>Please ensure your entered a number and it is greater than 0!</h4>\
									<button class="button"><a href="/">Back to Generator</a> </button>';
				} else if (isNaN(formData.thecount)){
					fileContents = '<h4>Please ensure you entered a number!<h4>\
									<button class="button"> <a href="/">Back to Generator</a> </button>';
				}else if(!formData.contenttype){
					fileContents = '<h4>Please select an option </h4> <button class="button"> <a href="/">Backto Generator</a> </button>';
				}else {
					if (formData.contenttype=== 'words') {
						fileContents = renderer.generateWords(count, loremIpsum.words, fileContents);
					}
					if (formData.contenttype === 'sentences') {
						fileContents = renderer.generateSentences(count, loremIpsum.sentences, fileContents);
					}
					if (formData.contenttype === 'paragraphs') {
						fileContents = renderer.generateParagraphs(count, loremIpsum.paragraphs, fileContents);
					}
				}
				response.writeHead(200, { 'content-Type': 'text/html' });
				renderer.view('header', {}, request, response);
				response.write(fileContents);
				renderer.view('footer', {}, request, response);
				response.end();
			});
		}
	}
}

module.exports.home = homeRoute;

