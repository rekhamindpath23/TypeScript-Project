import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './library/logging';
import authorRoutes from './routes/authorRoutes';
import bodyParser from 'body-parser';
import bookRoutes from './routes/bookRoutes';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(authorRoutes);
app.use(bookRoutes);

mongoose.set('strictQuery', true);
mongoose
	.connect(config.mongo.url, { retryWrites: true, w: 'majority' })
	.then(() => {
		Logging.info('database are connected!!');
		StartServer();
	})
	.catch((error) => {
		Logging.error('unable to connect database!!');
		Logging.error(error);
	});

//middleware
app.use('/authors', authorRoutes);
// middleware 2
app.use("/books",bookRoutes);

const StartServer = () => {
	app.use((req, res, next) => {
		Logging.info(`incomingMethod-> Method:[${req.method}] - Url:[${req.url}] -IP:[${req.socket.remoteAddress}]`);

		res.on(`finish`, () => {
			Logging.info(`incomingMethod-> Method:[${req.method}] - Url:[${req.url}] -IP:[${req.socket.remoteAddress}] - Status:[${res.statusCode}]`);
		});
		next();
	});

	//router
	app.get('/user', (req, res, next) => {
		res.status(200).json({ message: 'welcome on client side!!' });
	});

	//handle error

	app.use((req, res, next) => {
		const error = new Error('not found');
		Logging.error(error);

		return res.status(404).json({ message: error.message });
	});

	const port = process.env.port || 3000;

	app.listen(port, () => {
		console.log(`server running on port ${port}`);
	});
};
