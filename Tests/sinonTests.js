'use strict';

var chai = require('chai'),
	sinon = require('sinon');
//	expect = chai.expect;

chai.should();
describe('sinon spy vs stub vs mock', function(){
	var info, expectedUser;
	beforeEach(function(){
			 info = {
		name: "name2",
	}
	
	expectedUser = {
    name: info.name,
    nameLowercase: info.name.toLowerCase()
  };
	});

var Database = {
     save : function(user, callback){
		 console.log('ddd');
	}	
};
function setupNewUser(info, callback) {
  var user = {
    name: info.name,
    nameLowercase: info.name.toLowerCase()
  };

  try {
    Database.save(user, callback);
  }
  catch(err) {
    callback(err);
  }
}

xit('spy', function(){
	var spy = sinon.spy(Database, 'save');


	setupNewUser(info,function(){});
	//Checking how many times a function was called
	//Checking what arguments were passed to a function
	sinon.assert.calledOnce(spy);
	sinon.assert.calledWith(spy,expectedUser);
	spy.restore();
});
	
	it('stub', function(){
		var stub = sinon.stub(Database,'save');
		setupNewUser(info,function(){});
		sinon.assert.calledWith(stub,expectedUser);
		stub.restore();
	});

	//You can use them to replace problematic pieces of code
	//You can use them to trigger code paths that wouldn't otherwise trigger - such as error handling
	//You can use them to help test asynchronous code more easily
	//
	
	//Mocks should be used primarily when you would use a stub, but need to verify multiple more specific behaviors on it.
	it('should pass object with correct values to save only once', function() {
  var database = sinon.mock(Database);
  database.expects('save').once().withArgs(expectedUser);

  setupNewUser(info, function() { });

  database.verify();
  database.restore();
});

});
describe('sinon tests', function(){
	var student;
	var schedule;
	beforeEach(function(){
		student = {
			dropClass: function(classId, cb){
				if(!!cb.dropClass){
					cb.dropClass();	
					return 3;
				}else{
				cb();
				return 2;
				}
			},
			addClass: function(schedule){
				if(!schedule.classIsFull()){
					return true;
				}else{
					return false;
				}
			}
		};
		schedule = {
			dropClass: function(){
				console.log('class dropped');
			},
			classIsFull: function(){
				return true;
			}
		};
	});
	
	describe('student.dropClass', function(){
		it('should call the callback',function(){
			var spy = sinon.spy();
		    var res = student.dropClass(1,spy);
			spy.called.should.be.true;
			res.should.equal(2);
			//spy.called.should.be.false;
		});
		
		it('should call the callback',function(){
			function onClassDropped(){
				console.log("onClassDropped was called");
			}
			var spy = sinon.spy(onClassDropped);
			
			student.dropClass(1,spy);
			spy.called.should.be.true;
		});
		
		it('should call the callback even if it\'s a method of an object ', function(){
			sinon.spy(schedule,'dropClass');
			student.dropClass(1, schedule);
			schedule.dropClass.called.should.be.true;
		});
	});
	
		describe('student.dropClass with stubs', function(){
		it('should call a stubbed method',function(){
			var stub = sinon.stub(schedule);
			
			student.dropClass(1,stub);
			stub.dropClass.called.should.be.true;
		});
		
		it('should return true when the class is not full', function(){
			var stub = sinon.stub(schedule);
			stub.classIsFull.returns(false);
			var returnVal = student.addClass(stub);
			returnVal.should.be.true;
		});
		xit('should call the callback',function(){
			function onClassDropped(){
				console.log("onClassDropped was called");
			}
			var spy = sinon.spy(onClassDropped);
			
			student.dropClass(1,spy);
			spy.called.should.be.true;
		});
		
		it('should call the callback even if it\'s a method of an object ', function(){
			sinon.spy(schedule,'dropClass');
			var res = student.dropClass(1, schedule);
			res.should.equal(3);
			schedule.dropClass.called.should.be.true;
		});
	});
});	