let vdata = null;

$(document).ready(() => {
	vdata = new Vue({
		el: '#vue-app',
		data: {
			search: '',
			result: null,
			response: ''
		}
	});
});

function startSearch() {
	vdata.result = 'loading';
	$.ajax({
		type: 'GET',
		url: 'https://www.reddit.com/r/' + vdata.search + '.json'
	})
	.then((data) => {
		data = data.data.children;
		vdata.response = [];
		for (let obj of data) {
			vdata.response.push({
				title: obj.data.title,
				author: obj.data.author,
				score: obj.data.score,
				url: obj.data.url
			});
		}
		vdata.result = null;
	})
	.fail((data) => {
		vdata.result = data.statusText;
	});
	return false;
}