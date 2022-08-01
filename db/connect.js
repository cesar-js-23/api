const { Client } = require('pg')

const client = new Client("postgres://sdqoxaxrspksah:ba56755d0699fed6c43ea4688b1499ab549d832282dd9b55c8ba68957c3d8e98@ec2-34-193-44-192.compute-1.amazonaws.com:5432/dfsk3k27eamj0n")

client.connect()

client.query('SELECT * FROM metas')

    .then(response => {

        console.log(response.rows)

        client.end()

    })

    .catch(err => {

        client.end()

    })

