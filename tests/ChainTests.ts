import { expect } from "chai";
import { Chain } from "../src";

describe("Chain tests", function() {
    describe("Constructor", function() {
        it("Starts with no entry points", function() {
            var chain = new Chain();

            expect(chain.entryPoints.values).to.be.empty;
            expect(chain.entryPoints.total).to.equal(0);
        });
        it("Starts as an empty chain", function() {
           var chain = new Chain();
           
           expect(chain.chain).to.be.empty;
        });
    });
    describe("Training", function() {
        it("Can train on an empty string", function() {
            var chain = new Chain();

            chain.Train("");

            expect(chain.entryPoints.values).to.be.empty;
            expect(chain.entryPoints.total).to.equal(0);
            expect(chain.chain).to.be.empty;
        });
        it("Can train on one character", function() {
            var chain = new Chain();
            chain.Train("a");

            expect(chain.entryPoints.values).to.have.key("a");
            expect(chain.entryPoints.total).to.equal(1);
            expect(chain.chain).to.have.key("a");
            expect(chain.chain["a"].total).to.equal(0);
            expect(chain.chain["a"].values).to.be.empty;
        });
        it("Can train on a multiple character string", function() {
            var chain = new Chain();
            chain.Train("ab");

            expect(chain.entryPoints.values).to.have.all.keys(["a"]);
            expect(chain.entryPoints.total).to.equal(1);
            expect(chain.chain).to.have.all.keys(["a", "ab"]);
            expect(chain.chain["a"].total).to.equal(1);
            expect(chain.chain["a"].values).to.have.key("b");
            expect(chain.chain["ab"].total).to.equal(0);
            expect(chain.chain["ab"].values).to.be.empty;
        });
        it("Can train on multiple strings", function() {
            var chain = new Chain();
            chain.Train("a");
            chain.Train("b");

            expect(chain.entryPoints.values).to.have.all.keys(["a", "b"]);
            expect(chain.entryPoints.total).to.equal(2);
            expect(chain.chain).to.have.all.keys(["a", "b"]);
            expect(chain.chain["a"].total).to.equal(0);
            expect(chain.chain["a"].values).to.be.empty;
            expect(chain.chain["b"].total).to.equal(0);
            expect(chain.chain["b"].values).to.be.empty;
        });
    });
    describe("Generation", function() {
        it("Can generate from an untrained chain", function() {
            var chain = new Chain();
            var result = chain.Generate(12);

            expect(result).to.equal("");
        });
        it("Can generate from one character", function() {
            var chain = new Chain();
            chain.Train("a");

            var result = chain.Generate(12);
            expect(result).to.equal("a");
        });
        it("Can generate from a sequence", function() {
            var chain = new Chain();
            chain.Train("Hello World");

            var result = chain.Generate(12);
            expect(result).to.equal("Hello World");
        });
        it("Can generate from multiple sequences", function() {
            var chain = new Chain();
            chain.Train("Hello World 1");
            chain.Train("Hello World 2");
            
            var result = chain.Generate(50);

            // Because the two training sequences are equal outside of the end numbers, 
            // the result here should be identical to one of them.
            expect(["Hello World 1", "Hello World 2"]).to.contain(result);
        });
    })
})