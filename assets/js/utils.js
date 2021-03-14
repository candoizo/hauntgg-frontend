let humanize_num = (x) => {
  return x > 10000 ? (((x / 1000) * 100) / 100).toFixed(2) + "K" : x;
}
