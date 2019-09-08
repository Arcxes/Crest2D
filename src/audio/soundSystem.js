export class Sound{
    constructor(URL){
        this.context = new AudioContext();        
    
        window.fetch(URL)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => this.context.decodeAudioData(arrayBuffer))
        .then(audioBuffer => {
            this.audioBuffer = audioBuffer;
            this.yodelBuffer = audioBuffer;
        });  
    }

    play(buffer){
        Sound.playSound(this.yodelBuffer);
    }

    static playSound(audioBuffer) {
      const context = new AudioContext();
      const source = context.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(context.destination);
      source.start();
    }


}