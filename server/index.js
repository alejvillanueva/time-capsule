import express from "express";
import cors from "cors";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// Resolve the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Static files
app.use(express.static(join(__dirname, "..", "client", "dist")));

//Router

//Server
app.listen(PORT, () => {
	console.log(`Listening on port: ${PORT}`);
});

// Error handling middleware
// Will improve as we grow project
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Something broke!");
});
