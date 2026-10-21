// 1. 모바일 햄버거 메뉴 토글
document.addEventListener("DOMContentLoaded", () => {
  const mobileBtn = document.getElementById("mobileMenuBtn");
  const navLinks = document.querySelector(".nav-links");

  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // 2. 주요업무 탭 필터링
  const tabButtons = document.querySelectorAll(".tab-btn");
  const serviceBoxes = document.querySelectorAll(".service-box");

  tabButtons.forEach(button => {
    button.addEventListener("click", () => {
      tabButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      const filter = button.getAttribute("data-tab");

      serviceBoxes.forEach(box => {
        if (filter === "all") {
          box.style.display = "flex";
        } else {
          if (box.getAttribute("data-category") === filter) {
            box.style.display = "flex";
          } else {
            box.style.display = "none";
          }
        }
      });
    });
  });

  // 카운트업 애니메이션
  animateValue("count-safety", 0, 480, 1500, "+");
  animateValue("count-offices", 0, 130, 1500, "+");
  animateValue("count-year", 1900, 1949, 1200, "년");

  // 맞춤 혜택 진단기 초기화
  initBenefitFinder();
});

// ==========================================
// 맞춤 혜택 체크리스트 & 진단 엔진
// ==========================================
const roleData = {
  consumer: {
    name: "일반 소비자 / 시민",
    badge: "소비자 맞춤 안심 솔루션",
    questions: [
      {
        id: "c1",
        title: "장을 볼 때 농약이나 유해물질 걱정 없이 안심하고 먹고 싶어요.",
        desc: "친환경(유기농·무농약)이나 GAP(우수관리인증) 등 국가 인증 제품을 고르는 법과 진짜 인증인지 확인하는 방법이 궁금합니다.",
        benefits: [
          {
            dept: "소비안전과",
            title: "국가인증 농식품(GAP·친환경) 실시간 이력조회 서비스",
            summary: "스마트폰으로 농관원 GAP정보서비스(gap.go.kr) 및 친환경 인증시스템(enviagro.go.kr)에 포장지 인증번호를 입력하면 생산자, 재배지, 인증 유효기간을 즉시 무료로 확인할 수 있습니다.",
            tip: "마크 모양만 보지 마시고 하단의 '인증번호'로 정품 여부를 검색해 보세요.",
            linkText: "GAP인증 바로 조회하기",
            url: "https://www.gap.go.kr"
          }
        ]
      },
      {
        id: "c2",
        title: "배달앱이나 식당에서 고기/김치의 원산지 표시가 의심스럽거나 속은 것 같아요.",
        desc: "수입산 돼지고기나 배추김치가 국내산으로 둔갑된 정황이 있거나 원산지 표시가 전혀 안 되어 있는 경우 해결책이 필요합니다.",
        benefits: [
          {
            dept: "원산지관리과",
            title: "원산지 부정유통 전담 특별사법경찰관 신속 현장 출동 & 포상금",
            summary: "전국 어디서나 1588-8112로 전화하시거나 농관원 누리집에 제보하시면, 전담 특사경이 DNA 분석 키트를 지참하고 사업장을 불시 단속합니다. 위반 사실 확인 시 최대 1,000만 원의 신고 포상금이 지급됩니다.",
            tip: "배달 영수증이나 음식점 메뉴판 사진을 촬영해 두시면 더욱 신속히 단속됩니다.",
            linkText: "부정유통 온라인 신고 접수",
            url: "https://www.naqs.go.kr"
          }
        ]
      },
      {
        id: "c3",
        title: "김장철 배추, 무, 고춧가루 잔류농약이 안전한지 불안해요.",
        desc: "가족들이 1년 내내 먹을 김장 재료에 농약이 기준치 이상 남아있지 않은지 걱정됩니다.",
        benefits: [
          {
            dept: "유해물질안전과",
            title: "김장철 채소류 산지 출하 전 잔류농약 기획조사 결과 및 PLS 관리",
            summary: "농관원은 김장철 주산지와 도매시장을 대상으로 잔류농약 480종을 집중 검사하며 부적합품은 출하 전 전량 폐기·격리합니다. 농관원 누리집 '농식품 안전정보' 게시판에서 매주 검사 현황을 투명하게 공개합니다.",
            tip: "농관원의 출하 전 선제적 차단 조치로 일반 마트에 유통되는 농산물은 안심하고 드셔도 됩니다.",
            linkText: "농식품 안전정보(SafeQ) 열람",
            url: "https://www.naqs.go.kr"
          }
        ]
      }
    ]
  },
  farmer: {
    name: "농업인 / 귀농·귀촌 희망자",
    badge: "농업인 생산·경영 든든 솔루션",
    questions: [
      {
        id: "f1",
        title: "공익직불금을 신청하고 농업인 혜택(면세유, 건강보험 감면 등)을 받고 싶어요.",
        desc: "처음 농사를 짓기 시작했거나 농지/재배 품목이 바뀌어 농업경영체 등록과 변경이 필요합니다.",
        benefits: [
          {
            dept: "농업경영체등록과",
            title: "농업경영체 신규 등록 및 변경 원스톱 서비스 (방문/온라인)",
            summary: "농관원 시·군 사무소에 농업경영체를 등록하시면 기본형 공익직불금 수령 자격이 부여되고, 농업인 확인서 발급, 건강보험료 최대 50% 감면, 면세유 공급 등 정부 농업 지원의 기본 관문이 열립니다.",
            tip: "최근 개편으로 한국농어촌공사 농지임대수탁 신청 시 경영체 변경등록까지 원스톱으로 자동 연계됩니다.",
            linkText: "Agrix 농림사업정보시스템 바로가기",
            url: "https://www.agrix.go.kr"
          }
        ]
      },
      {
        id: "f2",
        title: "올해 수확한 벼를 공공비축벼로 정부에 제값 받고 출하하고 싶어요.",
        desc: "벼 수확 후 공공비축벼 매입 검사 일정, 등급(특등, 1~3등) 판정 기준 및 가루쌀벼 수매가 궁금합니다.",
        benefits: [
          {
            dept: "품질검사과",
            title: "공공비축벼(가루쌀벼 포함) 매입검사 및 등급 판정 지도",
            summary: "매년 10월~12월 전국 3,000여 개 검사장에서 농관원 검사관이 직접 품위 검사를 실시합니다. 수분 함량(13~15%), 이물질, 싸라기 비율 등 사전 점검 요령을 안내받아 높은 등급을 받을 수 있도록 현장 지도합니다.",
            tip: "벼 건조 시 수분율을 13.0%~15.0% 사이로 적정하게 유지하시면 높은 등급을 받는 데 유리합니다.",
            linkText: "농산물 검사기준 및 일정 공지",
            url: "https://www.naqs.go.kr"
          }
        ]
      },
      {
        id: "f3",
        title: "내 농산물에 GAP(우수관리)나 친환경 유기농 인증을 달아 비싸게 팔고 싶어요.",
        desc: "친환경이나 GAP 인증을 취득하는 절차와 수수료 지원, 인증 갱신 관리가 필요합니다.",
        benefits: [
          {
            dept: "인증관리과",
            title: "GAP 및 친환경 농산물 인증제도 사후관리 & 컨설팅",
            summary: "토양·용수 분석과 위생적인 수확 후 관리 기준을 통과하면 국가 인증 마크를 부착할 수 있으며, 학교 급식 및 프리미엄 대형마트 납품 판로가 확보됩니다. 농관원은 인증 농가의 품질 유지를 위한 맞춤형 지도·점검을 무상 지원합니다.",
            tip: "지자체와 연계 시 GAP 안전성 검사비(토양·수질) 전액 지원 혜택도 받을 수 있습니다.",
            linkText: "GAP 정보서비스 가이드",
            url: "https://www.gap.go.kr"
          }
        ]
      }
    ]
  },
  business: {
    name: "외식업 대표 / 식품 유통·가공업자",
    badge: "소상공인·자영업자 안심 준수 솔루션",
    questions: [
      {
        id: "b1",
        title: "식당 메뉴판, 배달앱에 원산지를 어떻게 표기해야 단속에 안 걸리는지 헷갈려요.",
        desc: "소고기, 돼지고기, 닭고기, 쌀, 배추김치, 콩 등 24개 품목의 올바른 글자 크기, 위치, 배달앱 표시 규정을 알고 싶습니다.",
        benefits: [
          {
            dept: "원산지관리과",
            title: "음식점·배달앱 원산지 표시 기준 가이드 & 사전 컨설팅 지원",
            summary: "글자 크기는 메뉴판 음식명과 동일하거나 더 크게, 배달앱은 메뉴명 옆 또는 영수증 표기 등 규정을 준수해야 최대 1,000만 원 이하의 과태료를 피할 수 있습니다. 농관원은 초보 소상공인을 위해 무료 원산지 표지판 및 안내 리플릿을 지원합니다.",
            tip: "혼합 조리(국산 50% + 외국산 50%) 시 비율 병기 요령을 관할 지사에서 사전 상담받으세요.",
            linkText: "음식점 원산지 표시 안내서 다운로드",
            url: "https://www.naqs.go.kr"
          }
        ]
      },
      {
        id: "b2",
        title: "도매시장이나 온라인에서 원료(곡물, 고기)를 샀는데 속아서 산 건 아닌지 찜찜해요.",
        desc: "납품받은 농축산물의 원산지가 불분명하거나 허위 표기된 것 같아 사업상 피해를 입을까 우려됩니다.",
        benefits: [
          {
            dept: "시험연구소",
            title: "원산지 판별 유전자 분석 및 이화학적 감정 의뢰",
            summary: "수입 유통 농산물의 부정 유통이 의심되는 경우, 농관원 시험연구소의 초정밀 유전자(DNA) 분석법 및 근적외선(NIRS) 판별을 통해 거짓 표시 여부를 명확히 과학적으로 판정해 드립니다.",
            tip: "거래 명세표 및 공급업체 계약서를 보관해 두시면 억울한 처분을 방지할 수 있습니다.",
            linkText: "농관원 시험연구 분석 안내",
            url: "https://www.naqs.go.kr"
          }
        ]
      }
    ]
  }
};

let currentRole = "consumer";

function initBenefitFinder() {
  renderChecklist("consumer");
}

function selectRole(role) {
  currentRole = role;
  
  // 버튼 활성화 토글
  document.querySelectorAll(".role-btn").forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-role") === role);
  });

  renderChecklist(role);

  // 결과창 숨기기
  document.getElementById("resultArea").style.display = "none";
}

function renderChecklist(role) {
  const container = document.getElementById("checklistContainer");
  const questions = roleData[role].questions;

  container.innerHTML = questions.map((q, idx) => `
    <label class="check-item" id="item-${q.id}">
      <input type="checkbox" name="benefit-check" value="${q.id}" onchange="toggleItemClass(this, 'item-${q.id}')">
      <div class="check-content">
        <span class="check-title">${q.title}</span>
        <span class="check-desc">${q.desc}</span>
      </div>
    </label>
  `).join("");
}

function toggleItemClass(checkbox, itemId) {
  const item = document.getElementById(itemId);
  if (item) {
    item.classList.toggle("selected", checkbox.checked);
  }
}

function resetChecklist() {
  document.querySelectorAll("#checklistContainer input[type='checkbox']").forEach(cb => {
    cb.checked = false;
  });
  document.querySelectorAll(".check-item").forEach(item => {
    item.classList.remove("selected");
  });
  document.getElementById("resultArea").style.display = "none";
}

function generateBenefitResult() {
  const checkedBoxes = document.querySelectorAll("#checklistContainer input[type='checkbox']:checked");
  const resultArea = document.getElementById("resultArea");
  const benefitList = document.getElementById("benefitCardsList");
  const roleInfo = roleData[currentRole];

  // 만약 아무것도 선택 안 했으면 해당 역할 전체를 기본 안내
  const selectedIds = Array.from(checkedBoxes).map(cb => cb.value);
  let matchedQuestions = [];

  if (selectedIds.length === 0) {
    matchedQuestions = roleInfo.questions; // 전체 보여주기
  } else {
    matchedQuestions = roleInfo.questions.filter(q => selectedIds.includes(q.id));
  }

  // 헤더 뱃지 및 제목 설정
  document.getElementById("resultRoleBadge").textContent = roleInfo.badge;
  document.getElementById("resultHeading").innerHTML = `
    <strong>${roleInfo.name}</strong>을 위한 농관원 핵심 지원 솔루션 (${matchedQuestions.length}건 매칭)
  `;

  // 카드 렌더링
  let cardsHtml = "";
  matchedQuestions.forEach(q => {
    q.benefits.forEach(b => {
      cardsHtml += `
        <div class="benefit-card-item">
          <div class="benefit-top">
            <span class="benefit-dept-tag">담당: ${b.dept}</span>
            <span class="benefit-matched-tag">✓ 맞춤 솔루션</span>
          </div>
          <h4 class="benefit-title">${b.title}</h4>
          <p class="benefit-summary">${b.summary}</p>
          <div class="benefit-action-row">
            <div class="action-tip">
              <span>💡 꿀팁:</span> ${b.tip}
            </div>
            <a href="${b.url}" target="_blank" rel="noopener noreferrer" class="action-btn-link">
              ${b.linkText} ↗
            </a>
          </div>
        </div>
      `;
    });
  });

  benefitList.innerHTML = cardsHtml;
  resultArea.style.display = "block";

  // 결과창으로 부드럽게 스크롤
  resultArea.scrollIntoView({ behavior: "smooth", block: "start" });
}

function scrollToFinder() {
  document.getElementById("step2").scrollIntoView({ behavior: "smooth", block: "start" });
}

function animateValue(id, start, end, duration, suffix = "") {
  const obj = document.getElementById(id);
  if (!obj) return;
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start) + suffix;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// 3. 원산지 상식 인터랙티브 퀴즈 데이터
const quizData = [
  {
    question: "일반 식당에서 찌개용 두부에 들어간 수입산 콩은 원산지 표시 대상일까요?",
    options: [
      "① 네, 두부류의 콩은 일반음식점 필수 원산지 표시 대상입니다.",
      "② 아니오, 찌개류에 들어가는 부재료는 표시 대상이 아닙니다."
    ],
    answer: 0,
    explanation: "정답입니다! 콩(두부류, 콩국수, 콩비지 등)은 일반음식점 원산지 의무 표시 24개 품목 중 하나입니다."
  },
  {
    question: "배달의민족, 쿠팡이츠 등 배달앱에서도 음식 원산지를 반드시 표시해야 할까요?",
    options: [
      "① 매장에만 써 붙이면 되고 배달앱 화면에는 안 적어도 된다.",
      "② 배달앱 주문 화면과 영수증 등에 반드시 원산지를 명시해야 한다."
    ],
    answer: 1,
    explanation: "정답입니다! 통신판매 및 배달앱을 통한 주문 시 소비자가 주문 전에 알 수 있도록 메뉴판과 영수증 등에 반드시 원산지를 기재해야 합니다."
  },
  {
    question: "국산 쌀과 외국산 쌀을 혼합하여 판매하거나 조리할 때 표기법은?",
    options: [
      "① 비율이 높은 국가 하나만 표기하면 된다.",
      "② 섞인 비율(혼합 비율)과 각 원산지를 모두 정직하게 표기해야 한다."
    ],
    answer: 1,
    explanation: "정답입니다! 쌀 등 양곡은 혼합 비율과 원산지 국가를 정확히 병기해야 법 위반이 되지 않습니다."
  }
];

let currentQuizIdx = 0;

function checkQuiz(selectedIndex) {
  const current = quizData[currentQuizIdx];
  const optButtons = document.querySelectorAll("#quizOptions .opt-btn");
  const resultDiv = document.getElementById("quizResult");
  const nextBtn = document.getElementById("nextQuizBtn");

  // 버튼 비활성화
  optButtons.forEach(btn => btn.disabled = true);

  if (selectedIndex === current.answer) {
    optButtons[selectedIndex].classList.add("correct");
    resultDiv.className = "quiz-result show-correct";
    resultDiv.innerHTML = `🎉 <strong>정답입니다!</strong> ${current.explanation}`;
  } else {
    optButtons[selectedIndex].classList.add("wrong");
    optButtons[current.answer].classList.add("correct");
    resultDiv.className = "quiz-result show-wrong";
    resultDiv.innerHTML = `❌ <strong>아쉽습니다.</strong> 정답은 <strong>${current.options[current.answer]}</strong> 입니다.<br>${current.explanation}`;
  }

  nextBtn.style.display = "block";
}

function nextQuiz() {
  currentQuizIdx = (currentQuizIdx + 1) % quizData.length;
  renderQuiz();
}

function renderQuiz() {
  const current = quizData[currentQuizIdx];
  const qNumber = document.getElementById("qNumber");
  const qText = document.getElementById("qText");
  const quizOptions = document.getElementById("quizOptions");
  const resultDiv = document.getElementById("quizResult");
  const nextBtn = document.getElementById("nextQuizBtn");

  qNumber.textContent = `Q${currentQuizIdx + 1}.`;
  qText.textContent = current.question;

  quizOptions.innerHTML = current.options.map((opt, i) => 
    `<button class="opt-btn" onclick="checkQuiz(${i})">${opt}</button>`
  ).join("");

  resultDiv.className = "quiz-result";
  resultDiv.style.display = "none";
  resultDiv.innerHTML = "";
  nextBtn.style.display = "none";
}

// 4. 포상금 계산기 함수
function calculateReward() {
  const val = document.getElementById("violationType").value;
  const rewardAmount = document.getElementById("rewardAmount");
  const rewardDetail = document.getElementById("rewardDetail");

  switch(val) {
    case "50":
      rewardAmount.textContent = "최대 5만 원 ~ 10만 원";
      rewardDetail.textContent = "* 단순 미표시 행위 제보로 과태료 부과 시 지급 기준입니다.";
      break;
    case "100":
      rewardAmount.textContent = "10만 원 ~ 50만 원";
      rewardDetail.textContent = "* 외국산을 국산으로 둔갑 판매한 경미한 위반 처분 시 지급 기준입니다.";
      break;
    case "500":
      rewardAmount.textContent = "50만 원 ~ 200만 원";
      rewardDetail.textContent = "* 상습적이거나 대량의 원산지 거짓표시 적발 기여 시 지급 기준입니다.";
      break;
    case "1000":
      rewardAmount.textContent = "최대 1,000만 원";
      rewardDetail.textContent = "* 대형 유통업체, 대규모 밀수·조직적 원산지 위변조 등 결정적 증거 제출 시 최고 한도입니다.";
      break;
    default:
      rewardAmount.textContent = "최대 1,000만 원";
  }
}
