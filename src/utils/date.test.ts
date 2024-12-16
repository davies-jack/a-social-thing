import { formatDate } from "./date";

describe("formatDate", () => {
  it("should format seconds correctly", () => {
    const now = new Date();
    const date = new Date(now.getTime() - 30 * 1000); // 30 seconds ago
    expect(formatDate(date)).toBe("30 seconds ago");

    const singleSecond = new Date(now.getTime() - 1000); // 1 second ago
    expect(formatDate(singleSecond)).toBe("1 second ago");
  });

  it("should format minutes correctly", () => {
    const now = new Date();
    const date = new Date(now.getTime() - 5 * 60 * 1000); // 5 minutes ago
    expect(formatDate(date)).toBe("5 minutes ago");

    const singleMinute = new Date(now.getTime() - 60 * 1000); // 1 minute ago
    expect(formatDate(singleMinute)).toBe("1 minute ago");
  });

  it("should format hours correctly", () => {
    const now = new Date();
    const date = new Date(now.getTime() - 3 * 60 * 60 * 1000); // 3 hours ago
    expect(formatDate(date)).toBe("3 hours ago");

    const singleHour = new Date(now.getTime() - 60 * 60 * 1000); // 1 hour ago
    expect(formatDate(singleHour)).toBe("1 hour ago");
  });

  it("should format days correctly", () => {
    const now = new Date();
    const date = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000); // 2 days ago
    expect(formatDate(date)).toBe("2 days ago");

    const singleDay = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 1 day ago
    expect(formatDate(singleDay)).toBe("1 day ago");
  });
});
