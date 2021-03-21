const erc721 = require('./src/erc721');
const mm = require('./src/metamask');
// const mm = import("./src/metamask");
// import * as mm from "./src/metamask";

let image_queue = [];

module.exports = {
  mm_check: async (cb) => {
    try {
      let dapp = await mm.detectEthereumProvider();
      if (dapp) {
        let res = await mm.on_metamask_matic_network();
        if (res) {
          module.exports.update_connect("Metamask + Matic found! Loading live data...");
          // console.log("connected!");
          cb(); // if on matic, run the setup func
        }
      } else {
        throw dapp;
      }

    } catch (e) {
      let connect = document.querySelector("#web3connect");
      if (connect) {
        connect.innerText = "😞 Metamask / Matic not found, try a snapshot?";
        connect.href = "./snapshot/";
        connect.classList.remove("animate-pulse");
        connect.classList.add("border");
      } else console.log("tried to mm check, could find the web3 connect btn");
    }
  },

  update_connect: (arg) => {
    let connect = document.querySelector("#web3connect");
    connect.textContent = arg;
  },

  // chunk_iter: (list, chunkSize) => [...Array(Math.ceil(list.length / chunkSize))].map((_, i) => list.slice(i * chunkSize, i * chunkSize + chunkSize)),

  list_sel: () => document.querySelector("#list"),
  humanize_num: (x) => {

    // if (x % x.toFixed(0)) {
    //   // no trailing numbers
    // }

    // bigger than 10K, make tinier
    // return x > 10000 ? (((x / 1000) * 100) / 100).toFixed(2) + "K" : x;

    let many_thou = x > 9999;
    let num = (((x / 1000) * 100) / 100).toFixed(2);
    num = parseFloat(num); // removes any trailing zeros
    // if (many_thou) num += "K";
    return many_thou ? num + "K" : parseFloat(x);


    // let pretty_num = x > 10000 ? (((x / 1000) * 100) / 100).toFixed(2) + "K" : x;
    //
    // let price = parseFloat(module.exports.humanize_num(res.price));
    // if (price[price.length - 1] === "K") price += "K";


  },
  invert_list: (list) => {
    if (list.children.length > 1) // list should be an interatble element with .children property
      [...list.children].reverse().map(node => list.appendChild(node));
  },
  rarity_filter: (e) => {
    console.log("rarity_filter", e);
    let list = module.exports.list_sel();
    [...list.children].map(x => {
      console.log(x.dataset);
      if (x.dataset.rarity.toLowerCase() === e.toLowerCase() || e.toLowerCase() === "all")
        x.classList.remove("hide")
      else x.classList.add("hide")
    })
  },

  search_filter: (e) => {
    console.log("Search filter", e);

    let list = module.exports.list_sel();
    [...list.children].map(x => {
      if (e.length > 0 && !x.dataset.name.toLowerCase().includes(e.toLowerCase()))
        x.classList.add("notsearched")
      else x.classList.remove("notsearched")
    });

    let select_rarity = document.querySelector("select#filter").value;
    // if (select_rarity.toLowerCase() !== "all")
    module.exports.rarity_filter(select_rarity)

  },

  smart_sort: (sortby) => {

    let invert = document.querySelector("#invert").checked;
    console.log("smart_sort this list by: ", sortby, "should invert?", invert);
    let list = module.exports.list_sel();
    let nodes = [...list.children];
    if (nodes)
      nodes.sort((a, b) => parseFloat(a.dataset[sortby]) - parseFloat(b.dataset[sortby]));

    // @TODO: fix this reverse sort check after
    // // by default we would sort high index on top because newer
    // if (sortby === "price" || sortby === "number") // same for "number" in portal section
    //   nodes.reverse(); // we want to sort low by default with price
    //
    // let invert = document.querySelector("#invert").checked;
    // if (invert) nodes.reverse()
    // // i could cancel out the reverse

    if (invert || sortby === "href" && !invert) nodes.reverse()

    nodes.map(node => list.appendChild(node));

  },
  new_listing: async (res) => {

    console.log('new_listing response: ', res);
    let list = module.exports.list_sel();
    let node = document.querySelector('a#template'); //avoid grabbing a copied template


    let clone = node.cloneNode(true);
    // clone.classList.remove("filter");
    clone.id = res.number; //if this breaks, set items to href and number to gotchis
    clone.href += res.href;
    let price = module.exports.humanize_num(res.price);
    clone.querySelector('#price').textContent = price;
    Object.entries(res).map(x => {
      clone.dataset[x[0]] = x[1];
    });

    // if added during search, comes out hidden
    let search = document.querySelector("#search");
    if (search) {
      search = search.value
      if (search.length > 0) {
        if (!clone.dataset.name.toLowerCase().includes(search.toLowerCase())) {
          console.log("new item doesnt match search query, adding hidden");
          clone.classList.add("notsearched");
        }
      }
    }

    let rarity_filter = document.querySelector("#filter");
    if (rarity_filter) {
      if (rarity_filter.value) {
        if (
          rarity_filter.value.toLowerCase() !== clone.dataset.rarity &&
          rarity_filter.selectedIndex > 0
        ) {
          console.log("new item doesnt match filter, adding hidden");
          clone.classList.add("hide")
        }
      }
    }

    let class_list = clone.classList; //[...clone.classList];
    if (
      class_list.contains("opened") || class_list.contains("closed")
    ) {
      console.log("portal", res);
      clone.querySelector("h3").textContent += res.number;

    } else if (
      class_list.contains("aavegotchis")
    ) {
      // clone.querySelector("h3").textContent += `(${res.number})`;
      if (res.name.length > 0)
        clone.querySelector("h3").textContent = res.name + ` (${res.number})`;
      else
        clone.querySelector("h3").textContent += ` (${res.number})`;
      clone.classList.add(res.rarity);
      clone.querySelector("#brs").textContent = res.mrs == res.brs ? res.brs : `${res.mrs} (${res.brs})`
    } else if (
      class_list.contains("consumables") || class_list.contains("wearables")
      // || class_list.includes("rarity")
    ) {
      clone.querySelector("h3").textContent = res.name;
      clone.querySelector("#haunt").innerText = res.rarity;
      let img = clone.querySelector("img.mainimg");
      img.src += img.dataset.src + res.type + ".svg"
      clone.classList.add(res.rarity);
    } else if (
      class_list.contains("tickets")
      // || class_list.includes("rarity")
    ) {
      let rarity = "Common";
      if (res.type == 1) rarity = "Uncommon";
      else if (res.type == 2) rarity = "Rare"
      else if (res.type == 3) rarity = "Legendary"
      else if (res.type == 4) rarity = "Mythical"
      else if (res.type == 5) rarity = "Godlike"
      clone.querySelector("h3").textContent = `${rarity} TICKET`;
      clone.classList.add(rarity);
      clone.dataset.rarity = rarity;
      let img = clone.querySelector("img.mainimg");
      img.src += img.dataset.src + rarity.toLowerCase() + ".svg"

    }

    // no rarity for portals yet. @todo for open portals maybe
    // // if rarity filter is active, add the .hide mod
    // let rarity_filter_opt = document.querySelector("#filter");
    // if (
    //   rarity_filter_opt.value.toLowerCase() !== res.rarity && rarity_filter_opt.selectedIndex > 0
    // ) clone.classList.add("hide")


    let insert_at = 0; // usually add to top for latest sort default

    let sort = document.querySelector("#sort");
    console.log('sorting by:', sort.value);
    if (sort.value.toLowerCase() !== "href") {
      // sorting by different value than latest
      [...list.children].some((x, index) => {
        // console.log('mapping children for price, im', x.dataset, res);
        if (parseFloat(x.dataset[sort.value]) > parseFloat(res[sort.value])) {
          console.log("sorting by price, so inserting this at: ", index)
          return (insert_at = index);
          // return true;

        }
      });
    }
    // if (sort_filter_opt.selectedIndex == 1) {
    //   // sort by price instead of latest
    //
    //   // map until you find a price higher than yours, bail, insert
    //   [...list.children].some((x, index) => {
    //     console.log('mapping children for price, im', x.dataset, res);
    //     if (parseInt(x.dataset.price) > parseInt(res.price)) {
    //       console.log("sorting by price, so inserting this at: ", index)
    //       return (insert_at = index);
    //       // return true;
    //
    //     }
    //   });
    // }


    list.insertBefore(clone, list.children[insert_at]);

  },

  dapp_setup: async (lib_type, list_type, list_status, list_count, list_callback) => {

    // list type goes from 0-3 int
    // on erc721 its closed portal, pending open, open portals, aavegotchi
    // on erc1155 its wearables, badge, consumable I FORGET CUS TIRED DOUBLECHECK
    let lib = window.EntryPoint[lib_type];
    console.log("calling ", lib_type, "get_listings", list_type, list_status, list_count);
    let feed = await lib.get_listings(list_type, list_status, list_count); // allow it to pull using the categorys / number

    let array = await lib.parse_listing_array(feed);

    // so erc721 listings fill the array in  order
    // but erc1155 listings are in proper order
    // so i need to reverse only the 721.
    // or the other way around, dunno if it matters
    // if (lib_type.toLowerCase() === "erc721" || lib_type.toLowerCase() === "erc1155")
    //   array.reverse();


    // when sorted by latest, reverse the order
    array.map(async listing => list_callback(await listing));
    // module.exports.invert_list(module.exports.list_sel());

    // takes method and calls it with original category #
    lib.export_new_listings(list_type, list_callback);

    setTimeout(() => {
      if (list_type == 3 && lib_type.toLowerCase() === "erc721") {
        //gotchis
        module.exports.load_gotchis();
      } else if (lib_type.toLowerCase() === "erc1155" || lib_type.toLowerCase() === "erc721" && list_type == 3) {
        module.exports.invert_list(module.exports.list_sel());
        // module.exports.smart_sort()
      }
    }, 1800);

    let connect = document.querySelector("#web3connect");
    connect.textContent = "Metamask + Matic found! Live data loaded!";
    connect.classList.remove("animate-pulse");

  },

  load_gotchis: async () => {

    function methodThatReturnsAPromise(id) {
      return new Promise(async (resolve, reject) => {

        // to force a delay
        // setTimeout(
        // async () => {
        let row = document.querySelector(`a[id="${id}"]`);
        let svg = await erc721.get_svg(parseInt(id));
        row.dataset.loaded = 1;
        row.querySelector("svg.mainimg").innerHTML = svg.replace(/gotchi/gi, "gotchi" + id);
        // if (dict.name.length > 0)
        // row.querySelector("h3").textContent = dict.name + ` (${id})`;
        resolve(svg);
        // row.querySelector("#brs").textContent = dict.mrs == dict.brs ? dict.brs : `${dict.mrs} (${dict.brs})`
        // }
        // , 50);


      });
    }

    let list = module.exports.list_sel();
    let indexes = [...list.children].map(x => {
      if (!x.dataset.loaded) return x.dataset.number
    }).filter(item => item !== undefined);
    console.log(indexes);
    let result = indexes.reduce((accumulatorPromise, nextID) => {
      return accumulatorPromise.then(() => {
        return methodThatReturnsAPromise(nextID);
      });
    }, Promise.resolve());


  }


}
