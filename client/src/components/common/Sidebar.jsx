import { useSelector, useDispatch } from 'react-redux';
import { Box, Drawer, IconButton, List, ListItem, ListItemButton, Typography } from '@mui/material';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { Link, useNavigate, useParams } from 'react-router-dom';
import assets from '../../assets/index';
import { useEffect, useState } from 'react';
import boardApi from '../../api/boardApi';
import { setBoards } from '../../redux/features/boardSlice';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const Sidebar = () => {
  const user = useSelector((state) => state.user.value);
  const boards = useSelector((state) => state.board.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { boardId } = useParams();
  const [activeIndex, setActiveIndex] = useState(0);

  const sidebarWidth = 250;

  useEffect(() => {
    const getBoards = async () => {
      try {
        const res = await boardApi.getAll();
        dispatch(setBoards(res));
      } catch (err) {
        alert(err);
      }
    };
    getBoards();
  }, [dispatch]);

  useEffect(() => {
    const activeItem = boards.findIndex((e) => e.id === boardId);
    //if (boards.length > 0 && boardId === undefined) {
    //  navigate(`/boards/${boards[0].id}`);
    //}
    setActiveIndex(activeItem);
  }, [boards, boardId, navigate]);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const onDragEnd = async ({ source, destination }) => {
    const newList = [...boards];
    const [removed] = newList.splice(source.index, 1);
    newList.splice(destination.index, 0, removed);

    const activeItem = newList.findIndex((e) => e.id === boardId);
    setActiveIndex(activeItem);
    dispatch(setBoards(newList));

    try {
      await boardApi.updatePositoin({ boards: newList });
    } catch (err) {
      alert(err);
    }
  };

  const addBoard = async () => {
    try {
      const res = await boardApi.create();
      const newList = [res, ...boards];
      dispatch(setBoards(newList));
      navigate(`/boards/${res.id}`);
    } catch (err) {
      alert(err);
    }
  };

  /*
  const navigateTo = (path) => {
    console.log(`Navigating to path: ${path}`);
    navigate(path);
  };
  */

  return (
    <Drawer
      container={window.document.body}
      variant='permanent'
      open={true}
      sx={{
        width: sidebarWidth,
        height: '100vh',
        '& > div': { borderRight: 'none' },
      }}
    >
      <List
        disablePadding
        sx={{
          width: sidebarWidth,
          height: '100vh',
          backgroundColor: assets.colors.secondary,
        }}
      >
        <ListItem>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant='body2' fontWeight='700'>
              {user.username}
            </Typography>
            <IconButton onClick={logout}>
              <LogoutOutlinedIcon fontSize='small' />
            </IconButton>
          </Box>
        </ListItem>
        <Box sx={{ paddingTop: '10px' }} />
        {/* ... (inne elementy) */}
        <ListItem>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant='body2' fontWeight='700'>
              Private
            </Typography>
            <IconButton onClick={addBoard}>
              <AddBoxOutlinedIcon fontSize='small' />
            </IconButton>
          </Box>
        </ListItem>

        {/* Nowe zakładki */}
        <ListItemButton onClick={() => navigate('/calendar')} sx={{ pl: '20px' }} selected={false}>
          <Typography variant='body2' fontWeight='700'>
            Calendar
          </Typography>
        </ListItemButton>
        <ListItemButton onClick={() => navigate('/notifications')} sx={{ pl: '20px' }} selected={false}>
          <Typography variant='body2' fontWeight='700'>
            Notifications
          </Typography>
        </ListItemButton>
        
       {/* 
<ListItemButton onClick={() => navigate('/settings')} sx={{ pl: '20px' }} selected={false}>
  <Typography variant='body2' fontWeight='700'>
    Settings
  </Typography>
</ListItemButton>
*/}

{/* Nowe zakładki w zakładce "Settings" */}
{/* 
<ListItemButton onClick={() => navigate('/settings/info')} sx={{ pl: '40px' }} selected={false}>
  <Typography variant='body2' fontWeight='700'>
    Info
  </Typography>
</ListItemButton>
*/}
{/* 
<ListItemButton onClick={() => navigate('/settings/password')} sx={{ pl: '40px' }} selected={false}>
  <Typography variant='body2' fontWeight='700'>
    Password
  </Typography>
</ListItemButton>
*/}


        <ListItemButton onClick={() => navigate('/archive')} sx={{ pl: '20px' }} selected={false}>
      <Typography variant='body2' fontWeight='700'>
        Archive
      </Typography>
    </ListItemButton>

    <ListItemButton onClick={() => navigate('/homepage')} sx={{ pl: '20px' }} selected={false}>
  <Typography variant='body2' fontWeight='700'>
    Homepage
  </Typography>
</ListItemButton>


        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable key={'list-board-droppable-key'} droppableId={'list-board-droppable'}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {boards.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <ListItemButton
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        selected={index === activeIndex}
                        component={Link}
                        to={`/boards/${item.id}`}
                        sx={{
                          pl: '20px',
                          cursor: snapshot.isDragging ? 'grab' : 'pointer!important',
                        }}
                      >
                        <Typography
                          variant='body2'
                          fontWeight='700'
                          sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                        >
                          {item.icon} {item.title}
                        </Typography>
                      </ListItemButton>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </List>
    </Drawer>
  );
};

export default Sidebar;