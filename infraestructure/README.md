# Drural-marketplace-infraestructure

## Requirements

1. [Docker](https://docs.docker.com/install/)
2. [Docker Compose](https://docs.docker.com/compose/install/)

## Development

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

## Disk Setup and Backup Configuration for LVM in dRural

This section provides detailed instructions for preparing a disk and configuring a backup system using LVM (Logical Volume Manager) in the dRural environment. The setup ensures efficient management of disk space, allowing for future expansion and snapshot storage. These instructions assume root or `sudo` privileges.

### Prerequisites
Ensure that you have a dedicated disk available for LVM, with at least 40GB of storage. Not all of this space will be used immediately; part of it will be reserved for future snapshots and potential data expansion.

### Step-by-Step Disk Setup

1. **Identify the Disk:**
   First, identify the disk you want to use with the `lsblk` command. For this example, we'll assume the disk is `/dev/sdb`.

2. **Create LVM Physical Volume:**
   Initialize the disk for LVM use by running:
   ```bash
   pvcreate /dev/sdb
   ```

3. **Create a LVM Volume Group:**
   Create a volume group named `vgdrural`:
   ```bash
   vgcreate vgdrural /dev/sdb
   ```

4. **Create a Mount Point:**
   Create a directory where the data will be stored:
   ```bash
   mkdir /data
   ```

5. **Create a Logical Volume:**
   Allocate 20GB for the dRural data volume:
   ```bash
   lvcreate -L 20GB -n drural vgdrural
   ```

6. **Format the Logical Volume:**
   Format the newly created logical volume with the ext4 file system:
   ```bash
   mkfs.ext4 /dev/vgdrural/drural
   ```

7. **Configure Automatic Mounting:**
   Add an entry to `/etc/fstab` to ensure the volume is automatically mounted on reboot:
   ```bash
   echo "/dev/vgdrural/drural /data ext4 defaults 0 1" >> /etc/fstab
   ```

8. **Mount the Volume:**
   Mount the logical volume to the `/data` directory:
   ```bash
   mount /data
   ```

9. **Create a Directory for Snapshots:**
   Create a directory for mounting LVM snapshots:
   ```bash
   mkdir /mnt/snapshots
   ```

### Backup Script Configuration

Now that the LVM setup is complete, you can use the [provided backup script](./backup-template.sh). It is recommended to store the script in the `/opt/backup/` directory.

> If your environment experiences daily changes of more than 2GB, it is recommended to adjust the backup script accordingly to meet your storage requirements.

1. **Place the Backup Script:**
   Move and rename the backup script to `/opt/backup/backup.sh`.

2. **Automate Backups Using Crontab:**
   To automate daily backups, add the following entry to the `crontab` for the `root` user:
   ```bash
   59 23 * * * root /opt/backup/backup.sh
   ```
   This schedules the backup script to run every day at 11:59 PM.

3. **Restart Cron Service:**
   After updating the `crontab`, restart the cron service to apply changes:
   ```bash
   systemctl restart cron
   ```
