# HospitalServer
micro project of 3rd year 1st semester

## Setup 
### mongo db

navigate to the folder where you want to host the data and perform the following

create a folder named data

```sh
$ cd path/to/data/folder
$ mkdir data
$ mongod --datapath=data --bind_ip 127.0.0.1 --port 27017
```

## Installation

Install the dependencies and devDependencies and start the server.

```sh
$ cd HospitalServer
$ npm install
$ npm start
```

## Routes

### /hospitals route

| Route | Method |  Funtion | 
| ------ | ------ | ------ |
| /hospitals | GET | gets all the hospitals |
| /hospitals | POST | Adds new hospital |
| /hospitals | DELETE | deletes all the hospitals |
| /hospitals/{Id} | GET | gets the hospital with hId equal to Id |
| /hospitals/{Id} | PUT | Updates Hospital with hId equal to Id with the content sent in the body |
| /hospitals/{Id} | DELETE | deletes the hospital with hId equal to Id |

### /ventilators route

| Route | Method |  Funtion | 
| ------ | ------ | ------ |
| /ventilators | GET | gets all the ventilators |
| /ventilators | POST | Adds new ventilator |
| /ventilators | DELETE | deletes all the ventilators |
| /ventilators/{Id} | GET | gets the ventilator with ventilatorId equal to Id |
| /ventilators/{Id} | PUT | Updates ventilator with ventilatorId equal to Id with the content sent in the body |
| /ventilators/{Id} | DELETE | deletes the ventilator with ventilatorId equal to Id |
| /ventilators/status/{status} | GET | gets the ventilator with status equal to status requested for in the URL |
