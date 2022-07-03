export default interface IChain {
    Train(dataString : string) : void
    Generate(length : number) : string
}