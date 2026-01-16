import styles from './Benefits.module.css';

export default function Benefits() {
    return (
        <aside className={styles.benefits}>
            <h2 className={styles.title}>
                Pare de repetir os <span className={styles.highlight}>mesmos erros</span> nas suas redações
            </h2>

            <p className={styles.subtitle}>
                Enquanto você adia, seus concorrentes já estão evoluindo com feedback de IA personalizado
            </p>

            <div className={styles.resultsBox}>
                <div className={styles.resultsHeader}>
                    ✨ O que você ganha hoje:
                </div>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <span className={styles.icon}>✓</span>
                        <div>
                            <strong>Correções em tempo real</strong>
                            <span className={styles.detail}>Saiba exatamente onde está errando</span>
                        </div>
                    </li>
                    <li className={styles.item}>
                        <span className={styles.icon}>✓</span>
                        <div>
                            <strong>Feedback personalizado por IA</strong>
                            <span className={styles.detail}>Como ter um professor particular 24/7</span>
                        </div>
                    </li>
                    <li className={styles.item}>
                        <span className={styles.icon}>✓</span>
                        <div>
                            <strong>Evolução mensurável</strong>
                            <span className={styles.detail}>Veja seu progresso em cada redação</span>
                        </div>
                    </li>
                    <li className={styles.item}>
                        <span className={styles.icon}>✓</span>
                        <div>
                            <strong>Economize meses de estudo</strong>
                            <span className={styles.detail}>Aprenda em semanas o que levaria meses</span>
                        </div>
                    </li>
                </ul>
            </div>

            <div className={styles.socialProof}>
                <div className={styles.avatars}>
                    <div className={styles.avatar}>👤</div>
                    <div className={styles.avatar}>👤</div>
                    <div className={styles.avatar}>👤</div>
                    <div className={styles.avatarCount}>+2.847</div>
                </div>
                <div className={styles.socialText}>
                    <strong>2.847 estudantes</strong> já melhoraram suas notas este mês
                </div>
            </div>

            <div className={styles.warning}>
                <div className={styles.warningIcon}>⚠️</div>
                <div>
                    <strong>Cada dia sem feedback é um dia perdido.</strong>
                    <p>Você está competindo com quem já está evoluindo. Não fique para trás.</p>
                </div>
            </div>

            <div className={styles.guarantee}>
                <div className={styles.guaranteeIcon}>🛡️</div>
                <div className={styles.guaranteeText}>
                    <strong>Garantia de 7 dias</strong>
                    <span>Não gostou? Devolvemos 100% do seu dinheiro</span>
                </div>
            </div>

            <div className={styles.footer}>
                <div className={styles.trustBadge}>
                    <span className={styles.badgeIcon}>🔒</span>
                    <span>Pagamento 100% seguro</span>
                </div>
                <div className={styles.trustBadge}>
                    <span className={styles.badgeIcon}>❌</span>
                    <span>Cancele quando quiser</span>
                </div>
                <div className={styles.trustBadge}>
                    <span className={styles.badgeIcon}>⚡</span>
                    <span>Acesso imediato</span>
                </div>
            </div>
        </aside>
    );
}
