//JSONParser.js
//Author - Arcxes

/*
    JSONParser is designed to convert json data to a string, ready to be sent over the network
*/

//JSONParser Class
export class JSONParser{

    /**
     * set the data type for the socket
     * @param {WebSocket} socket websocket to be registed
     */
    register(socket){
        console.log(`WebSocket: ${socket} has been registered with JSONParser`);
    }

    /**
     * encode the data in json format
     * @param {Object} data data to be encoded
     * @return {string} encoded data
     */
    encode(data){
        let string = JSON.stringify(data);
        return string;
    }

    /**
     * decode the data
     * @param {*} data data to be decoded
     * @return {Object} decoded data
     */
    decode(data){
        let json = JSON.parse(data);
        return json;
    }
}