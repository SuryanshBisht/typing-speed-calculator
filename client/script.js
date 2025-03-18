const textInput=document.querySelector('#quoteInput');
const quoteDisplay=document.querySelector('.quote-display');
let timerElement=document.querySelector('.timer');
const wpmElement=document.querySelector('.wpm');
let pass=false;
let seconds = 0;
let intervalId=0;
let wordCount=0;

// Function to fetch a random quote
async function getRandomQuote() {
	const url='/api/quotes';
	// const url= 'https://zenquotes.io/api/quotes';
	try {
		// Use the fetch API to get data from the API
		// const response = await fetch(url2, {mode:'no-cors'});
		const response = await fetch(url);
		// Check if the response is successful
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		// Parse the JSON response
		const data = await response.json();
		return data; // Optionally return the data
	} catch (error) {
		// Handle any errors
		console.error('Failed to fetch the random quote:', error);
	}
}

const randomIndex=(x)=>{
	return Math.floor(Math.random() * (x + 1))
}

async function renderNewQuote() {
	const quote = await getRandomQuote();
	// console.log(quote.length);
	const quotestr=quote[randomIndex(quote.length)]['q'];
	let quoteDisplayElement = '';

	for (let char of quotestr) {
		quoteDisplayElement += '<span>' + char + '</span>';
	}

	// console.log(quoteDisplayElement);
	const quotediv = document.getElementById('quoteDisplay');
	quotediv.innerHTML = quoteDisplayElement;
}

function startTimer() {
	seconds++;
	const speed=Math.round((textInput.value.length/5)/(seconds/6000));
	wpmElement.innerText=`${speed} wpm`;
	timerElement.innerText=`${seconds/100} s`;
	if(pass) {
		// console.log(textInput.value.length)
		clearInterval(intervalId); // Stops the interval
		// return;
	}
}

renderNewQuote()
    .then(() => {
        console.log("Quote rendered successfully!");
    })
    .catch(error => {
        console.error("Error rendering quote:", error);
    });	


textInput.addEventListener('input', (e)=>{
	const inputStr=e.target.value;
	// console.log(quoteDisplay.childNodes[0]);
	const n=quoteDisplay.childElementCount;
	for(let i=0; i<n; i++){
		// console.log(quoteDisplay[i]);
		let allequal=true;
		if(i>=inputStr.length){
			quoteDisplay.childNodes[i].className="";
			allequal=false;
		}
		else if(quoteDisplay.childNodes[i].innerText===inputStr[i]){
			quoteDisplay.childNodes[i].className='correct';
		}
		else{
			quoteDisplay.childNodes[i].className='incorrect';
			allequal=false;
		}
		if(allequal && n===inputStr.length){
			pass=true;
		}
	}
});

textInput.addEventListener('input', ()=>{
	// console.log('timer event triggered');
	intervalId=setInterval(startTimer, 10);
}, {once: true});
