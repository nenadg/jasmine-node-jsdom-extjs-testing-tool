#!/bin/bash

if [ $# -eq 0 ] || [ -z "$1" ] || [ $# -lt 2 ]
	then
		echo ""
		echo "(missing parameters) You must provide testing url and testing variant!"
		echo "Example: ./run.sh http://www.example.com production"
		echo ""
		echo "Possible testing variants are: production, testing, development."
		echo ""
		exit 1
fi

ACTIVEDIR=$3

if [ -z "$3" ]
	then
		ACTIVEDIR="."
fi

echo ""
echo "> Creating configuration/env.json for this $2 variant"

cat > $ACTIVEDIR/configuration/env.json <<EOF
	{
		"testingUrl": "$1",
		"testingVariant": "$2"
	}
EOF

echo "> Creating workspace/.htaccess for this $2 variant"

cat > $ACTIVEDIR/workspace/.htaccess <<EOF
	RewriteEngine On
	RewriteCond %{REQUEST_URI} (/|\.htm|\.php|\.html|/[^.]*)$ [NC]
	RewriteCond %{REQUEST_FILENAME} !-f
	RewriteCond %{REQUEST_FILENAME} !-d
	RewriteRule ^(.*)$ /build/$2/MyTestApp/index.html/$1 [R=301,NC,L]
EOF

npm start