import * as api from "../src/api/index.js";

describe("API tests", () => {
  describe("User tests", () => {
    test("Create user", async () => {
      const response = await api.createUser("testuser");
      expect(response).toHaveProperty("success");
      expect(response.success).toBe(true);
    });

    test("Get user by ID", async () => {
      const response = await api.getUserById(0);
      expect(response).toHaveProperty("success");
      expect(response.success).toBe(true);
    });

    test("Get user by username", async () => {
      const response = await api.getUserByUsername("testuser");
      expect(response).toHaveProperty("success");
      expect(response.success).toBe(true);
    });

    test("Get all users", async () => {
      const response = await api.getUsers();
      expect(response[0]).toHaveProperty("success");
      expect(response[0].success).toBe(true);
    });
  });

  describe("Room tests", () => {
    test("Create room", async () => {
      const response = await api.createRoom("testroom");
      expect(response).toHaveProperty("success");
    });

    test("Get room by ID", async () => {
      const response = await api.getRoomById(0);
      expect(response).toHaveProperty("success");
      expect(response.success).toBe(true);
    });

    test("Get room by name", async () => {
      const response = await api.getRoomByName("testroom");
      expect(response).toHaveProperty("success");
      expect(response.success).toBe(true);
    });

    test("Get all rooms", async () => {
      const response = await api.getRooms();
      expect(response[0]).toHaveProperty("success");
      expect(response[0].success).toBe(true);
    });
  });

  describe("Message tests", () => {
    test("Post message", async () => {
      const response = await api.postMessage(0, 0, "Test message");
      expect(response).toHaveProperty("success");
      expect(response.success).toBe(true);
    });
  });

  test("Disconnect", async () => {
    const response = await api.disconnect();
    expect(response).toHaveProperty("success");
    expect(response.success).toBe(true);
  });
});
