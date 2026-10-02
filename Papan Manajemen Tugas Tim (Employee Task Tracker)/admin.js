const KEY = 'DATA_TASKS_APP';
let dataTasks = JSON.parse(localStorage.getItem(KEY)) || [];

const form = document.getElementById('form-task');
const tabelBody = document.getElementById('tabel-body-admin');
const btnSimpan = document.getElementById('btn-simpan');
const btnBatal = document.getElementById('btn-batal');

window.onload = function() {
  renderTabelAdmin();
};

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const id = document.getElementById('task-id').value;
  const judul = document.getElementById('judul').value;
  const karyawan = document.getElementById('karyawan').value;
  const prioritas = document.getElementById('prioritas').value;
  const deadline = document.getElementById('deadline').value;
  const deskripsi = document.getElementById('deskripsi').value;

  dataTasks = JSON.parse(localStorage.getItem(KEY)) || [];

  const taskBaru = {
    id: id ? id : Date.now().toString(),
    judul: judul,
    karyawan: karyawan,
    prioritas: prioritas,
    deadline: deadline,
    deskripsi: deskripsi,
    status: id ? getStatusLama(id) : 'To Do'
  };

  if (id) {
    const index = dataTasks.findIndex(i => i.id === id);
    if (index !== -1) dataTasks[index] = taskBaru;
  } else {
    dataTasks.unshift(taskBaru);
  }

  localStorage.setItem(KEY, JSON.stringify(dataTasks));
  resetForm();
  renderTabelAdmin();
});

function renderTabelAdmin() {
  dataTasks = JSON.parse(localStorage.getItem(KEY)) || [];
  tabelBody.innerHTML = '';

  if (dataTasks.length === 0) {
    tabelBody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:20px; color:#64748b;">Belum ada tugas yang dibuat.</td></tr>';
    return;
  }

  dataTasks.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${item.judul}</strong><br><small style="color:#94a3b8;">${item.deskripsi}</small></td>
      <td><strong>${item.karyawan}</strong></td>
      <td><span class="badge prioritas-${item.prioritas.toLowerCase()}">${item.prioritas}</span></td>
      <td>🗓️ ${item.deadline}</td>
      <td><span class="badge status-${item.status.replace(/\s+/g, '-').toLowerCase()}">${item.status}</span></td>
      <td>
        <button class="btn-icon btn-edit" onclick="editData('${item.id}')" title="Edit">✏️</button>
        <button class="btn-icon btn-delete" onclick="hapusData('${item.id}')" title="Hapus">🗑️</button>
      </td>
    `;
    tabelBody.appendChild(tr);
  });
}

window.editData = function(id) {
  const item = dataTasks.find(i => i.id === id);
  if (!item) return;

  document.getElementById('task-id').value = item.id;
  document.getElementById('judul').value = item.judul;
  document.getElementById('karyawan').value = item.karyawan;
  document.getElementById('prioritas').value = item.prioritas;
  document.getElementById('deadline').value = item.deadline;
  document.getElementById('deskripsi').value = item.deskripsi;

  btnSimpan.textContent = 'Simpan Perubahan';
  btnBatal.style.display = 'inline-block';
};

window.hapusData = function(id) {
  if (confirm('Hapus tugas ini?')) {
    dataTasks = dataTasks.filter(i => i.id !== id);
    localStorage.setItem(KEY, JSON.stringify(dataTasks));
    renderTabelAdmin();
  }
};

function getStatusLama(id) {
  const item = dataTasks.find(i => i.id === id);
  return item ? item.status : 'To Do';
}

function resetForm() {
  form.reset();
  document.getElementById('task-id').value = '';
  btnSimpan.textContent = 'Bagikan Tugas';
  btnBatal.style.display = 'none';
}

btnBatal.addEventListener('click', resetForm);