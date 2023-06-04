import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import SequelizeStore from "connect-session-sequelize";
import db from "./config/database.js";
import UsersRoute from "./routes/UsersRoute.js";
import DiscussionRoute from "./routes/DiscussionRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import MessageRoute from "./routes/MessageRoute.js"

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
  db: db,
});

// (async()=>{
//   try{
//     await db.sync();
//     console.log('Database sync successful');
//   } catch (error) {
//     console.error('Database sync error:', error);
//     // Tangani kesalahan sinkronisasi database
//   }
// })();

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: false,
    },
  })
);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

app.use(UsersRoute);
app.use(DiscussionRoute);
app.use(AuthRoute);
app.use(MessageRoute);

// store.sync();
// console.log(user);

app.listen(process.env.APP_PORT, () => {
  console.log("SERVER IS UP AND RUNNING");
});
