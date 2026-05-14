// faça o import
import { useState } from 'react';

function GerenciadorConvidados() {
    // --- ESTADOS ---
    // 1. Estado da lista de convidados (Read)
    const [convidados, setConvidados] = useState([
        { id: 1, nome: 'João Silva', confirmado: false },
        { id: 2, nome: 'Maria Souza', confirmado: true },
    ]);

    // 2. Estado do novo convidado
    const [novoNome, setNovoNome] = useState('');

    // 3. Estados de edição
    const [idEditando, setIdEditando] = useState(null);
    const [nomeEditado, setNomeEditado] = useState('');

    // --- FUNÇÕES DO CRUD ---

    // CREATE
    const adicionarConvidado = (e) => {
        e.preventDefault();
        if (novoNome.trim() === '') return; // CORRIGIDO: adicionado os parênteses () no trim

        const nuevoConvidado = {
            id: Date.now(),
            nome: novoNome,
            confirmado: false,
        };

        setConvidados([...convidados, nuevoConvidado]);
        setNovoNome('');
    };

    // DELETE
    const removerConvidado = (id) => {
        setConvidados(convidados.filter((convidado) => convidado.id !== id));
    };

    // UPDATE: Iniciar a edição
    const iniciarEdicao = (convidado) => {
        setIdEditando(convidado.id);
        setNomeEditado(convidado.nome);
    };

    // UPDATE: Salvar o nome corrigido
    // CORRIGIDO: A função agora recebe o 'id' e itera sobre a lista de convidados corretamente
    const salvarEdicao = (id) => {
        const listaAtualizada = convidados.map((convidado) => {
            if (convidado.id === id) {
                return { ...convidado, nome: nomeEditado };
            }
            return convidado;
        });

        setConvidados(listaAtualizada);
        setIdEditando(null);
    };

    // UPDATE: Alternar confirmação de presença
    const alternarConfirmacao = (id) => {
        const listaAtualizada = convidados.map((convidado) => {
            if (convidado.id === id) {
                return { ...convidado, confirmado: !convidado.confirmado };
            }
            return convidado;
        });
        setConvidados(listaAtualizada);
    };

    // --- RENDERIZAÇÃO ---
    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
            <h1>🎉 Lista de Convidados VIP</h1>

            {/* Formulário de Adição */}
            <form onSubmit={adicionarConvidado} style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Nome do convidado..."
                    value={novoNome}
                    onChange={(e) => setNovoNome(e.target.value)}
                    style={{ padding: '10px', width: '70%' }}
                />
                <button
                    type="submit"
                    style={{
                        padding: '10px 15px',
                        marginLeft: '10px',
                        background: '#9b59b6',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                    }}>
                    Adicionar
                </button>
            </form>

            {/* Lista */}
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {convidados.map((convidado) => (
                    <li
                        key={convidado.id}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '15px',
                            marginBottom: '10px',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            borderLeft: convidado.confirmado
                                ? '5px solid #2ecc71'
                                : '5px solid #e74c3c',
                            backgroundColor: convidado.confirmado ? '#f9fff9' : '#fff',
                        }}>
                        {/* Modo Edição vs Modo Visualização */}
                        {idEditando === convidado.id ? (
                            <div style={{ display: 'flex', gap: '5px' }}>
                                <input
                                    type="text"
                                    value={nomeEditado}
                                    onChange={(e) => setNomeEditado(e.target.value)}
                                    style={{ padding: '5px' }}
                                />
                                <button onClick={() => salvarEdicao(convidado.id)}>Salvar</button>
                                <button onClick={() => setIdEditando(null)}>Cancelar</button>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <input
                                    type="checkbox"
                                    checked={convidado.confirmado}
                                    onChange={() => alternarConfirmacao(convidado.id)}
                                    title="Marcar presença"
                                />
                                <span
                                    style={{
                                        fontWeight: convidado.confirmado ? 'bold' : 'normal',
                                    }}>
                                    {convidado.nome}
                                </span>
                                {convidado.confirmado && (
                                    <span style={{ fontSize: '12px', color: '#2ecc71' }}>
                                        {' '}
                                        (Confirmado)
                                    </span>
                                )}
                            </div>
                        )}

                        {/* Botões de Ação */}
                        {idEditando !== convidado.id && (
                            <div>
                                <button
                                    onClick={() => iniciarEdicao(convidado)}
                                    style={{ marginRight: '10px', cursor: 'pointer' }}>
                                    ✏️ Editar
                                </button>
                                <button
                                    onClick={() => removerConvidado(convidado.id)}
                                    style={{ color: 'red', cursor: 'pointer' }}>
                                    ❌ Remover
                                </button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>

            {convidados.length === 0 && (
                <p style={{ textAlign: 'center', color: '#7f8c8d' }}>
                    A lista está vazia. Adicione alguém para a festa! 🎈
                </p>
            )}
        </div>
    );
}

export default GerenciadorConvidados;
