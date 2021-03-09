---
  title: PiHole Access Point
  date: 2019-03-29 17:22:43-0400
  description: Preparing a Linux machine to act as a network router.
  keywords:
    - linux
    - networking
  tags:
    - linux
    - networking
  image: "email.png"
  draft: false
---

A device running Linux serves as a flexible and cost-effective way to analyze and filter connections between an endpoint and clients.

While many features on professional grade routers, like firewall, scheduling, and additional tools. It can be further extended with container technology to share local services seamlessly with imperceptible end-user results.

I have a wired connection I want to make wireless, and https://pi-hole.net is becoming a must have for avoiding ads on mobile, more on this someday.

## Prereqesities

-   MicroSD card, probably 32GB or more
-   An Internet Service Provider
-   Raspberry Pi Zero W/ 3B+ / any computer really
-   A favourite Linux distro

### Outline

1.  Install your preferred operating system! In this guide we'll use a fresh version of [ALArm](https://archlinuxarm.org) or [DietPi](https://DietPi.com), but equivlant tools are supported on every *nix system including an old desktop computer.

2.  Configure `create_ap`, `dhcpcd`, and `pihole` from scratch to serve clean internet.

3.  Reboot, everything turns on, wifi appears, you connect and visit `pi.hole` from any device connected to your software access point.

## Overview

### Hardware Stack

If we consider a traditional router, it comes with ports to connect to the internet source, external waays to be connected using ports / antannae.

A small computer like the Raspberry Pi Zero W is cost-effective and minimally covers many of these basis. There is a MicroUSB power port, another MicroUSB port for peripherals, a wifi chip among the regular guts.

### Software Stack

To retransmit an internet connection, there are a few components that will serve as the crux of our operation. These were chosen for their convienientwidely-supported uncomplicated setup.

A daemon called `hostapd` released in X has been a time-tested proven method of sharing. A hugely-convienient cross-architecture frontend script for it is called `create_ap` that will further simplify things allowing us to use our network interface to broadcast a network.

Another daemon called `dhcpcd` will provide DHCP leases to our clients, this is generally critical to enusre intercommunication and automatic assignment of clients in the network / avoid collision.

Finally we will include a DNS server to streamline / cache requests from the different devices, and while we could pick something like `dnscrypt` or `cloudflared`, they both don't have the pretty awesome web UI. This makes picking up on the same website any device milliseconds faster.

## Configuration

### Fresh System Setup

Installing the packages on ALArm.

```sh
pacman -Syu create_ap dhcpcd dnscrypt-proxy openssh
```

Installing the packages on Debian-based like DietPi/Raspbian.

```sh
apt update && apt install create_ap ssh
```

### Configuring Services

#### **`create_ap`** tldr:

Edit the configuration file that is usually in `/etc/create_ap.conf` to contain details for our new network connection. This will use `hostapd` behind the scenes, and most can be configured using the command line!

```


```

To enable the system automatically at boot, run `systemctl enable create_ap`. You can use `systemctl [start/status] create_ap` to observe if it works.

#### **`dhcpcd`** tldr:

We would like `dhcpcd` to run in the background to manage our network interfaces without intervention. `systemctl enable dhcpcd@[interface name]` or `systemctl enable dhcpcd@eth0` for example can be applied to lal access points which automatically configures this for us.

If we know there is always going to be an interface, we can specify the one that will get internet. `systemctl enable dhcpcd` also does the same.


This is useful because the pihole server


#### **`pihole`** tldr:

We didn't install this yet, but now we will.

Using a specialized DNS client has benefits that are shared by all systems who make use of that DNS server when browsing. Since this is left under the default configuration, we will assign `create_ap` to point our clients to the local dns server on our Raspberry Pi so that we can do awesome things like block ads in complex apps, limited devices like smart tv's, and reguarly understand the health of our network. It's also pretty cool.

```
git clone https://github.com/pihole/pihole
make
install

```

Finally, since assumed a very light setup we will hardcode the `/etc/hosts` to resolve `pi.hole` and `pihole.local` for convienience. Visit devices and you

### Testing the Final Result

Now that you've configured everything, reboot your machine and a wait until the Wi-Fi network apepars on your phone! Enter your password and once connected head over to `http://pi.hole` or `http://pihole.local`.


###### All done! `reboot` and enjoy your new toy.

## Conclusion

With a router running Linux, you have the means to contorl access on connected clients in great detail. Configure a strong password, protect access to your router, and regularly update it to the latest version as necessary. When adding remote access, secure it with a public key.
