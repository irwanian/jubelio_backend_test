require('dotenv').config()

global.__lib = name => require(`${__dirname}/lib/${name}`)
global.__handlers = name => require(`${__dirname}/handlers/${name}`)
global.__routes = name => require(`${__dirname}/routes/${name}`)
global.__model = require(`${__dirname}/model`)

require(`${__dirname}/http`)