// Hämta och visa biljetter från BigQuery (via /bigquery)
async function loadTickets() {
  try {
    const res = await fetch('/bigquery', { cache: 'no-store' });
    if (!res.ok) throw new Error(await res.text());
    const rows = await res.json(); // [{FirstName, LastName, Age, Height}, ...]

    const tbody = document.querySelector('#biljettTable tbody');
    tbody.innerHTML = rows.map(r => `
      <tr>
        <td>${escapeHtml(r.FirstName)}</td>
        <td>${escapeHtml(r.LastName)}</td>
        <td>${escapeHtml(r.Age)}</td>
        <td>${escapeHtml(r.Height)}</td>
      </tr>
    `).join('');
  } catch (e) {
    console.error('loadTickets error:', e);
  }
}

// (valfritt) auto-refresh
const AUTO_REFRESH_MS = 10000; // 10s, ändra/ta bort om du vill

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  loadTickets();
  if (AUTO_REFRESH_MS) setInterval(loadTickets, AUTO_REFRESH_MS);
});

// ---------- UI-hjälp ----------
function initTabs() {
  const tabs = document.querySelectorAll('.tab');
  const panels = document.querySelectorAll('.panel');
  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      tabs.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.querySelector(btn.dataset.target).classList.add('active');
    });
  });
}

function escapeHtml(s) {
  return (s ?? '').toString().replace(/[&<>"']/g, m => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[m]));
}

// ---------- Export/Save (om du vill fortsätta ha dem) ----------
async function exportCsvFromServer() {
  // Bygger CSV från det som just nu står i tabellen
  const rows = [...document.querySelectorAll('#biljettTable tbody tr')]
    .map(tr => [...tr.children].map(td => td.textContent.trim()));
  let csv = 'FirstName;LastName;Age;Height\n';
  csv += rows.map(r => r.join(';')).join('\n');
  if (rows.length) csv += '\n';

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'tickets.csv';
  a.click();
}

// Skicka CSV till din server (relative URL – INTE localhost)
async function saveToServer() {
  try {
    // bygg CSV av tabellen
    const rows = [...document.querySelectorAll('#biljettTable tbody tr')]
      .map(tr => [...tr.children].map(td => td.textContent.trim()));
    let csv = 'FirstName;LastName;Age;Height\n';
    csv += rows.map(r => r.join(';')).join('\n');
    if (rows.length) csv += '\n';

    const resp = await fetch('/save', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: csv
    });
    if (!resp.ok) throw new Error(await resp.text());
    alert('Saved (server)');
  } catch (e) {
    console.error(e);
    alert('Could not save');
  }
}

// Knyt knappar (om de finns)
document.addEventListener('DOMContentLoaded', () => {
  const saveBtn = document.getElementById('saveServer');
  if (saveBtn) saveBtn.addEventListener('click', saveToServer);

  const exportBtn = document.getElementById('exportCsv');
  if (exportBtn) exportBtn.addEventListener('click', exportCsvFromServer);
});
