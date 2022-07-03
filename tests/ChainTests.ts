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
})