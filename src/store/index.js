export const updateListById = fn => id => list => {
  const nextList = list.map(item => {
    if (item.id !== id) return item;
    return fn(item);
  });

  return nextList;
};

export const addTicketToBoard = (prev, next) => {
  if (!next) {
    return prev;
  }

  const { boards } = prev;
  const { ticket } = next;
  const {
    board: { id },
  } = ticket;

  const update = updateListById(board => ({
    ...board,
    tickets: [...board.tickets, ticket],
  }));

  const nextBoards = update(id)(boards);

  return { ...prev, boards: nextBoards };
};

export const removeTicketFromBoard = (prev, next) => {
  if (!next) {
    return prev;
  }

  const { boards } = prev;
  const { ticket } = next;
  const {
    board: { id },
  } = ticket;

  const update = updateListById(board => ({
    ...board,
    tickets: board.tickets.filter(t => t.id !== ticket.id),
  }));

  const nextBoards = update(id)(boards);

  return { ...prev, boards: nextBoards };
};

export const updateTicketInBoard = (prev, next) => {
  if (!next) {
    return prev;
  }

  const { boards } = prev;
  const { ticket } = next;
  const { board } = ticket;

  const updateTickets = updateListById(t => ({
    ...t,
    ...ticket,
  }))(ticket.id);

  const update = updateListById(board => ({
    ...board,
    tickets: updateTickets(board.tickets),
  }));

  const nextBoards = update(board.id)(boards);

  return { ...prev, boards: nextBoards };
};

export const updateBoard = (prev, next) => {
  if (!next) {
    return prev;
  }

  const { boards } = prev;

  const update = updateListById(board => ({
    ...board,
    ...next.board,
  }));

  const nextBoards = update(next.board.id)(boards);

  return { ...prev, boards: nextBoards };
};
