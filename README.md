# **Dinner Mate Backend**

T3A2-A Documentaion Github repo [_click here_](https://github.com/roger2727/MitchellRoger_T3A2-A).\
Dinner Mate Backend Github repo [_click here_](https://github.com/roger2727/dinner-mate-backend).\
Dinner Mate frontend Github repo [_click here_](https://github.com/roger2727/dinner-mate-frontend).

<br>

# Table of Contents

- [Database Info](#database-system-used-for-this-project-and-why)
- [Models Info](#models)
- [End Points](#api-endpoints)
- [Testing](#tests)

<br>

# **Database system used for this project and why?**

we chose MongoDB as my database for this project because it offers a lot of benefits over other databases. Firstly, MongoDB's document-based data model is perfect for the recipe storage app because it allows me to store and retrieve the different fields and properties of a recipe in a flexible and dynamic way. Additionally, MongoDB is highly scalable, which will come in handy as my recipe app grows and handles more traffic and data. Furthermore, MongoDB's memory-mapped storage engine makes it a great choice for web applications that need to perform a lot of read and write operations. This makes it a perfect choice for my recipe app. MongoDB is also relatively easy to use and comes with a large community that provides support, tutorials and other resources. These factors made MongoDB the best choice for the app

<br>

<br>
<br>

<!-- R9 Discuss the database relations to be implemented in your application -->
<!-- R4 Identify and discuss the key functionalities and benefits of an ORM -->

# **Models**

<!-- R6 An ERD for your app -->

<br>
<br>

# auth end points

| HTTP Verbs | Endpoints       | Action                  | Respose                                        |
| ---------- | --------------- | ----------------------- | ---------------------------------------------- |
| POST       | /auth/register/ | Register a new user     | [Response](#register-a-new-user)               |
| GET        | /auath/login/   | login into user account | [Response](#end-point-login-into-user-account) |

# Recipe endpoints

<br>

| HTTP   | Endpoints                       | Action                       | Respose      |
| ------ | ------------------------------- | ---------------------------- | ------------ |
| POST   | /recipes/                       | adds recipe                  | [Response]() |
| POST   | /recipes/upload-image/:recipeId | adds image to recipe         | [Response]() |
| GET    | /recipes/all                    | gets all users recipes       | [Response]() |
| GET    | /recipes/public                 | gets all recipes             | [Response]() |
| GET    | /recipes/search-ingredents"     | gets recipes with ingredints | [Response]() |
| DELETE | /delete/:recipeId               | deletes recipe by recipe id  | [Response]() |
| PATCH  | /update/:recipeId               | updated fields by recipe id  | [Response]() |
| PATCH  |                                 |                              | [Response]() |
| DELETE |                                 |                              | [Response]() |

<br>
<br>

# Recipe endpoints

| HTTP Verbs | Endpoints | Action | Respose      |
| ---------- | --------- | ------ | ------------ |
| GET        |           |        | [Response]() |
| GET        |           |        | [Response]() |
| POST       |           |        | [Response]() |
| DELETE     |           |        | [Response]() |
| PATCH      |           |        | [Response]() |

<br>
<br>

# **Tests**

```javascript
describe("POST /auth/login", () => {
  let user;
  beforeEach(async () => {
    // Create a new user in the test database
    const password = await bcrypt.hash("password", 12);
    user = new UserModel({
      email: "test@example.com",
      password,
      username: "testuser",
    });
    await user.save();
  });

  afterEach(async () => {
    // Delete the test user from the test database
    await UserModel.deleteMany({});
  });

  it("should return a token and a message on successful login", async () => {
    // Send the email and password in the request body
    const res = await request(app)
      .post("/auth/login")
      .send({ email: "test@example.com", password: "password" })
      .expect(200);

    expect(res.body).toHaveProperty("token");
    expect(res.body).toHaveProperty("msg", "You have successfully logged in");
  });
});
```
