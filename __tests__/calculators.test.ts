/**
 * Test cases cho calculator logic (sử dụng đúng tên hàm export thực tế)
 * Bug cũ: resultState được tính lại mỗi render (không dùng useMemo) → chậm
 * Fix: useMemo bao quanh definition.run(values)
 */
import { describe, expect, it } from "vitest";

import { calculateBmi, getBmiCategory } from "@/lib/calculators/bmi";
import { calculateLoan } from "@/lib/calculators/loan";
import { calculatePercentage } from "@/lib/calculators/percentage";
import { calculateDiscount } from "@/lib/calculators/discount";

describe("BMI Calculator - calculateBmi()", () => {
  it("TC-021: BMI metric bình thường (170cm, 65kg → ~22.5, Normal weight)", () => {
    const result = calculateBmi({ mode: "metric", heightCm: 170, weightKg: 65 });
    expect(result.bmi).toBeCloseTo(22.49, 1);
    expect(result.category).toBe("Normal weight");
  });

  it("TC-022: BMI metric thừa cân (170cm, 87kg → Overweight/Obese)", () => {
    const result = calculateBmi({ mode: "metric", heightCm: 170, weightKg: 87 });
    expect(result.bmi).toBeGreaterThan(25);
    expect(["Overweight", "Obesity"]).toContain(result.category);
  });

  it("TC-023: BMI với weight cực nhỏ không crash", () => {
    expect(() => calculateBmi({ mode: "metric", heightCm: 170, weightKg: 1 })).not.toThrow();
  });

  it("TC-024: BMI imperial (69 inch, 160 lbs → ~23.6 Normal weight)", () => {
    const result = calculateBmi({ mode: "imperial", heightInches: 69, weightPounds: 160 });
    expect(result.bmi).toBeCloseTo(23.6, 0);
    expect(result.category).toBe("Normal weight");
  });

  it("TC-025: getBmiCategory phân loại đúng theo ngưỡng WHO", () => {
    expect(getBmiCategory(16)).toBe("Underweight");
    expect(getBmiCategory(22)).toBe("Normal weight");
    expect(getBmiCategory(27)).toBe("Overweight");
    expect(getBmiCategory(35)).toBe("Obesity");
    expect(getBmiCategory(18.5)).toBe("Normal weight");
    expect(getBmiCategory(25)).toBe("Overweight");
    expect(getBmiCategory(30)).toBe("Obesity");
  });
});

describe("Loan Calculator - calculateLoan()", () => {
  it("TC-026: Loan $10k, 5% rate, 1 năm → monthly ~$856", () => {
    const result = calculateLoan({ principal: 10000, annualRatePercent: 5, years: 1 });
    expect(result.monthlyPayment).toBeGreaterThan(850);
    expect(result.monthlyPayment).toBeLessThan(865);
  });

  it("TC-027: totalPayment >= principal (invariant)", () => {
    const result = calculateLoan({ principal: 10000, annualRatePercent: 5, years: 1 });
    expect(result.totalPayment).toBeGreaterThanOrEqual(10000);
  });

  it("TC-028: totalInterest = totalPayment - principal", () => {
    const result = calculateLoan({ principal: 10000, annualRatePercent: 5, years: 1 });
    expect(result.totalInterest).toBeCloseTo(result.totalPayment - 10000, 1);
  });

  it("TC-029: annualRate=0 → monthlyPayment = principal / (years*12)", () => {
    const result = calculateLoan({ principal: 12000, annualRatePercent: 0, years: 1 });
    expect(result.monthlyPayment).toBeCloseTo(1000, 0);
    expect(result.totalInterest).toBe(0);
  });
});

describe("Percentage Calculator - calculatePercentage()", () => {
  it("TC-030: 20% của 150 = 30 (mode: percent-of)", () => {
    const result = calculatePercentage({ mode: "percent-of", percent: 20, value: 150 });
    expect(result.result).toBeCloseTo(30, 2);
  });

  it("TC-031: 30 là bao nhiêu % của 150 = 20% (mode: what-percent)", () => {
    const result = calculatePercentage({ mode: "what-percent", part: 30, whole: 150 });
    expect(result.result).toBeCloseTo(20, 2);
  });

  it("TC-032: Tăng 150 lên 20% = 180 (mode: adjust-by-percent, increase)", () => {
    const result = calculatePercentage({ mode: "adjust-by-percent", direction: "increase", value: 150, percent: 20 });
    expect(result.result).toBeCloseTo(180, 2);
  });
});

describe("Discount Calculator - calculateDiscount()", () => {
  it("TC-033: 20% discount trên $100 → finalPrice=$80, amountSaved=$20", () => {
    const result = calculateDiscount({ originalPrice: 100, discountPercent: 20 });
    expect(result.finalPrice).toBe(80);
    expect(result.amountSaved).toBe(20);
  });

  it("TC-034: 100% discount → finalPrice=0", () => {
    const result = calculateDiscount({ originalPrice: 200, discountPercent: 100 });
    expect(result.finalPrice).toBe(0);
    expect(result.amountSaved).toBe(200);
  });

  it("TC-035: Không crash với originalPrice=0", () => {
    expect(() => calculateDiscount({ originalPrice: 0, discountPercent: 50 })).not.toThrow();
  });

  it("TC-036: finalPrice + amountSaved = originalPrice (invariant)", () => {
    const result = calculateDiscount({ originalPrice: 250, discountPercent: 35 });
    expect(result.finalPrice + result.amountSaved).toBeCloseTo(250, 5);
  });
});
