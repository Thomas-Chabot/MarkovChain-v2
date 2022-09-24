import {IArrayPicker, ArrayPicker} from './ArrayPicker';

var chainLength = 4;
const DEFAULT_LENGTH = 250;

// This IChain is a private data structure for the internal chain.
export interface IChain {
    Train(dataString : string) : void;
    TrainMultiple(dataStrings : string[]) : void;
    Generate(length? : number) : string;
}

export default class Chain implements IChain {
    entryPoints: IArrayPicker;
    chain: {
        [key: string]: IArrayPicker
    };

    constructor(){
        this.entryPoints = new ArrayPicker();
        this.chain = { }
    }

    public Train(dataString : string) {
        if (dataString === "") {
            return;
        }

        var startingChar = dataString.substring(0, 1);
        this.entryPoints.Add(startingChar);

        for (var i = 0; i < dataString.length; i++) {
            var start = Math.max(0, i - chainLength + 1);
            var wordChain = dataString.substring(start, i+1);
    
            if (!this.chain[wordChain]) {
                this.chain[wordChain] = new ArrayPicker();
            }
    
            if (dataString.length - 1 > i) {
                this.chain[wordChain].Add(dataString[i + 1]);
            }
        }
    }

    public TrainMultiple(dataStrings: string[]): void {
        for (var string of dataStrings){
            this.Train(string);
        }
    }

    public Generate(length? : number) : string {
        if (length === undefined) {
            length = DEFAULT_LENGTH;
        }

        // First check if we have any entry points, and if not, return an empty string
        if (!this.entryPoints.Any()){
            return "";
        }

        var entry = this.entryPoints.Pick();
        var str = `${entry}`;
        for (var i = 1; i < length; i++) {
            var start = Math.max(0, i - chainLength);
            var wordChain = str.substring(start, i);

            if (!this.chain[wordChain]){
                break;
            }

            var next = this.chain[wordChain].Pick();
            
            // Edge case: If we have no next choice, exit
            if (next === undefined) {
                break;
            }

            str += next;
        }
        return str;
    }
}