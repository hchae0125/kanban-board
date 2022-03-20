import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd'
import { useRecoilState } from 'recoil';
import { toDoState } from './atoms';
import DraggableCard from './components/DraggableCard';

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(1, 1fr);
`;

const Board = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  min-height: 200px;
  padding: 20px 10px;
  padding-top: 30px;
  border-radius: 4px;
`;

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300&display=swap');
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
    font-family: 'Poppins', sans-serif; 
    background-color: ${(props) => props.theme.bgColor};
    color: white;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  a {
    text-decoration: none;
    color:inherit;
  }
  * {
    box-sizing: border-box;
  }
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = ({draggableId, destination, source} : DropResult) => {
    if (!destination) return;
    
    setToDos((prev) => {
      const oldArray = [...prev];
      oldArray.splice(source.index, 1);
      oldArray.splice(destination?.index, 0, draggableId);
      return oldArray;
    });
  };
  return <>
  <DragDropContext onDragEnd={onDragEnd}>
    <Wrapper>
      <Boards>
        <Droppable droppableId='one'>
          {(provided) => <Board ref={provided.innerRef} {...provided.droppableProps}>
            {toDos.map((toDo, idx) => { return (
              <DraggableCard key={toDo} index={idx} toDo={toDo} />
            )})}
            {provided.placeholder}
            </Board>}
        </Droppable>
      </Boards>
    </Wrapper>
  </DragDropContext>
  <GlobalStyle />
  </> ;
}

export default App;
