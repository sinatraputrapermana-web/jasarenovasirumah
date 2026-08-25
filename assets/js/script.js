/* =======================================================
   JASA RENOVASI RUMAH — Custom Script
   Ringan & tanpa dependency tambahan (selain Bootstrap Bundle)
   ======================================================= */
(function () {
  "use strict";

  // Efek shadow pada navbar saat halaman di-scroll
  const navbar = document.querySelector(".navbar");
  const toggleNavbarShadow = function () {
    if (!navbar) return;
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };
  window.addEventListener("scroll", toggleNavbarShadow, { passive: true });
  toggleNavbarShadow();

  // Tandai nav-link aktif berdasarkan halaman saat ini
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".navbar .nav-link").forEach(function (link) {
    const href = link.getAttribute("href");
    if (href && href === currentPage) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });

  // Tutup menu mobile otomatis setelah klik salah satu link
  const navCollapse = document.getElementById("mainNavbar");
  if (navCollapse) {
    navCollapse.querySelectorAll(".nav-link:not(.dropdown-toggle)").forEach(function (link) {
      link.addEventListener("click", function () {
        if (navCollapse.classList.contains("show")) {
          const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navCollapse);
          bsCollapse.hide();
        }
      });
    });
  }

  // Back to Top Button Logic
  const btnTop = document.getElementById("btn-back-to-top");
  if (btnTop) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 300) {
        btnTop.classList.add("show");
      } else {
        btnTop.classList.remove("show");
      }
    }, { passive: true });

    btnTop.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
})();
