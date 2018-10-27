//InputManager.js
//Author - Arcxes

/*
    InputManager is designed to unify click and touch events into a single click event
*/

//InputManager Class
export class InputManager{

    //add a click event to the element
    static addClickEvent(element,callback,options=false){
        element.addEventListener("click",callback,options);
        element.addEventListener("touchstart",callback,options);
    }

    //remover click event from the element
    static removeClickEvent(element,callback,options=false){
        element.removeEventListener("click",callback,options);
        element.removeEventListener("touchstart",callback,options);
    }
}