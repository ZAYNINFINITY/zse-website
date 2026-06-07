document.addEventListener('DOMContentLoaded', () => {
  const dropdowns = document.querySelectorAll('.dropdown');

  dropdowns.forEach(dropdown => {
    const dropbtn = dropdown.querySelector('.dropbtn');
    const menu = dropdown.querySelector('.dropdown-menu');

    // Show menu on hover
    dropdown.addEventListener('mouseenter', () => {
      menu.style.display = 'block';
    });

    // Hide menu when mouse leaves
    dropdown.addEventListener('mouseleave', () => {
      menu.style.display = 'none';
    });

    // Toggle menu on click for mobile devices
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
