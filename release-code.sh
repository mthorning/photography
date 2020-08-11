#!/bin/bash
set -e 

SITE="photo-site"

yarn run build
tar -czvf $SITE.tar.gz \
    ./package.json \
    ./package-lock.json \
    ./Dockerfile \
    ./__sapper__/build \
    ./static
    
scp ./$SITE.tar.gz $1:~/containers/$SITE/temp

ssh $1 << EOF
    cd ~/containers/$SITE/temp
    tar -xvf $SITE.tar.gz

    docker build --no-cache --tag $SITE-image .
    docker stop photo && docker container rm photo
    docker run \
        --detach \
        --restart=always \
        -p 3000:3000 \
        --name photo \
        -v ~/websites/photo-gallery/:/usr/app/static/images/ \
        $SITE-image
EOF

rm $SITE.tar.gz
