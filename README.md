its channels but on the web browser, for normies

## to dev

```bash
npm i
npx turbo dev
```

## to production

Put this into your Docker Compose

```yaml
channels-web:
  build: https://github.com/anaisbetts/channels-web.git
  environment:
    - PORT=8088
    - DATA_DIR=/data
  network_mode: host
  restart: unless-stopped
  volumes:
    - ./channels:/data
```

The mounted directory will need to be writable by the nonroot user (uid: 65532, gid: 65532), for example by calling `sudo chown 65532:65532 ./channels` from the above Compose section. Alternatively, you can run channels-web as root using `docker run -u root`.

When you get a prompt for entering your Channels server, the best answer is:

`http://<your Tailscale IP address>:8089`
