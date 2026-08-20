const SECTIONS = [
  { key: 'packages', label: 'Packages' },
  { key: 'gallery', label: 'Gallery' },
  { key: 'films', label: 'Films' },
  { key: 'testimonials', label: 'Testimonials' },
  { key: 'stories', label: 'Stories' },
  { key: 'team', label: 'Team' },
  { key: 'settings', label: 'Site Settings' },
  { key: 'password', label: 'Change Password' }
];

const FIELDS = {
  packages: [
    { key: 'name', label: 'Package Name', type: 'text', required: true },
    { key: 'price', label: 'Price', type: 'text', required: true, placeholder: 'From ৳25,000' },
    { key: 'description', label: 'Short Description', type: 'textarea', rows: 2 },
    { key: 'features', label: 'Features (one per line)', type: 'list' },
    { key: 'featured', label: 'Featured (highlighted card)', type: 'checkbox' }
  ],
  gallery: [
    { key: 'category', label: 'Category', type: 'select', options: ['wedding', 'engagement', 'prewedding', 'event'] },
    { key: 'image', label: 'Photo', type: 'image' },
    { key: 'alt', label: 'Alt Text', type: 'text' }
  ],
  films: [
    { key: 'title', label: 'Title', type: 'text', required: true },
    { key: 'description', label: 'Description', type: 'textarea', rows: 2 },
    { key: 'image', label: 'Cover Image', type: 'image' }
  ],
  testimonials: [
    { key: 'quote', label: 'Quote', type: 'textarea', required: true, rows: 3 },
    { key: 'author', label: 'Author', type: 'text', required: true }
  ],
  stories: [
    { key: 'title', label: 'Title', type: 'text', required: true },
    { key: 'date', label: 'Date', type: 'text', placeholder: 'March 2026' },
    { key: 'excerpt', label: 'Excerpt', type: 'textarea', rows: 3 },
    { key: 'image', label: 'Photo', type: 'image' },
    { key: 'alt', label: 'Alt Text', type: 'text' }
  ],
  team: [
    { key: 'name', label: 'Name', type: 'text', required: true },
    { key: 'role', label: 'Role', type: 'text' },
    { key: 'image', label: 'Photo', type: 'image' }
  ]
};

const CATEGORY_LABELS = { wedding: 'Wedding', engagement: 'Engagement', prewedding: 'Pre-wedding', event: 'Event' };

let state = { data: null, current: 'packages' };

function $(id) { return document.getElementById(id); }

function api(path, options) {
  return fetch(path, options).then(async (res) => {
    if (res.status === 401) {
      location.href = 'login.html';
      throw new Error('Unauthorized');
    }
    const body = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(body.error || 'Request failed');
    return body;
  });
}

function notice(message, type) {
  const el = $('notice');
  el.textContent = message;
  el.className = 'notice ' + (type || 'success');
  el.hidden = false;
  clearTimeout(notice._t);
  notice._t = setTimeout(() => { el.hidden = true; }, 3000);
}

function init() {
  const isLogin = !!$('login-form');
  if (isLogin) {
    initLogin();
  } else {
    initDashboard();
  }
}

function initLogin() {
  api('/api/admin/session').then((s) => {
    if (s.loggedIn) location.href = 'index.html';
  });
  $('login-form').addEventListener('submit', function (e) {
    e.preventDefault();
    api('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: $('password').value })
    }).then(() => { location.href = 'index.html'; }).catch((err) => {
      $('login-error').textContent = err.message === 'Unauthorized' ? 'Invalid password' : err.message;
      $('login-error').hidden = false;
    });
  });
}

function initDashboard() {
  $('logout-btn').addEventListener('click', () => {
    api('/api/admin/logout', { method: 'POST' }).then(() => { location.href = 'login.html'; });
  });

  renderNav();
  loadData();
}

function renderNav() {
  const nav = $('sidebar-nav');
  nav.innerHTML = '';
  for (const section of SECTIONS) {
    const btn = document.createElement('button');
    btn.textContent = section.label;
    btn.dataset.key = section.key;
    btn.addEventListener('click', () => selectSection(section.key));
    nav.appendChild(btn);
  }
}

function loadData() {
  api('/api/admin/data').then((data) => {
    state.data = data;
    selectSection(state.current);
  });
}

function selectSection(key) {
  state.current = key;
  document.querySelectorAll('#sidebar-nav button').forEach((b) => {
    b.classList.toggle('active', b.dataset.key === key);
  });

  const isSettings = key === 'settings';
  const isPassword = key === 'password';
  $('section-title').textContent = SECTIONS.find((s) => s.key === key).label;
  $('add-btn').hidden = isSettings || isPassword;
  $('items-view').hidden = isSettings || isPassword;
  $('settings-view').hidden = !isSettings;
  $('password-view').hidden = !isPassword;

  if (isSettings) return renderSettings();
  if (isPassword) return renderPasswordForm();
  renderItems(key);
}

function renderItems(section) {
  const wrap = $('items-view');
  const items = (state.data[section] || []).slice().reverse();
  if (!items.length) {
    wrap.innerHTML = '<div class="empty-state">No items yet. Click "Add New" to create one.</div>';
    return;
  }

  const grid = document.createElement('div');
  grid.className = 'items-grid';

  for (const item of items) {
    const card = document.createElement('div');
    card.className = 'item-card';

    if (item.image) {
      const img = document.createElement('img');
      img.src = item.image;
      img.alt = item.alt || '';
      card.appendChild(img);
    }

    const body = document.createElement('div');
    body.className = 'item-body';

    const title = document.createElement('h4');
    title.textContent = itemTitle(section, item);
    body.appendChild(title);

    const sub = document.createElement('p');
    sub.textContent = itemSub(section, item);
    body.appendChild(sub);

    if (item.featured) {
      const badge = document.createElement('span');
      badge.className = 'item-featured';
      badge.textContent = 'Featured';
      body.appendChild(badge);
    }
    card.appendChild(body);

    const actions = document.createElement('div');
    actions.className = 'item-actions';

    const editBtn = document.createElement('button');
    editBtn.className = 'btn btn-outline btn-sm';
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => openModal(section, item));

    const delBtn = document.createElement('button');
    delBtn.className = 'btn btn-danger btn-sm';
    delBtn.textContent = 'Delete';
    delBtn.addEventListener('click', () => confirmDelete(section, item));

    actions.appendChild(editBtn);
    actions.appendChild(delBtn);
    card.appendChild(actions);

    grid.appendChild(card);
  }

  wrap.innerHTML = '';
  wrap.appendChild(grid);
}

function itemTitle(section, item) {
  switch (section) {
    case 'packages': return item.name || 'Untitled';
    case 'gallery': return CATEGORY_LABELS[item.category] || item.category || 'Photo';
    case 'films': return item.title || 'Untitled';
    case 'testimonials': return item.author || 'Anonymous';
    case 'stories': return item.title || 'Untitled';
    case 'team': return item.name || 'Untitled';
    default: return 'Item';
  }
}

function itemSub(section, item) {
  switch (section) {
    case 'packages': return item.price || '';
    case 'gallery': return item.alt || item.category || '';
    case 'films': return item.description || '';
    case 'testimonials': return item.quote || '';
    case 'stories': return item.date || '';
    case 'team': return item.role || '';
    default: return '';
  }
}

function openModal(section, item) {
  const isEdit = !!item;
  const values = Object.assign({}, item || {});
  if (section === 'packages' && Array.isArray(values.features)) values.features = values.features.join('\n');

  $('modal-title').textContent = (isEdit ? 'Edit' : 'Add') + ' ' + SECTIONS.find((s) => s.key === section).label;
  $('modal-backdrop').hidden = false;

  const form = $('modal-form');
  form.innerHTML = '';

  for (const field of FIELDS[section]) {
    const group = document.createElement('div');
    group.className = field.type === 'checkbox' ? 'form-group checkbox-row' : 'form-group';
    const label = document.createElement('label');
    label.textContent = field.label;
    group.appendChild(label);

    let input;
    if (field.type === 'select') {
      input = document.createElement('select');
      input.name = field.key;
      for (const opt of field.options) {
        const o = document.createElement('option');
        o.value = opt;
        o.textContent = CATEGORY_LABELS[opt] || opt;
        if (values[field.key] === opt) o.selected = true;
        input.appendChild(o);
      }
    } else if (field.type === 'textarea') {
      input = document.createElement('textarea');
      input.name = field.key;
      input.rows = field.rows || 3;
      if (values[field.key]) input.value = values[field.key];
    } else if (field.type === 'checkbox') {
      input = document.createElement('input');
      input.type = 'checkbox';
      input.name = field.key;
      if (values[field.key]) input.checked = true;
    } else if (field.type === 'list') {
      input = document.createElement('textarea');
      input.name = field.key;
      input.rows = 6;
      if (values[field.key]) input.value = values[field.key];
    } else if (field.type === 'image') {
      const row = document.createElement('div');
      const urlInput = document.createElement('input');
      urlInput.type = 'text';
      urlInput.name = field.key;
      urlInput.placeholder = 'Image URL or upload';
      if (values[field.key]) urlInput.value = values[field.key];

      const uploadBtn = document.createElement('button');
      uploadBtn.type = 'button';
      uploadBtn.className = 'btn btn-outline btn-sm';
      uploadBtn.textContent = 'Upload';
      uploadBtn.style.marginTop = '.5rem';

      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';
      fileInput.hidden = true;
      fileInput.addEventListener('change', () => {
        if (!fileInput.files.length) return;
        const fd = new FormData();
        fd.append('file', fileInput.files[0]);
        uploadBtn.disabled = true;
        uploadBtn.textContent = 'Uploading...';
        api('/api/admin/upload', { method: 'POST', body: fd }).then((res) => {
          urlInput.value = res.url;
          updatePreview(group, res.url);
          uploadBtn.textContent = 'Upload';
          uploadBtn.disabled = false;
        }).catch((err) => {
          notice(err.message, 'error');
          uploadBtn.textContent = 'Upload';
          uploadBtn.disabled = false;
        });
      });
      uploadBtn.addEventListener('click', () => fileInput.click());

      const preview = document.createElement('img');
      preview.className = 'image-preview';
      preview.hidden = !values[field.key];
      if (values[field.key]) preview.src = values[field.key];

      row.appendChild(urlInput);
      row.appendChild(uploadBtn);
      row.appendChild(fileInput);
      row.appendChild(preview);
      group.appendChild(row);
      group.dataset.imageGroup = 'true';
      input = urlInput;
    } else {
      input = document.createElement('input');
      input.type = field.type || 'text';
      input.name = field.key;
      if (field.placeholder) input.placeholder = field.placeholder;
      if (values[field.key] !== undefined) input.value = values[field.key];
    }

    if (field.type !== 'image') group.appendChild(input);
    if (field.required) input.required = true;
    form.appendChild(group);
  }

  const actions = document.createElement('div');
  actions.className = 'form-actions';
  const cancelBtn = document.createElement('button');
  cancelBtn.type = 'button';
  cancelBtn.className = 'btn btn-outline';
  cancelBtn.textContent = 'Cancel';
  cancelBtn.addEventListener('click', closeModal);
  const saveBtn = document.createElement('button');
  saveBtn.type = 'submit';
  saveBtn.className = 'btn btn-gold';
  saveBtn.textContent = 'Save';
  actions.appendChild(cancelBtn);
  actions.appendChild(saveBtn);
  form.appendChild(actions);

  form.onsubmit = (e) => {
    e.preventDefault();
    const payload = {};
    const fd = new FormData(form);
    for (const [key, val] of fd.entries()) payload[key] = val;
    if (payload.features !== undefined) payload.features = payload.features.split('\n').map((s) => s.trim()).filter(Boolean);
    payload.featured = payload.featured === 'on';

    const request = isEdit
      ? api('/api/admin/' + section + '/' + item.id, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      : api('/api/admin/' + section, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });

    request.then(() => {
      closeModal();
      notice('Saved');
      loadData();
    }).catch((err) => notice(err.message, 'error'));
  };
}

function updatePreview(group, url) {
  const preview = group.querySelector('.image-preview');
  if (preview) {
    preview.src = url;
    preview.hidden = false;
  }
}

function closeModal() {
  $('modal-backdrop').hidden = true;
  $('modal-form').innerHTML = '';
}

function confirmDelete(section, item) {
  if (!window.confirm('Delete this item? This cannot be undone.')) return;
  api('/api/admin/' + section + '/' + item.id, { method: 'DELETE' })
    .then(() => { notice('Deleted'); loadData(); })
    .catch((err) => notice(err.message, 'error'));
}

function settingsImageGroup(key, label, value) {
  const group = document.createElement('div');
  group.className = 'form-group';

  const l = document.createElement('label');
  l.textContent = label;
  group.appendChild(l);

  const urlInput = document.createElement('input');
  urlInput.type = 'text';
  urlInput.name = key;
  urlInput.value = value || '';
  urlInput.placeholder = 'Image URL or upload';
  group.appendChild(urlInput);

  const uploadBtn = document.createElement('button');
  uploadBtn.type = 'button';
  uploadBtn.className = 'btn btn-outline btn-sm';
  uploadBtn.textContent = 'Upload';
  uploadBtn.style.marginTop = '.5rem';
  group.appendChild(uploadBtn);

  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';
  fileInput.hidden = true;
  group.appendChild(fileInput);

  const preview = document.createElement('img');
  preview.className = 'image-preview';
  preview.hidden = !value;
  if (value) preview.src = value;
  group.appendChild(preview);

  fileInput.addEventListener('change', () => {
    if (!fileInput.files.length) return;
    const fd = new FormData();
    fd.append('file', fileInput.files[0]);
    uploadBtn.disabled = true;
    uploadBtn.textContent = 'Uploading...';
    api('/api/admin/upload', { method: 'POST', body: fd }).then((res) => {
      urlInput.value = res.url;
      preview.src = res.url;
      preview.hidden = false;
      uploadBtn.textContent = 'Upload';
      uploadBtn.disabled = false;
    }).catch((err) => {
      notice(err.message, 'error');
      uploadBtn.textContent = 'Upload';
      uploadBtn.disabled = false;
    });
  });

  uploadBtn.addEventListener('click', () => fileInput.click());

  return group;
}

function renderSettings() {
  const wrap = $('settings-view');
  const s = state.data.settings || {};
  const fields = [
    ['whatsapp_number', 'WhatsApp Number (country code + number, no +)'],
    ['email', 'Email'],
    ['hours', 'Opening Hours'],
    ['location', 'Location'],
    ['instagram', 'Instagram URL'],
    ['facebook', 'Facebook URL'],
    ['youtube', 'YouTube URL']
  ];
  const form = document.createElement('form');
  for (const [key, label] of fields) {
    const group = document.createElement('div');
    group.className = 'form-group';
    const l = document.createElement('label');
    l.textContent = label;
    const input = document.createElement('input');
    input.type = 'text';
    input.name = key;
    input.value = s[key] || '';
    group.appendChild(l);
    group.appendChild(input);
    form.appendChild(group);
  }
  form.appendChild(settingsImageGroup('home_hero_image', 'Homepage Hero Background Image', s.home_hero_image));
  const actions = document.createElement('div');
  actions.className = 'form-actions';
  const saveBtn = document.createElement('button');
  saveBtn.type = 'submit';
  saveBtn.className = 'btn btn-gold';
  saveBtn.textContent = 'Save Settings';
  actions.appendChild(saveBtn);
  form.appendChild(actions);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const payload = {};
    const fd = new FormData(form);
    for (const [key, val] of fd.entries()) payload[key] = val;
    api('/api/admin/settings', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      .then(() => { notice('Settings saved'); loadData(); })
      .catch((err) => notice(err.message, 'error'));
  });

  wrap.innerHTML = '';
  wrap.appendChild(form);
}

function renderPasswordForm() {
  const wrap = $('password-view');
  const form = document.createElement('form');
  const groups = [
    ['current', 'Current Password', 'password'],
    ['next', 'New Password (min 6 characters)', 'password'],
    ['confirm', 'Confirm New Password', 'password']
  ];
  for (const [key, label, type] of groups) {
    const g = document.createElement('div');
    g.className = 'form-group';
    const l = document.createElement('label');
    l.textContent = label;
    const input = document.createElement('input');
    input.type = type;
    input.name = key;
    input.required = true;
    g.appendChild(l);
    g.appendChild(input);
    form.appendChild(g);
  }
  const actions = document.createElement('div');
  actions.className = 'form-actions';
  const btn = document.createElement('button');
  btn.type = 'submit';
  btn.className = 'btn btn-gold';
  btn.textContent = 'Update Password';
  actions.appendChild(btn);
  form.appendChild(actions);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const current = fd.get('current');
    const next = fd.get('next');
    const confirm = fd.get('confirm');
    if (next !== confirm) return notice('New passwords do not match', 'error');
    api('/api/admin/change-password', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ current, next }) })
      .then(() => { notice('Password updated'); form.reset(); })
      .catch((err) => notice(err.message, 'error'));
  });

  wrap.innerHTML = '';
  wrap.appendChild(form);
}

$('add-btn') && $('add-btn').addEventListener('click', () => openModal(state.current, null));
$('modal-close') && $('modal-close').addEventListener('click', closeModal);
$('modal-backdrop') && $('modal-backdrop').addEventListener('click', (e) => {
  if (e.target === $('modal-backdrop')) closeModal();
});

init();
