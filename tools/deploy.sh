#!/usr/bin/env bash

ng build --prod --base-href https://daskarov.github.io/covid/
angular-cli-ghpages -d dist/ng-sample/ --no-silent

