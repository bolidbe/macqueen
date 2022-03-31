tag:
	git tag -a v$(version) -m "Version $(version)"

clean:
	cd ./www && rm -rf node_modules yarn.lock package-lock.json .next
	cd ./packages/mcqueen-scss && rm -rf node_modules yarn.lock package-lock.json dist
	cd ./packages/mcqueen-icons && rm -rf node_modules yarn.lock package-lock.json dist
	cd ./packages/mcqueen-react && rm -rf node_modules yarn.lock package-lock.json dist
