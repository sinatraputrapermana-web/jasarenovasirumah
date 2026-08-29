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

  // Blog Pagination Logic
  const blogList = document.getElementById("blog-list");
  const blogPagination = document.getElementById("blog-pagination");
  
  if (blogList && blogPagination) {
    const itemsPerPage = 6;
    const blogItems = Array.from(blogList.querySelectorAll(".blog-item"));
    const totalPages = Math.ceil(blogItems.length / itemsPerPage);
    let currentPage = 1;

    function renderBlogItems(page) {
      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;

      blogItems.forEach((item, index) => {
        if (index >= start && index < end) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    }

    function renderPagination() {
      blogPagination.innerHTML = "";

      if (totalPages <= 1) return;

      // Previous Button
      const prevLi = document.createElement("li");
      prevLi.className = `page-item ${currentPage === 1 ? "disabled" : ""}`;
      prevLi.innerHTML = `<a class="page-link" href="#" aria-label="Previous"><span aria-hidden="true">&laquo; Sebelumnya</span></a>`;
      prevLi.addEventListener("click", (e) => {
        e.preventDefault();
        if (currentPage > 1) {
          currentPage--;
          updatePagination();
        }
      });
      blogPagination.appendChild(prevLi);

      // Page Numbers (Max 5)
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, startPage + 4);

      if (endPage - startPage < 4) {
        startPage = Math.max(1, endPage - 4);
      }

      for (let i = startPage; i <= endPage; i++) {
        const pageLi = document.createElement("li");
        pageLi.className = `page-item ${i === currentPage ? "active" : ""}`;
        pageLi.innerHTML = `<a class="page-link" href="#">${i}</a>`;
        pageLi.addEventListener("click", (e) => {
          e.preventDefault();
          currentPage = i;
          updatePagination();
        });
        blogPagination.appendChild(pageLi);
      }

      // Next Button
      const nextLi = document.createElement("li");
      nextLi.className = `page-item ${currentPage === totalPages ? "disabled" : ""}`;
      nextLi.innerHTML = `<a class="page-link" href="#" aria-label="Next"><span aria-hidden="true">Selanjutnya &raquo;</span></a>`;
      nextLi.addEventListener("click", (e) => {
        e.preventDefault();
        if (currentPage < totalPages) {
          currentPage++;
          updatePagination();
        }
      });
      blogPagination.appendChild(nextLi);
    }

    function updatePagination() {
      renderBlogItems(currentPage);
      renderPagination();
      // Scroll to top of blog list smoothly
      const sectionPy = document.querySelector('.section-py');
      if(sectionPy) {
          const yOffset = -80; // Adjust for fixed header
          const y = sectionPy.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({top: y, behavior: 'smooth'});
      }
    }

    // Initialize
    updatePagination();
  }
})();
