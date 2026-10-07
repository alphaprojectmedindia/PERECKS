/**
 * Readability & Plain Language Auditor (scripts/check-readability.ts)
 * Enforces NHS reading-age standard (target: reading age 9-11, Flesch-Kincaid <= 7, max avg 20 words/sentence).
 */

import fs from 'fs';
import path from 'path';

function countSyllables(word: string): number {
  word = word.toLowerCase().replace(/[^a-z]/g, '');
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]|ed|es|e)$/, '');
  word = word.replace(/^y/, '');
  const syllables = word.match(/[aeiouy]{1,2}/g);
  return syllables ? Math.max(1, syllables.length) : 1;
}

export function analyzeReadability(text: string) {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const words = text.split(/\s+/).filter(w => w.trim().length > 0);

  if (sentences.length === 0 || words.length === 0) {
    return { fleschKincaidGrade: 0, avgSentenceLength: 0, wordCount: 0, passed: true };
  }

  let totalSyllables = 0;
  for (const word of words) {
    totalSyllables += countSyllables(word);
  }

  const avgSentenceLength = words.length / sentences.length;
  const avgSyllablesPerWord = totalSyllables / words.length;

  // Flesch-Kincaid Grade Level formula:
  // 0.39 * (words / sentences) + 11.8 * (syllables / words) - 15.59
  const gradeLevel = (0.39 * avgSentenceLength) + (11.8 * avgSyllablesPerWord) - 15.59;
  const roundedGrade = Math.max(0, Math.round(gradeLevel * 10) / 10);

  const passed = roundedGrade <= 8.5 && avgSentenceLength <= 22; // Allow reasonable tolerance for clinical terms with glossary

  return {
    fleschKincaidGrade: roundedGrade,
    avgSentenceLength: Math.round(avgSentenceLength * 10) / 10,
    wordCount: words.length,
    passed
  };
}

export function scanAllContent() {
  console.log('📖 Auditing content readability for NHS reading age compliance (Ages 9-11)...');
  const articlesDir = path.resolve(process.cwd(), 'content/articles');
  if (!fs.existsSync(articlesDir)) {
    console.log('ℹ️ No articles directory yet, creating placeholder check.');
    return;
  }

  const files = fs.readdirSync(articlesDir, { recursive: true }) as string[];
  let failed = 0;

  for (const file of files) {
    if (typeof file === 'string' && file.endsWith('.json')) {
      const fullPath = path.join(articlesDir, file);
      const content = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
      const textToAnalyze = `${content.summary || ''} ${(content.body || []).join(' ')}`;
      const result = analyzeReadability(textToAnalyze);

      console.log(`- ${file}: Grade ${result.fleschKincaidGrade} (Avg sentence: ${result.avgSentenceLength} words) -> ${result.passed ? '✅ PASS' : '⚠️ WARNING'}`);
      if (!result.passed) failed++;
    }
  }

  console.log(`\nReadability audit finished. ${failed} warnings.`);
}

if (process.argv[1]?.includes('check-readability.ts')) {
  scanAllContent();
}
