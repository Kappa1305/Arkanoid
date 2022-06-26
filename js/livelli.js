// le funzioni restituiscono il numero di blocchi nel livello

function livelloTest0(blocks) {
    let b = 0;
    blocks[b++] = new Block(3, 9, "blue")
    return b;
}

function livelloTest1() {
    return 1;
}

/* [the begin] */
function livello1(blocks) {
    let b = 0;
    for (let i = 0; i < 10; i++)
        for (let j = 0; j < 3; j++)
            if ((i + j) % 2 == 0)
                blocks[b++] = new Block(i, j, "green")
            else
                blocks[b++] = new Block(i, j, "red")

    return b;
}

/* [pride] */

function livello2(blocks) {
    color = ["green", "red", "blue", "yellow", "orange", "red", "blue", "green", "yellow", "orange"]
    let b = 0;
    for (let i = 1; i <= 9; i++)
        for (let j = 0; j < i; j++) {
            blocks[b++] = new Block(j, (9 - i), color[i])
        }

    return b;
}

/* [sun (flower)] */
function livello3(blocks) {
    let b = 0;
    blocks[b++] = new Block(4, 0, "yellow");
    blocks[b++] = new Block(5, 0, "yellow");
    blocks[b++] = new Block(6, 1, "yellow");
    blocks[b++] = new Block(7, 2, "yellow");
    blocks[b++] = new Block(7, 3, "yellow");
    blocks[b++] = new Block(7, 4, "yellow");
    blocks[b++] = new Block(6, 5, "yellow");
    blocks[b++] = new Block(5, 6, "yellow");
    blocks[b++] = new Block(4, 6, "yellow");
    blocks[b++] = new Block(3, 5, "yellow");
    blocks[b++] = new Block(2, 4, "yellow");
    blocks[b++] = new Block(2, 3, "yellow");
    blocks[b++] = new Block(2, 2, "yellow");
    blocks[b++] = new Block(3, 1, "yellow");
    blocks[b++] = new Block(4, 1, "orange");
    blocks[b++] = new Block(5, 1, "orange");
    blocks[b++] = new Block(6, 2, "orange");
    blocks[b++] = new Block(6, 3, "orange");
    blocks[b++] = new Block(6, 4, "orange");
    blocks[b++] = new Block(5, 5, "orange");
    blocks[b++] = new Block(4, 5, "orange");
    blocks[b++] = new Block(3, 4, "orange");
    blocks[b++] = new Block(3, 3, "orange");
    blocks[b++] = new Block(3, 2, "orange");
    blocks[b++] = new Block(4, 2, "red");
    blocks[b++] = new Block(4, 3, "red");
    blocks[b++] = new Block(4, 4, "red");
    blocks[b++] = new Block(5, 2, "red");
    blocks[b++] = new Block(5, 3, "red");
    blocks[b++] = new Block(5, 4, "red");

    return b;

}

/* [Mattia] */
function livello4(blocks) {
    let b = 0;
    blocks[b++] = new Block(4, 9, "yellow")
    blocks[b++] = new Block(5, 8, "yellow")
    blocks[b++] = new Block(6, 7, "yellow")
    blocks[b++] = new Block(6, 6, "yellow")
    blocks[b++] = new Block(5, 5, "yellow")
    blocks[b++] = new Block(5, 4, "yellow")
    blocks[b++] = new Block(4, 4, "yellow")
    blocks[b++] = new Block(4, 3, "yellow")
    blocks[b++] = new Block(5, 3, "yellow")
    blocks[b++] = new Block(6, 5, "yellow")
    blocks[b++] = new Block(5, 7, "yellow")
    blocks[b++] = new Block(4, 8, "yellow")
    for (let i = 0; i < 8; i++) {
        blocks[b] = new Block((i + 1), 1, "white")
        b++;
    }
    for (let i = 0; i < 6; i++) {
        blocks[b] = new Block((i + 2), 0, "white")
        b++;
        blocks[b] = new Block((i + 2), 2, "white")
        b++;
    }

    return b;
}

/* [Double hit] */
function livello5(blocks) {
    let b = 0;
    for (let i = 0; i < 10; i++)
        for (let j = 0; j < 3; j++)
            if ((i + j) % 2 == 0)
                blocks[b++] = new Block(i, j, "gold")
            else
                blocks[b++] = new Block(i, j, "green")

    return b;
}

/* [hard level] */
function livello6(blocks) {
    let b = 0;
    for (let i = 0; i < 10; i++)
        blocks[b++] = new Block(i, 0, "red")
    let j = b;
    for (let i = 0; i < 8; i++)
        blocks[j++] = new Block(i, 3, "black")
    for (let i = 2; i < 10; i++)
        blocks[j++] = new Block(i, 5, "black")

    return b;
}

/* [Re mida] */
function livello7(blocks) {
    let b = 0;
    for (let i = 0; i < 10; i = i + 2)
        for (let j = 0; j < i; j = j + 2) {
            blocks[b++] = new Block(i - 2, j, "red")
            blocks[b++] = new Block(i - 2, (j + 1), "gold")
        }

    return b;
}

/* [Incroci] */
function livello8(blocks) {
    let b = 0;
    for (let i = 0; i < 5; i++) {
        blocks[b++] = new Block(i, i, "green");
        if (i != 2)
            blocks[b++] = new Block(5 + i, 4 - i, "green");
        if (i != 2)
            blocks[b++] = new Block(4 - i, i, "blue");
        blocks[b++] = new Block(5 + i, i, "blue");
    }

    return b;
}

/* [END] */
function livello9(blocks) {
    let b = 0;
    blocks[b++] = new Block(0, 0, "orange")
    blocks[b++] = new Block(1, 0, "orange")
    blocks[b++] = new Block(2, 0, "orange")
    blocks[b++] = new Block(0, 1, "orange")
    blocks[b++] = new Block(0, 2, "orange")
    blocks[b++] = new Block(1, 2, "orange")
    blocks[b++] = new Block(0, 3, "orange")
    blocks[b++] = new Block(0, 4, "orange")
    blocks[b++] = new Block(1, 4, "orange")
    blocks[b++] = new Block(2, 4, "orange")
    blocks[b++] = new Block(3, 0, "blue")
    blocks[b++] = new Block(3, 1, "blue")
    blocks[b++] = new Block(3, 2, "blue")
    blocks[b++] = new Block(3, 3, "blue")
    blocks[b++] = new Block(3, 4, "blue")
    blocks[b++] = new Block(4, 1, "blue")
    blocks[b++] = new Block(4, 2, "blue")
    blocks[b++] = new Block(5, 2, "blue")
    blocks[b++] = new Block(5, 3, "blue")
    blocks[b++] = new Block(6, 0, "blue")
    blocks[b++] = new Block(6, 1, "blue")
    blocks[b++] = new Block(6, 2, "blue")
    blocks[b++] = new Block(6, 3, "blue")
    blocks[b++] = new Block(6, 4, "blue")
    blocks[b++] = new Block(7, 0, "green")
    blocks[b++] = new Block(7, 1, "green")
    blocks[b++] = new Block(7, 2, "green")
    blocks[b++] = new Block(7, 3, "green")
    blocks[b++] = new Block(7, 4, "green")
    blocks[b++] = new Block(8, 0, "green")
    blocks[b++] = new Block(8, 4, "green")
    blocks[b++] = new Block(9, 1, "green")
    blocks[b++] = new Block(9, 2, "green")
    blocks[b++] = new Block(9, 3, "green")

    return b;
}