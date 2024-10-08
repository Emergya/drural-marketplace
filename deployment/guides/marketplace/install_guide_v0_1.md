# dRural Marketplace install (v0.1 25/07/2022)

This guide have been tested in Ubuntu 20.04 and 22.04 LTS

## 1. Preparing server OS: Install docker and docker-compose

    Create drural user with sudo permission
    sudo adduser drural
    sudo adduser drural sudo

    Clean system removing older docker versions
    sudo apt-get remove docker docker-engine docker.io containerd runc


    Install latest docker and docker compose
    sudo apt update
    sudo apt-get install ca-certificates curl gnupg lsb-release
    sudo mkdir -p /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    sudo apt-get update
    sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin

    Enabling docker service

    sudo systemctl enable docker
    sudo systemctl start docker

    Increase number of os watches for node

    echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p


    Allowing drural user to use docker

    sudo usermod -a -G docker drural

From now, we recommend using drural user.

## 2. Upload dRural marketplace tar file from:

    	Uncompress file provided by IDI EIKON in /opt/: drural folder will be created
    cd /opt
    	sudo tar xvf drural.tar.xz

sudo chown -R drural /opt/drural

## 3. Prepare data folder

    By default we have set the platform to use /data folder. You can change this later in config file.
    This folder can be a simple folder or a mounted folder. Using a mounted LVM volume can be a good idea, allowing you to make online snapshots.

    sudo mkdir /data
    sudo mkdir /data/minio
    sudo chmod 777 /data/minio

## 4. Prepare data

    Domain addresses.

    	Marketplace needs only one address. As an example we will use our testing address: drural-sandbox.eu
    	DNS entry must point to the server you are installing. Internally server must be able to resolve his own name too, so an /etc/hosts entry can help if you need it.

    Stripe

    	Create an Stripe account and generate public key, secret key and a webhook.
    	For webhook use this address: https://yourdomain/plugins/channel/default-channel/saleor.payments.stripe/webhooks/

    Generate a MAPBOX token: https://docs.mapbox.com/help/getting-started/access-tokens/
        Create a MAPBOX style too, name it "drural". Use MAPBOX Studio: https://studio.mapbox.com/

    Prepare Email address and SMTP account for sending emails

    	In our example we will use marketplace@drural-sandbox.eu. Any message between marketplace and users will be sent from this address.
    	We will need an STMP configuration in concordance with this address to send emails.

From now we will work in /opt/drural/infrastructure folder

## 5. Setting data in .env config file

    With all the previous data we should be ready for setting up platform. At least you will need to setup:
    	# Address hosting marketplace
    	MK_DOMAIN=https://drural-sandbox.eu

    	# Password used for several services
    	COMMON_PASSWORD=drural123

    	# Token for Mapbox
    	MAPBOX_TOKEN=abcd123

    	# email sending settings, user and password should be url encoded if needed
    	MK_DEFAULT_FROM_EMAIL=marketplace@drural-sandbox.eu
    	MK_EMAIL_URL=smtp://user:password@mysmtpserver.com:port/?tls=True

    	# Servers allowed to call marketplace graphql
    	ALLOWED_CLIENT_HOSTS="drural-sandbox.eu"

    	# Set your stripe tokens
    	STRIPE_PUBLIC_KEY=pk_test_51Jw7gxKlx32ZeVNH5M2Ce1pxtLLnu9yIqhbP2Q9fyFwgcu
    	STRIPE_SECRET_KEY=sk_test_51Jw7gxKlx32ZeVNHDkQLgZvSbQy4TRBixluaTU5PxgloFa
    	# Configure a webhook (waiting for url from Emergya)
    	STRIPE_WEBHOOK_ID=we_1JwXNVKlx32ZeVNHBZ09mtNE
    	STRIPE_WEBHOOK_SECRET_KEY=whsec_gTWXaviE4IwGW2lssM

        You can make a general domain replacement with sed:
            sed -i 's/drural-sandbox.eu/yourdomain.eu/g' .env

## 6. Set your domain name in docker-compose.yml

    Docker compose needs it for Traefik. Traefik it's a reverse proxy used to distribute requests across containers and manage https trafic and certificates.

        Again you can replace your domain with sed:
            sed -i 's/drural-sandbox.eu/yourdomain.eu/g' .env

        Traefik will generate certificates with Let's Encrypt. Put your email address for notifications:
            - --certificatesresolvers.le.acme.email=your@email.com

## 7. Initialization tasks

    Login as drural user for this tasks

    Compile containers and code. HIGHLY RECOMMENDED AFTER CHANGES IN .env!!!!

            cd /opt/drural/infrastructure
            ./build.sh

            Don't worry if you get some  Javascript heap out of memory errors, are from type definitions check, not for the final build.
            Build will take some time.



    Initialize platform

            ./drural up -d

            On first run marketplace needs to create data structures. Check it with "./drural logs -f | grep "apisetup" until you see "apisetup.drural exited with code 0". You can exit log with Control + C

    Once initialized we need to create some sample data and users

            ./createsampledata.sh

    Once all tasks are completed check with login in: https://yourdomain.com/dashboard/
        First access could take some minutes, node needs to webpack application.
    	User: admin@example.com
    	Password: admin

## 8. Starting and stopping

    From /opt/drural/infrastructure folder run

        If you changed any environment variables
    Starting:	./drural.sh up -d
    Stopping:	./drural.sh down

        If there is no changes could be faster
    Starting:	./drural.sh start
    Stopping:	./drural.sh stop


    For logs:	./drural-sh logs -f | grep "component name"
    You can get component names if you run a "docker stats" when running.

## 9. Checking logs

    docker compose logs | grep container_name

## 10. Setting up automatic start

    COMING SOON

## 11. Backups

    COMING SOON

## 12. Things that will be improved

    - Compilable docker images for dashboard and storefront for less CPU and RAM usage
        - Chatwoot integration

---

Any question please contact drural@idieikon.com.

Thanks!
