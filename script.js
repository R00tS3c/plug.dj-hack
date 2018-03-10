// ==UserScript==
// @name         Ciker was here
// @version      1.0
// @description  Ciker was here
// @author       Ciker was here
// @match        https://plug.dj/*
// @grant        none
// ==/UserScript==

// CONFIG:
var HACK_CONFIG = {
    username: "xErta 1337",  //  Your own username (case sensitive)
    id: 29368845,
    gRole: 0,               //  Global role, 0 is no global role, 3 is brand ambassador, 5 is admin
    tastycat_avatar: true,  //  Apply tastycat avatar in /tastycat. Only works if you select a base avatar (works in the room)
    avatar: "beach-t02",      //  Currently selected avatar, see https://rcs.radiant.dj/avatars
    sub: 0,                 //  Whether you're subscribed, 0 is not subscribed, 1 is subscribed.
    silver: true,
    badge: 'food08',   //  Currently selected badge, see https://rcs.radiant.dj/badges
    minimum_role: 0         //  If your role is lower than this, it'll be put to this. Valids are 0=default, 1=res dj, 2=bouncer, 3=manager, 4=cohost, 5=host.
};

// undo-hacks

HACK_CONFIG.gRole = 5000;
//HACK_CONFIG.tastycat_avatar = true;
HACK_CONFIG.avatar = 'dragon-e02';
HACK_CONFIG.sub = 1;
HACK_CONFIG.badge = 'admin-o01';
//HACK_CONFIG.minimum_role = 0;

HACK_CONFIG.gRole = 0;
HACK_CONFIG.tastycat_avatar = false;
HACK_CONFIG.avatar = 'rave07';
HACK_CONFIG.sub = 1;
HACK_CONFIG.badge = 'animal-o13';
HACK_CONFIG.minimum_role = 3;
HACK_CONFIG.id = 4684278;
HACK_CONFIG.username = "Fungus";
HACK_CONFIG.slug = "fungus";
*/
// Don't edit below unless you know what you're doing.

var apply = function() {
    if (window["$"] == undefined) {
        setTimeout(apply, 50);
        return;
    }
    $(document).ready(function() {
        function modGUI() {
            $(".button.staff").on('click', function() {
                var start = function() {
                    for (var i = 0; i < window.staff_list.length; i++) {
                        var staff = window.staff_list[i];
                        var userDivs = $(".list.staff .jspPane .user");
                        for (var j = 0; j < userDivs.length; j++) {
                            if (userDivs[j].innerText == staff.username) {
                                if (!userDivs[j].classList.contains('__rank')) {
                                    var r = '';
                                    if (staff.role == 5000) {
                                        r = 'host';
                                    } else if (staff.role == 4000) {
                                        r = 'cohost';
                                    } else if (staff.role == 3000) {
                                        r = 'manager';
                                    } else if (staff.role == 2000) {
                                        r = 'bouncer';
                                    } else {
                                        r = 'dj';
                                    }
                                    $(userDivs[j]).addClass('__rank').addClass('__rank_' + r);
                                }
                                var chatchar = 'icon-chat-subscriber';
                                var color = '#eee';
                                var icon_webkit = false;
                                if (staff.gRole == 5000) {
                                    chatchar = 'icon-chat-admin';
                                    color = '#30C7FB';
                                } else if (staff.gRole == 3000) {
                                    chatchar = 'icon-chat-ambassador';
                                    color = '#95CB00';
                                } else if (staff.role == 5000 || staff.role == 4000) {
                                    chatchar = 'icon-chat-host';
                                    if (staff.role == 5000) {
                                        color = '#FF5C5E';
                                        icon_webkit = true;
                                    } else if (staff.role == 4000) {
                                        color = '#9F68FF';
                                    }
                                } else if (staff.role == 3000) {
                                    color = '#9F68FF';
                                    chatchar = 'icon-chat-manager';
                                } else if (staff.role == 2000) {
                                    chatchar = 'icon-chat-bouncer';
                                    color = '#9F68FF';
                                } else if (staff.role == 1000) {
                                    chatchar = 'icon-chat-dj';
                                    color = '#9F68FF';
                                } else {
                                    chatchar = 'icon-chat-subscriber';
                                    color = '#c59840';
                                }
                                $(userDivs[j]).find('.icon').remove();
                                    var icon1 = document.createElement('i');
                                    $(icon1)
                                        .addClass('icon')
                                        .addClass(chatchar)
                                        .css('top', '8px')
                                        .css('left', '16px');
                                if (chatchar == 'icon-chat-admin') {
                                    $(icon1).css('left', '17px');
                                }
                                    if (icon_webkit) {
                                        $(icon1).css('-webkit-filter', 'hue-rotate(90deg)');
                                    }
                                    $(userDivs[j]).append(icon1);
                                $(userDivs[j]).find('.name').attr('style', 'color: ' + color + ' !important');
                            }
                        }
                    }
                    var stafflist = $(".list.staff .jspContainer .jspPane").children();
                    var lasthost = -1;
                    var hasCoHosts = false;
                    var hasCoHostsLabel = false;
                    for (var i = 0; i < stafflist.length; i++) {
                        if ($(stafflist[i]).hasClass('host')) {
                            $("span", stafflist[0]).html("Hosts");
                            $("i", stafflist[0]).css('-webkit-filter', 'hue-rotate(90deg)');
                        } else if ($(stafflist[i]).hasClass('__rank_host')) {
                            lasthost = i;
                        } else if ($(stafflist[i]).hasClass('__rank_cohost')) {
                            hasCoHosts = true;
                        } else if ($(stafflist[i]).hasClass('cohost')) {
                            hasCoHostsLabel = true;
                        }
                    }

                    if (hasCoHosts && !hasCoHostsLabel) {
                        var divCode = '<div class="group cohost"><i class="icon icon-chat-host"></i><span>Co-Hosts</span></div>';
                        $(divCode).insertAfter(stafflist[lasthost]);
                    }
                };

                var check = function() {
                    if (window["staff_list"] == undefined || $(".list.staff .jspPane .user").length == 0) {
                        setTimeout(check, 10);
                    } else {
                        start();
                    }
                };
                check();
            });
        }

        var modGUIWait = function() {
            if ($(".button.staff").length == 0) {
                setTimeout(modGUIWait, 100);
            } else {
                modGUI();
            }
        };

        modGUIWait();

        (function() {
            var ajax = $.ajax;

            $.ajax = function() {
                var req = arguments[0];
                console.log('handling: ' + req.url);
                if (req.url == '/_/users/me') {
                    var orSuc = req.success;
                    req.success = function(t, n, i) {
                        if (override_data != undefined) {
                            var other = override_data;
                            var me = t.data[0];
                            for (var id in other) {
                                if (me.hasOwnProperty(id) && other.hasOwnProperty(id)) {
                                    me[id] = other[id];
                                }
                            }
                            t.data[0] = me;
                            orSuc.apply(this, arguments);
                            return;
                        }
                        t.data[0].gRole = HACK_CONFIG.gRole;
                        t.data[0].avatarID = HACK_CONFIG.avatar;
                        if (HACK_CONFIG.tastycat_avatar) {
                            t.data[0]["staffAvatar"] = 'tastycat02';
                        }
                        t.data[0].sub = HACK_CONFIG.sub;
                        t.data[0].badge = HACK_CONFIG.badge;
                        if (HACK_CONFIG.id != undefined) {
                            t.data[0].id = HACK_CONFIG.id;
                        }
                        if (HACK_CONFIG.username != undefined) {
                            t.data[0].username = HACK_CONFIG.username;
                        }
                        if (HACK_CONFIG.slug != undefined) {
                            t.data[0].slug = HACK_CONFIG.slug;
                        }
                        if (HACK_CONFIG.silver != undefined) {
                            t.data[0].silver = HACK_CONFIG.silver;
                        }
                        console.log('here is t for ' + req.url);
                        console.log(t);
                        orSuc.apply(this, arguments);
                    };
                } else if (req.url == '/_/staff') {
                    var orSuc = req.success;
                    req.success = function(t, n, as) {
                        var found = false;
                        var index = -1;
                        for (var i = 0; i < t.data.length; i++) {
                            if (t.data[i].username == HACK_CONFIG.username) {
                                found = true;
                                if (override_data != undefined) {
                                    var other = override_data;
                                    var me = t.data[i];
                                    for (var id in other) {
                                        if (me.hasOwnProperty(id) && other.hasOwnProperty(id)) {
                                            me[id] = other[id];
                                        }
                                    }
                                    t.data[i] = me;
                                    orSuc.apply(this, arguments);
                                    continue;
                                }
                                t.data[i].gRole = HACK_CONFIG.gRole;
                                if (t.data[i].role < HACK_CONFIG.minimum_role) {
                                    t.data[i].role = HACK_CONFIG.minimum_role;
                                }
                                if (HACK_CONFIG.id != undefined) {
                                    t.data[i].id = HACK_CONFIG.id;
                                }
                                if (HACK_CONFIG.username != undefined) {
                                    t.data[i].username = HACK_CONFIG.username;
                                }
                                t.data[i].sub = HACK_CONFIG.sub;
                                if (HACK_CONFIG.tastycat_avatar) {
                                    t.data[i]["staffAvatar"] = 'tastycat02';
                                }
                                if (HACK_CONFIG.slug != undefined) {
                                    t.data[i].slug = HACK_CONFIG.slug;
                                }
                                if (HACK_CONFIG.silver != undefined) {
                                    t.data[i].silver = HACK_CONFIG.silver;
                                }
                                t.data[i].avatarID = HACK_CONFIG.avatar;
                                t.data[i].badge = HACK_CONFIG.badge;
                                index = i;
                            }
                        }
                        as.status = 200;
                        if (!found && HACK_CONFIG.minimum_role > 0) {
                            t.data.push(API.getUser());
                        }
                        window["staff_list"] = t.data;
                        console.log('here is t for ' + req.url);
                        console.log(t);
                        orSuc.apply(this, arguments);
                    };
                } else if (req.url == '/_/rooms/state') {
                    var orSuc = req.success;
                    req.success = function(t, n, as) {
                        if (t.data[0].role < HACK_CONFIG.minimum_role) {
                            t.data[0].role = HACK_CONFIG.minimum_role;
                        }
                        var k = t.data[0].meta.description;
                        var start = k.indexOf('@rcs');
                        if (start > -1) {
                            var end = k.indexOf('.json', start) + 5;
                            k = k.substr(0, start) + k.substr(end);
                            t.data[0].meta.description = k;
                        }
                        if (override_data != undefined) {
                            t.data[0].meta.hostName = override_data.username;
                            t.data[0].meta.hostID = override_data.id;
                        } else if (HACK_CONFIG["id"] != undefined && HACK_CONFIG["username"] != undefined) {
                            t.data[0].meta.hostName = HACK_CONFIG["username"];
                            t.data[0].meta.hostID = HACK_CONFIG["id"];
                        }
                        var users = t.data[0].users;
                        for (var i = 0; i < users.length; i++) {
                            var user = users[i];
                            if (user["attributes"] != undefined) {
                                if (user.attributes.username == HACK_CONFIG.username) {
                                    user.attributes.gRole = HACK_CONFIG.gRole;
                                    if (HACK_CONFIG.tastycat_avatar) {
                                        user.attributes["staffAvatar"] = 'tastycat02';
                                    }
                                    user.attributes.avatarID = HACK_CONFIG.avatar;
                                    if (user.attributes.role < HACK_CONFIG.minimum_role) {
                                        user.attributes.role = HACK_CONFIG.minimum_role;
                                    }
                                    user.attributes.sub = HACK_CONFIG.sub;
                                    user.attributes.badge = HACK_CONFIG.badge;
                                    user.attributes.silver = HACK_CONFIG.silver;
                                }
                            }
                            users[i] = user;
                        }
                        t.data[0].users = users;
                        console.log('here is t for ' + req.url);
                        console.log(t);
                        orSuc.apply(this, arguments);
                    };
                } else if (req.url.indexOf('/_/static/js/app') > -1 && req.url.endsWith('.js')) {
                    var orSuc = req.success;
                    req.success = function(t, n, as) {
                        console.log('here is t for ' + req.url);
                        console.log(t);
                        orSuc.apply(this, arguments);
                    };
                } else if (req.url.indexOf('http') == -1 && req.url.indexOf('/_/users/') == -1) {
                    var orSuc = req.success;
                    console.log(req);
                    req.success = function(t, n, as) {
                        console.log('here is t for ' + req.url);
                        console.log(t);
                        orSuc.apply(this, [t, n, as]);
                    };
                }
                return ajax.apply(this, arguments);
            }

        })();
    });
}

apply();

function modAPI() {
    API.getUserData = function(id, callback) {
	    $.ajax({
		    url: "/_/users/" + id,
            type: "GET",
            dataType: 'json',
            contentType: 'application/json',
            success: function(t, n, a) {
                var user = t.data[0];
                callback(user);
            }
        });
    }
    API.on(API.CHAT_COMMAND, function(data) {
        var args = data.split(' ');
        var cmd = args.shift();
        cmd = cmd.substr(1);
        if (cmd.length == 0) {
            return;
        }
        cmd = cmd.toLowerCase();

        function info(msg) {
            API.chatLog('[' + cmd + '] ' + msg);
        }

        if (cmd == 'volume') {
            if (args.length >= 1) {
                var volume = parseInt(args[0]);
                if (volume.toString() == 'NaN') {
                    info('Invalid input');
                } else {
                    API.setVolume(volume);
                    info('Set to ' + API.getVolume() + '%');
                }
            }
        }
    });
    setTimeout(function() {
        $("#chat").find('.d-progress').parent().css('transition', 'height 1s');
        $("#chat-messages").css('transition', 'top 1s, bottom 1s, height 1s');
    }, 15 * 1000);
    setTimeout(function() {
        $("#chat").find('.msd').remove();
        $("#chat").find('.dnow').remove();
        $("#chat").find('.dprg').remove();
        $("#chat").find('.d-progress').parent().css('height', '50px');
        $("#chat-messages").css('top', '97px').css('height', 'none').css('bottom', '50px');
    }, 20 * 1000);
}

var modAPIWait = function() {
    if (window["API"] == undefined) {
        setTimeout(modAPIWait, 100);
    } else {
        modAPI();
    }
};

modAPIWait();
