import consoleLogger from './logger/console'
import elasticSearchLogger from './logger/elastic-search'
import api from './api'

const env = 'production';

const services = {
    log: env === 'development' ? consoleLogger : elasticSearchLogger, api,
}

export default services;