clean:
	rm -rf node_modules yarn.lock package-lock.json

share_package:
	cd ../packages/${package} && rm -rf node_modules yarn.lock package-lock.json && npm unlink -g && npm i && npm run build && npm link
	npm link @bolid/${package}

share_dependency:
	cd ../packages/${package} && npm link ../../www/node_modules/${dependency}

link:
	rm -rf node_modules yarn.lock package-lock.json
	npm i
	make share_package package="mcqueen-react"
	make share_dependency package="mcqueen-react" dependency="react"
	# make create_link package="mcqueen-icons"
	# make create_link package="mcqueen-scss"
