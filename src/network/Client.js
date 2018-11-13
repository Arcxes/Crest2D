//Client.js
//Author - Arcxes

/*
    Client is designed to connect to a server, and send and receive packets
*/

//Client Class
export class Client{

    constructor(parser){
        this.socket = null;
        this.parser = parser;
    }

    connect(url){
        this.socket = new WebSocket(url);
        this.parser.register(this.socket);
    }

    send(json){
        this.socket.send(this.parser.encode(json));
    }

    parse(data){
        return this.parser.decode(data);
    }

    set onopen(callback){
        this.socket.onopen = callback;
    }

    set onmessage(callback){
        this.socket.onmessage = callback;
    }

    set onerror(callback){
        this.socket.onerror = callback;
    }

    set onclose(callback){
        this.socket.onclose = callback;
    }
}