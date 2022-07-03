import { Chain } from '../src';

// Create a new chain
var chain = new Chain();

// Train it on some strings
chain.Train("Hello World");
chain.Train("Hello Works");
chain.Train("Hello Zuul");
chain.Train("Everybody loves Raymond");
chain.Train("Everybody loves Hello Raymond");

// Generate random text
var result = chain.Generate(50);

// Log out the result
console.log("RESULT: ", result);