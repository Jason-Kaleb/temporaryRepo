
function ksimulateKeyup(code) { 
    var e = jQuery.Event("keyup");
    e.keyCode = code;
    jQuery('body').trigger(e);
}
function ksimulateKeydown(code) { 
    var e = jQuery.Event("keydown");
    e.keyCode = code;
    jQuery('body').trigger(e);
}

$(document).ready(function() { 
    const s = JSON.parse(localStorage.getItem("digitalAssets"));
    console.log(s)
    //loadAllSound();	
    if(s != null)		
    {
        initHome();
        io();
    }

    function io(){
        $(".sound").click(function(e) { 
            e.stopPropagation();
            
            var sound = $(this).attr("data-sound");
            if ( sound === "on" ) { 
                $(".sound").attr("data-sound", "off");
                $(".sound").find("img").attr("src", "img/sound-off.png");
                GROUP_SOUND.mute();
            } else { 
                $(".sound").attr("data-sound", "on");
                $(".sound").find("img").attr("src", "img/sound-on.png");
                GROUP_SOUND.unmute();
            }
        });    
        $("#home").on("click touchstart", function(e) { 
            if ( $('#help').css("display") === "none") { 
                e.preventDefault();
                simulateKeydown(13);
            }
        });
        $("#control-up, #control-up-second, #control-up-big").on("mousedown touchstart", function(e) { 
            e.preventDefault();
            simulateKeydown(38);
            simulateKeyup(13);
        });
        $("#control-down, #control-down-second, #control-down-big").on("mousedown touchstart", function(e) { 
            e.preventDefault();
            simulateKeydown(40);
            simulateKeyup(13);
        });
        $("#control-left, #control-left-big").on("mousedown touchstart", function(e) { 
            e.preventDefault();
            simulateKeydown(37);
            simulateKeyup(13);
        });
        $("#control-right, #control-right-big").on("mousedown touchstart", function(e) { 
            e.preventDefault();
            simulateKeydown(39);
            simulateKeyup(13);
        });    
        $("body").keyup(function(e) { 
            KEYDOWN = false;
        });    
        $("body").keydown(function(e) { 
            //if(localStorage.getItem("digitalAssets"))
            {
                if (HOME) { 

                        initGame(true);
                    
                    
                } else { 				
                    
                        KEYDOWN = true;
                        if (PACMAN_DEAD && !LOCK) { 
                            erasePacman();
                            resetPacman();
                            drawPacman();
                            
                            eraseGhosts();
                            resetGhosts();
                            drawGhosts();
                            moveGhosts();
                            
                            blinkSuperBubbles();
                            
                        } else if (e.keyCode >= 37 && e.keyCode <= 40 && !PAUSE && !PACMAN_DEAD && !LOCK) { 
                            if ( e.keyCode === 39 ) { 
                                movePacman(1);
                            } else if ( e.keyCode === 40 ) { 
                                movePacman(2);
                            } else if ( e.keyCode === 37 ) { 
                                movePacman(3);
                            } else if ( e.keyCode === 38 ) { 
                                movePacman(4);
                            }
                        } else if (e.keyCode === 68 && !PAUSE) { 

                        } else if (e.keyCode === 80 && !PACMAN_DEAD && !LOCK) { 
                            if (PAUSE) { 
                                resumeGame();
                            } else { 
                                pauseGame();
                            }
                        } else if (GAMEOVER) { 
                            initHome();
                        }
                    
                }
            }
        });
    }
});

