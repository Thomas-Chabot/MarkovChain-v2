import { expect } from "chai";
import { ArrayPicker } from "../src/ArrayPicker";

describe("Array Picker Class", function() {
    describe("Construction", function(){
        it("Starts with a total of 0", function(){
            var container = new ArrayPicker();
            expect(container.total).to.equal(0);
        });
        it("Starts with no elements", function(){
            var container = new ArrayPicker();
            expect(container.values).to.be.empty;
        });
    });
    describe("Additions", function() {
        it("Can add a new element", function() {
            var container = new ArrayPicker();
            container.Add("Hello");

            expect(container.total).to.equal(1);
            expect(container.values).to.have.key("Hello");
            expect(container.values["Hello"]).to.equal(1);
        });
        it("Can add to an existing element", function() { 
            var container = new ArrayPicker();
            container.Add("Hello");

            // Verification that we can add the original element
            expect(container.total).to.equal(1);
            expect(container.values).to.have.key("Hello");
            expect(container.values["Hello"]).to.equal(1);

            // Add the element a second time, then verify the totals are correct
            container.Add("Hello");
            expect(container.total).to.equal(2);
            expect(container.values).to.have.key("Hello");
            expect(container.values["Hello"]).to.equal(2);
        });
        it("Can have two separate elements", function() {
            var element1 = "Hello1";
            var element2 = "Hello2";
            
            var container = new ArrayPicker();
            container.Add(element1);
            container.Add(element2);

            // Verify the totals and keys are correct
            expect(container.total).to.equal(2);
            expect(container.values).to.have.all.keys([element1, element2]);
            expect(container.values[element1]).to.equal(1);
            expect(container.values[element2]).to.equal(1);
        });
    });
    describe("Picks", function(){
        it("Can pick with 0 elements", function() {
            var container = new ArrayPicker();
            var result = container.Pick();
            expect(result).to.equal(undefined);
        })
        it("Can pick with one element", function() {
            var element = "Hello";
            var container = new ArrayPicker();
            container.Add(element);
            expect(container.Pick()).to.equal(element);
        })
        it("Can pick between two different elements", function() {
            var element1 = "Hello1";
            var element2 = "Hello2";
            
            var container = new ArrayPicker();
            container.Add(element1);
            container.Add(element2);
            
            expect([element1, element2]).to.include(container.Pick());
        });
    })
})