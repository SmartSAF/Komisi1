document.addEventListener("DOMContentLoaded", function() {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", function(e) {
    e.preventDefault();

    // Ambil nilai input
    const kodeid = document.getElementById("kodeid").value.trim();
    const password = document.getElementById("password").value.trim();

    if (kodeid === "" || password === "") {
      alert("Kode ID dan Password harus diisi!");
      return;
    }

    // Ganti URL berikut dengan URL Web App Google Apps Script Anda
    const scriptURL = "https://script.google.com/macros/s/AKfycbyqa3H9xysGUj3quFv53palb3a4XErvKmyiJHgTJX2MkmjDhP9do78M3OdSrqBzOT1M/exec";

    // Susun URL dengan parameter action, kodeid, dan password
    const url = scriptURL +
      "?action=login&kodeid=" + encodeURIComponent(kodeid) +
      "&password=" + encodeURIComponent(password);

    console.log("Request URL:", url);

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok: " + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        if (data.status === "success") {
          displayData(data.data);
        } else {
          alert(data.message || "Login gagal!");
        }
      })
      .catch(error => {
        console.error("Error:", error);
        alert("Terjadi kesalahan saat koneksi ke server.");
      });
  });

  // Tombol navigasi pada halaman WD
  document.getElementById("btnWithdrawKomisi").addEventListener("click", function() {
    window.location.href = "https://SmartSAF.com/Withdraw";
  });
  document.getElementById("btnWithdrawUD").addEventListener("click", function() {
    window.location.href = "https://SmartSAF.com/Toko";
  });
  document.getElementById("homeBtn").addEventListener("click", function() {
    window.location.href = "https://SmartSAF.com/Dashboard";
  });
});

function displayData(userData) {
  // Sembunyikan kontainer login dan tampilkan kontainer data
  document.getElementById("loginContainer").style.display = "none";
  const dataContainer = document.getElementById("dataContainer");
  dataContainer.style.display = "block";

  // Set judul halaman WD
  document.getElementById("dataTitle").innerText = "Komisi dan Bonus";

  // Buat tabel untuk menampilkan data
  const table = document.createElement("table");
  table.className = "table-data";

  // Urutan field sesuai dengan yang ada di Google Sheet
  const fieldsOrder = [
    "Kode ID",
    "Tgl Bergabung",
    "Nama",
    "Pengundang",
    "WA Pengundang",
    "Anggota di G1",
    "Anggota di G2",
    "Anggota di G3",
    "Anggota di G4",
    "Anggota di G5",
    "Anggota di G6",
    "Anggota di G7",
    "Anggota di G8",
    "Anggota di G9",
    "Anggota di G10",
    "Anggota di G2-10",
    "Komisi G1",
    "Komisi G2",
    "Komisi G3",
    "Komisi G4",
    "Komisi G5",
    "Komisi G6",
    "Komisi G7",
    "Komisi G8",
    "Komisi G9",
    "Komisi G10",
    "Jumlah Komisi",
    "Bonus Spesial 1",
    "Bonus Spesial 2",
    "Bonus Spesial 3",
    "Bonus Spesial 4",
    "Bonus Spesial 5",
    "Jumlah Komisi+Bonus",
    "Komisi+Bonus Rp 80%",
    "Komisi+Bonus UD 20%",
    "Riwayat Withdraw Rp",
    "Jumlah Withdraw Rp",
    "Saldo Komisi+Bonus Rp",
    "Riwayat Withdraw UD",
    "Jumlah Withdraw UD",
    "Saldo Uang Digital",
    "Bonus Tambahan 1",
    "Bonus Tambahan 2",
    "Bonus Tambahan 3",
  ];

  // Daftar field yang akan diformat sebagai mata uang (jika nilainya berupa angka)
  const currencyFields = [
    "Komisi G1",
    "Komisi G2",
    "Komisi G3",
    "Komisi G4",
    "Komisi G5",
    "Komisi G6",
    "Komisi G7",
    "Komisi G8",
    "Komisi G9",
    "Komisi G10",
    "Jumlah Komisi",
    "Bonus Spesial 1",
    "Bonus Spesial 2",
    "Bonus Spesial 3",
    "Bonus Spesial 4",
    "Bonus Spesial 5",
    "Jumlah Komisi+Bonus",
    "Komisi+Bonus Rp 80%",
    "Komisi+Bonus UD 20%",
    "Jumlah Withdraw Rp",
    "Saldo Komisi+Bonus Rp",
    "Jumlah Withdraw UD",
    "Saldo Uang Digital",
    "Bonus Tambahan 1",
    "Bonus Tambahan 2",
    "Bonus Tambahan 3"
  ];

  fieldsOrder.forEach(function(field) {
    const tr = document.createElement("tr");

    const th = document.createElement("th");
    th.innerText = field;

    const tdColon = document.createElement("td");
    tdColon.innerText = ":";
    tdColon.style.width = "5px";

    const tdValue = document.createElement("td");
    let value = userData[field] || "";

    if (currencyFields.includes(field)) {
      value = formatCurrency(value);
    }

    tdValue.innerText = value;

    tr.appendChild(th);
    tr.appendChild(tdColon);
    tr.appendChild(tdValue);
    table.appendChild(tr);
  });

  const dataContent = document.getElementById("dataContent");
  dataContent.innerHTML = "";
  dataContent.appendChild(table);
}

function formatCurrency(value) {
  let number = parseFloat(value);
  if (isNaN(number)) return value;
  return "Rp " + number.toLocaleString("id-ID");
}
