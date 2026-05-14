import { useState } from 'react';

function GerenciadorTarefas() {
  // --- ESTADOS ---
  // 1. Estado principal que guarda nossa lista de tarefas (O "R" do CRUD)
  const [tarefas, setTarefas] = useState([
    { id: 1, texto: 'Estudar React', concluida: false },
    { id: 2, texto: 'Fazer o CRUD', concluida: false },
  ]);

  // 2. Estado para controlar o que está sendo digitado no input de nova tarefa
  const [novaTarefa, setNovaTarefa] = useState('');

  // 3. Estados para controlar a edição (O "U" do CRUD)
  const [idEditando, setIdEditando] = useState(null);
  const [textoEditado, setTextoEditado] = useState('');

  // --- FUNÇÕES DO CRUD ---

  // CREATE: Adiciona uma nova tarefa na lista
  const adicionarTarefa = (e) => {
    e.preventDefault(); // Evita que a página recarregue ao enviar o formulário

    if (novaTarefa.trim() === '') return; // Não adiciona tarefas vazias

    const nova = {
      id: Date.now(), // Gera um ID único baseado na data/hora
      texto: novaTarefa,
      concluida: false,
    };

    // Pega o array atual e adiciona a nova tarefa no final
    setTarefas([...tarefas, nova]);
    setNovaTarefa(''); // Limpa o input
  };

  // DELETE: Remove uma tarefa pelo ID
  const deletarTarefa = (idParaDeletar) => {
    // Filtra o array, mantendo apenas as tarefas com ID diferente do que queremos deletar
    const listaAtualizada = tarefas.filter((tarefa) => tarefa.id !== idParaDeletar);
    setTarefas(listaAtualizada);
  };

  // UPDATE (Parte 1): Prepara a tarefa para ser editada
  const iniciarEdicao = (tarefa) => {
    setIdEditando(tarefa.id);
    setTextoEditado(tarefa.texto);
  };

  // UPDATE (Parte 2): Salva o novo texto da tarefa
  const salvarEdicao = (idParaSalvar) => {
    const listaAtualizada = tarefas.map((tarefa) => {
      if (tarefa.id === idParaSalvar) {
        // Retorna a mesma tarefa, mas com o texto alterado
        return { ...tarefa, texto: textoEditado };
      }
      return tarefa;
    });

    setTarefas(listaAtualizada);
    setIdEditando(null); // Sai do modo de edição
  };

  // UPDATE (Bônus): Alterna o status de concluída
  const alternarConcluida = (id) => {
    const listaAtualizada = tarefas.map((tarefa) => {
      if (tarefa.id === id) {
        return { ...tarefa, concluida: !tarefa.concluida };
      }
      return tarefa;
    });
    setTarefas(listaAtualizada);
  };

  // --- RENDERIZAÇÃO DA TELA ---
  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>Lista de Tarefas (CRUD) 📝</h1>

      {/* CREATE: Formulário de Adição */}
      <form onSubmit={adicionarTarefa} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="O que precisa ser feito?"
          value={novaTarefa}
          onChange={(e) => setNovaTarefa(e.target.value)}
          style={{ padding: '8px', width: '70%' }}
        />
        <button type="submit" style={{ padding: '8px 12px', marginLeft: '5px' }}>
          Adicionar
        </button>
      </form>

      {/* READ: Renderizando a lista */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tarefas.map((tarefa) => (
          <li
            key={tarefa.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px',
              borderBottom: '1px solid #ccc',
              backgroundColor: tarefa.concluida ? '#f0f0f0' : 'white',
            }}
          >
            {/* Se esta for a tarefa que estamos editando, mostra um input */}
            {idEditando === tarefa.id ? (
              <div>
                <input
                  type="text"
                  value={textoEditado}
                  onChange={(e) => setTextoEditado(e.target.value)}
                />
                <button onClick={() => salvarEdicao(tarefa.id)}>Salvar</button>
                <button onClick={() => setIdEditando(null)}>Cancelar</button>
              </div>
            ) : (
              /* Caso contrário, mostra o texto normal e o botão de concluir */
              <div style={{ textDecoration: tarefa.concluida ? 'line-through' : 'none' }}>
                <input
                  type="checkbox"
                  checked={tarefa.concluida}
                  onChange={() => alternarConcluida(tarefa.id)}
                  style={{ marginRight: '10px' }}
                />
                {tarefa.texto}
              </div>
            )}

            {/* Botões de Ação (Aparecem apenas se não estivermos no modo de edição desta tarefa) */}
            {idEditando !== tarefa.id && (
              <div>
                <button onClick={() => iniciarEdicao(tarefa)} style={{ marginRight: '5px' }}>
                  ✏️ Editar
                </button>
                <button onClick={() => deletarTarefa(tarefa.id)}>
                  🗑️ Excluir
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>

      {tarefas.length === 0 && <p style={{ textAlign: 'center' }}>Nenhuma tarefa pendente! 🎉</p>}
    </div>
  );
}

export default GerenciadorTarefas;
