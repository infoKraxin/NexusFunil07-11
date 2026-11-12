// Guias de SEO: cada página responde uma busca real e termina levando pro diagnóstico.
// Só fatos com fonte. Nada de prometer resultado que o app não entrega.

export type GuideSection = { h2: string; p: string[]; list?: string[] }
export type Guide = {
  slug: string
  /** rótulo curto pro rodapé */
  short: string
  /** title tag (até ~60 caracteres) */
  seoTitle: string
  /** meta description (até ~155 caracteres) */
  description: string
  h1: string
  lead: string
  /** frase curta no card de CTA do meio */
  midCta: string
  sections: GuideSection[]
  faq: { q: string; a: string }[]
  sources: { label: string; url: string }[]
  related: string[]
}

export const GUIDES: Guide[] = [
  {
    slug: 'como-criar-habitos',
    short: 'Como criar hábitos',
    seoTitle: 'Como criar hábitos que duram (o que a ciência mostra)',
    description:
      'Quanto tempo leva pra criar um hábito, por que você larga na 2ª semana e o método que funciona. Guia direto, com estudos, e um diagnóstico grátis de 2 minutos.',
    h1: 'Como criar hábitos que duram',
    lead:
      'Você já começou academia, leitura, dieta ou estudo várias vezes. O problema quase nunca é começar: é continuar quando a empolgação acaba. Aqui está o que os estudos mostram sobre como um hábito se forma de verdade.',
    midCta: 'Quer saber o que, no seu caso, faz você largar? O diagnóstico mostra em 2 minutos.',
    sections: [
      {
        h2: 'Quanto tempo leva pra criar um hábito?',
        p: [
          'Não são 21 dias. Esse número vem de um cirurgião plástico dos anos 60, Maxwell Maltz, que observou em quanto tempo pacientes se acostumavam com a nova aparência. Nunca foi medido em hábitos.',
          'O estudo mais citado sobre o tema, da University College London (Lally e colegas), acompanhou 96 pessoas criando um hábito novo. O tempo mediano até a ação ficar automática foi de 66 dias, com uma variação enorme: de 18 a 254 dias, dependendo da pessoa e do hábito.',
          'Ou seja: espere uns dois meses, não três semanas. Quem acha que deveria estar no automático no dia 21 conclui que "não tem disciplina" e desiste bem na hora em que o hábito estava se formando.',
        ],
      },
      {
        h2: 'Falhar um dia não zera nada',
        p: [
          'No mesmo estudo, perder uma oportunidade isolada não afetou de forma relevante a formação do hábito. O que derruba as pessoas não é a falha, é o "já que falhei, recomeço segunda".',
          'Por isso a regra mais útil é simples: nunca falhe dois dias seguidos. Um dia ruim é normal. Dois viram padrão.',
        ],
      },
      {
        h2: 'O método que mais funciona: decidir quando e onde',
        p: [
          'Uma meta-análise de Gollwitzer e Sheeran reuniu 94 estudos sobre "intenções de implementação", que é decidir antes exatamente quando e onde você vai agir. O efeito sobre o cumprimento de metas foi de médio a grande.',
          'Na prática, troque "vou treinar mais" por uma frase no formato:',
        ],
        list: [
          'Quando eu chegar do trabalho, coloco a roupa de treino antes de sentar.',
          'Depois do café da manhã, leio 10 páginas.',
          'Quando eu abrir o notebook, faço 25 minutos de estudo antes do celular.',
        ],
      },
      {
        h2: 'Comece ridiculamente pequeno',
        p: [
          'Hábito é repetição no mesmo contexto. Uma ação pequena repetida todo dia forma hábito mais rápido do que uma grande feita de vez em quando, porque ela sobrevive aos dias ruins.',
          'Se a meta é ler, comece com 2 páginas. Se é treinar, com 10 minutos. Você aumenta depois, quando já estiver no automático.',
        ],
      },
      {
        h2: 'Acompanhe o progresso (de preferência à vista)',
        p: [
          'Uma meta-análise com 138 estudos (Harkin e colegas, 2016) mostrou que monitorar o progresso aumenta a chance de cumprir metas, e o efeito é maior quando o progresso é registrado fisicamente ou mostrado pra outras pessoas.',
          'É exatamente aí que a gamificação ajuda: XP, sequência de dias e nível são formas de tornar o progresso visível todo dia, em vez de só no fim do mês.',
        ],
      },
    ],
    faq: [
      {
        q: 'É verdade que leva 21 dias pra criar um hábito?',
        a: 'Não. O estudo de referência (Lally et al.) encontrou uma mediana de 66 dias, variando de 18 a 254 dias conforme a pessoa e o hábito.',
      },
      {
        q: 'Se eu falhar um dia, perco o progresso?',
        a: 'Não. Perder um dia isolado não afetou a formação do hábito no estudo. O risco é transformar uma falha em duas, por isso a regra é nunca falhar dois dias seguidos.',
      },
      {
        q: 'Quantos hábitos posso criar ao mesmo tempo?',
        a: 'Comece com um ou dois. Cada hábito novo exige atenção até ficar automático; empilhar muitos de uma vez é a forma mais comum de largar todos.',
      },
    ],
    sources: [
      { label: 'Lally et al. (2010), How are habits formed', url: 'https://doi.org/10.1002/ejsp.674' },
      { label: 'Gollwitzer & Sheeran (2006), Implementation intentions', url: 'https://doi.org/10.1016/S0065-2601(06)38002-1' },
      { label: 'Harkin et al. (2016), Does monitoring goal progress promote goal attainment?', url: 'https://doi.org/10.1037/bul0000025' },
    ],
    related: ['como-ter-disciplina', 'app-de-habitos-gamificado'],
  },
  {
    slug: 'como-parar-de-procrastinar',
    short: 'Como parar de procrastinar',
    seoTitle: 'Como parar de procrastinar: o que realmente funciona',
    description:
      'Procrastinação não é preguiça, é fuga de uma emoção ruim. Entenda o porquê e use 5 táticas com base em estudos. Diagnóstico grátis de 2 minutos no fim.',
    h1: 'Como parar de procrastinar',
    lead:
      'Se você sabe o que precisa fazer e mesmo assim abre o celular, não é falta de caráter. A pesquisa mostra que procrastinar é, antes de tudo, um jeito de fugir de uma sensação ruim. Entender isso muda o que funciona.',
    midCta: 'Procrastinação é um dos 4 bloqueios que o diagnóstico identifica. Descubra se é o seu.',
    sections: [
      {
        h2: 'Procrastinação não é preguiça',
        p: [
          'Preguiça é não querer fazer nada. Procrastinar é querer fazer, saber que vai se arrepender, e adiar mesmo assim.',
          'Os pesquisadores Fuschia Sirois e Timothy Pychyl descrevem a procrastinação como uma troca: você alivia agora o desconforto da tarefa (tédio, medo de errar, insegurança) e paga a conta depois. O cérebro prioriza o humor de curto prazo.',
          'É por isso que "ter mais força de vontade" raramente resolve. O que resolve é deixar a tarefa menos desconfortável de começar.',
        ],
      },
      {
        h2: 'É mais comum do que parece',
        p: [
          'Na revisão de Piers Steel (2007), que reuniu centenas de estudos, a estimativa é que cerca de 15% a 20% dos adultos procrastinam de forma crônica, e a grande maioria dos estudantes admite procrastinar com frequência.',
        ],
      },
      {
        h2: '5 táticas que funcionam',
        p: ['Todas atacam o mesmo ponto: diminuir o custo de começar.'],
        list: [
          'Quebre até ficar bobo de fácil: "abrir o arquivo e escrever o título" em vez de "fazer o trabalho".',
          'Combine 2 minutos: comece prometendo só 2 minutos. Começar é a parte mais difícil; continuar costuma vir junto.',
          'Decida quando e onde: "às 19h, na mesa, sem celular". Planos específicos aumentam muito a chance de agir (Gollwitzer & Sheeran).',
          'Tire a distração do caminho: celular em outro cômodo vale mais que qualquer aplicativo de bloqueio que você desativa em 5 segundos.',
          'Se perdoe pela última vez: um estudo com universitários (Wohl, Pychyl e Bennett, 2010) mostrou que quem se perdoou por procrastinar numa prova procrastinou menos na seguinte.',
        ],
      },
      {
        h2: 'Recompensa imediata pra tarefa chata',
        p: [
          'O problema da tarefa importante é que a recompensa dela vem longe (a prova daqui a um mês, o corpo daqui a três). O celular entrega recompensa em um segundo.',
          'Uma forma de equilibrar a disputa é dar à tarefa uma recompensa imediata: marcar como feita, ganhar pontos, ver a sequência crescer. É o princípio por trás dos apps gamificados, e é por isso que eles funcionam melhor pra quem procrastina do que uma lista de tarefas comum.',
        ],
      },
    ],
    faq: [
      {
        q: 'Procrastinação é TDAH?',
        a: 'Não necessariamente. Todo mundo procrastina às vezes. Procrastinação intensa e persistente, junto com outros sinais, pode ter relação com TDAH, e só um profissional pode avaliar isso.',
      },
      {
        q: 'Qual a forma mais rápida de parar de procrastinar agora?',
        a: 'Escolha a menor ação possível da tarefa e faça só ela por 2 minutos, com o celular longe. Começar reduz a ansiedade que te fazia adiar.',
      },
    ],
    sources: [
      { label: 'Sirois & Pychyl (2013), Procrastination and the priority of short-term mood regulation', url: 'https://doi.org/10.1111/spc3.12011' },
      { label: 'Steel (2007), The nature of procrastination', url: 'https://doi.org/10.1037/0033-2909.133.1.65' },
      { label: 'Wohl, Pychyl & Bennett (2010), I forgive myself, now I can study', url: 'https://doi.org/10.1016/j.paid.2010.01.029' },
    ],
    related: ['como-ter-disciplina', 'como-criar-habitos'],
  },
  {
    slug: 'solo-leveling-na-vida-real',
    short: 'Solo Leveling na vida real',
    seoTitle: 'Solo Leveling na vida real: como ter seu próprio Sistema',
    description:
      'Como transformar sua rotina nas missões diárias do Solo Leveling: XP, níveis, penalidade e evolução real. Veja como montar o seu Sistema e começar hoje.',
    h1: 'Solo Leveling na vida real: como ter seu próprio Sistema',
    lead:
      'Em Solo Leveling, Sung Jin-Woo começa como o caçador mais fraco e passa a receber missões diárias de um Sistema. Cada missão cumprida dá experiência, e a experiência vira nível. A ideia pegou porque é exatamente o que falta na vida real: alguém dizendo o que fazer hoje e mostrando que você evoluiu.',
    midCta: 'O NEXUS é o Sistema na vida real. Descubra seu ponto de partida em 2 minutos.',
    sections: [
      {
        h2: 'Por que o Sistema do Solo Leveling funciona (até fora da ficção)',
        p: [
          'Tire a fantasia e sobram três mecânicas com base sólida em psicologia:',
        ],
        list: [
          'Missão diária definida: Jin-Woo não decide o que treinar, o Sistema decide. Planos específicos ("quando e onde") aumentam muito a chance de agir.',
          'Progresso visível: nível e atributos sobem na tela. Monitorar o progresso aumenta a chance de cumprir metas (meta-análise de Harkin et al., 2016).',
          'Consequência por falhar: a "zona de penalidade" deixa claro que pular tem custo. Compromissos com consequência combatem o "amanhã eu faço".',
        ],
      },
      {
        h2: 'A missão diária do Jin-Woo é uma boa ideia pra você?',
        p: [
          'A missão do anime (100 flexões, 100 abdominais, 100 agachamentos e 10 km de corrida) é ótima pra ficção e péssima pra começar. Quem tenta copiar no primeiro dia quase sempre para na primeira semana, com dor e frustração.',
          'O que dá pra copiar é a estrutura, não o volume: uma missão pequena, diária, que sobe de dificuldade conforme você sobe de nível.',
        ],
      },
      {
        h2: 'Como montar seu Sistema na vida real',
        p: [],
        list: [
          'Escolha uma área pra evoluir primeiro: corpo, estudo, dinheiro, foco ou mente.',
          'Defina 1 a 3 missões diárias pequenas o bastante pra cumprir até num dia ruim.',
          'Dê pontos (XP) pra cada missão e some todo dia.',
          'Defina um nível a cada tantos pontos e o que muda quando você sobe.',
          'Defina a penalidade: nunca falhar dois dias seguidos.',
          'Tenha alguém (ou um ranking) vendo seu progresso.',
        ],
      },
      {
        h2: 'Planilha ou app?',
        p: [
          'Dá pra fazer tudo isso num caderno. O problema é que o caderno não te lembra, não ajusta a missão quando você falha e não mostra ninguém evoluindo do seu lado. O NEXUS foi feito em cima dessa ideia: missões diárias montadas a partir do seu diagnóstico, XP, níveis, sequência, ranking e duelos com outras pessoas.',
        ],
      },
    ],
    faq: [
      {
        q: 'Existe um app do Sistema do Solo Leveling?',
        a: 'Não existe um app oficial da obra. Existem apps inspirados na ideia, como o NEXUS, que transformam hábitos reais em missões diárias com XP e níveis.',
      },
      {
        q: 'Dá pra fazer o treino do Solo Leveling todo dia?',
        a: 'Para quem está começando, não é recomendado. O volume é alto e a chance de lesão e desistência é grande. Comece com uma fração e suba aos poucos.',
      },
    ],
    sources: [
      { label: 'Harkin et al. (2016), monitoring goal progress', url: 'https://doi.org/10.1037/bul0000025' },
      { label: 'Gollwitzer & Sheeran (2006), Implementation intentions', url: 'https://doi.org/10.1016/S0065-2601(06)38002-1' },
    ],
    related: ['app-de-habitos-gamificado', 'como-criar-habitos'],
  },
  {
    slug: 'como-ter-disciplina',
    short: 'Como ter disciplina',
    seoTitle: 'Como ter disciplina (sem depender de força de vontade)',
    description:
      'Pessoas disciplinadas não resistem mais à tentação: elas a evitam. Veja o que os estudos mostram e como construir disciplina no dia a dia.',
    h1: 'Como ter disciplina sem depender de força de vontade',
    lead:
      'A imagem da pessoa disciplinada é alguém resistindo a tudo na base da força. Os estudos mostram outra coisa: quem parece mais disciplinado é justamente quem menos precisa resistir.',
    midCta: 'Seu problema é disciplina mesmo, ou é outra coisa? O diagnóstico separa em 2 minutos.',
    sections: [
      {
        h2: 'Disciplinados resistem menos, não mais',
        p: [
          'Um estudo de Hofmann e colegas (2012) acompanhou pessoas ao longo do dia e descobriu algo contraintuitivo: quem tinha mais autocontrole relatava enfrentar menos tentações, não vencer mais batalhas.',
          'Galla e Duckworth (2015) chegaram a uma conclusão parecida: o que explica boa parte do sucesso de pessoas com autocontrole alto são os hábitos. Elas transformam o comportamento certo em automático e deixam de depender de decidir toda vez.',
        ],
      },
      {
        h2: 'A força de vontade não é um tanque que esvazia (mas também não é infinita)',
        p: [
          'Por anos foi popular a ideia de que a força de vontade gasta como combustível. Um grande teste com 23 laboratórios (Hagger et al., 2016) não conseguiu reproduzir esse efeito. O ponto prático continua: decidir tudo na hora, todos os dias, cansa e falha. Quanto menos decisões, melhor.',
        ],
      },
      {
        h2: 'Como construir disciplina na prática',
        p: [],
        list: [
          'Desenhe o ambiente: deixe o certo fácil (roupa de treino separada) e o errado difícil (celular fora do quarto).',
          'Transforme decisões em regras: "treino segunda, quarta e sexta às 7h" não precisa de motivação.',
          'Comece pequeno e suba devagar: disciplina é reputação consigo mesmo, construída com promessas pequenas cumpridas.',
          'Acompanhe e mostre: registrar e expor o progresso aumenta a chance de cumprir (Harkin et al., 2016).',
          'Tenha alguém te esperando: um parceiro, um grupo ou um ranking. Compromisso com outras pessoas pesa mais que promessa a si mesmo.',
        ],
      },
      {
        h2: 'Motivação vs. disciplina',
        p: [
          'Motivação é o que te faz começar. Ela vem em ondas e quase sempre passa por volta da segunda semana. Disciplina é ter um sistema que funciona quando a motivação não está lá. Por isso a pergunta certa não é "como ficar motivado", e sim "o que vai me fazer cumprir no dia em que eu não quiser".',
        ],
      },
    ],
    faq: [
      {
        q: 'Disciplina é algo que se nasce com?',
        a: 'Existe variação entre pessoas, mas boa parte do que parece disciplina é ambiente e hábito, que dá pra construir.',
      },
      {
        q: 'Quanto tempo leva pra ficar disciplinado?',
        a: 'Para um comportamento ficar automático, o estudo de referência encontrou uma mediana de 66 dias. Depois disso ele exige bem menos esforço.',
      },
    ],
    sources: [
      { label: 'Hofmann et al. (2012), Everyday temptations', url: 'https://doi.org/10.1037/a0026545' },
      { label: 'Galla & Duckworth (2015), More than resisting temptation', url: 'https://doi.org/10.1037/pspp0000026' },
      { label: 'Hagger et al. (2016), A multilab preregistered replication of the ego-depletion effect', url: 'https://doi.org/10.1177/1745691616652873' },
      { label: 'Harkin et al. (2016), monitoring goal progress', url: 'https://doi.org/10.1037/bul0000025' },
    ],
    related: ['como-parar-de-procrastinar', 'como-criar-habitos'],
  },
  {
    slug: 'app-de-habitos-gamificado',
    short: 'App de hábitos gamificado',
    seoTitle: 'App de hábitos gamificado: como escolher (e por que funciona)',
    description:
      'O que um app de hábitos gamificado precisa ter pra funcionar de verdade: missões, XP, níveis, sequência e ranking. Veja o que olhar antes de escolher.',
    h1: 'App de hábitos gamificado: o que precisa ter pra funcionar',
    lead:
      'A maioria dos apps de hábitos é uma lista com checkbox. Funciona na primeira semana e vira ícone esquecido na segunda. Um app gamificado tenta resolver justamente a parte difícil: fazer você voltar todo dia.',
    midCta: 'Antes de escolher qualquer app, descubra o que te faz largar. 2 minutos, grátis.',
    sections: [
      {
        h2: 'Gamificação funciona?',
        p: [
          'Uma revisão de estudos empíricos sobre gamificação (Hamari, Koivisto e Sarsa, 2014) encontrou efeitos majoritariamente positivos no engajamento, com uma ressalva importante: o efeito depende do contexto e de quem usa. Pontos sozinhos não fazem milagre; o que funciona é a mecânica certa ligada a uma meta real.',
        ],
      },
      {
        h2: 'O que um bom app de hábitos gamificado precisa ter',
        p: [],
        list: [
          'Missões já decididas: o app diz o que fazer hoje, em vez de você ter que planejar todo dia.',
          'Progresso visível: XP, nível e sequência que mostram evolução diária.',
          'Um jeito de lidar com a falha: ajustar a missão quando você falha, em vez de te fazer recomeçar do zero.',
          'Outras pessoas: ranking, duelos ou grupo. Mostrar o progresso aumenta a chance de cumprir (Harkin et al., 2016).',
          'Ponto de partida personalizado: quem procrastina precisa de algo diferente de quem começa demais e larga.',
        ],
      },
      {
        h2: 'O que evitar',
        p: [],
        list: [
          'Apps que exigem configurar 20 hábitos antes de começar.',
          'Gamificação só de enfeite: pontos que não significam nada.',
          'Punição exagerada que te faz desinstalar no primeiro dia ruim.',
        ],
      },
      {
        h2: 'Como o NEXUS faz isso',
        p: [
          'O NEXUS é um app de hábitos gamificado inspirado em Solo Leveling. Você começa com um diagnóstico de 2 minutos que identifica o que te trava; a partir dele saem suas missões diárias. Cada missão dá XP, o XP vira nível, e você evolui junto com outras pessoas em ranking, duelos e arena. O acesso é por pagamento único, sem mensalidade.',
        ],
      },
    ],
    faq: [
      {
        q: 'Qual o melhor app de hábitos?',
        a: 'Depende do que te faz largar. Se você esquece, lembretes bastam. Se você começa e perde a empolgação, precisa de recompensa e acompanhamento diário, que é onde apps gamificados ajudam mais.',
      },
      {
        q: 'O NEXUS é pago?',
        a: 'O diagnóstico é gratuito. O acesso ao app é por pagamento único, sem mensalidade, com garantia de 7 dias.',
      },
    ],
    sources: [
      { label: 'Hamari, Koivisto & Sarsa (2014), Does gamification work?', url: 'https://doi.org/10.1109/HICSS.2014.377' },
      { label: 'Harkin et al. (2016), monitoring goal progress', url: 'https://doi.org/10.1037/bul0000025' },
    ],
    related: ['solo-leveling-na-vida-real', 'como-criar-habitos'],
  },
  {
    slug: 'como-manter-o-foco-nos-estudos',
    short: 'Como manter o foco nos estudos',
    seoTitle: 'Como manter o foco nos estudos com o celular por perto',
    description:
      'O celular na mesa atrapalha mesmo desligado? Veja o que os estudos mostram sobre foco, interrupções e como montar um bloco de estudo que você cumpre.',
    h1: 'Como manter o foco nos estudos (mesmo com o celular por perto)',
    lead:
      'Você senta pra estudar, lê o mesmo parágrafo três vezes e, quando percebe, está com o celular na mão. Foco tem menos a ver com força de vontade e mais com o que está em cima da mesa. Aqui está o que a pesquisa mostra e o que dá pra fazer hoje.',
    midCta: 'Falta de foco é um dos bloqueios que o diagnóstico identifica. Veja se é o seu em 2 minutos.',
    sections: [
      {
        h2: 'O celular na mesa atrapalha mesmo sem você tocar nele?',
        p: [
          'Em 2017, pesquisadores da Universidade do Texas (Ward e colegas) fizeram dois experimentos com quase 800 pessoas. Todo mundo deixou o celular no silencioso e foi sorteado pra um de três lugares: celular na mesa, no bolso ou na mochila, ou em outra sala. Depois, todos fizeram testes de memória de trabalho e raciocínio.',
          'Quem deixou o celular em outra sala foi melhor do que quem deixou na mesa. Bolso e mochila ficaram no meio do caminho. No segundo experimento, estar ligado ou desligado não mudou o resultado. A explicação dos autores: parte da sua atenção fica ocupada em não pegar o aparelho.',
        ],
      },
      {
        h2: 'O tamanho real desse efeito',
        p: [
          'Vale a honestidade: o efeito é pequeno. Uma meta-análise de 2024 (Parry), com dados de mais de 7 mil participantes, encontrou efeito negativo da simples presença do celular só na memória de trabalho, e menor do que o estudo original sugeria. Nas outras funções testadas, o resultado combinado foi nulo.',
          'Na prática, tirar o celular da mesa não vai transformar ninguém. Mas custa zero, e tira do caminho a distração mais fácil de alcançar. É um bom primeiro passo, não a solução inteira.',
        ],
      },
      {
        h2: 'Interrupção cobra em estresse, não só em tempo',
        p: [
          'Num experimento de Gloria Mark e colegas (2008), 48 pessoas fizeram uma tarefa de escritório com e sem interrupções. Quem foi interrompido terminou em menos tempo e com a mesma qualidade. O preço apareceu em outro lugar: mais estresse, mais frustração, mais pressão de tempo e mais esforço.',
          'É por isso que estudar com notificação pulando parece funcionar e, ao mesmo tempo, te deixa esgotado. Você compensa acelerando, e essa conta chega no fim do dia.',
        ],
      },
      {
        h2: 'Como montar um bloco de foco',
        p: ['Um bloco de foco é um período curto, com começo, fim e uma única tarefa. Monte assim:'],
        list: [
          'Celular em outro cômodo, no silencioso. Não na mesa, não virado pra baixo.',
          'Uma tarefa só, escrita num papel: "resolver a lista 3 de física", não "estudar física".',
          'Tempo definido antes de começar. Se 50 minutos parece muito, comece com 25.',
          'Abas e aplicativos que não são da tarefa, fechados.',
          'Pausa de verdade no fim: levantar, beber água, olhar pra longe. O celular fica pra depois da pausa.',
        ],
      },
      {
        h2: 'Como transformar foco em hábito',
        p: [
          'Um bloco de foco num dia bom é fácil. O difícil é repetir amanhã. O que ajuda é ter o bloco já decidido (horário, lugar e tarefa) e ver o progresso se acumulando.',
          'No NEXUS, foco e estudo são módulos do app: o bloco vira missão diária, cada missão cumprida dá XP e a sequência de dias fica à vista. Você não precisa decidir todo dia se vai estudar, só cumprir a missão de hoje.',
        ],
      },
    ],
    faq: [
      {
        q: 'Colocar o celular virado pra baixo resolve?',
        a: 'Pelo estudo de Ward e colegas, provavelmente não. O efeito apareceu com o celular virado pra baixo e também virado pra cima, ligado ou desligado. O que fez diferença foi a distância: outra sala foi melhor que a mesa.',
      },
      {
        q: 'Quanto tempo deve durar um bloco de foco?',
        a: 'Não existe um número certo pra todo mundo. Comece com um tempo que você cumpre até num dia ruim, como 25 minutos, e aumente quando ficar fácil.',
      },
      {
        q: 'Estudar com música atrapalha o foco?',
        a: 'Os estudos citados aqui não testaram música, então este guia não afirma nada sobre isso. Teste nos seus próprios blocos e compare o quanto você rendeu.',
      },
    ],
    sources: [
      { label: 'Ward, Duke, Gneezy & Bos (2017), Brain Drain: The Mere Presence of One’s Own Smartphone Reduces Available Cognitive Capacity', url: 'https://doi.org/10.1086/691462' },
      { label: 'Parry (2024), Does the Mere Presence of a Smartphone Impact Cognitive Performance? A Meta-Analysis of the “Brain Drain Effect”', url: 'https://doi.org/10.1080/15213269.2023.2286647' },
      { label: 'Mark, Gudith & Klocke (2008), The cost of interrupted work: more speed and stress', url: 'https://doi.org/10.1145/1357054.1357072' },
    ],
    related: ['como-parar-de-procrastinar', 'como-ter-disciplina'],
  },
  {
    slug: 'tecnicas-de-estudo-que-funcionam',
    short: 'Técnicas de estudo que funcionam',
    seoTitle: 'Técnicas de estudo que funcionam, segundo a ciência',
    description:
      'Reler e grifar rendem pouco. Veja as duas técnicas de estudo mais bem avaliadas pela pesquisa, como aplicar e como montar uma rotina de revisão simples.',
    h1: 'Técnicas de estudo que funcionam (e as que só parecem funcionar)',
    lead:
      'Reler o capítulo e passar marca-texto dão a sensação de estar aprendendo. A pesquisa sobre aprendizagem mostra que essa sensação engana. Duas técnicas simples rendem mais, e quase ninguém usa do jeito certo.',
    midCta: 'Saber a técnica é fácil. Difícil é estudar todo dia. Descubra o que te trava em 2 minutos.',
    sections: [
      {
        h2: 'O que rende pouco: reler, grifar e resumir',
        p: [
          'Em 2013, Dunlosky e colegas revisaram a pesquisa sobre 10 técnicas de estudo e deram uma nota de utilidade pra cada uma. Ficaram com utilidade baixa: reler, grifar ou sublinhar, resumir, usar palavras-chave mnemônicas e criar imagens mentais do texto.',
          'Isso não quer dizer que são inúteis. Quer dizer que, pelo tempo que tomam, entregam menos do que outras opções.',
        ],
      },
      {
        h2: 'As duas técnicas mais bem avaliadas',
        p: ['Só duas das 10 receberam utilidade alta na mesma revisão:'],
        list: [
          'Prática de teste: tentar lembrar a matéria sem olhar. Questões, flashcards ou escrever numa folha em branco tudo o que você lembra.',
          'Prática distribuída: espalhar o estudo da mesma matéria em vários dias, em vez de concentrar tudo de uma vez.',
        ],
      },
      {
        h2: 'Por que se testar funciona melhor do que reler',
        p: [
          'Num estudo de Roediger e Karpicke (2006), estudantes leram textos e depois ou releram o material, ou fizeram um teste de memória sobre ele. Cinco minutos depois, quem releu lembrava mais. Dois dias e uma semana depois, o resultado inverteu: quem tinha se testado lembrava bem mais.',
          'Um detalhe do mesmo estudo explica por que tanta gente continua relendo: reler aumentou a confiança dos estudantes, mesmo sem melhorar a memória de longo prazo. Reler parece funcionar. Testar-se funciona.',
        ],
      },
      {
        h2: 'Por que espaçar funciona melhor do que virar a noite',
        p: [
          'Cepeda e colegas (2006) juntaram 317 experimentos de 184 artigos sobre prática distribuída. Na comparação geral, quem estudou de forma espaçada acertou em média 47% no teste final, contra 37% de quem estudou tudo de uma vez.',
          'A revisão também mostrou que o intervalo ideal entre as sessões cresce conforme o tempo que você quer lembrar. Pra uma prova daqui a um mês, revisar com alguns dias de intervalo faz mais sentido do que revisar tudo na véspera.',
        ],
      },
      {
        h2: 'Como juntar as duas numa rotina',
        p: [],
        list: [
          'Estude o conteúdo novo uma vez, com atenção.',
          'Feche o material e escreva ou responda de memória o que lembra. Só depois confira.',
          'Volte ao mesmo conteúdo outro dia, de novo começando pelo teste, não pela releitura.',
          'Aumente o intervalo entre as revisões conforme for acertando.',
          'Prefira blocos curtos todo dia a uma maratona no fim de semana.',
        ],
      },
      {
        h2: 'A parte difícil é a constância',
        p: [
          'Prática distribuída só existe se você aparece vários dias seguidos. É aí que a maioria trava: a técnica é simples, a rotina não.',
          'O NEXUS tem um módulo de estudo que transforma isso em missão diária, com XP por missão cumprida, níveis e sequência de dias. A técnica continua sendo sua, o app cuida de te fazer voltar amanhã.',
        ],
      },
    ],
    faq: [
      {
        q: 'Grifar o texto não serve pra nada?',
        a: 'Serve pouco. Na revisão de Dunlosky e colegas (2013), grifar ficou com utilidade baixa. Pode ajudar a localizar trechos, mas não substitui se testar.',
      },
      {
        q: 'Flashcard funciona?',
        a: 'Flashcard é uma forma de prática de teste, que recebeu utilidade alta na revisão de 2013. Funciona melhor quando você tenta responder de verdade antes de virar o cartão e revisa em dias diferentes.',
      },
      {
        q: 'Fazer resumo vale a pena?',
        a: 'Resumir recebeu utilidade baixa na mesma revisão. Se você gosta de resumir, faça o resumo de memória, com o material fechado, e confira depois. Assim ele vira prática de teste.',
      },
    ],
    sources: [
      { label: 'Dunlosky et al. (2013), Improving Students’ Learning With Effective Learning Techniques', url: 'https://doi.org/10.1177/1529100612453266' },
      { label: 'Roediger & Karpicke (2006), Test-enhanced learning: taking memory tests improves long-term retention', url: 'https://doi.org/10.1111/j.1467-9280.2006.01693.x' },
      { label: 'Cepeda et al. (2006), Distributed practice in verbal recall tasks: a review and quantitative synthesis', url: 'https://doi.org/10.1037/0033-2909.132.3.354' },
    ],
    related: ['como-criar-habitos', 'como-parar-de-procrastinar'],
  },
  {
    slug: 'como-nao-desistir-da-academia',
    short: 'Como não desistir da academia',
    seoTitle: 'Como não desistir da academia nas primeiras semanas',
    description:
      'Um estudo com novos alunos de academia mostra o que separa quem cria o hábito de treinar de quem larga. Veja o que pesa mais e como aplicar na sua rotina.',
    h1: 'Como não desistir da academia nas primeiras semanas',
    lead:
      'Matrícula feita, primeira semana empolgada, terceira semana em casa. Se isso já aconteceu com você, o problema provavelmente não é preguiça: é que o treino ainda não virou hábito. Um estudo com novos alunos de academia mostra o que faz essa virada acontecer.',
    midCta: 'Você começa e larga? O diagnóstico mostra o que te faz parar. 2 minutos, grátis.',
    sections: [
      {
        h2: 'As primeiras 6 semanas são as que contam',
        p: [
          'Kaushal e Rhodes (2015) acompanharam 111 pessoas recém-matriculadas em academias durante 12 semanas. O resultado principal: treinar pelo menos quatro vezes por semana, por seis semanas, foi o mínimo pra o treino se estabelecer como hábito.',
          'Isso é o que o estudo observou sobre formação de hábito, não uma prescrição de treino. A lição que serve pra todo mundo é outra: no começo, frequência pesa mais do que intensidade. Treino curto e frequente constrói o hábito. Treino longo de vez em quando, não.',
        ],
      },
      {
        h2: 'O que mais pesou pra criar o hábito',
        p: ['No mesmo estudo, quatro fatores previram quem criou o hábito de treinar:'],
        list: [
          'Consistência: treinar nos mesmos dias e no mesmo horário.',
          'Baixa complexidade: um treino simples, que você sabe fazer sem pensar muito.',
          'Ambiente: um lugar que facilita, perto de casa ou do trabalho e sem atrito pra chegar.',
          'Gostar do treino: a sensação que você associa a treinar.',
        ],
      },
      {
        h2: 'Escolha um treino que você não odeie',
        p: [
          'Uma revisão de 24 estudos (Rhodes e Kates, 2015) encontrou que se sentir bem durante o exercício de intensidade moderada estava ligado a continuar ativo no futuro. Já a sensação depois do treino não mostrou essa relação.',
          'Ou seja, aquele alívio de "ainda bem que acabou" não segura ninguém na academia. O que segura é o treino em si ser tolerável ou até agradável. Se você odeia esteira, trocar de atividade é estratégia, não fraqueza.',
        ],
      },
      {
        h2: 'Junte o treino com algo que você quer',
        p: [
          'Milkman, Minson e Volpp (2014) testaram uma ideia simples: liberar audiolivros viciantes só dentro da academia. No início, quem só podia ouvir lá foi à academia 51% mais vezes que o grupo de controle. Quem apenas foi incentivado a seguir a regra foi 29% mais.',
          'O efeito diminuiu com o tempo, principalmente depois de um feriado. Então use o truque (um podcast, uma série ou uma playlist que só existe no treino) como empurrão das primeiras semanas, e tenha um plano pra voltar depois de qualquer pausa.',
        ],
      },
      {
        h2: 'Um plano simples pras primeiras 6 semanas',
        p: [],
        list: [
          'Defina os dias e o horário e trate como compromisso, não como "se der".',
          'Monte um treino curto e simples, de preferência com um profissional de educação física.',
          'Deixe a roupa e a mochila prontas na noite anterior.',
          'Guarde algo que você gosta só pro treino.',
          'Marque cada treino feito num lugar visível.',
          'Faltou um dia? Volte no próximo dia marcado, sem tentar compensar.',
        ],
      },
      {
        h2: 'Como o NEXUS entra nisso',
        p: [
          'O NEXUS tem um módulo de treino que transforma seus treinos em missões diárias. Cada missão cumprida dá XP, o XP vira nível, e a sequência de dias fica à vista. Com ranking e duelos, você também tem outras pessoas evoluindo do seu lado, o que ajuda a aparecer nos dias em que a vontade não vem.',
        ],
      },
    ],
    faq: [
      {
        q: 'Preciso treinar quatro vezes por semana pra ter resultado?',
        a: 'O estudo de Kaushal e Rhodes mediu formação de hábito, não resultado físico. Quatro vezes por semana durante seis semanas foi o mínimo observado pra o treino virar hábito naquele grupo. Frequência e intensidade ideais pra você são assunto pra um profissional de educação física.',
      },
      {
        q: 'Quanto tempo até a academia virar hábito?',
        a: 'No estudo com novos alunos de academia, o mínimo observado foi de seis semanas treinando pelo menos quatro vezes por semana. Isso varia de pessoa pra pessoa.',
      },
      {
        q: 'Faltei uma semana inteira. E agora?',
        a: 'Volte no próximo dia marcado com um treino mais leve e mais curto. Pausas derrubam a rotina de muita gente: no estudo de Milkman e colegas, a frequência caiu justamente depois de um feriado. Ter o dia da volta já decidido ajuda a recomeçar.',
      },
    ],
    sources: [
      { label: 'Kaushal & Rhodes (2015), Exercise habit formation in new gym members: a longitudinal study', url: 'https://doi.org/10.1007/s10865-015-9640-7' },
      { label: 'Rhodes & Kates (2015), Can the Affective Response to Exercise Predict Future Motives and Physical Activity Behavior?', url: 'https://doi.org/10.1007/s12160-015-9704-5' },
      { label: 'Milkman, Minson & Volpp (2014), Holding the Hunger Games Hostage at the Gym: An Evaluation of Temptation Bundling', url: 'https://doi.org/10.1287/mnsc.2013.1784' },
    ],
    related: ['como-criar-habitos', 'como-ter-disciplina'],
  },
]

export const getGuide = (slug: string) => GUIDES.find((g) => g.slug === slug)
