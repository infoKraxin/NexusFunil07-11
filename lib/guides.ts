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
]

export const getGuide = (slug: string) => GUIDES.find((g) => g.slug === slug)
