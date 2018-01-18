let OPENED = false;
let CONTENT_INDEX = 0;
let CONTENTS = [];

const THREADS = [
    "introduction.html",
    "grids.html",
    "typography.html",
    "alerts.html",
    "badges.html",
    "buttons.html",
    "button-groups.html",
    "dropdowns.html",
];

let VISIBLE = true;
let LAST_VISIBLE = "MENU";
let RETURN_BACK = false;

let PICKERS = [];
let PICKERS_OPENED = false;

let BACKGROUNDS = [
    new Background("FFFFFF", "#ffffff", null, null),
    new Background("FFD0BA", "#ffd0ba", null, null),
    new Background("A3CCA3", "#A3CCA3", null, null),
    new Background("D6E6F5", "#D6E6F5", null, null),
];
let BACKGROUNDS_OPENED = false;

let TYPOGRAPHYS = [
    new Typography("Default", "black"),
    new Typography("Aqua", "aqua"),
    new Typography("Orange", "orange"),
    new Typography("Gray", "gray"),
]
let TYPOGRAPHYS_OPENED = false;

let MENUS = [
    new Menu("BG", function () {
        showBackgrounds()
    }),
    new Menu("TEXT<br/>COL", function () {
        showTypographys()
    }),
];
let MENU_OPENED = true;

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
        let returns = document.getElementById("return");
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
        let settings = document.getElementById("setting-menu");
        let children = settings.children;
        for(let i = 0; i < children.length; i++) {
            $(children.item(i)).click(function () {
                let setting = MENUS[i];

                hideSettings();
                setting.invoke();
            })
        }
    })
    showSettings();
}

function setupToggles() {
    $(function () {
        let visibility = document.getElementById("visibility");
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
        let pickers = document.getElementById("picker");
        let children = pickers.children;
        for(let i = 0; i < children.length; i++) {
            $(children.item(i)).click(function () {
                transition(i);
            });
        }
    });
}

function setupBackgrounds() {
    $(function () {
        let backgrounds = document.getElementById("backgrounds");
        let children = backgrounds.children;
        for(let i = 0; i < children.length; i++) {
            $(children.item(i)).click(function () {
                let background = BACKGROUNDS[i];
                $(".card-container").css({
                    background: background.getColor()
                });

                $(".card-picker-item").css({
                    background: background.getColor()
                })
            })
        }
    })
}

function setupTypographys() {
    $(function () {
        let typographys = document.getElementById("typographys");
        let children = typographys.children;
        for(let i = 0; i < children.length; i++) {
            $(children.item(i)).click(function () {
                let typography = TYPOGRAPHYS[i];
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
    let previous = CONTENT_INDEX;
    setReadmoreState(false);

    CONTENT_INDEX = toIndex;
    for(let i = 0; i < CONTENTS.length; i++) {
        $("#card-" + i).css({
            transform: "translateY(-" + (800 * CONTENT_INDEX) + "px)"
        });
    }
    let readmore = document.getElementById("readmore");
    document.getElementById("card-" + previous).removeChild(readmore);

    let elReadMore = document.createElement("div");
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
    let readmore = document.getElementById("readmore");
    readmore.onclick = function (event) {
        let container = document.getElementById("card-" + CONTENT_INDEX);
        let content = container.firstChild;
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
    let readmore = document.getElementById("readmore");
    let container = document.getElementById("card-" + CONTENT_INDEX);
    let content = container.firstChild;
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
    let temp = document.getElementById("temp");
    for(let i = 0; i < THREADS.length; i++) {
        let div = document.createElement("div");
        temp.appendChild(div);

        let url = "threads/" + THREADS[i];

        $(div).load(url);

        CONTENTS[i] = new Content(div);

        let children = temp.children;
        for(let j = 0; j < children.length; j++) {
            temp.removeChild(children.item(j));
        }
    }
}

// =================
// ==== PICKERS ====
// =================

function showPickers() {
    PICKERS_OPENED = true;
    for(let i = 0; i < PICKERS.length; i++) {
        let item = PICKERS[i];
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
    for(let i = 0; i < PICKERS.length; i++) {
        let item = PICKERS[i];
        setTimeout(function () {
            if(PICKERS_OPENED) {
                return;
            }
            item.getItem().style.top = "1000px";
            item.getItem().style.opacity = "0";
        }, ((PICKERS.length - 1 - i) + 1) * 50);
    }
}

function loadPickers() {
    let picker = document.getElementById("picker");
    for(let i = 0; i < CONTENTS.length; i++) {
        let item = document.createElement("div");
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
    for(let i = 0; i < BACKGROUNDS.length; i++) {
        let item = BACKGROUNDS[i];
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
    for(let i = 0; i < BACKGROUNDS.length; i++) {
        let item = BACKGROUNDS[i];
        setTimeout(function () {
            if(BACKGROUNDS_OPENED) {
                return;
            }
            item.getItem().style.top = "1000px";
            item.getItem().style.opacity = "0";
        }, ((BACKGROUNDS.length - 1 - i) + 1) * 50);
    }
}

function loadBackgrounds() {
    let backgrounds = document.getElementById("backgrounds");
    for(let i = 0; i < BACKGROUNDS.length; i++) {
        let item = document.createElement("div");

        let background = BACKGROUNDS[i];
        item.setAttribute("class", "card-background-item");
        item.style.top = "1000px";
        item.style.background = background.getColor();

        background.setData(item, (i * 60) + 100);
        backgrounds.appendChild(item);
    }
}

// =====================
// ==== TYPOGRAPHYS ====
// =====================

function loadTypographys() {
    let typographys = document.getElementById("typographys");
    for(let i = 0; i < TYPOGRAPHYS.length; i++) {
        let item = document.createElement("div");

        let typography = TYPOGRAPHYS[i];
        item.setAttribute("class", "card-typography-item");
        item.style.top = "1000px";
        item.style.background = typography.getColor();

        typography.setData(item, (i * 60) + 100);
        typographys.appendChild(item);
    }
}

function showTypographys() {
    TYPOGRAPHYS_OPENED = true;
    for(let i = 0; i < TYPOGRAPHYS.length; i++) {
        let item = TYPOGRAPHYS[i];
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
    for(let i = 0; i < TYPOGRAPHYS.length; i++) {
        let item = TYPOGRAPHYS[i];
        setTimeout(function () {
            if(TYPOGRAPHYS_OPENED) {
                return;
            }
            item.getItem().style.top = "1000px";
            item.getItem().style.opacity = "0";
        }, ((TYPOGRAPHYS.length - 1 - i) + 1) * 50);
    }
}

// ==================
// ==== SETTINGS ====
// ==================

function hideSettings() {
    MENU_OPENED = false;

    let returns = document.getElementById("return");
    returns.style.opacity = "1";
    RETURN_BACK = true;

    for(let i = 0; i < MENUS.length; i++) {
        let item = MENUS[i];
        setTimeout(function () {
            if(MENU_OPENED) {
                return;
            }
            item.getItem().style.top = "1000px";
            item.getItem().style.opacity = "0";
        }, ((MENUS.length - 1 - i) + 1) * 50);
    }
}

function showSettings() {
    MENU_OPENED = true;

    let returns = document.getElementById("return");
    returns.style.opacity = "0";
    RETURN_BACK = false;

    for(let i = 0; i < MENUS.length; i++) {
        let item = MENUS[i];
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
    let settings = document.getElementById("setting-menu");
    for(let i = 0; i < MENUS.length; i++) {
        let item = document.createElement("div");

        let setting = MENUS[i];
        item.setAttribute("class", "menu-item");
        item.style.top = "1000px";
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
    let wrapper = document.getElementById("wrapper");
    for(let i = 0; i < CONTENTS.length; i++) {
        let content = CONTENTS[i];

        let elContainer = document.createElement("div");
        elContainer.setAttribute("class", "card-container");
        elContainer.setAttribute("id", "card-" + i);
        wrapper.appendChild(elContainer);

        let elContent = document.createElement("div");
        elContent.setAttribute("class", "card-content");
        elContent.appendChild(content.getContent());
        elContainer.appendChild(elContent);

        if (i == CONTENT_INDEX) {
            let elReadMore = document.createElement("div");
            elReadMore.setAttribute("id", "readmore");
            elReadMore.innerHTML = "<h5>READ MORE</h5>";
            elContainer.appendChild(elReadMore);
        }
    }
}