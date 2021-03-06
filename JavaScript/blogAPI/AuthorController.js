const AuthorDB = require('./AuthorDB');
const Author = require('./Author')


class AuthorController {

    async index(req, res) {
      res.send(await AuthorDB.all())
    }

    async show(req, res) {
        let id = req.params.id;
        let author = await AuthorDB.find(id);

        if (!author) {
            res.send("Could not find toy with id of " + id);
        } else {
           res.send(author);
        }
    }

    async create(req, res) {
        console.log("About to create author");
        console.log(req.body);
    
        let newAuthor = req.body;

        // Quick and dirty validation
        if (Author.isValid(newAuthor, await AuthorDB.all())) {
            // The 'data' contains the id (primary key) of newly created author
            AuthorDB.create(newAuthor).then(data => res.send(data));
        } else {
            // Send a 422 response.
            res.status(422);
            res.send({message: newAuthor.errors.join(": ")});
        }      
    }

    /*
    async edit(req, res) {
        let id = req.params.id;
        let toy = await ToyDB.find(id);

        if (!toy) {
            res.send("Could not find toy with id of " + id);
        } else {
            res.render('toyEdit', { toy: toy });
        }
    }

    async update(req, res) {
        let id = req.params.id;
        let toy = await ToyDB.find(id);

        let testToy = new Toy(req.body.toy);
        if (!testToy.isValid()) {
            testToy.id = toy.id;
            res.render('toyEdit', { toy: testToy });
            return;
        }

        if (!toy) {
            res.send("Could not find toy with id of " + id);
        } else {
            toy.name = req.body.toy.name;
            toy.description = req.body.toy.description;
            toy.manufacturer = req.body.toy.manufacturer;
            toy.price = req.body.toy.price;

            console.log("About to call update");
            ToyDB.update(toy);

            // Send a redirect to the "show" route for the new toy.
            res.writeHead(302, { 'Location': `/toys/${toy.id}` });
            res.end();
        }
    }
    */
}

module.exports = AuthorController;