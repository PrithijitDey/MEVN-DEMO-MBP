const userService = require("../service/userService");
module.exports = function (app, express) {
  let user = express.Router();
  user.post("/login", async (req, res) => {
    let response = await userService.login(req.body);
    res.status(response.status).json(response.data);
  });
  user.post("/register", async (req, res) => {
    let response = await userService.register(req.body);
    res.status(response.status).json(response.data);
  });
  user.put("/update", async (req, res) => {
    let response = await userService.update(req.par, req.body);
    res.status(response.status).json(response.data);
  });
  user.get("/get-user", async (req, res) => {
    let response = await userService.user_details(req.body);
    res.status(response.status).json(response.data);
  });
  user.get("/logout", async (req, res) => {
    let response = await userService.logout(req.query);
    res.status(response.status).json(response.data);
  });
  return user;
};
