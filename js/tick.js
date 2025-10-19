let tick = 0;

function timedCount() {
    tick++
    setTimeout("timedCount()", 1);
}

timedCount();