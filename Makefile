# Initial setup - Installing and building the project.

install:
	npm install
	bower install

plugins:
	cordova plugin add com.ionic.keyboard@1.0.4
	cordova plugin add cordova-plugin-inappbrowser@1.0.1
	cordova plugin add cordova-plugin-whitelist@1.0.0
	cordova plugin add org.apache.cordova.console@0.2.13
	cordova plugin add org.apache.cordova.device@0.3.0

android:
	ionic platform add android
	ionic build android

# Run your app on a device/emulator/web browser

serve:
	ionic serve

emulate:
	ionic emulate android -l -c

run:
	ionic run android

