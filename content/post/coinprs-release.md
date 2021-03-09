---
  title: "Project Release: coinprs"
  date: 2021-01-30 17:22:43-0400
  description: Preprating a Nintendo Switch for security research.
  tags:
  - rust
  - cli
  image: "email.png"
  draft: false
---

# Coinprs 💰

A fast config-driven cryptocurrency portfolio tracker written in Rust.

## Features

-   Track hundreds of token prices with CoinGecko API (thanks! 🐍).
-   YAML/TOML/JSON Configuration files.
-   Output information report.
-   Suitable for cli / stdio / cronjobs.
-   Cross-platform for armhf, amd64, aarch64

## Installation

Cargo: `cargo install coinprs`

See below to build from source using `docker`!

## Usage

By default we check for a file named `coinprs.[yml/yaml/toml/json]` in the current directory `.`, the user's home `$HOME`, and finally `$HOME/.config/`.

**Example Yaml Configuration:**

```yml
currencies:
  - btc # default
  - usd # default
  - cad

assets: # an array of assets
  sort: alpha # default
  reverse_sort: false # default
  decimals: 3 # default for all assets

  - custom_name: bitcoin #name of coin
    amount: 0.02007 # amount owned
    decimals: 2 # override for this asset

  - ethereum: eth #
    amount: 3.14

  - ethereum_classic: etc

  - custom_name2: dogecoin
    amount: 42069
    decimals: 6
```

See this same example written in [json](./json) or [toml](./toml)!

**Examples:**

Print out and (-s)ave a status report of the configured portfolio.

```sh
coinprs report -s

Saved to $PWD/coinprs.2020-01-31.14.36.55.txt
```

Check the price of Bitcoin.

```sh
coinprs price bitcoin
```

## Documentation

```yml
currencies: # array of ISO currency identifies
  - btc # default
  - usd # default

assets: # array of tracked coins / assets

  # decimals can be set for all currencies here, or individually
  decimals: 3 # default

  # options: < alpha(default), price, value >
  sort: alpha # default
  reverse_sort: false # default


  - name: bitcoin # token to track
    amount: 0.23 # amount of token owned
    decimals: 3 # individual decimal

```

## @TODO

-   More modular
-   Web interfacing
-   Streaming updates

## Build

This project can be built from source using a docker container.

```bash
git clone https://gitlab.com/candoizo/coinprs
cd coinprs/docker && docker-compose build
```



## Credits

Prices are powered by CoinGecko, how generous!

## License

To be determined...
