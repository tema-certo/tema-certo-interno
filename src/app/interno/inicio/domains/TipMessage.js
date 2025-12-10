import { useCallback, useMemo } from 'react';

import Card from '@/components/Card';
import Text from '@/components/Text';
export default function TipMessage() {

    const messageMemory = useMemo(() => {
	    return [
		    {
			    'title': '🎯 Fortalecimento da Tese',
			    'value': "Sua tese deve ser uma posição clara e polêmica, não apenas uma afirmação factual. Use termos de impacto (Ex: 'A inação governamental perpetua o problema...').",
		    },
		    {
			    'title': '📊 Uso Estratégico de Dados',
			    'value': "Nunca insira um dado ('70% dos casos') sem antes e depois interpretá-lo. Estrutura: Afirmação ➡️ Dado/Citação (Provas) ➡️ Conexão Lógica (O que isso prova para sua tese).",
		    },
		    {
			    'title': '📚 Citação Contextualizada',
			    'value': "Ao citar um especialista, integre a fala dele à sua frase, em vez de isolá-la. Ex: 'Conforme o conceito de 'sociedade líquida' de Zygmunt Bauman, percebe-se que...'.",
		    },
		    {
			    'title': '💡 Argumento por Autoridade',
			    'value': "Apresente sempre a fonte, a obra e o ano (se possível) da sua citação para conferir máxima credibilidade. Ex: 'Aristóteles, em Ética a Nicômaco (séc. IV a.C.)...'.",
		    },
		    {
			    'title': '🧩 Coerência e Coesão Avançada',
			    'value': "Garanta que cada parágrafo de desenvolvimento tenha apenas um foco argumentativo principal. Use conectivos interparágrafos (Ex: 'Além disso, soma-se a essa perspectiva...').",
		    },
		    {
			    'title': '⚖️ Argumento por Contraste',
			    'value': "Para temas complexos, apresente um argumento de senso comum (o 'contra-argumento') e, em seguida, use dados/citações para refutá-lo ou balanceá-lo. Isso demonstra maturidade analítica.",
		    },
		    {
			    'title': '🔍 Profundidade Conceitual',
			    'value': "Ao abordar termos-chave (Ex: 'sustentabilidade', 'democracia'), defina-os brevemente ou use a definição de um teórico renomado para delimitar seu argumento.",
		    },
		    {
			    'title': '⏱️ Atualidade da Informação',
			    'value': 'Sempre que possível, utilize referências (dados, eventos, leis) da última década. Isso mostra que seu conhecimento é pertinente ao contexto atual.',
		    },
		    {
			    'title': '🔗 Construção do Parágrafo (Tópico Frasal)',
			    'value': "Comece cada parágrafo de desenvolvimento com a ideia central que será provada. Isso guia o leitor e garante foco. Ex: 'Inicialmente, a negligência educacional é um fator crucial neste debate.'",
		    },
		    {
			    'title': '📜 Argumento Histórico',
			    'value': 'Use eventos históricos como provas concretas. Ao citar um fato, mostre a relação de causa e efeito que ele estabeleceu com o problema atual.',
		    },
		    {
			    'title': '🌐 Visão Global',
			    'value': 'Evite focar apenas no contexto nacional. Use exemplos ou dados de outros países (Finlândia, Canadá, etc.) para criar um argumento de comparação e sugestão de soluções.',
		    },
		    {
			    'title': '📢 Linguagem Formal',
			    'value': 'Mantenha um vocabulário preciso e formal. Substitua verbos e substantivos simples por sinônimos mais elaborados para elevar o nível do texto.',
		    },
		    {
			    'title': '✅ Verificação da Fonte',
			    'value': 'Antes de usar qualquer dado, pergunte: Quem publicou? Qual é o método da pesquisa? A fonte é imparcial e reconhecida? (IBGE, Datafolha, IPEA, ONU).',
		    },
		    {
			    'title': '🚧 Evitar Generalizações',
			    'value': "Evite palavras como 'sempre', 'nunca', 'todos'. Use termos mais cautelosos e precisos como 'majoritariamente', 'em grande parte', 'raramente' para manter a objetividade.",
		    },
		    {
			    'title': '🖼️ Argumento por Analogia',
			    'value': 'Explique um conceito complexo fazendo uma comparação com uma ideia mais simples ou com um fenômeno conhecido. Isso ajuda na clareza e persuasão.',
		    },
		    {
			    'title': '✍️ Revisão Argumentativa',
			    'value': "Após escrever, revise cada parágrafo perguntando: 'Onde está minha prova?' Se a prova (dado, citação) não estiver clara, reforce-a.",
		    },
		    {
			    'title': '⚖️ Citação de Ato Normativo',
			    'value': 'Em problemas sociais ou de infraestrutura, citar a inobservância de uma lei ou artigo constitucional (Ex: Art. 5º ou 6º da CF) é uma forma poderosa de argumentação técnica.',
		    },
		    {
			    'title': '📣 Voz Ativa e Assertiva',
			    'value': 'Escreva com voz ativa para que seus argumentos sejam diretos e a leitura seja mais dinâmica. Evite frases longas e excessivamente passivas.',
		    },
		    {
			    'title': '🎁 Proposta de Intervenção Completa',
			    'value': 'Sua proposta de solução deve ter 5 elementos: Agente, Ação, Meio/Modo, Efeito/Finalidade e Detalhamento. Não deixe nenhuma ponta solta.',
		    },
		    {
			    'title': '💡 Exemplificação Pessoal',
			    'value': 'Use um exemplo de noticiário recente para ilustrar como o problema se manifesta na realidade. Isso aterra o argumento teórico e o torna mais tangível.',
		    },
	    ];
    }, []);

    const getRandomMessage = useCallback(() => {
        return messageMemory[Math.floor(Math.random() * messageMemory.length)];
    }, [messageMemory]);

    return (
        <div>
            <Card
                title={'💡 Dica'}
                html={<Text text={getRandomMessage().value} as='p' size='2' color='gray' />}
                minW={'40px'}
                maxW={'460px'}
                aligntitle={'left'}
                ownVariant={'tip'}
                titleSize={'5'}
	        />
        </div>
    );
}
