/* 🪵 Khashab Page Transition Utility */

export const PageTransition = {
  animate(mainContent, renderFn, initFn) {
    const activeContainer = mainContent.querySelector('.page-container');
    
    if (activeContainer) {
      // Add class to trigger fade out
      activeContainer.classList.add('page-leaving');
      
      // Wait for the fade out transition (250ms)
      setTimeout(() => {
        // Swap content
        renderFn();
        
        // Scroll to top on new page load
        window.scrollTo(0, 0);
        
        // Run init logic for the new page
        if (initFn) {
          initFn();
        }
      }, 250);
    } else {
      // No active container, just render immediately
      renderFn();
      window.scrollTo(0, 0);
      if (initFn) {
        initFn();
      }
    }
  }
};
