<script>
  export default {
    name: "header-burger",
  }

  window.addEventListener('load', function () {
    /* ===========================================================================
    * = burger
    * ======================================================================== */

    const body = document.querySelector('body');
    const header = document.querySelector('header');
    const burger = document.querySelector('#burger');
    const overlay = document.querySelector('.header-overlay');
    const navbarItems = document.querySelector('.navbar-items');

    const toggleDrawer = function () {
      const isExpanded = burger.getAttribute('aria-expanded');

      // 處理收合主導覽列選單
      if (isExpanded) {
        body.style.overflow = 'auto';
        navbarItems.style.overflow = 'hidden';
        header.classList.remove('active');
        burger.removeAttribute('aria-expanded');

        whenControlTargetExists(burger, (el) => el.classList.remove('active'));
      }
      // 處理展開主導覽列選單
      else {
        body.style.overflow = 'hidden';
        navbarItems.style.overflow = 'auto';
        header.classList.add('active');
        burger.setAttribute('aria-expanded', true);

        whenControlTargetExists(burger, (el) => el.classList.add('active'));
      }
    };

    burger.addEventListener('click', toggleDrawer);
    overlay.addEventListener('click', toggleDrawer);

    /* ===========================================================================
  * = close navbar items
  * ======================================================================== */
    document.querySelectorAll('#navbar [data-action="close-navbar"]').forEach(item =>
      item.addEventListener('click', toggleDrawer)
    );


    /* ===========================================================================
    * = window resize
    * ======================================================================== */

    const throttledWatchResize = () => {
      const isExpanded = burger.getAttribute('aria-expanded');

      if (isExpanded) {
        toggleDrawer();
      }
    };

    window.addEventListener('resize', throttledWatchResize);

  /* =============================================================================
  * = Helpers
  * ========================================================================== */

  /**
   * 當 HTML 元素之 aria-controls 屬性所指定的目標元素存在時，呼叫 handler
   *
   * @param {HTMLElement} el
   * @param {(element: HTMLElement) => void} handler
   * @returns {void}
   */
  function whenControlTargetExists(el, handler) {
    if (typeof handler !== 'function') {
      throw new TypeError('Argument 2 must be a function');
    }

    const controlsAttr = el.getAttribute('aria-controls');
    if (!controlsAttr) {
      return;
    }

    const target = document.getElementById(controlsAttr);
    if (target) {
      handler(target);
    }
  }
});
</script>

<template>
  <div class="header-burger">
    <div class="burger__box" id="burger" aria-controls="header">
      <span class="burger__bar"></span>
      <span class="burger__bar"></span>
      <span class="burger__bar"></span>
    </div>
  </div>
</template>
