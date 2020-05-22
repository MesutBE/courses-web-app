'use strict'

const fs = require('fs');
const path = require('path');
const Joi = require('joi');

const config = require('../config');
const DATA_DIR = path.join(__dirname, '/..', config.DATA_DIR, '/courses.json');


const readJson = () => {

  const objToBeParsed = fs.readFileSync(__dirname + '/../data/courses.json');

  const dataParsed = JSON.parse(objToBeParsed);

  return dataParsed;
}

const writeToJson = async (wholeJson) => {
  const callbackWriteFile = (err, content) => {
    if (err) { return console.error(err); };

  };

  const toWrite = JSON.stringify(wholeJson, null, 2);
  fs.writeFile(__dirname + '/../data/courses.json', toWrite, callbackWriteFile);
}

function validationCourse(course) {

  const schema = {
    name: Joi.string().min(3).required()
  }

  return Joi.validate(course, schema);
}

const controllers = {

  get: (req, res) => {    
    const wholeJson = readJson();
    
    res.send(wholeJson);
  },

  getCourse: (req, res) => {

    const wholeJson = readJson();
    const courses = wholeJson.courses;
    const course = courses.find(c => c.id === parseInt(req.params.id));

    if (!course) return res.status(404).send('The course with the given ID was not found.');
    res.send(course);
  },

  post: (req, res) => {
    // object restructuring
    const { error } = validationCourse(req.body); // result.error

    if (error) {
      // 400 Bad request
      // res.status(400).send(result.error);
      res.status(400).send(error.details[0].message);
      return;

    }

    const wholeJson = readJson();
    const courses = wholeJson.courses;

    const course = {
      id: courses.length + 1,
      name: req.body.name
    };
    courses.push(course);

    writeToJson(wholeJson);

    res.send(course);
  },

  delete: (req, res) => {
    // LOok up the course
    //  Not existing, return 404

    const wholeJson = readJson();
    const courses = wholeJson.courses;

    const course = courses.find(c => c.id === parseInt(req.params.id));

    if (!course) return res.status(404).send('The course with the given Id was not found.');

    // Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    writeToJson(wholeJson);

    // Return the same course
    res.send(course);

  },

  put: (req, res) => {
    // Look up the course
    // If not existing, return 404

    const wholeJson = readJson();
    const courses = wholeJson.courses;

    const course = courses.find(c => c.id === parseInt(req.params.id));

    if (!course) {
      res.status(404).send('The course with the given Id was not found.');
      return;
    }

    // object restructuring
    const { error } = validationCourse(req.body); // result.error

    if (error) {
      // 400 Bad request
      // res.status(400).send(result.error);
      res.status(400).send(error.details[0].message);
      return;

    }
    // Update course
    course.name = req.body.name;

    // Update Json file...
    writeToJson(wholeJson);

    // Return the updated course
    res.send(course);
  }
};

module.exports = controllers;
