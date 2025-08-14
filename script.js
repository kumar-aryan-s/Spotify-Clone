


console.log("Welcome to Spotify");
let songindex = 0;
let audioElement = new Audio('./Songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let Progressbar = document.getElementById('Progressbar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let durationDisplay = document.getElementById('durationDisplay');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let Songs = [
    { songName: "Ban Ja Tu Meri Rani", filepath: "./Songs/1.mp3", coverPath: "./Cover/1.jpg" },
    { songName: "Janiye", filepath: "./Songs/2.mp3", coverPath: "./Cover/2.jpg" },
    { songName: "Nain ta Heere", filepath: "./Songs/3.mp3", coverPath: "./Cover/3.jpg" },
    { songName: "Hayye Oye", filepath: "./Songs/4.mp3", coverPath: "./Cover/4.jpg" },
    { songName: "Dheere Dheere", filepath: "./Songs/5.mp3", coverPath: "./Cover/5.jpg" },
    { songName: "Bekhayali", filepath: "./Songs/6.mp3", coverPath: "./Cover/6.jpg" },
    { songName: "Fakira By Sanam", filepath: "./Songs/7.mp3", coverPath: "./Cover/7.jpg" },
    { songName: "Jeene Laga Hu", filepath: "./Songs/8.mp3", coverPath: "./Cover/8.jpg" },
    { songName: "Zara Zara By Jalraj", filepath: "./Songs/9.m4a", coverPath: "./Cover/9.jpg" },
    { songName: "O Mere Sona re", filepath: "./Songs/10.mp3", coverPath: "./Cover/10.jpg" }
];

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = Songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = Songs[i].songName;
});

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
});

// Listen to Events
audioElement.addEventListener('timeupdate', () => {
    let Progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    Progressbar.value = Progress;

    if(audioElement.duration) {
        let minutes = Math.floor(audioElement.duration / 60);
        let seconds = Math.floor(audioElement.duration % 60).toString().padStart(2, '0');
        durationDisplay.innerText = `${minutes}:${seconds}`;
    }
});

Progressbar.addEventListener('change', () => {
    audioElement.currentTime = Progressbar.value * audioElement.duration / 100;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.add('fa-circle-play');
        element.classList.remove('fa-circle-pause');
    });
};



// Make clicking anywhere on a songItem play the song
songItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        makeAllPlays();
        songindex = index;
        audioElement.src = Songs[songindex].filepath;
        masterSongName.innerText = Songs[songindex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');

        // Update the clicked song's icon
        let icon = item.querySelector('.songItemPlay');
        icon.classList.remove('fa-circle-play');
        icon.classList.add('fa-circle-pause');
    });
});


document.getElementById('next').addEventListener('click', () => {
    if (songindex >= 9) {
        songindex = 0;
    }
    else {
        songindex += 1;
    }
    audioElement.src = `./Songs/${songindex + 1}.mp3`;
    masterSongName.innerText = Songs[songindex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
});

document.getElementById('previous').addEventListener('click', () => {
    if (songindex <= 0) {
        songindex = 0;
    }
    else {
        songindex -= 1;
    }
    audioElement.src = `./Songs/${songindex + 1}.mp3`;
    masterSongName.innerText = Songs[songindex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
});

// Theme Toggle
document.getElementById("themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
});
