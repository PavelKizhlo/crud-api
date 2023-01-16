import request from "supertest";
import { v4 as uuidv4 } from "uuid";
import server from "../index.js";

describe("POST /api/users create new users", () => {
  it("returns status code 201 if all required fields are passed", async () => {
    const res = await request(server)
      .post("/api/users")
      .send({ age: 20, username: "pasha", hobbies: ["write tests"] });

    expect(res.statusCode).toEqual(201);
  });

  it("returns status code 400 if required fields are not passed", async () => {
    const res = await request(server)
      .post("/api/users")
      .send({ age: 20, hobbies: ["write tests"] });

    expect(res.statusCode).toEqual(400);
  });

  it("create multiple users by serial post requests", async () => {
    await request(server)
      .post("/api/users")
      .send({ age: 20, username: "pasha", hobbies: [] });

    await request(server)
      .post("/api/users")
      .send({ age: 20, username: "pasha", hobbies: [] });

    const res = await request(server).get("/api/users");

    // first user created at first test
    expect(res.body.length).toEqual(3);
  });
});

describe("GET /api/users return users", () => {
  it("returns status code 200", async () => {
    const res = await request(server).get("/api/users");

    expect(res.statusCode).toEqual(200);
  });

  it("returns right number of users", async () => {
    const res = await request(server).get("/api/users");

    expect(res.body.length).toEqual(3);
  });
});

describe("GET /api/users/:id works correct", () => {
  const getId = async () => {
    const users = await request(server).get("/api/users");
    return users.body[0].id;
  };

  it("returns status code 200 when ID is correct", async () => {
    const correctId = await getId();
    const res = await request(server).get(`/api/users/${correctId}`);

    expect(res.statusCode).toEqual(200);
  });

  it("returns status code 400 when ID is incorrect", async () => {
    const incorrectId = "fhjsjlsdjgsdlhg";
    const res = await request(server).get(`/api/users/${incorrectId}`);

    expect(res.statusCode).toEqual(400);
  });

  it("returns status code 404 when ID is correct but user doesn't exist", async () => {
    const correctId = uuidv4();
    const res = await request(server).get(`/api/users/${correctId}`);

    expect(res.statusCode).toEqual(404);
  });
});

describe("PUT /api/users/:id works correct", () => {
  const getId = async () => {
    const users = await request(server).get("/api/users");
    return users.body[0].id;
  };

  it("returns status code 200 if all required fields are passed", async () => {
    const correctId = await getId();

    const res = await request(server)
      .put(`/api/users/${correctId}`)
      .send({ age: 20, username: "pasha", hobbies: ["write tests"] });

    expect(res.statusCode).toEqual(200);
  });

  it("returns status code 400 when ID is incorrect ", async () => {
    const incorrectId = "fhjsjlsdjgsdlhg";

    const res = await request(server)
      .put(`/api/users/${incorrectId}`)
      .send({ age: 20, username: "pasha", hobbies: ["write tests"] });

    expect(res.statusCode).toEqual(400);
  });

  it("returns status code 400 when ID is correct required fields are not passed", async () => {
    const correctId = await getId();

    const res = await request(server)
      .put(`/api/users/${correctId}`)
      .send({ age: 20, hobbies: ["write tests"] });

    expect(res.statusCode).toEqual(400);
  });

  it("returns status code 404 when ID is correct but user doesn't exist", async () => {
    const correctId = uuidv4();

    const res = await request(server)
      .put(`/api/users/${correctId}`)
      .send({ age: 20, username: "pasha", hobbies: ["write tests"] });

    expect(res.statusCode).toEqual(404);
  });
});

describe("DELETE /api/users/:id works correct", () => {
  const getId = async () => {
    const users = await request(server).get("/api/users");
    return users.body[0].id;
  };

  it("returns status code 404 when ID is correct but user doesn't exist", async () => {
    const correctId = uuidv4();
    const res = await request(server).delete(`/api/users/${correctId}`);

    expect(res.statusCode).toEqual(404);
  });

  it("returns status code 400 when ID is incorrect", async () => {
    const incorrectId = "fhjsjlsdjgsdlhg";
    const res = await request(server).delete(`/api/users/${incorrectId}`);

    expect(res.statusCode).toEqual(400);
  });

  it("returns status code 200 when ID is correct", async () => {
    const correctId = await getId();
    const res = await request(server).delete(`/api/users/${correctId}`);

    expect(res.statusCode).toEqual(204);
  });

  it("deleted user can not be found by it's ID", async () => {
    const correctId = await getId();
    await request(server).delete(`/api/users/${correctId}`);
    const res = await request(server).get(`/api/users/${correctId}`);

    expect(res.statusCode).toEqual(404);
  });
});

describe("Correct handles requests to non-existing endpoints", () => {
  it("returns status code 404 if endpoint doesn't exist", async () => {
    const res = await request(server).get("/some-non/existing/resource");

    expect(res.statusCode).toEqual(404);
  });
});
