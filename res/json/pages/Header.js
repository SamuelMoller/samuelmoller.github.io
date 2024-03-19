// =====================================================================================================
// Samuel Möller, 2024
//
// =====================================================================================================

/* import { Homepage } from "./Homepage";
import { Inventory } from "./Inventory";
import { OrderHandler } from "./OrderHandler"; */

export class Header {
    constructor() {
        this.dropdown;
        this.initHeader();
    }

// =====================================================================================================
    initHeader() {

        const languageSelector1 = {
            'en': {
                'Title': 'The Old Sea Turtle',
                'Book': 'Book a table',
                'Apply': 'Apply for VIP',
                'Login': 'Login',
            },
            'fr' : {
                'Title': 'La vieille tortue de mer',
                'Book': 'Réserver une table',
                'Apply': 'Demander VIP',
                'Login': 'Se connecter',
            },
            'es' : {
                'Title': 'La vieja tortuga marina',
                'Book': 'Reservar una mesa',
                'Apply': 'Aplicar para VIP',
                'Login': 'Acceso',
            }
        }

        let self = this;
        $("header").append("<div class='header-content'></div>");
        $(".header-content").append("<div id='header-content-left'></div>");
        $(".header-content").append("<div id='header-content-right'></div>");
        $("#header-content-left").append("<img src='res/img/logo-small.png' >");
        $("#header-content-left").append("<div class='title'></div>");
        $("#header-content-right").append("<div class='book'></div>");
        $("#header-content-right").append("<div class='apply'></div>");
        $("#header-content-right").append("<div class='login'></div>");

        // language selection menu object
        this.dropdown = $("<select id='language-dropdown'></select>");
        this.dropdown.append("<option value='en'>English</option>");
        this.dropdown.append("<option value='fr'>French</option>");
        this.dropdown.append("<option value='es'>Spanish</option>");
        $("#header-content-right").append(this.dropdown);
        
        this.dropdown.on('change', function() {
            const selectedLanguage = $(this).val();
            $("#header-content-left").find(".title").text(languageSelector1[selectedLanguage]['Title']);
            $("#header-content-right").find(".book").text(languageSelector1[selectedLanguage]['Book']);
            $("#header-content-right").find(".apply").text(languageSelector1[selectedLanguage]['Apply']);
            $("#header-content-right").find(".login").text(languageSelector1[selectedLanguage]['Login']);
            
        });

    }
    
    getDropdown() {
        return this.dropdown;
    }
    
/*     translationConfig() {
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
    }*/

}
