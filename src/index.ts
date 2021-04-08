import "module-alias/register";
import dotenv from "dotenv";
dotenv.config();
import bodyParser from 'body-parser';
import express from 'express';
import { join } from "path";
import rootRoutes from "@routes/root";
const app = express();
app.set('views', join(__dirname, "Views"));
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, "Assets")));
app.locals.basedir = join(__dirname, "Assets");
app.use("/", rootRoutes);
app.all('*', (req, res) => res.render('Errors/404', {

}));
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`The website is live on http://localhost:${port} !`));