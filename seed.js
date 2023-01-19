import { UserModel } from './/models/user.js';
import { dbClose } from './db.js';

await UserModel.deleteMany();
console.log('Deleted all users');

dbClose();