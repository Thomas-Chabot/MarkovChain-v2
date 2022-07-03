import IChainInterface from '../types/IChain';
import {IArrayPicker, ArrayPicker} from './ArrayPicker';

var chainLength = 4;

// This IChain is a private data structure for the internal chain.
interface IChain extends IChainInterface {
    entryPoints: IArrayPicker,
    chain: {
        [key : string]: IArrayPicker
    }
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
    
        //console.log(startingChar);

        for (var i = 0; i < dataString.length; i++) {
            var start = Math.max(0, i - chainLength + 1);
            var wordChain = dataString.substring(start, i+1);
    
            if (!this.chain[wordChain]) {
                this.chain[wordChain] = new ArrayPicker();
            }
    
            /*console.log(`
                START: ${start}
                WORD CHAIN: ${wordChain}
                NEXT CHARACTER: ${dataString[i + 1]}
                i: ${i}
                ${dataString[i + 1]}
            `);*/

            if (dataString.length - 1 > i) {
                this.chain[wordChain].Add(dataString[i + 1]);
            }
        }
    }

    public Generate(length : number) : string {
        // First check if we have any entry points, and if not, return an empty string
        if (!this.entryPoints.Any()){
            return "";
        }

        var entry = this.entryPoints.Pick();
        var str = `${entry}`;
        for (var i = 1; i < length; i++) {
            var start = Math.max(0, i - chainLength);
            var wordChain = str.substring(start, i);

            //console.log(wordChain);
            //console.log(this.chain[wordChain]);
            
            if (!this.chain[wordChain]){
                //console.log("OOF");
                break;
            }

            var next = this.chain[wordChain].Pick();
            
            // Edge case: If we have no next choice, exit
            //console.log(next);
            if (next === undefined) {
                //console.log("Exiting");
                break;
            }

            str += next;
        }
        return str;
    }
}