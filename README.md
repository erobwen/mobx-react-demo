# Author

Robert Renbris

# About

This MobX/React/Vite demo was made to demonstrate lean but powerful state management with MobX. There are various ways of using MobX and React together presented out there, and this represents my unique take on it. 

I have provided a number of convenient helper-classes and hooks that makes the integration really smooth. Main features are: 

* useObservable hook for quickly introducing MobX governed state in your React component. 

* Store class that wraps MobX features in a convenient package. This base class for your state is well thought out and features the very convenient life cycle functions:

1. useHooks()
2. onCreated()
3. onDispose()
4. updateConstructorArguments()

Note: Override constructor to set up the store first time. There are a number of pages that demonstrate the use of these helpers, and it also showcases a standard authentication and admin interface built with them.


# Running

Do this to run in dev mode. 

1. npm install
2. npm start
3. Find the demo at: http://localhost:5173/ 

(Note: When starting the app, the console ends with just some vite update, and seems stalled. But the url was printed out earlier on the console, and the app is working.)

# Screenshot

![Alt text](/screenshot.png?raw=true "Screenshot")

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


# Project log

1. Run "winpty npm.cmd create vite@latest", select "." as project name to use this folder. Select project React -> Javascript SWC Compiler. 
2. Install MobX and MUI.
