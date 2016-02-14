'use strict';

var Course = require('../models/Course.js');
var Student = require('../models/Student.js');
var chai = require('chai');
var should = chai.should();
var expect = chai.expect;

describe('Course',function(){
	var courseName = "course name";
	var courseDescription = "description";
	var courseCode = "course code";
	var student;
	beforeEach(function(){
		student = Student.create("John Doe",2);
	});
	it('should save the info ',function(){
		var course = Course.create(courseName,courseCode,courseDescription);
		
		should.exist(course.name);
		
		//need to use eql instead of equal for checking object value not reference
		course.students.should.eql([]);
	});
	
	describe('register student',function(){
		it('should add the student to the student array',function(){
			var course = Course.create(courseName,courseCode,courseDescription);
			course.registerStudent(student);
			
			course.students.length.should.equal(1);
			course.students[0].id.should.equal(student.id);		
		});
		it('should throw an error if we try to unregister a student who is not in the class',function(){
			var course = Course.create(courseName,courseCode,courseDescription);
			expect(function(){
				course.unregisterStudent("sdf");
			}).to.throw();		
		});	
	});
});