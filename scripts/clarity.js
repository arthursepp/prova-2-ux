window.startOfficeClarity = () => {
    const id = window.OFFICE_CONFIG.clarityId.trim();
    if (!id || window.clarity) return;
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window,document,"clarity","script",id);
    clarity("set", "experiment_group", OfficeExperiment.group);
    clarity("set", "experiment_id", OfficeExperiment.id);
    clarity("set", "experiment_eligible", String(OfficeExperiment.eligible));
};
