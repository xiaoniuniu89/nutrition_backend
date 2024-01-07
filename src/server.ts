import express from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
import { protect } from "./modules/auth";

// import { createNewUser, signin } from "./handlers/user";

const app = express();

const consoleUrl = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  console.log(req.method + " " + req.url);
  next();
};

// app.use(consoleUrl);
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", 'true');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});
app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", protect, router);

app.get("/", (req, res) => {
  return res.json({
    endpoints: {
      root: "/",
      createUser: "/user",
      signIn: "/signin",
      api: "/api",
    },
  });
});

// app.post("/user", createNewUser);
// app.post("/signin", signin);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500);
  res.json({ error: err.message });
});

export default app;
