// =====================================================================================================
// Samuel Möller, 2024
//
// =====================================================================================================

/* import { Homepage } from "./Homepage";
import { Inventory } from "./Inventory";
import { OrderHandler } from "./OrderHandler"; */

export class Header {
    constructor() {
        this.initHeader();
    }

// =====================================================================================================
    initHeader() {
        let self = this;
        $("header").append("<div class='header-content'></div>");
        $(".header-content").append("<div id='header-content-left'></div>");
        $(".header-content").append("<div id='header-content-right'></div>");
        $("#header-content-left").append("<img src='res/img/logo-small.png' >");
        $("#header-content-left").append("<h1>The Old Sea Turtle</h1>");
        $("#header-content-right").append("<p>Book a table</p>");
        $("#header-content-right").append("<p>Apply for VIP</p>");
        $("#header-content-right").append("<p>Login</p>");
        
        // language selection menu object
        const dropdown = $("<select id='language-dropdown'></select>");
        dropdown.append("<option value='en'>English</option>");
        dropdown.append("<option value='fr'>French</option>");
        dropdown.append("<option value='de'>German</option>");
        $("#header-content-right").append(dropdown);

    }
    
    translationConfig() {
        $("#language-dropdown").on("change", function() {
            const selectedLanguage = $(this).val();
            translatePage(selectedLanguage);
        });
    }

    translatePage(selectedLanguage) {
        $(".translate").each(function() {
            const Text = $(this).text();
            translateText($(this), Text, "en", targetLanguage);
        })
    }

    translateText(element, text, sourceLanguage, targetLanguage) {
        const Request = {
            q:text,
            source: sourceLanguage,
            target: targetLanguage,
            format: "text"
        }

        $.ajax({
            url: "https://translation.googleapis.com/language/translate/v2",
            type: "GET",
            data: translationRequest,
            success: function(response) {
                const translatedText = response.data.translations[0].translatedText;
                element.text(translatedText);
            },
            error: function(error) {
                console.error("Error translating element:", error);
            }
        });
    }

}
