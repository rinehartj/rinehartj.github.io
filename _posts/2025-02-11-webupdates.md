---
layout: post
title: "Website Updates"
#date: 2019-01-01
---

2/10/2025: _Added drafts folder for work-in-progress posts_. For Jekyll to handle drafts properly, two changes were necessary. First, I created a `_drafts` folder in the root directory. Second, I added this line to `docker-compose.yml`:

```sh
command: bundle exec jekyll serve --host 0.0.0.0 --port 8080 --livereload --drafts --watch --force_polling --verbose --incremental
```

I then rebuilt the Docker container which hosts the local Jekyll server using `docker compose up --build`. The action of adding this new line appeared to override the Jekyll startup shell script, `entry_point.sh`.

I arrived to this solution after several failed attempts at modifying `/bin/entry_point.sh` and expecting to see an immediate response upon restarting the server. It was unclear and not mentioned in articles I read that the Docker container needed to be re-built for any changes, whether to `docker-compose.yml` or `/bin/entry_point.sh`, to take place.

More testing revealed that modifying the `start_jekyll()` function in `/bin/entry_point.sh` worked for some flags, but not others. I noticed that while adding `--drafts` flag to this file seemed to work, adding `--incremental` had no effect. Instead, I reversed changes made to `/bin/entry_point.sh` and instead added that parameter to the newly created command specified in `docker-compose.yml`. This time, the server responded to every flag I specified.

This will allow drafts to be published only when moved out of the `_drafts` folder and into the `_posts` folder.
