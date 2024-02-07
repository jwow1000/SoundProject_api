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
        // make a 'div' element
        const newDiv = document.createElement('div');
        //const nestedNoImg = document.createElement('img');
        const nestedImg = document.createElement('img');
        // with a coolImg class
        nestedImg.dataset.coolImg = true;
        // add the discogs link
        const makeAlink = `https://www.discogs.com${data.results[i].uri}`;
        if (makeAlink) {
            nestedImg.dataset.link = makeAlink;
        }
        nestedImg.dataset.title = data.results[i].title;
        nestedImg.setAttribute('class', 'coolImg');


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
    console.log(e.target.dataset.secLink);
    if (e.target.dataset.coolImg) {
        if (imgFocused === false) {
            e.target.setAttribute('id', 'focusImg');
            // create the discogs link
            const discLinks = document.createElement('a');
            discLinks.innerText = 'discogs link';
            discLinks.setAttribute('id', 'discLink');
            discLinks.dataset.secLink = 'discLink';
            // create the reSearch link
            const reSearch = document.createElement('a');
            reSearch.innerText = 'reSearch';
            reSearch.setAttribute('id', 'reSearch');
            reSearch.dataset.secLink = 'reSearch';

            // create the youtube link
            const youTube = document.createElement('a');
            youTube.innerText = 'link 2 youtube';
            youTube.setAttribute('id', 'youTube');
            youTube.dataset.secLink = 'youTube';


            imgArea.appendChild(discLinks);
            imgArea.appendChild(reSearch);
            imgArea.appendChild(youTube);

            imgFocused = true;

        } else {
            // find the img with the focusImg
            e.target.setAttribute('id', '');
            const delLink = imgArea.querySelectorAll('a');
            console.log(delLink);
            for (let i = 0; i < delLink.length; i++) {
                delLink[i].remove();
            }

            imgFocused = false;
        }

    }

    if (e.target.dataset.secLink === 'reSearch') {
        getFirstFive(e.target.dataset.title);
    }
    if (e.target.dataset.secLink === 'youTube') {
        youTube();
    }
    if (e.target.dataset.secLink === 'discLink') {
        console.log(e.target.dataset.link);
    }
});

// function events for the focus links
function reSearch(s) {
    getFirstFive(s);
}
function youTube(s) {
    console.log('take me to youtube');
}
function discLinks(s) {
    console.log('take me to youtube');
}