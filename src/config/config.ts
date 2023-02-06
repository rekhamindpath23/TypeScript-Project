import mongoose from 'mongoose';

const MONGO_URL = 'mongodb://localhost:27017/student';

export const config = {
	mongo: {
		url: MONGO_URL
	}
};
