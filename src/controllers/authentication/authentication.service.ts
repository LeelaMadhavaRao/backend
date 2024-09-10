// import bcrypt from 'bcrypt';
// import type { IUser} from '../../models/authentication/user.model';
// import { User } from '../../models/authentication/user.model';
// import { HTTPError } from '../../@utils/middlewares/error-handler.middleware';
// import Jwt from 'jsonwebtoken'
// import { JWT_EXPIRY, JWT_SECRET } from '../../config';


// export const getJwtToken = (payload: IUser) => {
//     return Jwt.sign({ ...payload }, JWT_SECRET, {
//         expiresIn: JWT_EXPIRY
//     })
// }

// export const loginByEmailPassword = async(email: string, password: string) => {
//     const user = await User.findOne({ email, isActive: true })
//     if (!user) {
//         throw new HTTPError('User does not exist')
//     }

//     if (!user.password) {
//         throw new HTTPError('Please set your password first')
//     }

//     if (!bcrypt.compareSync(password, user.password)) {
//         throw new HTTPError('Wrong password')
//     }


//     delete (user as {password?: string}).password
//     return ({ token: getJwtToken(user as IUser), user: user });
// }
