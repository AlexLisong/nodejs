'use strict';

var chai = require('chai'),
expect = chai.expect;

chai.should();

function isEven(num){
	//return false;
	return num % 2 === 0;
}

describe('isEven', function(){
	it('should return true when number is even', function(){
		isEven(4).should.be.true;
	});
	it('should return false when number is odd', function(){
		isEven(3).should.be.false;
		expect(isEven(3)).to.be.false;
	});
});


function add(num1, num2){
	return num1 + num2;
}

describe('add with setup/teardown',function(){
	var num;
	beforeEach(function(){
		num = 5;
	});
	
	afterEach(function(){
		
	});
	
	it('should be ten when adding 5 to 5', function(){
		num = add(num,5);
		num.should.equal(10);
	});
	
	xit('should be ten when adding 7 to 5', function(){
		num = add(num,7);
		num.should.equal(12);
	});
		
});

