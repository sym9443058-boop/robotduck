const PARTS = {
  head: {
    id: "MOD.01",
    title: "두부 유닛 · CEPHALIC",
    image: "assets/part-head.png",
    alt: "두부 카메라와 REC LED 클로즈업",
    body: "전면 카메라가 시야를 담당하고, 클래식 REC 램프에서 가져온 촬영 인디케이터가 카메라 사용 중임을 표시합니다. 헤드 IMU가 고개 자세를 따로 측정하고, 머리 쪽 NFC 안테나로 태그·다른 덕과 근접 식별이 가능합니다.",
    chips: ["FRONT CAMERA", "REC LED", "HEAD IMU", "NFC ANTENNA"],
  },
  beak: {
    id: "MOD.02",
    title: "그리퍼 부리 · EFFECTOR",
    image: "assets/part-beak.png",
    alt: "관절형 주황 부리가 마커를 물고 있는 클로즈업",
    body: "팔 대신 부리가 엔드이펙터입니다. 두 조가 힌지로 열리고 닫히며 양말·펜처럼 가벼운 물체를 집습니다. 부리 안쪽에도 NFC가 있어 태그를 쪼아 식별하거나, 집어 든 물체를 몸에 연결할 수 있습니다.",
    chips: ["ARTICULATED BEAK", "GRASP ACTUATOR", "BEAK NFC", "CARRY POLICY"],
  },
  torso: {
    id: "MOD.03",
    title: "동체 코어 · SENSOR / POWER",
    image: "assets/part-torso.png",
    alt: "동체 패널과 착탈식 NP-F550 배터리 클로즈업",
    body: "Rockchip RK3566과 NPU가 50Hz 폴리시 루프를 돌립니다. 전면 8×8 ToF LiDAR가 근거리 깊이를 찍고, 동체 IMU가 낙상 여부를 판정합니다. 전원은 카메라용 NP-F550(2600mAh) — 한 시간 전후, 현장에서 갈아 끼울 수 있습니다.",
    chips: ["RK3566 + NPU", "8×8 ToF LiDAR", "BODY IMU", "NP-F550 2600mAh"],
  },
  legs: {
    id: "MOD.04",
    title: "이족 보행부 · LOCOMOTION",
    image: "assets/part-legs.png",
    alt: "노출된 관절 링과 서보가 보이는 다리 클로즈업",
    body: "15개 모터가 다리·목·머리에 나뉩니다. 워들 보행, 앉기, 쪼그리기, 롤러스케이트, 낙상 회복이 모두 이 스택 위에서 돌아갑니다. 800g 미만이라 실패한 스텝은 연구실 사고가 아니라 바닥 위의 작은 오리로 끝납니다.",
    chips: ["15 DOF", "SERVO BUS", "WADDLE / SIT", "ROLLER READY"],
  },
};

const panel = {
  id: document.getElementById("part-title") ? document.querySelector(".panel-id") : null,
  title: document.getElementById("part-title"),
  image: document.getElementById("part-image"),
  body: document.getElementById("part-body"),
  chips: document.getElementById("part-chips"),
};

function renderPart(key) {
  const part = PARTS[key];
  if (!part) return;

  document.querySelector(".panel-id").textContent = part.id;
  panel.title.textContent = part.title;
  panel.image.src = part.image;
  panel.image.alt = part.alt;
  panel.body.textContent = part.body;
  panel.chips.innerHTML = part.chips.map((chip) => `<li>${chip}</li>`).join("");

  document.querySelectorAll(".hotspot").forEach((btn) => {
    btn.setAttribute("aria-pressed", String(btn.dataset.part === key));
  });
}

document.querySelectorAll(".hotspot").forEach((btn) => {
  btn.addEventListener("click", () => renderPart(btn.dataset.part));
});

document.addEventListener("keydown", (event) => {
  const keys = ["1", "2", "3", "4"];
  const map = { 1: "head", 2: "beak", 3: "torso", 4: "legs" };
  if (keys.includes(event.key)) renderPart(map[event.key]);
});
