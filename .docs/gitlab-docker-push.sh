#!/usr/bin/env bash

rm -Rf dist

ng build --prod

docker login -u gitlab-ci-token -p zVTStG4zXy8fseKHzD8c registry.gitlab.com

git add .
git commit -m "updated via script"
git push origin master

export VERSION=${git rev-parse --short HEAD}

docker build -t registry.gitlab.com/resourceallocationsystem/rasweb:$VERSION .
docker push registry.gitlab.com/resourceallocationsystem/rasweb:$VERSION

#kubectl delete -f ../rasroot/kube/local/5-rasweb.yaml

cat .docs/5-rasweb.yaml | sed -e "s/@KVERSION/$VERSION/g" | kubectl apply -f-

kubectl apply -f ../rasroot/kube/local/5-rasweb.yaml