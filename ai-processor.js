// ai-processor.js - AI Image Processing Module

export class AIImageProcessor {
  static async processSheetImage(file) {
    try {
      // Convert file to base64
      const base64Image = await this.fileToBase64(file);
      
      // Step 1: Image preprocessing
      const processedImage = await this.preprocessImage(base64Image);
      
      // Step 2: Text extraction using AI
      const extractedText = await this.extractTextFromImage(processedImage);
      
      // Step 3: Parse the extracted text
      const parsedData = this.parseStudentData(extractedText);
      
      // Step 4: Validate against database schema
      const validatedData = this.validateData(parsedData);
      
      // Step 5: Calculate confidence score
      const confidence = this.calculateConfidence(parsedData, validatedData);
      
      return {
        success: true,
        data: validatedData,
        confidence: confidence,
        rawText: extractedText
      };
      
    } catch (error) {
      console.error('AI processing error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
  
  static async fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
  
  static async preprocessImage(base64Image) {
    // Create canvas for image processing
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    return new Promise((resolve) => {
      img.onload = () => {
        // Set dimensions
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Apply image enhancements
        ctx.drawImage(img, 0, 0);
        
        // Increase contrast for better text recognition
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
          // Convert to grayscale
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          
          // Increase contrast
          const contrast = 1.5;
          const factor = (259 * (contrast * 255 + 255)) / (255 * (259 - contrast * 255));
          const newValue = factor * (avg - 128) + 128;
          
          data[i] = data[i + 1] = data[i + 2] = Math.max(0, Math.min(255, newValue));
        }
        
        ctx.putImageData(imageData, 0, 0);
        
        // Return processed image
        resolve(canvas.toDataURL('image/jpeg', 0.9));
      };
      
      img.src = base64Image;
    });
  }
  
  static async extractTextFromImage(base64Image) {
    try {
      // Use Tesseract.js for OCR (Open Source)
      const { createWorker } = await import('https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.esm.min.js');
      
      const worker = await createWorker('fas+ara'); // Persian/Arabic language
      
      const result = await worker.recognize(base64Image);
      await worker.terminate();
      
      return result.data.text;
      
    } catch (error) {
      // Fallback to basic image analysis
      console.warn('Tesseract not available, using fallback:', error);
      return this.basicTextRecognition(base64Image);
    }
  }
  
  static basicTextRecognition(base64Image) {
    // Basic pattern recognition for Dari/Persian text
    const patterns = {
      studentName: /(نام|اسم)\s*(شاگرد|محصل)?[\s:]+([آ-ی\s]+)/g,
      studentId: /(آی\s*دی|شماره|ID)[\s:]+(\d+)/g,
      subjectScores: /([آ-ی\s]+)[:\s]*(\d{1,2})\s*از\s*(\d{2})/g,
      halfYear: /(چهارونی|نیمه\s*اول|چهارماهه)/,
      annual: /(سالانه|سال|نهایی)/
    };
    
    // Since we can't actually read text without OCR, 
    // return empty data that will be manually filled
    return {
      studentName: '',
      studentId: '',
      scores: {},
      type: 'unknown'
    };
  }
  
  static parseStudentData(extractedText) {
    const data = {
      studentName: '',
      studentId: '',
      scoreType: 'unknown',
      scores: {}
    };
    
    // Parse student name
    const nameMatch = extractedText.match(/(?:نام|اسم)\s*(?:شاگرد|محصل)?[\s:]*([آ-ی\s]+)/);
    if (nameMatch) {
      data.studentName = nameMatch[1].trim();
    }
    
    // Parse student ID
    const idMatch = extractedText.match(/(?:آی\s*دی|شماره|ID)[\s:]*(\d+)/);
    if (idMatch) {
      data.studentId = idMatch[1];
    }
    
    // Determine score type
    if (/چهارونی|نیمه\s*اول|چهارماهه/.test(extractedText)) {
      data.scoreType = 'halfYear';
    } else if (/سالانه|سال|نهایی/.test(extractedText)) {
      data.scoreType = 'annual';
    }
    
    // Parse scores
    const scorePattern = /(\d+)\s*[:\-\s]\s*(\d+)/g;
    let match;
    let subjectIndex = 1;
    
    while ((match = scorePattern.exec(extractedText)) !== null) {
      if (subjectIndex <= 20) {
        data.scores[subjectIndex] = parseInt(match[2]);
        subjectIndex++;
      }
    }
    
    return data;
  }
  
  static validateData(parsedData) {
    const validated = { ...parsedData };
    
    // Validate score ranges
    const maxScore = validated.scoreType === 'halfYear' ? 40 : 60;
    
    Object.keys(validated.scores).forEach(subjectId => {
      const score = validated.scores[subjectId];
      if (score < 0) validated.scores[subjectId] = 0;
      if (score > maxScore) validated.scores[subjectId] = maxScore;
    });
    
    return validated;
  }
  
  static calculateConfidence(rawData, validatedData) {
    let confidencePoints = 0;
    const totalPoints = 4;
    
    // Check if student name was found
    if (rawData.studentName && rawData.studentName.length > 2) {
      confidencePoints++;
    }
    
    // Check if student ID was found
    if (rawData.studentId && rawData.studentId.length > 0) {
      confidencePoints++;
    }
    
    // Check if score type was determined
    if (rawData.scoreType !== 'unknown') {
      confidencePoints++;
    }
    
    // Check if scores were extracted
    if (Object.keys(rawData.scores).length > 0) {
      confidencePoints++;
    }
    
    return confidencePoints / totalPoints;
  }
}
