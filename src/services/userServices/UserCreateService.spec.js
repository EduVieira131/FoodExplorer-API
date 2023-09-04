const UserCreateService = require("../services/UserCreateService")
const UserRepositoryInMemory = require("../../repositories/UserRepositoryInMemory")
const AppError = require("../../utils/AppError")

describe('UserCreateService', () => {
  let userRepositoryInMemory = null
  let userCreateService = null

  beforeEach(async () => {
    userRepositoryInMemory = new UserRepositoryInMemory()
    userCreateService = new UserCreateService(userRepositoryInMemory)
  })

  it('user should be created', async () => {
    const user = {
      name: "User test",
      email: "user@test.com",
      password: "123"
    }

    const userCreated = await userCreateService.execute(user)

    expect(userCreated).toHaveProperty("id")
  });

  it("user shouldn't be created with an email that already exists", async () => {
    const user1 =  {
      name: "User test 1",
      email: "user@test.com",
      password: "123"
    }

    const user2 =  {
      name: "User test 2",
      email: "user@test.com",
      password: "123"
    }

    await userCreateService.execute(user1)
    await expect(userCreateService.execute(user2)).rejects.toEqual(new AppError("Esse e-mail já está cadastrado."))
  });
});