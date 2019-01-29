//JSONParser.js
//Author - Arcxes

/*
    JSONParser is designed to convert json data to a string, ready to be sent over the network
*/

//JSONParser Class
export class JSONParser{

    register(socket){
        console.log(`WebSocket: ${socket} has been registered with JSONParser`);
    }

    encode(data){
        let string = JSON.stringify(data);
        return string;
    }

    decode(data){
        let json = JSON.parse(data);
        return json;
    }
}