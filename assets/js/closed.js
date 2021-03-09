(async () => {
  console.log("Closed.js loaded!");

  let portals_closed_data = await fetch("/datadir/portals/closed/latest.json")
    .then(response => response.json());

  // something like query if then do dx
  portals_closed_data.sort((a, b) => a.index - b.index);

  let list = document.querySelector("#list");
  let template = list.querySelector("#template");

  portals_closed_data.map(x => {
    console.log("Portal data:", x);

    let clone = template.cloneNode(true);
    // clone.href = x.
    clone.querySelector("h3").innerText = `Unopened Portal ${x.index}`
    clone.href = x.href

    let price = x.price > 10000 ? (((x.price / 1000) * 100) / 100).toFixed(2) + "K" : x.price;

    clone.querySelector("#price").innerText = price
    clone.querySelector("#haunt").innerText = `👻 Haunt ${x.haunt}`

    list.append(clone);
    clone.classList.remove("hidden")

  })

})()
