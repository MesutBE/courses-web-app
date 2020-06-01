'use strict'

const fs = require('fs');
const path = require('path');
const Joi = require('joi');
const util = require('util');

const config = require('../config');
const DATA_DIR = path.join(__dirname, '/..', config.DATA_DIR, '/courses.json');



const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const readJson = async () => {

  const objToBeParsed = await readFile(DATA_DIR); //__dirname + '/../data/courses.json'  

  const dataParsed = JSON.parse(objToBeParsed);

  return dataParsed;
}

const writeToJson = async (wholeJson) => {
  const toWrite = JSON.stringify(wholeJson, null, 2);
  await writeFile(DATA_DIR, toWrite);
}

function validationCourse(course) {

  const schema = {
    name: Joi.string().min(3).required()
  }

  return Joi.validate(course, schema);
}

const controllers = {

  get: async (req, res) => {    
    const wholeJson = await readJson();
    
    res.send(wholeJson);
  },

  privateLogs: (req, res) => {
    // use it for watch some values
    const whatIWasLookingFor = {
      dir: __dirname + '/../data/courses.json',
      dir2: DATA_DIR,
    }

    res.json(whatIWasLookingFor);

  },

  getCourse: async (req, res) => {

    const wholeJson = await readJson();
    const courses = wholeJson.courses;
    const course = courses.find(c => c.id === parseInt(req.params.id));

    if (!course) return res.status(404).send('The course with the given ID was not found.');
    res.send(course);
  },

  post: async (req, res) => {
    // object restructuring
    const { error } = validationCourse(req.body); // result.error

    if (error) {
      // 400 Bad request
      // res.status(400).send(result.error);
      res.status(400).send(error.details[0].message);
      return;

    }

    const wholeJson = await readJson();
    const courses = wholeJson.courses;

    const course = {
      id: courses.length + 1,
      name: req.body.name
    };
    courses.push(course);

    await writeToJson(wholeJson);

    res.send(course);
  },

  delete: async (req, res) => {
    // LOok up the course
    //  Not existing, return 404

    const wholeJson = await readJson();
    const courses = wholeJson.courses;

    const course = courses.find(c => c.id === parseInt(req.params.id));

    if (!course) return res.status(404).send('The course with the given Id was not found.');

    // Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    await writeToJson(wholeJson);

    // Return the same course
    res.send(course);

  },

  put: async (req, res) => {
    // Look up the course
    // If not existing, return 404

    const wholeJson = await readJson();
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
    await writeToJson(wholeJson);

    // Return the updated course
    res.send(course);
  }
};

module.exports = controllers;
