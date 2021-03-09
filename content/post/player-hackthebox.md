---
  title: "HackTheBox: Player"
  date: 2019-11-29 17:22:43-0400
  description: Preprating a Nintendo Switch for security research.
  tags:
  - hackthebox
  - security
  image: "email.png"
  draft: false
---

The Switch has been the best-selling console since it's inception and for Security™️ reasons, we'll obtain root using the public fusee-loader exploit. Once I got to play Smash on somebody's copy and it lit a unquenchanle fire of desire for a Nintendo Switch. After I bought one I needed to justify the expense, also it can't play videos which is a pretty serious drawback.

## Steps

1. Find an non-patched older model off secondhand markets like eBay and check this site
2. Buy an RCM jig, large micro SD card, usb-c cable to connect to your computer
3. Download the fusee-loader payload

**i.** went pretty well despite a scratch on the screen I can never unsee, in the dock life is good.
**ii.** Amazon one day shipping because I was a bit too excited.
**iii.** [sdsetup.com](https://sdsetup.com) and [switch.homebrew.guide](https://switch.homebrew.guide)

## Background

I thought it was interesting how the Tegra thing of entering the update mode is not so differnet from the iOS.

## Plan of attack

1. Turn off the Switch completely, remove the right joycon, insert the RCM jig
2. Leave jig in until after the exploit is run, for now hold volume up, press power
3. On computer install fusee-loader, execute that
4. Awesome boot screen pops up! Remove jig.

Now with root on the Switch, it's possible to load custom code on it.

Checking awesome sites on reddit.com leads us to this weird site. Lets compile something to check how serious we are.
