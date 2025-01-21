document.addEventListener('DOMContentLoaded', () => {
  const rolesList = document.getElementById('roles-list');
  const searchInput = document.getElementById('role-search');

  // Dynamically fetch rolesData for each department
  renderRoles(rolesData);

  // Search functionality
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const filteredRoles = rolesData.filter(role =>
      role.role.toLowerCase().includes(query)
    );
    renderRoles(filteredRoles);
  });

  function renderRoles(roles) {
    rolesList.innerHTML = '';
    roles.forEach(role => {
      const roleDiv = document.createElement('div');
      roleDiv.className = 'role';
      roleDiv.textContent = role.role;
      roleDiv.onclick = () => displayRoleDetails(role);
      rolesList.appendChild(roleDiv);
    });
  }

  window.displayRoleDetails = function (role) {
    document.getElementById('role-details').style.display = 'block';
    document.getElementById('roles-section').style.display = 'none';
    document.getElementById('role-details').innerHTML = `
      <h2>${role.role}</h2>
      <p><strong>Basic Skills:</strong> ${role.basic.join(', ')}</p>
      <p><strong>Advanced Skills:</strong> ${role.main.join(', ')}</p>
      <button class="copy-button" onclick="copyRoleDetails('${role.basic.join(', ')}', '${role.main.join(', ')}')">Copy</button>
      <button class="back-role-button" onclick="hideRoleDetails()">Back</button>
    `;
  };

  window.hideRoleDetails = function () {
    document.getElementById('role-details').style.display = 'none';
    document.getElementById('roles-section').style.display = 'block';
  };

  window.copyRoleDetails = function (basic, main) {
    const textToCopy = `Basic Skills: ${basic}\nAdvanced Skills: ${main}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      alert('Copied to clipboard!');
    });
  };
});
