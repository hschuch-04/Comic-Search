# Comic-Search
<img width="1264" alt="image" src="https://github.com/hschuch-04/Comic-Search/assets/46430331/82b86722-185e-4bed-a224-4d90017fc2a5">

## Introduction
The Comic Search is a web application mashup, where it talks to multiple different APIs to gather data and create a Wiki-styled application. These target APIs are Marvel Comics API, News API, and Wikipedia API (MediaWiki).

The use of this mashup allows people to search up their favourite comic book run, getting the standard information about their comic series, but also recent news articles related to characters from the comic, and also wikipedia entries about the creators of the comic for further research.

## The Tech Stack
### Front End
Javascript using the library React.js was used to develop the front-end of the application, as the web application is a singular page where it will fetch data after searching and load it into specific spots. The use of React allowed for a responsive application by not requiring the whole page to be reloaded whenever a user tries to search another comic series.

### Back End
Node.js was used for the backend due to have prior experience, and also I only needed a couple of endpoints as the application is not super complex overall. The back end contained two endpoints, '/comic/:name' and '/wiki/:creator'. These were both designed to target specific APIs, the first being the Marvel and News API and the latter being the MediaWiki API.

### Cloud
The main part of this project was to create a docker container of the project which could be deployed on an AWS EC2 instance so the web application could be viewed. The project didn't involve any scalability, and was to test how to containerise a web service on the Cloud.

## Development Experience
Creation of the web application went very well, having previous experience with React not requiring too much troubleshooting and I had a design concept for the page from the beginning which streamlined the process.

The hardest part was wrapping my head around Docker and passing through the required keys to be used when contacting the desired API. This was resolved by using the enviroment variable command when running the docker instance (-e) which passed through the required variables by getting the variables from the created IAM role. This was to practice proper security practices as you don't have to be passing text environment variables for an API as that opens up security risks if someone access those.

