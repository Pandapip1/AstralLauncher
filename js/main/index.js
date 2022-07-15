// Controller
import { SimpleController } from '../controllers/simple.js';
const controller = new SimpleController();
controller.run();

// Bootstrap 5 Utils
Bs5Utils.defaults.toasts.position = "bottom-right";

const bs5Utils = new Bs5Utils();


// Plugins
let simpleIO = null;
overwolf.extensions.current.getExtraObject("simple-io-plugin", result => {
    if (result.success) {
        simpleIO = result.object;
    } else {
        bs5Utils.Snack.show('danger', "The Simple IO plugin failed to load!", 5000, false);
        console.log(result);
    }
});

let downloader = null;
overwolf.extensions.current.getExtraObject("downloader-plugin", result => {
    if (result.success) {
        downloader = result.object;
    } else {
        bs5Utils.Snack.show('danger', "The Downloader plugin failed to load!", 5000, false);
        console.log(result);
    }
});

let registryReader = null;
overwolf.extensions.current.getExtraObject("registry-reader-plugin", result => {
    if (result.success) {
        processManager = result.object;
    } else {
        bs5Utils.Snack.show('danger', "The Registry Reader plugin failed to load!", 5000, false);
        console.log(result);
    }
});

let processManager = null;
overwolf.extensions.current.getExtraObject("process-manager-plugin", result => {
    if (result.success) {
        processManager = result.object;
    } else {
        bs5Utils.Snack.show('danger', "The Process Manager plugin failed to load!", 5000, false);
        console.log(result);
    }
});


// Initialize Main Control Logic
Vue.use(VueInstantSearch);

const vue = new Vue({
    el: "#app",
    data: {
        screen: "",
        selected_mod: {},
        mods: [],
        searchClient: algoliasearch('4O731545Y9', '5ee8cd2b81e64e11b891d5ca443f3e18')
    },
    methods: {
        // Screen helpers
        isScreen: function (screen) {
            return this.screen == screen;
        },
        setScreen: function (screen) {
            this.screen = screen;
        },
        update: function () {
            this.screen = this.screen; // NO OP
        },
        // Display helpers
        displayMyMods: function() {
            this.fetchMyMods().then(() => this.setScreen("MY_MODS"));
        },
        displayExplore: function() {
            this.setScreen("EXPLORE");
        },
        displayEdit: function (modId) {
            this.fetchMyMods().then(() => {
                this.selected_mod = this.mods.filter(mod => mod.id == modId)[0];
                this.setScreen("EDIT_MOD");
            });
        },
        // Screen detection helpers
        isMyMods: function() {
            return this.isScreen("MY_MODS");
        },
        isExplore: function() {
            return this.isScreen("EXPLORE");
        },
        isEditMod: function() {
            return this.isScreen("EDIT_MOD");
        },
        // Backend helpers
        fetchMyMods: function () {
            return (async () => {
                this.mods = [{
                    id: "allofus",
                    name: "All Of Us",
                    author: "All-Of-Us-Mods",
                    game_version: "2021.9.30s",
                    short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam ultrices sagittis orci a scelerisque purus semper eget. Id interdum velit laoreet id donec ultrices tincidunt arcu non. In arcu cursus euismod quis viverra. Sit amet facilisis magna etiam tempor orci eu. Suspendisse interdum consectetur libero id faucibus. Tellus in hac habitasse platea dictumst vestibulum. In dictum non consectetur a erat nam at lectus. Vitae auctor eu augue ut lectus arcu bibendum. Id velit ut tortor pretium viverra.",
                    mod_image: "https://i.imgur.com/lsGFoxG.png"
                }];
            })();
        },
        playMod: function (modId) {
            processManager.launchProcess()
        },
        installMod: function (modId) { }
    }
});

vue.displayMyMods();
