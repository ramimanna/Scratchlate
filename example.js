(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };
    ext.get_translation = function(text, target_language, callback) {
      console.log(text,target_language);
      var language = {"Afrikaans":"af", "Albanian" : "sq", "Arabic" : "ar", "Armenian" : "hy", "Azerbaijani" :"az", "Basque"  :"eu", "Belarusian" : "be", "Bengali": "bn", "Bosnian" :"bs","Bulgarian": "bg","Catalan" :"ca","Cebuano" :"ceb","Chichewa" : "ny","Chinese Simplified" : "zh-CN","Chinese Traditional": "zh-TW","Croatian" : "hr","Czech": "cs","Danish"  :"da","Dutch" :"nl","English" :"en","Esperanto" :"eo","Estonian" : "et","Filipino" : "tl","Finnish" :"fi","French" : "fr","Galician" : "gl","Georgian" : "ka","German" : "de","Greek": "el","Gujarati" : "gu","Haitian Creole": "ht","Hausa" :"ha","Hebrew":  "iw","Hindi": "hi","Hmong" :"hmn","Hungarian": "hu","Icelandic": "is","Igbo" : "ig","Indonesian" : "id","Irish": "ga","Italian" :'it',"Japanese" : "ja","Javanese" : "jw","Kannada" :"kn","Kazakh" : "kk","Khmer": "km","Korean" : "ko","Lao": "lo","Latin" : "la","Latvian" : "lv","Lithuanian" : "lt","Macedonian" : "mk","Malagasy" : "mg","Malay" :"ms","Malayalam" :"ml","Maltese" :"mt","Maori" :"mi","Marathi": "mr","Mongolian" :"mn","Myanmar (Burmese)": "my","Nepali" : "ne","Norwegian": "no","Persian" :"fa","Polish"  :"pl","Portuguese"  :"pt","Punjabi" :"ma","Romanian" : "ro","Russian": "ru","Serbian" :"sr","Sesotho" :"st","Sinhala" :"si","Slovak" : "sk","Slovenian" :"sl","Somali" : "so","Spanish": "es","Sudanese" : "su","Swahili" :"sw","Swedish": "sv","Tajik" :"tg","Tamil" :"ta","Telugu" : "te","Thai" : "th","Turkish" :"tr","Ukrainian" : "uk","Urdu" : "ur","Uzbek" :"uz","Vietnamese"  :"vi","Welsh" :"cy","Yiddish" : "yi","Yoruba" : "yo","Zulu" : "zu"};     
      debugger;
      console.log('https://www.googleapis.com/language/translate/v2?key=AIzaSyCRXDflkdRiEhQ-JLMwzuSsq2O55aWZ8-0&source=en&target='+language[target_language]+'&callback=translateText&q=' + text);      
      // Make an AJAX call to the Open Weather Maps API
      $.ajax({
            url: 'https://www.googleapis.com/language/translate/v2?key=AIzaSyCRXDflkdRiEhQ-JLMwzuSsq2O55aWZ8-0&source=en&target='+language[target_language]+'&q=' + text,
            dataType: 'json',
            success: function(source) {
                // Got the data - parse it and return the temperature
                console.log(source);
                callback(source["data"]["translations"][0]["translatedText"]);
            }
      });
    };
    ext.get_language = function(text, callback) {
      console.log(text);
      console.log('https://www.googleapis.com/language/translate/v2/detect?key=AIzaSyCRXDflkdRiEhQ-JLMwzuSsq2O55aWZ8-0&q='+text);                      
      var language = {"Afrikaans":"af", "Albanian" : "sq", "Arabic" : "ar", "Armenian" : "hy", "Azerbaijani" :"az", "Basque"  :"eu", "Belarusian" : "be", "Bengali": "bn", "Bosnian" :"bs","Bulgarian": "bg","Catalan" :"ca","Cebuano" :"ceb","Chichewa" : "ny","Chinese Simplified" : "zh-CN","Chinese Traditional": "zh-TW","Croatian" : "hr","Czech": "cs","Danish"  :"da","Dutch" :"nl","English" :"en","Esperanto" :"eo","Estonian" : "et","Filipino" : "tl","Finnish" :"fi","French" : "fr","Galician" : "gl","Georgian" : "ka","German" : "de","Greek": "el","Gujarati" : "gu","Haitian Creole": "ht","Hausa" :"ha","Hebrew":  "iw","Hindi": "hi","Hmong" :"hmn","Hungarian": "hu","Icelandic": "is","Igbo" : "ig","Indonesian" : "id","Irish": "ga","Italian" :'it',"Japanese" : "ja","Javanese" : "jw","Kannada" :"kn","Kazakh" : "kk","Khmer": "km","Korean" : "ko","Lao": "lo","Latin" : "la","Latvian" : "lv","Lithuanian" : "lt","Macedonian" : "mk","Malagasy" : "mg","Malay" :"ms","Malayalam" :"ml","Maltese" :"mt","Maori" :"mi","Marathi": "mr","Mongolian" :"mn","Myanmar (Burmese)": "my","Nepali" : "ne","Norwegian": "no","Persian" :"fa","Polish"  :"pl","Portuguese"  :"pt","Punjabi" :"ma","Romanian" : "ro","Russian": "ru","Serbian" :"sr","Sesotho" :"st","Sinhala" :"si","Slovak" : "sk","Slovenian" :"sl","Somali" : "so","Spanish": "es","Sudanese" : "su","Swahili" :"sw","Swedish": "sv","Tajik" :"tg","Tamil" :"ta","Telugu" : "te","Thai" : "th","Turkish" :"tr","Ukrainian" : "uk","Urdu" : "ur","Uzbek" :"uz","Vietnamese"  :"vi","Welsh" :"cy","Yiddish" : "yi","Yoruba" : "yo","Zulu" : "zu"};     
      var code_to_lang = {};
      for (lang in language){
        code_to_lang[language[lang]] = lang;
      };
      $.ajax({
            url:'https://www.googleapis.com/language/translate/v2/detect?key=AIzaSyCRXDflkdRiEhQ-JLMwzuSsq2O55aWZ8-0&q='+text,
            dataType: 'json',
            success: function(source) {
                // Got the data - parse it and return the temperature
                callback(code_to_lang[source["data"]["detections"][0][0]["language"]]);
            }
      });      
    };
    // Block and block menu descriptions
    var descriptor = {
        blocks: [
          ['R', '%s in %m.languages','get_translation','hello world','Spanish'],
          ['R', 'Detect Language of %s','get_language', 'hello world']
        ],
        menus: {
            languages: ['Spanish','Arabic','Hebrew']
        }
    };

    // Register the extension
    ScratchExtensions.register('Sample extension', descriptor, ext);
})({});