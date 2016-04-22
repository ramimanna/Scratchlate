(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };
    ext.get_translation = function(text, target_language, callback) {
      var language = {"Afrikaans":"af", "Albanian" : "sq", "Arabic" : "ar", "Armenian" : "hy", "Azerbaijani" :"az", "Basque"  :"eu", "Belarusian" : "be", "Bengali": "bn", "Bosnian" :"bs","Bulgarian": "bg","Catalan" :"ca","Cebuano" :"ceb","Chichewa" : "ny","Chinese Simplified" : "zh-CN","Chinese Traditional": "zh-TW","Croatian" : "hr","Czech": "cs","Danish"  :"da","Dutch" :"nl","English" :"en","Esperanto" :"eo","Estonian" : "et","Filipino" : "tl","Finnish" :"fi","French" : "fr","Galician" : "gl","Georgian" : "ka","German" : "de","Greek": "el","Gujarati" : "gu","Haitian Creole": "ht","Hausa" :"ha","Hebrew":  "iw","Hindi": "hi","Hmong" :"hmn","Hungarian": "hu","Icelandic": "is","Igbo" : "ig","Indonesian" : "id","Irish": "ga","Italian" :'it',"Japanese" : "ja","Javanese" : "jw","Kannada" :"kn","Kazakh" : "kk","Khmer": "km","Korean" : "ko","Lao": "lo","Latin" : "la","Latvian" : "lv","Lithuanian" : "lt","Macedonian" : "mk","Malagasy" : "mg","Malay" :"ms","Malayalam" :"ml","Maltese" :"mt","Maori" :"mi","Marathi": "mr","Mongolian" :"mn","Myanmar (Burmese)": "my","Nepali" : "ne","Norwegian": "no","Persian" :"fa","Polish"  :"pl","Portuguese"  :"pt","Punjabi" :"ma","Romanian" : "ro","Russian": "ru","Serbian" :"sr","Sesotho" :"st","Sinhala" :"si","Slovak" : "sk","Slovenian" :"sl","Somali" : "so","Spanish": "es","Sudanese" : "su","Swahili" :"sw","Swedish": "sv","Tajik" :"tg","Tamil" :"ta","Telugu" : "te","Thai" : "th","Turkish" :"tr","Ukrainian" : "uk","Urdu" : "ur","Uzbek" :"uz","Vietnamese"  :"vi","Welsh" :"cy","Yiddish" : "yi","Yoruba" : "yo","Zulu" : "zu"};     
            
      // Make an AJAX call to the Open Weather Maps API
      $.ajax({
            url: 'https://www.googleapis.com/language/translate/v2?key=AIzaSyCRXDflkdRiEhQ-JLMwzuSsq2O55aWZ8-0&source=en&target='+language[target_language]+'&callback=translateText&q=' + sourceText;
            dataType: 'jsonp',
            success: function(source) {
                // Got the data - parse it and return the temperature
                var newScript = source;
                callback(newScript);
            }
      });
    };
    // Block and block menu descriptions
    var descriptor = {
        blocks: [
          ['w', 'turn motor on for %n secs',             'motorOnFor', 1],
          [' ', 'turn motor on',                         'allMotorsOn'],
          [' ', 'turn motor off',                        'allMotorsOff'],
          [' ', 'set motor power %n',                    'startMotorPower', 100],
          [' ', 'set motor direction %m.motorDirection', 'setMotorDirection', 'this way'],
          ['h', 'when distance %m.lessMore %n',          'whenDistance', '<', 20],
          ['h', 'when tilt %m.eNe %n',                   'whenTilt', '=', 1],
          ['r', 'distance',                              'getDistance'],
          ['r', 'tilt',                                  'getTilt'],
          ['R', '%s in %m.languages',                    'get_translation','hello world','Spanish']
        ],
        menus: {
            languages: ['Spanish','Arabic','Hebrew'],
            lessMore: ['<', '>'],
            eNe: ['=','not =']
        }
    };

    // Register the extension
    ScratchExtensions.register('Sample extension', descriptor, ext);
})({});