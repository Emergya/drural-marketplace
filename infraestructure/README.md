# Drural-marketplace-infraestructure

## Requirements

1. [Docker](https://docs.docker.com/install/)
2. [Docker Compose](https://docs.docker.com/compose/install/)

## DEVELOPMENT.

### How to run it?

1. Clone required git repositories:

- Expected git directory estructure

```
.
└── marketplace
    ├── back
    ├── dashboard
    ├── infraestructure
    ├── sdk
    ├── macaw-ui
    └── storefront

```

```
cd ~/Projects/emergya
mkdir -p drural/marketplace/
for repo in storefront back dashboard infraestructure sdk macaw-ui
    do git clone git@github.com:Emergya/drural-marketplace-${repo}.git drural/marketplace/${repo}
done
```

2. Go to the cloned directory:

```
cd marketplace/infraestructure
```

3. Update /etc/hosts file

```
echo "127.0.0.1 dev.marketplace.drural.com" | sudo tee -a /etc/hosts
```

4. Prepare / clean volumes:

```
sudo rm -rf data
mkdir data
cd data/
mkdir minio
chmod 777 minio
mkdir redis
cd ..
```

5. Run the application:

- Use the docker-compose and docker-compose.dev files to run the application in development mode:

```
docker-compose -f docker-compose.yml -f docker-compose.dev.yml -f docker-compose-chatwoot.yml up -d
```

- Wait untill miration finishes before moving to the next step.

6. [RUN ONCE] Generate the Chatwoot Token, save it into .env and reload the api container:

```
docker-compose -f docker-compose.yml -f docker-compose.dev.yml -f docker-compose-chatwoot.yml run --rm rails bin/rails runner "app = PlatformApp.create(name:'dRural');puts 'CHATWOOT_PLATFORM_TOKEN='+app.access_token.token" | tail -n 1 >> .env
```

7. Up the backend service again

```
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d api
```

8. [RUN ONCE] Populate the database with example data and create the admin user:

```
docker-compose -f docker-compose.yml -f docker-compose.dev.yml run --rm api bash -c "source venv/bin/activate && python3 manage.py populatedb --createsuperuser"
```

_Note that `--createsuperuser` argument creates an admin account for `admin@example.com` with the password set to `admin`._

_Both storefront and dashboard are quite big frontend projects and it might take up to few minutes for them to compile depending on your CPU. If nothing shows up on port 3000 or 9000 wait until `Compiled successfully` shows in the console output._

### Where is the application running?

- Core (API) - http://dev.marketplace.drural.com:8000/graphql/
- Storefront - http://dev.marketplace.drural.com:3000
- Dashboard - http://dev.marketplace.drural.com:9000/dashboard/
- Mailhog (Test email interface) - http://dev.marketplace.drural.com:8025
- MinIO panel - http://dev.marketplace.drural.com:7000
- Chatwoot panel - http://dev.marketplace.drural.com:2000
