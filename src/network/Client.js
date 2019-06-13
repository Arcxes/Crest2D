//Client.js
//Author - Arcxes

/*
    Client is designed to connect to a server, and send and receive packets
*/

//Client Class
export class Client{

    /**
     * 
     * @param {StringParser|JSONParser|BinaryParser} parser parser to use
     */
    constructor(parser){
        /**
         * @ignore
         * @type {WebSocket}
         */
        this.socket = null;
        /**
         * @ignore
         * @type {StringParser|JSONParser|BinaryParser}
         */
        this.parser = parser;
    }
    
    /**
     * connect to a web socket server
     * @param {string} url the url of the server
     */
    connect(url){
        this.socket = new WebSocket(url);
        this.parser.register(this.socket);
    }

    /**
     * send data to the server
     * @param {*} data data to send to the server
     */
    send(data){
        this.socket.send(this.parser.encode(data));
    }

    /**
     * parse data from the server
     * @param {*} data 
     * @return {*} data parsed into chosen parser format
     */
    parse(data){
        return this.parser.decode(data);
    }

    /**
     * set the onopen function of the websocket
     * @param {Function} callback onopen callback
     */
    set onopen(callback){
        this.socket.onopen = callback;
    }

    /**
     * set the onmessage function of the websocket
     * @param {Function} callback onmessage callback
     */
    set onmessage(callback){
        this.socket.onmessage = callback;
    }

    /**
     * set the onerror function of the websocket
     * @param {Function} callback onerror callback
     */
    set onerror(callback){
        this.socket.onerror = callback;
    }

    /**
     * set the onclose function of the websocket
     * @param {Function} callback onclose callback
     */
    set onclose(callback){
        this.socket.onclose = callback;
    }
}