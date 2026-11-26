(() => {
    const exp = window.OfficeExperiment;
    if (!exp || !exp.group) return;
    const config = window.OFFICE_CONFIG;
    const consentKey = "office_supply_consent_v1";
    let active = false;
    function track(name) {
        if (!active) return;
        const params = {experiment_group: exp.group, experiment_id: exp.id,
            experiment_eligible: String(exp.eligible)};
        if (typeof window.gtag === "function") gtag("event", name, params);
        if (typeof window.clarity === "function") clarity("event", name);
    }
    function start() {
        if (active) return;
        active = true;
        window.startOfficeClarity();
        const id = config.gaMeasurementId.trim();
        if (id) {
            window.dataLayer = window.dataLayer || [];
            window.gtag = function(){dataLayer.push(arguments);};
            gtag("js", new Date());
            gtag("config", id);
            const script = document.createElement("script");
            script.async = true;
            script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(id);
            document.head.append(script);
        }
        track("experiment_view");
    }
    function readConsent() { try {return localStorage.getItem(consentKey);} catch {return null;} }
    function saveConsent(value) {try {localStorage.setItem(consentKey,value);} catch {}}
    document.querySelector(".add-to-cart-btn")?.addEventListener("click", () => track("purchase_intent"));
    document.querySelector(".add-to-cart-btn-small")?.addEventListener("click", () => track("recommendation_click"));
    if (!config.clarityId.trim() && !config.gaMeasurementId.trim()) return;
    // Mesmo aviso nas duas versões; nenhuma tag externa antes da autorização.
    const panel = document.createElement("aside");
    panel.setAttribute("aria-label", "Preferências de monitoramento");
    panel.style.cssText = "position:fixed;bottom:12px;left:12px;right:12px;z-index:9999;max-width:650px;margin:auto;background:white;color:#222;border:1px solid #aaa;padding:16px;border-radius:8px;font:15px Arial;box-shadow:0 2px 12px #0003";
    panel.innerHTML = '<p>Este protótipo acadêmico usa ferramentas de análise de navegação, cliques e, no Clarity, gravações de sessão. A participação é opcional. Não há compras reais.</p><button type="button" data-choice="yes">Aceitar monitoramento</button> <button type="button" data-choice="no">Recusar</button>';
    const settings = document.createElement("button");
    settings.type = "button"; settings.textContent = "Privacidade";
    settings.style.cssText = "display:block;margin:12px auto;padding:6px;font:13px Arial";
    document.body.append(settings);
    settings.addEventListener("click", () => {if (!panel.isConnected) document.body.append(panel);});
    panel.addEventListener("click", e => {
        const choice = e.target.dataset.choice;
        if (!choice) return;
        saveConsent(choice); panel.remove();
        if (choice === "yes") start();
        else if (active) location.reload();
    });
    if (readConsent() === "yes") start();
    else if (readConsent() !== "no") document.body.append(panel);
})();
