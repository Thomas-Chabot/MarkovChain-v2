export interface IArrayPicker {
    total : number,
    values: {
        [key : string] : number
    },
    Add: (value : string)=>void,
    Pick: ()=>string,
    Any: ()=>boolean
}

export class ArrayPicker implements IArrayPicker {
    total : number;
    values: {
        [key : string] : number
    };

    constructor(){
        this.total = 0;
        this.values = { };
    }

    Add(value : string) {
        this.total += 1;

        if (!this.values[value]) {
            this.values[value] = 0;
        }
        this.values[value] += 1;
    }

    Pick() : string {
        var max = this.total;
        var min = 0;

        // Generate a random number between min and max
        var number = Math.floor(Math.random() * (max - min)) + min;
        /*console.log(`
            MIN: ${min}
            MAX: ${max}
            NUMBER: ${number}
        `)*/

        // Walk through the array until we come up to our chosen value
        var values = Object.keys(this.values);
        var index = 0;
        while (index < values.length) {
            var character = values[index];
            var value = this.values[character];

            if (number < value) {
                return character;
            }

            number -= value;
            index ++;
        }

        // If we go through the entire array, return the last value
        return values[values.length];
    }

    Any() : boolean {
        return this.total !== 0;
    }
}