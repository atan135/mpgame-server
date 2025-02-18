let config = {
    production: {
        appenders: {
            out: {
                type: 'stdout',
                layout: {
                    type: 'coloured',
                },
            },
            app: {
                type: 'dateFile', 
                filename: 'runtime/app.log',
                pattern: "yyyy-MM-dd.log",
            }
        },
        categories: {
            default: {appenders: ['out', 'app'], level: 'debug'},
            api: {appenders: ['out', 'app'], level: 'debug'},
            system: {appenders: ['out', 'app'], level: 'all'},
        }
    },
    development: {
        appenders: {
            out: {
                type: 'stdout',
                layout: {
                    type: 'coloured',
                },
            },
            app: {
                type: 'dateFile', 
                filename: 'runtime/app.log',
                pattern: "yyyy-MM-dd.log",
            }
        },
        categories: {
            default: {appenders: ['out', 'app'], level: 'debug'},
            api: {appenders: ['out', 'app'], level: 'debug'},
            system: {appenders: ['out', 'app'], level: 'all'},
        }

    }
}

module.exports = config[process.env.NODE_ENV || 'development']