import HttpException from './HttpException';

class UserWithThatEmailAlreadyExistsException extends HttpException {
    constructor(email: string) {
        super(404, 'User with that email already exists');
    }
}

export default UserWithThatEmailAlreadyExistsException;