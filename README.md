Browserpass
=======

Browserpass is a Chrome & Firefox extension for [zx2c4's pass](https://www.passwordstore.org/), a UNIX based password manager. It retrieves your decrypted passwords for the current domain and allows you to auto-fill login forms. If you have multiple logins for the current site, the extension shows you a list of usernames to choose from.

![Browserpass in the Chrome menu](https://github.com/dannyvankooten/browserpass/raw/master/assets/example.gif)

It uses a [native binary written in Golang](https://github.com/dannyvankooten/browserpass/blob/master/browserpass.go) to do the interfacing with your password store. Secure communication between the binary and the browser extension is handled through [native messaging](https://developer.chrome.com/extensions/nativeMessaging).

## Requirements

- A recent version of Chrome, Chromium or Firefox 50+.
- Pass (on UNIX)
- Your password filename must match your username **or** your file must have a line starting with `login:` or `username:`, followed by your username.

_Examples_

```bash
$ pass website.com/johndoe
the-password

$ pass website.com
the-password
login: johndoe
```

## Installation

Start out by downloading the [latest release package](https://github.com/dannyvankooten/browserpass/releases) for your operating system. Prebuilt binaries for 64-bit OSX & Linux and Windows are available. Arch users can install browserpass [from the AUR](https://aur.archlinux.org/packages/browserpass/).

#### Verifying authenticity of the releases

All release files are signed with [this PGP key](https://keybase.io/maximbaz). To verify the signature of a given file, use `$ gpg --verify <file>.sig`

#### Installing the host application

1. Extract the package to where you would like to have the binary.
1. Run `./install.sh` (`.\install.ps1` on Windows) to install the native messaging host. If you want a system-wide installation, run the script with `sudo`. For Windows, system-wide installation can be done by running `.\install.ps1` as Administrator and specifying "yes" at the "Install for all users?" prompt.

Installing the binary & registering it with your browser through the installation script is required to allow the browser extension to talk to the local binary application.

#### Installing the Chrome extension

You can either [install the Chrome extension from the Chrome Web Store](https://chrome.google.com/webstore/detail/browserpass/naepdomgkenhinolocfifgehidddafch) or drag the `chrome-browserpass.crx` file from the release package into the [Chrome Extensions](chrome://extensions) (`chrome://extensions`) page.

#### Installing the Firefox extension

You can [install the Firefox extension from the Mozilla add-ons site](https://addons.mozilla.org/en-US/firefox/addon/browserpass-ce/). Please note that you will need Firefox 50 or higher.

## Usage

Click the lock icon or use **Ctrl+Shift+L** to fill & submit your login info for the current site.

- Chrome allows changing the shortcut via chrome://extensions > Keyboard shortcuts.
- Firefox unfortunately does not allow changing the default shortcut.
- Firefox supports the keyboard shortcut only since version 53.

## Security

Browserpass aims to protect your passwords and computer from malicious or fraudulent websites.

* To protect against phishing, only passwords matching the origin hostname are suggested or selected without an explicit search term.
* To minimize attack surface, the website is not allowed to trigger any extension action without user invocation.
* Only data from the selected password is made available to the website.
* Given full control of the non-native component of the extension, the attacker can extract passwords stored in the configured repository, but can not obtain files elsewhere on the filesystem or reach code execution.

## Contributing

Check out [Contributing](CONTRIBUTING.md).

## License

MIT Licensed.
