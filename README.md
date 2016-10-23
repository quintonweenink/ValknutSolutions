# MarketLead.io [![Stories in Ready](https://badge.waffle.io/QuintonWeenink/ValknutSolutions.png?label=ready&title=Ready)](http://waffle.io/QuintonWeenink/ValknutSolutions) [![Build Status](https://travis-ci.com/QuintonWeenink/ValknutSolutions.svg?token=pNpyTWr3Y4RgmYa9LMgA&branch=develop)](https://travis-ci.com/QuintonWeenink/ValknutSolutions)
MarketLead.io is a real time marketing and lead gathering application with multiple integration points with social media and other formats. A business can manage and respond to leads and analyse their current customers and audience. We expose and link companies to their future customers in an easy and pluggable manner. 

##[Go to our website](https://marketlead.herokuapp.com/showcaseHtml)

## Prerequisites
You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](https://nodejs.org/en/) with [npm](https://www.npmjs.com/)
* [Bower](http://bower.io/)

## Installation

* `git clone <repository-url>` this repository
* change to root repo directory
* `npm install`

## Running

* `npm start`

## Testing

### Heroku log tailing
* `heroku loggin`
* `heroku git:remote -a marketlead`
* `heroku logs --tail`

### Automated testing

* [Travis CI](https://travis-ci.com/)

### Testing

* [Mocha](https://mochajs.org/) via [Chai](http://chaijs.com/) with Asserts
* Unit tests: `npm test`
* API tests: `npm run-script apitest`
* Integration tests: `npm run-script integrationtest`

#
                                   /\
                                  //\\
                                 ///\\\
                                ////\\\\
                               /////\\\\\
                              //////\\\\\\        /\
                             ///////\\\\\\\      //\\
                            ////////\\\\\\\\    ///\\\
                           ////////  \\\\\\\\  ////\\\\
                          ////////    \\\\\\\\/////\\\\\
                         ////////  /\  \\\\\\//////\\\\\\
                        ////////  //\\  \\\\///////\\\\\\\
                       ////////  ///\\\  \\////////\\\\\\\\
                      ////////  ////\\\\  ////////  \\\\\\\\
                     ////////  /////\\\\\////////\\  \\\\\\\\
                    ////////  //////\\\\\\//////\\\\  \\\\\\\\
                   ////////  ///////\\\\\\\////\\\\\\  \\\\\\\\
                  ////////  ////////\\\\\\\\//\\\\\\\\  \\\\\\\\
                 ////////  ////////  \\\\\\\\  \\\\\\\\  \\\\\\\\
                ////////  ////////  //\\\\\\\\  \\\\\\\\  \\\\\\\\
               ////////  ////////  ////\\\\\\\\  \\\\\\\\  \\\\\\\\
              ////////  ////////  //////\\\\\\\\  \\\\\\\\  \\\\\\\\
             ////////  ////////  ////////\\\\\\\\  \\\\\\\\  \\\\\\\\
            ////////  ////////  ////////  \\\\\\\\  \\\\\\\\  \\\\\\\\
           ////////  ////////  ////////    \\\\\\\\  \\\\\\\\  \\\\\\\\
          ////////  ////////  ////////      \\\\\\\\  \\\\\\\\  \\\\\\\\
         ////////  ////////  ////////        \\\\\\\\  \\\\\\\\  \\\\\\\\
        ////////__/_/_/_//__////////__________\\_\_\_\__\\\\\\\\  \\\\\\\\
       //////_-_-_-_-_-_-_-////////-_-_-_-_-_-_-_-_-_-_-_-_\\\\\\  \\\\\\\\
      ////-_-_-_-_-_-_-_-_////////-_-_-_-_-_-_-_-_-_-_-_-_-_-_\\\\  \\\\\\\\
     ///_-_-_-_-_-_-_-_-_////////-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-\\\  \\\\\\\\
    /___________________////////___________________________________\  \\\\\\\\
             ////////  ////////____________________\\\\\\\\____________\\\\\\\\
            ////////  //////_-_-_-_-_-_-_-_-_-_-_-_-\\\\\\\\-_-_-_-_-_-_-_\\\\\\
           ////////  ////-_-_-_-_-_-_-_-_-_-_-_-_-_-_\\\\\\\\-_-_-_-_-_-_-_-_\\\\
          ////////  ///_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_\\\\\\\\-_-_-_-_-_-_-_-_-\\\
         ////////  /___________________________________\\\\\\\\___________________\
        ////////________________________________________\\\\\\\\
       //////_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-\\\\\\
      ////_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-\\\\
     ///_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-\\\
    /______________________________________________________________\
        The fallen warriors knot
