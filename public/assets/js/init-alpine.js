function data() {
  function getThemeFromLocalStorage() {
    // if user already changed the theme, use it
    if (window.localStorage.getItem('dark')) {
      return JSON.parse(window.localStorage.getItem('dark'));
    }

    // else return their preferences
    return (
      !!window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    );
  }

  function setThemeToLocalStorage(value) {
    window.localStorage.setItem('dark', value);
  }

  return {
    dark: getThemeFromLocalStorage(),
    toggleTheme() {
      this.dark = !this.dark;
      setThemeToLocalStorage(this.dark);
    },
    isSideMenuOpen: false,
    toggleSideMenu() {
      this.isSideMenuOpen = !this.isSideMenuOpen;
    },
    closeSideMenu() {
      this.isSideMenuOpen = false;
    },
    isNotificationsMenuOpen: false,
    toggleNotificationsMenu() {
      this.isNotificationsMenuOpen = !this.isNotificationsMenuOpen;
    },
    closeNotificationsMenu() {
      this.isNotificationsMenuOpen = false;
    },
    isProfileMenuOpen: false,
    toggleProfileMenu() {
      this.isProfileMenuOpen = !this.isProfileMenuOpen;
    },
    closeProfileMenu() {
      this.isProfileMenuOpen = false;
    },
    isSnippetsOpen: false,
    toggleSnippets() {
      this.isSnippetsOpen = !this.isSnippetsOpen;
    },
    closeSnippets() {
      this.isSnippetsOpen = false;
    },
    isMobileSnippetsOpen: false,
    toggleMobileSnippets() {
      this.isMobileSnippetsOpen = !this.isMobileSnippetsOpen;
    },
    closeMobileSnippets() {
      this.isMobileSnippetsOpen = false;
    },
    isFilterOpen: false,
    toggleFilter() {
      this.isFilterOpen = !this.isFilterOpen;
    },
    closeFilter() {
      this.isFilterOpen = false;
    },
    isTemplatesOpen: false,
    toggleTemplates() {
      this.isTemplatesOpen = !this.isTemplatesOpen;
    },
    closeTemplates() {
      this.isTemplatesOpen = false;
    },
    isMobileTemplatesOpen: false,
    toggleMobileTemplates() {
      this.isMobileTemplatesOpen = !this.isMobileTemplatesOpen;
    },
    closeMobileTemplates() {
      this.isMobileTemplatesOpen = false;
    },
    isThemesOpen: false,
    toggleThemes() {
      this.isThemesOpen = !this.isThemesOpen;
    },
    closeThemes() {
      this.isThemesOpen = false;
    },
    isMobileThemesOpen: false,
    toggleMobileThemes() {
      this.isMobileThemesOpen = !this.isMobileThemesOpen;
    },
    closeMobileThemes() {
      this.isMobileThemesOpen = false;
    },
    isProfileMenuOpen: false,
    toggleProfileMenu() {
      this.isProfileMenuOpen = !this.isProfileMenuOpen;
    },
    closeProfileMenu() {
      this.isProfileMenuOpen = false;
    },
    isPagesMenuOpen: false,
    togglePagesMenu() {
      this.isPagesMenuOpen = !this.isPagesMenuOpen;
    },
    // Modal
    isModalOpen: false,
    trapCleanup: null,
    openModal() {
      this.isModalOpen = true;
      this.trapCleanup = focusTrap(document.querySelector('#modal'));
    },
    closeModal() {
      this.isModalOpen = false;
      this.trapCleanup();
    },
    /* Tab Menus */
    activeTab: 0,
    homeTabs: ['All', 'UI Kits', 'Templates', 'Snippets', 'Themes'],
    themeTabs: [
      'All',
      'Dashboards',
      'Ecommerce',
      'News',
      'Landing pages',
      'Listing',
    ],
  };
}
