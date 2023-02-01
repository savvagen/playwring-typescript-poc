


Test Account
```
username: savvagench
email: savva.gench@example.com
password: qwerty123
```


# Launch the application
For demo purposes we are using [realworld](https://github.com/gothinkster/realworld) example app frontend(React)
### Setup instruction:
``` 
git clone https://github.com/gothinkster/react-redux-realworld-example-app
cd react-redux-realworld-example-app
npm install
npm start
```

# Launching tests
```
# Build
npm run pretest

# All tests
npm run test-compiled

# API Tests
npm run test-compiled:api

# UI Tests
npm run test-compiled:ui
```


# Debugging tests
``` 
npx playwright test src/test/login.spec.ts --headed --debug
```

# Tracing 
``` 
npx playwright test src/test/login.spec.ts --headed --trace=on
```
