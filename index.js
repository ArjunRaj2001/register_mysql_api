let express = require("express");
let bodyParser = require("body-parser");
let db = require("./mongoose/db");
let swaggerUi = require("swagger-ui-express");
let swaggerDoc = require("./swagger.json");
let auth = require("./middleware/auth");
let insert = require("./controllre/register");
let login = require("./controllre/login");
let verify = require("./controllre/verify");
let edite = require("./controllre/edite");
let del = require("./controllre/delete");

let app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.post("/register", insert.registerUser);

app.post("/login", login.loginUser);

app.get("/home", auth.verifyToken, verify.verifyUser);

app.put("/edite", auth.verifyToken, edite.editeUser);

app.delete("/delete", auth.verifyToken, del.delUser);

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000/api-docs");
});
