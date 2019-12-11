docker build -t danielxburns/multi-client:latest -t danielxburns/multi-client:$SHA -f ./client/Dockerfile ./client
docker build -t danielxburns/multi-server:latest -t danielxburns/multi-server:$SHA -f ./server/Dockerfile ./server
docker build -t danielxburns/mutli-worker:latest -t danielxburns/multi-worker:$SHA -f ./worker/Dockerfile ./worker
docker push danielxburns/multi-client:latest 
docker push danielxburns/multi-server:latest
docker push danielxburns/multi-worker:latest
docker push danielxburns/multi-client:$SHA 
docker push danielxburns/multi-server:$SHA
docker push danielxburns/multi-worker:$SHA
kubectl apply -f k8s
kubectl set image deployments/server-deployment server=danielxburns/multi-server:$SHA
kubectl set image deployments/client-deployment client=danielxburns/multi-client:$SHA
kubectl set image deployments/worker-deployment worker=danielxburns/multi-worker:$SHA
