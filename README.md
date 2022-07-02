# MarkovChain-v2
A random text generator built off of a Markov Chain algorithm.

# Installation
To install, run the following command:
`npm install better-markov-chain-nlg`

# Use
This provides the core components required for random text generation within NodeJS.

## Training
To start off, you'll want to train it on some sample data. This could be any list of strings; the generator will attempt to build a result similar to those presented from the sample data.

## Generating
Once the generator has been fed some training data, it will be able to generate random strings.
The generator provides a Generate() method which will result in a new string, designed to look similar to what was fed to it in the training samples.

# Example
