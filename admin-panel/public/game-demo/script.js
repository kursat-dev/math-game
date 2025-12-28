const API_URL = 'https://math-game-lsj0.onrender.com/api/game';

let questions = [];
let currentQuestionIndex = 0;
let stats = {
  correct: 0,
  wrong: 0,
  score: 0
};

// Soruları API'den yükle
async function loadQuestions() {
  const gameArea = document.getElementById('gameArea');
  const topic = document.getElementById('topicFilter').value;
  const difficulty = document.getElementById('difficultyFilter').value;

  // Loading göster
  gameArea.innerHTML = `
    <div class="loading glass-card">
      <div class="spinner"></div>
      <p>Sorular yükleniyor...</p>
    </div>
  `;

  try {
    // API'den soruları çek
    let url = `${API_URL}/questions?limit=10`;
    if (topic) url += `&topic=${topic}`;
    if (difficulty) url += `&difficulty=${difficulty}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Sorular yüklenemedi');
    }

    questions = data.questions;
    currentQuestionIndex = 0;

    if (questions.length === 0) {
      gameArea.innerHTML = `
        <div class="glass-card" style="text-align: center; padding: 3rem;">
          <h2>😔 Soru Bulunamadı</h2>
          <p>Seçtiğiniz filtrelere uygun soru bulunmuyor.</p>
          <p style="margin-top: 1rem;">Lütfen farklı filtreler deneyin veya admin panelden yeni sorular ekleyin.</p>
        </div>
      `;
      return;
    }

    showQuestion();
  } catch (error) {
    gameArea.innerHTML = `
      <div class="glass-card" style="text-align: center; padding: 2rem;">
        <h2>❌ Hata</h2>
        <p>${error.message}</p>
        <p style="margin-top: 1rem; font-size: 0.875rem; opacity: 0.8;">
          Backend server'ın çalıştığından emin olun: <code>npm start</code>
        </p>
        <button class="btn btn-primary" style="margin-top: 1rem;" onclick="loadQuestions()">
          Tekrar Dene
        </button>
      </div>
    `;
  }
}

// Mevcut soruyu göster
function showQuestion() {
  const gameArea = document.getElementById('gameArea');
  const question = questions[currentQuestionIndex];

  const topicLabel = question.topic === 'trigonometri' ? 'Trigonometri' : 'Analitik Geometri';

  gameArea.innerHTML = `
    <div class="question-card glass-card">
      <div class="question-header">
        <span class="badge">${topicLabel}</span>
        <span class="badge badge-${question.difficulty}">${question.difficulty}</span>
        <span style="font-size: 0.875rem; opacity: 0.9;">
          Soru ${currentQuestionIndex + 1} / ${questions.length}
        </span>
      </div>

      <div class="question-text">${question.question}</div>

      <div class="options">
        ${Object.entries(question.options).map(([key, value]) => `
          <button 
            class="btn btn-option" 
            onclick="checkAnswer('${key}')"
            data-option="${key}"
          >
            <strong>${key})</strong> ${value}
          </button>
        `).join('')}
      </div>

      ${question.hint ? `
        <div class="hint" style="display: none;" id="hintBox">
          <div class="hint-title">💡 İpucu</div>
          <div>${question.hint}</div>
        </div>
        <button class="btn" style="background: rgba(255,255,255,0.2); margin-top: 1rem;" onclick="showHint()">
          💡 İpucu Göster
        </button>
      ` : ''}
    </div>
  `;
}

// İpucu göster
function showHint() {
  const hintBox = document.getElementById('hintBox');
  if (hintBox) {
    hintBox.style.display = 'block';
  }
}

// Cevabı kontrol et
function checkAnswer(selectedAnswer) {
  const question = questions[currentQuestionIndex];
  const buttons = document.querySelectorAll('.btn-option');

  // Tüm butonları devre dışı bırak
  buttons.forEach(btn => btn.disabled = true);

  // Doğru ve yanlış cevapları işaretle
  buttons.forEach(btn => {
    const option = btn.getAttribute('data-option');
    if (option === question.correctAnswer) {
      btn.classList.add('correct');
    } else if (option === selectedAnswer && option !== question.correctAnswer) {
      btn.classList.add('wrong');
    }
  });

  // İstatistikleri güncelle
  if (selectedAnswer === question.correctAnswer) {
    stats.correct++;
    stats.score += 10;
  } else {
    stats.wrong++;
    stats.score = Math.max(0, stats.score - 5);
  }

  updateStats();

  // 2 saniye sonra sonraki soruya geç
  setTimeout(() => {
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      showQuestion();
    } else {
      showResults();
    }
  }, 2000);
}

// İstatistikleri güncelle
function updateStats() {
  document.getElementById('correctCount').textContent = stats.correct;
  document.getElementById('wrongCount').textContent = stats.wrong;
  document.getElementById('score').textContent = stats.score;
}

// Sonuçları göster
function showResults() {
  const gameArea = document.getElementById('gameArea');
  const percentage = Math.round((stats.correct / questions.length) * 100);

  let message = '';
  let emoji = '';

  if (percentage >= 80) {
    message = 'Mükemmel! 🎉';
    emoji = '🏆';
  } else if (percentage >= 60) {
    message = 'Harika! 👏';
    emoji = '⭐';
  } else if (percentage >= 40) {
    message = 'İyi deneme! 👍';
    emoji = '💪';
  } else {
    message = 'Biraz daha çalışmalısın! 📚';
    emoji = '🎯';
  }

  gameArea.innerHTML = `
    <div class="glass-card" style="text-align: center; padding: 3rem;">
      <div style="font-size: 4rem; margin-bottom: 1rem;">${emoji}</div>
      <h2>${message}</h2>
      <div style="margin: 2rem 0;">
        <div style="font-size: 3rem; font-weight: 700; margin-bottom: 0.5rem;">
          %${percentage}
        </div>
        <div style="opacity: 0.9;">
          ${stats.correct} doğru, ${stats.wrong} yanlış
        </div>
        <div style="margin-top: 1rem; font-size: 1.5rem;">
          Toplam Skor: <strong>${stats.score}</strong>
        </div>
      </div>
      <button class="btn btn-primary" onclick="resetGame()">
        🔄 Yeni Oyun
      </button>
    </div>
  `;
}

// Oyunu sıfırla
function resetGame() {
  stats = { correct: 0, wrong: 0, score: 0 };
  updateStats();
  loadQuestions();
}

// Sayfa yüklendiğinde istatistikleri sıfırla
updateStats();
