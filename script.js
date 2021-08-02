const listMusic = [
    {
        id: 0,
        name: "Cowboy Bebop OST 3 Blue - Blue",
        duration: "5:04"
    },
    {
        id: 1,
        name: "Savage Garden - I Want You",
        duration: "3:52"
    },
    {
        id: 2,
        name: "Skeler - Arcadia",
        duration: "0:42"
    },
    {
        id: 3,
        name: "Marshmello - Silence Artista",
        duration: "0:32"
    },
    {
        id: 4,
        name: "song - song",
        duration: "0:30"
    }
]

// Lista del UL
const menuListUl = document.querySelector("#music-list-menu");

// Botones
const play = document.querySelector("#play");
const forward = document.querySelector("#forward");
const back = document.querySelector("#back");
const infinity = document.querySelector("#infinity");
const random = document.querySelector("#random");
const volume = document.querySelector("#volume");

// Informacion de la musica
const title = document.querySelector("#title");
const img = document.querySelector(".info-music-img");
const duration = document.querySelector("#date");
const containerProgress = document.querySelector("#container-progress");
const progress = document.querySelector("#progress");

// Volumen
const iconVolume = document.querySelector("#icon-volume");
const selector = document.querySelector("#selector");
const selectValue = document.querySelector(".select-value");

// Audio
const audioObj = new Audio(`./musica/${listMusic[0].name}.mp3`);
let actualSong = 0;






// Agregar Musica a la lista de HTML
const presentPlay = () => {
    // Lista de Musica
    const listSongs = document.querySelectorAll(".music-list-song");

    listSongs.forEach((song, index) => {
        song.classList.remove("active");
        song.lastChild.textContent = listMusic[index].duration;

        if (index == actualSong) {
            song.lastChild.textContent = "Playing";
        }
    });
};

// Play Musica
const playMusic = (id) => {
    if (actualSong != id) {
        actualSong = id;

        const music = listMusic.find(a => a.id == id);

        audioObj.pause();
        audioObj.src = `./musica/${music.name}.mp3`;
        audioObj.play();

        title.textContent = music.name;
        img.src = `./img/${music.name}.jpg`;

    } else {
        audioObj.play();
    }
    presentPlay();
    play.children[0].classList.replace('fa-play', 'fa-pause');
};

listMusic.forEach((music) => {
    const li = document.createElement("li");
    li.className = "music-list-song";
    li.innerHTML = `<p>${music.name}</p><span>${music.duration}</span>`;

    menuListUl.appendChild(li);

    li.addEventListener("click", () => {
        presentPlay();
        li.classList.add("active");
        li.lastChild.textContent = "Playing";
        playMusic(music.id);
    });
});



// Tiempo del reproductor
const format = (time) => time >= 10 ? time : `0${time}`;

audioObj.addEventListener('timeupdate', () => {

    let musicSec = Math.floor(audioObj.currentTime % 60);
    let musicMint = Math.floor((audioObj.currentTime / 60) % 60);
    let durantSec = Math.floor(audioObj.duration % 60);
    let durantMint = Math.floor((audioObj.duration / 60) % 60);

    duration.textContent = `${format(musicMint)}:${format(musicSec)}/${format(durantMint)}:${format(durantSec)}`;

    progress.style.width = (audioObj.currentTime / audioObj.duration) * 100 + "%";

    if (audioObj.ended) {
        random.classList.contains("button-active") ? randomSong() :
            actualSong == (listMusic.length - 1) ? playMusic(0) : playMusic(actualSong + 1);
    }
});

// Barra de Progreso
containerProgress.addEventListener("click", (e) => {
    const total = containerProgress.offsetWidth;
    let click = e.offsetX;
    audioObj.currentTime = (click / total) * audioObj.duration;
});


// Botones del Reproductor
play.addEventListener("click", () => {
    if (play.children[0].classList.contains('fa-pause')) {
        play.children[0].classList.replace('fa-pause', 'fa-play')
        audioObj.pause();
    } else {
        playMusic(actualSong);
    }
});

forward.addEventListener("click", () => audioObj.currentTime += 10);

back.addEventListener("click", () => audioObj.currentTime -= 10);

infinity.addEventListener("click", () => {
    audioObj.loop ? audioObj.loop = false : audioObj.loop = true;
    infinity.classList.toggle("button-active");
});

random.addEventListener("click", () => random.classList.toggle("button-active"));

const randomSong = () => {
    let max = listMusic.length;
    console.log(max);
    let randNum = Math.floor(Math.random() * max);
    if (randNum === actualSong) {
        randomSong();
    } else {
        playMusic(randNum);
    }
}

// Volumen
function inputValue() {
    let volumen = volume.value;
    audioObj.volume = (volumen / 100);
    selectValue.innerText = volumen;
    return volumen;
};
inputValue();

volume.addEventListener("input", () => {

    selector.style.opacity = "1";
    selector.style.animation = "";

    changeVolume(inputValue());
});

volume.addEventListener("click", () => {
    const animation1 = setInterval(() => selector.style.animation = "chalengeVolumeOutput 2s", 100);
    animation1;
    selector.style.opacity = "0";
});

const changeVolume = (volumen) => {
    volumen === "0" ? iconVolume.classList.replace('fa-volume-down', 'fa-volume-mute') : iconVolume.classList.replace('fa-volume-mute', 'fa-volume-down');
    audioObj.volume = (volumen / 100);
};

iconVolume.addEventListener("click", () => {
    iconVolume.classList.contains('fa-volume-mute') ? changeVolume(volume.value) : changeVolume("0");
});