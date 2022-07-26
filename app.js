const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const morgan = require("morgan");
const config = require("./config");

const members = [
  {
    id: 1,
    name: "John",
  },
  {
    id: 2,
    name: "Julie",
  },
  {
    id: 3,
    name: "Jack",
  },
];

let MembersRouter = express.Router();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

MembersRouter.route("/:id")

  // Récupère un membre avec son ID
  .get((req, res) => {
    let index = getIndex(req.params.id);

    if (typeof index == "string") {
      res.json(index);
    } else {
      res.json((members[index]));
    }
  })

  // Modifie un membre avec ID
  .put((req, res) => {
    let index = getIndex(req.params.id);

    if (typeof index == "string") {
      res.json(index);
    } else {
      let same = false;

      for (let i = 0; i < members.length; i++) {
        if (
          req.body.name == members[i].name &&
          req.params.id != members[i].id
        ) {
          same = true;
          break;
        }
      }

      if (same) {
        res.json("same name");
      } else {
        members[index].name = req.body.name;
        res.json(true);
      }
    }
  })

  // Supprime un membre avec ID
  .delete((req, res) => {
    let index = getIndex(req.params.id);

    if (typeof index == "string") {
      res.json(index);
    } else {
      members.splice(index, 1);
      res.json(members);
    }
  });

MembersRouter.route("/")

  // Récupère tous les membres
  .get((req, res) => {
    if (req.query.max != undefined && req.query.max > 0) {
      res.json(members.slice(0, req.query.max));
    } else if (req.query.max != undefined) {
      res.json("Wrong max value");
    } else {
      res.json(members);
    }
  })

  // Ajoute un membre avec son nom
  .post((req, res) => {
    if (req.body.name) {
      let sameName = false;
      for (let i = 0; i < members.length; i++) {
        if (members[i].name == req.body.name) {
          sameName = true;
          break;
        }
      }

      if (sameName) {
        res.json(("name already taken"));
      } else {
        let member = {
          id: createID(),
          name: req.body.name,
        };
        members.push(member);
        res.json(member);
      }
    } else {
      res.json(error("no name value"));
    }
  });

app.use(config.rootAPI + "members", MembersRouter);

app.listen(config.port, () => console.log("Started on port " + config.port));

function getIndex(id) {
  for (let i = 0; i < members.length; i++) {
    if (members[i].id == id) return i;
  }
  return "wrong id";
}

function createID() {
  return members[members.length - 1].id + 1;
}
