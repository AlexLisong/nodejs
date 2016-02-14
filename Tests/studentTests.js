'use strict';

var Student = require("../models/Student")
var Course = require("../models/Course")
var chai = require("chai"),should = chai.should(), expect = chai.expect;

describe("Student", function(){
	var studentName = "John Doe",
	studentGrade = 5;
	
	it("should save the info on the student and create an id when created", function(){
		var student = Student.create(studentName,studentGrade);
		
		should.exist(student.name);
		student.name.should.equal(studentName);
		
		should.exist(student.grade);
		student.grade.should.equal(studentGrade);
		
		should.exist(student.id);
	});
	
	it("should increase the student's grade by 1 when advanceGrade is called", function(){
		var student = Student.create(studentName,studentGrade);
		student.advanceGrade();
		student.grade.should.equal(studentGrade+1);		

	});
	
});