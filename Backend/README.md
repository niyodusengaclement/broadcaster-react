[![Build Status](https://travis-ci.org/niyodusengaclement/Broadcaster.svg?branch=develop)](https://travis-ci.org/niyodusengaclement/Broadcaster) [![Maintainability](https://api.codeclimate.com/v1/badges/3233e8a5e54ac619627a/maintainability)](https://codeclimate.com/github/niyodusengaclement/Broadcaster/maintainability) [![Coverage Status](https://coveralls.io/repos/github/niyodusengaclement/Broadcaster/badge.svg?branch=develop)](https://coveralls.io/github/niyodusengaclement/Broadcaster?branch=develop)

# Broadcaster
Broadcaster enables any/every citizen to bring any form of corruption to the notice of appropriate authorities and the general public. Users ca also report on things that need government intervention

## User Interface (UI)
* HTML
* CSS
* Javascript

### GitHub repository link 
[Broadcaster/Repo](https://github.com/niyodusengaclement/Broadcaster)
### GitHub UI link 
[Broadcaster/UI link](https://niyodusengaclement.github.io/Broadcaster/UI)
### Heroku app Link
[Broadcaster/Heroku app Link](https://andelabroadcaster.herokuapp.com/api-docs)

--------------------------------------------------------------------------

## SERVER

## API ENDPOINTS

| Ressource URL | Methods  | Description  |
| ------- | --- | --- |
| /api/v1/auth/signup| POST | Create user account |
| /api/v1/auth/signin | POST | Login |
| /api/v1/auth/users | GET | List of all users |
| /api/v1/red-flags | POST | Create a red-flag |
| /api/v1/red-flags | GET | List of all red-flags |
| /api/v1/red-flags/:redFlagId | GET | Get a specific red-flag |
| /api/v1/red-flags/:red_Flag_Id/location| PATCH | Change location of specific red-flag |
| /api/v1/red-flags/:red_Flag_Id/comment| PATCH | Modify comment of specific red-flag |
| /api/v1/red-flags/:red_Flag_Id/status| PATCH | Change status of specific red-flag |
| /api/v1/auth/forget| POST | Forgot password |
| /api/v1/auth/reset/:email/:token| PATCH | Reset password |

## Used Tools

### Language
```
*Javascript*
```
### Server Environment
```
 *NodeJS* (run time Environment for running JS codes)
 ```
### Framework
```
 *Express*
 ```
### Testing Framework and Assertion library
```
 *Mocha* and *Chai*
 ```
### Continuous Integration
```
Travis CI
```
### Test Coverage
```
nyc
```
### Git badge
```
coveralls
```
## Getting Started
Follow instructions below to have this project running in your local machine
## Prerequisites
You must have Node js installed
Clone this repository ```https://github.com/niyodusengaclement/Broadcaster.git``` or download the zip file.

## Installing
After cloning this repository to your local machine, cd into its root directory using your terminal and run the following commands

```
> npm install
```

It will install all packages and dependencies.

## Run the server
```
> npm start
```
## Run the test
```
> npm test
```

## Author
- NIYODUSENGA Clement <clementmistico@gmail.com>

---

## License & copyright
MIT License

Copyright (c) NIYODUSENGA Clement
