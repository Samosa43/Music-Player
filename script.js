console.log("Hello world")
const audio = document.getElementById('audio');
const playBtn = document.getElementById('circleplay');
const progressBar = document.getElementById('progressbar');
const volumeSlider = document.getElementById('volume');
const songcells = document.querySelectorAll('.songcell');
const circlePlayBtn = document.getElementById('circleplay');
const playicon = document.getElementById('player-play-btn');
const searchInput = document.getElementById('searchInput');
const filterSongs = document.getElementById('filter-songs');
const mainbtn = document.getElementById('mainbtn');
const playIconSVG = '<svg class="svg" id="circleplay" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9V344c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z"/></svg>';
const pauseIconSVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="50"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM224 192V320c0 17.7-14.3 32-32 32s-32-14.3-32-32V192c0-17.7 14.3-32 32-32s32 14.3 32 32zm128 0V320c0 17.7-14.3 32-32 32s-32-14.3-32-32V192c0-17.7 14.3-32 32-32s32 14.3 32 32z"/></svg>';

mainbtn.addEventListener('click', () => {                            //play audio of main banner
    const playingSong = document.querySelector('.playingsong');
    playingSong.innerHTML = '';
    const mainbtnAudioFile = mainbtn.querySelector('audio').src;
    audio.src = mainbtnAudioFile;
    audio.play();
});



audio.addEventListener('timeupdate', () => {                        //progress bar
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    const progress = (currentTime / duration) * 100;
    progressBar.value = progress;
});
progressBar.addEventListener('input', () => {                         //seek music
    const seekTime = (progressBar.value * audio.duration) / 100;
    audio.currentTime = seekTime;
});

volumeSlider.addEventListener('input', () => {                        //volume control
    const volumeLevel = volumeSlider.value / 100;
    audio.volume = volumeLevel;
});

songcells.forEach(songcell => {
    songcell.addEventListener('click', () => {                //replace content of playing song
        const songInfo = songcell.querySelector('.songs');
        const playingSong = document.querySelector('.playingsong');
        playingSong.innerHTML = songInfo.innerHTML;
    });
});

const togglePlayPause = () => {                           //change play and pause icons 
    if (audio.paused) {
        audio.play();
        playicon.innerHTML = pauseIconSVG;
    } else {
        audio.pause();
        playicon.innerHTML = playIconSVG;
    }
};


circlePlayBtn.addEventListener('click', togglePlayPause);   // Toggle play/pause  button 
playicon.addEventListener('click', togglePlayPause);       // Toggle play/pause icon is clicked


const playerDisplay = document.getElementById('player');  // Show the player display
audio.addEventListener('play', () => {
    playerDisplay.style.display = 'block';
    playicon.innerHTML = pauseIconSVG;        
});

const playingSong = document.querySelector('.playingsong');      // play the audio of the current playing song
const playCurrentSongAudio = () => {
    const playingSongAudio = playingSong.querySelector('audio');
    if (playingSongAudio) {
        audio.src = playingSongAudio.src;
        audio.play();
        isPlaying = true;
    }
};


const observer = new MutationObserver(() => {             //observing playing songs 
    playCurrentSongAudio();
});

const observerConfig = { childList: true, subtree: true };
observer.observe(playingSong, observerConfig);

document.addEventListener('click', (event) => {                          //display filter-songs-div
    const clickedElement = event.target;

    const isSearchInput = clickedElement === searchInput;
    const isFilterSongs = filterSongs.contains(clickedElement);

    if (isSearchInput) {
        filterSongs.style.display = 'block';
    } else if (!isFilterSongs) {
        filterSongs.style.display = 'none';
    }
});
songcells.forEach(songcell => {
    const clonedSongcell = songcell.cloneNode(true);
    filterSongs.appendChild(clonedSongcell);
});

filterSongs.querySelectorAll('.songcell').forEach(songcell => {           // Hide songcells within filter-songs 
    songcell.style.display = 'none';
});

searchInput.addEventListener('input', () => {                         //song searching
    const searchText = searchInput.value.toLowerCase();
    const songcells = filterSongs.querySelectorAll('.songcell');       
     songcells.forEach(songcell => {                                    
        const songName = songcell.textContent.toLowerCase();
        if (songName.includes(searchText)) {
            songcell.style.display = 'block';                           
        } else {
            songcell.style.display = 'none';
        }


    });
});

const playtimeElements = filterSongs.querySelectorAll('.playtime'); 
playtimeElements.forEach(element => {
    element.style.display = 'none';
});
const filtersongCells = filterSongs.querySelectorAll('.songcell'); //filter songcells
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.trim().toLowerCase();

    if (searchTerm === '') {
        filtersongCells.forEach(songCell => {
            songCell.style.display = 'none';
        });
    } else {
        
    }
});

filtersongCells.forEach(songCell => {                                   //play audio present in songcell
    songCell.addEventListener('click', () => {
        const audioFile = songCell.querySelector('audio').src;
        audio.src = audioFile;
        audio.play();
    });

});
const songcellsInFilter = document.querySelectorAll('#filter-songs .songcell');
songcellsInFilter.forEach(songcell => {
    songcell.addEventListener('click', () => {
        const songInfo = songcell.querySelector('.songs');
        const playingSong = document.querySelector('.playingsong');
        playingSong.innerHTML = songInfo.innerHTML;
    });
});

