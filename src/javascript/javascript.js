const player = new Plyr('#player', {
    seekTime: 2,
    speed: {
        selected: 1,
        options: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 3.25, 3.5, 3.75, 4]
    }
});

player.play(); // Start playback
