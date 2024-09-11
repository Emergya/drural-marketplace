#!/bin/bash
export PATH="/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin"
################################################################################
## This  script will generate LVM Snapshots mount them and rotate them        ##
####################################Changelog ##################################
## Credits to: https://github.com/Rici11/LVM-Snapshot-Rotate

## Change variables depending on local environment ##

# Mount point for snapshots, snapshots will be available here in read-only mode.
MOUNTPOINT="/mnt/snapshots/"
# Maximum size for transactional changes in the snapshot
SNAPSIZE="2G"
# Logical volume to be snapshotted
VGNAME="/dev/vgdrural/drural"
# Physical Volume
PVNAME="/dev/vgdrural/"
# Sets the time for snapshot retention, snapshots older than this will be removed.
OLDSNAP="7 days ago"

## Do not change from here on ##
PREFIX='snap.'
SNAPNAME="$PREFIX"`date +%Y%m%d-%H%M`
SNAPDIR=$PVNAME$SNAPNAME


if [ -d "$MOUNTPOINT" ]; then
    # Control will enter here if snapshot folder exists.
echo "Folder exists."
else
    echo "Snapshot folder does not exist."
    exit 1
fi

# Create Snapshot Logical Volume
lvcreate -L$SNAPSIZE -s -n $SNAPNAME $VGNAME

# Mount the snapshot
mkdir $MOUNTPOINT$SNAPNAME
if [ -d "$MOUNTPOINT$SNAPNAME" ]; then
        # Control will enter here if $MOUNTPOINT+$SNAPNAME exists.
        mount -o ro $SNAPDIR $MOUNTPOINT$SNAPNAME
        echo "Snapshot mounted"
else
    echo "Mount point does not exist."
    exit 1
fi

# List all the logical volumes under specified physical group
SNAPLIST=`lvdisplay | grep 'LV Name'  | grep "$PREFIX" | awk '{print $3}' | cut -d'/' -f 4 | cut -d'.' -f 2 `

# For each snapshot checks if the date is beyond retention time.
for snap in $SNAPLIST ; do
    snapforepoc=`echo $snap | awk '{d=substr($1,1,8)" "substr($1,10,2)":"substr($1,12,2);print d}'`;
    snapdate=`date +'%s' -d "$snapforepoc"`
    if [ `echo $snapdate` -le `date +'%s' -d "$OLDSNAP"` ];
        # If the snapshot is beyond retention time then it removes it.
    then
        # Store Variable with full snapname
        #snapextended=`echo $snap | awk '{d=substr($1,1,8)""substr($1,0,1)"-"substr($2,1,2)substr($2,4,5);print d}'`
        #echo $snapextended

        # Sets a variable for the full lvname of the snapshot for future reference eg. "snap.20140902-1235"
        fullsnaplvname="$PREFIX$snap"
        #fullsnaplvname=`lvdisplay | grep 'LV Name' | grep "$PREFIX$snap" | awk '{print $3}' | cut -d'/' -f 4`

        # Unmount the snapshot to be deleted
        if umount $MOUNTPOINT$fullsnaplvname > /dev/null 2>&1
        then
            echo "$MOUNTPOINT$fullsnaplvname unmounted successfully."
        else
            echo "umount for $MOUNTPOINT$fullsnaplvname failed."
        fi
        # Remove the directory on which the snapshot was mounted
        if rmdir $MOUNTPOINT$fullsnaplvname > /dev/null 2>&1
        then
            echo "$MOUNTPOINT$fullsnaplvname unmounted successfully."
        else
            echo "umount for $MOUNTPOINT$fullsnaplvname failed."
        fi

        # LVM Remove the snapshot
        if lvremove --force $PVNAME$fullsnaplvname > /dev/null 2>&1
        then
            echo "removing $PVNAME$fullsnaplvname"
        else
            echo "unable to remove $PVNAME$fullsnaplvname"
        fi
    else
        echo "No snapshots found to be removed."
        exit 0
    fi
done