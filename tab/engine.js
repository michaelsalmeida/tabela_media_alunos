let notas = 1; // numero de campos de notas que existem na tabela - máx 6 notas
let alunos = 0; // número de campos de alunos que existem na tabela - máx 10 alunos


// maior que 65 aprovado, 50 ~ 65 recuperação, < 50 reprovado.


function criar_tabela_aluno(){

        //função que gera a tabela aumentando a quantidade de alunos na tabela. 

        alunos++;
        var tab = `<table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nome</th>
                            ${gerar_head(notas)}        
                            <th scope="col">Média</th>
                            <th scope="col">Situação</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${gerar_alunos()}
                    </tbody>
                </table>`


    document.getElementById('tabelaa').innerHTML = tab;
    

    if (alunos == 10) {
        document.getElementById('alunoo').disabled = true;
   
    }
    
}

function criar_tabela_nota(){

        //função que gera a tabela aumentando a quantidade de notas dos alunos na tabela. 

    
        notas++;
        var tab = `<table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nome</th>
                            ${gerar_head(notas)}        
                            <th scope="col">Média</th>
                            <th scope="col">Situação</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${gerar_alunos()}
                    </tbody>
                </table>`


    document.getElementById('tabelaa').innerHTML = tab;
    
    if (notas == 6){
        document.getElementById('notaa').disabled = true;
    }

}



function gerar_head(notas){

    // funcão que retorna o cabecalho da tabela dinamicamente de acordo com a quantidade de notas que o usuário escolher

    var str = ``;

    for (i = 0; i < notas; i++){
        str += `<th scope="col">Nota ${i + 1}</th>`
    }

    return str
}



function gerar_alunos(){

    // função que retorna as linhas dos alunos dinamicamente

    var strr = ``;

    for (j = 0;j < alunos; j++){
        strr += `<tr>
                    <th>${j + 1}</th>
                    <td><input type="text" class="form-control" id="nome${j + 1}" placeholder="nome"></td>
                    ${gerar_notas(j)}
                    <td><output id = "media${j + 1}"></output></td>
                    <td><output id = "situ${j + 1}"></output></td>
                </tr> `  
    }

    return strr
}


function gerar_notas(al){

    // função que retorna a quantidade de input de notas dinamicamente com a quantidade 
    // de clicks que o usuário deu para aumentar a quantidade de notas

    var str = ``;

    for (x = 0; x < notas; x++){
        str += `<td><input type="number" class="form-control" id="nota${al + 1}${x + 1}" placeholder="" onchange="media()"></td>`
    }

    return str
}


function media(){

    //calcula a média de cada aluno e insere no output a média das notas e a situação desse aluno
    
    for (j = 0; j < alunos; j++){ // loop responsável pelos alunos
        let soma = 0;

        for (i = 0; i < notas; i++){ // loop responsável pela quantidade de notas que esse aluno tem para calcular a média
            
            n = Number(document.getElementById(`nota${j + 1}${i + 1}`).value);
            if (n == ''){
                soma += 0;
            } else {
                soma += n;
            }
        }


        let media = soma / notas;
        media.round;

        document.getElementById(`media${j + 1}`).innerHTML = '';
        document.getElementById(`media${j + 1}`).innerHTML = `<p>${media}</p>`;

        if (media < 50){
            document.getElementById(`situ${j + 1}`).innerHTML = `<p style="background-color:red;">REPROVADO</p>`;
        } else if (media > 50 && media < 66){
            document.getElementById(`situ${j + 1}`).innerHTML = `<p style="background-color:yellow;">RECUPERAÇÃO</p>`;
        } else if (media > 65){
            document.getElementById(`situ${j + 1}`).innerHTML = `<p style="background-color:green;">APROVADO</p>`;
        }

        soma = 0;

    }

}
    


function obter_dados(){ // função que pega os dados do front e retorna em um dicionário/objeto
    dados = {};
    let erro = false;

    for (i = 0; i < alunos; i++){
        let nome = document.getElementById(`nome${i + 1}`).value;
        let notaas = [];
        
        
        for (x = 0; x < notas; x++){

            nn = Number(document.getElementById(`nota${i + 1}${x + 1}`).value);
            if (isNaN(nn)){
                notaas.push(0);
            } else if (nn < 0 || nn > 100) {
                erro = true;
            } else {
                notaas.push(nn);
            }

        }
        

        notaas.push(document.getElementById(`media${i + 1}`).value);
        notaas.push(document.getElementById(`situ${i + 1}`).value);

        dados[nome] = notaas;
    }

    if (erro == false){
        return dados
    } else if (erro == true){
        
        return false
    }
    
}


function ordem_alfabetica(){
    let dados = obter_dados(); //{'michael': [23, 54, 23, 'reprovado']}

    if (dados == false){
        alert('As notas só podem estar entre 0 e 100')
    } else {
        let nomes = Object.keys(dados);
        nomes.sort();


        for (y = 0; y < alunos; y++){

            document.getElementById(`nome${y + 1}`).value = nomes[y];

            

            let pessoa = nomes[y];

            for (z = 0; z < notas; z++){

                document.getElementById(`nota${y + 1}${z + 1}`).value = dados[pessoa][z];

            }

            document.getElementById(`media${y + 1}`).innerHTML = dados[nomes[y]][notas];

            if (dados[nomes[y]][notas + 1] == "REPROVADO"){
                document.getElementById(`situ${y + 1}`).innerHTML = `<p style = "background-color: red;">${dados[nomes[y]][notas + 1]}</p>`;
            } else if (dados[nomes[y]][notas + 1] == "RECUPERAÇÃO") {
                document.getElementById(`situ${y + 1}`).innerHTML = `<p style = "background-color: yellow;">${dados[nomes[y]][notas + 1]}</p>`;
            } else {
                document.getElementById(`situ${y + 1}`).innerHTML = `<p style = "background-color: green;">${dados[nomes[y]][notas + 1]}</p>`;
            }

        }

    }
    

}


function ordem_media(){
    let dados = obter_dados();

    if (dados == false){
        alert('As notas só podem estar entre 0 e 100')
    } else {
        let alu = Object.keys(dados);
        let notass = [];
        let nomess = [];

        for (a = 0; a < alunos; a++){
            notass.push(Number(dados[alu[a]][notas]));
        }

        notass.sort(function(a, b) {
            return b - a;
        });

        
        for (b = 0; b < alunos; b++){
            let aaa = notass[b];

            for (c = 0; c < alunos; c++){
                if (dados[alu[c]][notas] == aaa){
                    nomess.push(alu[c])
                }
            }
        }
        

        for (d = 0; d < alunos; d++){
            document.getElementById(`nome${d + 1}`).value = nomess[d];

            let pessoa = nomess[d];

            for (z = 0; z < notas; z++){

                document.getElementById(`nota${d + 1}${z + 1}`).value = dados[pessoa][z];

            }

            document.getElementById(`media${d + 1}`).innerHTML = dados[nomess[d]][notas];
            // document.getElementById(`situ${d + 1}`).innerHTML = dados[nomess[d]][notas + 1];       


            if (dados[nomess[d]][notas + 1] == "REPROVADO"){
                document.getElementById(`situ${d + 1}`).innerHTML = `<p stdle = "background-color: red;">${dados[nomess[d]][notas + 1]}</p>`;
            } else if (dados[nomess[d]][notas + 1] == "RECUPERAÇÃO") {
                document.getElementById(`situ${d + 1}`).innerHTML = `<p stdle = "background-color: yellow;">${dados[nomess[d]][notas + 1]}</p>`;
            } else {
                document.getElementById(`situ${d + 1}`).innerHTML = `<p stdle = "background-color: green;">${dados[nomess[d]][notas + 1]}</p>`;
            }

        }

    }
    
    
        


    }


function mediageral(){
    let dados = obter_dados();
    let alu = Object.keys(dados);
    let div = 0;
    let media = 0;

    for (a = 0; a < alunos; a++){
        media += Number(dados[alu[a]][notas]);
        div += 1
    }

    let med = media / div

    document.getElementById('tot').innerHTML = `média do grupo:
                                        ${med}    `


}