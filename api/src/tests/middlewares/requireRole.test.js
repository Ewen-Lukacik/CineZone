import { describe, expect, it, vi } from "vitest";
import { requireRole } from "../../Middlewares/requireRole.js";

function mockRes() {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
}

describe("requireRole", () => {
  it("appelle next() quand le rôle correspond", () => {
    const middleware = requireRole("admin");
    const req = { user: { role: "admin" } };
    const res = mockRes();
    const next = vi.fn();

    middleware(req, res, next);

    expect(next).toHaveBeenCalledOnce();
    expect(res.status).not.toHaveBeenCalled();
  });

  it("retourne 403 quand le rôle ne correspond pas", () => {
    const middleware = requireRole("admin");
    const req = { user: { role: "user" } };
    const res = mockRes();
    const next = vi.fn();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: "Forbidden" });
    expect(next).not.toHaveBeenCalled();
  });

  it("retourne 403 quand req.user est undefined", () => {
    const middleware = requireRole("admin");
    const req = { user: undefined };
    const res = mockRes();
    const next = vi.fn();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
  });
});
