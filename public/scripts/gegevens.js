// Haal de gegevens uit de spreadsheet op
const CONFIG = {
	spreadsheetId: '1YS4AiBkIROw78q5UHHoZYV_j480vCGwqZCBPnoLYAlY',
	spreadsheetName: 'Blad1'
}

// Laat de gegevens uit de spreadsheet zien
async function getData() {
	let res = await fetch(`https://opensheet.elk.sh/${CONFIG.spreadsheetId}/${CONFIG.spreadsheetName}`)
	return await res.json();
}

// Zet de gegevens om in tekst voor de app
function gegevensOphalen(data) {
	let main = document.querySelector('.verkennen');

	data.forEach(item => {
		let container = document.createElement('article');

		let naam = document.createElement('h2');
		naam.textContent = item['Naam'];

		// let sterren = document.createElement('.sterren');
		// sterren.min = 0;
		// sterren.max = 5;
		// sterren.value = Number(item['Sterren'] * 1);

		let review = document.createElement('p');
		review.textContent = `Review: ${item['Review']}`;

		let adres = document.createElement('h3');
		adres.textContent = 'Adres: ' + item['Adres'];

		container.appendChild(naam);
		container.appendChild(review);
		container.appendChild(adres);
		// container.appendChild(sterren);

		main.appendChild(container);
	})

}

// Als je bij .verkennen komt, laat dan de gegevens zien
if (document.querySelector('.verkennen')) {
	getData()
		.then(data => {
			gegevensOphalen(data);
		})
}