import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Author from '../models/Author';
import bodyParser from 'body-parser';

//create author data

const createAuthor = (req: Request, res: Response, next: NextFunction) => {
	const { name } = req.body;
	console.log(name);
	const author = new Author({
		_id: new mongoose.Types.ObjectId(),
		name
	});

	return author
		.save()
		.then((author) => res.status(201).json({ author }))
		.catch((error) => res.status(500).json({ error }));
};

//read single Author data

const readAuthor = (req: Request, res: Response, next: NextFunction) => {
	const authorId = req.params.authorId;

	return Author.findById(authorId)
		.then((author) => (author ? res.status(200).json({ author }) : res.status(404).json({ message: 'not found' })))
		.catch((error) => {
			res.status(500).json({ error });
		});
};

//read All author data

const readAllAuthor = (req: Request, res: Response, next: NextFunction) => {
	return Author.find()
		.then((authors) => res.status(200).json({ authors }))
		.catch((error) => res.status(500).json({ error }));
};

//update author data
const updateAuthor = (req: Request, res: Response, next: NextFunction) => {
	const authorId = req.params.authorId;

	return Author.findById(authorId)
		.then((author) => {
			if (author) {
				author.set(req.body);
				return author
					.save()
					.then((author) => {
						res.status(200).json({ author });
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

const deleteAuthor = (req: Request, res: Response, next: NextFunction) => {
	const authorId = req.params.authorId;

	return Author.findByIdAndDelete(authorId)
		.then((author) => {
			author ? res.status(201).json({ message: 'delete' }) : res.status(404).json({ message: 'not found' });
		})
		.catch((error) => {
			res.status(500).json({ error });
		});
};


//delete all data

/*const deleteAllAuthor=(req:Request,res:Response,next:NextFunction)=>
{

return Author.deleteMany()
.then((author)=>
{
	author?res.status(201).json({message:'all are deleted successfully'}) : res.status(404).json({message:'not found'});
})
.catch((error)=>
{
	res.status(500).json({error});
});
};
*/
export default { createAuthor, readAuthor, readAllAuthor, updateAuthor, deleteAuthor };
