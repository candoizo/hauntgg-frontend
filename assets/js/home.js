let format_latest = async (data_url, text_sel) =>
  fetch(data_url)
  .then(res => res.json()).then(res =>  {
    let json = res;
    document.querySelector(text_sel + " #price").innerText = format_range(json);
  });

(async () => {

  // const portal_open = document.querySelector(`section a[href$="opened/"]`);
  // const wearables = document.querySelector(`section a[href$="wearables/"]`);
  // const consumables = document.querySelector(`section a[href$="consumables/"]`);
  // const aavegotchis = document.querySelector(`section a[href$="aavegotchis/"]`);
  // const last_update = document.querySelector(`#updated`);
  // last_update.innerText = last_update.innerText + " " + (Date.now() / Date.now())

  // fetch("/datadir/portals/closed/latest.json")
  //   .then(res => {
  //     let dict = res.json();
  //     document.querySelector(`section a[href$="closed/"]`).innerText = format_range(dict);
  //   });

  Promise.all([
    format_latest("/datadir/portals/closed/latest.json", `section a[href$="closed/"]`),
    format_latest("/datadir/portals/opened/latest.json", `section a[href$="opened/"]`),
    format_latest("/datadir/wearables/latest.json", `section a[href$="wearables/"]`),
    format_latest("/datadir/consumables/latest.json", `section a[href$="consumables/"]`)
  ]);



  // const portals_closed_data = await fetch("/datadir/portals/closed/latest.json")
  //   .then(response => response.json());
  // portal_close.querySelector('#price').innerText = format_range(portals_closed_data);
  // portal_close.querySelector('#value').innerText = format_range(portals_closed_data);
  // portal_close.querySelector('#listing').innerText = portals_closed_data.length;
  // portal_close.classList.remove('animate-pulse');

  // const portals_opened_data = await fetch("/datadir/portals/opened/latest.json")
  //   .then(response => response.json());
  // portal_open.querySelector('#price').innerText = format_range(portals_opened_data);
  // // portal_open.querySelector('#value').innerText = format_range(portals_opened_data);
  // // portal_open.querySelector('#listing').innerText = portals_opened_data.length;
  // // portal_open.classList.remove('animate-pulse');
  //
  // const wearables_data = await fetch("/datadir/wearables/latest.json")
  //   .then(response => response.json());
  // wearables.querySelector('#price').innerText = format_range(wearables_data);
  // // wearables.querySelector('#value').innerText = format_range(wearables_data);
  // // wearables.querySelector('#listing').innerText = wearables_data.length;
  // // wearables.classList.remove('animate-pulse');
  //
  // const consumables_data = await fetch("/datadir/consumables/latest.json")
  //   .then(response => response.json())
  //   .then(json => json);
  // consumables.querySelector('#price').innerText = format_range(consumables_data);
  // consumables.querySelector('#value').innerText = format_range(consumables_data);
  // consumables.querySelector('#listing').innerText = consumables_data.length;
  // consumables.classList.remove('animate-pulse');

})()


let format_range = (dict) => {

  let prices = dict.map(x => x.price);
  let max_price_consume = Math.max(...prices) > 1000 ? Math.max(...prices) / 1000 + "K" : Math.max(...prices);
  let min_price_consume = Math.min(...prices) > 1000 ? Math.min(...prices) / 1000 + "K" : Math.min(...prices);

  return min_price_consume + " - " + max_price_consume

};
