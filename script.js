
async function searchExercises() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const res = await fetch("egzersizler.json");
    const exercises = await res.json();

    const filtered = exercises.filter(ex => 
        ex.ad.toLowerCase().includes(input) ||
        ex.kas_grubu.toLowerCase().includes(input) ||
        ex.etiketler.some(tag => tag.includes(input))
    );

    const results = document.getElementById("results");
    results.innerHTML = "";
    filtered.forEach(ex => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `<h3>${ex.ad} (${ex.puan}/10)</h3>
                          <p><strong>Kas Grubu:</strong> ${ex.kas_grubu}</p>
                          <p><strong>Hedef:</strong> ${ex.hedef}</p>
                          <p><strong>Set:</strong> ${ex.set}, <strong>Tekrar:</strong> ${ex.tekrar}</p>
                          <p><strong>Dinlenme:</strong> ${ex.dinlenme}</p>
                          <p>${ex.aciklama}</p>`;
        results.appendChild(card);
    });
}

window.onload = async function() {
    const res = await fetch("planlar.json");
    const plans = await res.json();
    const plansList = document.getElementById("plansList");

    plans.forEach(plan => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${plan.ad}</strong>: ${plan.aciklama}`;
        plansList.appendChild(li);
    });
};
