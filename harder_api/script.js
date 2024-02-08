// api stuff


const baseUrl = 'https://api.discogs.com';
const myToken = 'dgoPiRdAagChWVYQqpfTKEYSVAJGpdSpPxuisxkx';
// global variable for focus
let imgFocused = false;

// declare submit page, image area, and search bar
const theForm = document.querySelector('#theForm');
const imgArea = document.querySelector('#imageArea');
const userInput = document.querySelector('#search');
const randoButt = document.querySelector('#randoButt');

const handleSubmit = function (e) {
    e.preventDefault();
    console.log(e);
    // input value
    const search = e.target[0].value;
    getFirstFive(search);
}
theForm.addEventListener('submit', handleSubmit);

randoButt.addEventListener('click', function (event) {
    event.stopImmediatePropagation();
    const rand = getRando();
    console.log('random', rand);
    //userInput.value = rand;
})

// random button function
async function getRando() {
    let randomNum = (Math.random() * 300000) + 200;
    const floorRando = Math.floor(randomNum);
    const response = await fetch(`${baseUrl}/labels/${floorRando}&token=${myToken}`, {
        headers: {
            'User-Agent': `reSearchDiscogs/1.0 +https://github.com/jwow1000/SoundProject_api`
        }
    });
    const data = await response.json();
    console.log(data.name);
    return data.name;
}

async function getFirstFive(s) {
    console.log(`searching for ${s}`);
    const response = await fetch(`${baseUrl}/database/search?q=${s}&type=all&token=${myToken}`, {
        headers: {
            'User-Agent': `reSearchDiscogs/1.0 +https://github.com/jwow1000/SoundProject_api`
        }
    });
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
            discLinks.dataset.link = e.target.dataset.link;
            discLinks.dataset.secLink = 'discLink';

            // create the reSearch link
            const reSearch = document.createElement('a');
            reSearch.innerText = 'reSearch';
            reSearch.setAttribute('id', 'reSearch');
            reSearch.dataset.title = e.target.dataset.title;
            reSearch.dataset.secLink = 'reSearch';

            // create the youtube link
            const youTube = document.createElement('a');
            youTube.innerText = 'link 2 youtube';
            youTube.setAttribute('id', 'youTube');
            youTube.dataset.secLink = 'youTube';
            youTube.dataset.title = e.target.dataset.title;

            imgArea.appendChild(discLinks);
            imgArea.appendChild(reSearch);
            imgArea.appendChild(youTube);

            imgFocused = true;

        } else {
            deleteFocus();
        }

    }
    function deleteFocus() {
        // find the img with the focusImg
        const focus = document.getElementById('focusImg');
        focus.setAttribute('id', '');
        const delLink = imgArea.querySelectorAll('a');
        console.log(delLink);
        for (let i = 0; i < delLink.length; i++) {
            delLink[i].remove();
        }
        // set global var to false
        imgFocused = false;
    }

    if (e.target.dataset.secLink === 'reSearch') {
        userInput.value = e.target.dataset.title;
        deleteFocus();
        console.log(e.target);
        userInput.value = e.target.dataset.title;
    }
    if (e.target.dataset.secLink === 'youTube') {
        const point = e.target.dataset.title;
        console.log(point);
        const link = `https://www.youtube.com/results?search_query=${point}`;
        window.open(link, '_blank');
    }
    if (e.target.dataset.secLink === 'discLink') {
        console.log(e.target);
        window.open(`${e.target.dataset.link}`, '_blank');

    }
});

