document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    localStorage.setItem('username', username);
    window.location.href = 'dashboard.html'; // Asegúrate de que 'dashboard.html' sea el home de tu aplicación
});

function addRow() {
    const table = document.getElementById('table');
    const row = document.createElement('div');
    row.className = 'row';
    row.innerHTML = `
        <input type="text" placeholder="Nombre">
        <input type="text" placeholder="Procesador">
        <input type="text" placeholder="Memorias">
        <input type="text" placeholder="Observaciones">
        <input type="file" accept="image/*" onchange="previewImage(event)">
        <div class="image-preview" onclick="openZoomedImage(event)"></div>
        <button onclick="removeRow(this)">Eliminar</button>
    `;
    table.appendChild(row);
}

function removeRow(button) {
    const row = button.parentElement;
    row.remove();
}

function previewImage(event) {
    const input = event.target;
    const imagePreview = input.nextElementSibling;
    const reader = new FileReader();
    reader.onload = function(e) {
        imagePreview.innerHTML = `<img src="${e.target.result}" alt="Imagen del equipo">`;
    }
    reader.readAsDataURL(input.files[0]);
}

function openZoomedImage(event) {
    const img = event.currentTarget.querySelector('img');
    if (!img) return;

    const zoomedImage = document.createElement('img');
    zoomedImage.src = img.src;
    zoomedImage.classList.add('zoomed-image');

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    overlay.onclick = closeZoomedImage;

    document.body.appendChild(overlay);
    document.body.appendChild(zoomedImage);
}

function closeZoomedImage() {
    const zoomedImage = document.querySelector('.zoomed-image');
    const overlay = document.querySelector('.overlay');
    if (zoomedImage) zoomedImage.remove();
    if (overlay) overlay.remove();
}

function openAccountSettings() {
    document.getElementById('accountSettingsModal').showModal();
}

function closeAccountSettings() {
    document.getElementById('accountSettingsModal').close();
}

function saveAccountSettings() {
    const profilePictureInput = document.getElementById('profilePicture');
    const companyNameInput = document.getElementById('companyName');
    const profilePicturePreview = document.getElementById('profilePicturePreview');

    if (profilePictureInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            profilePicturePreview.src = e.target.result;
            document.querySelector('#accountMenu img').src = e.target.result;
        }
        reader.readAsDataURL(profilePictureInput.files[0]);
    }

    const companyName = companyNameInput.value;
    localStorage.setItem('companyName', companyName);
    closeAccountSettings();
}

function logout() {
    localStorage.clear();
    alert('Has cerrado sesión.');
    window.location.href = 'index.html'; // Asegúrate de que 'index.html' sea el home de tu aplicación
}

// Cargar datos guardados al iniciar
window.onload = function() {
    const username = localStorage.getItem('username');
    if (username) {
        document.querySelector('#accountMenu summary').textContent = username;
    }
    const companyName = localStorage.getItem('companyName');
    if (companyName) {
        document.getElementById('companyName').value = companyName;
    }
}
