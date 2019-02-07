ng build --prod

docker image build -t rasweb .

docker run -p 80:80 --rm rasweb