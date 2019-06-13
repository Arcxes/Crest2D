//StringParser.js
//Author - Arcxes

/*
    StringParser is designed to be the default parser for the websocket client, it handles normal string data
*/

//StringParser Class
export class StringParser{

    /**
     * set the data type for the socket
     * @param {WebSocket} socket websocket to be registed
     */
    register(socket){
        console.log(`WebSocket: ${socket} has been registered with StringParser`);
    }

    /**
     * encode the data
     * @param {string} data data to be encoded
     * @return {string} encoded data
     */
    encode(data){
        return data;
    }

    /**
     * decode the data
     * @param {string} data data to be decoded
     * @return {string} decoded data
     */
    decode(data){
        return data;
    }
}