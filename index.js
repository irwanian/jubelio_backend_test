global.__lib = name => require(`${__dirname}/lib/${name}`)
global.__handlers = name => require(`${__dirname}/handlers/${name}`)
global.__routes = name => require(`${__dirname}/routes/${name}`)
global.__model = name => require(`${__dirname}/model/${name}`)

require('dotenv').config()
require(`${__dirname}/http`)