export function mustRedirectNonAdmin(adminOnly: boolean, role: "admin" | "user" | undefined): boolean {
  return adminOnly && role !== "admin";
}
