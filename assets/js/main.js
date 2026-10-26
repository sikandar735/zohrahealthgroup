/**
* Template Name: MediCare
* Template URL: https://bootstrapmade.com/medicare-bootstrap-template/
* Updated: Apr 28 2026 with Bootstrap v5.3.8
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active') && !navmenu.classList.contains('toggle-dropdown')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Equalize card heights inside Isotope containers before layout
   */
  function equalizeIsotopeCards(container) {
    if (!container) return;
    const cards = Array.from(container.querySelectorAll('.sh-doctor-card, .shadcn-card'));
    if (!cards.length) return;
    cards.forEach(function(card) {
      card.style.minHeight = '';
    });
    if (window.innerWidth < 768) return;
    let maxHeight = 0;
    cards.forEach(function(card) {
      const item = card.closest('.isotope-item');
      if (item && item.style.display === 'none') return;
      const h = card.offsetHeight;
      if (h > maxHeight) maxHeight = h;
    });
    if (maxHeight > 0) {
      cards.forEach(function(card) {
        card.style.minHeight = maxHeight + 'px';
      });
    }
  }

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'fitRows';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';
    const container = isotopeItem.querySelector('.isotope-container');

    let initIsotope;
    imagesLoaded(container, function() {
      equalizeIsotopeCards(container);
      initIsotope = new Isotope(container, {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    window.addEventListener('resize', function() {
      equalizeIsotopeCards(container);
      if (initIsotope) {
        initIsotope.layout();
      }
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        equalizeIsotopeCards(container);
        if (initIsotope) {
          initIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
        }
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle, .faq-item .faq-header').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

})();


/**
 * Zohran Health Group - Interactive "Show More" Toggles & Department Stage Filter
 */
document.addEventListener('DOMContentLoaded', function() {
  // Generic Show More / Show Less Toggle Buttons
  document.querySelectorAll('[data-zhg-toggle]').forEach(function(toggleBtn) {
    toggleBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('data-zhg-toggle');
      const targetEl = document.getElementById(targetId);
      if (!targetEl) return;

      const isVisible = targetEl.classList.toggle('is-visible');
      this.setAttribute('aria-expanded', isVisible ? 'true' : 'false');

      const labelSpan = this.querySelector('.toggle-label');
      const iconEl = this.querySelector('.toggle-icon');
      const moreText = this.getAttribute('data-more-text') || 'Show More';
      const lessText = this.getAttribute('data-less-text') || 'Show Less';

      if (labelSpan) {
        labelSpan.textContent = isVisible ? lessText : moreText;
      }
      if (iconEl) {
        iconEl.classList.toggle('bi-chevron-down', !isVisible);
        iconEl.classList.toggle('bi-chevron-up', isVisible);
      }

      if (typeof AOS !== 'undefined' && typeof AOS.refresh === 'function') {
        setTimeout(function() { AOS.refresh(); }, 100);
      }
    });
  });

  // Home & Department Page Stage Filtering
  document.querySelectorAll('[data-zhg-stage-filter]').forEach(function(filterGroup) {
    const containerSelector = filterGroup.getAttribute('data-zhg-stage-filter');
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const buttons = filterGroup.querySelectorAll('.zhg-filter-btn');
    buttons.forEach(function(btn) {
      btn.addEventListener('click', function() {
        buttons.forEach(function(b) { b.classList.remove('active'); });
        this.classList.add('active');
        const stage = this.getAttribute('data-stage');

        // If user filters by a specific stage on home page, automatically expand the "Show More" department panel so all 38 are searchable
        const extraDeptPanel = document.getElementById('more-departments-grid');
        const deptToggleBtn = document.querySelector('[data-zhg-toggle="more-departments-grid"]');
        if (stage !== 'all' && extraDeptPanel && !extraDeptPanel.classList.contains('is-visible')) {
          extraDeptPanel.classList.add('is-visible');
          if (deptToggleBtn) {
            deptToggleBtn.setAttribute('aria-expanded', 'true');
            const lbl = deptToggleBtn.querySelector('.toggle-label');
            const icn = deptToggleBtn.querySelector('.toggle-icon');
            if (lbl) lbl.textContent = deptToggleBtn.getAttribute('data-less-text') || 'Show Fewer Departments';
            if (icn) {
              icn.classList.remove('bi-chevron-down');
              icn.classList.add('bi-chevron-up');
            }
          }
        }

        container.querySelectorAll('[data-dept-stage]').forEach(function(item) {
          const itemStage = item.getAttribute('data-dept-stage');
          if (stage === 'all' || itemStage === stage) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  });
});
