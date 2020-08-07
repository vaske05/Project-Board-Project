import { statusDivs, status } from "./constants";

export function mapTaskStatus(targetDiv) {
    switch(targetDiv) {
        case statusDivs.done:
            return status.DONE;
        case statusDivs.toDo:
            return status.TO_DO;
        case statusDivs.inProgress:
            return status.IN_PROGRESS;
        default: 
            return status.TO_DO;
    }
};

export function addClass(divs, className) {
    for (let index = 0; index < divs.length; index++) {
        const element = divs[index];
        element.classList.add(className);
    }
}

export function removeClass(divs, className) {
    for (let index = 0; index < divs.length; index++) {
        const element = divs[index];
        element.classList.remove(className);
    }
}

export function isEmpty(obj) {
    for(let prop in obj) {
        if(obj.hasOwnProperty(prop)) {
            return false;
        }
    }
    return JSON.stringify(obj) === JSON.stringify({});
}