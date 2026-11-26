(() => {
    const key = "office_supply_ab_v1";
    let assignment = null;
    try {
        assignment = localStorage.getItem(key);
        if (document.body.hasAttribute("data-experiment-entry")) {
            if (!["A", "B"].includes(assignment)) {
                assignment = Math.random() < 0.5 ? "A" : "B";
                localStorage.setItem(key, assignment);
            }
            location.replace(assignment === "A" ? "./controle/" : "./variante/");
            return;
        }
    } catch (error) {
        const status = document.getElementById("status");
        if (status) status.textContent = "Não foi possível guardar seu grupo. Use os links de demonstração abaixo.";
    }
    const group = document.body.dataset.experimentGroup;
    window.OfficeExperiment = {
        group,
        id: key,
        // Visitas sem atribuição ou a uma versão diferente ficam fora da análise.
        eligible: ["A", "B"].includes(group) && assignment === group
    };
})();
