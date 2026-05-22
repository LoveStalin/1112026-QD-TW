(function () {
    const BANNER_ID = 'offline-cache-banner';
    const STYLE_ID = 'offline-cache-banner-style';
    const MESSAGE = 'B\u1ea1n \u0111ang offline-trang web \u0111\u01b0\u1ee3c ch\u1ea1y b\u1eb1ng cache \u0111\u00e3 l\u01b0u.';
    const CONNECTION_CHECK_URL = 'https://www.gstatic.com/generate_204';
    const CHECK_TIMEOUT = 2500;
    let offlineByNetworkCheck = false;

    function ensureStyle() {
        if (document.getElementById(STYLE_ID)) return;

        const style = document.createElement('style');
        style.id = STYLE_ID;
        style.textContent = `
            :root {
                --offline-cache-banner-height: 0px;
            }

            body.offline-cache-active {
                --offline-cache-banner-height: 56px;
                padding-top: var(--offline-cache-banner-height);
            }

            body.offline-cache-active .navbar {
                top: var(--offline-cache-banner-height) !important;
            }

            body.offline-cache-active .menu-icon {
                top: calc(30px + var(--offline-cache-banner-height)) !important;
            }

            #offline-cache-banner {
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                right: 0 !important;
                z-index: 2147483647 !important;
                min-height: 56px;
                padding: 14px 18px;
                display: none !important;
                align-items: center;
                justify-content: center;
                text-align: center;
                background: #d98286;
                color: #ffffff;
                border-bottom: 1px solid rgba(255, 255, 255, 0.42);
                box-shadow: 0 6px 18px rgba(0, 0, 0, 0.22);
                font-family: inherit;
                font-size: 16px;
                font-weight: 700;
                line-height: 1.35;
                text-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
            }

            body.offline-cache-active #offline-cache-banner {
                display: flex !important;
            }

            @media (max-width: 520px) {
                body.offline-cache-active {
                    --offline-cache-banner-height: 64px;
                }

                #offline-cache-banner {
                    min-height: 64px;
                    padding: 12px 14px;
                    font-size: 14px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    function ensureBanner() {
        let banner = document.getElementById(BANNER_ID);
        if (banner) return banner;

        banner = document.createElement('div');
        banner.id = BANNER_ID;
        banner.setAttribute('role', 'status');
        banner.setAttribute('aria-live', 'polite');
        banner.textContent = MESSAGE;
        document.body.prepend(banner);
        return banner;
    }

    function updateBanner() {
        ensureStyle();
        ensureBanner();
        document.body.classList.toggle('offline-cache-active', !navigator.onLine || offlineByNetworkCheck);
    }

    function checkConnection() {
        if (!window.fetch || !window.AbortController) {
            updateBanner();
            return;
        }

        const controller = new AbortController();
        const timeout = window.setTimeout(() => controller.abort(), CHECK_TIMEOUT);

        fetch(CONNECTION_CHECK_URL + '?offline-check=' + Date.now(), {
            cache: 'no-store',
            mode: 'no-cors',
            signal: controller.signal,
        }).then(() => {
            offlineByNetworkCheck = false;
        }).catch(() => {
            offlineByNetworkCheck = true;
        }).finally(() => {
            window.clearTimeout(timeout);
            updateBanner();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            updateBanner();
            checkConnection();
        });
    } else {
        updateBanner();
        checkConnection();
    }

    window.addEventListener('online', checkConnection);
    window.addEventListener('offline', function () {
        offlineByNetworkCheck = true;
        updateBanner();
    });
    window.addEventListener('focus', checkConnection);
    window.setInterval(checkConnection, 5000);

    if (navigator.serviceWorker) {
        navigator.serviceWorker.addEventListener('message', function (event) {
            if (event.data && event.data.type === 'OFFLINE_CACHE_USED') {
                offlineByNetworkCheck = true;
                updateBanner();
            }
        });
    }
})();
