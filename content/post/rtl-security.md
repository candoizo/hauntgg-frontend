---
title: "RideTheLightning Security Review"
date: 2021-01-03 17:22:43-0400
description: RideTheLightning vulnerability research
tags:
- web
- security
image: "email.png"
draft: false
---

[RideTheLightning](https://github.com/Ride-The-Lightning/RTL) (RTL) is an awesome Node/Express web app for [Lightning Network](https://lightning.network) (LN) nodes. It supports full channel management, multiple backends, a robust suite of features, and minimal overhead. If you want to control your node and do not have a keyboard, the web interface is a winning solution for any device with a browser. For these reasons it's easy to find many web-facing instances of them, and it's even included as the default LN option for BTCPayServer.

Over the winter I noticed some security risks affecting versions up to 0.10.1 in RTL that I reported and were fixed in version 0.11.0. Here's a summary of the findings that have been addressed.

## Authenticated Code Execution

`/updateUISettings` accepts a GET request without sanitizing the input of many. An attacker can supply Javascript objects which gives them remote control over the system.

Reverse shell example:

## Sensitive Information Leak

There is no protection to `/rtl/api/conf/rtlconf` endpoint, allowing an attacker to potentially disclose information about IP's even behind a reverse proxy. It's not uncommon to see RTL included as part of a network accessible through Tor as implemented by BTCPayServer. In thanks to container technologies they do not disclose information beyond the containerization, but it stands fit to reason someone attempting to reimplement a similar setup may inadvertantly. This is a risk I've seen in my logs that seens a bit to easy to make when using any sort of reverse proxy to protect the original node. I identified no legitmate functionality and have seen this file scanned on my system before.

**Fix**: Added authentication requirement!


### Mitigation Advice

Upgrade your version
Use some sort of port proxy on localhost.

## Authenticated File Disclosure

A logged-in user can read arbitrary files with permissions of the user running RTL when supplying a custom `path` in their query. In legitimate use cases the app should limit the files it tries to access.

// rtlconf common.rtl_conf_file_path

```sh {linenos=false}
# note: these both require authentication 😞
$ curl http://localhost:3000/rtl/api/channels/backups/?channel=0:0&path=/proc/self/environ
# or
$ curl http://localhost:3000/rtl/api/rtlconf/file?path=&channel=:
```

**Fix**: Allow user to specify a hardcoded path and deny relative path mapping.

### Mitigation Advice

Avoid storing sensitive environment variables where your RTL instance is running.
Setup strong methods of authentication.
For the code we


## Insufficient 2FA Protections

`/update2FA` allows 2FA to be disabled directly without typical checks. [1](https://github.com/Ride-The-Lightning/RTL/blob/fe7c9e4fc268235d96920f69a5f01966edab58da/controllers/RTLConf.js#L113
)
```sh {linenos=false}
$ curl http://localhost:3000/rtl/api/update2FA -d "secret2fa="
```
