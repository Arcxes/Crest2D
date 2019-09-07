//BinaryParser.js
//Author - Arcxes

/*
    BinaryParser is designed to convert json data to binary data and binary data to json data
*/

//BinaryParser Class
export class BinaryParser{

    constructor(){
        /** byte multiplier */
        this.byteMultiplier = 2;
    }

    /**
     * set the data type for the socket
     * @param {WebSocket} socket websocket to be registed
     */
    register(socket){
        socket.binaryType = "arraybuffer";
        console.log(`WebSocket: ${socket} has been registered with BinaryParser`);
    }

    /**
     * encode data in binary format
     * @param {Object} data data to be encoded
     * @return {ArrayBuffer} buffer containing binary data
     */
    encode(data){
        let string = JSON.stringify(data);
        let buffer = new ArrayBuffer(string.length * this.byteMultiplier);
        let bufferView = new Uint16Array(buffer);
        let length = string.length;
        for(let i=0; i<length; i++){
            bufferView[i] = string.charCodeAt(i);
        }
        return buffer;
    }

    /**
     * decode the data
     * @param {*} data data to be decoded
     * @return {Object} json form of the data
     */
    decode(data){
        let string = String.fromCharCode.apply(null, new Uint16Array(data));
        let json = JSON.parse(string);
        return json;
    }
}