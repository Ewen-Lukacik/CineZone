import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("jsonwebtoken", () => ({
  default: { verify: vi.fn() },
}));

import jwt from "jsonwebtoken";
import { requireAuth } from "../../Middlewares/requireAuth.js";

function mockRes() {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.send = vi.fn().mockReturnValue(res);
  return res;
}

describe("requireAuth", () => {
  beforeEach(() => {
    process.env.JWT_SECRET = "test-secret";
    vi.clearAllMocks();
  });

  it("retourne 401 quand il n'y a pas de header Authorization", () => {
    const req = mockReq({ headers: {} });
    const res = mockRes();
    const next = vi.fn();

    requireAuth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it('retourne 401 quand le header ne commence pas par "Bearer "', () => {
    const req = mockReq({ headers: { authorization: "Basic abc123" } });
    const res = mockRes();
    const next = vi.fn();

    requireAuth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
  });

  it("set req.user et appelle next() avec un token valide", () => {
    const decoded = { id: 1, email: "test@test.com", role: "user" };
    jwt.verify.mockReturnValue(decoded);

    const req = mockReq({ headers: { authorization: "Bearer valid-token" } });
    const res = mockRes();
    const next = vi.fn();

    requireAuth(req, res, next);

    expect(req.user).toEqual(decoded);
    expect(next).toHaveBeenCalledOnce();
  });

  it("retourne 401 quand le token est invalide", () => {
    jwt.verify.mockImplementation(() => {
      throw new Error("invalid token");
    });

    const req = mockReq({ headers: { authorization: "Bearer bad-token" } });
    const res = mockRes();
    const next = vi.fn();

    requireAuth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });
});

function mockReq(overrides = {}) {
  return {
    headers: {},
    body: {},
    params: {},
    query: {},
    user: null,
    ...overrides,
  };
}
