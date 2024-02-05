const baseUrl = 'https://api.discogs.com/database/';

const myToken = 'dgoPiRdAagChWVYQqpfTKEYSVAJGpdSpPxuisxkx';
const printArt1 = document.querySelector('#printArt1');
const printArt2 = document.querySelector('#printArt2');
const theForm = document.querySelector('#submit');

const handleSubmit = function (e) {
    e.preventDefault();
    const song = e.target[0].value;
    console.log(song);
    getTheLyrics(song);

}

theForm.addEventListener('submit', handleSubmit);


async function getTheLyrics(s) {
    console.log(`searching for ${s}`);
    const response = await fetch(`${baseUrl}/search?q=${s}&token=${myToken}`);
    const data = await response.json();

    console.log(data);
    printArt1.src = data.results[0].cover_image;
    printArt2.src = data.results[1].cover_image;

}

