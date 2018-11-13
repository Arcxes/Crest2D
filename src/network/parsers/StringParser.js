//StringParser.js
//Author - Arcxes

/*
    StringParser is designed to be the default parser for the websocket client, it handles normal string data
*/

//StringParser Class
export class StringParser{

    register(socket){
        console.log(`WebSocket: ${socket} has been registered with StringParser`);
    }

    encode(data){
        return data;
    }

    decode(data){
        return data;
    }
}