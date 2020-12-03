clean:
	rm -rf node_modules yarn.lock package-lock.json

create_link:
	cd ../packages/${package} && rm -rf node_modules yarn.lock package-lock.json && npm unlink && npm i && npm link
	npm link @bolid/${package}

share_link:
	npm-link-shared ./node_modules/@bolid/${package}/node_modules . react

link:
	rm -rf node_modules yarn.lock package-lock.json
	# make create_link package="mcqueen-icons"
	make create_link package="mcqueen-react"
	npm i
	make share_link package="mcqueen-react"
