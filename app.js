// app.js - Main Application
import { 
  STUDENTS, SCHOOL_INFO, SUBJECTS, GRADE_SCALE_HALF, 
  GRADE_SCALE_ANNUAL, getStudentsByGrade, getStudentById 
} from './database.js';
import { AIImageProcessor } from './ai-processor.js';
import { SheetEditor } from './sheet-editor.js';
import { DataExporter } from './exporter.js';

class SchoolCertificateManager {
  constructor() {
    this.processedSheets = [];
    this.currentEditingSheet = null;
    this.currentStudentIndex = null;
    this.undoStack = [];
    this.initialize();
  }

  initialize() {
    this.renderApp();
    this.attachEventListeners();
    this.loadExistingData();
  }

  renderApp() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="app-wrapper">
        <!-- Top Navigation -->
        <nav class="top-nav">
          <div class="nav-brand">
            <h1>📚 نظام مدیریت شقق صنف هفتم</h1>
            <span class="school-name">${SCHOOL_INFO.school} | ${SCHOOL_INFO.className} | سال ${SCHOOL_INFO.academicYearShamsi}</span>
          </div>
          <div class="nav-actions">
            <button class="nav-btn" id="dashboardBtn">📊 داشبورد</button>
            <button class="nav-btn active" id="sheetsBtn">📄 شقق</button>
            <button class="nav-btn" id="studentsBtn">👨‍🎓 شاگردان</button>
            <button class="nav-btn" id="exportBtn">📥 Export</button>
          </div>
        </nav>

        <!-- Main Dashboard -->
        <div class="dashboard" id="dashboard">
          <div class="stats-grid">
            <div class="stat-card">
              <span class="stat-icon">👨‍🎓</span>
              <span class="stat-value">${STUDENTS.length}</span>
              <span class="stat-label">مجموع شاگردان</span>
            </div>
            <div class="stat-card">
              <span class="stat-icon">✅</span>
              <span class="stat-value">${STUDENTS.filter(s => s.halfResult === 'موفق').length}</span>
              <span class="stat-label">موفق</span>
            </div>
            <div class="stat-card">
              <span class="stat-icon">⭐</span>
              <span class="stat-value">${getStudentsByGrade('الف').length}</span>
              <span class="stat-label">درجه الف</span>
            </div>
            <div class="stat-card">
              <span class="stat-icon">❌</span>
              <span class="stat-value">${STUDENTS.filter(s => s.halfResult === 'غایب').length}</span>
              <span class="stat-label">غایب</span>
            </div>
          </div>
          <div class="top-performers">
            <h3>🏆 شاگردان ممتاز</h3>
            <div id="topStudents"></div>
          </div>
        </div>

        <!-- Sheets Management -->
        <div class="sheets-manager" id="sheetsManager">
          <!-- Upload Area -->
          <div class="upload-section">
            <div class="upload-zone" id="uploadZone">
              <div class="upload-content">
                <span class="upload-icon">📸</span>
                <h3>عکس شقه را اینجا بکشید یا کلیک کنید</h3>
                <p>از شقه های چهارونی و سالانه عکس گرفته و اپلود کنید</p>
                <div class="upload-buttons">
                  <button class="btn btn-primary" id="selectPhotosBtn">
                    📁 انتخاب عکس
                  </button>
                  <button class="btn btn-secondary" id="cameraCaptureBtn">
                    📷 دوربین
                  </button>
                </div>
                <input type="file" id="photoInput" accept="image/*" multiple hidden>
              </div>
            </div>
            
            <!-- Camera View -->
            <div class="camera-view" id="cameraView" style="display:none;">
              <video id="cameraStream" autoplay playsinline></video>
              <div class="camera-controls">
                <button class="btn btn-primary" id="captureBtn">📸 عکس بگیر</button>
                <button class="btn btn-secondary" id="closeCameraBtn">✖ بستن</button>
              </div>
              <canvas id="photoCanvas" hidden></canvas>
            </div>
          </div>

          <!-- Processing Status -->
          <div class="processing-status" id="processingStatus" style="display:none;">
            <div class="progress-container">
              <div class="progress-bar">
                <div class="progress-fill" id="progressFill"></div>
              </div>
              <div class="progress-text" id="progressText">در حال پردازش...</div>
            </div>
          </div>

          <!-- Results Table -->
          <div class="results-section" id="resultsSection" style="display:none;">
            <div class="results-header">
              <h2>📋 شقه های پردازش شده</h2>
              <div class="results-actions">
                <button class="btn btn-success" id="saveAllSheetsBtn">💾 ذخیره همه</button>
                <button class="btn btn-info" id="exportResultsBtn">📊 اکسپورت</button>
              </div>
            </div>
            <div class="sheets-list" id="sheetsList"></div>
          </div>
        </div>

        <!-- Sheet Editor Modal -->
        <div class="modal-overlay" id="editorModal" style="display:none;">
          <div class="modal-container modal-large">
            <div class="modal-header">
              <h3>✏️ ویرایش شقه</h3>
              <div class="modal-controls">
                <button class="btn btn-sm" id="undoBtn" disabled>↩ واگرد</button>
                <button class="btn btn-sm btn-danger" id="closeModalBtn">✖</button>
              </div>
            </div>
            <div class="modal-body" id="editorBody"></div>
            <div class="modal-footer">
              <button class="btn btn-secondary" id="cancelEditBtn">انصراف</button>
              <button class="btn btn-primary" id="saveEditBtn">💾 ذخیره تغییرات</button>
            </div>
          </div>
        </div>

        <!-- Students List -->
        <div class="students-view" id="studentsView" style="display:none;">
          <div class="students-header">
            <h2>👨‍🎓 لیست شاگردان صنف هفتم</h2>
            <div class="search-box">
              <input type="text" id="studentSearch" placeholder="جستجوی شاگرد...">
            </div>
            <div class="filter-buttons">
              <button class="filter-btn active" data-filter="all">همه</button>
              <button class="filter-btn" data-filter="الف">درجه الف</button>
              <button class="filter-btn" data-filter="ب">درجه ب</button>
              <button class="filter-btn" data-filter="غایب">غایب</button>
            </div>
          </div>
          <div class="students-table" id="studentsTable"></div>
        </div>
      </div>
    `;
  }

  attachEventListeners() {
    // Navigation
    document.getElementById('dashboardBtn').addEventListener('click', () => this.showView('dashboard'));
    document.getElementById('sheetsBtn').addEventListener('click', () => this.showView('sheets'));
    document.getElementById('studentsBtn').addEventListener('click', () => this.showView('students'));
    document.getElementById('exportBtn').addEventListener('click', () => this.exportAllData());

    // Upload handlers
    const uploadZone = document.getElementById('uploadZone');
    const photoInput = document.getElementById('photoInput');

    document.getElementById('selectPhotosBtn').addEventListener('click', () => {
      photoInput.click();
    });

    uploadZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadZone.classList.add('drag-active');
    });

    uploadZone.addEventListener('dragleave', () => {
      uploadZone.classList.remove('drag-active');
    });

    uploadZone.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadZone.classList.remove('drag-active');
      const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
      if (files.length) this.processImages(files);
    });

    photoInput.addEventListener('change', (e) => {
      if (e.target.files.length) {
        this.processImages(Array.from(e.target.files));
      }
    });

    // Camera controls
    document.getElementById('cameraCaptureBtn').addEventListener('click', () => this.startCamera());
    document.getElementById('captureBtn').addEventListener('click', () => this.capturePhoto());
    document.getElementById('closeCameraBtn').addEventListener('click', () => this.closeCamera());

    // Editor modal
    document.getElementById('cancelEditBtn').addEventListener('click', () => this.closeEditor());
    document.getElementById('closeModalBtn').addEventListener('click', () => this.closeEditor());
    document.getElementById('saveEditBtn').addEventListener('click', () => this.saveSheetEdits());
    document.getElementById('undoBtn').addEventListener('click', () => this.undoEdit());

    // Bulk actions
    document.getElementById('saveAllSheetsBtn').addEventListener('click', () => this.saveAllSheets());
    document.getElementById('exportResultsBtn').addEventListener('click', () => this.exportProcessedData());

    // Student search and filter
    document.getElementById('studentSearch').addEventListener('input', (e) => this.filterStudents(e.target.value));
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.filterStudentsByGrade(e.target.dataset.filter));
    });
  }

  showView(view) {
    const views = ['dashboard', 'sheetsManager', 'studentsView'];
    views.forEach(v => {
      document.getElementById(v === 'dashboard' ? v : v === 'sheetsManager' ? v : v).style.display = 
        (v === view || (view === 'dashboard' && v === 'dashboard') || 
         (view === 'sheets' && v === 'sheetsManager') || 
         (view === 'students' && v === 'studentsView')) ? 'block' : 'none';
    });

    // Update nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`${view}Btn`).classList.add('active');

    if (view === 'students') this.renderStudentsTable();
    if (view === 'dashboard') this.renderDashboard();
  }

  async processImages(files) {
    this.showProcessing();
    this.processedSheets = [];

    for (let i = 0; i < files.length; i++) {
      this.updateProgress(((i + 1) / files.length) * 100, `پردازش عکس ${i + 1} از ${files.length}...`);
      
      try {
        const result = await AIImageProcessor.processSheetImage(files[i]);
        
        if (result.success) {
          this.processedSheets.push({
            id: Date.now() + i,
            fileName: files[i].name,
            studentName: result.data.studentName || '',
            studentId: result.data.studentId || '',
            scoreType: result.data.scoreType || 'unknown', // 'halfYear' or 'annual'
            scores: result.data.scores || {},
            aiConfidence: result.confidence || 0,
            needsReview: result.confidence < 0.8,
            timestamp: new Date().toISOString()
          });
        }
      } catch (error) {
        console.error(`Error processing ${files[i].name}:`, error);
        this.processedSheets.push({
          id: Date.now() + i,
          fileName: files[i].name,
          error: error.message,
          timestamp: new Date().toISOString()
        });
      }
    }

    this.hideProcessing();
    this.showResults();
  }

  showProcessing() {
    document.getElementById('processingStatus').style.display = 'block';
    document.getElementById('resultsSection').style.display = 'none';
  }

  hideProcessing() {
    document.getElementById('processingStatus').style.display = 'none';
  }

  updateProgress(percent, text) {
    document.getElementById('progressFill').style.width = `${percent}%`;
    document.getElementById('progressText').textContent = text;
  }

  showResults() {
    const resultsSection = document.getElementById('resultsSection');
    const sheetsList = document.getElementById('sheetsList');
    
    resultsSection.style.display = 'block';
    
    sheetsList.innerHTML = this.processedSheets.map((sheet, index) => `
      <div class="sheet-card ${sheet.needsReview ? 'needs-review' : ''} ${sheet.error ? 'has-error' : ''}">
        <div class="sheet-header">
          <span class="sheet-number">#${index + 1}</span>
          <span class="sheet-file">${sheet.fileName}</span>
          ${sheet.error ? 
            '<span class="badge badge-danger">خطا</span>' : 
            sheet.needsReview ? 
              '<span class="badge badge-warning">نیاز به بازبینی</span>' : 
              '<span class="badge badge-success">تایید شده</span>'
          }
        </div>
        
        ${sheet.error ? `
          <div class="sheet-error">
            <p>❌ ${sheet.error}</p>
          </div>
        ` : `
          <div class="sheet-content">
            <div class="student-info">
              <strong>شاگرد:</strong> ${sheet.studentName || 'نامشخص'}
              <br>
              <strong>آی دی:</strong> ${sheet.studentId || 'نامشخص'}
              <br>
              <strong>نوع شقه:</strong> ${sheet.scoreType === 'halfYear' ? 'چهارونی' : 'سالانه'}
              <br>
              <strong>دقت AI:</strong> ${(sheet.aiConfidence * 100).toFixed(1)}%
            </div>
            
            <div class="scores-preview">
              <strong>نمرات:</strong>
              <div class="scores-grid">
                ${Object.entries(sheet.scores).slice(0, 5).map(([subj, score]) => {
                  const subject = SUBJECTS.find(s => s.id === parseInt(subj));
                  return `<span class="score-item">${subject?.name || subj}: ${score}</span>`;
                }).join('')}
                ${Object.keys(sheet.scores).length > 5 ? `<span class="more-scores">+${Object.keys(sheet.scores).length - 5} بیشتر</span>` : ''}
              </div>
            </div>
          </div>
        `}
        
        <div class="sheet-actions">
          <button class="btn btn-sm btn-info" onclick="app.editSheet(${index})">✏️ ویرایش</button>
          <button class="btn btn-sm btn-success" onclick="app.saveSheet(${index})">💾 ذخیره</button>
          <button class="btn btn-sm btn-danger" onclick="app.removeSheet(${index})">🗑 حذف</button>
        </div>
      </div>
    `).join('');
  }

  editSheet(index) {
    const sheet = this.processedSheets[index];
    if (!sheet || sheet.error) return;

    this.currentEditingSheet = index;
    const editorBody = document.getElementById('editorBody');
    
    // Find matching student from database
    const matchedStudent = this.findMatchingStudent(sheet.studentName, sheet.studentId);
    
    editorBody.innerHTML = `
      <div class="editor-form">
        <div class="form-section">
          <h4>اطلاعات شاگرد</h4>
          <div class="form-grid">
            <div class="form-group">
              <label>نام شاگرد</label>
              <input type="text" value="${sheet.studentName}" id="editStudentName" 
                     list="studentSuggestions" autocomplete="off">
              <datalist id="studentSuggestions">
                ${STUDENTS.map(s => `<option value="${s.name}">${s.name} - ${s.fatherName} - ID: ${s.studentId}</option>`).join('')}
              </datalist>
            </div>
            <div class="form-group">
              <label>آی دی شاگرد</label>
              <input type="text" value="${sheet.studentId}" id="editStudentId">
            </div>
            <div class="form-group">
              <label>نوع شقه</label>
              <select id="editScoreType">
                <option value="halfYear" ${sheet.scoreType === 'halfYear' ? 'selected' : ''}>چهارونی ماه (نمرات از ۴۰)</option>
                <option value="annual" ${sheet.scoreType === 'annual' ? 'selected' : ''}>سالانه (نمرات از ۶۰)</option>
              </select>
            </div>
            <div class="form-group">
              <label>دقت تشخیص</label>
              <input type="range" min="0" max="1" step="0.05" value="${sheet.aiConfidence}" id="editConfidence">
              <span id="confidenceValue">${(sheet.aiConfidence * 100).toFixed(0)}%</span>
            </div>
          </div>
        </div>
        
        <div class="form-section">
          <h4>نمرات دروس</h4>
          <div class="subjects-grid">
            ${SUBJECTS.filter(s => s.id <= 20).map(subject => `
              <div class="subject-entry">
                <label>${subject.name}</label>
                <input type="number" 
                       min="0" 
                       max="${sheet.scoreType === 'halfYear' ? subject.maxHalf : subject.maxAnnual}" 
                       value="${sheet.scores[subject.id] || ''}" 
                       data-subject="${subject.id}"
                       class="score-input"
                       placeholder="-">
              </div>
            `).join('')}
          </div>
        </div>
        
        ${matchedStudent ? `
          <div class="matched-student">
            <h4>✅ شاگرد مشابه در دیتابیس</h4>
            <p>${matchedStudent.name} - ${matchedStudent.fatherName}</p>
            <p>ID: ${matchedStudent.studentId} | Serial: ${matchedStudent.serialSort}</p>
            <button class="btn btn-sm btn-success" onclick="app.autofillFromDatabase(${matchedStudent.id})">
              📋 پر کردن از دیتابیس
            </button>
          </div>
        ` : ''}
      </div>
    `;

    document.getElementById('editorModal').style.display = 'flex';
    
    // Add input listeners for confidence slider
    document.getElementById('editConfidence').addEventListener('input', (e) => {
      document.getElementById('confidenceValue').textContent = `${(e.target.value * 100).toFixed(0)}%`;
    });
  }

  findMatchingStudent(name, id) {
    if (!name && !id) return null;
    
    return STUDENTS.find(s => {
      const nameMatch = name && s.name.includes(name);
      const idMatch = id && s.studentId.toString() === id.toString();
      return nameMatch || idMatch;
    });
  }

  autofillFromDatabase(studentId) {
    const student = STUDENTS.find(s => s.id === studentId);
    if (!student) return;

    // Auto-fill form fields
    document.getElementById('editStudentName').value = student.name;
    document.getElementById('editStudentId').value = student.studentId;

    // Fill scores based on selected type
    const scoreType = document.getElementById('editScoreType').value;
    const scores = scoreType === 'halfYear' ? student.halfYearScores : student.annualScores;
    
    Object.entries(scores).forEach(([subjectId, score]) => {
      const input = document.querySelector(`.score-input[data-subject="${subjectId}"]`);
      if (input) {
        input.value = score !== null && score !== undefined ? score : '';
      }
    });
  }

  saveSheetEdits() {
    if (this.currentEditingSheet === null) return;
    
    const sheet = this.processedSheets[this.currentEditingSheet];
    
    // Save current state for undo
    this.undoStack.push({...sheet});
    
    // Update sheet data
    sheet.studentName = document.getElementById('editStudentName').value;
    sheet.studentId = document.getElementById('editStudentId').value;
    sheet.scoreType = document.getElementById('editScoreType').value;
    sheet.aiConfidence = parseFloat(document.getElementById('editConfidence').value);
    
    // Collect scores
    const scoreInputs = document.querySelectorAll('.score-input');
    scoreInputs.forEach(input => {
      const subjectId = input.dataset.subject;
      const value = input.value.trim();
      sheet.scores[subjectId] = value !== '' ? parseInt(value) : null;
    });
    
    sheet.needsReview = sheet.aiConfidence < 0.8;
    sheet.lastEdited = new Date().toISOString();
    
    this.closeEditor();
    this.showResults();
  }

  undoEdit() {
    if (this.undoStack.length === 0) return;
    
    const previousState = this.undoStack.pop();
    this.processedSheets[this.currentEditingSheet] = previousState;
    
    // Re-render editor with previous state
    this.editSheet(this.currentEditingSheet);
    
    document.getElementById('undoBtn').disabled = this.undoStack.length === 0;
  }

  closeEditor() {
    document.getElementById('editorModal').style.display = 'none';
    this.currentEditingSheet = null;
  }

  async saveSheet(index) {
    const sheet = this.processedSheets[index];
    if (!sheet || sheet.error) return;

    try {
      // Find or update student in database
      let student = this.findMatchingStudent(sheet.studentName, sheet.studentId);
      
      if (student) {
        // Update existing student
        const scoreField = sheet.scoreType === 'halfYear' ? 'halfYearScores' : 'annualScores';
        student[scoreField] = {...student[scoreField], ...sheet.scores};
        
        // Recalculate totals
        student = this.recalculateStudentScores(student);
      } else {
        // Create new student entry
        student = this.createNewStudentFromSheet(sheet);
        STUDENTS.push(student);
      }
      
      this.showNotification('success', `شقه "${sheet.fileName}" با موفقیت ذخیره شد`);
      
      // Remove from processed list
      this.processedSheets.splice(index, 1);
      this.showResults();
      
    } catch (error) {
      this.showNotification('error', `خطا در ذخیره: ${error.message}`);
    }
  }

  recalculateStudentScores(student) {
    // Calculate half-year totals
    const halfScores = Object.values(student.halfYearScores).filter(v => v !== null && v !== undefined);
    student.halfYearTotal = halfScores.reduce((a, b) => a + b, 0);
    student.halfAverage = halfScores.length > 0 ? student.halfYearTotal / halfScores.length : 0;
    
    // Calculate annual totals
    const annualScores = Object.values(student.annualScores).filter(v => v !== null && v !== undefined);
    student.annualTotal = annualScores.reduce((a, b) => a + b, 0);
    student.annualAverage = annualScores.length > 0 ? student.annualTotal / annualScores.length : 0;
    
    // Calculate subject totals
    student.subjectTotals = {};
    SUBJECTS.forEach(subject => {
      const half = student.halfYearScores[subject.id];
      const annual = student.annualScores[subject.id];
      student.subjectTotals[subject.id] = (half || 0) + (annual || 0);
    });
    
    // Calculate grand totals
    const totals = Object.values(student.subjectTotals).filter(v => v !== null);
    student.grandTotal = totals.reduce((a, b) => a + b, 0);
    student.grandAverage = totals.length > 0 ? student.grandTotal / totals.length : 0;
    
    // Assign grades
    student.halfGrade = this.calculateGrade(student.halfAverage, GRADE_SCALE_HALF);
    student.annualGrade = this.calculateGrade(student.annualAverage, GRADE_SCALE_ANNUAL);
    student.halfResult = student.halfAverage >= 20 ? 'موفق' : 'تلاش بیشتر';
    student.annualResult = student.annualAverage >= 50 ? 'ارتقا صنف' : 'تکرار صنف';
    
    return student;
  }

  calculateGrade(average, scale) {
    const grade = scale.find(g => average >= g.minAvg && average <= g.maxAvg);
    return grade ? grade.grade : '';
  }

  createNewStudentFromSheet(sheet) {
    const newId = Math.max(...STUDENTS.map(s => s.id)) + 1;
    
    return {
      id: newId,
      serialSort: newId,
      name: sheet.studentName || 'نامشخص',
      fatherName: '',
      grandfatherName: '',
      studentId: sheet.studentId || newId + 2000,
      idCardNumber: null,
      halfYearScores: sheet.scoreType === 'halfYear' ? sheet.scores : {},
      annualScores: sheet.scoreType === 'annual' ? sheet.scores : {},
      subjectTotals: {},
      halfYearTotal: 0,
      annualTotal: 0,
      grandTotal: 0,
      halfAverage: 0,
      annualAverage: 0,
      grandAverage: 0,
      halfResult: '',
      annualResult: '',
      halfGrade: '',
      annualGrade: '',
      attendance: {
        schoolDays: 81,
        present: 0,
        absent: 81,
        sick: 0,
        leave: 0
      }
    };
  }

  async saveAllSheets() {
    if (this.processedSheets.length === 0) {
      this.showNotification('warning', 'هیچ شقه ای برای ذخیره وجود ندارد');
      return;
    }

    let saved = 0;
    let failed = 0;

    for (let i = this.processedSheets.length - 1; i >= 0; i--) {
      try {
        await this.saveSheet(i);
        saved++;
      } catch (error) {
        failed++;
        console.error(`Failed to save sheet ${i}:`, error);
      }
    }

    this.showNotification('success', `${saved} شقه ذخیره شد${failed > 0 ? `، ${failed} خطا` : ''}`);
    
    // Refresh views
    this.renderDashboard();
  }

  renderDashboard() {
    const topStudentsContainer = document.getElementById('topStudents');
    const topStudents = getStudentsByGrade('الف');
    
    topStudentsContainer.innerHTML = topStudents.slice(0, 5).map(s => `
      <div class="top-student-card">
        <span class="rank">#${s.serialSort}</span>
        <span class="name">${s.name}</span>
        <span class="average">${s.grandAverage?.toFixed(1) || 0}%</span>
        <span class="grade grade-${s.halfGrade}">${s.halfGrade}</span>
      </div>
    `).join('');
  }

  renderStudentsTable(filter = null) {
    const tableContainer = document.getElementById('studentsTable');
    let students = STUDENTS;
    
    if (filter && filter !== 'all') {
      if (filter === 'غایب') {
        students = STUDENTS.filter(s => s.halfResult === 'غایب');
      } else {
        students = getStudentsByGrade(filter);
      }
    }
    
    tableContainer.innerHTML = `
      <table class="data-table">
        <thead>
          <tr>
            <th>شماره</th>
            <th>نام</th>
            <th>نام پدر</th>
            <th>ID</th>
            <th>چهارونی</th>
            <th>سالانه</th>
            <th>مجموع</th>
            <th>درجه</th>
            <th>نتیجه</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          ${students.map(s => `
            <tr class="${s.halfResult === 'غایب' ? 'absent-row' : ''}">
              <td>${s.serialSort}</td>
              <td>${s.name}</td>
              <td>${s.fatherName}</td>
              <td>${s.studentId}</td>
              <td>${s.halfAverage?.toFixed(1) || '-'}</td>
              <td>${s.annualAverage?.toFixed(1) || '-'}</td>
              <td>${s.grandAverage?.toFixed(1) || '-'}</td>
              <td><span class="grade grade-${s.halfGrade}">${s.halfGrade || '-'}</span></td>
              <td><span class="result ${s.halfResult === 'موفق' ? 'success' : s.halfResult === 'غایب' ? 'danger' : 'warning'}">${s.halfResult || '-'}</span></td>
              <td>
                <button class="btn btn-sm btn-info" onclick="app.viewStudentDetails(${s.id})">👁 مشاهده</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }

  viewStudentDetails(studentId) {
    const student = getStudentById(studentId);
    if (!student) return;

    // Create and show detailed view in modal
    const editorBody = document.getElementById('editorBody');
    editorBody.innerHTML = `
      <div class="student-detail">
        <h3>${student.name} ${student.fatherName}</h3>
        <div class="detail-grid">
          <div class="detail-item">
            <strong>شماره:</strong> ${student.serialSort}
          </div>
          <div class="detail-item">
            <strong>ID:</strong> ${student.studentId}
          </div>
          <div class="detail-item">
            <strong>حضور:</strong> ${student.attendance.present} روز
          </div>
          <div class="detail-item">
            <strong>غیاب:</strong> ${student.attendance.absent} روز
          </div>
        </div>
        
        <h4>نمرات چهارونی:</h4>
        <table class="scores-table">
          <thead>
            <tr><th>مضمون</th><th>نمره</th><th>حداکثر</th></tr>
          </thead>
          <tbody>
            ${SUBJECTS.filter(s => s.id <= 20).map(subj => `
              <tr>
                <td>${subj.name}</td>
                <td>${student.halfYearScores[subj.id] ?? '-'}</td>
                <td>${subj.maxHalf}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        
        <h4>نمرات سالانه:</h4>
        <table class="scores-table">
          <thead>
            <tr><th>مضمون</th><th>نمره</th><th>حداکثر</th></tr>
          </thead>
          <tbody>
            ${SUBJECTS.filter(s => s.id <= 20).map(subj => `
              <tr>
                <td>${subj.name}</td>
                <td>${student.annualScores[subj.id] ?? '-'}</td>
                <td>${subj.maxAnnual}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    document.getElementById('editorModal').style.display = 'flex';
    document.getElementById('saveEditBtn').style.display = 'none';
  }

  exportAllData() {
    const exporter = new DataExporter();
    exporter.exportToExcel(STUDENTS, SCHOOL_INFO, SUBJECTS);
    this.showNotification('success', 'دیتا با موفقیت اکسپورت شد');
  }

  exportProcessedData() {
    if (this.processedSheets.length === 0) {
      this.showNotification('warning', 'داده ای برای اکسپورت وجود ندارد');
      return;
    }
    
    const exporter = new DataExporter();
    exporter.exportProcessedSheets(this.processedSheets);
    this.showNotification('success', 'شقه های پردازش شده اکسپورت شدند');
  }

  showNotification(type, message) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('fade-out');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  // Camera functions
  async startCamera() {
    const cameraView = document.getElementById('cameraView');
    const uploadZone = document.getElementById('uploadZone');
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      const video = document.getElementById('cameraStream');
      video.srcObject = stream;
      
      uploadZone.style.display = 'none';
      cameraView.style.display = 'block';
      
      this.cameraStream = stream;
    } catch (error) {
      alert('دسترسی به دوربین ممکن نیست: ' + error.message);
    }
  }

  capturePhoto() {
    const video = document.getElementById('cameraStream');
    const canvas = document.getElementById('photoCanvas');
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);
    
    canvas.toBlob((blob) => {
      const file = new File([blob], `capture_${Date.now()}.jpg`, { type: 'image/jpeg' });
      this.processImages([file]);
      this.closeCamera();
    }, 'image/jpeg', 0.95);
  }

  closeCamera() {
    const cameraView = document.getElementById('cameraView');
    const uploadZone = document.getElementById('uploadZone');
    
    if (this.cameraStream) {
      this.cameraStream.getTracks().forEach(track => track.stop());
      this.cameraStream = null;
    }
    
    cameraView.style.display = 'none';
    uploadZone.style.display = 'block';
  }

  loadExistingData() {
    this.renderDashboard();
    this.renderStudentsTable();
  }

  filterStudents(query) {
    const filtered = query ? 
      STUDENTS.filter(s => 
        s.name.includes(query) || 
        s.fatherName.includes(query) || 
        s.studentId.toString().includes(query)
      ) : 
      STUDENTS;
    
    this.renderFilteredStudents(filtered);
  }

  filterStudentsByGrade(grade) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    this.renderStudentsTable(grade === 'all' ? null : grade);
  }

  renderFilteredStudents(students) {
    const tableContainer = document.getElementById('studentsTable');
    // Similar to renderStudentsTable but with custom student array
    // ... (implementation similar to renderStudentsTable)
  }

  removeSheet(index) {
    if (confirm('آیا مطمئن هستید که میخواهید این شقه را حذف کنید؟')) {
      this.processedSheets.splice(index, 1);
      this.showResults();
    }
  }
}

// Initialize app
const app = new SchoolCertificateManager();
window.app = app; // Make accessible globally for onclick handlers
