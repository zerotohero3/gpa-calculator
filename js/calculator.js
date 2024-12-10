export class GPACalculator {
  constructor() {
    this.grades = [];
  }

  calculateGPA(grades) {
    if (!grades.length) return { gpa10: "-", gpa4: "-" };

    let totalWeightedGrade = 0;
    let totalCredits = 0;
    let isValid = true;

    grades.forEach(({ grade, credits }) => {
      if (grade < 0 || grade > 10 || credits < 1 || credits > 10) {
        isValid = false;
        return;
      }
      totalWeightedGrade += grade * credits;
      totalCredits += credits;
    });

    if (!isValid || totalCredits === 0) return { gpa10: "-", gpa4: "-" };

    const gpa10 = totalWeightedGrade / totalCredits;
    const gpa4 = (gpa10 * 4) / 10;

    return {
      gpa10: gpa10.toFixed(2),
      gpa4: gpa4.toFixed(2),
    };
  }
}
