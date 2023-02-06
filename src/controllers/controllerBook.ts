import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import book from '../models/Book';
import bodyParser from 'body-parser';
import Book from '../models/Book';

//create author data

const createBook = (req: Request, res: Response, next: NextFunction) => {
	const { title, author } = req.body;

	const book = new Book({
		_id: new mongoose.Types.ObjectId(),
		title,
		author
	});

	return book
		.save()
		.then((book) => res.status(201).json({ book }))
		.catch((error) => res.status(500).json({ error }));
};

//read single Author data

const readBook = (req: Request, res: Response, next: NextFunction) => {
	const bookId = req.params.bookId;

	return Book.findById(bookId)
		.then((book) => (book ? res.status(200).json({ book }) : res.status(404).json({ message: 'not found' })))
		.catch((error) => {
			res.status(500).json({ error });
		});
};

//read All author data

const readAllBook = (req: Request, res: Response, next: NextFunction) => {
	return Book.find()
		.then((book) => res.status(200).json({ book }))
		.catch((error) => res.status(500).json({ error }));
};

//update author data
const updateBook = (req: Request, res: Response, next: NextFunction) => {
	const bookId = req.params.bookId;

	return Book.findById(bookId)
		.then((book) => {
			if (book) {
				book.set(req.body);
				return book
					.save()
					.then((book) => {
						res.status(200).json({ book });
					})
					.catch((error) => {
						res.status(500).json({ error });
					});
			} else {
				res.status(404).json({ message: 'not found' });
			}
		})
		.catch((error) => {
			res.status(500).json({ error });
		});
};

//delete author data

const deleteBook = (req: Request, res: Response, next: NextFunction) => {
	const bookId = req.params.bookId;

	return Book.findByIdAndDelete(bookId)
		.then((book) => {
			book ? res.status(201).json({ message: 'delete' }) : res.status(404).json({ message: 'not found' });
		})
		.catch((error) => {
			res.status(500).json({ error });
		});
};

export default {createBook,readBook,readAllBook,updateBook,deleteBook};
