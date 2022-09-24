export default interface IChain {
    Train(dataString : string) : void
    TrainMultiple(dataStrings : string[]) : void
    Generate(length? : number) : string
}