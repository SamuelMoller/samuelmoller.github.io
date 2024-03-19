import * as util from "../Utilities.js";
import { reload } from "../PageHandler.js";

export class Footer {
    constructor() {
        this.init();
    }

// =====================================================================================================
    init() {
        $("footer").append("<div class='footer-content'></div>");
        $(".footer-content").append("<div id='footer-content-left'></div>");
        $(".footer-content").append("<div id='footer-content-right'></div>");
        $("#footer-content-right").append("<img id='footer-svg-SE' src='res/img/svg/sv-SE.svg' >");
        $("#footer-content-right").append("<img id='footer-svg-EN' src='res/img/svg/en-US.svg' >");
        $("#footer-content-right").append("<img id='footer-svg-FR' src='res/img/svg/fr-FR.svg' >");
        $("#footer-content-right").append("<img id='footer-svg-ES' src='res/img/svg/es-ES.svg' >");

        $("#footer-svg-SE").on("click", function() {
            util.setLang("sv-SE");
            reload();
        });
        $("#footer-svg-EN").on("click", function() {
            util.setLang("en-US");
            reload();
        });
        $("#footer-svg-FR").on("click", function() {
            util.setLang("fr-FR");
            reload();
        });
        $("#footer-svg-ES").on("click", function() {
            util.setLang("es-ES");
            reload();
        });
    }
}