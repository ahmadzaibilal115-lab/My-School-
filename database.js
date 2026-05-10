// ===================================================
// هفتم با - School Grade Management Database
// Source: هفتم_با.xlsx
// ===================================================

// --- SCHOOL METADATA ---
export const SCHOOL_INFO = {
  ministry: "وزارت معارف",
  department: "ریاست معارف (شهر کابل)",
  district: "آمریت معارف (حوزه هشتم تعلیمی)",
  school: "لیسه عالی (خصوصی معرفت افغان نمبر۱)",
  className: "هفتم با",
  grade: 7,
  academicYearShamsi: 1404,
  academicYearHijri: 1447,
  supervisor: "شمس احمدزی",
  principal: "نورالرحمن حنیفی",
  viceAcademic: "",
  headTeacher: "ساحل",
  committee: [
    "نورمحمد توتاخیل",
    "سید همایون اشرفی",
    "سید ماهر ساحل",
  ],
  totalSubjects: 15,
  totalSchoolDays: 81,    // ایام چهارونیم ماه
  totalAnnualDays: 109,    // ایام سالانه
  totalYearDays: 190,      // مجموع ایام سال تعلیمی
  absentThresholdDays: 48, // ایام محرومی امتحان سالانه
  contact: "abidizatullah@gmail.com",
};

// --- SUBJECTS (مضامین) ---
export const SUBJECTS = [
  { id: 1, name: "قرآنکریم", nameEn: "Quran", maxHalf: 40, maxAnnual: 60, maxTotal: 100 },
  { id: 2, name: "دنیات", nameEn: "Dinyat", maxHalf: 40, maxAnnual: 60, maxTotal: 100 },
  { id: 3, name: "دری", nameEn: "Dari", maxHalf: 40, maxAnnual: 60, maxTotal: 100 },
  { id: 4, name: "پشتو", nameEn: "Pashto", maxHalf: 40, maxAnnual: 60, maxTotal: 100 },
  { id: 5, name: "تجوید", nameEn: "Tajweed", maxHalf: 40, maxAnnual: 60, maxTotal: 100 },
  { id: 6, name: "عربي", nameEn: "Arabic", maxHalf: 40, maxAnnual: 60, maxTotal: 100 },
  { id: 7, name: "انگلیسي", nameEn: "English", maxHalf: 40, maxAnnual: 60, maxTotal: 100 },
  { id: 8, name: "ریاضي", nameEn: "Mathematics", maxHalf: 40, maxAnnual: 60, maxTotal: 100 },
  { id: 9, name: "فزیک", nameEn: "Physics", maxHalf: 40, maxAnnual: 60, maxTotal: 100 },
  { id: 10, name: "کیمیا", nameEn: "Chemistry", maxHalf: 40, maxAnnual: 60, maxTotal: 100 },
  { id: 11, name: "بیولوژي", nameEn: "Biology", maxHalf: 40, maxAnnual: 60, maxTotal: 100 },
  { id: 12, name: "ساینس", nameEn: "Science", maxHalf: 40, maxAnnual: 60, maxTotal: 100 },
  { id: 13, name: "اجتماعیات/تاریخ", nameEn: "Social Studies", maxHalf: 40, maxAnnual: 60, maxTotal: 100 },
  { id: 14, name: "جغرافیه", nameEn: "Geography", maxHalf: 40, maxAnnual: 60, maxTotal: 100 },
  { id: 15, name: "مدني", nameEn: "Civic", maxHalf: 40, maxAnnual: 60, maxTotal: 100 },
  { id: 16, name: "حسن خط/رسم", nameEn: "Calligraphy", maxHalf: 40, maxAnnual: 60, maxTotal: 100 },
  { id: 17, name: "حرفه", nameEn: "Vocational", maxHalf: 40, maxAnnual: 60, maxTotal: 100 },
  { id: 18, name: "مهارت زندگی", nameEn: "Life Skills", maxHalf: 40, maxAnnual: 60, maxTotal: 100 },
  { id: 19, name: "تربیت بدنی", nameEn: "Physical Ed.", maxHalf: 40, maxAnnual: 60, maxTotal: 100 },
  { id: 20, name: "تهذیب", nameEn: "Ethics", maxHalf: 40, maxAnnual: 60, maxTotal: 100 },
];

// --- GRADING SCALE ---
export const GRADE_SCALE_HALF = [
  { grade: "الف", label: "A", minAvg: 36, maxAvg: 40, result: "موفق" },
  { grade: "ب", label: "B", minAvg: 30, maxAvg: 35.99, result: "موفق" },
  { grade: "ج", label: "C", minAvg: 24, maxAvg: 29.99, result: "موفق" },
  { grade: "د", label: "D", minAvg: 20, maxAvg: 23.99, result: "موفق" },
  { grade: "هـ", label: "E", minAvg: 0, maxAvg: 19.99, result: "تلاش بیشتر" },
];

export const GRADE_SCALE_ANNUAL = [
  { grade: "الف", label: "A", minTotal: 90, maxTotal: 100, result: "ارتقا صنف" },
  { grade: "ب", label: "B", minTotal: 75, maxTotal: 89.99, result: "ارتقا صنف" },
  { grade: "ج", label: "C", minTotal: 60, maxTotal: 74.99, result: "ارتقا صنف" },
  { grade: "د", label: "D", minTotal: 50, maxTotal: 59.99, result: "ارتقا صنف" },
];

// --- STUDENTS (شاگردان) ---
export const STUDENTS = [
  {
    id: 1, serialSort: 1, name: "احسان الله", fatherName: "امان الله",
    grandfatherName: "صالح محمد", studentId: 2145, idCardNumber: null,
    halfYearScores: { 1: 16, 2: 16, 3: 16, 4: 16, 5: null, 6: 30, 7: 16, 8: 16, 9: 24, 10: 17, 11: 36, 12: null, 13: 16, 14: 16, 15: null, 16: null, 17: 40, 18: null, 19: 40, 20: 40 },
    annualScores: { 1: 32, 2: 42, 3: 45, 4: 28, 5: null, 6: 46, 7: null, 8: 54, 9: 36, 10: 46, 11: 42, 12: null, 13: 36, 14: 24, 15: null, 16: null, 17: 60, 18: null, 19: 60, 20: 60 },
    subjectTotals: { 1: 48, 2: 58, 3: 61, 4: 44, 5: null, 6: 76, 7: null, 8: 70, 9: 60, 10: 63, 11: 78, 12: null, 13: 52, 14: 40, 15: null, 16: null, 17: 100, 18: null, 19: 100, 20: 100 },
    halfYearTotal: 355, annualTotal: 611, grandTotal: 950,
    halfAverage: 23.67, annualAverage: 43.64, grandAverage: 67.86,
    halfResult: "موفق", annualResult: "موفق", halfGrade: "د", annualGrade: "د",
    attendance: { schoolDays: 81, present: 67, absent: 14, sick: 0, leave: 0 }
  },
  {
    id: 2, serialSort: 2, name: "احمدالله", fatherName: "احمدشاه",
    grandfatherName: "اخترگل", studentId: 2070, idCardNumber: null,
    halfYearScores: { 1: 19, 2: 16, 3: 20, 4: 25, 5: null, 6: 40, 7: 30, 8: 16, 9: 24, 10: 27, 11: 32, 12: null, 13: 32, 14: 24, 15: null, 16: null, 17: 40, 18: null, 19: 40, 20: 40 },
    annualScores: { 1: 46, 2: 42, 3: 60, 4: 43, 5: null, 6: 60, 7: null, 8: 30, 9: 45, 10: 35, 11: 36, 12: null, 13: 48, 14: 36, 15: null, 16: null, 17: 60, 18: null, 19: 60, 20: 60 },
    subjectTotals: { 1: 65, 2: 58, 3: 80, 4: 68, 5: null, 6: 100, 7: null, 8: 46, 9: 69, 10: 62, 11: 68, 12: null, 13: 80, 14: 60, 15: null, 16: null, 17: 100, 18: null, 19: 100, 20: 100 },
    halfYearTotal: 425, annualTotal: 661, grandTotal: 1056,
    halfAverage: 28.33, annualAverage: 47.21, grandAverage: 75.43,
    halfResult: "موفق", annualResult: "موفق", halfGrade: "ج", annualGrade: "ج",
    attendance: { schoolDays: 81, present: 79, absent: 2, sick: 0, leave: 0 }
  },
  {
    id: 3, serialSort: 3, name: "اکبر", fatherName: "حلیم خان",
    grandfatherName: "حاجی حکیم خان", studentId: 2068, idCardNumber: null,
    halfYearScores: { 1: 16, 2: 20, 3: 16, 4: 16, 5: null, 6: 24, 7: 18, 8: 16, 9: 16, 10: 10, 11: 24, 12: null, 13: 18, 14: 20, 15: null, 16: null, 17: 28, 18: null, 19: 40, 20: 40 },
    annualScores: { 1: 32, 2: 36, 3: 60, 4: 28, 5: null, 6: 46, 7: null, 8: 30, 9: 36, 10: 48, 11: 30, 12: null, 13: 36, 14: 36, 15: null, 16: null, 17: 60, 18: null, 19: 60, 20: 60 },
    subjectTotals: { 1: 48, 2: 56, 3: 76, 4: 44, 5: null, 6: 70, 7: null, 8: 46, 9: 52, 10: 58, 11: 54, 12: null, 13: 54, 14: 56, 15: null, 16: null, 17: 88, 18: null, 19: 100, 20: 100 },
    halfYearTotal: 322, annualTotal: 598, grandTotal: 902,
    halfAverage: 21.47, annualAverage: 42.71, grandAverage: 64.43,
    halfResult: "تلاش بیشتر", annualResult: "تلاش بیشتر", halfGrade: "هـ", annualGrade: "هـ",
    attendance: { schoolDays: 81, present: 74, absent: 7, sick: 0, leave: 0 }
  },
  {
    id: 4, serialSort: 4, name: "محب الله", fatherName: "حاجی شریف",
    grandfatherName: "شایسته گل", studentId: 1555, idCardNumber: null,
    halfYearScores: { 1: 29, 2: 20, 3: 16, 4: 19, 5: null, 6: 24, 7: 24, 8: 24, 9: 20, 10: 28, 11: 32, 12: null, 13: 34, 14: 16, 15: null, 16: null, 17: 36, 18: null, 19: 40, 20: 40 },
    annualScores: { 1: 56, 2: 48, 3: 51, 4: 41, 5: null, 6: 37, 7: null, 8: 26, 9: 38, 10: 36, 11: 38, 12: null, 13: 42, 14: 41, 15: null, 16: null, 17: 60, 18: null, 19: 60, 20: 60 },
    subjectTotals: { 1: 85, 2: 68, 3: 67, 4: 60, 5: null, 6: 61, 7: null, 8: 50, 9: 58, 10: 64, 11: 70, 12: null, 13: 76, 14: 57, 15: null, 16: null, 17: 96, 18: null, 19: 100, 20: 100 },
    halfYearTotal: 402, annualTotal: 634, grandTotal: 1012,
    halfAverage: 26.8, annualAverage: 45.29, grandAverage: 72.29,
    halfResult: "موفق", annualResult: "موفق", halfGrade: "ج", annualGrade: "ج",
    attendance: { schoolDays: 81, present: 71, absent: 10, sick: 0, leave: 0 }
  },
  {
    id: 5, serialSort: 5, name: "محمدریحان", fatherName: "احمدعابد",
    grandfatherName: "سعادت خان", studentId: 1553, idCardNumber: null,
    halfYearScores: { 1: 24, 2: 40, 3: 16, 4: 32, 5: null, 6: 36, 7: 34, 8: 16, 9: 32, 10: 34, 11: 20, 12: null, 13: 20, 14: 16, 15: null, 16: null, 17: 40, 18: null, 19: 40, 20: 40 },
    annualScores: { 1: 56, 2: 60, 3: 54, 4: 49, 5: null, 6: 36, 7: null, 8: 56, 9: 47, 10: 60, 11: 36, 12: null, 13: 6, 14: 54, 15: null, 16: null, 17: 60, 18: null, 19: 60, 20: 60 },
    subjectTotals: { 1: 80, 2: 100, 3: 70, 4: 81, 5: null, 6: 72, 7: null, 8: 72, 9: 79, 10: 94, 11: 56, 12: null, 13: 26, 14: 70, 15: null, 16: null, 17: 100, 18: null, 19: 100, 20: 100 },
    halfYearTotal: 440, annualTotal: 694, grandTotal: 1100,
    halfAverage: 29.33, annualAverage: 49.57, grandAverage: 78.57,
    halfResult: "موفق", annualResult: "موفق", halfGrade: "ج", annualGrade: "ج",
    attendance: { schoolDays: 81, present: 77, absent: 4, sick: 0, leave: 0 }
  },
  {
    id: 6, serialSort: 6, name: "محمدزبیر", fatherName: "نیت ولی",
    grandfatherName: "حاجی اسلام گل", studentId: 1116, idCardNumber: null,
    halfYearScores: { 1: 40, 2: 40, 3: 29, 4: 40, 5: null, 6: 40, 7: 30, 8: 35, 9: 40, 10: 40, 11: 38, 12: null, 13: 40, 14: 32, 15: null, 16: null, 17: 40, 18: null, 19: 40, 20: 40 },
    annualScores: { 1: 60, 2: 60, 3: 60, 4: 56, 5: null, 6: 48, 7: null, 8: 60, 9: 60, 10: 60, 11: 48, 12: null, 13: 60, 14: 60, 15: null, 16: null, 17: 60, 18: null, 19: 60, 20: 60 },
    subjectTotals: { 1: 100, 2: 100, 3: 89, 4: 96, 5: null, 6: 88, 7: null, 8: 95, 9: 100, 10: 100, 11: 86, 12: null, 13: 100, 14: 92, 15: null, 16: null, 17: 100, 18: null, 19: 100, 20: 100 },
    halfYearTotal: 564, annualTotal: 812, grandTotal: 1346,
    halfAverage: 37.6, annualAverage: 58.0, grandAverage: 96.14,
    halfResult: "موفق", annualResult: "موفق", halfGrade: "الف", annualGrade: "الف",
    attendance: { schoolDays: 81, present: 80, absent: 1, sick: 0, leave: 0 }
  },
  {
    id: 7, serialSort: 7, name: "محمدسهراب", fatherName: "محمد نعیم",
    grandfatherName: "صالح محمد", studentId: 1987, idCardNumber: null,
    halfYearScores: { 1: 16, 2: 36, 3: 22, 4: 19, 5: null, 6: 30, 7: 28, 8: 22, 9: 20, 10: 36, 11: 24, 12: null, 13: 24, 14: 24, 15: null, 16: null, 17: 28, 18: null, 19: 40, 20: 40 },
    annualScores: { 1: 46, 2: 48, 3: 54, 4: 32, 5: null, 6: 42, 7: null, 8: 30, 9: 42, 10: 60, 11: 45, 12: null, 13: 42, 14: 46, 15: null, 16: null, 17: 60, 18: null, 19: 60, 20: 60 },
    subjectTotals: { 1: 62, 2: 84, 3: 76, 4: 51, 5: null, 6: 72, 7: null, 8: 52, 9: 62, 10: 96, 11: 69, 12: null, 13: 66, 14: 70, 15: null, 16: null, 17: 88, 18: null, 19: 100, 20: 100 },
    halfYearTotal: 409, annualTotal: 667, grandTotal: 1048,
    halfAverage: 27.27, annualAverage: 47.64, grandAverage: 74.86,
    halfResult: "موفق", annualResult: "موفق", halfGrade: "ج", annualGrade: "ج",
    attendance: { schoolDays: 81, present: 70, absent: 11, sick: 0, leave: 0 }
  },
  {
    id: 8, serialSort: 8, name: "محمدنسیم", fatherName: "مومن خان",
    grandfatherName: "عبدالمیر", studentId: 1976, idCardNumber: null,
    halfYearScores: { 1: 16, 2: 20, 3: 18, 4: 25, 5: null, 6: 24, 7: 18, 8: 16, 9: 16, 10: 21, 11: 24, 12: null, 13: 26, 14: 36, 15: null, 16: null, 17: 28, 18: null, 19: 40, 20: 40 },
    annualScores: { 1: 46, 2: 48, 3: 48, 4: 34, 5: null, 6: 60, 7: null, 8: 30, 9: 39, 10: 38, 11: 42, 12: null, 13: 36, 14: 36, 15: null, 16: null, 17: 60, 18: null, 19: 60, 20: 60 },
    subjectTotals: { 1: 62, 2: 68, 3: 66, 4: 59, 5: null, 6: 84, 7: null, 8: 46, 9: 55, 10: 59, 11: 66, 12: null, 13: 62, 14: 72, 15: null, 16: null, 17: 88, 18: null, 19: 100, 20: 100 },
    halfYearTotal: 368, annualTotal: 637, grandTotal: 987,
    halfAverage: 24.53, annualAverage: 45.5, grandAverage: 70.5,
    halfResult: "موفق", annualResult: "موفق", halfGrade: "ج", annualGrade: "ج",
    attendance: { schoolDays: 81, present: 58, absent: 23, sick: 0, leave: 0 }
  },
  {
    id: 9, serialSort: 9, name: "احمد مصطفی", fatherName: "زیارت گل",
    grandfatherName: "اکبرخان", studentId: 1742, idCardNumber: null,
    halfYearScores: { 1: 24, 2: 20, 3: 40, 4: 34, 5: null, 6: 40, 7: 40, 8: 40, 9: 24, 10: 37, 11: 36, 12: null, 13: 32, 14: 24, 15: null, 16: null, 17: 40, 18: null, 19: 40, 20: 40 },
    annualScores: { 1: 36, 2: 42, 3: 54, 4: 44, 5: null, 6: 46, 7: null, 8: 14, 9: 42, 10: 60, 11: 50, 12: null, 13: 54, 14: 48, 15: null, 16: null, 17: 60, 18: null, 19: 60, 20: 60 },
    subjectTotals: { 1: 60, 2: 62, 3: 94, 4: 78, 5: null, 6: 86, 7: null, 8: 54, 9: 66, 10: 97, 11: 86, 12: null, 13: 86, 14: 72, 15: null, 16: null, 17: 100, 18: null, 19: 100, 20: 100 },
    halfYearTotal: 511, annualTotal: 670, grandTotal: 1141,
    halfAverage: 34.07, annualAverage: 47.86, grandAverage: 81.5,
    halfResult: "موفق", annualResult: "موفق", halfGrade: "ب", annualGrade: "ب",
    attendance: { schoolDays: 81, present: 78, absent: 3, sick: 0, leave: 0 }
  },
  {
    id: 10, serialSort: 10, name: "مطیع الله", fatherName: "محمد رسول",
    grandfatherName: "شایسته گل", studentId: 1549, idCardNumber: null,
    halfYearScores: { 1: 34, 2: 24, 3: 32, 4: 32, 5: null, 6: 36, 7: 24, 8: 18, 9: 36, 10: 26, 11: 16, 12: null, 13: 32, 14: 24, 15: null, 16: null, 17: 40, 18: null, 19: 40, 20: 40 },
    annualScores: { 1: 56, 2: 48, 3: 54, 4: 38, 5: null, 6: 50, 7: null, 8: 42, 9: 45, 10: 43, 11: 36, 12: null, 13: 48, 14: 54, 15: null, 16: null, 17: 60, 18: null, 19: 60, 20: 60 },
    subjectTotals: { 1: 90, 2: 72, 3: 86, 4: 70, 5: null, 6: 86, 7: null, 8: 60, 9: 81, 10: 69, 11: 52, 12: null, 13: 80, 14: 78, 15: null, 16: null, 17: 100, 18: null, 19: 100, 20: 100 },
    halfYearTotal: 454, annualTotal: 694, grandTotal: 1124,
    halfAverage: 30.27, annualAverage: 49.57, grandAverage: 80.29,
    halfResult: "موفق", annualResult: "موفق", halfGrade: "ب", annualGrade: "ب",
    attendance: { schoolDays: 81, present: 62, absent: 19, sick: 0, leave: 0 }
  },
  {
    id: 11, serialSort: 11, name: "منیب الله", fatherName: "محب الله",
    grandfatherName: "عتیق الله", studentId: 1136, idCardNumber: null,
    halfYearScores: { 1: 40, 2: 36, 3: 18, 4: 36, 5: null, 6: 40, 7: 34, 8: 16, 9: 28, 10: 27, 11: 40, 12: null, 13: 30, 14: 32, 15: null, 16: null, 17: 40, 18: null, 19: 40, 20: 40 },
    annualScores: { 1: 60, 2: 48, 3: 60, 4: 29, 5: null, 6: 40, 7: null, 8: 45, 9: 45, 10: 51, 11: 36, 12: null, 13: 54, 14: 38, 15: null, 16: null, 17: 60, 18: null, 19: 60, 20: 60 },
    subjectTotals: { 1: 100, 2: 84, 3: 78, 4: 65, 5: null, 6: 80, 7: null, 8: 61, 9: 73, 10: 78, 11: 76, 12: null, 13: 84, 14: 70, 15: null, 16: null, 17: 100, 18: null, 19: 100, 20: 100 },
    halfYearTotal: 497, annualTotal: 686, grandTotal: 1149,
    halfAverage: 33.13, annualAverage: 49.0, grandAverage: 82.07,
    halfResult: "موفق", annualResult: "موفق", halfGrade: "ب", annualGrade: "ب",
    attendance: { schoolDays: 81, present: 79, absent: 2, sick: 0, leave: 0 }
  },
  {
    id: 12, serialSort: 12, name: "محمد یوسف", fatherName: "بلوچ",
    grandfatherName: "بست خان", studentId: 1405, idCardNumber: null,
    halfYearScores: { 1: 34, 2: 40, 3: 26, 4: 40, 5: null, 6: 40, 7: 40, 8: 24, 9: 40, 10: 37, 11: 28, 12: null, 13: 40, 14: 24, 15: null, 16: null, 17: 40, 18: null, 19: 40, 20: 40 },
    annualScores: { 1: 60, 2: 60, 3: 60, 4: 38, 5: null, 6: 60, 7: null, 8: 48, 9: 55, 10: 60, 11: 30, 12: null, 13: 60, 14: 60, 15: null, 16: null, 17: 60, 18: null, 19: 60, 20: 60 },
    subjectTotals: { 1: 94, 2: 100, 3: 86, 4: 78, 5: null, 6: 100, 7: null, 8: 72, 9: 95, 10: 97, 11: 58, 12: null, 13: 100, 14: 84, 15: null, 16: null, 17: 100, 18: null, 19: 100, 20: 100 },
    halfYearTotal: 533, annualTotal: 771, grandTotal: 1264,
    halfAverage: 35.53, annualAverage: 55.07, grandAverage: 90.29,
    halfResult: "موفق", annualResult: "موفق", halfGrade: "ب", annualGrade: "الف",
    attendance: { schoolDays: 81, present: 79, absent: 2, sick: 0, leave: 0 }
  },
  {
    id: 13, serialSort: 13, name: "محمد", fatherName: "صاحب گل",
    grandfatherName: "شجاع گل", studentId: 2064, idCardNumber: null,
    halfYearScores: { 1: 19, 2: 34, 3: 19, 4: 19, 5: null, 6: 38, 7: 18, 8: 23, 9: 16, 10: 29, 11: 20, 12: null, 13: 31, 14: 24, 15: null, 16: null, 17: 40, 18: null, 19: 40, 20: 40 },
    annualScores: { 1: 56, 2: 48, 3: 46, 4: null, 5: null, 6: 46, 7: null, 8: 30, 9: 36, 10: 44, 11: 30, 12: null, 13: 54, 14: 36, 15: null, 16: null, 17: 60, 18: null, 19: 60, 20: 60 },
    subjectTotals: { 1: 75, 2: 82, 3: 65, 4: null, 5: null, 6: 84, 7: null, 8: 53, 9: 52, 10: 73, 11: 50, 12: null, 13: 85, 14: 60, 15: null, 16: null, 17: 100, 18: null, 19: 100, 20: 100 },
    halfYearTotal: 410, annualTotal: 606, grandTotal: 979,
    halfAverage: 27.33, annualAverage: 46.62, grandAverage: 75.31,
    halfResult: "موفق", annualResult: "موفق", halfGrade: "ج", annualGrade: "ج",
    attendance: { schoolDays: 81, present: 73, absent: 8, sick: 0, leave: 0 }
  },
  {
    id: 14, serialSort: 14, name: "مصطفی", fatherName: "عبدالحکیم",
    grandfatherName: "محمدنعیم", studentId: 1892, idCardNumber: null,
    halfYearScores: { 1: 40, 2: 40, 3: 24, 4: 30, 5: null, 6: 40, 7: 40, 8: 22, 9: 40, 10: 36, 11: 40, 12: null, 13: 40, 14: 32, 15: null, 16: null, 17: 40, 18: null, 19: 40, 20: 40 },
    annualScores: { 1: 60, 2: 60, 3: 60, 4: 35, 5: null, 6: 40, 7: null, 8: 54, 9: 39, 10: 60, 11: 24, 12: null, 13: 60, 14: 60, 15: null, 16: null, 17: 60, 18: null, 19: 60, 20: 60 },
    subjectTotals: { 1: 100, 2: 100, 3: 84, 4: 65, 5: null, 6: 80, 7: null, 8: 76, 9: 79, 10: 96, 11: 64, 12: null, 13: 100, 14: 92, 15: null, 16: null, 17: 100, 18: null, 19: 100, 20: 100 },
    halfYearTotal: 544, annualTotal: 732, grandTotal: 1236,
    halfAverage: 36.27, annualAverage: 52.29, grandAverage: 88.29,
    halfResult: "موفق", annualResult: "موفق", halfGrade: "الف", annualGrade: "ب",
    attendance: { schoolDays: 81, present: 77, absent: 4, sick: 0, leave: 0 }
  },
  {
    id: 15, serialSort: 15, name: "احمد مصطفی", fatherName: "عطا محمد",
    grandfatherName: "ضیاء احمد", studentId: 1538, idCardNumber: null,
    halfYearScores: { 1: 39, 2: 36, 3: 35, 4: 40, 5: null, 6: 38, 7: 40, 8: 32, 9: 40, 10: 40, 11: 40, 12: null, 13: 40, 14: 36, 15: null, 16: null, 17: 40, 18: null, 19: 40, 20: 40 },
    annualScores: { 1: 60, 2: 48, 3: 60, 4: 42, 5: null, 6: 56, 7: null, 8: 60, 9: 60, 10: 60, 11: 54, 12: null, 13: 60, 14: 60, 15: null, 16: null, 17: 60, 18: null, 19: 60, 20: 60 },
    subjectTotals: { 1: 99, 2: 84, 3: 95, 4: 82, 5: null, 6: 94, 7: null, 8: 92, 9: 100, 10: 100, 11: 94, 12: null, 13: 100, 14: 96, 15: null, 16: null, 17: 100, 18: null, 19: 100, 20: 100 },
    halfYearTotal: 576, annualTotal: 800, grandTotal: 1336,
    halfAverage: 38.4, annualAverage: 57.14, grandAverage: 95.43,
    halfResult: "موفق", annualResult: "موفق", halfGrade: "الف", annualGrade: "الف",
    attendance: { schoolDays: 81, present: 74, absent: 7, sick: 0, leave: 0 }
  },
  {
    id: 16, serialSort: 16, name: "نوراحمد", fatherName: "ظفر خان",
    grandfatherName: "حاجی ظاهر", studentId: 1783, idCardNumber: null,
    halfYearScores: { 1: 22, 2: 32, 3: 26, 4: 21, 5: null, 6: 38, 7: 40, 8: 26, 9: 36, 10: 28, 11: 36, 12: null, 13: 26, 14: 24, 15: null, 16: null, 17: 40, 18: null, 19: 40, 20: 40 },
    annualScores: { 1: 56, 2: 60, 3: 40, 4: 53, 5: null, 6: 48, 7: null, 8: 48, 9: 42, 10: 42, 11: 42, 12: null, 13: 46, 14: 53, 15: null, 16: null, 17: 60, 18: null, 19: 60, 20: 60 },
    subjectTotals: { 1: 78, 2: 92, 3: 66, 4: 74, 5: null, 6: 86, 7: null, 8: 74, 9: 78, 10: 70, 11: 78, 12: null, 13: 72, 14: 77, 15: null, 16: null, 17: 100, 18: null, 19: 100, 20: 100 },
    halfYearTotal: 475, annualTotal: 710, grandTotal: 1056,
    halfAverage: 31.67, annualAverage: 50.71, grandAverage: 75.43,
    halfResult: "موفق", annualResult: "موفق", halfGrade: "ب", annualGrade: "ب",
    attendance: { schoolDays: 81, present: 78, absent: 3, sick: 0, leave: 0 }
  },
  {
    id: 17, serialSort: 17, name: "نوید", fatherName: "محمدرحیم",
    grandfatherName: "گل افغان", studentId: 1935, idCardNumber: null,
    halfYearScores: { 1: 23, 2: 28, 3: 29, 4: 40, 5: null, 6: 40, 7: 40, 8: 20, 9: 28, 10: 32, 11: 28, 12: null, 13: 32, 14: 28, 15: null, 16: null, 17: 40, 18: null, 19: 40, 20: 40 },
    annualScores: { 1: 56, 2: 48, 3: 48, 4: 28, 5: null, 6: 50, 7: null, 8: 51, 9: 60, 10: 52, 11: 32, 12: null, 13: 58, 14: 58, 15: null, 16: null, 17: 60, 18: null, 19: 60, 20: 60 },
    subjectTotals: { 1: 79, 2: 76, 3: 77, 4: 68, 5: null, 6: 90, 7: null, 8: 71, 9: 88, 10: 84, 11: 60, 12: null, 13: 90, 14: 86, 15: null, 16: null, 17: 100, 18: null, 19: 100, 20: 100 },
    halfYearTotal: 488, annualTotal: null, grandTotal: null,
    halfAverage: 32.53, annualAverage: null, grandAverage: null,
    halfResult: "موفق", annualResult: "موفق", halfGrade: "ب", annualGrade: "ب",
    attendance: { schoolDays: 81, present: 77, absent: 4, sick: 0, leave: 0 }
  },
  {
    id: 18, serialSort: 18, name: "نورالله", fatherName: "محمدالله",
    grandfatherName: "عبدالقهار", studentId: 1393, idCardNumber: null,
    halfYearScores: { 1: 29, 2: 24, 3: 20, 4: 28, 5: null, 6: 20, 7: 40, 8: 16, 9: 24, 10: 34, 11: 28, 12: null, 13: 26, 14: 24, 15: null, 16: null, 17: 32, 18: null, 19: 40, 20: 40 },
    annualScores: { 1: 56, 2: 60, 3: 60, 4: null, 5: null, 6: 44, 7: null, 8: 37, 9: 36, 10: 34, 11: null, 12: null, 13: 36, 14: 42, 15: null, 16: null, 17: 60, 18: null, 19: 60, 20: 60 },
    subjectTotals: { 1: 85, 2: 84, 3: 80, 4: null, 5: null, 6: 64, 7: null, 8: 53, 9: 60, 10: 68, 11: null, 12: null, 13: 62, 14: 66, 15: null, 16: null, 17: 92, 18: null, 19: 100, 20: 100 },
    halfYearTotal: 425, annualTotal: null, grandTotal: null,
    halfAverage: 28.33, annualAverage: null, grandAverage: null,
    halfResult: "موفق", annualResult: "موفق", halfGrade: "ج", annualGrade: "ج",
    attendance: { schoolDays: 81, present: 68, absent: 13, sick: 0, leave: 0 }
  },
  {
    id: 19, serialSort: 19, name: "وحید", fatherName: "ولی خان",
    grandfatherName: "اکبر خان", studentId: 1795, idCardNumber: null,
    halfYearScores: { 1: 24, 2: 24, 3: 16, 4: 34, 5: null, 6: 34, 7: 34, 8: 18, 9: 32, 10: 27, 11: 32, 12: null, 13: 24, 14: 20, 15: null, 16: null, 17: 40, 18: null, 19: 40, 20: 40 },
    annualScores: { 1: 36, 2: 42, 3: 46, 4: 50, 5: null, 6: 60, 7: null, 8: 48, 9: 42, 10: 50, 11: 30, 12: null, 13: 54, 14: 42, 15: null, 16: null, 17: 60, 18: null, 19: 60, 20: 60 },
    subjectTotals: { 1: 60, 2: 66, 3: 62, 4: 84, 5: null, 6: 94, 7: null, 8: 66, 9: 74, 10: 77, 11: 62, 12: null, 13: 78, 14: 62, 15: null, 16: null, 17: 100, 18: null, 19: 100, 20: 100 },
    halfYearTotal: 439, annualTotal: null, grandTotal: null,
    halfAverage: 29.27, annualAverage: null, grandAverage: null,
    halfResult: "موفق", annualResult: "موفق", halfGrade: "ج", annualGrade: "ج",
    attendance: { schoolDays: 81, present: 80, absent: 1, sick: 0, leave: 0 }
  },
  {
    id: 20, serialSort: 20, name: "هدایت الله", fatherName: "نیازمحمد",
    grandfatherName: "پاد شاه میر", studentId: 2069, idCardNumber: null,
    halfYearScores: { 1: 40, 2: 40, 3: 28, 4: 35, 5: null, 6: 40, 7: 40, 8: 34, 9: 38, 10: 40, 11: 34, 12: null, 13: 40, 14: 28, 15: null, 16: null, 17: 40, 18: null, 19: 40, 20: 40 },
    annualScores: { 1: 59, 2: 60, 3: 60, 4: 49, 5: null, 6: 36, 7: null, 8: 58, 9: 60, 10: 60, 11: 45, 12: null, 13: 60, 14: 60, 15: null, 16: null, 17: 60, 18: null, 19: 60, 20: 60 },
    subjectTotals: { 1: 99, 2: 100, 3: 88, 4: 84, 5: null, 6: 76, 7: null, 8: 92, 9: 98, 10: 100, 11: 79, 12: null, 13: 100, 14: 88, 15: null, 16: null, 17: 100, 18: null, 19: 100, 20: 100 },
    halfYearTotal: 557, annualTotal: null, grandTotal: null,
    halfAverage: 37.13, annualAverage: null, grandAverage: null,
    halfResult: "موفق", annualResult: "موفق", halfGrade: "الف", annualGrade: "الف",
    attendance: { schoolDays: 81, present: 76, absent: 5, sick: 0, leave: 0 }
  },
  // Absent students (21-32)
  ...[21,22,23,24,25,26,27,28,29,30,31,32].map(i => ({
    id: i, serialSort: i,
    halfYearScores: {}, annualScores: {}, subjectTotals: {},
    halfYearTotal: 0, annualTotal: 0, grandTotal: 0,
    halfAverage: 0, annualAverage: 0, grandAverage: 0,
    halfResult: "غایب", annualResult: "غایب", halfGrade: "", annualGrade: "",
    attendance: { schoolDays: 81, present: 0, absent: 81, sick: 0, leave: 0 }
  }))
];

// Add names for absent studentsSTUDENTS[20].name = "الیاس الدین"; STUDENTS[20].fatherName = "حیات الدین"; STUDENTS[20].studentId = 1504;
STUDENTS[21].name = "ذبیح الله"; STUDENTS[21].fatherName = "صاحب جان"; STUDENTS[21].studentId = 1886;
STUDENTS[22].name = "رحیم الله"; STUDENTS[22].fatherName = "حبیب الله"; STUDENTS[22].studentId = 1058;
STUDENTS[23].name = "شریف الله"; STUDENTS[23].fatherName = "محمداسماعیل"; STUDENTS[23].studentId = 2066;
STUDENTS[24].name = "عبدالله"; STUDENTS[24].fatherName = "محمد عالم"; STUDENTS[24].studentId = 2067;
STUDENTS[25].name = "عمران"; STUDENTS[25].fatherName = "تراب"; STUDENTS[25].studentId = 1569;
STUDENTS[26].name = "وحیدالله"; STUDENTS[26].fatherName = "شیرپادشاه"; STUDENTS[26].studentId = 1569;
STUDENTS[27].name = "یوسف"; STUDENTS[27].fatherName = "همیشه گل"; STUDENTS[27].studentId = 1888;
STUDENTS[28].name = "مقیم احمد"; STUDENTS[28].fatherName = "نذیراحمد"; STUDENTS[28].studentId = 1884;
STUDENTS[29].name = "نورالله"; STUDENTS[29].fatherName = "گل احمد"; STUDENTS[29].studentId = 1592;
STUDENTS[30].name = "نصیب الله"; STUDENTS[30].fatherName = "محمدسلیم"; STUDENTS[30].studentId = 1583;
STUDENTS[31].name = "عطاءالله"; STUDENTS[31].fatherName = "حبیب الله"; STUDENTS[31].studentId = 1700;

// --- CLASS SUMMARY ---
export const CLASS_SUMMARY = {
  halfYear: {
    totalEnrolled: 32,
    tookExam: 20,
    passed: 19,
    needsWork: 1,
    excused: 0,
    absent: 12,
  },
  annual: {
    totalEnrolled: 12,
    tookExam: 12,
    promoted: 0,
    repeated: 12,
    conditional: 0,
    excused: 0,
    deprived: 0,
  },
};

// --- HELPER FUNCTIONS ---
export function getStudentById(id) {
  return STUDENTS.find(s => s.id === id) || null;
}

export function getActiveStudents() {
  return STUDENTS.filter(s => s.halfResult !== "غایب");
}

export function getStudentsByResult(result) {
  return STUDENTS.filter(s => s.halfResult === result);
}

export function getStudentsByGrade(grade) {
  return STUDENTS.filter(s => s.halfGrade === grade);
}

export function getSubjectAverage(subjectId) {
  const scores = getActiveStudents()
    .map(s => s.halfYearScores[subjectId])
    .filter(v => v !== null && v !== undefined);
  if (!scores.length) return 0;
  return scores.reduce((a, b) => a + b, 0) / scores.length;
}

export function getAttendancePercent(student) {
  const { present, schoolDays } = student.attendance;
  return schoolDays > 0 ? ((present / schoolDays) * 100).toFixed(1) : "0.0";
}

export function getRankedStudents() {
  return getActiveStudents()
    .filter(s => s.grandAverage > 0)
    .sort((a, b) => b.grandAverage - a.grandAverage);
}
