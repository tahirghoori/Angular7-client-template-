FROM nginx:alpine
# COPY nginx/default.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*
WORKDIR /usr/share/nginx/html/
COPY index.html .


# docker build -t registry.gitlab.com/resourceallocationsystem/rasweb .
# docker login -u gitlab-ci-token -p zVTStG4zXy8fseKHzD8c registry.gitlab.com
# docker push registry.gitlab.com/resourceallocationsystem/rasweb
