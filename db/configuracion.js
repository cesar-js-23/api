require('dotenv').config();
const initOptions = {};
const pgp = require('pg-promise')(initOptions);

// const cn = {
//     "user": process.env.DB_USER,
//     "password": process.env.DB_PASSWORD,
//     "host": 'ec2-34-193-44-192.compute-1.amazonaws.com',
//     "port": 5432,
//     "database": 'dfsk3k27eamj0n'    
// };

const cn = {
    user: "sdqoxaxrspksah",
    host: "ec2-34-193-44-192.compute-1.amazonaws.com",
    database: "dfsk3k27eamj0n",
    password: "ba56755d0699fed6c43ea4688b1499ab549d832282dd9b55c8ba68957c3d8e98",
    port:5432,
    ssl: {
        rejectUnauthorized: false
      },
};

const db = pgp(cn);

module.exports = db;
