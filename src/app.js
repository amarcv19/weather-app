const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./geocode");
const forecast = require("./forecast");

const app = express();
const port = 3000;

// Define path for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handlebars engine and view location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setupt static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Amar Chandra ",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Amar Chandra",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text.",
    title: "Help",
    name: "Amar Chandra",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide a address ",
    });
  }

  const address = req.query.address;

  
  geocode(address, (error, {latitude,longitude,location} = {}) => {
    if (error) {
      return res.send({error});
    }


    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({error});
      }
  
      return res.send({
        temperature: forecastData.temperature,
        feelslike: forecastData.feelslike,
        location: location,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search bar",
    });
  }

  console.log(req.query.search);

  res.send({
    name: "amar",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Amar Chandra",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Amar Chandra",
    errorMessage: "Page not found",
  });
});

app.listen(port, () => {
  console.log("Server started at port " + port);
});
