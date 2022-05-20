function livello1(blocks) {
    let b = 0;
    for (let i = 0; i < 10; i++)
        for (let j = 0; j < 3; j++)
            if ((i + j) % 2 == 0)
                blocks[b++] = new Block(i * BLOCKWIDTH, j * BLOCKHEIGHT + 29, "green")
            else
                blocks[b++] = new Block(i * BLOCKWIDTH, j * BLOCKHEIGHT + 29, "red")
    return b;
}

function livello2(blocks) {
    color = ["green", "red", "blue", "yellow", "orange", "red", "blue", "green", "yellow", "orange"]
    let b = 0;
    for (let i = 1; i <= 9; i++)
        for (let j = 0; j < i; j++) {
            blocks[b] = new Block(j * BLOCKWIDTH, (9 - i) * BLOCKHEIGHT + 17, color[i])
            b++
        }
    return b;
}

function livelloTest0(blocks) {
    let b = 0;
    blocks[b++] = new Block(22, 30, "blue")
    return b;
}

function livelloTest1(){
    return 1;
}

function livello4(blocks) {
    let b = 0;
    blocks[b++] = new Block(4 * BLOCKWIDTH, 8 * BLOCKHEIGHT - 1, "yellow")
    blocks[b++] = new Block(5 * BLOCKWIDTH, 9 * BLOCKHEIGHT - 1, "yellow")
    blocks[b++] = new Block(6 * BLOCKWIDTH, 10 * BLOCKHEIGHT - 1, "yellow")
    blocks[b++] = new Block(6 * BLOCKWIDTH, 11 * BLOCKHEIGHT - 1, "yellow")
    blocks[b++] = new Block(5 * BLOCKWIDTH, 12 * BLOCKHEIGHT - 1, "yellow")
    blocks[b++] = new Block(5 * BLOCKWIDTH, 13 * BLOCKHEIGHT - 1, "yellow")
    blocks[b++] = new Block(4 * BLOCKWIDTH, 13 * BLOCKHEIGHT - 1, "yellow")
    blocks[b++] = new Block(4 * BLOCKWIDTH, 14 * BLOCKHEIGHT - 1, "yellow")
    blocks[b++] = new Block(5 * BLOCKWIDTH, 14 * BLOCKHEIGHT - 1, "yellow")
    blocks[b++] = new Block(6 * BLOCKWIDTH, 12 * BLOCKHEIGHT - 1, "yellow")
    blocks[b++] = new Block(5 * BLOCKWIDTH, 10 * BLOCKHEIGHT - 1, "yellow")
    blocks[b++] = new Block(4 * BLOCKWIDTH, 9 * BLOCKHEIGHT - 1, "yellow")
    for (let i = 0; i < 8; i++) {
        blocks[b] = new Block((i + 1) * BLOCKWIDTH, 16 * BLOCKHEIGHT - 1, "white")
        b++;
    }
    for (let i = 0; i < 6; i++) {
        blocks[b] = new Block((i + 2) * BLOCKWIDTH, 17 * BLOCKHEIGHT - 1, "white")
        b++;
        blocks[b] = new Block((i + 2) * BLOCKWIDTH, 15 * BLOCKHEIGHT - 1, "white")
        b++;
    }
    return b;
}

function livello5(blocks) {
    let b = 0;
    for (let i = 0; i < 10; i++)
        for (let j = 0; j < 3; j++)
            if ((i + j) % 2 == 0)
                blocks[b++] = new Block(i * BLOCKWIDTH, j * BLOCKHEIGHT + 29, "gold")
            else
                blocks[b++] = new Block(i * BLOCKWIDTH, j * BLOCKHEIGHT + 29, "green")
    return b;
}

function livello6(blocks) {
    let b = 0;
    for (let i = 0; i < 10; i++)
        blocks[b++] = new Block(i * BLOCKWIDTH, 33, "red")
    let j = b;
    for (let i = 0; i < 8; i++)
        blocks[j++] = new Block(i * BLOCKWIDTH, 25, "black")
    for (let i = 2; i < 10; i++)
        blocks[j++] = new Block(i * BLOCKWIDTH, 29, "black")
    return b;
}

function livello7(blocks) {
    let b = 0;
    for (let i = 0; i < 10; i=i+2)
        for (let j = 0; j < i; j=j+2){
            blocks[b++] = new Block(i * BLOCKWIDTH -2, j* BLOCKHEIGHT + 19 , "red")
            blocks[b++] = new Block(i * BLOCKWIDTH -2, (j+1)* BLOCKHEIGHT + 19  , "gold")
        }
    return b;
}