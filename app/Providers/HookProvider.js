'use strict'

const { ServiceProvider } = require('@adonisjs/fold')
const path = require('path')

class HookProvider extends ServiceProvider 
{
	registerRoutes(){
  		this.app.autoload(path.join(__dirname, '../Controllers/Http'), 'Hook');
	}

  	register () {
  		this.registerRoutes()
  	}

  	boot () {
  		require('../routes.js')
  	}
}

module.exports = HookProvider