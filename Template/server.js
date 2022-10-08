const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");
const express = require('express');
const path = require('path');
require("console.table");



init();

// Display logo text, load main prompts
function init() {
  const logoText = logo({ name: "Employee Manager" }).render();

  console.log(logoText);

  // loadPrompts();
}

// Exit the application
function quit() {
  console.log("Goodbye!");
  process.exit();
}
