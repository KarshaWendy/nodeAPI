// Get all reservations
app.get('/reservation', (req, res) => {
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

// Get an reservationl
app.get('/reservation/:id', (req, res) => {
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
app.delete('/reservation/:id', (req, res) => {

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
app.post('/reservation', (req, res) => {

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



app.put('', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        const { id, name, email, phone, created, modified } = req.body

        connection.query('UPDATE reservations SET name = ?, email = ?, phone = ?, created = ?,modified = ? WHERE id = ?', [name, email, phone, created, id] , (err, rows) => {
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