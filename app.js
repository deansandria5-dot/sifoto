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

// Binding field standar
bindText("maksud", "outMaksud");
bindText("tujuan", "outTujuan");
bindText("tempat", "outTempat");
bindText("hasil", "outHasil");
bindText("penutup", "outPenutup");
bindText("nama", "outNama");
bindText("nip", "outNip");

/* ✅ PERUBAHAN: Label Tanda Tangan Custom */
const labelTT = document.getElementById("labelTT");
const outLabelTT = document.getElementById("outLabelTT");

if (labelTT && outLabelTT) {
  labelTT.addEventListener("input", () => {
    // Jika kosong, kembali ke default "Yang Membuat Laporan"
    outLabelTT.innerText = labelTT.value.trim() || "Yang Membuat Laporan";
  });
}

// Format Tanggal Indonesia
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

// Handle Upload Foto
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

// Responsive Preview Mobile
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

/* ✅ FUNGSI BARU: Export ke Word (.doc) */
function exportToWord() {
  const paper = document.querySelector('.paper');
  if (!paper) return;

  const clone = paper.cloneNode(true);

  // Style khusus agar rapi saat dibuka di MS Word
  const style = `
    <style>
      body { font-family: Arial, sans-serif; margin: 2cm; }
      .kop { display: flex; align-items: center; border-bottom: 3px solid #000; padding-bottom: 10px; margin-bottom: 20px; }
      .logo { width: 80px; height: 80px; }
      .logo-fallback { width: 80px; height: 80px; display: flex; align-items: center; justify-content: center; border: 2px solid #000; font-weight: bold; }
      .kop-center { flex: 1; text-align: center; margin: 0 20px; }
      .t1 { font-size: 14pt; font-weight: bold; }
      .t2 { font-size: 12pt; font-weight: bold; }
      .addr { font-size: 10pt; }
      .city { font-size: 12pt; font-weight: bold; margin-top: 5px; }
      .kodepos { font-size: 10pt; }
      .doc-title { text-align: center; font-size: 14pt; font-weight: bold; margin: 20px 0; text-decoration: underline; }
      .report { line-height: 1.6; }
      .row { display: flex; margin-bottom: 10px; }
      .row > div:first-child { width: 40px; font-weight: bold; }
      .row > div:nth-child(2) { width: 200px; }
      .colon { width: 20px; }
      .row > div:last-child { flex: 1; }
      .photos-inline { display: flex; gap: 10px; margin-top: 10px; }
      .photo-box { width: 120px; height: 90px; border: 1px solid #000; display: flex; align-items: center; justify-content: center; overflow: hidden; }
      .photo-box img { width: 100%; height: 100%; object-fit: cover; }
      .signature { margin-top: 40px; text-align: right; page-break-inside: avoid; }
      .sig-name { font-weight: bold; margin: 30px 0 5px 0; }
    </style>
  `;

  const html = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' 
          xmlns:w='urn:schemas-microsoft-com:office:word' 
          xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset="utf-8">
      ${style}
    </head>
    <body>
      ${clone.outerHTML}
    </body>
    </html>
  `;

  const blob = new Blob(['\ufeff', html], {
    type: 'application/msword'
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Laporan_Perjalanan_Dinas.doc';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
