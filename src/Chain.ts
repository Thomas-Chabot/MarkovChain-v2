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
        var startingChar = dataString.substring(0, 1);
        this.entryPoints.Add(startingChar);
    
        //console.log(startingChar);

        for (var i = 1; i < dataString.length; i++) {
            var start = Math.max(0, i - chainLength);
            var wordChain = dataString.substring(start, i);
    
            if (!this.chain[wordChain]) {
                this.chain[wordChain] = new ArrayPicker();
            }
    
            var nextCharacter = dataString[i]
    
            /*console.log(`
                START: ${start}
                WORD CHAIN: ${wordChain}
                NEXT CHARACTER: ${nextCharacter}
                i: ${i}
                ${dataString[i + 1]}
            `);*/

            this.chain[wordChain].Add(nextCharacter);
        }
    }

    public Generate(length : number) : string {
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

            str += this.chain[wordChain].Pick();
        }
        return str;
    }
}