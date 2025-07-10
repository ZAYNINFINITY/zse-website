document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.mega-menu-tabs li');
  const panels = document.querySelectorAll('.mega-menu-panel');

  tabs.forEach(tab => {
    tab.addEventListener('mouseenter', () => {
      // Remove active class from all tabs and panels
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      // Add active class to hovered tab and corresponding panel
      tab.classList.add('active');
      const tabName = tab.getAttribute('data-tab');
      const activePanel = document.getElementById(tabName);
      if (activePanel) {
        activePanel.classList.add('active');
      }
    });
  });

  // Optional: Hide panels when mouse leaves the mega menu area
  const megaMenu = document.querySelector('.mega-menu');
  if (megaMenu) {
    megaMenu.addEventListener('mouseleave', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
    });
  }

  // Dropdown menu toggle for mobile devices
  const dropdowns = document.querySelectorAll('.dropdown');
  dropdowns.forEach(dropdown => {
    const dropbtn = dropdown.querySelector('.dropbtn');
    const menu = dropdown.querySelector('.dropdown-menu');

    dropbtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (menu.style.display === 'block') {
        menu.style.display = 'none';
      } else {
        menu.style.display = 'block';
      }
    });
  });
});
