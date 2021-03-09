---
  title: "Lightning Node Setup"
  date: 2019-08-13 17:22:43-0400
  description: Preprating a Nintendo Switch for security research.
  tags:
  - bitcoin
  - lightning
  image: "email.png"
  draft: false
---

After a few months spent spinning up Lightning Network nodes and launching a routing-focused one, I've come to settle on a generalized setup that worked well enough. There's many backends to choose amongst `eclair`, `c-lightning` and `lnd`, this one will assume you already have setup a `bitcoind` node and mainly cover `lnd`.

## Preqrequesisites

Running a Lightning Node is relatively expensive, complicated, and comes with risks. I would not want my mom to deal with the stress of running a lightning node long term, even if she followed these steps to do so because it's still a bit too easy to lose money, it has huge costs related to the channel ecosystem, and it's more convienient to be a client of a Lightning Node / Wallet rather than run your own. Anyways:

-   24/7 uptime server running Linux
-   Static IP address preferreable
-   500+ gigabytes of storage (or more on yearlong timescales for the bitcoin blockchain data)
-   Proficient debugging / container administration knowledge / or ready to lose some funds!

## Outline

On our machine running Linux with a full `bitcoind` blockchain synced we'll take these steps.

1.  Clone `lnd` and build it from source.
2.  Configure `lnd` to find our `bitcoind` data.
3.  Create a `systemd` service file to keep it running.
4.  Confirm the node is reachable.

## Glossary

Some terms that will be used a ton in the next section to cover the main events / details.

**Lightning Network**: A second-layer protocol built off the bitcoin blockchain which enables near-instant zero-confirmation transactions.

**Lightning Nodes**: These are other instances of the Lightning Network implementation, potentially other `lnd`'s but also the aforementioned `eclair` and `c-lightning` have different minimum requirements.

**Lightning Channels**: A multisig address containing bitcoin linking two nodes and providing liquid capital.

**Open channel**: Locking up capital in an on-chain transaction with another Lightning Node is referred to as opening a channel. It involves sending an on-chain transaction to a multisig address between both nodes and acts as the arbitrator of the channel's lifetime.

**Channel capacity**: Refers to the amount of Bitcoin locked up in a channel, there are two sides to a channel (opener and openee), and subseqently two types of capacitys: incoming and outgoing.

**Outgoing capacity**: The amount of Bitcoin you have to spend, when you open a channel you will start with a complete balance of outgoing capcacity until you begin to send funds over it.

**Incoming capacity**: As a channel opener you get outgoing capacity, which is equivlantly incoming capacity to the channel peer. With more incoming capcity, it adds more network routes and makes accepting payment easier.

**Close channel**: Closing a channel distributes the Bitcoin back to both nodes. Incoming capcity is passed onto the peer which reqpresents payments that have routed for you, while outgoing capacity is returned back on-chain for use in later channel opens.

**Force close**: When you or a peer goes offline it becomes impossible to co-ordinate a channel close between both parties. Either party can initiate a force close which acts as an emergency level to disperse funds at a much higher transaction fee.

## Node Motivations

There can be many reasons for using the Lightning Network, some of which overlap with reasons to manage your own node.

- If you just want to make fast payments
- Save money by paying miniscule fees

Then it's great to use the Lightning Network for thse purposes, but running a node will incur high costs at this stage that make operations generally unprofitable. If you're ready to splurge on setting up a node, then by all means lets get started but expect the operation to cost rather than earn.

## Setup

In terms of "easiest setup" btcpayserver is probably the most reliable. If you had long term plans on running it, this is what you'd pick to safe most of the effort. It also makes it pretty easy to switch between `c-lightning` or `lnd`.

```bash
$ git clone https://github.com/btcpayserver/btcpayserver-docker
$ cd btcpayserver-docker
$ ./btcpay-setup.sh
```

For a more barebones edition like on a microcomputer that you already have bitcoind setup (or you're doing it remotely)

```cmd
$ git clone https://github.com/LightningEngineering/lnd
$ docker build -t localhost/lnd .
```

Now configure `lnd.conf`, the minimal necessary is probably:

```ini
[mainnet]
rpc.bind=0.0.0.0:9735
```

Excellent, now create our `lnd.service` file for systemd

```ini
[Unit]
Description=An awesome lightning network daemon!
Wants=bitcoind.service

[Service]
ExecStart=/usr/bin/lnd


```

Start everything with `systemctl start lnd` and hope things work well.

## Controlling Your Node

Now that we have our programs running without errors and hopefully synced, we need to send commands to our node so we can open channels, send payments, and other cool things.


Two of my favourite tools for interacting with a node are `bos` by Alex Bosworth, and RideTheLightning/RTL.


## Channel theory

Opening channels helps the network and can earn you funds. The dynamic nature of the network means it is also possible to have channels that are more appealing to payments than others, due to routing distance, fees, response time.

Channels are the foundation upon which the Lightning Network is built on. By getting channels we can accept payments, send payments, earn routing fees. When our channels are not doing these things they are less useful. While it's not a system to rush, as you accumlate channels it becomes more effictive to transfer captial out of low-use channels and into better-

## Node Maintenence

Using a cli tool or web interface is the easiest way to check the status of your node.

## Final Thoughts

While the Lightning Network is awesome, it does not seem to have much incentive. The case of needing to put in all the captial upfront is a pain point. I am optimistic that Lightning Network will overtake tradition on-chain transactions for bitcoin-accepting merchants, due to cost constraints.
