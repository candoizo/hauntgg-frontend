---
  title: "Switch Jailbreak Walkthrough"
  date: 2020-11-29 17:22:43-0400
  description: Preprating a Nintendo Switch for security research.
  tags:
  - switch
  - jailbreak
  image: "email.png"
  draft: false
---

The Nintendo Switch has been the best-selling console since it's inception and for security reasons I had no choice but to buy one not because its like pretty cool, so now lets justify it by getting root with the fusee-loader exploit.

<!-- ## Backstory

I spent about 2 years watching eBay and missing out on a few until I finally picked up a copy. I sent the joycons in for repair and realized wow I need more things than a USB-C cable to hack this... -->

## Pre-requisites

First, I read that it's generally not advised to connect online when using custom firmware. Not my rule, but I like singleplayer games so no problem.

![Player Logo](../images/switch-1.jpg)

- ($400) **Unpatched** Nintendo Switch
- ($50) MicroSD card, preferably 64GB+ and **rated A2**
- ($10) Recovery Mode (RCM) **Jig** since we aren't brave
- ($5) **USB-C** cable that plugs into a computer
- Payloads, launcher


### Preparing the MicroSD card

1. Visit [sdsetup.com](https://sdsetup.com) for basic advice.
2. Mount the MicroSD card,


### Booting to custom firmware

1. Plug the device in and press the power off button
2. Entery Recovery Mode:
    1. Insert the RCM jig on the **right-hand** side
    1. Hold **volume up button**
    1. Press **power button** while holding volume button
3. Run `fusee-loader -p ./payload` to exploit
4. Cool bootloader screen pop up, remove jig and enjoy the firmware!

## Precautions

It's advised in [switch.homebrew.guide](https://switch.homebrew.guide) to make a backup, and I think it's important enough to warrant summing up here.

### Installing OpenSSH


## Restoring to original firmware

If you mess up, the backup is supposed to create a reliable point you can restore at.
