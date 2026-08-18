import { describe, expect, it } from "vitest";
import { purchaseSubjectFor } from "./purchase";

describe("purchaseSubjectFor", () => {
  it("compone l’oggetto acquisto con il nome di ciascun modello", () => {
    expect(purchaseSubjectFor("Panarius Pro Wheels")).toBe("Richiesta Acquisto Panarius Pro Wheels");
    expect(purchaseSubjectFor("Panarius Pro")).toBe("Richiesta Acquisto Panarius Pro");
    expect(purchaseSubjectFor("Panarius Lite Wheels")).toBe("Richiesta Acquisto Panarius Lite Wheels");
    expect(purchaseSubjectFor("Panarius Lite")).toBe("Richiesta Acquisto Panarius Lite");
  });
});
