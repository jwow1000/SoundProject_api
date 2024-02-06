const baseUrl = 'https://api.discogs.com';

const myToken = 'dgoPiRdAagChWVYQqpfTKEYSVAJGpdSpPxuisxkx';
const printArt1 = document.querySelector('#printArt1');
const printArt2 = document.querySelector('#printArt2');
const theForm = document.querySelector('#submit');
const imgArea = document.querySelector('#imageArea');

const handleSubmit = function (e) {
    e.preventDefault();
    const song = e.target[0].value;
    console.log(song);
    getFirstFive(song);

}

theForm.addEventListener('submit', handleSubmit);

async function getFirstFive(s) {
    console.log(`searching for ${s}`);
    const response = await fetch(`${baseUrl}/database/search?q=${s}&token=${myToken}`);
    const data = await response.json();

    // clear image area
    imgArea.innerHTML = ``;
    console.log(data);

    for (let i = 0; i < 50; i++) {
        const nestedImg = document.createElement('img');
        const newA = document.createElement('a')
        // add the discogs link
        newA.href = `https://www.discogs.com${data.results[i].uri}`;
        // give the a tags a target = _blank to open new tab
        newA.setAttribute('target', '_blank');
        // set the img source
        nestedImg.src = data.results[i].cover_image;
        // append to the document
        imgArea.appendChild(newA);
        newA.appendChild(nestedImg);

    }
}

