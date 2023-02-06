import mongoose ,{Document,Schema}from 'mongoose';

export interface IBook extends Document
{
title:string;
author:string
}

const BookSchema:Schema=new Schema(
    {
        title:
        {
            type:String,
            require:true
        },
        author:
        {
            type:String,
            require:true,
            ref:'Author'
        }
    },
    {
        timestamps:true
    }
);

export default mongoose.model<IBook>('Book',BookSchema);