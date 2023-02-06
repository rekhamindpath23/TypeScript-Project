import express from 'express';
import  controller from '../controllers/controllerBook';

const router = express.Router();

router.post('/create', controller.createBook);

router.get('/read/:bookId', controller.readBook);

router.get('/read', controller.readAllBook);

router.patch('/update/:bookId', controller.updateBook);

router.delete('/delete/:bookId', controller.deleteBook);


export = router;
