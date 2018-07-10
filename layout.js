var OPENED = false;
var CONTENT_INDEX = 0;
var CONTENTS = [];

var THREADS = [
    "introduction.html",
    "grids.html",
    "typography.html",
    "alerts.html",
    "badges.html",
    "buttons.html",
    "button-groups.html",
    "dropdowns.html",
];

var VISIBLE = true;
var LAST_VISIBLE = "MENU";
var RETURN_BACK = false;

var PICKERS = [];
var PICKERS_OPENED = false;

var BACKGROUNDS = [
    new Background("FFFFFF", "#ffffff", null, null, null),
    new Background("FFD0BA", "#ffd0ba", null, null, null),
    new Background("A3CCA3", "#A3CCA3", null, null, null),
    new Background("D6E6F5", "#D6E6F5", null, null, null),
    new Background("F1A1CA", "#f1a1ca", null, null, null),
    new Background("E8FFD1", "#e8ffd1", null, null, null),
    new Background("A1A2F1", "#a1a2f1", null, null, null),
    new Background("FFFBF7", "#fffbf7", null, null, null),
    new Background("PnToLm", null, "pink-to-lime", null, null),
    new Background("BlToAq", null, "blue-to-aqua", null, null),
    new Background("OrToWh", null, "orange-to-white", null, null),
    new Background("SbToWh", null, "skyblue-to-white", null, null)
];
var BACKGROUNDS_OPENED = false;

var TYPOGRAPHYS = [
    new Typography("Default", "black"),
    new Typography("Aqua", "aqua"),
    new Typography("Orange", "orange"),
    new Typography("Gray", "gray"),
]
var TYPOGRAPHYS_OPENED = false;

var MENUS = [
    new Menu("BG<br/>COL", function () {
        showBackgrounds()
    }),
    new Menu("TEXT<br/>COL", function () {
        showTypographys()
    }),
];
var MENU_OPENED = true;

function getCSSList() {
    var arr = [];
    for(var i = 0; i < BACKGROUNDS.length; i++) {
        var background = BACKGROUNDS[i];
        if(background.getCSS() != null) {
            arr.push(background.getCSS());
        }
    }
    return arr;
}

window.onload = function (event) {
    loadContents();
    loadPickers();
    loadBackgrounds();
    loadTypographys();
    loadSettings();
    loadWrappers();
    refreshReadmore();

    setupToggles();
    setupReturn();
    setupSettings();
    setupPickers();
    setupBackgrounds();
    setupTypographys();
}

function setupReturn() {
    $(function () {
        var returns = document.getElementById("return");
        $(returns).click(function () {
            if(!VISIBLE) {
                return;
            }
            hideBackgrounds();
            hideTypographys();

            showSettings();
        });
    })
}

function setupSettings() {
    $(function () {
        var settings = document.getElementById("setting-menu");
        var children = settings.children;
        for(var i = 0; i < children.length; i++) {
            $(children.item(i)).click(function () {
                var setting = MENUS[i];

                hideSettings();
                setting.invoke();
            })
        }
    })
    showSettings();
}

function setupToggles() {
    $(function () {
        var visibility = document.getElementById("visibility");
        $(visibility).click(function () {
            if(VISIBLE) {
                if(MENU_OPENED) {
                    hideSettings();
                    LAST_VISIBLE = "MENU";
                    document.getElementById("return").style.opacity = 0;
                } else if(BACKGROUNDS_OPENED) {
                    hideBackgrounds();
                    LAST_VISIBLE = "BACKGROUND";
                    document.getElementById("return").style.opacity = 0.2;
                } else if(TYPOGRAPHYS_OPENED) {
                    hideTypographys();
                    LAST_VISIBLE = "TYPOGRAPHY";
                    document.getElementById("return").style.opacity = 0.2;
                }
                hidePickers();
                visibility.style.opacity = "0.2";
                visibility.innerHTML = "show<br/>all";
            } else {
                switch(LAST_VISIBLE) {
                    case "MENU":
                        showSettings();
                        break;

                    case "BACKGROUND":
                        showBackgrounds();
                        document.getElementById("return").style.opacity = 1;
                        break;

                    case "TYPOGRAPHY":
                        showTypographys();
                        document.getElementById("return").style.opacity = 1;
                        break;
                }
                showPickers();

                visibility.style.opacity = "1";
                visibility.innerHTML = "hide<br/>all";
            }
            VISIBLE = !VISIBLE;
        });
    })
}

function setupPickers() {
    $(function () {
        var pickers = document.getElementById("picker");
        var children = pickers.children;
        for(var i = 0; i < children.length; i++) {
            $(children.item(i)).click(function () {
                transition(i);
            });
        }
    });
}

function setupBackgrounds() {
    $(function () {
        var backgrounds = document.getElementById("backgrounds");
        var children = backgrounds.children;
        for(var i = 0; i < children.length; i++) {
            $(children.item(i)).click(function () {
                var background = BACKGROUNDS[i];
                var cssList = getCSSList();
                for(var j = 0; j < cssList.length; j++) {
                    var css = cssList[j];
                    $(".card-container").removeClass(css);
                    $(".card-picker-item").removeClass(css);
                }
                $(".card-container").css("background", "");
                $(".card-picker-item").css("background", "");

                if(background.getColor() != null) {
                    $(".card-container").css({
                        background: background.getColor()
                    });

                    $(".card-picker-item").css({
                        background: background.getColor()
                    })
                } else if(background.getCSS() != null) {
                    $(".card-container").addClass(background.getCSS());
                    $(".card-picker-item").addClass(background.getCSS());
                }
            })
        }
    })
}

function setupTypographys() {
    $(function () {
        var typographys = document.getElementById("typographys");
        var children = typographys.children;
        for(var i = 0; i < children.length; i++) {
            $(children.item(i)).click(function () {
                var typography = TYPOGRAPHYS[i];
                $(".card-container").css({
                    color: typography.getColor()
                });

                $(".card-picker-item").css({
                    color: typography.getColor()
                });
            })
        }
    })
}

$(function () {
    $(".card-container").css({
        opacity: 1
    });

    $("#upper-arrow").click(function () {
        transition(CONTENT_INDEX - 1);
    });

    $("#lower-arrow").click(function () {
        transition(CONTENT_INDEX + 1);
    });
});

function transition(toIndex) {
    if((toIndex > CONTENT_INDEX && toIndex >= CONTENTS.length) ||
        (toIndex < CONTENT_INDEX && toIndex < 0) ||
        (toIndex == CONTENT_INDEX)) {

        return;
    }
    var previous = CONTENT_INDEX;
    setReadmoreState(false);

    CONTENT_INDEX = toIndex;
    for(var i = 0; i < CONTENTS.length; i++) {
        $("#card-" + i).css({
            transform: "translateY(-" + (800 * CONTENT_INDEX) + "px)"
        });
    }
    var readmore = document.getElementById("readmore");
    document.getElementById("card-" + previous).removeChild(readmore);

    var elReadMore = document.createElement("div");
    elReadMore.setAttribute("id", "readmore");
    elReadMore.innerHTML = "<h5>READ MORE</h5>";
    document.getElementById("card-" + CONTENT_INDEX).appendChild(elReadMore);

    if(toIndex > previous) {
        $("#lower-arrow").css({
            opacity: CONTENT_INDEX == CONTENTS.length - 1 ? 0 : 1
        })
        $("#upper-arrow").css({
            opacity: 1
        });
    } else if(toIndex < previous) {
        $("#upper-arrow").css({
            opacity: CONTENT_INDEX == 0 ? 0 : 1
        });
        $("#lower-arrow").css({
            opacity: 1
        });
    }
    refreshReadmore();
}

function refreshReadmore() {
    var readmore = document.getElementById("readmore");
    readmore.onclick = function (event) {
        var container = document.getElementById("card-" + CONTENT_INDEX);
        var content = container.firstChild;
        if(OPENED) {
            container.style.width = "500px";
            content.style.width = "400px";
            readmore.innerText = "READ MORE";
            readmore.style.padding = "7px";
            content.style.overflowY = "hidden";
        } else {
            container.style.width = "900px";
            content.style.width = "800px";
            readmore.innerText = "COLLAPSE";
            readmore.style.padding = "7px";
            content.style.overflowY = "auto";
        }
        OPENED = !OPENED;
    }
}

function setReadmoreState(open) {
    var readmore = document.getElementById("readmore");
    var container = document.getElementById("card-" + CONTENT_INDEX);
    var content = container.firstChild;
    if(open) {
        container.style.width = "900px";
        content.style.width = "800px";
        readmore.innerText = "COLLAPSE";
        readmore.style.padding = "7px";
        content.style.overflowY = "auto";
    } else {
        container.style.width = "500px";
        content.style.width = "400px";
        readmore.innerText = "READ MORE";
        readmore.style.padding = "7px";
        content.style.overflowY = "hidden";
    }
    OPENED = open;
}

function loadContents() {
    var temp = document.getElementById("temp");
    for(var i = 0; i < THREADS.length; i++) {
        var div = document.createElement("div");
        temp.appendChild(div);

        var url = "threads/" + THREADS[i];

        $(div).load(url);

        CONTENTS[i] = new Content(div);

        var children = temp.children;
        for(var j = 0; j < children.length; j++) {
            temp.removeChild(children.item(j));
        }
    }
}

// =================
// ==== PICKERS ====
// =================

function showPickers() {
    PICKERS_OPENED = true;
    for(var i = 0; i < PICKERS.length; i++) {
        var item = PICKERS[i];
        setTimeout(function () {
            if(!PICKERS_OPENED) {
                return;
            }
            item.getItem().style.top = item.getTop() + "px";
            item.getItem().style.opacity = "1";
        }, (i + 1) * 50);
    }
}

function hidePickers() {
    PICKERS_OPENED = false;
    for(var i = 0; i < PICKERS.length; i++) {
        var item = PICKERS[i];
        setTimeout(function () {
            if(PICKERS_OPENED) {
                return;
            }
            item.getItem().style.top = "2000px";
            item.getItem().style.opacity = "0";
        }, ((PICKERS.length - 1 - i) + 1) * 50);
    }
}

function loadPickers() {
    var picker = document.getElementById("picker");
    for(var i = 0; i < CONTENTS.length; i++) {
        var item = document.createElement("div");
        item.setAttribute("class", "card-picker-item");
        item.innerHTML = i + 1;
        item.style.top = "1000px";

        PICKERS[i] = new Picker((i * 60) + 100, i, item);
        picker.appendChild(item);
    }
    showPickers();
}

// =====================
// ==== BACKGROUNDS ====
// =====================

function showBackgrounds() {
    BACKGROUNDS_OPENED = true;
    for(var i = 0; i < BACKGROUNDS.length; i++) {
        var item = BACKGROUNDS[i];
        setTimeout(function () {
            if(!BACKGROUNDS_OPENED) {
                return;
            }
            item.getItem().style.top = item.getTop() + "px";
            item.getItem().style.opacity = "1";
        }, (i + 1) * 50);
    }
}

function hideBackgrounds() {
    BACKGROUNDS_OPENED = false;
    for(var i = 0; i < BACKGROUNDS.length; i++) {
        var item = BACKGROUNDS[i];
        setTimeout(function () {
            if(BACKGROUNDS_OPENED) {
                return;
            }
            item.getItem().style.top = "2000px";
            item.getItem().style.opacity = "0";
        }, ((BACKGROUNDS.length - 1 - i) + 1) * 50);
    }
}

function loadBackgrounds() {
    var backgrounds = document.getElementById("backgrounds");
    for(var i = 0; i < BACKGROUNDS.length; i++) {
        var item = document.createElement("div");

        var background = BACKGROUNDS[i];
        item.setAttribute("class", "card-background-item");
        item.style.top = "2000px";
        item.style.background = background.getColor();
        if(background.getColor() != null) {
            item.style.background = background.getColor();
        } else if(background.getCSS() != null) {
            $(item).addClass(background.getCSS());
        }

        background.setData(item, (i * 60) + 100);
        backgrounds.appendChild(item);
    }
}

// =====================
// ==== TYPOGRAPHYS ====
// =====================

function loadTypographys() {
    var typographys = document.getElementById("typographys");
    for(var i = 0; i < TYPOGRAPHYS.length; i++) {
        var item = document.createElement("div");

        var typography = TYPOGRAPHYS[i];
        item.setAttribute("class", "card-typography-item");
        item.style.top = "2000px";
        item.style.background = typography.getColor();

        typography.setData(item, (i * 60) + 100);
        typographys.appendChild(item);
    }
}

function showTypographys() {
    TYPOGRAPHYS_OPENED = true;
    for(var i = 0; i < TYPOGRAPHYS.length; i++) {
        var item = TYPOGRAPHYS[i];
        setTimeout(function () {
            if(!TYPOGRAPHYS_OPENED) {
                return;
            }
            item.getItem().style.top = item.getTop() + "px";
            item.getItem().style.opacity = "1";
        }, (i + 1) * 50);
    }
}

function hideTypographys() {
    TYPOGRAPHYS_OPENED = false;
    for(var i = 0; i < TYPOGRAPHYS.length; i++) {
        var item = TYPOGRAPHYS[i];
        setTimeout(function () {
            if(TYPOGRAPHYS_OPENED) {
                return;
            }
            item.getItem().style.top = "2000px";
            item.getItem().style.opacity = "0";
        }, ((TYPOGRAPHYS.length - 1 - i) + 1) * 50);
    }
}

// ==================
// ==== SETTINGS ====
// ==================

function hideSettings() {
    MENU_OPENED = false;

    var returns = document.getElementById("return");
    returns.style.opacity = "1";
    RETURN_BACK = true;

    for(var i = 0; i < MENUS.length; i++) {
        var item = MENUS[i];
        setTimeout(function () {
            if(MENU_OPENED) {
                return;
            }
            item.getItem().style.top = "2000px";
            item.getItem().style.opacity = "0";
        }, ((MENUS.length - 1 - i) + 1) * 50);
    }
}

function showSettings() {
    MENU_OPENED = true;

    var returns = document.getElementById("return");
    returns.style.opacity = "0";
    RETURN_BACK = false;

    for(var i = 0; i < MENUS.length; i++) {
        var item = MENUS[i];
        setTimeout(function () {
            if(!MENU_OPENED) {
                return;
            }
            item.getItem().style.top = item.getTop() + "px";
            item.getItem().style.opacity = "1";
        }, (i + 1) * 50);
    }
}

function loadSettings() {
    var settings = document.getElementById("setting-menu");
    for(var i = 0; i < MENUS.length; i++) {
        var item = document.createElement("div");

        var setting = MENUS[i];
        item.setAttribute("class", "menu-item");
        item.style.top = "2000px";
        item.innerHTML = setting.getDisplayName();

        setting.setData(item, (i * 45) + 100);
        settings.appendChild(item);
    }
    showSettings();
}

// ==================
// ==== WRAPPERS ====
// ==================

function loadWrappers() {
    var wrapper = document.getElementById("wrapper");
    for(var i = 0; i < CONTENTS.length; i++) {
        var content = CONTENTS[i];

        var elContainer = document.createElement("div");
        elContainer.setAttribute("class", "card-container");
        elContainer.setAttribute("id", "card-" + i);
        wrapper.appendChild(elContainer);

        var elContent = document.createElement("div");
        elContent.setAttribute("class", "card-content");
        elContent.appendChild(content.getContent());
        elContainer.appendChild(elContent);

        if (i == CONTENT_INDEX) {
            var elReadMore = document.createElement("div");
            elReadMore.setAttribute("id", "readmore");
            elReadMore.innerHTML = "<h5>READ MORE</h5>";
            elContainer.appendChild(elReadMore);
        }
    }
}
