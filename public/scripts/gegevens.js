const CONFIG = {
	spreadsheetId: '1YS4AiBkIROw78q5UHHoZYV_j480vCGwqZCBPnoLYAlY',
	spreadsheetName: 'Blad1'
}

async function getData() {
	let res = await fetch(`https://opensheet.elk.sh/${CONFIG.spreadsheetId}/${CONFIG.spreadsheetName}`)
	return await res.json();
}

function gegevensOphalen(data) {
	let main = document.querySelector('.verkennen');

	console.log(data);

	data.forEach(item => {
		let container = document.createElement('article');

		let naam = document.createElement('h2');
		naam.textContent = item['Naam'];

		let adres = document.createElement('h3');
		adres.textContent = item['Adres'];

		let sterren = document.createElement('sterren');
		sterren.min = 0;
		sterren.max = 5;
		sterren.value = Number(item['Sterren'] * 1);

		let review = document.createElement('p');
		review.textContent = `Review: ${item['Review']}`;

		container.appendChild(naam);
		container.appendChild(adres);
		container.appendChild(sterren);
		container.appendChild(review);

		main.appendChild(container);
	})

}

if (document.querySelector('.verkennen')) {
	getData()
		.then(data => {
			gegevensOphalen(data);
		})
}