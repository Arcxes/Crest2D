//Sound.js
//Author - Daniel Wedding

/*
   Sound is used to store and use a sound object
*/

export class Sound {
    constructor(audioBuffer) {
        /* audio buffer of the sound */
        this.audioBuffer = audioBuffer;
        /* media source of the sound */
        this.src = "/sound.mp3";
        /* buffer source of the sound */
        this.source;
    }
}