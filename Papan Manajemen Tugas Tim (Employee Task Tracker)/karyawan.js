const KEY = 'DATA_TASKS_APP';
const tabelBody = document.getElementById('tabel-body-karyawan');

window.onload = function() {
  renderTabelKaryawan();
};

function renderTabelKaryawan() {
  const dataTasks = JSON.parse(localStorage.getItem(KEY)) || [];
  tabelBody.innerHTML = '';

  if (dataTasks.length === 0) {
    tabelBody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:20px; color:#64748b;">Belum ada tugas yang ditugaskan.</td></tr>';
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
        <select class="status-select" onchange="updateStatus('${item.id}', this.value)">
          <option value="To Do" ${item.status === 'To Do' ? 'selected' : ''}>📌 To Do</option>
          <option value="In Progress" ${item.status === 'In Progress' ? 'selected' : ''}>⏳ In Progress</option>
          <option value="Completed" ${item.status === 'Completed' ? 'selected' : ''}>✅ Completed</option>
        </select>
      </td>
    `;
    tabelBody.appendChild(tr);
  });
}

window.updateStatus = function(id, statusBaru) {
  let dataTasks = JSON.parse(localStorage.getItem(KEY)) || [];
  const index = dataTasks.findIndex(i => i.id === id);

  if (index !== -1) {
    dataTasks[index].status = statusBaru;
    localStorage.setItem(KEY, JSON.stringify(dataTasks));
    renderTabelKaryawan();
  }
};