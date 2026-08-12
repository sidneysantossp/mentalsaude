import { describe, expect, it } from "vitest";
import { adminProcedure, router } from "./_core/trpc";
import type { TrpcContext } from "./_core/context";

const accessRouter = router({
  restricted: adminProcedure.query(() => "authorized"),
});

function createContext(role: "user" | "admin"): TrpcContext {
  return {
    user: {
      id: 1,
      openId: `${role}-account`,
      name: "Conta de teste",
      email: "conta@example.com",
      loginMethod: "manus",
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("adminProcedure", () => {
  it("bloqueia uma conta comum", async () => {
    const caller = accessRouter.createCaller(createContext("user"));
    await expect(caller.restricted()).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("permite uma conta administradora", async () => {
    const caller = accessRouter.createCaller(createContext("admin"));
    await expect(caller.restricted()).resolves.toBe("authorized");
  });
});
