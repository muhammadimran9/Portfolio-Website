// Analytics Tracker for Portfolio
(function() {
    'use strict';
    
    // Track page view
    function trackPageView() {
        const currentPage = window.location.pathname;
        const pageTitle = document.title;
        
        // Update page views
        const pageViews = parseInt(localStorage.getItem('total_pageviews') || '0') + 1;
        localStorage.setItem('total_pageviews', pageViews.toString());
        
        // Track unique visitors
        const visitorKey = 'portfolio_visitor';
        if (!localStorage.getItem(visitorKey)) {
            localStorage.setItem(visitorKey, Date.now().toString());
            const visitors = parseInt(localStorage.getItem('total_visitors') || '0') + 1;
            localStorage.setItem('total_visitors', visitors.toString());
        }
        
        // Track session
        const sessionKey = 'portfolio_session';
        if (!sessionStorage.getItem(sessionKey)) {
            sessionStorage.setItem(sessionKey, Date.now().toString());
            const sessions = parseInt(localStorage.getItem('total_sessions') || '0') + 1;
            localStorage.setItem('total_sessions', sessions.toString());
        }
        
        // Track page-specific data
        const pageData = JSON.parse(localStorage.getItem('page_data') || '{}');
        pageData[currentPage] = (pageData[currentPage] || 0) + 1;
        localStorage.setItem('page_data', JSON.stringify(pageData));
        
        console.log('Analytics tracked:', {
            page: currentPage,
            title: pageTitle,
            totalPageViews: pageViews
        });
    }
    
    // Initialize tracking when page loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', trackPageView);
    } else {
        trackPageView();
    }
})();