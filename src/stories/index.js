import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { Grid, Row } from 'react-styled-flexboxgrid';

import Button from '../components/Button';
import Card from '../components/Card';
import TicketCard from '../components/TicketCard';
import TicketEditor from '../components/TicketEditor';
import EditableTicket from '../components/EditableTicket';
import Ticket from '../components/Ticket';
import Board from '../components/Board';
import Boards from '../components/Boards';

const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nec tempus mi. Nulla nec enim nec libero congue elementum ut.";

const comments = [{
  id: '1',
  body: 'First comment',
}, {
  id: '2',
  body: 'Sec comment',
}, {
  id: '3',
  body: 'Another one',
}];

const tickets = [{
  id: '1',
  label: 'One ticket',
  body: 'Ticket body',
  comments: [...comments],
}, {
  id: '2',
  label: 'Another tikcet',
  body: 'Ticket body',
  comments: [...comments],
}, {
  id: '3',
  label: 'And the last one',
  body: 'Ticket body',
  comments: [...comments],
}];

const boards = [{
  id: '1',
  label: 'Todos',
  tickets: [...tickets],
}, {
  id: '2',
  label: 'Success',
  tickets: [...tickets],
}];

storiesOf('Button', module)
  .add('button with text', () => <Button onClick={action('clicked')}>Hello Button</Button>);

storiesOf('Card', module)
  .addDecorator(story => (
    <div style={{ width: '300px' }}>
      {story()}
    </div>
  ))
  .add('simple card', () =>
    <Card title="Card title">
      Card children
    </Card>
  )
  .add('simple card with more text', () =>
    <Card title="Card title">
      {lorem}
    </Card>
  )
  .add('TicketCard', () =>
    <TicketCard onEdit={action('onEdit')} label="Ticket label" body={lorem} />
  )
  .add('TicketCard With Comments', () =>
    <TicketCard onEdit={action('onEdit')} label="Ticket label" body={lorem} comments={comments} />
  )
  .add('TicketEditor', () =>
    <TicketEditor onSave={action('save')} label="Ticket label" body={lorem} />
  )
  .add('EditableTicket', () =>
    <EditableTicket onSave={action('onSave')} label="Ticket Title" body={lorem} />
  )
  .add('Ticket', () =>
    <Ticket ticket={{...tickets[0]}} />
  );

storiesOf('Board', module)
  .addDecorator(story => (
    <Grid>
      <Row>
        {story()}
      </Row>
    </Grid>
  ))
  .add('Simple Board', () => 
    <Board id='1' label='Test board' onSave={action('onSave')} />
  )
  .add('Board with editable tickets', () =>
    <Board id='1' label='Test board' onSave={action('onSave')} tickets={tickets} />
  );

storiesOf('Boards', module)
  .add('Boards', () => 
    <Boards boards={boards} />
  );
