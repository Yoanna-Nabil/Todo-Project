import mongoose from 'mongoose';

export const initConnection= () => {
    mongoose.connect(`mongodb://127.0.0.1:27017/uiAssuite`)
    .then( () => console.log('DB Connected'))
    .catch( (err) => console.log('DB err', err));
}