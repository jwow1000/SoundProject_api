const baseUrl = 'https://api.discogs.com';
let imgFocused = false;

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
    const response = await fetch(`${baseUrl}/database/search?q=${s}?page=1&per_page=10&token=${myToken}`);
    const data = await response.json();

    // clear image area
    imgArea.innerHTML = ``;
    console.log(data);

    for (let i = 0; i < 10; i++) {
        // make a 'a' element
        const newDiv = document.createElement('div');
        //const nestedNoImg = document.createElement('img');
        const nestedImg = document.createElement('img');
        // add the discogs link
        const makeAlink = `https://www.discogs.com${data.results[i].uri}`;
        if (makeAlink) {
            nestedImg.dataset.link = makeAlink;
        }
        nestedImg.dataset.title = data.results[i].title;
        // give the a tags a target = _blank to open new tab
        // newDiv.setAttribute('target', '_blank');
        // set the no-img source

        newDiv.setAttribute('class', 'bgPatterns');

        // set the img source
        nestedImg.src = data.results[i].cover_image;
        // append to the document
        imgArea.appendChild(newDiv);
        //newA.appendChild(nestedNoImg);
        newDiv.appendChild(nestedImg);

    }
}

imgArea.addEventListener('click', function (e) {
    console.log(e.target);
    if (imgFocused !== true) {
        e.target.setAttribute('id', 'focusImg');
        const discLinks = document.createElement('a');
        discLinks.innerText = 'discogs link';
        discLinks.href = e.target.dataset.link;
        imgArea.appendChild(discLinks);
        imgFocused = true;
        // const newEsc = document.createElement('img');
        // newEsc.src = 'images/esc-button.png';
        // newEsc.style.zIndex = 2;
        // e.target.appendChild(newEsc);

    } else {
        e.target.removeAttribute('focusImg');
        imgFocused = false;
    }
})

