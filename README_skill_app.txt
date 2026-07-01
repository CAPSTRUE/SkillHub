Arquivos do pacote:
- index_skill_time_nivel.html: versão atualizada do aplicativo.
- managed-services__azure-insights.js: banco de questões de Azure Insights.
- managed-services__azure-monitor.js: banco de questões de Azure Monitor.
- azure-infrastructure__monitoracao-e-observabilidade.js: banco de questões de Monitoração e Observabilidade.
- managed-services__zabbix.js: banco de questões de Zabbix.
- azure-infrastructure__azure-backup.js: banco de questões de Azure Backup.
- modern-work__powershell.js: banco de questões de Powershell.

Como usar:
1. Coloque o HTML e os arquivos .js na mesma pasta.
2. Abra o index_skill_time_nivel.html ou publique junto com os demais arquivos.
3. No menu, selecione Time, Skill, Nível e Timer.
4. Se Time = N1, as 6 skills solicitadas são aplicadas automaticamente.
5. Depois de selecionar Time, qualquer Skill marcada manualmente é adicionada ao conjunto.
6. A tela de resultado mostra média Global Scale, acertos, erros e classificação por skill.

Atualizações desta versão:
- As alternativas são randomizadas automaticamente ao iniciar o teste.
- A resposta correta não aparece durante o teste. Ela aparece apenas no resultado final, nas questões erradas ou não respondidas.
- O menu recebeu a configuração Timer com botão On/Off, exibindo On/Off apenas dentro do botão.
- O menu recebeu o botão Resetar filtros.
- Timer On é o padrão.
- O tempo total é calculado como 1 minuto e meio por questão iniciada.
- O tempo é global para o teste inteiro, permitindo acumular tempo economizado em questões rápidas.
- Caso o tempo acabe, o teste é finalizado automaticamente e questões sem resposta são consideradas erradas.

Escala usada:
0 = No skill
100 = Foundational
200 = Intermediate
300 = Advanced
400 = Expert

Observação:
Cada skill possui 60 perguntas: 15 Foundational, 15 Intermediate, 15 Advanced e 15 Expert.

Atualização atual:
- Splash/loading alterado para SkillHub.
- Bancos reduzidos para 10 perguntas por nível, totalizando 40 perguntas por tópico.


Atualização desta versão:
- As questões agora são randomizadas dentro de cada nível, preservando a ordem de progressão: Foundational, Intermediate, Advanced e Expert.
- Quando vários níveis são selecionados, o teste primeiro apresenta o bloco do nível mais baixo selecionado e segue até o nível mais alto.
- A tela de resultado agora exibe uma tabela por nível com questões, acertos, erros, percentual e status de aprovação.
- O teste não exibe “certo” ou “errado” durante a execução; o feedback aparece somente ao finalizar.
- As alternativas corretas dos bancos de questões foram normalizadas para conter exatamente duas vírgulas, sem que alternativas incorretas tenham exatamente duas vírgulas.
