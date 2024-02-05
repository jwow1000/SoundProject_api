const url = 'https://api.lyrics.ovh/v1';
const printLyrics = document.querySelector('#scrollText');
const theForm = document.querySelector('#submit');

const artistInfo = {
    name: 'name',
    song: 'song',
    nameLength() {
        let arr = this.name.split(' ');
        return arr.length;
    },
    songLength() {
        let arr = this.song.split(' ');
        return arr.length;
    }

}


const handleSubmit = function (e) {
    e.preventDefault();
    const artist = e.target[0].value;
    const song = e.target[1].value;
    artistInfo.name = artist;
    artistInfo.song = song;
    getTheLyrics(artist, song);


}

theForm.addEventListener('submit', handleSubmit);


async function getTheLyrics(a, s) {
    // convert spaces to underscores?
    try {
        const response = await fetch(`${url}/${a}/${s}`);
        const song = await response.json();
        let str = parseString(song.lyrics);
        console.log(string2Line(str));
        printLyrics.innerText = str;

    } catch (e) {
        console.log(`We can't find that song`);
        printLyrics.innerText = `We can't find that song`;
    }


}

function parseString(str) {
    // isolate heading
    const buffArray = str.split('\n');
    // use heading to remove it from string
    buffArray.shift();
    return newString.trim();
}

function string2Line(str) {
    // isolate heading
    const buffArray = str.split('\n');
    // use heading to remove it from string
    buffArray.shift();
    let str1 = buffArray.toString();
    const arr2 = str1.removeAll(',');
    console.log(arr2.toString());

}