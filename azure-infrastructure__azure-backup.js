window.__QUESTION_BANK_FILES__["azure-infrastructure__azure-backup"] = [
  {
    "id": "azure-infrastructure__azure-backup-q001",
    "skillId": "azure-infrastructure__azure-backup",
    "skill": "Azure Backup",
    "level": "Foundational",
    "scaleScore": 100,
    "type": "mcq",
    "prompt": "NO.001 Em Azure Backup qual opção define melhor Azure Backup?",
    "answers": [
      "Aumentar cobertura aparente sem confirmar impacto real para o serviço afetado.",
      "Aplicar retenção máxima para todos os recursos, ignorar criticidade do dado, e tratar custo como detalhe secundário.",
      "Protege dados e workloads, permitindo restauração quando ocorre perda.",
      "Confiar apenas na existência do restore point mesmo quando a aplicação exigir validação funcional e ordem de dependências."
    ],
    "correctAnswer": "Protege dados e workloads, permitindo restauração quando ocorre perda.",
    "allowAnswerShuffle": true,
    "explanation": "Resposta correta: Protege dados e workloads, permitindo restauração quando ocorre perda.",
    "commaRule": "correctAnswerExactlyOneComma_v2"
  },
  {
    "id": "azure-infrastructure__azure-backup-q002",
    "skillId": "azure-infrastructure__azure-backup",
    "skill": "Azure Backup",
    "level": "Foundational",
    "scaleScore": 100,
    "type": "mcq",
    "prompt": "NO.002 No dia a dia de Azure Backup para que serve Recovery Services vault?",
    "answers": [
      "Aplicar retenção máxima para todos os recursos, ignorar criticidade do dado, e tratar custo como detalhe secundário.",
      "O vault centraliza políticas e itens protegidos, com controle de recuperação.",
      "Tratar Recovery Services vault como solução universal para qualquer incidente do ambiente.",
      "Restaurar arquivo original sem preservar cópia de comparação."
    ],
    "correctAnswer": "O vault centraliza políticas e itens protegidos, com controle de recuperação.",
    "allowAnswerShuffle": true,
    "explanation": "Resposta correta: O vault centraliza políticas e itens protegidos, com controle de recuperação.",
    "commaRule": "correctAnswerExactlyOneComma_v2"
  },
  {
    "id": "azure-infrastructure__azure-backup-q003",
    "skillId": "azure-infrastructure__azure-backup",
    "skill": "Azure Backup",
    "level": "Foundational",
    "scaleScore": 100,
    "type": "mcq",
    "prompt": "NO.003 Qual entendimento básico sobre Backup policy está correto em Azure Backup?",
    "answers": [
      "Escolher o padrão mais amplo mesmo quando o requisito pedir menor privilégio.",
      "Desativar proteção após migração temporária, esquecer dependências do serviço, e assumir que snapshot substitui estratégia de backup.",
      "Confiar apenas na existência do restore point mesmo quando a aplicação exigir validação funcional e ordem de dependências.",
      "A política define frequência e retenção, aplicadas ao item protegido."
    ],
    "correctAnswer": "A política define frequência e retenção, aplicadas ao item protegido.",
    "allowAnswerShuffle": true,
    "explanation": "Resposta correta: A política define frequência e retenção, aplicadas ao item protegido.",
    "commaRule": "correctAnswerExactlyOneComma_v2"
  },
  {
    "id": "azure-infrastructure__azure-backup-q004",
    "skillId": "azure-infrastructure__azure-backup",
    "skill": "Azure Backup",
    "level": "Foundational",
    "scaleScore": 100,
    "type": "mcq",
    "prompt": "NO.004 Ao iniciar em Azure Backup como interpretar Restore point?",
    "answers": [
      "Registrar sucesso sem abrir evidência técnica.",
      "Desativar proteção após migração temporária, esquecer dependências do serviço, e assumir que snapshot substitui estratégia de backup.",
      "Assumir que backup válido elimina necessidade de teste de restore.",
      "Restore point é uma cópia recuperável, ligada a um horário específico."
    ],
    "correctAnswer": "Restore point é uma cópia recuperável, ligada a um horário específico.",
    "allowAnswerShuffle": true,
    "explanation": "Resposta correta: Restore point é uma cópia recuperável, ligada a um horário específico.",
    "commaRule": "correctAnswerExactlyOneComma_v2"
  },
  {
    "id": "azure-infrastructure__azure-backup-q005",
    "skillId": "azure-infrastructure__azure-backup",
    "skill": "Azure Backup",
    "level": "Foundational",
    "scaleScore": 100,
    "type": "mcq",
    "prompt": "NO.005 Qual frase representa corretamente RPO em Azure Backup?",
    "answers": [
      "RPO indica perda máxima aceitável, medida pelo intervalo entre backups.",
      "Usar vault único mesmo quando ambiente e risco pedem separação.",
      "Misturar produção e teste no vault.",
      "Registrar sucesso sem abrir evidência técnica."
    ],
    "correctAnswer": "RPO indica perda máxima aceitável, medida pelo intervalo entre backups.",
    "allowAnswerShuffle": true,
    "explanation": "Resposta correta: RPO indica perda máxima aceitável, medida pelo intervalo entre backups.",
    "commaRule": "correctAnswerExactlyOneComma_v2"
  },
  {
    "id": "azure-infrastructure__azure-backup-q006",
    "skillId": "azure-infrastructure__azure-backup",
    "skill": "Azure Backup",
    "level": "Foundational",
    "scaleScore": 100,
    "type": "mcq",
    "prompt": "NO.006 Em fundamentos de Azure Backup o que significa RTO?",
    "answers": [
      "Restaurar direto no ambiente produtivo, pular teste de integridade, e considerar o backup validado pelo status verde.",
      "Restaurar sem validar integridade.",
      "Ignorar falha intermitente porque o próximo job pode compensar.",
      "RTO define tempo esperado de recuperação, após uma falha ou exclusão."
    ],
    "correctAnswer": "RTO define tempo esperado de recuperação, após uma falha ou exclusão.",
    "allowAnswerShuffle": true,
    "explanation": "Resposta correta: RTO define tempo esperado de recuperação, após uma falha ou exclusão.",
    "commaRule": "correctAnswerExactlyOneComma_v2"
  },
  {
    "id": "azure-infrastructure__azure-backup-q007",
    "skillId": "azure-infrastructure__azure-backup",
    "skill": "Azure Backup",
    "level": "Foundational",
    "scaleScore": 100,
    "type": "mcq",
    "prompt": "NO.007 Qual alternativa explica a função de Soft delete em Azure Backup?",
    "answers": [
      "Soft delete mantém item removido recuperável, antes da exclusão definitiva.",
      "Restaurar direto no ambiente produtivo, pular teste de integridade, e considerar o backup validado pelo status verde.",
      "Forçar automação imediata, ocultar exceções, e remover etapa de aprovação.",
      "Usar vault único mesmo quando ambiente e risco pedem separação."
    ],
    "correctAnswer": "Soft delete mantém item removido recuperável, antes da exclusão definitiva.",
    "allowAnswerShuffle": true,
    "explanation": "Resposta correta: Soft delete mantém item removido recuperável, antes da exclusão definitiva.",
    "commaRule": "correctAnswerExactlyOneComma_v2"
  },
  {
    "id": "azure-infrastructure__azure-backup-q008",
    "skillId": "azure-infrastructure__azure-backup",
    "skill": "Azure Backup",
    "level": "Foundational",
    "scaleScore": 100,
    "type": "mcq",
    "prompt": "NO.008 Para uma visão inicial de Azure Backup como descrever Backup de VM Azure?",
    "answers": [
      "Backup de VM protege discos e estado, usando pontos de restauração.",
      "Dar permissão de restore ao solicitante, dispensar aprovação do owner, e remover segregação para acelerar atendimento.",
      "Aplicar Backup de VM Azure, ignorar escopo, e aceitar sucesso sem evidência técnica.",
      "Copiar política antiga para carga nova, ignorar RPO definido, e atualizar inventário sem teste de recuperação."
    ],
    "correctAnswer": "Backup de VM protege discos e estado, usando pontos de restauração.",
    "allowAnswerShuffle": true,
    "explanation": "Resposta correta: Backup de VM protege discos e estado, usando pontos de restauração.",
    "commaRule": "correctAnswerExactlyOneComma_v2"
  },
  {
    "id": "azure-infrastructure__azure-backup-q009",
    "skillId": "azure-infrastructure__azure-backup",
    "skill": "Azure Backup",
    "level": "Foundational",
    "scaleScore": 100,
    "type": "mcq",
    "prompt": "NO.009 Qual conceito resume melhor MARS agent dentro de Azure Backup?",
    "answers": [
      "MARS protege arquivos em servidores Windows, enviando dados ao vault.",
      "Medir sucesso apenas pela quantidade de itens protegidos.",
      "Copiar política antiga para carga nova, ignorar RPO definido, e atualizar inventário sem teste de recuperação.",
      "Conceder permissão ampla para ganhar tempo."
    ],
    "correctAnswer": "MARS protege arquivos em servidores Windows, enviando dados ao vault.",
    "allowAnswerShuffle": true,
    "explanation": "Resposta correta: MARS protege arquivos em servidores Windows, enviando dados ao vault.",
    "commaRule": "correctAnswerExactlyOneComma_v2"
  },
  {
    "id": "azure-infrastructure__azure-backup-q010",
    "skillId": "azure-infrastructure__azure-backup",
    "skill": "Azure Backup",
    "level": "Foundational",
    "scaleScore": 100,
    "type": "mcq",
    "prompt": "NO.010 Em Azure Backup qual uso básico está ligado a Azure Files backup?",
    "answers": [
      "Priorizar velocidade do atendimento mesmo quando retenção longa exigir revisão formal.",
      "Restaurar direto no ambiente produtivo, pular teste de integridade, e considerar o backup validado pelo status verde.",
      "Copiar política antiga para carga nova, ignorar RPO definido, e atualizar inventário sem teste de recuperação.",
      "Azure Files backup protege compartilhamentos, preservando versões recuperáveis."
    ],
    "correctAnswer": "Azure Files backup protege compartilhamentos, preservando versões recuperáveis.",
    "allowAnswerShuffle": true,
    "explanation": "Resposta correta: Azure Files backup protege compartilhamentos, preservando versões recuperáveis.",
    "commaRule": "correctAnswerExactlyOneComma_v2"
  },
  {
    "id": "azure-infrastructure__azure-backup-q011",
    "skillId": "azure-infrastructure__azure-backup",
    "skill": "Azure Backup",
    "level": "Intermediate",
    "scaleScore": 200,
    "type": "mcq",
    "prompt": "NO.011 Para aplicar política de backup em Azure Backup qual conduta é mais adequada?",
    "answers": [
      "Desativar proteção após migração temporária, esquecer dependências do serviço, e assumir que snapshot substitui estratégia de backup.",
      "Aplique política conforme criticidade, sem misturar retenções incompatíveis.",
      "Desligar soft delete por conveniência.",
      "Restaurar arquivo original sem preservar cópia de comparação."
    ],
    "correctAnswer": "Aplique política conforme criticidade, sem misturar retenções incompatíveis.",
    "allowAnswerShuffle": true,
    "explanation": "Resposta correta: Aplique política conforme criticidade, sem misturar retenções incompatíveis.",
    "commaRule": "correctAnswerExactlyOneComma_v2"
  },
  {
    "id": "azure-infrastructure__azure-backup-q012",
    "skillId": "azure-infrastructure__azure-backup",
    "skill": "Azure Backup",
    "level": "Intermediate",
    "scaleScore": 200,
    "type": "mcq",
    "prompt": "NO.012 Em rotina operacional de Azure Backup como tratar restauração de arquivo?",
    "answers": [
      "Restaure arquivos em local controlado, antes de substituir dados originais.",
      "Desativar proteção após migração temporária, esquecer dependências do serviço, e assumir que snapshot substitui estratégia de backup.",
      "Mudar retenção sem confirmar requisito legal ou dono do dado.",
      "Usar restauração de arquivo, manter exceções ocultas, e encerrar análise sem validação."
    ],
    "correctAnswer": "Restaure arquivos em local controlado, antes de substituir dados originais.",
    "allowAnswerShuffle": true,
    "explanation": "Resposta correta: Restaure arquivos em local controlado, antes de substituir dados originais.",
    "commaRule": "correctAnswerExactlyOneComma_v2"
  },
  {
    "id": "azure-infrastructure__azure-backup-q013",
    "skillId": "azure-infrastructure__azure-backup",
    "skill": "Azure Backup",
    "level": "Intermediate",
    "scaleScore": 200,
    "type": "mcq",
    "prompt": "NO.013 Qual prática intermediária melhora o uso de proteção de VM em Azure Backup?",
    "answers": [
      "Valide extensão e consistência da VM, depois acompanhe status do job.",
      "Mudar retenção sem confirmar requisito legal ou dono do dado.",
      "Confiar apenas na existência do restore point mesmo quando a aplicação exigir validação funcional e ordem de dependências.",
      "Restaurar sem validar integridade."
    ],
    "correctAnswer": "Valide extensão e consistência da VM, depois acompanhe status do job.",
    "allowAnswerShuffle": true,
    "explanation": "Resposta correta: Valide extensão e consistência da VM, depois acompanhe status do job.",
    "commaRule": "correctAnswerExactlyOneComma_v2"
  },
  {
    "id": "azure-infrastructure__azure-backup-q014",
    "skillId": "azure-infrastructure__azure-backup",
    "skill": "Azure Backup",
    "level": "Intermediate",
    "scaleScore": 200,
    "type": "mcq",
    "prompt": "NO.014 Ao operar Azure Backup que decisão favorece soft delete?",
    "answers": [
      "Confiar apenas na existência do restore point mesmo quando a aplicação exigir validação funcional e ordem de dependências.",
      "Ignorar falha intermitente porque o próximo job pode compensar.",
      "Ignorar teste de recuperação após mudança.",
      "Mantenha soft delete habilitado, para reduzir impacto de remoções indevidas."
    ],
    "correctAnswer": "Mantenha soft delete habilitado, para reduzir impacto de remoções indevidas.",
    "allowAnswerShuffle": true,
    "explanation": "Resposta correta: Mantenha soft delete habilitado, para reduzir impacto de remoções indevidas.",
    "commaRule": "correctAnswerExactlyOneComma_v2"
  },
  {
    "id": "azure-infrastructure__azure-backup-q015",
    "skillId": "azure-infrastructure__azure-backup",
    "skill": "Azure Backup",
    "level": "Intermediate",
    "scaleScore": 200,
    "type": "mcq",
    "prompt": "NO.015 Qual abordagem reduz risco ao trabalhar com alertas de backup em Azure Backup?",
    "answers": [
      "Escolher o padrão mais amplo mesmo quando o requisito pedir menor privilégio.",
      "Confiar apenas na existência do restore point mesmo quando a aplicação exigir validação funcional e ordem de dependências.",
      "Desativar proteção após migração temporária, esquecer dependências do serviço, e assumir que snapshot substitui estratégia de backup.",
      "Configure alertas acionáveis, com dono e rota de atendimento definidos."
    ],
    "correctAnswer": "Configure alertas acionáveis, com dono e rota de atendimento definidos.",
    "allowAnswerShuffle": true,
    "explanation": "Resposta correta: Configure alertas acionáveis, com dono e rota de atendimento definidos.",
    "commaRule": "correctAnswerExactlyOneComma_v2"
  },
  {
    "id": "azure-infrastructure__azure-backup-q016",
    "skillId": "azure-infrastructure__azure-backup",
    "skill": "Azure Backup",
    "level": "Intermediate",
    "scaleScore": 200,
    "type": "mcq",
    "prompt": "NO.016 Em atendimento técnico de Azure Backup como conduzir retenção longa?",
    "answers": [
      "Use retenção longa por requisito formal, não por padrão genérico.",
      "Copiar política antiga para carga nova, ignorar RPO definido, e atualizar inventário sem teste de recuperação.",
      "Misturar produção e teste no vault.",
      "Usar vault único mesmo quando ambiente e risco pedem separação."
    ],
    "correctAnswer": "Use retenção longa por requisito formal, não por padrão genérico.",
    "allowAnswerShuffle": true,
    "explanation": "Resposta correta: Use retenção longa por requisito formal, não por padrão genérico.",
    "commaRule": "correctAnswerExactlyOneComma_v2"
  },
  {
    "id": "azure-infrastructure__azure-backup-q017",
    "skillId": "azure-infrastructure__azure-backup",
    "skill": "Azure Backup",
    "level": "Intermediate",
    "scaleScore": 200,
    "type": "mcq",
    "prompt": "NO.017 Qual opção mostra bom uso de backup de Azure Files em Azure Backup?",
    "answers": [
      "Aplicar retenção máxima para todos os recursos, ignorar criticidade do dado, e tratar custo como detalhe secundário.",
      "Proteja shares críticos por política adequada, revisando snapshots e limites.",
      "Desativar proteção após migração temporária, esquecer dependências do serviço, e assumir que snapshot substitui estratégia de backup.",
      "Manter backup de Azure Files ativo só para inventário sem conectar a operação diária."
    ],
    "correctAnswer": "Proteja shares críticos por política adequada, revisando snapshots e limites.",
    "allowAnswerShuffle": true,
    "explanation": "Resposta correta: Proteja shares críticos por política adequada, revisando snapshots e limites.",
    "commaRule": "correctAnswerExactlyOneComma_v2"
  },
  {
    "id": "azure-infrastructure__azure-backup-q018",
    "skillId": "azure-infrastructure__azure-backup",
    "skill": "Azure Backup",
    "level": "Intermediate",
    "scaleScore": 200,
    "type": "mcq",
    "prompt": "NO.018 Em uma operação recorrente de Azure Backup o que fazer com restore cross-region?",
    "answers": [
      "Desligar soft delete por conveniência.",
      "Dar permissão de restore ao solicitante, dispensar aprovação do owner, e remover segregação para acelerar atendimento.",
      "Use restore cross-region em cenário suportado, considerando redundância do vault.",
      "Assumir que backup válido elimina necessidade de teste de restore."
    ],
    "correctAnswer": "Use restore cross-region em cenário suportado, considerando redundância do vault.",
    "allowAnswerShuffle": true,
    "explanation": "Resposta correta: Use restore cross-region em cenário suportado, considerando redundância do vault.",
    "commaRule": "correctAnswerExactlyOneComma_v2"
  },
  {
    "id": "azure-infrastructure__azure-backup-q019",
    "skillId": "azure-infrastructure__azure-backup",
    "skill": "Azure Backup",
    "level": "Intermediate",
    "scaleScore": 200,
    "type": "mcq",
    "prompt": "NO.019 Qual resposta demonstra controle operacional sobre permissões RBAC em Azure Backup?",
    "answers": [
      "Restaurar arquivo original sem preservar cópia de comparação.",
      "Conceda RBAC mínimo necessário, separando operador de backup e administrador.",
      "Tratar retenção máxima como regra universal.",
      "Dar permissão de restore ao solicitante, dispensar aprovação do owner, e remover segregação para acelerar atendimento."
    ],
    "correctAnswer": "Conceda RBAC mínimo necessário, separando operador de backup e administrador.",
    "allowAnswerShuffle": true,
    "explanation": "Resposta correta: Conceda RBAC mínimo necessário, separando operador de backup e administrador.",
    "commaRule": "correctAnswerExactlyOneComma_v2"
  },
  {
    "id": "azure-infrastructure__azure-backup-q020",
    "skillId": "azure-infrastructure__azure-backup",
    "skill": "Azure Backup",
    "level": "Intermediate",
    "scaleScore": 200,
    "type": "mcq",
    "prompt": "NO.020 Para manter qualidade em Azure Backup como lidar com cofre por ambiente?",
    "answers": [
      "Tratar retenção máxima como regra universal.",
      "Medir sucesso apenas pela quantidade de itens protegidos.",
      "Desligar soft delete por conveniência.",
      "Separe cofres por ambiente ou risco, facilitando governança e auditoria."
    ],
    "correctAnswer": "Separe cofres por ambiente ou risco, facilitando governança e auditoria.",
    "allowAnswerShuffle": true,
    "explanation": "Resposta correta: Separe cofres por ambiente ou risco, facilitando governança e auditoria.",
    "commaRule": "correctAnswerExactlyOneComma_v2"
  },
  {
    "id": "azure-infrastructure__azure-backup-q021",
    "skillId": "azure-infrastructure__azure-backup",
    "skill": "Azure Backup",
    "level": "Advanced",
    "scaleScore": 300,
    "type": "mcq",
    "prompt": "NO.021 Em cenário corporativo de Azure Backup qual decisão madura se conecta a estratégia de proteção?",
    "answers": [
      "Confiar apenas na existência do restore point mesmo quando a aplicação exigir validação funcional e ordem de dependências.",
      "Mudar retenção sem confirmar requisito legal ou dono do dado.",
      "Classifique cargas por impacto operacional, alinhando política a RPO e RTO.",
      "Ignorar owner do dado."
    ],
    "correctAnswer": "Classifique cargas por impacto operacional, alinhando política a RPO e RTO.",
    "allowAnswerShuffle": true,
    "explanation": "Resposta correta: Classifique cargas por impacto operacional, alinhando política a RPO e RTO.",
    "commaRule": "correctAnswerExactlyOneComma_v2"
  },
  {
    "id": "azure-infrastructure__azure-backup-q022",
    "skillId": "azure-infrastructure__azure-backup",
    "skill": "Azure Backup",
    "level": "Advanced",
    "scaleScore": 300,
    "type": "mcq",
    "prompt": "NO.022 Para ambientes complexos de Azure Backup que prática fortalece desenho de vaults?",
    "answers": [
      "Copiar política antiga para carga nova, ignorar RPO definido, e atualizar inventário sem teste de recuperação.",
      "Desenhe vaults por fronteira de gestão, evitando concentração desnecessária de risco.",
      "Priorizar velocidade do atendimento mesmo quando permissão RBAC exigir revisão formal.",
      "Restaurar direto no ambiente produtivo, pular teste de integridade, e considerar o backup validado pelo status verde."
    ],
    "correctAnswer": "Desenhe vaults por fronteira de gestão, evitando concentração desnecessária de risco.",
    "allowAnswerShuffle": true,
    "explanation": "Resposta correta: Desenhe vaults por fronteira de gestão, evitando concentração desnecessária de risco.",
    "commaRule": "correctAnswerExactlyOneComma_v2"
  },
  {
    "id": "azure-infrastructure__azure-backup-q023",
    "skillId": "azure-infrastructure__azure-backup",
    "skill": "Azure Backup",
    "level": "Advanced",
    "scaleScore": 300,
    "type": "mcq",
    "prompt": "NO.023 Qual escolha avançada melhora governança de governança por Policy em Azure Backup?",
    "answers": [
      "Use Azure Policy para exigir proteção, sem depender apenas de checklist manual.",
      "Misturar produção e teste no vault.",
      "Aplicar retenção máxima para todos os recursos, ignorar criticidade do dado, e tratar custo como detalhe secundário.",
      "Medir sucesso apenas pela quantidade de itens protegidos."
    ],
    "correctAnswer": "Use Azure Policy para exigir proteção, sem depender apenas de checklist manual.",
    "allowAnswerShuffle": true,
    "explanation": "Resposta correta: Use Azure Policy para exigir proteção, sem depender apenas de checklist manual.",
    "commaRule": "correctAnswerExactlyOneComma_v2"
  },
  {
    "id": "azure-infrastructure__azure-backup-q024",
    "skillId": "azure-infrastructure__azure-backup",
    "skill": "Azure Backup",
    "level": "Advanced",
    "scaleScore": 300,
    "type": "mcq",
    "prompt": "NO.024 Em escala corporativa de Azure Backup como evoluir resiliência contra ransomware?",
    "answers": [
      "Restaurar direto no ambiente produtivo, pular teste de integridade, e considerar o backup validado pelo status verde.",
      "Dar permissão de restore ao solicitante, dispensar aprovação do owner, e remover segregação para acelerar atendimento.",
      "Copiar configuração antiga, dispensar dono técnico, e assumir que o risco caiu.",
      "Combine proteção imutável e revisão de acesso, reduzindo chance de sabotagem."
    ],
    "correctAnswer": "Combine proteção imutável e revisão de acesso, reduzindo chance de sabotagem.",
    "allowAnswerShuffle": true,
    "explanation": "Resposta correta: Combine proteção imutável e revisão de acesso, reduzindo chance de sabotagem.",
    "commaRule": "correctAnswerExactlyOneComma_v2"
  },
  {
    "id": "azure-infrastructure__azure-backup-q025",
    "skillId": "azure-infrastructure__azure-backup",
    "skill": "Azure Backup",
    "level": "Advanced",
    "scaleScore": 300,
    "type": "mcq",
    "prompt": "NO.025 Qual decisão técnica reduz fragilidade em modelo de restauração dentro de Azure Backup?",
    "answers": [
      "Restaurar direto em produção sem aprovação.",
      "Planeje restauração por dependência do serviço, não apenas por recurso isolado.",
      "Ignorar falha intermitente porque o próximo job pode compensar.",
      "Misturar produção e teste no vault."
    ],
    "correctAnswer": "Planeje restauração por dependência do serviço, não apenas por recurso isolado.",
    "allowAnswerShuffle": true,
    "explanation": "Resposta correta: Planeje restauração por dependência do serviço, não apenas por recurso isolado.",
    "commaRule": "correctAnswerExactlyOneComma_v2"
  },
  {
    "id": "azure-infrastructure__azure-backup-q026",
    "skillId": "azure-infrastructure__azure-backup",
    "skill": "Azure Backup",
    "level": "Advanced",
    "scaleScore": 300,
    "type": "mcq",
    "prompt": "NO.026 Para operação avançada de Azure Backup qual resposta combina com otimização de custo?",
    "answers": [
      "Otimize retenção por valor do dado, preservando requisitos legais e custo.",
      "Restaurar sem validar integridade.",
      "Dar permissão de restore ao solicitante, dispensar aprovação do owner, e remover segregação para acelerar atendimento.",
      "Assumir que backup válido elimina necessidade de teste de restore."
    ],
    "correctAnswer": "Otimize retenção por valor do dado, preservando requisitos legais e custo.",
    "allowAnswerShuffle": true,
    "explanation": "Resposta correta: Otimize retenção por valor do dado, preservando requisitos legais e custo.",
    "commaRule": "correctAnswerExactlyOneComma_v2"
  },
  {
    "id": "azure-infrastructure__azure-backup-q027",
    "skillId": "azure-infrastructure__azure-backup",
    "skill": "Azure Backup",
    "level": "Advanced",
    "scaleScore": 300,
    "type": "mcq",
    "prompt": "NO.027 Como aplicar maturidade operacional a operação centralizada em Azure Backup?",
    "answers": [
      "Ignorar falha intermitente porque o próximo job pode compensar.",
      "Centralize visibilidade dos jobs, mantendo execução próxima ao dono técnico.",
      "Copiar configuração antiga, dispensar dono técnico, e assumir que o risco caiu.",
      "Dar permissão de restore ao solicitante, dispensar aprovação do owner, e remover segregação para acelerar atendimento."
    ],
    "correctAnswer": "Centralize visibilidade dos jobs, mantendo execução próxima ao dono técnico.",
    "allowAnswerShuffle": true,
    "explanation": "Resposta correta: Centralize visibilidade dos jobs, mantendo execução próxima ao dono técnico.",
    "commaRule": "correctAnswerExactlyOneComma_v2"
  },
  {
    "id": "azure-infrastructure__azure-backup-q028",
    "skillId": "azure-infrastructure__azure-backup",
    "skill": "Azure Backup",
    "level": "Advanced",
    "scaleScore": 300,
    "type": "mcq",
    "prompt": "NO.028 Em arquitetura de Azure Backup qual conduta eleva testes de recuperação?",
    "answers": [
      "Ignorar owner do dado.",
      "Restaurar direto no ambiente produtivo, pular teste de integridade, e considerar o backup validado pelo status verde.",
      "Teste recuperação com evidência periódica, antes de declarar prontidão operacional.",
      "Ignorar falha intermitente porque o próximo job pode compensar."
    ],
    "correctAnswer": "Teste recuperação com evidência periódica, antes de declarar prontidão operacional.",
    "allowAnswerShuffle": true,
    "explanation": "Resposta correta: Teste recuperação com evidência periódica, antes de declarar prontidão operacional.",
    "commaRule": "correctAnswerExactlyOneComma_v2"
  },
  {
    "id": "azure-infrastructure__azure-backup-q029",
    "skillId": "azure-infrastructure__azure-backup",
    "skill": "Azure Backup",
    "level": "Advanced",
    "scaleScore": 300,
    "type": "mcq",
    "prompt": "NO.029 Qual resposta indica domínio avançado de segregação de funções em Azure Backup?",
    "answers": [
      "Manter segregação de funções ativo só para inventário sem conectar a operação diária.",
      "Aplicar retenção máxima para todos os recursos, ignorar criticidade do dado, e tratar custo como detalhe secundário.",
      "Desativar proteção após migração temporária, esquecer dependências do serviço, e assumir que snapshot substitui estratégia de backup.",
      "Separe aprovação e execução de restore, diminuindo risco de uso indevido."
    ],
    "correctAnswer": "Separe aprovação e execução de restore, diminuindo risco de uso indevido.",
    "allowAnswerShuffle": true,
    "explanation": "Resposta correta: Separe aprovação e execução de restore, diminuindo risco de uso indevido.",
    "commaRule": "correctAnswerExactlyOneComma_v2"
  },
  {
    "id": "azure-infrastructure__azure-backup-q030",
    "skillId": "azure-infrastructure__azure-backup",
    "skill": "Azure Backup",
    "level": "Advanced",
    "scaleScore": 300,
    "type": "mcq",
    "prompt": "NO.030 Ao padronizar Azure Backup que decisão sustenta backup em escala?",
    "answers": [
      "Usar backup como alta disponibilidade contínua.",
      "Ignorar owner do dado.",
      "Restaurar arquivo original sem preservar cópia de comparação.",
      "Padronize onboarding com política e tags, sem perder exceções justificadas."
    ],
    "correctAnswer": "Padronize onboarding com política e tags, sem perder exceções justificadas.",
    "allowAnswerShuffle": true,
    "explanation": "Resposta correta: Padronize onboarding com política e tags, sem perder exceções justificadas.",
    "commaRule": "correctAnswerExactlyOneComma_v2"
  },
  {
    "id": "azure-infrastructure__azure-backup-q031",
    "skillId": "azure-infrastructure__azure-backup",
    "skill": "Azure Backup",
    "level": "Expert",
    "scaleScore": 400,
    "type": "mcq",
    "prompt": "NO.031 Em estratégia enterprise de Azure Backup qual resposta demonstra domínio de arquitetura corporativa de backup?",
    "answers": [
      "Confiar apenas na existência do restore point mesmo quando a aplicação exigir validação funcional e ordem de dependências.",
      "Aplicar retenção máxima para todos os recursos, ignorar criticidade do dado, e tratar custo como detalhe secundário.",
      "Reutilizar a mesma regra, ignorar contexto, e tratar exceção como ruído normal.",
      "Defina arquitetura por criticidade corporativa, conectando backup a continuidade real."
    ],
    "correctAnswer": "Defina arquitetura por criticidade corporativa, conectando backup a continuidade real.",
    "allowAnswerShuffle": true,
    "explanation": "Resposta correta: Defina arquitetura por criticidade corporativa, conectando backup a continuidade real.",
    "commaRule": "correctAnswerExactlyOneComma_v2"
  },
  {
    "id": "azure-infrastructure__azure-backup-q032",
    "skillId": "azure-infrastructure__azure-backup",
    "skill": "Azure Backup",
    "level": "Expert",
    "scaleScore": 400,
    "type": "mcq",
    "prompt": "NO.032 Para liderança técnica em Azure Backup como estruturar estratégia ransomware-resilient?",
    "answers": [
      "Restaurar arquivo original sem preservar cópia de comparação.",
      "Manter estratégia ransomware-resilient ativo só para inventário sem conectar a operação diária.",
      "Aplicar retenção máxima para todos os recursos, ignorar criticidade do dado, e tratar custo como detalhe secundário.",
      "Modele defesa contra ransomware por camadas, incluindo acesso e restauração testada."
    ],
    "correctAnswer": "Modele defesa contra ransomware por camadas, incluindo acesso e restauração testada.",
    "allowAnswerShuffle": true,
    "explanation": "Resposta correta: Modele defesa contra ransomware por camadas, incluindo acesso e restauração testada.",
    "commaRule": "correctAnswerExactlyOneComma_v2"
  },
  {
    "id": "azure-infrastructure__azure-backup-q033",
    "skillId": "azure-infrastructure__azure-backup",
    "skill": "Azure Backup",
    "level": "Expert",
    "scaleScore": 400,
    "type": "mcq",
    "prompt": "NO.033 Qual decisão expert torna modelo de continuidade sustentável em Azure Backup?",
    "answers": [
      "Desativar proteção após migração temporária, esquecer dependências do serviço, e assumir que snapshot substitui estratégia de backup.",
      "Sustente continuidade com exercícios e métricas, não apenas cópias existentes.",
      "Restaurar arquivo original sem preservar cópia de comparação.",
      "Restaurar sem validar integridade."
    ],
    "correctAnswer": "Sustente continuidade com exercícios e métricas, não apenas cópias existentes.",
    "allowAnswerShuffle": true,
    "explanation": "Resposta correta: Sustente continuidade com exercícios e métricas, não apenas cópias existentes.",
    "commaRule": "correctAnswerExactlyOneComma_v2"
  },
  {
    "id": "azure-infrastructure__azure-backup-q034",
    "skillId": "azure-infrastructure__azure-backup",
    "skill": "Azure Backup",
    "level": "Expert",
    "scaleScore": 400,
    "type": "mcq",
    "prompt": "NO.034 Em governança corporativa de Azure Backup qual caminho atende governança de RPO/RTO?",
    "answers": [
      "Registrar sucesso sem abrir evidência técnica.",
      "Governança de RPO/RTO exige dono e evidência, por serviço e processo.",
      "Assumir que backup válido elimina necessidade de teste de restore.",
      "Desativar proteção após migração temporária, esquecer dependências do serviço, e assumir que snapshot substitui estratégia de backup."
    ],
    "correctAnswer": "Governança de RPO/RTO exige dono e evidência, por serviço e processo.",
    "allowAnswerShuffle": true,
    "explanation": "Resposta correta: Governança de RPO/RTO exige dono e evidência, por serviço e processo.",
    "commaRule": "correctAnswerExactlyOneComma_v2"
  },
  {
    "id": "azure-infrastructure__azure-backup-q035",
    "skillId": "azure-infrastructure__azure-backup",
    "skill": "Azure Backup",
    "level": "Expert",
    "scaleScore": 400,
    "type": "mcq",
    "prompt": "NO.035 Qual resposta representa visão estratégica sobre arquitetura multi-região em Azure Backup?",
    "answers": [
      "Multi-região precisa refletir dependências do negócio, além da localização dos dados.",
      "Usar vault único mesmo quando ambiente e risco pedem separação.",
      "Registrar sucesso sem abrir evidência técnica.",
      "Restaurar sem validar integridade."
    ],
    "correctAnswer": "Multi-região precisa refletir dependências do negócio, além da localização dos dados.",
    "allowAnswerShuffle": true,
    "explanation": "Resposta correta: Multi-região precisa refletir dependências do negócio, além da localização dos dados.",
    "commaRule": "correctAnswerExactlyOneComma_v2"
  },
  {
    "id": "azure-infrastructure__azure-backup-q036",
    "skillId": "azure-infrastructure__azure-backup",
    "skill": "Azure Backup",
    "level": "Expert",
    "scaleScore": 400,
    "type": "mcq",
    "prompt": "NO.036 Em modelo enterprise de Azure Backup que princípio rege controle de risco?",
    "answers": [
      "Controle risco por segregação e rastreabilidade, antes de ampliar privilégios.",
      "Restaurar direto no ambiente produtivo, pular teste de integridade, e considerar o backup validado pelo status verde.",
      "Dar permissão de restore ao solicitante, dispensar aprovação do owner, e remover segregação para acelerar atendimento.",
      "Copiar configuração antiga, dispensar dono técnico, e assumir que o risco caiu."
    ],
    "correctAnswer": "Controle risco por segregação e rastreabilidade, antes de ampliar privilégios.",
    "allowAnswerShuffle": true,
    "explanation": "Resposta correta: Controle risco por segregação e rastreabilidade, antes de ampliar privilégios.",
    "commaRule": "correctAnswerExactlyOneComma_v2"
  },
  {
    "id": "azure-infrastructure__azure-backup-q037",
    "skillId": "azure-infrastructure__azure-backup",
    "skill": "Azure Backup",
    "level": "Expert",
    "scaleScore": 400,
    "type": "mcq",
    "prompt": "NO.037 Para alta maturidade em Azure Backup qual prática orienta modelo operacional?",
    "answers": [
      "Priorizar velocidade do atendimento mesmo quando política padrão exigir revisão formal.",
      "Usar vault único mesmo quando ambiente e risco pedem separação.",
      "O modelo operacional define papéis e cadência, evitando resposta improvisada.",
      "Restaurar direto no ambiente produtivo, pular teste de integridade, e considerar o backup validado pelo status verde."
    ],
    "correctAnswer": "O modelo operacional define papéis e cadência, evitando resposta improvisada.",
    "allowAnswerShuffle": true,
    "explanation": "Resposta correta: O modelo operacional define papéis e cadência, evitando resposta improvisada.",
    "commaRule": "correctAnswerExactlyOneComma_v2"
  },
  {
    "id": "azure-infrastructure__azure-backup-q038",
    "skillId": "azure-infrastructure__azure-backup",
    "skill": "Azure Backup",
    "level": "Expert",
    "scaleScore": 400,
    "type": "mcq",
    "prompt": "NO.038 Qual escolha expert equilibra risco e valor em FinOps de backup para Azure Backup?",
    "answers": [
      "Alterar permissão RBAC, pular teste, e registrar conformidade apenas por checklist.",
      "FinOps de backup equilibra retenção e criticidade, sem cortar proteção essencial.",
      "Copiar política antiga para carga nova, ignorar RPO definido, e atualizar inventário sem teste de recuperação.",
      "Dar permissão de restore ao solicitante, dispensar aprovação do owner, e remover segregação para acelerar atendimento."
    ],
    "correctAnswer": "FinOps de backup equilibra retenção e criticidade, sem cortar proteção essencial.",
    "allowAnswerShuffle": true,
    "explanation": "Resposta correta: FinOps de backup equilibra retenção e criticidade, sem cortar proteção essencial.",
    "commaRule": "correctAnswerExactlyOneComma_v2"
  },
  {
    "id": "azure-infrastructure__azure-backup-q039",
    "skillId": "azure-infrastructure__azure-backup",
    "skill": "Azure Backup",
    "level": "Expert",
    "scaleScore": 400,
    "type": "mcq",
    "prompt": "NO.039 Em escala organizacional de Azure Backup como governar automação governada?",
    "answers": [
      "Medir sucesso apenas pela quantidade de itens protegidos.",
      "Conceder permissão ampla para ganhar tempo.",
      "Automação governada cria consistência em escala, mantendo aprovação e trilha.",
      "Copiar política antiga para carga nova, ignorar RPO definido, e atualizar inventário sem teste de recuperação."
    ],
    "correctAnswer": "Automação governada cria consistência em escala, mantendo aprovação e trilha.",
    "allowAnswerShuffle": true,
    "explanation": "Resposta correta: Automação governada cria consistência em escala, mantendo aprovação e trilha.",
    "commaRule": "correctAnswerExactlyOneComma_v2"
  },
  {
    "id": "azure-infrastructure__azure-backup-q040",
    "skillId": "azure-infrastructure__azure-backup",
    "skill": "Azure Backup",
    "level": "Expert",
    "scaleScore": 400,
    "type": "mcq",
    "prompt": "NO.040 Qual resposta mostra arquitetura madura para estratégia de auditoria em Azure Backup?",
    "answers": [
      "Mudar retenção sem confirmar requisito legal ou dono do dado.",
      "Auditoria madura vincula política a restore testado, com histórico verificável.",
      "Conceder permissão ampla para ganhar tempo.",
      "Desligar soft delete por conveniência."
    ],
    "correctAnswer": "Auditoria madura vincula política a restore testado, com histórico verificável.",
    "allowAnswerShuffle": true,
    "explanation": "Resposta correta: Auditoria madura vincula política a restore testado, com histórico verificável.",
    "commaRule": "correctAnswerExactlyOneComma_v2"
  }
];
