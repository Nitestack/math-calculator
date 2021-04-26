import "module-alias/register";
import dotenv from "dotenv";
dotenv.config();
import bodyParser from 'body-parser';
import express from 'express';
import { join } from "path";
import getRoutes from "@routes/GET";
import postRoutes from "@routes/POST";
const app = express();
app.set('views', join(__dirname, "Views"));
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, "Build")));
app.use("/nodeModules", express.static(join(__dirname, "..", "node_modules")));
app.locals.basedir = join(__dirname, "Build");
app.use("/", getRoutes, postRoutes);
app.all('*', (req, res) => res.render('Errors/404', {
    title: "Not found"
}));
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`The website is live on http://localhost:${port} !`));