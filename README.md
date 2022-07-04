#### Table of Contents

- [Project](#project)
- [Description](#description)
- [Notes](#notes)
- [Created By:](#created-by)
- [Setting up the app](#setting-up-the-app)
- [Running app](#running-app)
- [Models](#models)
- [API Routes](#api-routes)
- [Web Routes](#web-routes)
- [Issues/ToDo](#issuestodo)

## Project

[MERN Stack Tutorial](https://www.youtube.com/playlist?list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE) from [Net Ninja](https://www.youtube.com/c/TheNetNinja)

## Description

A simple MERN application that allows a user to add and remove workouts, will add authentication and routes for individual users at a later time. The backend makes use of Mongoose to talk to the MongoDB database as well as to authenticate that all data being passed to the controllers is valid, if it is not valid, an error will be presented to the user as well as using CSS to highlight the required fields. On the frontend it makes use of React useContext to interact with the API depending on the context that is passed to the reducer and carrying out the necessary request and then updating the state.

## Notes

- The application follows the tutorial listed above, however, I added code necessary to host it online using a server hosted on Google Cloud platform so that I could also practice deploying a MERN application. The application can be previewed at [workoutapp.jondunlap.com](workoutapp.jondunlap.com).
- I was able to follow most of the steps from [Brad Traversy's](https://www.youtube.com/c/TraversyMedia) tutorial [Linux Server Setup & MERN Deployment](https://www.youtube.com/watch?v=7aRjGIhwyQM), however, I used a Google Cloud VM instance which presented several issues not covered in Brad's tutorial. I then used Google Domains to add it as a subdomain of my current website by updating the DNS records to point at the servers IP address.

## Created By:

**Name**: Jonathan Dunlap

**Email**: [jon@jondunlap.com](mailto:jon@jondunlap.com)

**Portfolio Website**: [jondunlap.com](https://jondunlap.com)

**Resume**: [https://standardresume.co/r/jondunlap](https://standardresume.co/r/jondunlap)

## Setting up the app

- `cd` into each of the subdirectories and run `npm install` to add the necessary packages
- Contact developer so that I can temporarily allow all connections to database otherwise the application will not properly connect to the Mongo database

## Running app

- `cd server` `npm run dev` - Start API server and connects to the database
- From a second terminal window, `cd frontend` `npm start` - Starts React frontend

## Models

|           Name | Type         | Required             |
| -------------: | ------------ | -------------------- |
|                | **WORKOUTS** |                      |
|         **id** | ObjectID     | true (autogenerated) |
|      **title** | String       | true                 |
|       **load** | Number       | true                 |
|       **reps** | Number       | true                 |
| **timestamps** | DateTime     | true (autogenerated) |

## API Routes

|     Method | Path              | Description                    |
| ---------: | ----------------- | ------------------------------ |
|            | **WORKOUTS**      |                                |
|   **POST** | /api/workouts     | Creates a new workout document |
|    **GET** | /api/workouts     | Gets all the workout documents |
|    **GET** | /api/workouts/:id | Get a single workout document  |
| **DELETE** | /api/workouts/:id | Delete a single workout        |
|  **PATCH** | /api/workouts/:id | Update a single workout        |

## Web Routes

|  Method | Path       | Description                    |
| ------: | ---------- | ------------------------------ |
|         | **Public** |                                |
| **GET** | /          | Landing page, list of workouts |

## Issues/ToDo

- Tutorial used each subdirectory to install packages and dependencies which makes it a bit more difficult to setup and start the application. Next time I will make sure to use the root directory to run `npm init` so that I can add packages and startup scripts to the root directory allowing the developer/user an easier way of starting the application.
- The tutorial was not meant to be deployed which caused some issues that I had to overcome when I finally decided to follow Brad's tutorial for deploying a MERN application to a Linux server. I had to add some additional code on the backend API so that it could serve the React frontend as well as adding code so that the .env file could be properly read by Node.
- Since I decided to use Google Cloud instead of Linode for my Linux server there were some additional issues that I had to overcome that were not covered in the MERN deployment tutorial I linked earlier. Some of the issues were easy to find and overcome, needing to set a static IP address so I can add a domain, but others required a bit more research, the version of Ubuntu that Google Cloud defaulted to does not support the latest version of Node.js which caused me to have to remove the node repo that I added and then to install an earlier version of Node.js. But I feel like this was a good experience and allowed me to learn more about Google's cloud platform which seems to be more robust than Linode even though there seems to be more complexity in some areas.
- I am currently waiting on a follow-up tutorial that will continue on with this application and add authentication for individual users. I look forward to improving this application and learning/practicing some more.
