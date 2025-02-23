const {Pool} = require('pg')

const pool=new Pool({
    user:'class-work',
    password:'batch4',
    host:'localhost',
    port:'5432',
    database:'classWork'
})

module.exports = pool;