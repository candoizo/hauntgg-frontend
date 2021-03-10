<div align=center>

# 👻 haunt.gg

<small>

*a really awesome aavegotchi site!*

</small>

**live at [haunt.gg](https://haunt.gg)**

</div>

## tldr quickdeploy

```bash
git clone https://gitlab.com/hauntgg/hauntgg-frontend
git checkout release
export NODE_ENV=$(git rev-parse --abbrev-ref HEAD)
yarn run docker build rolling server
yarn run docker push
```

## git branch glossary

**`dev`**: Daily changes

**`preview`**: Code locked, corrections allowed in markdown files.

**`release`**: `git tag`'d snapshots for public deploys.

## commit guideline

header format: `:emoji: type: description`
example: `:sparkles: feat: new awesome feature!`
