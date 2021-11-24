export class Peg{
    colorNames = ['white', 'black'];
    color;
    /**
     * 
     * @param {2 féle érték lehet: 0 = fehér, 1 = fekete} color 
     */
    constructor(color){
        this.color = this.colorNames[color];
    }

    getElement() {
        element = document.createElement('div');
        element.className = 'peg';
        element.style.backgroundColor = this.color;
        return element;
    }
}