import mongoose, { Document, model, Schema } from 'mongoose';

export interface IAuthor extends Document {
	name: string;
}

const AuthorSchema: Schema = new Schema<IAuthor>({
	name: {
		type: String,
		require: true
	}
});

const UserModel = model<IAuthor>('User', AuthorSchema);
export default UserModel;
