<div align=center>

# 📖 modern-blog

<small>

*a really awesome blog!*

</small>

**live at [candoizo's log](https://log.ndoizo.ca)**

</div>

## tldr quickdeploy

```bash
git clone https://gitlab.com/candoizo/modern-blog
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
