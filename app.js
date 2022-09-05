const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')

const app = express()
const port = process.env.PORT || 5000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// MySQL
const pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'hotel_smart'
})
   
// Get all guests
app.get('/admin/guest', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT * from guest', (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

            // if(err) throw err
            console.log('The data from guest table are: \n', rows)
        })
    })
})

// Get an guestl
app.get('/admin/guest/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        connection.query('SELECT * FROM guest WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
            
            console.log('The data from guest table are: \n', rows)
        })
    })
});

// Delete a guest
app.delete('/admin/guest/:id', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        connection.query('DELETE FROM guest WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                res.send(`The guest with the record ID ${[req.params.id]} has been removed.`)
            } else {
                console.log(err)
            }
            
            console.log('The data from guest table are: \n', rows)
        })
    })
});

// Add guest
app.post('/administrator/guest', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        
        const params = req.body
        connection.query('INSERT INTO guest SET ?', params, (err, rows) => {
        connection.release() // return the connection to pool
        if (!err) {
            res.send(`Guest with the record ID  has been added.`)
        } else {
            console.log(err)
        }
        
        console.log('The data from guest table are:11 \n', rows)

        })
    })
});


//update a guest
app.put('/admin/guest/update', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        const { id, name, email, phone, created, modified } = req.body

        connection.query('UPDATE guests SET name = ?, email = ?, phone = ?, created = ?,modified = ? WHERE id = ?', [name, email, phone, created, modified, id] , (err, rows) => {
            connection.release() // return the connection to pool

            if(!err) {
                res.send(`guest with the name: ${name} has been added.`)
            } else {
                console.log(err)
            }

        })

        console.log(req.body)
    })
})


// Get all rooms
app.get('/admin/room', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT * from room', (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

            // if(err) throw err
            console.log('The data from room table are: \n', rows)
        })
    })
})

// Get a specific room
app.get('/admin/room/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        connection.query('SELECT * FROM room WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
            
            console.log('The data from room table are: \n', rows)
        })
    })
});

// Delete a guest
app.delete('/admin/room/:id', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        connection.query('DELETE FROM room WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                res.send(`The room with the record ID ${[req.params.id]} has been removed.`)
            } else {
                console.log(err)
            }
            
            console.log('The data from room table are: \n', rows)
        })
    })
});

// Add guest
app.post('/administrator/room', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        
        const params = req.body
        connection.query('INSERT INTO room SET ?', params, (err, rows) => {
        connection.release() // return the connection to pool
        if (!err) {
            res.send(`Room with the record ID  has been added.`)
        } else {
            console.log(err)
        }
        
        console.log('The data from room table are:11 \n', rows)

        })
    })
});


//update a guest
app.put('/admin/room/update', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        const { id, count, type, status, created, modified } = req.body

        connection.query('UPDATE room SET count = ?, type = ?, status = ?, created = ?, modified = ? WHERE id = ?', [count, modified, type, status, created, id] , (err, rows) => {
            connection.release() // return the connection to pool

            if(!err) {
                res.send(`room with the name: ${id} has been added.`)
            } else {
                console.log(err)
            }

        })

        console.log(req.body)
    })
})

// Get all payments
app.get('/admin/payment', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT * from payment', (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

            // if(err) throw err
            console.log('The data from payment table are: \n', rows)
        })
    })
})

// Get an guestl
app.get('/admin/payment/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        connection.query('SELECT * FROM payment WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
            
            console.log('The data from payment table are: \n', rows)
        })
    })
});

// Delete a guest
app.delete('/admin/payment:id', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        connection.query('DELETE FROM payemnt WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                res.send(`The payment with the record ID ${[req.params.id]} has been removed.`)
            } else {
                console.log(err)
            }
            
            console.log('The data from payment table are: \n', rows)
        })
    })
});

// Add guest
app.post('/administrator/payment', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        
        const params = req.body
        connection.query('INSERT INTO payment SET ?', params, (err, rows) => {
        connection.release() // return the connection to pool
        if (!err) {
            res.send(`Payment with the record ID  has been added.`)
        } else {
            console.log(err)
        }
        
        console.log('The data from payment table are:11 \n', rows)

        })
    })
});


//update a guest
app.put('/admin/payement/update', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        const { id, date, amount, modified } = req.body

        connection.query('UPDATE guests SET id = ?, date = ?, amount = ?, modified = ? WHERE id = ?', [date, amount,modified, id] , (err, rows) => {
            connection.release() // return the connection to pool

            if(!err) {
                res.send(`guest with the name: ${name} has been added.`)
            } else {
                console.log(err)
            }

        })

        console.log(req.body)
    })
})


// Get all reservations
app.get('/admin/reservation', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT * from reservation', (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

            // if(err) throw err
            console.log('The data from reservation table are: \n', rows)
        })
    })
})

// Get an reservation
app.get('/admin/reservation/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        connection.query('SELECT * FROM reservation WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
            
            console.log('The data from reservation table are: \n', rows)
        })
    })
});

// Delete a reservation
app.delete('/admin/reservation/:id', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        connection.query('DELETE FROM reservation WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                res.send(`The reservation with the record ID ${[req.params.id]} has been removed.`)
            } else {
                console.log(err)
            }
            
            console.log('The data from reservation table are: \n', rows)
        })
    })
});

// Add reservation
app.post('/administrator/reservation', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        
        const params = req.body
        connection.query('INSERT INTO reservation SET ?', params, (err, rows) => {
        connection.release() // return the connection to pool
        if (!err) {
            res.send(`reservation with the record ID  has been added.`)
        } else {
            console.log(err)
        }
        
        console.log('The data from reservation table are:11 \n', rows)

        })
    })
});



app.put('/admin/reservation/update', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        const { id, name, email, phone, created, modified } = req.body

        connection.query('UPDATE reservation SET name = ?, email = ?, phone = ?, created = ?,modified = ? WHERE id = ?', [name, email, phone, created, id] , (err, rows) => {
            connection.release() // return the connection to pool

            if(!err) {
                res.send(`reservation with the name: ${name} has been added.`)
            } else {
                console.log(err)
            }

        })

        console.log(req.body)
    })
})

//guest queries

//retrieving all reservations made by a guest
app.get('/guest/reservations/', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        connection.query('SELECT * FROM reservation WHERE guest.id = ?', [req.params.id], (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
            
            console.log('The data from reservation are: \n', rows)
        })
    })
});


//retrieving all favourited items made by a guest
app.get('/guest/favourites', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        connection.query('SELECT * FROM favourites WHERE guest.id = ?', [req.params.id], (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
            
            console.log('The data from favourites are: \n', rows)
        })
    })
});


//retrieving all payments made by a guest
app.get('/guest/payments', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        connection.query('SELECT * FROM payemnt WHERE guest.id = ?', [req.params.id], (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
            
            console.log('The data from payments are: \n', rows)
        })
    })
});

//guest query for adding a reservation
app.post('/guest/reservation/', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        
        const params = req.body
        connection.query('INSERT INTO reservation SET ? WHERE guest.id = ?', params, (err, rows) => {
        connection.release() // return the connection to pool
        if (!err) {
            res.send(`The reservation has been added.`)
        } else {
            console.log(err)
        }
        
        console.log('The data from reservation table are:11 \n', rows)

        })
    })
});

//guest query for adding a payment
app.post('/guest/payment/', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        
        const params = req.body
        connection.query('INSERT INTO payment SET ? WHERE guest.id = ?', params, (err, rows) => {
        connection.release() // return the connection to pool
        if (!err) {
            res.send(`The payement has been added.`)
        } else {
            console.log(err)
        }
        
        console.log('The data from payement table are: \n', rows)

        })
    })
});


//guest query for adding a favourite item
app.post('/guest/favourite/', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        
        const params = req.body
        connection.query('INSERT INTO favourites SET ? WHERE guest.id = ?', params, (err, rows) => {
        connection.release() // return the connection to pool
        if (!err) {
            res.send(`The item has been favourited.`)
        } else {
            console.log(err)
        }
        
        console.log('The data from favourite table are: \n', rows)

        })
    })
});


//guest query for deleting a reservation
app.delete('/guest/reservation/:id', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        connection.query('DELETE FROM reservation WHERE id = ? AND guest.id =?', [req.params.id], (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                res.send(`The reservation with the record ID ${[req.params.id]} has been removed.`)
            } else {
                console.log(err)
            }
            
            console.log('The data from reservation table has been deleted \n', rows)
        })
    })
});


//guest query for deleting a favourite item
app.delete('/guest/favourite/:id', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        connection.query('DELETE FROM favourite WHERE id = ? AND guest.id =?', [req.params.id], (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                res.send(`The favourited item with the record ID ${[req.params.id]} has been removed.`)
            } else {
                console.log(err)
            }
            
            console.log('The data from favourite table has been deleted \n', rows)
        })
    })
});

// Listen on enviroment port or 5000
app.listen(port, () => {
    console.log('Server initiated succesfully');
  });