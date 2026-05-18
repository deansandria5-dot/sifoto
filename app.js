const bulanIndonesia = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

const hariIndonesia = [
  "Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"
];

function bindText(inputId, outputId) {
  const input = document.getElementById(inputId);
  const output = document.getElementById(outputId);

  if (!input || !output) return;

  input.addEventListener("input", () => {
    output.innerText = input.value || "-";
  });
}

bindText("maksud", "outMaksud");
bindText("tempat", "outTempat");
bindText("hasil", "outHasil");
bindText("penutup", "outPenutup");
bindText("nama", "outNama");
bindText("nip", "outNip");

const tujuanSelect = document.getElementById("tujuanSelect");
const tujuanInput = document.getElementById("tujuan");
const outTujuan = document.getElementById("outTujuan");

function updateTujuanPreview() {
  if (!tujuanSelect || !tujuanInput || !outTujuan) return;

  if (tujuanSelect.value === "manual") {
    tujuanInput.style.display = "block";
    outTujuan.innerText = tujuanInput.value || "-";
    tujuanInput.focus();
  } else {
    tujuanInput.style.display = "none";
    tujuanInput.value = tujuanSelect.value;
    outTujuan.innerText = tujuanSelect.value || "-";
  }
}

if (tujuanSelect && tujuanInput && outTujuan) {
  tujuanSelect.addEventListener("change", updateTujuanPreview);

  tujuanInput.addEventListener("input", () => {
    outTujuan.innerText = tujuanInput.value || "-";
  });

  updateTujuanPreview();
}

document.getElementById("tanggal").addEventListener("change", (e) => {
  const value = e.target.value;

  if (!value) {
    document.getElementById("outTanggal").textContent = "-";
    return;
  }

  const date = new Date(value + "T00:00:00");
  const hari = hariIndonesia[date.getDay()];
  const tanggal = String(date.getDate()).padStart(2, "0");
  const bulan = bulanIndonesia[date.getMonth()];
  const tahun = date.getFullYear();

  document.getElementById("outTanggal").textContent =
    `${hari}, ${tanggal} ${bulan} ${tahun}`;
});

document.getElementById("photosUpload").addEventListener("change", (e) => {
  const files = Array.from(e.target.files).slice(0, 4);

  for (let i = 0; i < 4; i++) {
    const box = document.getElementById("photo" + i);
    box.innerHTML = "Foto " + (i + 1);

    if (files[i]) {
      const reader = new FileReader();

      reader.onload = () => {
        box.innerHTML = "";

        const img = document.createElement("img");
        img.src = reader.result;

        box.appendChild(img);
      };

      reader.readAsDataURL(files[i]);
    }
  }
});

function resizePreviewMobile() {
  const wrap = document.querySelector(".preview-wrap");

  if (!wrap) return;

  if (window.innerWidth <= 700) {
    const scale = (window.innerWidth - 44) / 812;
    wrap.style.height = (1247 * scale + 22) + "px";
  } else {
    wrap.style.height = "auto";
  }
}

window.addEventListener("resize", resizePreviewMobile);
window.addEventListener("load", resizePreviewMobile);