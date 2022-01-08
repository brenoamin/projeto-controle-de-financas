![](https://i.imgur.com/xG74tOh.png)

# Desafio | Front-end - Módulo 3

Após alguns meses trabalhando em projetos mais simples, você foi designado pelo seu Tech Lead para desenvolver uma aplicação que será apresentada a um cliente muito importante.

Para acessar o repositório da API que será consumida no front, acesse o seguinte [link](https://github.com/brenoamin/projeto-controle-de-financas/tree/master/API%20consumida%20no%20Front).

Para o seu desenvolvimento foi liberado layout que você pode encontrar no seguinte [ link](https://www.figma.com/file/65wDh5PJwzSy7IYOS4AWAj).

Para acessar o pdf contendo as informações de id e class, acesse o seguinte [link](https://drive.google.com/file/d/1J-ccfMnJrRFxc-vxsRtbN8SHRulwal7U/view?usp=sharing).


O sistema trata-se de uma aplicação para controles de finanças pessoais, e as funcionalidades são: 


- Cadastro de uma nova transação
- Edição de uma transação
- Exclusão de uma transação
- Listagem de transações
- Ordernação dos items conforme clicado no header da tabela nas seguintes colunas: Data, Dia da semana e Valor
- Na parte de resumo, o valor de entradas,saídas e saldo é referente ao que está listado na tabela
- A parte de filtros não é toda obrigatória, veja abaixo:
    - Dia da semana (**Opcional**)
    - Categoria (**Opcional**)
    - Valor 


## Dicas importantes
Você receberá um *boilerplate* (um projeto com algumas configurações prontas).

Para começar a trabalhar você precisará executar alguns comandos, mas isso é somente na **primeira vez**.

1.  Realizar o fork do repositório
2.  Clonar para seu computador o fork feito
3.  Executar o `npm install` (para instalar as dependências)
4.  Executar o `npm start` (Para "rodar" o projeto! Esse passo deve ser executado todas as vezes que você for desenvolver a aplicação)

Quando você fizer todos esse procedimentos, o projeto em `React` irá executar e exibir no seu navegador uma aplicação básica. 

**Observação:** Caso não abra automaticamente o seu navegador, você pode acessar o projeto usando o endereço http://localhost:3000 .


## Detalhamento de Requisitos:

### Cadastro de uma nova transação:

Para cadastrar uma nova transação o usuário deverá clicar no botão `Adicionar Registro`, que ficará logo abaixo da área de `resumo`.

![](https://i.imgur.com/9DLHda6.png)

Ao clicar no referido botão, um modal com a opção de adicionar informações de uma transação deve ser exibido:

![](https://i.imgur.com/8r0yEa7.png)



Nesse modal todas as informações devem ser preenchidas, lembrando que você pode adicionar uma `entrada` ou `saída` de dinheiro, por padrão o valor deve ser o de `saída`, caso o usuário queira adicionar um valor de entrada ele precisará clicar no botão **Entrada**.

*Todos os campos são obrigatórios!

Após realizar as validações, após o usuário clicar no botão **confirmar**, uma nova transação deve ser inserida e a tabela de listagem deve ser atualizada.

É importante lembrar que quando adicionarmos uma nova transação, a área de resumo deve refletir o que a tabela está exibindo, refazendo assim todos os cálculos após a inserção de um novo registro.


### Editar uma transação:

Para editar uma transação o usuário deverá clicar no ícone do lápis, que se encontrará na tabela de listagem de transações:


![](https://i.imgur.com/crhos7x.png)

Esse ícone => ![](https://i.imgur.com/iFD6G3k.png)

Ao clicar no ícone de editar uma transação, o modal (que foi utilizado para adicionar uma nova transação) deverá ser aberto e as informações da transação "clicada", deverão ser preenchidas automaticamente, assim como a imagem abaixo:

![](https://i.imgur.com/EyRegfx.png)

*Novamente, todos os campos são obrigatórios!

Após validar os campos e o usuário clicar em confirmar, a transação deverá ser atualizada na `API` usando requisição do tipo `patch` ou `put` e a transação deverá ser atualizada na tabela de listagem de transações.

### Excluir uma transação:

Para excluir uma transação o usuário deverá clicar no ícone da lixeira, que se encontrará na tabela de listagem de transações:

![](https://i.imgur.com/crhos7x.png)

Esse ícone => ![](https://i.imgur.com/X6GB3kh.png)

Ao clicar nesse ícone, um "popup" irá aparecer para que o usuário confirme ou não a exclusão, fazendo com que não hajam exclusões por engano, veja abaixo como aparece o "popup":

![](https://i.imgur.com/Ohhk1lhm.png)



### Listagem de transações:

As transações registradas por meio dos endpoints da `api`, deverão ser listadas numa tabela que ficará ao centro da página, nessa tabela teremos 6 colunas, sendo:
1. **Data** da transação no formato `dd/mm/yyyy`
2. **Dia da semana**, nessa coluna deveremos utilizar apenas os primeiros nomes dos dias da semana, ao invéz de Segunda-Feira, deveremos utilizar o formato `Segunda`.
3. **Descrição**, nessa coluna listaremos as descrições informadas no cadastro de transação.
4. **Categoria**, aqui vamos mostrar as categorias inseridas em cada uma das transações cadastradas.
5. **Valor**, nessa coluna exibiremos os valores de cada uma das transações. Existem uma regra importante nas cores e nos sinais, para valores de **entrada de dinheiro (credit)** exibimos o número positivo e na cor <span style="color:#7B61FF"><b>roxa</b></span>, já para **Saídas de dinheiro (debit)** exibimos o número na cor <span style="color:#FA8C10"><b>laranja</b></span>.
7. Na última coluna nós não teremos um cabeçalho, nessa coluna ficarão os botões de editar e excluir.

![](https://i.imgur.com/jie9f1T.png)

Cada linha da tabela representa uma transação. Portanto cada botão representa a ação para um registro.


#### Cabeçalho da tabela:

No cabeçalho da tabela deverá haver a opção de clicar e ordenar de forma **crescente** e **decrescente**, para isso basta o usuário clicar no nome da coluna, a cada clique a ordenação deve ser alterada entre **crescente** e **decrescente**.

Cada vez que clicamos no nome da coluna, as ordenações feitas em outras colunas devem ser desfeitas, sendo assim, somente é possível ordenar uma coluna por vez.

As colunas que possuem ordenação são: **Data**, **Dia da semana** e **Valor**.

Veja abaixo o ícone que representa que a coluna está sendo ordenada:

- Ordenando a coluna data de forma crescente (do menor para o maior)
    - ![](https://i.imgur.com/E0cR53u.png)
- Ordenando a coluna Dia da semana de forma decrescente (do maior para o menor)
    - ![](https://i.imgur.com/RzNKinD.png)

**Importante:** Somente a coluna em ordenação deve conter os ícones, resumidamente quando clicamos em uma coluna para ordenar, os outros ícones das demais colunas devem desaparecer.


### Resumo das transações:

O resumo das transações devem ser exibidos numa "box", onde teremos apenas 3 informações:
- Entradas
- Saídas
- Saldo

É importante ressaltar que os valores de entrada, saída e saldos são calculados com base nos elementos mostrados na tabela, ou seja, suponhamos que hajam 10 transações cadastradas na `api`, mas a tabela está recebendo um filtro por **dia da semana** e somente 3 transações estão sendo exibidas, basicamente o resumo deve ser calculado com base nessas 3 transações apenas.


Veja na imagem abaixo, como deve ser o resumo;
![](https://i.imgur.com/6Rlu6a7.png)


### Filtros:


A área de filtros por padrão é oculta, por isso você deve implementar a lógica para que quando o usuário clique no botão **Filtrar** a área de filtro seja exibida e quando clicar novamente seja ocultada, veja abaixo o botão que exibe/oculta a área de filtros:

![](https://i.imgur.com/GCsalqk.png)


Os filtros servem para dar granularidade aos dados, ou seja, para haver a possibilidade de exibir as transações conforme selecionamos requisitos para tal. Por exemplo, se disseremos que deve-se exibir apenas as transações realizadas aos domingos, basicamente deveríamos selecionar o domingo no filtro de **Dia da semana**, veja o exemplo abaixo:

![](https://i.imgur.com/WRXubPL.png)


Os filtros são cumulativos, ou seja, se você seleciona para filtrar **segunda** em **dia da semana**, depois seleciona **pix** em **categoria**, informa **valor mínimo 10** e **valor máximo 300**, todos os filtros devem ser levados em consideração. Resumidamente não devemos exibir na tabela transações com: Valores menores que 10, valores maiores que 300, realizadas em um dia diferente de segunda e nem outra categoria que não seja pix.


O funcionamento dos filtros segue a seguinte ordem:
1. Seleciona-se os filtros em dia da semana ou categoria
2. Informa-se valores mínimos e/ou valores máximos
3. Após selecionar os filtros desejados, clica-se no botão **aplicar filtros**.

**Importante:** Não é obrigatório selecionar todos tipos de filtros (Dia da semana + Categoria + Valores Mínimos + Valores Máximo), pois todos eles são indepententes.

Para limpar os filtros atuais, o usuário deverá clicar no botão **limpar filtros**

**Importante:** 
1. Ao clicar em aplicar filtros sem nenhum filtro selecionado, o sistema deve exibir todas as transações disponíveis cadastradas.
2. Ao clicar em limpar filtros, o sistema deve exibir todas as transações disponíveis cadastradas.

Veja na imagem abaixo os botões:
![](https://i.imgur.com/MEONJbE.png)

Por fim, mas não menos importante, visualização das telas da aplicação:

![image](https://user-images.githubusercontent.com/62851616/148623179-93e3eeff-6337-4e64-9164-5a95571dd997.png)
![image](https://user-images.githubusercontent.com/62851616/148623197-ddbb14bd-e8a2-4e5a-9c35-e8cf3ee1f96c.png)
![image](https://user-images.githubusercontent.com/62851616/148623208-571809ec-972f-4423-92fc-5b5d233650e7.png)
![image](https://user-images.githubusercontent.com/62851616/148623226-ddfce3c7-4832-42da-a3f2-81ee90689377.png)
![image](https://user-images.githubusercontent.com/62851616/148623257-6a3feacf-55ce-434f-adfe-888bb9856499.png)


Espero que gostem do trabalho desenvolvido. 👋




###### tags: `front-end` `módulo 3` `React` `CSS` `desafio`
