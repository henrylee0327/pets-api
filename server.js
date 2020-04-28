var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var owners = [
    {
        id: 1,
        name: "Adam",
        pets: [
            {
                id: 1,
                name: "Vera",
                type: "Dog"
            },
            {
                id: 2,
                name: "Felix",
                type: "Cat"
            }
        ]
    },
    {
        id: 2,
        name: "Kamilah",
        pets: [
            {
                id: 1,
                name: "Doug",
                type: "Dog"
            }
        ]
    }
];


// GET /api/owners
app.get('/api/owners', function (req, res) {
    console.log('request for api owners')
    res.send(owners)
});

// GET /api/owners/:id
app.get('/api/owners/:id', (req, res) => {
    console.log(req.params.id)

    const requestId = req.params.id

    let ownersId = owners.filter(data => {
        return data.id == requestId
    })

    res.send(ownersId[0])
})

// POST /api/owners
app.post('/api/owners', (req, res) => {
    console.log(req.body);

    const newOwner = {
        id: owners.length + 1,
        name: req.body.name,
        pets: req.body.pets
    };

    owners.push(newOwner);

    res.send(owners);
})

// PUT /api/owners/:id

app.put('/api/owners/:id', function (req, res) {
    // console.log(req.body)
    for (var i = 0; i < owners.length; i++) {
        if (owners[i].id == req.params.id) {
            console.log(owners[i].id)
            owners[i].name = req.body.name;
            owners[i].pets = req.body.pets;
            res.send(owners)
        }
    }
})

// DELETE /api/owners/:id
app.delete('/api/owners/:id', (req, res) => {
    const requestId = req.params.id;

    let deleteOwner = owners.filter(data => {
        return data.id == requestId
    })[0]

    const index = owners.indexOf(deleteOwner)

    owners.splice(index, 1)

    res.send("It is deleted")
})

// GET /api/owners/:id/pets
app.get('/api/owners/:id/pets', (req, res) => {
    console.log("id/pets request")
    
    // const requestId = req.params.id
    
    let ownerId = owners.filter(reqData => {
        console.log(reqData.id)
        return reqData.id == req.params.id
    })
    let selectPet = ownerId[0]

    res.send(selectPet.pets)
})

// GET /api/owners/:id/pets/:petId
app.get('/api/owners/:id/pets/:petId', (req, res) => {
    console.log("id/pets request")
    
    // const requestId = req.params.id
    
    let ownerId = owners.filter(reqData => {
        console.log(reqData.id)
        return reqData.id == req.params.id
    })
    let selectPet = ownerId[0].pets

    let finalPetId = selectPet.filter(reqData => {
        console.log(reqData.id)
        return reqData.id == req.params.petId
    })
    res.send(finalPetId)
})

// POST /api/owners/:id/pets

// PUT /api/owners/:id/pets/:petId

// DELETE /api/owners/:id/pets/:petId


app.listen(5000, function(){
    console.log('Pets API is now listening on port 5000...');
})