const axios = require("axios");

const BASE = "https://jsonplaceholder.typicode.com";

test("GET all users - status 200", async () => {
  const res = await axios.get(`${BASE}/users`);
  expect(res.status).toBe(200);
  expect(res.data.length).toBeGreaterThan(0);
  console.log("✅ Users count:", res.data.length);
});

test("GET single post - has title", async () => {
  const res = await axios.get(`${BASE}/posts/1`);
  expect(res.status).toBe(200);
  expect(res.data).toHaveProperty("title");
  console.log("✅ Post title:", res.data.title);
});

test("POST create post - returns 201", async () => {
  const res = await axios.post(`${BASE}/posts`, {
    title: "Test Post",
    body: "Hello World",
    userId: 1,
  });
  expect(res.status).toBe(201);
  expect(res.data.title).toBe("Test Post");
  console.log("✅ Created ID:", res.data.id);
});

test("PUT update post - title updated", async () => {
  const res = await axios.put(`${BASE}/posts/1`, {
    title: "Updated Title",
    body: "Updated body",
    userId: 1,
  });
  expect(res.status).toBe(200);
  expect(res.data.title).toBe("Updated Title");
  console.log("✅ Updated:", res.data.title);
});

test("DELETE post - status 200", async () => {
  const res = await axios.delete(`${BASE}/posts/1`);
  expect(res.status).toBe(200);
  console.log("✅ Deleted successfully");
});