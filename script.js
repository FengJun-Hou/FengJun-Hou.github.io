document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll(".nav-item");
  const sections = document.querySelectorAll(".content-section");
  const links = document.querySelectorAll("[data-target]");

  function showSection(targetId) {
    navItems.forEach(item => {
      item.classList.toggle("active", item.dataset.target === targetId);
    });

    sections.forEach(section => {
      section.classList.toggle("active-section", section.id === targetId);
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
    history.replaceState(null, "", "#" + targetId);
  }

  links.forEach(link => {
    link.addEventListener("click", () => showSection(link.dataset.target));
  });

  const initialTarget = window.location.hash.slice(1);
  if (initialTarget && document.getElementById(initialTarget)) {
    showSection(initialTarget);
  }
});
