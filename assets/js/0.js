let mm_check = async () => {
  let connect = document.querySelector("#web3connect");
  try {

    let dapp = await window.EntryPoint.common.on_metamask_matic_network;

    if (dapp) {
      connect.innerText = "Metamask + Matic found! Loading live data...";
      metamask_wearable_setup();
    } else {
      throw dapp;
      // connect.innerText = "⁉️ Metamask / Matic not found! want a snapshot?";
      // connect.href="./snapshot/";
      // connect.classList.remove("animate-pulse");
    }

  } catch (e) {

    connect.innerText = "😞 Metamask / Matic not found, want a snapshot?";
    connect.href = "./snapshot/";
    connect.classList.remove("animate-pulse");

  }
};


if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mm_check());
} else {
  // DOM is ready!
  mm_check();
}


let metamask_wearable_setup = () => {

  // do this twice in a then clause
  Promise.resolve(window.EntryPoint.common.get_wearables('listed', 250)).then(
    async x => {

      let listing_array = await window.EntryPoint.common.parse_listing_array(x);
      // console.log("prettified listing info", listing_array);

      // let items = await window.EntryPoint.common.export_items();
      let list = document.querySelector("#list");
      let node = document.querySelector('a#template');

      // let c = 0;
      console.log(await listing_array[0], await listing_array.reverse()[0]);
      listing_array.map(async (listing, index) => {
        let res = await listing;
        // console.log("listing_array res ", res);
        // let clone = node.cloneNode(true);
        // clone.classList.remove("filter");
        //
        // clone.href += res.href;
        // clone.querySelector("img.mainimg").src = "/aavegotchi_images/items/wearables/" + res.type + ".svg"
        // clone.querySelector('#price').innerText = res.price;
        // clone.querySelector("#haunt").innerText = res.rarity;
        // clone.dataset.rarity = res.rarity;
        // clone.dataset.name = res.name;
        // clone.dataset.price = res.price;
        // clone.dataset.quanity = res.quanity;
        // clone.dataset.index = res.href; // lowest listing is oldest
        // // c++;
        // clone.querySelector("h3").innerText = res.name;
        // clone.classList.add(res.rarity)
        // list.appendChild(clone);
        new_thing(res)
      });

      //[...list.children]
      //.sort((a,b)=>parseInt(a.dataset.price) - parseInt(b.dataset.price))


      // for (let i in x) {
      //   let item = x[i];
      //   let listing = await window.EntryPoint.common.parse_listing(item);
      //   let clone = node.cloneNode(true);
      //   clone.classList.remove("filter");
      //   console.log(item);
      //
      //   clone.href = "https://aavegotchi.com/baazaar/erc1155/" + listing.href;
      //   clone.querySelector("img.mainimg").src = "/aavegotchi_images/items/wearables/" + listing.type + ".svg"
      //   clone.querySelector('#price').innerText = listing.price;
      //   clone.querySelector("#haunt").innerText = listing.rarity;
      //   clone.dataset.rarity = listing.rarity;
      //   clone.dataset.name = items[listing.type].name;
      //   clone.dataset.price = listing.price;
      //   clone.dataset.quanity = listing.quanity;
      //   /* clone.dataset.circulation =  */
      //
      //   console.log(listing.type, items[listing.type], listing.rarity);
      //   clone.querySelector("h3").innerText = items[listing.type].name
      //   clone.classList.add(listing.rarity)
      //   list.appendChild(clone);
      // }

      document.querySelector("#web3connect").classList.remove('animate-pulse')
      document.querySelector("#web3connect").innerText = "Metamask + Matic found, using live data!"

    }
  ).then(() => {
    console.log("Successfully loaded! listen for new ones");
    // window.EntryPoint.common.export_new_listings(new_thing);

    window.EntryPoint.common.export_new_listings(new_thing);
  });
}

let invert_list = (e) => {

  let list = document.querySelector("#list");
  if (e)
    [...list.children].reverse().map(node => list.appendChild(node));

}


let wearables_resort = () => {

  let list = document.querySelector("#list");
  let d = document.querySelector("select#sort").selectedIndex;

  // latest listing
  if (d == 0) {

    let sort = [...list.children]
      .sort((a, b) => parseInt(b.dataset.index) - parseInt(a.dataset.index));

    // if (invert) sort = sort.reverse();
    sort.forEach(node => list.appendChild(node));
  }

  // price
  if (d == 1) {
    let sort = [...list.children]
      .sort((a, b) => parseInt(a.dataset.price) - parseInt(b.dataset.price))

    // if (invert) sort = sort.reverse();
    sort.forEach(node => list.appendChild(node));
  }

  let invert = document.querySelector("#invert").checked;
  if (invert) invert_list(invert);

  // else if (d == 1)
  // [...list.children]
  // .sort((a,b)=>parseInt(a.dataset.index) - parseInt(b.dataset.index))
  // .forEach(node=>list.appendChild(node));
}

// let insert_new_wearables


let new_thing = async (res) => {
  console.log('new thing? ', res);

  // make sure its not a potion, or "the void" 👻
  if (window.EntryPoint.common.potion_types().includes(res.type) || res.type == 0) {
    return;
  }

  let list = document.querySelector("#list");
  let node = document.querySelector('a.filter#template'); //avoid grabbing a copied template
  let clone = node.cloneNode(true);
  clone.classList.remove("filter");
  clone.id = res.href;

  clone.href += res.href;
  clone.querySelector("img.mainimg").src = "/aavegotchi_images/items/wearables/" + res.type + ".svg"
  clone.querySelector('#price').innerText = humanize_num(res.price);
  clone.querySelector("#haunt").innerText = res.rarity;
  clone.dataset.rarity = res.rarity;
  clone.dataset.name = res.name;
  clone.dataset.price = res.price;
  clone.dataset.quanity = res.quanity;
  clone.dataset.index = res.href; // lowest listing is oldest
  // c++;
  clone.querySelector("h3").innerText = res.name;
  clone.classList.add(res.rarity);

  // if rarity filter is active, add the .hide mod
  let rarity_filter_opt = document.querySelector("#filter");
  if (
    rarity_filter_opt.value.toLowerCase() !== res.rarity && rarity_filter_opt.selectedIndex > 0
  ) clone.classList.add("hide")

  let insert_at = 0; // usually add to top for latest sort default
  let sort_filter_opt = document.querySelector("#sort");
  if (sort_filter_opt.selectedIndex == 1) {
    // sort by price instead of latest

    // map until you find a price higher than yours, bail, insert
    [...list.children].some((x, index) => {
      console.log('mapping children for price, im', x.dataset, res);
      if (parseInt(x.dataset.price) > parseInt(res.price)) {
        console.log("sorting by price, so inserting this at: ", index)
        return (insert_at = index);
        // return true;

      }
    });
  }

  list.insertBefore(clone, list.children[insert_at]);


  // if (list.children.length > 250) {
  //   list.children[list.children.length].remove();
  //   console.log("removed node because too many!");
  //   // elem.parentNode.removeChild(list.children[list.children.length]);
  // }
}

let humanize_num = (x) => {
  return x > 10000 ? (((x / 1000) * 100) / 100).toFixed(2) + "K" : x;
}
