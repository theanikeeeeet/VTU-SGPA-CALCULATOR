export const getGradePoint = (marks) => {
    if (marks >= 90) return 10;
    if (marks >= 80) return 9;
    if (marks >= 70) return 8;
    if (marks >= 60) return 7;
    if (marks >= 50) return 6;
    if (marks >= 45) return 5;
    if (marks >= 40) return 4;
    return 0;
};

export const calculateSGPAFromSubjects = (subjects = []) => {
    let totalCredits = 0;
    let weightedPoints = 0;
    subjects.forEach((s) => {
        const mk = Number(s.marks);
        const cr = Number(s.credits);
        if (Number.isFinite(mk) && Number.isFinite(cr) && mk >= 0 && mk <= 100) {
            totalCredits += cr;
            weightedPoints += getGradePoint(mk) * cr;
        }
    });
    if (totalCredits <= 0) return null;
    const sgpa = Math.round((weightedPoints / totalCredits) * 100) / 100;
    return sgpa;
};