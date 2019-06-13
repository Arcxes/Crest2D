//InputManager.js
//Author - Arcxes

/*
    InputManager is designed to unify click and touch events into a single click event
*/

//InputManager Class
export class InputManager{

    /**
     * add a click event to the element
     * @param {HTMLElement} element element to detect clicks on
     * @param {Function} callback function to be called if click occurs
     * @param {*} [options=false] options to pass to the event
     */
    static addClickEvent(element,callback,options=false){
        element.addEventListener("click",callback,options);
        element.addEventListener("touchstart",callback,options);
    }

    /**
     * remove click event from the element
     * @param {HTMLELement} element element to detect clicks on
     * @param {Function} callback function to be called if click occurs
     * @param {*} [options=false] options to pass to the event
     */
    static removeClickEvent(element,callback,options=false){
        element.removeEventListener("click",callback,options);
        element.removeEventListener("touchstart",callback,options);
    }
}