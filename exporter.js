// exporter.js - Export data to Excel

export class DataExporter {
  exportToExcel(students, schoolInfo, subjects) {
    const workbook = this.createWorkbook(students, schoolInfo, subjects);
    this.downloadWorkbook(workbook, `school_data_${schoolInfo.academicYearShamsi}.xlsx`);
  }
  
  exportProcessedSheets(sheets) {
    const data = sheets.map((sheet, index) => ({
      'شماره': index + 1,
      'فایل': sheet.fileName,
      'شاگرد': sheet.studentName,
      'آی دی': sheet.studentId,
      'نوع شقه': sheet.scoreType === 'halfYear' ? 'چهارونی' : 'سالانه',
      'دقت': sheet.aiConfidence,
      'نمرات': JSON.stringify(sheet.scores)
    }));
    
    const csv = this.convertToCSV(data);
    this.downloadCSV(csv, 'processed_sheets.csv');
  }
  
  createWorkbook(students, schoolInfo, subjects) {
    // Create workbook data structure
    const workbook = {
      sheets: [
        {
          name: 'School Info',
          data: [
            ['School', schoolInfo.school],
            ['Class', schoolInfo.className],
            ['Year', schoolInfo.academicYearShamsi],
            ['Supervisor', schoolInfo.supervisor],
            ['Head Teacher', schoolInfo.headTeacher]
          ]
        },
        {
          name: 'Students',
          data: this.createStudentsSheet(students, subjects)
        }
      ]
    };
    
    return workbook;
  }
  
  createStudentsSheet(students, subjects) {
    const headers = [
      'ID', 'Serial', 'Name', 'Father Name', 'Student ID',
      ...subjects.map(s => s.name),
      'Half Total', 'Annual Total', 'Grand Total',
      'Half Average', 'Annual Average', 'Grand Average',
      'Half Grade', 'Annual Grade', 'Result'
    ];
    
    const rows = students.map(student => [
      student.id,
      student.serialSort,
      student.name,
      student.fatherName,
      student.studentId,
      ...subjects.map(s => student.subjectTotals[s.id] || ''),
      student.halfYearTotal,
      student.annualTotal,
      student.grandTotal,
      student.halfAverage,
      student.annualAverage,
      student.grandAverage,
      student.halfGrade,
      student.annualGrade,
      student.annualResult
    ]);
    
    return [headers, ...rows];
  }
  
  convertToCSV(data) {
    if (data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const csvRows = [headers.join(',')];
    
    data.forEach(row => {
      const values = headers.map(header => {
        const value = row[header];
        return typeof value === 'string' ? `"${value}"` : value;
      });
      csvRows.push(values.join(','));
    });
    
    return csvRows.join('\n');
  }
  
  downloadCSV(csv, filename) {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }
  
  downloadWorkbook(workbook, filename) {
    // For Excel export, you'd typically use a library like xlsx
    // This is a simplified CSV export for demonstration
    const allData = [];
    
    workbook.sheets.forEach(sheet => {
      allData.push([`=== ${sheet.name} ===`]);
      sheet.data.forEach(row => {
        allData.push(row);
      });
      allData.push([]);
    });
    
    const csv = allData.map(row => row.join(',')).join('\n');
    this.downloadCSV(csv, filename.replace('.xlsx', '.csv'));
  }
}
