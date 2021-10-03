clean:
	rm -rf node_modules yarn.lock package-lock.json

create_link:
	cd ../packages/${package} && rm -rf node_modules yarn.lock package-lock.json && npm unlink && npm i && npm run build && npm link
	npm link @bolid/${package}

share_link:
	npm-link-shared ./node_modules/@bolid/${package}/node_modules . ${shared_package}

link:
	rm -rf node_modules yarn.lock package-lock.json
	npm i
	make create_link package="mcqueen-react"
	make share_link package="mcqueen-react" shared_package="react"
	# make create_link package="mcqueen-scss"
	# make create_link package="mcqueen-icons"
	# make share_link package="mcqueen-icons" shared_package="react"
