// 初期画面起動時
// 初期変数定義
var turn = 1 
// 盤面の状況を二次元配列で定義
var ban_ar = new Array(3)
for (var x = 0; x < ban_ar.length; x++){
    ban_ar[x] = new Array(3)
}
var number=0;
var ban = document.getElementById('field');
ban_new()
ban_init(0)
ban_set()

var flag=0;
var flag2=0;
var flag3=0;
var cnt=0;
function co(val){
    for(var i=0;i<2;i++){
        if(String(i)===val){
            number=i;
            break;
        }
    }
    ban_init(number)
    ban_set()
    
}

function level(val){
    if(val===String(2)){
        flag3=0;
    }
    else if(val===String(3)){
        flag3=1;
    }
    else{
        flag3=2;
    }
    ban_init(number)
    ban_set()
}



// 取得したテーブルに盤面生成

// クリックした時に実行されるイベント


for (var x = 0; x < 3; x++) {
    for (var y = 0; y < 3; y++) {
        var select_cell = ban.rows[x].cells[y];
        select_cell.onclick = function() {
        // クリックされた場所に石がない場合は、その場所にターン側の石が置けるかチェックし
        // 置ける場合は、盤面を更新。相手のターンへ移る
            if (flag===0&&ban_ar[this.parentNode.rowIndex][this.cellIndex] == 0) {
                ban_ar[this.parentNode.rowIndex][this.cellIndex]=turn;
                cnt++;
                turn*=-1;
                flag2=0;
                ban_set()
                ban_check()
                if(flag===0){
                    if(flag3===2){
                        expert_ai()
                        if(flag2===0){
                            ai()
                        }
                    }
                    else if(flag3===1){
                        smart_ai()
                        if(flag2===0){
                            ai()        
                        }
                    }
                    else{
                        ai()
                    }
                    
                    cnt++;
                    turn*=-1;
                    ban_set()
                    ban_check()
                }
            }
        }
    }
}

function change_turn(){
    var tarn_msg = document.getElementById('view_tarn')
    if(turn == -1){
    // 0は最初として、メッセージのみで処理終了
        tarn_msg.textContent = "○'s turn!"
        return
    }
    else{
        tarn_msg.textContent = "×'s turn!"
        return
    }

}

function ban_check(){
    var tarn_msg = document.getElementById('view_tarn')
    if(flag===0&&(ban_ar[1][1]!==0&&ban_ar[1][1]===ban_ar[0][0]&&ban_ar[1][1]===ban_ar[2][2])
    || (ban_ar[1][1]!==0&&ban_ar[1][1]===ban_ar[0][2]&&ban_ar[1][1]===ban_ar[2][0])
    || (ban_ar[0][0]!==0&&ban_ar[0][0]===ban_ar[0][1]&&ban_ar[0][1]===ban_ar[0][2])
    || (ban_ar[1][1]!==0&&ban_ar[1][1]===ban_ar[1][0]&&ban_ar[1][1]===ban_ar[1][2])
    || (ban_ar[2][1]!==0&&ban_ar[2][1]===ban_ar[2][0]&&ban_ar[2][1]===ban_ar[2][2])
    || (ban_ar[1][1]!==0&&ban_ar[1][1]===ban_ar[0][1]&&ban_ar[1][1]===ban_ar[2][1])
    || (ban_ar[1][0]!==0&&ban_ar[1][0]===ban_ar[0][0]&&ban_ar[1][0]===ban_ar[2][0])
    || (ban_ar[1][2]!==0&&ban_ar[1][2]===ban_ar[0][2]&&ban_ar[1][2]===ban_ar[2][2])){
        if(turn == 1){
        // 0は最初として、メッセージのみで処理終了
            tarn_msg.textContent = "×'s win!"
            flag=1;
            cnt=0;
            return;
        }
        else{
            tarn_msg.textContent = "○'s win!"
            flag=1;
            cnt=0;
            return;
        }
    }
    else if(cnt==9){
        tarn_msg.textContent = "Draw!"
        flag=1;
        cnt=0;
        return;
    }
}

// テーブルで盤面を作成する処理
function ban_new() {
    for (var x = 0; x < 3; x++) {
        var tr = document.createElement("tr")
        ban.appendChild(tr)
        for (var y = 0; y < 3; y++) {
            var td = document.createElement("td")
            tr.appendChild(td)
        }
    }
};

// 盤面状況(配列)を実際の盤面へ反映させる処理
function ban_set () {
    var stone = ""
    for (var x = 0; x < 3; x++) {
        for (var y = 0; y < 3; y++) {
            switch( ban_ar[x][y] ) {
                case 0:
                stone = "-"
                break;
                case -1:
                stone = "×"
                break;
                case 1:
                stone = "○"
                break;
            }
            ban.rows[x].cells[y].innerHTML = stone;
        }
    }
    return true
};

// 盤面を初期化する処理
function ban_init (number) {
    // 全てをクリア
    for (var x = 0; x < 3; x++) {
        for (var y = 0; y < 3; y++) {
            ban_ar[x][y] = 0
        }
    }
    
    ban_set()
    flag=0;
    var tarn_msg = document.getElementById('view_tarn');
    if(number===0){
        tarn_msg.textContent = "○'s turn!"
        turn=1;
        cnt=0;
    }
    else{
        turn=1;
        tarn_msg.textContent = "×'s turn!"
        ai()
        ban_set()
        cnt=1;
        turn=-1;
    }
    return;

    // ターンも初期化
};

function ai(){
    var s=[];
    var cnt=0;
    for(var i=0;i<3;i++){
        for(var j=0;j<3;j++){
            if(ban_ar[i][j]===0){
                s.push([i,j]);
                cnt++;
            }
        }
    }
    var random=Math.floor(Math.random()*s.length);
    ban_ar[s[random][0]][s[random][1]]=turn;
}

function smart_ai(){
    var i=0;
    while(flag2===0&&i<3){
        if(ban_ar[i][2]===0&&ban_ar[i][0]!==0&&ban_ar[i][0]===ban_ar[i][1]){
            ban_ar[i][2]=turn;
            flag2=1;
        }
        else if(ban_ar[i][1]===0&&ban_ar[i][0]!==0&&ban_ar[i][0]===ban_ar[i][2]){
            ban_ar[i][1]=turn;
            flag2=1;
        }
        else if(ban_ar[i][0]===0&&ban_ar[i][2]!==0&&ban_ar[i][1]===ban_ar[i][2]){
            ban_ar[i][0]=turn;
            flag2=1;
        }
        i=i+1;
    }

    i=0;
    while(flag2===0&&i<3){
        if(ban_ar[2][i]===0&&ban_ar[0][i]!==0&&ban_ar[0][i]===ban_ar[1][i]){
            ban_ar[2][i]=turn;
            flag2=1;
        }
        else if(ban_ar[1][i]===0&&ban_ar[0][i]!==0&&ban_ar[0][i]===ban_ar[2][i]){
            ban_ar[1][i]=turn;
            flag2=1;
        }
        else if(ban_ar[0][i]===0&&ban_ar[2][i]!==0&&ban_ar[1][i]===ban_ar[2][i]){
            ban_ar[0][i]=turn;
            flag2=1;
        }
        i=i+1;
    }
    if(flag2===0){
        if(ban_ar[0][0]===0&&ban_ar[1][1]!==0&&ban_ar[1][1]===ban_ar[2][2]){
            ban_ar[0][0]=turn;
            flag2=1;
        }
        else if(ban_ar[1][1]===0&&ban_ar[0][0]!==0&&ban_ar[0][0]===ban_ar[2][2]){
            ban_ar[1][1]=turn;
            flag2=1;
        }
        else if(ban_ar[2][2]===0&&ban_ar[1][1]!==0&&ban_ar[1][1]===ban_ar[0][0]){
            ban_ar[2][2]=turn;
            flag2=1;
        }
    }
    if(flag2===0){
        if(ban_ar[0][2]===0&&ban_ar[1][1]!==0&&ban_ar[1][1]===ban_ar[2][0]){
            ban_ar[0][2]=turn;
            flag2=1;
        }
        else if(ban_ar[1][1]===0&&ban_ar[0][2]!==0&&ban_ar[0][2]===ban_ar[2][0]){
            ban_ar[1][1]=turn;
            flag2=1;
        }
        else if(ban_ar[2][0]===0&&ban_ar[0][2]!==0&&ban_ar[1][1]===ban_ar[0][2]){
            ban_ar[2][0]=turn;
            flag2=1;
        }
    }
    return flag2;
    
}

function expert_ai(){
    var i=0;
    while(flag2===0&&i<3){
        if(ban_ar[i][2]===0&&ban_ar[i][0]===turn&&ban_ar[i][0]===ban_ar[i][1]){
            ban_ar[i][2]=turn;
            flag2=1;
        }
        else if(ban_ar[i][1]===0&&ban_ar[i][0]===turn&&ban_ar[i][0]===ban_ar[i][2]){
            ban_ar[i][1]=turn;
            flag2=1;
        }
        else if(ban_ar[i][0]===0&&ban_ar[i][2]===turn&&ban_ar[i][1]===ban_ar[i][2]){
            ban_ar[i][0]=turn;
            flag2=1;
        }
        i=i+1;
    }

    i=0;
    while(flag2===0&&i<3){
        if(ban_ar[2][i]===0&&ban_ar[0][i]===turn&&ban_ar[0][i]===ban_ar[1][i]){
            ban_ar[2][i]=turn;
            flag2=1;
        }
        else if(ban_ar[1][i]===0&&ban_ar[0][i]===turn&&ban_ar[0][i]===ban_ar[2][i]){
            ban_ar[1][i]=turn;
            flag2=1;
        }
        else if(ban_ar[0][i]===0&&ban_ar[2][i]===turn&&ban_ar[1][i]===ban_ar[2][i]){
            ban_ar[0][i]=turn;
            flag2=1;
        }
        i=i+1;
    }
    if(flag2===0){

        if(ban_ar[0][0]===0&&ban_ar[1][1]===turn&&ban_ar[1][1]===ban_ar[2][2]){
            ban_ar[0][0]=turn;
            flag2=1;
        }
        else if(ban_ar[1][1]===0&&ban_ar[0][0]===turn&&ban_ar[0][0]===ban_ar[2][2]){
            ban_ar[1][1]=turn;
            flag2=1;
        }
        else if(ban_ar[2][2]===0&&ban_ar[1][1]===turn&&ban_ar[1][1]===ban_ar[0][0]){
            ban_ar[2][2]=turn;
            flag2=1;
        }
    }
    if(flag2===0){
        if(ban_ar[0][2]===0&&ban_ar[1][1]===turn&&ban_ar[1][1]===ban_ar[2][0]){
            ban_ar[0][2]=turn;
            flag2=1;
        }
        else if(ban_ar[1][1]===0&&ban_ar[0][2]===turn&&ban_ar[0][2]===ban_ar[2][0]){
            ban_ar[1][1]=turn;
            flag2=1;
        }
        else if(ban_ar[2][0]===0&&ban_ar[0][2]===turn&&ban_ar[1][1]===ban_ar[0][2]){
            ban_ar[2][0]=turn;
            flag2=1;
        }
    }


    i=0;
    while(flag2===0&&i<3){
        if(ban_ar[i][2]===0&&ban_ar[i][0]===-turn&&ban_ar[i][0]===ban_ar[i][1]){
            ban_ar[i][2]=turn;
            flag2=1;
        }
        else if(ban_ar[i][1]===0&&ban_ar[i][0]===-turn&&ban_ar[i][0]===ban_ar[i][2]){
            ban_ar[i][1]=turn;
            flag2=1;
        }
        else if(ban_ar[i][0]===0&&ban_ar[i][2]===-turn&&ban_ar[i][1]===ban_ar[i][2]){
            ban_ar[i][0]=turn;
            flag2=1;
        }
        i=i+1;
    }

    i=0;
    while(flag2===0&&i<3){
        if(ban_ar[2][i]===0&&ban_ar[0][i]===-turn&&ban_ar[0][i]===ban_ar[1][i]){
            ban_ar[2][i]=turn;
            flag2=1;
        }
        else if(ban_ar[1][i]===0&&ban_ar[0][i]===-turn&&ban_ar[0][i]===ban_ar[2][i]){
            ban_ar[1][i]=turn;
            flag2=1;
        }
        else if(ban_ar[0][i]===0&&ban_ar[2][i]===-turn&&ban_ar[1][i]===ban_ar[2][i]){
            ban_ar[0][i]=turn;
            flag2=1;
        }
        i=i+1;
    }
    if(flag2===0){

        if(ban_ar[0][0]===0&&ban_ar[1][1]===-turn&&ban_ar[1][1]===ban_ar[2][2]){
            ban_ar[0][0]=turn;
            flag2=1;
        }
        else if(ban_ar[1][1]===0&&ban_ar[0][0]===-turn&&ban_ar[0][0]===ban_ar[2][2]){
            ban_ar[1][1]=turn;
            flag2=1;
        }
        else if(ban_ar[2][2]===0&&ban_ar[0][0]===-turn&&ban_ar[1][1]===ban_ar[0][0]){
            ban_ar[2][2]=turn;
            flag2=1;
        }
    }
    if(flag2===0){
        if(ban_ar[0][2]===0&&ban_ar[1][1]===-turn&&ban_ar[1][1]===ban_ar[2][0]){
            ban_ar[0][2]=turn;
            flag2=1;
        }
        else if(ban_ar[1][1]===0&&ban_ar[0][2]===-turn&&ban_ar[0][2]===ban_ar[2][0]){
            ban_ar[1][1]=turn;
            flag2=1;
        }
        else if(ban_ar[2][0]===0&&ban_ar[1][1]===-turn&&ban_ar[1][1]===ban_ar[0][2]){
            ban_ar[2][0]=turn;
            flag2=1;
        }
    }
    return flag2;
}






