class AuthService {
  constructor(UserModel) {
    this.UserModel = UserModel;
  }

  async findUserByEmail({ email }) {
    return await this.UserModel.findOne({ email });
  }

  async createUser(user) {
    return await this.UserModel.create(user);
  }
}

module.exports = AuthService;
