## Jekyll al-folio Site

**Steps to install**

Set up WSL2 and Podman:

1. Open command prompt, type `wsl --install`
2. Set username and password (stored in password manager)
3. Run `nano /etc/wsl.conf` and ensure `systemd=true` is set.
4. Run `wsl --shutdown`
5. Open new WSL window, type `sudo apt update && sudo apt install podman`
6. Test using `podman run -it docker.io/library/alpine:latest`, it should enter a new container and show `/ #`

Set up VSCode

1. Download VSCode
2. Install recommended extensions
3. Option Dev > Containers: Docker Path (dev.containers.dockerPath): set to /usr/bin/podman

   Option Dev > Containers: Execute in WSL (dev.containers.executeInWSL): Check this box

   Option Dev > Containers: Execute in WSLDistro (dev.containers.executeInWSLDistro) will only be needed if you have multiple WSL distributions installed

4. Choose "Reopen in Container" in VSCode
5. Wait for container to build
