document.addEventListener("DOMContentLoaded", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.scripting.executeScript(
            { target: { tabId: tabs[0].id }, function: analyzePage },
            (results) => {
                if (results && results[0]) {
                    const data = results[0].result;
                    document.getElementById("title").textContent = data.title;
                    document.getElementById("metaDesc").textContent = data.metaDesc;
                    document.getElementById("h1Count").textContent = data.h1Count;
                    document.getElementById("linkCount").textContent = data.totalLinks;
                    document.getElementById("pageSize").textContent = `${data.pageSize} KB`;

                    document.getElementById("jsFrameworks").textContent = data.jsFrameworks;
                    document.getElementById("cssFrameworks").textContent = data.cssFrameworks;
                    document.getElementById("backendTech").textContent = data.backendTech;
                    document.getElementById("cdn").textContent = data.cdnUsed;

                    document.getElementById("httpsCheck").textContent = data.isSecure ? "Yes" : "No";
                    document.getElementById("mixedContent").textContent = data.hasMixedContent ? "Yes" : "No";
                    document.getElementById("csp").textContent = data.cspMeta;
                    document.getElementById("xss").textContent = data.potentialXSS ? "Risky" : "Safe";

                    document.getElementById("totalRequests").textContent = data.totalRequests;
                    document.getElementById("lazyLoading").textContent = data.hasLazyLoading ? "Yes" : "No";
                    document.getElementById("mobileFriendly").textContent = data.isMobileFriendly ? "Yes" : "No";
                    document.getElementById("schemaMarkup").textContent = data.schemaMarkup;

                    document.getElementById("cookieCount").textContent = data.cookieCount;
                    document.getElementById("trackingScripts").textContent = data.trackingScripts;
                    document.getElementById("fingerprinting").textContent = data.hasFingerprinting ? "Yes" : "No";
                    document.getElementById("thirdPartyScripts").textContent = data.thirdPartyScripts;

                    // Display Loaded Resources
                    document.getElementById("loadedResources").textContent = data.totalResources;
                    document.getElementById("totalResourceSize").textContent = `${data.totalResourceSize} KB`;

                    // Check for active service workers
                    if ("serviceWorker" in navigator) {
                        navigator.serviceWorker.getRegistrations().then((registrations) => {
                            document.getElementById("serviceWorkerStatus").textContent = registrations.length > 0 ? "Active" : "Inactive";
                        });
                    }

                    // Check for WebAssembly support
                    document.getElementById("webAssemblyStatus").textContent = window.WebAssembly ? "Supported" : "Not Supported";
                }
            }
        );
    });
});

function analyzePage() {
    const resources = performance.getEntriesByType("resource");
    const totalResourceSize = Math.round(resources.reduce((total, res) => total + (res.transferSize || 0), 0) / 1024);

    return {
        title: document.title,
        metaDesc: document.querySelector('meta[name="description"]')?.content || "Not found",
        h1Count: document.querySelectorAll("h1").length,
        totalLinks: document.querySelectorAll("a").length,
        pageSize: totalResourceSize,

        jsFrameworks: !!window.__REACT_DEVTOOLS_GLOBAL_HOOK__ ? "React" : "Unknown",
        cssFrameworks: document.querySelector('[class*="container"]') ? "Bootstrap" : "Unknown",
        backendTech: "Unknown (client-side cannot detect)",
        cdnUsed: [...document.querySelectorAll("script[src], link[href]")].some(el => el.src?.includes("cdn") || el.href?.includes("cdn")) ? "Yes" : "No",

        isSecure: window.location.protocol === "https:",
        hasMixedContent: [...document.querySelectorAll("script, img")].some(el => el.src?.startsWith("http:")),
        cspMeta: document.querySelector('meta[http-equiv="Content-Security-Policy"]')?.content || "Not found",
        potentialXSS: [...document.querySelectorAll("input, textarea")].some(input => input.outerHTML.includes("onerror")),

        totalRequests: performance.getEntriesByType("resource").length,
        totalResources: resources.length,
        totalResourceSize,

        hasLazyLoading: document.querySelectorAll("img[loading='lazy']").length > 0,
        isMobileFriendly: window.matchMedia("only screen and (max-width: 768px)").matches,
        schemaMarkup: document.querySelector('script[type="application/ld+json"]') ? "Yes" : "No",

        cookieCount: document.cookie.split(";").length,
        trackingScripts: document.querySelector('script[src*="google-analytics.com"]') ? "Found" : "None",
        hasFingerprinting: !!navigator.deviceMemory || !!navigator.hardwareConcurrency,

        thirdPartyScripts: Array.from(document.querySelectorAll('script[src]'))
            .filter(script => !script.src.includes(window.location.hostname)).map(script => script.src).join(", "),

        activeWebSockets: (window.WebSocket
            ? (() => {
                  const websockets = [];
                  window.WebSocket = (...args) => {
                      websockets.push(new window.WebSocket(...args));
                      return websockets[websockets.length - 1];
                  };
                  return websockets.length > 0 ? "Active" : "None";
              })()
            : "None"),

        webAssembly: window.WebAssembly ? "Supported" : "Not Supported"
    };
}
