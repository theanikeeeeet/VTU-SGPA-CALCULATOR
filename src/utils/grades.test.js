import { getGradePoint, calculateSGPAFromSubjects } from './grades';

test('getGradePoint mapping', () => {
    expect(getGradePoint(95)).toBe(10);
    expect(getGradePoint(85)).toBe(9);
    expect(getGradePoint(75)).toBe(8);
    expect(getGradePoint(65)).toBe(7);
    expect(getGradePoint(55)).toBe(6);
    expect(getGradePoint(47)).toBe(5);
    expect(getGradePoint(41)).toBe(4);
    expect(getGradePoint(30)).toBe(0);
});

test('calculateSGPAFromSubjects returns null for no valid marks', () => {
    expect(calculateSGPAFromSubjects([])).toBeNull();
    expect(calculateSGPAFromSubjects([{ marks: '', credits: 3 }])).toBeNull();
});

test('calculateSGPAFromSubjects calculates correctly', () => {
    const subs = [
        { marks: 95, credits: 3 }, // gp 10 -> 30
        { marks: 85, credits: 4 }, // gp 9 -> 36
    ];
    // total credits 7 => (30+36)/7 = 9.42857 => 9.43
    expect(calculateSGPAFromSubjects(subs)).toBeCloseTo(9.43, 2);
});
