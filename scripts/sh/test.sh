#!/bin/bash

# ensure repo root folder
if [ ! -d "./.git" ]; then
	while [ ! -d "./.git" ]; do
		cd ..
	done
	echo "cd $(pwd)"
fi

# always do a new build
npm run build
if [ "$?" != "0" ]; then echo "Unable to Test!"; exit 1; fi

echo ""
repoName="$(basename -- "$(pwd)")"
echo "Testing: $repoName ..."

function checkForTests() {
	local found=false
	for file in ./test/*.mjs; do
		[ -f "$file" ] && found=true
	done
	for file in ./test/*/*.mjs; do
		[ -f "$file" ] && found=true
	done
	echo ${found}
}

function checkForTest() {
	local retVal=
	if [ -f "$1" ]; then
		local found=
		case $1 in
			*.mjs) retVal="$1";;
			*.ts) found="$1";;
		esac
		if [ ! -z "$found" ]; then
			found="${found/src/test}"
			found="${found/.ts/.mjs}"
			if [ -f "$found" ]; then
				retVal="$found"
			fi
		fi
	fi
	echo ${retVal}
}

# make sure we have tests
hasTests=$(checkForTests);
if [ "$hasTests" = "false" ]; then
	echo "Nothing to Test."
	exit 0
fi

testFile=$(checkForTest $1)

function runTest() {
	echo ""
	echo "Testing: $1 ..."
	node $1 $2 $3 $4 $5 $6 $7 $8 $9
	if [ "$?" != "0" ]; then echo "Test Failed!"; exit 1; fi
	echo "Testing: $1 ... done."
}

# run explicitly given test file
if [ -f "$testFile" ]; then
	runTest $testFile $2 $3 $4 $5 $6 $7 $8

# iterate all test files
else
	# run the tests
	for file in ./test/*.*js; do
		[ -f "$file" ] && runTest $file $1 $2 $3 $4 $5 $6 $7 $8
	done
	for file in ./test/*/*.*js; do
		[ -f "$file" ] && runTest $file $1 $2 $3 $4 $5 $6 $7 $8
	done
fi

echo ""
echo "Testing: $repoName ... done."
